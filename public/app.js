// ─── Substack Automation — Client-side Logic ───

// ─── Model definitions by provider ───
const MODELS = {
  groq: [
    { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B' },
    { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
  ],
  gemini: [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
    { value: 'gemini-3', label: 'Gemini 3' },
  ],
  openai: [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
    { value: 'gpt-5.5-mini', label: 'GPT-5.5 Mini' },
  ],
};

// ─── State ───
let isConnected = false;

// ─── Initialization ───
document.addEventListener('DOMContentLoaded', async () => {
  updateModelOptions();
  loadSavedSettings();
  await loadConfigFromBackend();
  loadPublishHistory();

  // Load sidebar state from localStorage
  const sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  const grid = document.querySelector('.main-grid');
  if (sidebarCollapsed && grid) {
    grid.classList.add('sidebar-collapsed');
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Setup prompt editor listener
  document.getElementById('systemPrompt').addEventListener('input', saveSystemPrompt);

  // Setup publication URL listener to save on update
  document.getElementById('pubUrl').addEventListener('input', saveSettings);

  // Setup draftToggle listener to update button label
  const draftToggle = document.getElementById('draftToggle');
  if (draftToggle) {
    draftToggle.addEventListener('change', updatePublishButtonLabel);
  }
  updatePublishButtonLabel();
});

// ─── Settings Persistence (localStorage & Backend Env) ───
async function loadConfigFromBackend() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return;
    const config = await res.json();
    window.backendConfig = config;

    if (config.sid) {
      document.getElementById('sid').value = config.sid;
    }
    if (config.publicationUrl) {
      document.getElementById('pubUrl').value = config.publicationUrl;
    }

    // Fill API keys if they exist in env and not already custom-entered
    const provider = document.getElementById('provider').value;
    if (config.groqApiKey && provider === 'groq') {
      document.getElementById('aiKey').value = config.groqApiKey;
    } else if (config.geminiApiKey && provider === 'gemini') {
      document.getElementById('aiKey').value = config.geminiApiKey;
    } else if (config.openaiApiKey && provider === 'openai') {
      document.getElementById('aiKey').value = config.openaiApiKey;
    }

    // Load System Prompt configuration
    loadSystemPromptForTab('newsletters');

    // Auto-connect if SID is pre-filled from environment
    if (config.sid) {
      handleConnect();
    }
  } catch (err) {
    console.error('Failed to load backend config:', err);
  }
}

function loadSavedSettings() {
  const saved = localStorage.getItem('substack_settings');
  if (!saved) return;
  try {
    const s = JSON.parse(saved);
    if (s.pubUrl) document.getElementById('pubUrl').value = s.pubUrl;
    if (s.provider) {
      document.getElementById('provider').value = s.provider;
      updateModelOptions();
    }
    if (s.model) document.getElementById('model').value = s.model;
  } catch {}
}

function saveSettings() {
  const settings = {
    pubUrl: document.getElementById('pubUrl').value,
    provider: document.getElementById('provider').value,
    model: document.getElementById('model').value,
  };
  localStorage.setItem('substack_settings', JSON.stringify(settings));
}

// ─── Model Dropdown ───
function updateModelOptions() {
  const provider = document.getElementById('provider').value;
  const modelSelect = document.getElementById('model');
  const models = MODELS[provider] || [];

  modelSelect.innerHTML = '';
  models.forEach((m) => {
    const opt = document.createElement('option');
    opt.value = m.value;
    opt.textContent = m.label;
    modelSelect.appendChild(opt);
  });

  // Prefill key from loaded backendConfig if available
  if (window.backendConfig) {
    const keyInput = document.getElementById('aiKey');
    if (provider === 'groq' && window.backendConfig.groqApiKey) {
      keyInput.value = window.backendConfig.groqApiKey;
    } else if (provider === 'gemini' && window.backendConfig.geminiApiKey) {
      keyInput.value = window.backendConfig.geminiApiKey;
    } else if (provider === 'openai' && window.backendConfig.openaiApiKey) {
      keyInput.value = window.backendConfig.openaiApiKey;
    } else {
      keyInput.value = '';
    }
  }

  saveSettings();
}

// ─── Connect to Substack ───
async function handleConnect() {
  const sid = document.getElementById('sid').value.trim();
  const pubUrl = document.getElementById('pubUrl').value.trim();
  const btn = document.getElementById('connectBtn');

  if (!sid) {
    showToast('Please enter your Substack SID cookie', 'error');
    return;
  }

  setButtonLoading(btn, true, 'Connecting…');

  try {
    const res = await fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sid, publicationUrl: pubUrl || undefined }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Connection failed');
    }

    isConnected = true;
    updateConnectionBadge(data.profile);
    document.getElementById('publishBtn').disabled = false;
    saveSettings();
    showToast(`Connected as ${data.profile.name} (@${data.profile.slug})`, 'success');
  } catch (err) {
    isConnected = false;
    updateConnectionBadge(null);
    document.getElementById('publishBtn').disabled = true;
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, 'Connect');
  }
}

