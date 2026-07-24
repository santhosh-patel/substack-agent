export async function loadHistory() {
  const btn = document.getElementById('loadHistoryBtn');
  const listEl = document.getElementById('historyList');

  setButtonLoading(btn, true, 'Fetching…');
  listEl.innerHTML = '<div class="history-empty"><span class="spinner"></span> Loading publication history...</div>';

  let newsletters = [];
  let notes = [];
  let comments = [];
  let publications = [];
  let errors = [];

  if (!isConnected) {
    try {
      const res = await fetch('/api/publications/history');
      if (res.ok) {
        const data = await res.json();
        publications = (data.publications || []).map(p => ({
          id: `pub-${p.id}`,
          type: p.type,
          title: p.title,
          body: p.body,
          url: p.url,
          publishedAt: p.publishedAt,
          source: p.source || 'manual',
          isDraft: p.isDraft,
        }));
      }
    } catch (e) {
      errors.push('Publications');
    }

    allHistoryItems = dedupeHistoryItems(publications);
    filterAndRenderHistory();
    setButtonLoading(btn, false, '<i data-lucide="rotate-ccw"></i> Fetch History');

    if (errors.length > 0) {
      showToast('Failed to load local publication history', 'error');
    } else if (publications.length === 0) {
      showToast('Connect Substack to load archive history', 'info');
    } else {
      showToast(`Loaded ${publications.length} local publication(s)`, 'success');
    }
    return;
  }

  // 1. Fetch Newsletters
  try {
    const res = await fetch('/api/newsletters');
    if (res.ok) {
      const data = await res.json();
      newsletters = (data.posts || []).map(p => ({
        id: 'post-' + p.id,
        type: 'newsletter',
        title: p.title,
        body: p.subtitle || p.truncatedBody || '',
        url: p.url,
        publishedAt: p.publishedAt
      }));
    } else {
      errors.push('Newsletters');
    }
  } catch (e) {
    errors.push('Newsletters');
  }

  // 2. Fetch Notes
  try {
    const res = await fetch('/api/notes');
    if (res.ok) {
      const data = await res.json();
      notes = (data.notes || []).map(n => ({
        id: 'note-' + n.id,
        type: 'note',
        title: n.author ? n.author.name + "'s Note" : 'Published Note',
        body: n.body,
        url: n.url,
        publishedAt: n.publishedAt
      }));
    } else {
      errors.push('Notes');
    }
  } catch (e) {
    errors.push('Notes');
  }

  // 3. Fetch Comments
  try {
    const res = await fetch('/api/comments');
    if (res.ok) {
      const data = await res.json();
      comments = (data.comments || []).map((c, idx) => ({
        id: 'comment-' + idx,
        type: 'comment',
        title: 'Commented on: ' + c.postTitle,
        body: c.body,
        url: c.postUrl,
        publishedAt: c.publishedAt
      }));
    } else {
      errors.push('Comments');
    }
  } catch (e) {
    errors.push('Comments');
  }

  // 4. Fetch local publication history (manual + scheduled runs)
  try {
    const res = await fetch('/api/publications/history');
    if (res.ok) {
      const data = await res.json();
      publications = (data.publications || []).map(p => ({
        id: `pub-${p.id}`,
        type: p.type,
        title: p.title,
        body: p.body,
        url: p.url,
        publishedAt: p.publishedAt,
        source: p.source || 'manual',
        isDraft: p.isDraft,
      }));
    } else {
      errors.push('Publications');
    }
  } catch (e) {
    errors.push('Publications');
  }

  // Merge all items, dedupe by URL, prefer scheduled/local entries
  allHistoryItems = dedupeHistoryItems([...publications, ...newsletters, ...notes, ...comments]);

  if (errors.length > 0) {
    showToast(`Failed to load: ${errors.join(', ')}`, 'warning');
  } else {
    showToast('History loaded successfully!', 'success');
  }

  filterAndRenderHistory();
  setButtonLoading(btn, false, '<i data-lucide="rotate-ccw"></i> Fetch History');
}

