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
  openrouter: [
    { value: 'openrouter/free:online', label: 'Online Search Model (Free - Web Search)' },
    { value: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash (via OpenRouter)' },
    { value: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B (via OpenRouter)' },
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet (via OpenRouter)' },
    { value: 'deepseek/deepseek-chat', label: 'DeepSeek Chat (via OpenRouter)' },
  ],
};

// ─── State ───
let isConnected = false;
let allHistoryItems = [];

// ─── Initialization ───
document.addEventListener('DOMContentLoaded', async () => {
  updateModelOptions();
  loadSavedSettings();

  // Initialize App Theme
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    setTimeout(() => updateThemeToggleIcon(true), 50);
  }

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

  // Setup SID listener to save on update
  document.getElementById('sid').addEventListener('input', saveSettings);

  // Setup dynamic metadata preview listeners
  const postTitle = document.getElementById('postTitle');
  const postSubtitle = document.getElementById('postSubtitle');
  if (postTitle) postTitle.addEventListener('input', updatePreviewMetadata);
  if (postSubtitle) postSubtitle.addEventListener('input', updatePreviewMetadata);

  // Setup note preview listener
  const noteLink = document.getElementById('noteLink');
  if (noteLink) noteLink.addEventListener('input', updateNotePreview);

  // Load input histories
  loadAllInputHistories();

  // Setup draftToggle listener to update button label
  const draftToggle = document.getElementById('draftToggle');
  if (draftToggle) {
    draftToggle.addEventListener('change', updatePublishButtonLabel);
  }
  updatePublishButtonLabel();

  // Initialize custom date/time picker widget (default: 1 hour in the future)
  dtInitWidget();

  // Restore Active Tab on reload from URL path
  const activeTab = getTabFromPath(window.location.pathname);
  switchTab(activeTab, true);

  // Listen for browser back/forward navigation
  window.addEventListener('popstate', () => {
    const tab = getTabFromPath(window.location.pathname);
    switchTab(tab, true);
  });
});

// ─── Settings Persistence (localStorage & Backend Env) ───
function hasBackendApiKey(provider) {
  if (!window.backendConfig) return false;
  const flags = {
    groq: 'hasGroqApiKey',
    gemini: 'hasGeminiApiKey',
    openai: 'hasOpenAiApiKey',
    openrouter: 'hasOpenrouterApiKey',
  };
  return Boolean(window.backendConfig[flags[provider]]);
}