// ─── Generate Post with AI ───
async function handleGenerate() {
  const topic = document.getElementById('topic').value.trim();
  const provider = document.getElementById('provider').value;
  const model = document.getElementById('model').value;
  const apiKey = document.getElementById('aiKey').value.trim();
  const systemPrompt = document.getElementById('systemPrompt').value.trim();
  const btn = document.getElementById('generateBtn');

  if (!topic) {
    showToast('Please enter a topic', 'error');
    return;
  }
  
  const hasBackendKey = window.backendConfig && window.backendConfig[`${provider}ApiKey`];
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  setButtonLoading(btn, true, 'Generating…');

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, provider, model, apiKey, systemPrompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Generation failed');
    }

    // Fill in the form
    document.getElementById('postTitle').value = data.post.title;
    document.getElementById('postSubtitle').value = data.post.subtitle;
    document.getElementById('editor').value = data.post.body;
    updatePreview();

    showToast('Newsletter generated successfully!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="sparkles"></i> Generate');
  }
}

// ─── Publish to Substack ───
async function handlePublish() {
  const title = document.getElementById('postTitle').value.trim();
  const subtitle = document.getElementById('postSubtitle').value.trim();
  const body = document.getElementById('editor').value.trim();
  const isDraft = document.getElementById('draftToggle').checked;
  const btn = document.getElementById('publishBtn');

  if (!title) {
    showToast('Please enter a title', 'error');
    return;
  }
  if (!body) {
    showToast('Please write some content', 'error');
    return;
  }

  btn.setAttribute('data-loading', 'true');
  const action = isDraft ? 'Saving draft…' : 'Publishing…';
  setButtonLoading(btn, true, action);

  try {
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subtitle, body, isDraft }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Publishing failed');
    }

    const msg = isDraft
      ? `Draft saved: "${data.post.title}"`
      : `Published: "${data.post.title}"`;

    showToast(msg, 'success');

    if (data.post.url) {
      showToast(`URL: ${data.post.url}`, 'info');
      addPostToHistory(data.post.title || title, data.post.url);
    }
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.removeAttribute('data-loading');
    btn.disabled = false;
    updatePublishButtonLabel();
  }
}

// ─── Live Markdown Preview ───
function updatePreview() {
  const md = document.getElementById('editor').value;
  const previewEl = document.getElementById('preview');

  if (!md.trim()) {
    previewEl.innerHTML = '<div class="preview-placeholder">Preview will appear here…</div>';
    return;
  }

  try {
    previewEl.innerHTML = marked.parse(md);
  } catch {
    previewEl.textContent = md;
  }
}

// ─── UI Helpers ───

function updateConnectionBadge(profile) {
  const badge = document.getElementById('connectionBadge');
  const text = document.getElementById('connectionText');

  if (profile) {
    badge.className = 'connection-badge connected';
    text.textContent = `${profile.name}`;
  } else {
    badge.className = 'connection-badge disconnected';
    text.textContent = 'Not connected';
  }
}