export function dedupeHistoryItems(items) {
  const seen = new Set();
  const merged = [];

  for (const item of items) {
    const key = item.url || item.id;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

export function filterAndRenderHistory() {
  const listEl = document.getElementById('historyList');
  const typeFilter = document.getElementById('historyTypeFilter').value;
  const sortOrder = document.getElementById('historySort').value;
  const searchQuery = document.getElementById('historySearch')?.value.toLowerCase().trim() || '';

  if (!listEl) return;

  // 1. Edgecase: Disconnect state display
  if (!isConnected && allHistoryItems.length === 0) {
    listEl.innerHTML = `
      <div class="history-empty" style="padding: 40px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <i data-lucide="shield-alert" style="width: 44px; height: 44px; color: var(--text-muted);"></i>
        <div style="text-align: center;">
          <h3 style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 4px;">Account Disconnected</h3>
          <p style="font-size: 0.84rem; color: var(--text-muted); max-width: 320px; margin: 0 auto;">Connect your session ID in the settings sidebar to retrieve notes, comments, and post archives.</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openSidebarAndFocusSid()" style="margin-top: 8px; background: var(--accent); color: var(--bg-primary);">
          <i data-lucide="key-round"></i> Connect Account
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 2. Filter list of items
  let items = allHistoryItems;
  if (typeFilter === 'scheduled') {
    items = items.filter(item => item.source === 'scheduled');
  } else if (typeFilter !== 'all') {
    items = items.filter(item => item.type === typeFilter);
  }

  // Search filtering
  if (searchQuery) {
    items = items.filter(item => 
      (item.title && item.title.toLowerCase().includes(searchQuery)) ||
      (item.body && item.body.toLowerCase().includes(searchQuery)) ||
      (item.type && item.type.toLowerCase().includes(searchQuery))
    );
  }

  // Sort list of items
  items.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // 3. Edgecase: Empty history state vs Empty search result state
  if (items.length === 0) {
    if (searchQuery) {
      listEl.innerHTML = `
        <div class="history-empty" style="padding: 40px 20px; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <i data-lucide="search" style="width: 38px; height: 38px; opacity: 0.4;"></i>
          <p>No matches found for "${escapeHtml(searchQuery)}"</p>
        </div>
      `;
    } else {
      listEl.innerHTML = `
        <div class="history-empty" style="padding: 40px 20px; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <i data-lucide="folder-open" style="width: 38px; height: 38px; opacity: 0.4;"></i>
          <p>Click "Fetch History" to retrieve your newsletter posts, notes, and comments.</p>
        </div>
      `;
    }
    if (window.lucide) lucide.createIcons();
    return;
  }

  listEl.innerHTML = items.map(item => {
    const pubDate = new Date(item.publishedAt).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const badgeClass = `badge-${item.type}`;
    const categoryClass = `category-${item.type}`;
    const displayType = item.type === 'newsletter' ? 'Newsletter' : (item.type === 'note' ? 'Note' : 'Comment');
    const sourceBadge = item.source === 'scheduled'
      ? '<span class="history-badge badge-scheduled">Scheduled</span>'
      : '';
    const draftBadge = item.isDraft
      ? '<span class="history-badge badge-draft">Draft</span>'
      : '';
    const hasPublicUrl = item.url && !item.url.startsWith('schedule://');
    const viewActions = hasPublicUrl ? `
            <a href="${escapeHtml(item.url)}" target="_blank" class="btn btn-secondary btn-sm" title="Open on Substack" style="padding: 4px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 4px; text-decoration: none; border-color: var(--border);">
              <i data-lucide="external-link" style="width: 12px; height: 12px; stroke-width: 2.2px;"></i> View
            </a>
            <button class="btn btn-secondary btn-sm" onclick="copyHistoryLink('${escapeHtml(item.url)}')" title="Copy Link" style="padding: 4px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 4px; border-color: var(--border);">
              <i data-lucide="copy" style="width: 12px; height: 12px; stroke-width: 2.2px;"></i> Link
            </button>
    ` : '';

    // Handle body text truncation / read-more toggle
    const longBody = item.body && item.body.length > 180;
    const shortBody = longBody ? item.body.substring(0, 170) + '...' : item.body;
    
    const displayBody = longBody ? `
      <span class="history-item-body-short" id="body-short-${item.id}">${escapeHtml(shortBody)}</span>
      <span class="history-item-body-full" id="body-full-${item.id}" style="display: none;">${escapeHtml(item.body)}</span>
      <button class="btn-text-toggle" onclick="toggleBodyText('${item.id}')" id="btn-toggle-${item.id}" style="background: transparent; border: none; color: var(--accent); font-size: 0.76rem; cursor: pointer; padding: 0; margin-top: 4px; display: inline-flex; align-items: center; gap: 4px; font-weight: 600;">Read More <i data-lucide="chevron-down" style="width: 12px; height: 12px;"></i></button>
    ` : `<span>${escapeHtml(item.body)}</span>`;

    return `
      <div class="history-item ${categoryClass}">
        <!-- Header row -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="history-badge ${badgeClass}">${displayType}</span>
            ${sourceBadge}
            ${draftBadge}
            <span class="history-item-date" style="color: var(--text-muted); font-size: 0.76rem;">${escapeHtml(pubDate)}</span>
          </div>
          
          <!-- Actions bar (CTAs) -->
          <div style="display: flex; align-items: center; gap: 8px;">
            ${viewActions}
            <button class="btn btn-primary btn-sm" onclick="reuseHistoryItem('${escapeHtml(item.id)}')" title="Load into Composer" style="padding: 4px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 4px; background: var(--accent); color: var(--bg-primary);">
              <i data-lucide="refresh-cw" style="width: 12px; height: 12px; stroke-width: 2.2px;"></i> Reuse
            </button>
          </div>
        </div>
        
        <!-- Content section -->
        <div style="display: flex; flex-direction: column; gap: 6px; min-width: 0; width: 100%;">
          ${item.type === 'newsletter' ? (
            hasPublicUrl
              ? `<a href="${escapeHtml(item.url)}" target="_blank" style="text-decoration: none; color: inherit; font-weight: 600; font-size: 1rem; width: fit-content; max-width: 100%; display: flex; align-items: center; gap: 6px;">
              <span>${escapeHtml(item.title)}</span>
            </a>`
              : `<div style="font-weight: 600; color: inherit; font-size: 1rem;">${escapeHtml(item.title)}</div>`
          ) : `<div style="font-weight: 600; color: inherit; font-size: 0.9rem;">${escapeHtml(item.title)}</div>`}
          
          <div style="font-size: 0.88rem; color: inherit; opacity: 0.9; line-height: 1.55; white-space: pre-wrap; word-break: break-word; margin-top: 2px;">
            ${displayBody}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ─── History Helpers ───
export function copyHistoryLink(url) {
  if (!url) return;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Link copied to clipboard!', 'success');
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Link copied to clipboard!', 'success');
  });
}

export function toggleBodyText(id) {
  const shortEl = document.getElementById(`body-short-${id}`);
  const fullEl = document.getElementById(`body-full-${id}`);
  const btn = document.getElementById(`btn-toggle-${id}`);

  if (shortEl && fullEl && btn) {
    const isShowingFull = fullEl.style.display !== 'none';
    if (isShowingFull) {
      fullEl.style.display = 'none';
      shortEl.style.display = 'inline';
      btn.innerHTML = `Read More <i data-lucide="chevron-down" style="width: 12px; height: 12px;"></i>`;
    } else {
      fullEl.style.display = 'inline';
      shortEl.style.display = 'none';
      btn.innerHTML = `Show Less <i data-lucide="chevron-up" style="width: 12px; height: 12px;"></i>`;
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }
}

export function reuseHistoryItem(id) {
  const item = allHistoryItems.find(i => i.id === id);
  if (!item) {
    showToast('Template item not found', 'error');
    return;
  }

  if (item.type === 'newsletter') {
    const postTitle = document.getElementById('postTitle');
    const editor = document.getElementById('editor');
    if (postTitle) postTitle.value = item.title || '';
    if (editor) editor.value = item.body || '';
    
    updatePreview();
    switchTab('newsletters');
    showToast('Newsletter template loaded into Composer!', 'success');
  } else if (item.type === 'note') {
    const noteBody = document.getElementById('noteBody');
    if (noteBody) noteBody.value = item.body || '';
    
    updateNotePreview();
    switchTab('notes');
    showToast('Note content loaded into Note Composer!', 'success');
  } else if (item.type === 'comment') {
    const commentPrompt = document.getElementById('commentPrompt');
    if (commentPrompt) commentPrompt.value = `Referencing previous comment: "${item.body}"\n`;
    
    switchTab('comments');
    showToast('Loaded comment content context as generation instructions!', 'success');
  }
}

