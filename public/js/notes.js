import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);
const isConnected = PG.isConnected;
const addToInputHistory = (...args) => PG.addToInputHistory(...args);
const escapeHtml = (...args) => PG.escapeHtml(...args);

async function handleGenerateNote() {
  const topic = document.getElementById('noteTopic').value.trim();
  const provider = document.getElementById('provider').value;
  const model = document.getElementById('model').value;
  const apiKey = getStoredApiKey(provider);
  const systemPrompt = document.getElementById('systemPrompt').value.trim();
  const btn = document.getElementById('generateNoteBtn');

  if (!topic) {
    showToast('Please enter a topic', 'error');
    return;
  }
  
  const hasBackendKey = hasBackendApiKey(provider);
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  setButtonLoading(btn, true, 'Generating…');

  const previewEl = document.getElementById('notePreview');
  if (previewEl) {
    previewEl.innerHTML = `
      <div class="skeleton skeleton-text" style="height: 12px; width: 100%; margin-bottom: 8px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 100%; margin-bottom: 8px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 65%; margin-bottom: 8px;"></div>
    `;
  }

  try {
    const res = await fetch('/api/notes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, provider, model, apiKey, systemPrompt, useWebSearch: true }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Generation failed');
    }

    document.getElementById('noteBody').value = data.note.body;
    updateNotePreview();

    addToInputHistory('noteTopic', topic);

    showToast('Note generated successfully!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="sparkles"></i> Generate');
  }
}

// ─── Publish Note to Substack ───
async function handlePublishNote() {
  const body = document.getElementById('noteBody').value.trim();
  const link = document.getElementById('noteLink').value.trim();
  const btn = document.getElementById('publishNoteBtn');

  if (!body) {
    showToast('Please enter some content for the note', 'error');
    return;
  }

  if (!PG.isConnected) {
    showToast('Connect to Substack first', 'error');
    openSidebarAndFocusSid();
    return;
  }

  setButtonLoading(btn, true, 'Publishing…');

  try {
    const res = await fetch('/api/notes/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, link: link || undefined }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Publishing failed');
    }

    showToast(`Published note successfully!`, 'success');
    if (data.note.url) {
      showToast(`URL: ${data.note.url}`, 'info');
    }
    document.getElementById('noteBody').value = '';
    document.getElementById('noteLink').value = '';
    updateNotePreview();

    if (link) {
      addToInputHistory('noteLink', link);
    }
    
    // Load notes and history again to show the newly published note
    setTimeout(() => {
      loadNotes();
      loadHistory();
    }, 1500);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="send"></i> Publish Note');
  }
}

// ─── Live Note Markdown Preview ───
function updateNotePreview() {
  const md = document.getElementById('noteBody').value;
  const previewEl = document.getElementById('notePreview');
  const link = document.getElementById('noteLink').value.trim();
  const linkWrap = document.getElementById('notePreviewLinkWrap');
  const linkText = document.getElementById('notePreviewLinkText');

  if (!md.trim()) {
    previewEl.innerHTML = '<div class="preview-placeholder">Note preview will appear here…</div>';
  } else {
    try {
      previewEl.innerHTML = marked.parse(md);
    } catch {
      previewEl.textContent = md;
    }
  }

  if (linkWrap && linkText) {
    if (link) {
      linkText.textContent = link;
      linkWrap.href = link.startsWith('http') ? link : `https://${link}`;
      linkWrap.style.display = 'flex';
    } else {
      linkWrap.style.display = 'none';
    }
  }
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ─── Notes Listing ───
async function loadNotes() {
  const btn = document.getElementById('loadNotesBtn');
  const listEl = document.getElementById('notesList');

  if (!PG.isConnected) {
    showToast('Please connect your Substack account first', 'error');
    return;
  }

  setButtonLoading(btn, true, 'Fetching…');
  listEl.innerHTML = '<div class="history-empty"><span class="spinner"></span> Loading publication notes...</div>';

  try {
    const res = await fetch('/api/notes');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch notes');
    }

    const notes = data.notes || [];
    if (notes.length === 0) {
      listEl.innerHTML = '<div class="history-empty">No notes found on this profile.</div>';
      return;
    }

    listEl.innerHTML = notes.map(note => {
      const pubDate = new Date(note.publishedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <div class="history-item">
          <div class="history-item-content">
            <a href="${escapeHtml(note.url)}" target="_blank" class="history-item-link" title="Open note on Substack">
              <div style="display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1;">
                <span class="history-item-title" style="font-weight: 500; color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(note.body)}</span>
                <span style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
                  <i data-lucide="heart" style="width: 12px; height: 12px;"></i> ${note.likesCount || 0} likes
                </span>
              </div>
              <i data-lucide="external-link" class="history-item-icon"></i>
            </a>
            <div class="history-item-date">${escapeHtml(pubDate)}</div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
    showToast('Notes loaded successfully!', 'success');

  } catch (err) {
    listEl.innerHTML = `<div class="history-empty" style="color: var(--error);">${escapeHtml(err.message)}</div>`;
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="rotate-ccw"></i> Fetch Notes');
  }
}


PG.handleGenerateNote = handleGenerateNote;
PG.handlePublishNote = handlePublishNote;
PG.updateNotePreview = updateNotePreview;
PG.loadNotes = loadNotes;
export {};