function setButtonLoading(btn, loading, text) {
  if (loading) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${text}`;
  } else {
    btn.disabled = false;
    btn.innerHTML = text;
    if (window.lucide) {
      lucide.createIcons();
    }
  }
}

// ─── Toast System ───
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { 
    success: 'check-circle-2', 
    error: 'alert-triangle', 
    info: 'info' 
  };
  const iconName = icons[type] || 'info';
  
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="toast-icon"></i>
    <span class="toast-message">${escapeHtml(message)}</span>
    <button class="toast-close" title="Close">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  let dismissTimeout = null;

  const dismissToast = () => {
    if (dismissTimeout) clearTimeout(dismissTimeout);
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 250);
  };

  closeBtn.addEventListener('click', dismissToast);

  container.appendChild(toast);
  if (window.lucide) {
    lucide.createIcons();
  }

  // Dismiss after 30 seconds
  dismissTimeout = setTimeout(dismissToast, 30000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── System Prompt Handling ───
let activeSystemPromptTab = 'newsletters';

function loadSystemPromptForTab(tabId) {
  const textarea = document.getElementById('systemPrompt');
  if (!textarea) return;

  if (tabId === 'newsletters') {
    activeSystemPromptTab = 'newsletters';
    const custom = localStorage.getItem('substack_system_prompt_newsletter');
    textarea.value = custom !== null ? custom : (window.backendConfig?.defaultSystemPrompt || '');
  } else if (tabId === 'notes') {
    activeSystemPromptTab = 'notes';
    const custom = localStorage.getItem('substack_system_prompt_note');
    textarea.value = custom !== null ? custom : (window.backendConfig?.defaultNoteSystemPrompt || '');
  }
}

function saveSystemPrompt() {
  const value = document.getElementById('systemPrompt').value;
  if (activeSystemPromptTab === 'newsletters') {
    localStorage.setItem('substack_system_prompt_newsletter', value);
  } else if (activeSystemPromptTab === 'notes') {
    localStorage.setItem('substack_system_prompt_note', value);
  }
}

function resetSystemPrompt() {
  if (!window.backendConfig) return;
  if (activeSystemPromptTab === 'newsletters') {
    document.getElementById('systemPrompt').value = window.backendConfig.defaultSystemPrompt;
    localStorage.removeItem('substack_system_prompt_newsletter');
  } else if (activeSystemPromptTab === 'notes') {
    document.getElementById('systemPrompt').value = window.backendConfig.defaultNoteSystemPrompt;
    localStorage.removeItem('substack_system_prompt_note');
  }
  showToast('System prompt reset to default', 'info');
}

// ─── Sidebar Collapsing ───
function toggleSidebar() {
  const grid = document.querySelector('.main-grid');
  if (!grid) return;
  const isCollapsed = grid.classList.toggle('sidebar-collapsed');
  localStorage.setItem('sidebar_collapsed', isCollapsed);
}

// ─── Publish History ───
function loadPublishHistory() {
  const historyList = document.getElementById('historyList');
  if (!historyList) return;

  const history = JSON.parse(localStorage.getItem('substack_publish_history') || '[]');
  if (history.length === 0) {
    historyList.innerHTML = '<div class="history-empty">No newsletters published yet.</div>';
    return;
  }

  historyList.innerHTML = history.map(item => `
    <div class="history-item">
      <div class="history-item-content">
        <a href="${escapeHtml(item.url)}" target="_blank" class="history-item-link" title="Open newsletter on Substack">
          <span class="history-item-title">${escapeHtml(item.title)}</span>
          <i data-lucide="external-link" class="history-item-icon"></i>
        </a>
        <div class="history-item-date">${escapeHtml(item.date)}</div>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function addPostToHistory(title, url) {
  const history = JSON.parse(localStorage.getItem('substack_publish_history') || '[]');
  const date = new Date().toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  history.unshift({ title, url, date });
  if (history.length > 15) {
    history.pop();
  }

  localStorage.setItem('substack_publish_history', JSON.stringify(history));
  loadPublishHistory();
}

function updatePublishButtonLabel() {
  const btn = document.getElementById('publishBtn');
  const toggle = document.getElementById('draftToggle');
  if (!btn || !toggle) return;

  const isDraft = toggle.checked;
  const isLoading = btn.getAttribute('data-loading') === 'true';
  
  if (isLoading) return;

  if (isDraft) {
    btn.innerHTML = '<i data-lucide="file-text"></i> Save as Draft';
    btn.className = 'btn btn-secondary btn-lg';
  } else {
    btn.innerHTML = '<i data-lucide="send"></i> Publish to Substack';
    btn.className = 'btn btn-success btn-lg';
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ─── Tab Switching ───
function switchTab(tabId) {
  const tabs = ['newsletters', 'comments', 'notes', 'archive'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    const view = document.getElementById(`view-${t}`);
    if (t === tabId) {
      if (btn) btn.classList.add('active');
      if (view) view.style.display = 'block';
    } else {
      if (btn) btn.classList.remove('active');
      if (view) view.style.display = 'none';
    }
  });

  if (window.lucide) {
    lucide.createIcons();
  }

  if (tabId === 'newsletters' || tabId === 'notes') {
    loadSystemPromptForTab(tabId);
    document.getElementById('promptDetails').style.display = 'block';
  } else {
    document.getElementById('promptDetails').style.display = 'none';
  }

  if (tabId === 'archive') {
    const listEl = document.getElementById('archiveList');
    if (listEl && listEl.innerHTML.includes('Click "Fetch Archive"')) {
      loadArchive();
    }
  } else if (tabId === 'notes') {
    const listEl = document.getElementById('notesList');
    if (listEl && listEl.innerHTML.includes('Click "Fetch Notes"')) {
      loadNotes();
    }
  }
}

// ─── Comment Automation ───
let commentAutomationAbortController = null;

function appendCommentLog(message, type = 'info') {
  const logsEl = document.getElementById('commentLogs');
  if (!logsEl) return;

  const cleanMsg = escapeHtml(message);
  
  let formattedMsg = cleanMsg;
  if (type === 'highlight') {
    formattedMsg = `<span class="log-highlight">${cleanMsg}</span>`;
  } else if (type === 'success') {
    formattedMsg = `<span class="log-success">${cleanMsg}</span>`;
  } else if (type === 'error') {
    formattedMsg = `<span class="log-error">${cleanMsg}</span>`;
  } else if (type === 'warning') {
    formattedMsg = `<span class="log-warning">${cleanMsg}</span>`;
  } else if (type === 'info') {
    formattedMsg = `<span class="log-info">${cleanMsg}</span>`;
  }

  if (logsEl.textContent.trim() === 'Ready to start automation logs...') {
    logsEl.innerHTML = '';
  }

  logsEl.innerHTML += formattedMsg + '\n';
  logsEl.scrollTop = logsEl.scrollHeight;
}

async function runCommentAutomation() {
  const target = document.getElementById('commentTarget').value.trim();
  const keyword = document.getElementById('commentKeyword').value.trim();
  const commentInstruction = document.getElementById('commentPrompt').value.trim();
  
  const provider = document.getElementById('provider').value;
  const model = document.getElementById('model').value;
  const apiKey = document.getElementById('aiKey').value.trim();

  const runBtn = document.getElementById('runCommentAutoBtn');
  const stopBtn = document.getElementById('stopCommentAutoBtn');
  const logsEl = document.getElementById('commentLogs');

  if (!isConnected) {
    showToast('Please connect your Substack account first', 'error');
    return;
  }

  if (!target) {
    showToast('Please enter a target account (ID, slug, or URL)', 'error');
    return;
  }

  if (!keyword) {
    showToast('Please enter a keyword or match phrase', 'error');
    return;
  }

  const hasBackendKey = window.backendConfig && window.backendConfig[`${provider}ApiKey`];
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  logsEl.innerHTML = '';
  appendCommentLog(`[Client] Initializing automation...`, 'info');

  setButtonLoading(runBtn, true, 'Running…');
  stopBtn.disabled = false;

  commentAutomationAbortController = new AbortController();

  try {
    appendCommentLog(`[Client] Sending automation request to backend...`, 'info');
    
    const res = await fetch('/api/comments/automate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetAccount: target,
        keyword,
        commentInstruction: commentInstruction || undefined,
        provider,
        model,
        apiKey
      }),
      signal: commentAutomationAbortController.signal
    });

    const data = await res.json();

    if (data.logs && Array.isArray(data.logs)) {
      logsEl.innerHTML = '';
      data.logs.forEach(line => {
        let type = 'info';
        if (line.includes('MATCHED!') || line.includes('Success!')) {
          type = 'success';
        } else if (line.includes('Error:') || line.includes('Fatal Error:')) {
          type = 'error';
        } else if (line.includes('Warning:')) {
          type = 'warning';
        } else if (line.includes('Evaluating:') || line.includes('Starting')) {
          type = 'highlight';
        }
        appendCommentLog(line, type);
      });
    }

    if (!res.ok) {
      throw new Error(data.error || 'Comment automation failed');
    }

    const commentCount = data.results ? data.results.filter(r => r.status === 'success').length : 0;
    showToast(`Automation complete! Placed ${commentCount} new comments.`, 'success');
    appendCommentLog(`[Client] Automation completed successfully. Placed ${commentCount} comments.`, 'success');

  } catch (err) {
    if (err.name === 'AbortError') {
      appendCommentLog(`[Client] Automation stopped by user.`, 'warning');
      showToast('Automation stopped', 'info');
    } else {
      appendCommentLog(`[Client] Error: ${err.message}`, 'error');
      showToast(err.message, 'error');
    }
  } finally {
    setButtonLoading(runBtn, false, '<i data-lucide="play"></i> Run Automation');
    stopBtn.disabled = true;
    commentAutomationAbortController = null;
  }
}