async function loadConfigFromBackend() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return;
    const config = await res.json();
    window.backendConfig = config;

    if (config.publicationUrl) {
      document.getElementById('pubUrl').value = config.publicationUrl;
    }

    loadSystemPromptForTab('newsletters');

    if (config.hasSubstackSid) {
      await handleConnect({ useServerSid: true });
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
    
    // Load saved API key for active provider
    loadApiKeyForProvider();
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

function loadApiKeyForProvider() {
  const provider = document.getElementById('provider').value;
  const keyInput = document.getElementById('aiKey');
  const modelSelect = document.getElementById('model');
  const saveBtn = document.getElementById('saveAiKeyBtn');
  
  if (!keyInput) return;
  const savedKey = localStorage.getItem(`substack_apikey_${provider}`) || '';
  keyInput.value = savedKey;

  // If API key is saved, rename button to "Update API Key" and enable model select.
  // Otherwise, rename button to "Save API Key" and disable model select.
  if (savedKey) {
    if (saveBtn) {
      saveBtn.innerHTML = '<i data-lucide="save"></i> Update API Key';
    }
    if (modelSelect) {
      modelSelect.disabled = false;
    }
  } else {
    if (saveBtn) {
      saveBtn.innerHTML = '<i data-lucide="save"></i> Save API Key';
    }
    if (modelSelect) {
      modelSelect.disabled = true;
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function saveApiKey() {
  const provider = document.getElementById('provider').value;
  const keyInput = document.getElementById('aiKey');
  if (!keyInput) return;
  const keyVal = keyInput.value.trim();
  
  localStorage.setItem(`substack_apikey_${provider}`, keyVal);
  loadApiKeyForProvider();
  showToast('Done! API Key updated.', 'success');
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

  saveSettings();
  loadApiKeyForProvider();
}

// ─── Connect to Substack ───
async function handleConnect(options = {}) {
  const sid = document.getElementById('sid').value.trim();
  const pubUrl = document.getElementById('pubUrl').value.trim();
  const btn = document.getElementById('connectBtn');
  const useServerSid = options.useServerSid || (!sid && window.backendConfig?.hasSubstackSid);

  if (!sid && !useServerSid) {
    showToast('Please enter your Substack session cookie', 'error');
    return;
  }

  setButtonLoading(btn, true, 'Connecting…');

  try {
    const res = await fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(sid ? { sid } : {}),
        publicationUrl: pubUrl || undefined,
      }),
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
  
  const hasBackendKey = hasBackendApiKey(provider);
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  setButtonLoading(btn, true, 'Generating…');

  // Inject skeleton loaders into the simulated preview body
  const previewEl = document.getElementById('preview');
  if (previewEl) {
    previewEl.innerHTML = `
      <div class="skeleton skeleton-title" style="height: 24px; width: 75%; margin-bottom: 12px;"></div>
      <div class="skeleton skeleton-subtitle" style="height: 16px; width: 45%; margin-bottom: 24px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 100%; margin-bottom: 8px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 100%; margin-bottom: 8px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 80%; margin-bottom: 8px;"></div>
    `;
  }
  const previewTitle = document.getElementById('previewTitle');
  const previewSubtitle = document.getElementById('previewSubtitle');
  if (previewTitle) {
    previewTitle.innerHTML = `<span class="skeleton" style="display: block; height: 30px; width: 80%;"></span>`;
  }
  if (previewSubtitle) {
    previewSubtitle.innerHTML = `<span class="skeleton" style="display: block; height: 18px; width: 50%;"></span>`;
    previewSubtitle.style.display = 'block';
  }

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

    addToInputHistory('topic', topic);

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
    setTimeout(loadHistory, 1500);
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
  } else {
    try {
      previewEl.innerHTML = marked.parse(md);
    } catch {
      previewEl.textContent = md;
    }
  }
  updatePreviewMetadata();
}

function updatePreviewMetadata() {
  const title = document.getElementById('postTitle').value.trim();
  const subtitle = document.getElementById('postSubtitle').value.trim();
  
  const previewTitle = document.getElementById('previewTitle');
  const previewSubtitle = document.getElementById('previewSubtitle');

  if (previewTitle) {
    previewTitle.textContent = title || 'Post Title';
  }
  if (previewSubtitle) {
    if (subtitle) {
      previewSubtitle.textContent = subtitle;
      previewSubtitle.style.display = 'block';
    } else {
      previewSubtitle.style.display = 'none';
    }
  }
}

// ─── UI Helpers ───

let currentProfile = null;

function updateConnectionBadge(profile) {
  const badge = document.getElementById('connectionBadge');
  const text = document.getElementById('connectionText');
  const avatar = document.getElementById('profileAvatar');
  const subLink = document.getElementById('profileSubLink');
  const discBtn = document.getElementById('disconnectBtn');

  currentProfile = profile;

  if (profile) {
    badge.className = 'profile-card connected';
    text.textContent = profile.name || 'Connected';
    
    // Initials for avatar
    const initials = (profile.name || '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2) || 'U';
    avatar.textContent = initials;
    avatar.style.background = 'var(--accent)';
    avatar.style.color = 'var(--bg-primary)';

    // Update Substack site link
    if (profile.slug) {
      const pubUrl = document.getElementById('pubUrl').value.trim();
      let href = pubUrl ? (pubUrl.startsWith('http') ? pubUrl : `https://${pubUrl}`) : `https://${profile.slug}.substack.com`;
      subLink.href = href;
      subLink.textContent = profile.slug + '.substack.com';
      subLink.style.display = 'block';
    } else {
      subLink.style.display = 'none';
    }

    discBtn.style.display = 'flex';

    // Update dynamic fields in simulated Substack previews
    updateSimulatedPreviewHeader(profile);
  } else {
    badge.className = 'profile-card disconnected';
    text.textContent = 'Not connected';
    avatar.textContent = '?';
    avatar.style.background = 'var(--bg-hover)';
    avatar.style.color = 'var(--text-secondary)';
    subLink.style.display = 'none';
    discBtn.style.display = 'none';

    // Clear dynamic fields in simulated Substack previews
    updateSimulatedPreviewHeader(null);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function updateSimulatedPreviewHeader(profile) {
  const pubLogo = document.getElementById('previewPubLogo');
  const pubName = document.getElementById('previewPubName');
  const authorAvatar = document.getElementById('previewAuthorAvatar');
  const authorName = document.getElementById('previewAuthorName');
  
  const noteAvatar = document.getElementById('notePreviewAvatar');
  const noteAuthorName = document.getElementById('notePreviewAuthorName');
  const noteSlug = document.getElementById('notePreviewSlug');

  const formattedDate = new Date().toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const dateEl = document.getElementById('previewDate');
  if (dateEl) dateEl.textContent = formattedDate;

  if (profile) {
    const initials = (profile.name || '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2) || 'U';

    if (pubLogo) pubLogo.textContent = initials[0] || 'S';
    if (pubName) pubName.textContent = profile.name + "'s Substack";
    if (authorAvatar) authorAvatar.textContent = initials;
    if (authorName) authorName.textContent = profile.name;

    if (noteAvatar) noteAvatar.textContent = initials;
    if (noteAuthorName) noteAuthorName.textContent = profile.name;
    if (noteSlug) noteSlug.textContent = profile.slug ? `@${profile.slug}` : '@profile';
  } else {
    if (pubLogo) pubLogo.textContent = 'S';
    if (pubName) pubName.textContent = 'My Publication';
    if (authorAvatar) authorAvatar.textContent = 'U';
    if (authorName) authorName.textContent = 'Author Name';

    if (noteAvatar) noteAvatar.textContent = 'U';
    if (noteAuthorName) noteAuthorName.textContent = 'Author Name';
    if (noteSlug) noteSlug.textContent = '@slug';
  }
}

async function handleDisconnect() {
  const confirmed = confirm('Are you sure you want to disconnect your Substack account?');
  if (!confirmed) return;

  try {
    const res = await fetch('/api/disconnect', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to disconnect from server');

    isConnected = false;
    updateConnectionBadge(null);
    document.getElementById('publishBtn').disabled = true;

    // Clear SID from settings inputs
    document.getElementById('sid').value = '';
    
    // Save settings (so they are cleared in localstorage too)
    saveSettings();

    showToast('Session disconnected successfully', 'success');
  } catch (err) {
    showToast(err.message, 'error');
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
    info: 'info',
    warning: 'alert-circle'
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

function openSidebarAndFocusSid() {
  const grid = document.querySelector('.main-grid');
  if (grid && grid.classList.contains('sidebar-collapsed')) {
    grid.classList.remove('sidebar-collapsed');
    localStorage.setItem('sidebar_collapsed', 'false');
  }
  const sidInput = document.getElementById('sid');
  if (sidInput) {
    sidInput.focus();
    sidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  showToast('Please paste your Substack SID cookie value to connect.', 'info');
}

// ─── Theme Toggling ───
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('app_theme', isLight ? 'light' : 'dark');
  updateThemeToggleIcon(isLight);
}

function updateThemeToggleIcon(isLight) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  if (isLight) {
    btn.innerHTML = `<i data-lucide="moon" style="width: 18px; height: 18px;"></i>`;
    btn.title = "Switch to Dark Mode";
  } else {
    btn.innerHTML = `<i data-lucide="sun" style="width: 18px; height: 18px;"></i>`;
    btn.title = "Switch to Light Mode";
  }
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ─── Publish History ───
function loadPublishHistory() {
  const historyList = document.getElementById('newsletterHistoryList');
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

// ─── URL Path <-> Tab Mapping ───
const TAB_TO_PATH = {
  newsletters: '/newsletter',
  comments: '/comments',
  notes: '/notes',
  scheduler: '/scheduler',
  history: '/history',
};

const PATH_TO_TAB = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab])
);

function getTabFromPath(pathname) {
  // Normalize: strip trailing slash
  const p = pathname.replace(/\/$/, '') || '/';
  return PATH_TO_TAB[p] || 'newsletters';
}

// ─── Tab Switching ───
function switchTab(tabId, skipPush) {
  localStorage.setItem('active_tab', tabId);

  // Update URL (pushState) unless this is from popstate or initial load
  if (!skipPush) {
    const targetPath = TAB_TO_PATH[tabId] || '/newsletter';
    if (window.location.pathname !== targetPath) {
      history.pushState({ tab: tabId }, '', targetPath);
    }
  }

  const tabs = ['newsletters', 'comments', 'notes', 'scheduler', 'history'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    const view = document.getElementById(`view-${t}`);
    if (t === tabId) {
      if (btn) btn.classList.add('active');
      if (view) {
        view.style.display = 'block';
        // force reflow
        view.offsetHeight;
        view.classList.add('active-tab');
      }
    } else {
      if (btn) btn.classList.remove('active');
      if (view) {
        view.classList.remove('active-tab');
        view.style.display = 'none';
      }
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

  if (tabId === 'history') {
    const listEl = document.getElementById('historyList');
    if (listEl && listEl.innerHTML.includes('Click "Fetch History"')) {
      loadHistory();
    }
  } else if (tabId === 'notes') {
    const listEl = document.getElementById('notesList');
    if (listEl && listEl.innerHTML.includes('Click "Fetch Notes"')) {
      loadNotes();
    }
  } else if (tabId === 'scheduler') {
    loadSchedules();
    updateSchedModelOptions();
  }

  if (tabId === 'scheduler') {
    startSchedulerPolling();
  } else {
    stopSchedulerPolling();
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

  const hasBackendKey = hasBackendApiKey(provider);
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  logsEl.innerHTML = '';
  appendCommentLog(`[Client] Initializing automation...`, 'info');

  const consoleTitleState = document.getElementById('consoleTitleState');
  if (consoleTitleState) {
    consoleTitleState.className = 'console-title-text';
  }

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

    addToInputHistory('commentTarget', target);
    addToInputHistory('commentKeyword', keyword);

    if (commentCount > 0) {
      loadHistory();
    }

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
    if (consoleTitleState) {
      consoleTitleState.className = 'console-title-text console-idle';
    }
  }
}

function stopCommentAutomation() {
  if (commentAutomationAbortController) {
    commentAutomationAbortController.abort();
  }
}

// ─── Newsletters Listing ───
// ─── Publication History Listing ───
async function loadHistory() {
  const btn = document.getElementById('loadHistoryBtn');
  const listEl = document.getElementById('historyList');

  if (!isConnected) {
    showToast('Please connect your Substack account first', 'error');
    return;
  }

  setButtonLoading(btn, true, 'Fetching…');
  listEl.innerHTML = '<div class="history-empty"><span class="spinner"></span> Loading publication history...</div>';

  let newsletters = [];
  let notes = [];
  let comments = [];
  let errors = [];

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

  if (errors.length > 0) {
    showToast(`Failed to load: ${errors.join(', ')}`, 'warning');
  } else {
    showToast('History loaded successfully!', 'success');
  }

  // Merge all items
  allHistoryItems = [...newsletters, ...notes, ...comments];
  
  filterAndRenderHistory();
  setButtonLoading(btn, false, '<i data-lucide="rotate-ccw"></i> Fetch History');
}

function filterAndRenderHistory() {
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
  if (typeFilter !== 'all') {
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
            <span class="history-item-date" style="color: var(--text-muted); font-size: 0.76rem;">${escapeHtml(pubDate)}</span>
          </div>
          
          <!-- Actions bar (CTAs) -->
          <div style="display: flex; align-items: center; gap: 8px;">
            <a href="${escapeHtml(item.url)}" target="_blank" class="btn btn-secondary btn-sm" title="Open on Substack" style="padding: 4px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 4px; text-decoration: none; border-color: var(--border);">
              <i data-lucide="external-link" style="width: 12px; height: 12px; stroke-width: 2.2px;"></i> View
            </a>
            <button class="btn btn-secondary btn-sm" onclick="copyHistoryLink('${escapeHtml(item.url)}')" title="Copy Link" style="padding: 4px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 4px; border-color: var(--border);">
              <i data-lucide="copy" style="width: 12px; height: 12px; stroke-width: 2.2px;"></i> Link
            </button>
            <button class="btn btn-primary btn-sm" onclick="reuseHistoryItem('${escapeHtml(item.id)}')" title="Load into Composer" style="padding: 4px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 4px; background: var(--accent); color: var(--bg-primary);">
              <i data-lucide="refresh-cw" style="width: 12px; height: 12px; stroke-width: 2.2px;"></i> Reuse
            </button>
          </div>
        </div>
        
        <!-- Content section -->
        <div style="display: flex; flex-direction: column; gap: 6px; min-width: 0; width: 100%;">
          ${item.type === 'newsletter' ? `
            <a href="${escapeHtml(item.url)}" target="_blank" style="text-decoration: none; color: inherit; font-weight: 600; font-size: 1rem; width: fit-content; max-width: 100%; display: flex; align-items: center; gap: 6px;">
              <span>${escapeHtml(item.title)}</span>
            </a>
          ` : `<div style="font-weight: 600; color: inherit; font-size: 0.9rem;">${escapeHtml(item.title)}</div>`}
          
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
function copyHistoryLink(url) {
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

function toggleBodyText(id) {
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

function reuseHistoryItem(id) {
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
      body: JSON.stringify({ topic, provider, model, apiKey, systemPrompt }),
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

// ─── Input History Handling ───
function addToInputHistory(inputId, value) {
  if (!value) return;
  const historyKey = `history_${inputId}`;
  let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  
  history = history.filter(item => item !== value);
  history.unshift(value);
  
  if (history.length > 10) history.pop();
  
  localStorage.setItem(historyKey, JSON.stringify(history));
  updateDatalist(inputId);
}

function updateDatalist(inputId) {
  const historyKey = `history_${inputId}`;
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  const datalist = document.getElementById(`${inputId}-history`);
  if (!datalist) return;
  
  datalist.innerHTML = history.map(val => `<option value="${escapeHtml(val)}"></option>`).join('');
}

function loadAllInputHistories() {
  const inputIds = ['topic', 'commentTarget', 'commentKeyword', 'noteTopic', 'noteLink'];
  inputIds.forEach(id => updateDatalist(id));
}

// ─── Scheduler tab logic ───

function toggleSchedulerFields() {
  const postType = document.getElementById('schedPostType').value;
  const newsFields = document.getElementById('schedNewsletterFields');
  const noteFields = document.getElementById('schedNoteFields');
  const draftWrap = document.getElementById('schedDraftToggleWrap');

  if (postType === 'note') {
    newsFields.style.display = 'none';
    noteFields.style.display = 'block';
    draftWrap.style.display = 'none';
  } else {
    newsFields.style.display = 'grid';
    noteFields.style.display = 'none';
    draftWrap.style.display = 'flex';
  }
}

async function loadSchedules() {
  const container = document.getElementById('schedulesQueueList');
  if (!container) return;

  try {
    const res = await fetch('/api/schedule');
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to load schedules');

    const schedules = data.schedules || [];

    if (schedules.length === 0) {
      container.innerHTML = '<div class="history-empty">No posts currently scheduled.</div>';
      return;
    }

    container.innerHTML = schedules.map(item => {
      const date = new Date(item.scheduledAt).toLocaleString();
      const lastRun = item.lastRunAt ? new Date(item.lastRunAt).toLocaleString() : 'Never';
      const statusClass = `badge-${item.status}`;

      const isPaused = item.status === 'paused';
      const toggleText = isPaused ? 'Resume' : 'Pause';
      const toggleIcon = isPaused ? 'play' : 'pause';

      return `
        <div class="schedule-item">
          <div class="schedule-item-info">
            <div class="schedule-item-header">
              <span class="schedule-item-type">${escapeHtml(item.postType)}</span>
              <span class="schedule-item-title">${escapeHtml(item.title || item.body.substring(0, 50) + '...')}</span>
              <span class="badge ${statusClass}">${escapeHtml(item.status)}</span>
            </div>
            <div class="schedule-item-meta">
              <div class="schedule-item-meta-item" title="Scheduled execution time">
                <i data-lucide="clock"></i>
                <span>Next Run: <strong>${date}</strong></span>
              </div>
              <div class="schedule-item-meta-item" title="Recurrence pattern">
                <i data-lucide="repeat"></i>
                <span>Recurrence: <strong>${escapeHtml(item.recurrence)}</strong></span>
              </div>
              <div class="schedule-item-meta-item" title="Last run time">
                <i data-lucide="check-square"></i>
                <span>Last Run: ${lastRun}</span>
              </div>
              ${item.enableSearch ? `
                <div class="schedule-item-meta-item" style="color: var(--accent);" title="Web research enabled">
                  <i data-lucide="search" style="color: var(--accent);"></i>
                  <span>Internet Research: <strong>Enabled</strong></span>
                </div>
              ` : ''}
              ${item.errorMessage ? `
                <div class="schedule-item-meta-item" style="color: var(--error);" title="Error message">
                  <i data-lucide="alert-triangle"></i>
                  <span>Error: ${escapeHtml(item.errorMessage)}</span>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="schedule-item-actions">
            <button class="btn btn-secondary btn-sm" onclick="toggleScheduleState('${item.id}')" title="${toggleText} Schedule" style="display: flex; align-items: center; gap: 4px;">
              <i data-lucide="${toggleIcon}" style="width: 14px; height: 14px;"></i> ${toggleText}
            </button>
            <button class="btn btn-secondary btn-sm" style="color: var(--error); border-color: rgba(239, 68, 68, 0.2); display: flex; align-items: center; gap: 4px;" onclick="deleteScheduleItem('${item.id}')" title="Delete Schedule">
              <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Delete
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleCreateSchedule() {
  const postType = document.getElementById('schedPostType').value;
  const title = document.getElementById('schedTitle').value.trim();
  const subtitle = document.getElementById('schedSubtitle').value.trim();
  const noteLink = document.getElementById('schedNoteLink').value.trim();
  const body = document.getElementById('schedBody').value.trim();
  const scheduledAt = document.getElementById('schedTime').value;
  // New fields
  const enableSearch = document.getElementById('schedEnableSearch').checked;
  const provider = document.getElementById('schedProvider').value;
  const model = document.getElementById('schedModel').value;
  const apiKey = document.getElementById('schedApiKey').value.trim();
  const systemPrompt = document.getElementById('schedSystemPrompt').value.trim();

  const btn = document.getElementById('schedSubmitBtn');

  if (postType === 'note') {
    if (!body) {
      showToast('Research topic/keywords is required for notes', 'error');
      return;
    }
  } else {
    if (!title) {
      showToast('Title/Topic is required for newsletters', 'error');
      return;
    }
    if (!enableSearch && !body) {
      showToast('Body content is required for newsletters when search is disabled', 'error');
      return;
    }
  }

  if (!scheduledAt) {
    showToast('Please select a scheduled date and time', 'error');
    return;
  }

  const isoTime = new Date(scheduledAt).toISOString();

  setButtonLoading(btn, true, 'Scheduling...');

  try {
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        subtitle,
        body,
        isDraft,
        scheduledAt: isoTime,
        recurrence,
        postType,
        noteLink,
        enableSearch,
        provider: provider || undefined,
        model: model || undefined,
        apiKey: apiKey || undefined,
        systemPrompt: systemPrompt || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to schedule post');

    showToast(`Post scheduled successfully for ${new Date(scheduledAt).toLocaleString()}`, 'success');

    // Clear form fields
    document.getElementById('schedTitle').value = '';
    document.getElementById('schedSubtitle').value = '';
    document.getElementById('schedNoteLink').value = '';
    document.getElementById('schedBody').value = '';

    // Reload queue list
    await loadSchedules();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="calendar"></i> Schedule Post');
  }
}

async function toggleScheduleState(id) {
  try {
    const res = await fetch(`/api/schedule/${id}/toggle`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to toggle schedule');

    const state = data.schedule.status === 'paused' ? 'paused' : 'resumed/active';
    showToast(`Schedule was successfully ${state}`, 'success');
    await loadSchedules();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteScheduleItem(id) {
  const confirmed = confirm('Are you sure you want to delete this scheduled post?');
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/schedule/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete schedule');

    showToast('Scheduled post deleted successfully', 'success');
    await loadSchedules();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function runManualCron() {
  showToast('Triggering queue check...', 'info');
  try {
    const res = await fetch('/api/cron/process-schedules');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to trigger queue check');

    const count = data.processedCount || 0;
    if (count > 0) {
      showToast(`Queue check complete: processed ${count} posts!`, 'success');
    } else {
      showToast('Queue check complete: no due posts found.', 'info');
    }
    await loadSchedules();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

window.toggleSchedulerFields = toggleSchedulerFields;
window.loadSchedules = loadSchedules;
window.handleCreateSchedule = handleCreateSchedule;
window.toggleScheduleState = toggleScheduleState;
window.deleteScheduleItem = deleteScheduleItem;
window.runManualCron = runManualCron;

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = btnEl.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.setAttribute('data-lucide', 'eye-off');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.setAttribute('data-lucide', 'eye');
    }
  }
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

let schedulerPollingInterval = null;

async function runSilentQueueCheck() {
  const indicator = document.getElementById('pollingIndicator');
  
  if (indicator) {
    indicator.style.backgroundColor = 'var(--accent)';
    indicator.style.boxShadow = '0 0 8px var(--accent)';
  }
  
  try {
    const res = await fetch('/api/cron/process-schedules');
    const data = await res.json();
    if (res.ok && data.processedCount > 0) {
      showToast(`Automatically processed ${data.processedCount} due scheduled post(s)!`, 'success');
      await loadSchedules();
    } else if (res.ok) {
      // Just refresh the list silently
      await loadSchedules();
    }
  } catch (err) {
    console.error('Silent queue check failed:', err);
  } finally {
    setTimeout(() => {
      if (indicator) {
        indicator.style.backgroundColor = 'var(--text-muted)';
        indicator.style.boxShadow = 'none';
      }
    }, 1000);
  }
}

function startSchedulerPolling() {
  if (schedulerPollingInterval) return;
  
  // Set the dynamic endpoint URL dynamically in the banner!
  const endpointEl = document.getElementById('cronEndpointSnippet');
  if (endpointEl) {
    endpointEl.textContent = `${window.location.origin}/api/cron/process-schedules`;
  }
  
  // Initial run
  runSilentQueueCheck();
  
  schedulerPollingInterval = setInterval(runSilentQueueCheck, 60 * 1000);
  
  const statusEl = document.getElementById('pollingStatus');
  if (statusEl) {
    statusEl.style.display = 'flex';
  }
}

function stopSchedulerPolling() {
  if (schedulerPollingInterval) {
    clearInterval(schedulerPollingInterval);
    schedulerPollingInterval = null;
  }
  const statusEl = document.getElementById('pollingStatus');
  if (statusEl) {
    statusEl.style.display = 'none';
  }
}

function toggleSchedSearchFields() {
  const enableSearch = document.getElementById('schedEnableSearch').checked;
  const bodyLabel = document.getElementById('schedBodyLabel');
  const bodyTextarea = document.getElementById('schedBody');
  const postType = document.getElementById('schedPostType').value;

  if (enableSearch) {
    if (postType === 'newsletter') {
      bodyLabel.textContent = 'Research Topic Description / Writing Guidelines';
      bodyTextarea.placeholder = 'e.g. Focus on the main technical details of the news, contrast it with older versions, and write in a professional tone...';
    } else {
      bodyLabel.textContent = 'Research Topic / Keywords';
      bodyTextarea.placeholder = 'e.g. SpaceX Mars Launch updates';
    }
  } else {
    if (postType === 'newsletter') {
      bodyLabel.textContent = 'Content / Body (Supports Markdown for Newsletters)';
      bodyTextarea.placeholder = 'Write post content here...';
    } else {
      bodyLabel.textContent = 'Content / Body';
      bodyTextarea.placeholder = 'Write post content here...';
    }
  }
}

function updateSchedModelOptions() {
  const provider = document.getElementById('schedProvider').value;
  const modelSelect = document.getElementById('schedModel');
  
  modelSelect.innerHTML = '';
  
  // Add default option
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = '(Use System Default)';
  modelSelect.appendChild(defaultOpt);
  
  if (!provider) return;
  
  const models = MODELS[provider] || [];
  models.forEach((m) => {
    const opt = document.createElement('option');
    opt.value = m.value;
    opt.textContent = m.label;
    modelSelect.appendChild(opt);
  });
}

window.togglePasswordVisibility = togglePasswordVisibility;
window.startSchedulerPolling = startSchedulerPolling;
window.stopSchedulerPolling = stopSchedulerPolling;
window.toggleSchedSearchFields = toggleSchedSearchFields;
window.updateSchedModelOptions = updateSchedModelOptions;

// ─── Custom Date/Time Picker Widget ───

let dtState = {
  viewYear: 2026,
  viewMonth: 5, // 0-indexed: June
  selectedDate: null, // Date object (date portion only)
  hour12: 12,
  minute: 0,
  ampm: 'AM',
  isOpen: false,
};

function dtInitWidget() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  now.setMinutes(0, 0, 0);

  dtState.viewYear = now.getFullYear();
  dtState.viewMonth = now.getMonth();
  dtState.selectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let h = now.getHours();
  dtState.ampm = h >= 12 ? 'PM' : 'AM';
  dtState.hour12 = h % 12 || 12;
  dtState.minute = now.getMinutes();

  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
  dtRenderCalendar();
  dtUpdateTimeUI();

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const widget = document.getElementById('datetimeWidget');
    if (widget && dtState.isOpen && !widget.contains(e.target)) {
      dtCloseWidget();
    }
  });
}

function toggleDatetimeWidget() {
  if (dtState.isOpen) {
    dtCloseWidget();
  } else {
    dtOpenWidget();
  }
}

function dtOpenWidget() {
  dtState.isOpen = true;
  const widget = document.getElementById('datetimeWidget');
  if (widget) widget.classList.add('open');
  dtRenderCalendar();
  dtUpdateTimeUI();
  if (window.lucide) lucide.createIcons();
}

function dtCloseWidget() {
  dtState.isOpen = false;
  const widget = document.getElementById('datetimeWidget');
  if (widget) widget.classList.remove('open');
}

function dtNavigateMonth(delta) {
  dtState.viewMonth += delta;
  if (dtState.viewMonth > 11) {
    dtState.viewMonth = 0;
    dtState.viewYear++;
  } else if (dtState.viewMonth < 0) {
    dtState.viewMonth = 11;
    dtState.viewYear--;
  }
  dtRenderCalendar();
  if (window.lucide) lucide.createIcons();
}

function dtRenderCalendar() {
  const grid = document.getElementById('dtCalendarGrid');
  const monthYearEl = document.getElementById('dtMonthYear');
  if (!grid || !monthYearEl) return;

  const year = dtState.viewYear;
  const month = dtState.viewMonth;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let html = '';

  // Previous month filler days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    html += `<button type="button" class="dt-day dt-day-outside" tabindex="-1" disabled>${d}</button>`;
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(year, month, d);
    const isPast = thisDate < today;
    const isToday = thisDate.getTime() === today.getTime();
    const isSelected = dtState.selectedDate &&
      dtState.selectedDate.getFullYear() === year &&
      dtState.selectedDate.getMonth() === month &&
      dtState.selectedDate.getDate() === d;

    let cls = 'dt-day';
    if (isToday) cls += ' dt-day-today';
    if (isSelected) cls += ' dt-day-selected';
    if (isPast) cls += ' dt-day-disabled';

    html += `<button type="button" class="${cls}" onclick="dtSelectDay(${d})"${isPast ? ' disabled' : ''}>${d}</button>`;
  }

  // Next month filler days
  const totalCells = firstDay + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    html += `<button type="button" class="dt-day dt-day-outside" tabindex="-1" disabled>${d}</button>`;
  }

  grid.innerHTML = html;
}

function dtSelectDay(day) {
  dtState.selectedDate = new Date(dtState.viewYear, dtState.viewMonth, day);
  dtRenderCalendar();
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
}

function dtSpinTime(type, delta) {
  if (type === 'hour') {
    dtState.hour12 += delta;
    if (dtState.hour12 > 12) dtState.hour12 = 1;
    if (dtState.hour12 < 1) dtState.hour12 = 12;
  } else if (type === 'minute') {
    dtState.minute += delta * 5;
    if (dtState.minute >= 60) dtState.minute = 0;
    if (dtState.minute < 0) dtState.minute = 55;
  }
  dtUpdateTimeUI();
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
}

function dtValidateTimeInput(el, type) {
  let val = el.value.replace(/[^0-9]/g, '');
  if (type === 'hour') {
    let n = parseInt(val, 10);
    if (isNaN(n)) n = 12;
    if (n > 12) n = 12;
    if (n < 1) n = 1;
    dtState.hour12 = n;
    el.value = String(n).padStart(2, '0');
  } else {
    let n = parseInt(val, 10);
    if (isNaN(n)) n = 0;
    if (n > 59) n = 59;
    if (n < 0) n = 0;
    dtState.minute = n;
    el.value = String(n).padStart(2, '0');
  }
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
}

function dtSetAmPm(val) {
  dtState.ampm = val;
  dtUpdateTimeUI();
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
}

function dtQuickTime(h24, m) {
  dtState.ampm = h24 >= 12 ? 'PM' : 'AM';
  dtState.hour12 = h24 % 12 || 12;
  dtState.minute = m;
  dtUpdateTimeUI();
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
}

function dtSetToday() {
  const now = new Date();
  dtState.viewYear = now.getFullYear();
  dtState.viewMonth = now.getMonth();
  dtState.selectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  dtRenderCalendar();
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
}

function dtConfirm() {
  dtSyncHiddenInput();
  dtUpdateTriggerDisplay();
  dtCloseWidget();
  showToast(`Scheduled: ${dtGetFormattedDisplay().date} at ${dtGetFormattedDisplay().time}`, 'info');
}

function dtUpdateTimeUI() {
  const hourEl = document.getElementById('dtHourInput');
  const minEl = document.getElementById('dtMinuteInput');
  const amBtn = document.getElementById('dtAmBtn');
  const pmBtn = document.getElementById('dtPmBtn');

  if (hourEl) hourEl.value = String(dtState.hour12).padStart(2, '0');
  if (minEl) minEl.value = String(dtState.minute).padStart(2, '0');
  if (amBtn) amBtn.classList.toggle('active', dtState.ampm === 'AM');
  if (pmBtn) pmBtn.classList.toggle('active', dtState.ampm === 'PM');
}

function dtGetFormattedDisplay() {
  let dateStr = 'Select date';
  let timeStr = 'Select time';

  if (dtState.selectedDate) {
    dateStr = dtState.selectedDate.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  timeStr = `${dtState.hour12}:${String(dtState.minute).padStart(2, '0')} ${dtState.ampm}`;
  return { date: dateStr, time: timeStr };
}

function dtUpdateTriggerDisplay() {
  const { date, time } = dtGetFormattedDisplay();
  const dateEl = document.getElementById('dtWidgetDate');
  const timeEl = document.getElementById('dtWidgetTime');
  if (dateEl) dateEl.textContent = date;
  if (timeEl) timeEl.textContent = time;
}

function dtSyncHiddenInput() {
  const input = document.getElementById('schedTime');
  if (!input || !dtState.selectedDate) return;

  let h24 = dtState.hour12 % 12;
  if (dtState.ampm === 'PM') h24 += 12;

  const d = dtState.selectedDate;
  // Format: YYYY-MM-DDTHH:MM (same as datetime-local)
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(h24).padStart(2, '0')}:${String(dtState.minute).padStart(2, '0')}`;
  input.value = iso;
}

function dtSelectPromptPreset(type) {
  const schedBody = document.getElementById('schedBody');
  if (!schedBody) return;

  const presets = {
    tech: "Focus on the main technical details, architectural decisions, code patterns, and practical code snippets. Contrast it with alternatives and write in a professional, builder-focused tone.",
    strategy: "Focus on the business strategy, user experience, market positioning, target audience, and future impact. Keep the tone engaging, strategic, and analytical.",
    casual: "Provide a quick, punchy summary highlighting what is exciting and what might be overhyped. Write in a casual, conversational, and highly opinionated tone."
  };

  schedBody.value = presets[type] || "";
}

// Global exports for onclick handlers
window.toggleDatetimeWidget = toggleDatetimeWidget;
window.dtNavigateMonth = dtNavigateMonth;
window.dtSelectDay = dtSelectDay;
window.dtSpinTime = dtSpinTime;
window.dtValidateTimeInput = dtValidateTimeInput;
window.dtSetAmPm = dtSetAmPm;
window.dtQuickTime = dtQuickTime;
window.dtSetToday = dtSetToday;
window.dtConfirm = dtConfirm;
window.saveApiKey = saveApiKey;
window.dtSelectPromptPreset = dtSelectPromptPreset;