function stopCommentAutomation() {
  if (commentAutomationAbortController) {
    commentAutomationAbortController.abort();
  }
}

// ─── Newsletters Listing ───
async function loadArchive() {
  const btn = document.getElementById('loadArchiveBtn');
  const listEl = document.getElementById('archiveList');

  if (!isConnected) {
    showToast('Please connect your Substack account first', 'error');
    return;
  }

  setButtonLoading(btn, true, 'Fetching…');
  listEl.innerHTML = '<div class="history-empty"><span class="spinner"></span> Loading publication archive...</div>';

  try {
    const res = await fetch('/api/newsletters');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch newsletters');
    }

    const posts = data.posts || [];
    if (posts.length === 0) {
      listEl.innerHTML = '<div class="history-empty">No newsletters found on this publication.</div>';
      return;
    }

    listEl.innerHTML = posts.map(post => {
      const pubDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <div class="history-item">
          <div class="history-item-content">
            <a href="${escapeHtml(post.url)}" target="_blank" class="history-item-link" title="Open newsletter on Substack">
              <div style="display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1;">
                <span class="history-item-title" style="font-weight: 600; color: var(--text-primary); font-size: 1rem;">${escapeHtml(post.title)}</span>
                <span style="font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(post.subtitle || post.truncatedBody)}</span>
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
    showToast('Archive loaded successfully!', 'success');

  } catch (err) {
    listEl.innerHTML = `<div class="history-empty" style="color: var(--error);">${escapeHtml(err.message)}</div>`;
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="rotate-ccw"></i> Fetch Archive');
  }
}

// ─── Generate Note with AI ───
async function handleGenerateNote() {
  const topic = document.getElementById('noteTopic').value.trim();
  const provider = document.getElementById('provider').value;
  const model = document.getElementById('model').value;
  const apiKey = document.getElementById('aiKey').value.trim();
  const systemPrompt = document.getElementById('systemPrompt').value.trim();
  const btn = document.getElementById('generateNoteBtn');

  if (!topic) {
    showToast('Please enter a topic', 'error');
    return;
  }
  
  const hasBackendKey = window.backendConfig && window.backendConfig[`${provider}ApiKey`];
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  setButtonLoading(btn, true, 'Generating…');

  try {
    const res = await fetch('/api/notes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, provider, model, apiKey, systemPrompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Generation failed');
    }

    document.getElementById('noteBody').value = data.note.body;
    updateNotePreview();

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
    
    // Load notes again to show the newly published note in history
    setTimeout(loadNotes, 1500);
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

  if (!md.trim()) {
    previewEl.innerHTML = '<div class="preview-placeholder">Note preview will appear here…</div>';
    return;
  }

  try {
    previewEl.innerHTML = marked.parse(md);
  } catch {
    previewEl.textContent = md;
  }
}

// ─── Notes Listing ───
async function loadNotes() {
  const btn = document.getElementById('loadNotesBtn');
  const listEl = document.getElementById('notesList');

  if (!isConnected) {
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

