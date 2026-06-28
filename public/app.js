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

  // Auto-save API key locally as user types (debounced)
  const aiKeyInput = document.getElementById('aiKey');
  if (aiKeyInput) {
    aiKeyInput.addEventListener('input', scheduleApiKeySave);
    aiKeyInput.addEventListener('blur', () => {
      const keyVal = aiKeyInput.value.trim();
      if (keyVal) saveApiKey({ silent: true });
    });
  }

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
const SETTINGS_STORAGE_KEY = 'substack_settings';

function getStoredSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function getStoredSid() {
  const sidInput = document.getElementById('sid');
  const fromInput = sidInput ? sidInput.value.trim() : '';
  if (fromInput) return fromInput;
  return getStoredSettings().sid || '';
}

function getStoredApiKey(provider) {
  const providerVal = provider || document.getElementById('provider')?.value;
  const keyInput = document.getElementById('aiKey');
  const fromInput = keyInput ? keyInput.value.trim() : '';
  if (fromInput) return fromInput;
  if (!providerVal) return '';
  return localStorage.getItem(`substack_apikey_${providerVal}`) || '';
}

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

    const pubUrlInput = document.getElementById('pubUrl');
    if (config.publicationUrl && pubUrlInput && !pubUrlInput.value.trim()) {
      pubUrlInput.value = config.publicationUrl;
      saveSettings();
    }

    loadSystemPromptForTab('newsletters');
    await restorePersistedSession();
  } catch (err) {
    console.error('Failed to load backend config:', err);
  }
}

async function restorePersistedSession() {
  const localSid = getStoredSid();
  if (localSid) {
    const sidInput = document.getElementById('sid');
    if (sidInput && !sidInput.value.trim()) {
      sidInput.value = localSid;
    }
    await handleConnect({ auto: true });
    return;
  }

  if (window.backendConfig?.hasSubstackSid) {
    await handleConnect({ useServerSid: true, auto: true });
  }
}

function loadSavedSettings() {
  const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!saved) {
    updateModelOptions();
    return;
  }

  try {
    const s = JSON.parse(saved);
    if (s.pubUrl) document.getElementById('pubUrl').value = s.pubUrl;
    if (s.sid) document.getElementById('sid').value = s.sid;
    if (s.provider) {
      document.getElementById('provider').value = s.provider;
      updateModelOptions();
    } else {
      updateModelOptions();
    }
    if (s.model) document.getElementById('model').value = s.model;

    loadApiKeyForProvider();
  } catch {
    updateModelOptions();
  }
}

function saveSettings() {
  const settings = {
    pubUrl: document.getElementById('pubUrl').value,
    sid: document.getElementById('sid').value.trim(),
    provider: document.getElementById('provider').value,
    model: document.getElementById('model').value,
  };
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

let apiKeySaveTimer = null;

function scheduleApiKeySave() {
  clearTimeout(apiKeySaveTimer);
  apiKeySaveTimer = setTimeout(() => {
    const keyVal = document.getElementById('aiKey')?.value.trim();
    if (keyVal) saveApiKey({ silent: true });
  }, 600);
}

function loadApiKeyForProvider() {
  const provider = document.getElementById('provider').value;
  const keyInput = document.getElementById('aiKey');
  const modelSelect = document.getElementById('model');
  const saveBtn = document.getElementById('saveAiKeyBtn');
  
  if (!keyInput) return;
  const savedKey = getStoredApiKey(provider);
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
  } else if (!hasBackendApiKey(provider)) {
    if (saveBtn) {
      saveBtn.innerHTML = '<i data-lucide="save"></i> Save API Key';
    }
    if (modelSelect) {
      modelSelect.disabled = true;
    }
  } else {
    if (saveBtn) {
      saveBtn.innerHTML = '<i data-lucide="save"></i> Save API Key';
    }
    if (modelSelect) {
      modelSelect.disabled = false;
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function saveApiKey(options = {}) {
  const { silent = false } = options;
  const provider = document.getElementById('provider').value;
  const keyInput = document.getElementById('aiKey');
  if (!keyInput) return;
  const keyVal = keyInput.value.trim();
  
  if (keyVal) {
    localStorage.setItem(`substack_apikey_${provider}`, keyVal);
  } else {
    localStorage.removeItem(`substack_apikey_${provider}`);
  }

  loadApiKeyForProvider();
  if (!silent) {
    showToast('Done! API Key updated.', 'success');
  }
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
  const { auto = false } = options;
  const sid = getStoredSid();
  const pubUrl = document.getElementById('pubUrl').value.trim();
  const btn = document.getElementById('connectBtn');
  const useServerSid = options.useServerSid || (!sid && window.backendConfig?.hasSubstackSid);

  if (!sid && !useServerSid) {
    if (!auto) showToast('Please enter your Substack session cookie', 'error');
    return;
  }

  if (!auto) {
    setButtonLoading(btn, true, 'Connecting…');
  }

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
    if (!auto) {
      showToast(`Connected as ${data.profile.name} (@${data.profile.slug})`, 'success');
    }
  } catch (err) {
    isConnected = false;
    updateConnectionBadge(null);
    document.getElementById('publishBtn').disabled = true;
    if (!auto) {
      showToast(err.message, 'error');
    } else {
      console.warn('Auto-reconnect failed:', err.message);
      showToast('Saved session could not be restored. Update connect.sid and click Connect.', 'warning');
    }
  } finally {
    if (!auto) {
      setButtonLoading(btn, false, 'Connect');
    }
  }
}

// ─── Generate Post with AI ───
async function handleGenerate() {
  const topic = document.getElementById('topic').value.trim();
  const provider = document.getElementById('provider').value;
  const model = document.getElementById('model').value;
  const apiKey = getStoredApiKey(provider);
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

    // Clear SID from settings inputs and local storage
    document.getElementById('sid').value = '';
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
    syncSchedApiKeyFromStorage();
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
  const apiKey = getStoredApiKey(provider);

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

function dedupeHistoryItems(items) {
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

function formatScheduleDueLabel(scheduledAt, status) {
  if (status === 'failed') {
    return `Last scheduled: ${new Date(scheduledAt).toLocaleString()}`;
  }

  const target = new Date(scheduledAt);
  const diffMs = target.getTime() - Date.now();
  const when = target.toLocaleString();

  if (diffMs <= 0) {
    return `Due now (${when})`;
  }

  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) {
    return `Due in ${diffMins} min (${when})`;
  }

  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) {
    return `Due in ${diffHours} hour${diffHours === 1 ? '' : 's'} (${when})`;
  }

  return `Next run: ${when}`;
}

function getScheduleIsoTime() {
  const built = dtBuildSelectedDate();
  if (built) return built.toISOString();
  const raw = document.getElementById('schedTime')?.value;
  if (!raw) return '';
  return new Date(raw).toISOString();
}

function confirmSendScheduleNow(btn) {
  if (!btn) return;

  const id = btn.dataset.scheduleId;
  const postType = btn.dataset.postType || 'newsletter';
  const isDraft = btn.dataset.isDraft === 'true';
  const scheduledAt = btn.dataset.scheduledAt;
  const label = btn.dataset.scheduleLabel || postType;

  const typeName = postType === 'note' ? 'note' : 'newsletter';
  const when = scheduledAt ? new Date(scheduledAt).toLocaleString() : 'the scheduled time';
  const publishAction = postType === 'note'
    ? 'publish this note to Substack'
    : (isDraft ? 'save this newsletter as a draft on Substack' : 'publish this newsletter live on Substack');

  const firstMessage =
    `Send "${label}" now?\n\n` +
    `This will skip the scheduled time (${when}) and ${publishAction} immediately.`;

  if (!confirm(firstMessage)) return;

  if (postType === 'newsletter' && !isDraft) {
    const liveMessage =
      'Final confirmation: this will publish live to your Substack audience.\n\n' +
      'Subscribers may be notified depending on your Substack settings.\n\n' +
      'Continue?';
    if (!confirm(liveMessage)) return;
  }

  sendScheduleNow(id, btn);
}

async function sendScheduleNow(id, btn) {
  appendSchedulerLog(`Send now requested for schedule ${id}…`, 'highlight');
  if (btn) setButtonLoading(btn, true, 'Sending…');

  try {
    const resolvedProvider = document.getElementById('schedProvider')?.value
      || document.getElementById('provider')?.value
      || 'groq';
    let apiKey = document.getElementById('schedApiKey')?.value.trim() || '';
    if (!apiKey) apiKey = getStoredApiKey(resolvedProvider);

    const res = await fetch(`/api/schedule/${id}/run-now`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKey || undefined,
        provider: resolvedProvider,
        model: document.getElementById('schedModel')?.value.trim()
          || document.getElementById('model')?.value.trim()
          || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send scheduled post');

    renderSchedulerApiLogs(data.logs);

    if (data.processed?.status === 'success') {
      showToast('Post sent successfully!', 'success');
      appendSchedulerLog(`Send now succeeded for schedule ${id}.`, 'success');
      if (document.getElementById('view-history')?.style.display !== 'none') {
        loadHistory();
      }
    } else if (data.processed?.status === 'failed') {
      showToast(`Send failed: ${data.processed.error || 'Unknown error'}`, 'error');
      appendSchedulerLog(`Send now failed: ${data.processed.error || 'Unknown error'}`, 'error');
    } else {
      showToast('Send completed — check logs for details', 'info');
    }

    await loadSchedules();
  } catch (err) {
    appendSchedulerLog(`Send now error: ${err.message}`, 'error');
    showToast(err.message, 'error');
  } finally {
    if (btn) setButtonLoading(btn, false, '<i data-lucide="send"></i> Send Now');
    if (window.lucide) lucide.createIcons();
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
      updateSchedulerStats([]);
      return;
    }

    updateSchedulerStats(schedules);
    container.innerHTML = schedules.map(item => {
      const dueLabel = formatScheduleDueLabel(item.scheduledAt, item.status);
      const lastRun = item.lastRunAt ? new Date(item.lastRunAt).toLocaleString() : 'Never';
      const statusClass = `badge-${item.status}`;
      const canSendNow = item.status === 'pending' || item.status === 'paused';
      const scheduleLabel = item.title || item.body.substring(0, 50) + '...';

      const isPaused = item.status === 'paused';
      const isFailed = item.status === 'failed';
      const retryCount = item.retryCount || 0;
      const canRetryNow = isFailed || (item.status === 'pending' && retryCount > 0 && item.errorMessage);
      const toggleText = isPaused ? 'Resume' : 'Pause';
      const toggleIcon = isPaused ? 'play' : 'pause';

      return `
        <div class="schedule-item${isFailed ? ' schedule-item-failed' : ''}">
          <div class="schedule-item-info">
            <div class="schedule-item-header">
              <span class="schedule-item-type">${escapeHtml(item.postType)}</span>
              <span class="schedule-item-title">${escapeHtml(item.title || item.body.substring(0, 50) + '...')}</span>
              <span class="badge ${statusClass}">${escapeHtml(item.status)}</span>
            </div>
            <div class="schedule-item-meta">
              <div class="schedule-item-meta-item" title="Scheduled execution time">
                <i data-lucide="clock"></i>
                <span>${isFailed ? 'Last scheduled' : 'Next Run'}: <strong>${escapeHtml(dueLabel)}</strong></span>
              </div>
              ${item.hasApiKey ? `
                <div class="schedule-item-meta-item" title="AI key stored securely on server">
                  <i data-lucide="key-round"></i>
                  <span>API key: <strong>Configured</strong></span>
                </div>
              ` : item.enableSearch ? `
                <div class="schedule-item-meta-item" style="color: var(--error);" title="Missing API key for research">
                  <i data-lucide="key-round"></i>
                  <span>API key: <strong>Missing</strong></span>
                </div>
              ` : ''}
              <div class="schedule-item-meta-item" title="Recurrence pattern">
                <i data-lucide="repeat"></i>
                <span>Recurrence: <strong>${escapeHtml(item.recurrence)}</strong></span>
              </div>
              <div class="schedule-item-meta-item" title="Last run time">
                <i data-lucide="check-square"></i>
                <span>Last Run: ${lastRun}</span>
              </div>
              ${retryCount > 0 ? `
                <div class="schedule-item-meta-item" title="Retry attempts">
                  <i data-lucide="refresh-cw"></i>
                  <span>Retries: <strong>${retryCount}/3</strong></span>
                </div>
              ` : ''}
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
              ${item.publishedUrl ? `
                <div class="schedule-item-meta-item" title="Published post link">
                  <i data-lucide="external-link"></i>
                  <span>Published: <a href="${escapeHtml(item.publishedUrl)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); font-weight: 600;">View post</a></span>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="schedule-item-actions">
            ${canSendNow ? `
              <button
                class="btn btn-primary btn-sm schedule-send-now-btn"
                type="button"
                data-schedule-id="${escapeHtml(item.id)}"
                data-post-type="${escapeHtml(item.postType)}"
                data-is-draft="${item.isDraft ? 'true' : 'false'}"
                data-scheduled-at="${escapeHtml(item.scheduledAt)}"
                data-schedule-label="${escapeHtml(scheduleLabel)}"
                onclick="confirmSendScheduleNow(this)"
                title="Send this post now, skipping the scheduled time"
                style="display: flex; align-items: center; gap: 4px;"
              >
                <i data-lucide="send" style="width: 14px; height: 14px;"></i> Send Now
              </button>
            ` : ''}
            ${canRetryNow ? `
              <button class="btn btn-primary btn-sm" onclick="retryScheduleItem('${item.id}', this)" title="Retry this post now" style="display: flex; align-items: center; gap: 4px;">
                <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i> Retry Now
              </button>
            ` : !isFailed ? `
              <button class="btn btn-secondary btn-sm" onclick="toggleScheduleState('${item.id}')" title="${toggleText} Schedule" style="display: flex; align-items: center; gap: 4px;">
                <i data-lucide="${toggleIcon}" style="width: 14px; height: 14px;"></i> ${toggleText}
              </button>
            ` : ''}
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
  const isDraft = document.getElementById('schedDraftToggle') ? document.getElementById('schedDraftToggle').checked : true;
  const recurrence = document.getElementById('schedRecurrence') ? document.getElementById('schedRecurrence').value : 'once';
  
  // New fields
  const enableSearch = document.getElementById('schedEnableSearch').checked;
  const schedProviderVal = document.getElementById('schedProvider').value;
  const mainProvider = document.getElementById('provider').value;
  const resolvedProvider = schedProviderVal || mainProvider;
  const resolvedModel = document.getElementById('schedModel').value.trim()
    || document.getElementById('model').value.trim();
  let apiKey = document.getElementById('schedApiKey').value.trim();
  if (!apiKey) {
    apiKey = getStoredApiKey(resolvedProvider);
  }
  const systemPrompt = document.getElementById('schedSystemPrompt').value.trim();

  const btn = document.getElementById('schedSubmitBtn');

  if (postType === 'note') {
    if (!body) {
      showToast('Research topic/keywords is required for notes', 'error');
      return;
    }
  } else {
    if (enableSearch) {
      if (!title) {
        showToast('Title/Topic is required — it is used as the web search topic for AI research', 'error');
        return;
      }
      if (!body) {
        showToast('Writing guidelines are required for AI research newsletters', 'error');
        return;
      }
    } else {
      if (!title) {
        showToast('Title/Topic is required for newsletters', 'error');
        return;
      }
      if (!body) {
        showToast('Body content is required for newsletters when search is disabled', 'error');
        return;
      }
    }
  }

  const scheduledAtRaw = getScheduleIsoTime();
  if (!scheduledAtRaw) {
    showToast('Please select a scheduled date and time', 'error');
    return;
  }

  if (enableSearch && !apiKey && !hasBackendApiKey(resolvedProvider)) {
    showToast(
      `Add your ${resolvedProvider.toUpperCase()} API key in Settings — scheduled research posts store the key with the job so cron can run offline.`,
      'error'
    );
    return;
  }

  const isoTime = scheduledAtRaw;

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
        provider: enableSearch ? (resolvedProvider || undefined) : (schedProviderVal || undefined),
        model: enableSearch ? (resolvedModel || undefined) : (document.getElementById('schedModel').value || undefined),
        apiKey: apiKey || undefined,
        systemPrompt: systemPrompt || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to schedule post');

    showToast(`Post scheduled successfully for ${new Date(isoTime).toLocaleString()}`, 'success');

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

async function retryScheduleItem(id, btnEl) {
  if (btnEl) setButtonLoading(btnEl, true, 'Retrying…');

  try {
    const schedProviderVal = document.getElementById('schedProvider')?.value || '';
    const mainProvider = document.getElementById('provider')?.value || 'groq';
    const resolvedProvider = schedProviderVal || mainProvider;
    const resolvedModel = document.getElementById('schedModel')?.value.trim()
      || document.getElementById('model')?.value.trim()
      || '';
    let apiKey = document.getElementById('schedApiKey')?.value.trim() || '';
    if (!apiKey) {
      apiKey = getStoredApiKey(resolvedProvider);
    }

    appendSchedulerLog(`Manual retry started for schedule ${id}…`, 'highlight');

    const res = await fetch(`/api/schedule/${id}/retry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apiKey || undefined,
        provider: resolvedProvider || undefined,
        model: resolvedModel || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to retry schedule');

    renderSchedulerApiLogs(data.logs);

    if (data.processed?.status === 'success') {
      showToast('Post processed successfully on retry!', 'success');
      appendSchedulerLog(`Retry succeeded for schedule ${id}.`, 'success');
      if (document.getElementById('view-history')?.style.display !== 'none') {
        loadHistory();
      }
    } else if (data.processed?.status === 'failed') {
      showToast(`Retry failed: ${data.processed.error}`, 'error');
      appendSchedulerLog(`Retry failed for schedule ${id}: ${data.processed.error}`, 'error');
    } else {
      showToast('Retry completed — check logs for details', 'info');
    }

    await loadSchedules();
  } catch (err) {
    appendSchedulerLog(`Retry error: ${err.message}`, 'error');
    showToast(err.message, 'error');
  } finally {
    if (btnEl) setButtonLoading(btnEl, false, '<i data-lucide="refresh-cw"></i> Retry Now');
  }
}

async function testSubstackSession() {
  const sid = getStoredSid();
  const pubUrl = document.getElementById('pubUrl')?.value.trim();
  const btn = document.getElementById('testSidBtn');

  if (!sid && !window.backendConfig?.hasSubstackSid) {
    showToast('Enter your connect.sid session cookie first', 'error');
    return;
  }

  setButtonLoading(btn, true, 'Testing…');

  try {
    const res = await fetch('/api/test/substack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sid: sid || undefined,
        publicationUrl: pubUrl || undefined,
      }),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Session test failed');
    }

    saveSettings();
    isConnected = true;
    updateConnectionBadge(data.profile);
    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) publishBtn.disabled = false;

    showToast(`Session OK — connected as ${data.profile.name} (@${data.profile.slug})`, 'success');
  } catch (err) {
    isConnected = false;
    updateConnectionBadge(null);
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="shield-check"></i> Test Session');
  }
}

async function testAiKey(options = {}) {
  const { providerOverride, modelOverride, keyOverride, buttonId = 'testAiKeyBtn' } = options;
  const provider = providerOverride || document.getElementById('provider')?.value;
  const model = modelOverride || document.getElementById('model')?.value;
  let apiKey = keyOverride || getStoredApiKey(provider);
  const btn = document.getElementById(buttonId);

  if (!apiKey && !hasBackendApiKey(provider)) {
    showToast(`Enter your ${provider.toUpperCase()} API key first`, 'error');
    return false;
  }

  if (btn) setButtonLoading(btn, true, 'Testing…');

  try {
    const res = await fetch('/api/test/ai-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model, apiKey: apiKey || undefined }),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'API key test failed');
    }

    if (!keyOverride) saveApiKey({ silent: true });
    showToast(`${data.provider.toUpperCase()} key works with ${data.model}`, 'success');
    return true;
  } catch (err) {
    showToast(err.message, 'error');
    return false;
  } finally {
    if (btn) {
      const label = buttonId === 'testSchedAiKeyBtn'
        ? '<i data-lucide="shield-check"></i> Test Key'
        : '<i data-lucide="shield-check"></i> Test API Key';
      setButtonLoading(btn, false, label);
    }
  }
}

async function testSchedAiKey() {
  const schedProviderVal = document.getElementById('schedProvider')?.value || '';
  const mainProvider = document.getElementById('provider')?.value || 'groq';
  const provider = schedProviderVal || mainProvider;
  const model = document.getElementById('schedModel')?.value.trim()
    || document.getElementById('model')?.value.trim()
    || '';
  let apiKey = document.getElementById('schedApiKey')?.value.trim() || '';
  if (!apiKey) apiKey = getStoredApiKey(provider);

  await testAiKey({
    providerOverride: provider,
    modelOverride: model,
    keyOverride: apiKey,
    buttonId: 'testSchedAiKeyBtn',
  });
}

async function runManualCron() {
  appendSchedulerLog('Manual queue check triggered…', 'highlight');
  try {
    const res = await fetch('/api/cron/process-schedules');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to trigger queue check');

    renderSchedulerApiLogs(data.logs);

    const count = data.processedCount || 0;
    const pendingCount = data.pendingCount || 0;
    const dueCount = data.dueCount || 0;

    if (count > 0) {
      showToast(`Queue check complete: processed ${count} post(s)!`, 'success');
      appendSchedulerLog(`Queue check finished — processed ${count} post(s).`, 'success');
    } else if (pendingCount > 0 && data.nextDueAt) {
      const nextDue = new Date(data.nextDueAt).toLocaleString();
      showToast(`No posts due yet. ${pendingCount} pending — next at ${nextDue}`, 'info');
      appendSchedulerLog(`Queue check finished — ${pendingCount} pending, 0 due. Next: ${nextDue}`, 'info');
    } else {
      showToast('Queue check complete: no due posts found.', 'info');
      appendSchedulerLog('Queue check finished — no due posts found.', 'info');
    }
    await loadSchedules();
    if (count > 0 && document.getElementById('view-history')?.style.display !== 'none') {
      loadHistory();
    }
  } catch (err) {
    appendSchedulerLog(`Queue check failed: ${err.message}`, 'error');
    showToast(err.message, 'error');
  }
}

function updateSchedulerStats(schedules) {
  const pendingEl = document.getElementById('schedStatPending');
  const pausedEl = document.getElementById('schedStatPaused');
  const failedEl = document.getElementById('schedStatFailed');
  const nextDueEl = document.getElementById('schedStatNextDue');
  if (!pendingEl || !pausedEl || !nextDueEl) return;

  const pending = schedules.filter(s => s.status === 'pending').length;
  const paused = schedules.filter(s => s.status === 'paused').length;
  const failed = schedules.filter(s => s.status === 'failed').length;
  pendingEl.textContent = String(pending);
  pausedEl.textContent = String(paused);
  if (failedEl) failedEl.textContent = String(failed);

  const now = Date.now();
  const upcoming = schedules
    .filter(s => s.status === 'pending')
    .map(s => new Date(s.scheduledAt))
    .filter(d => !isNaN(d.getTime()) && d.getTime() >= now)
    .sort((a, b) => a - b);

  nextDueEl.textContent = upcoming.length > 0
    ? upcoming[0].toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '—';
}

const SCHEDULER_LOG_PLACEHOLDER = 'Waiting for scheduler activity. Trigger a queue check or wait for automatic polling…';

function classifySchedulerLogType(message) {
  const msg = message.toLowerCase();
  if (msg.includes('error') || msg.includes('failed') || msg.includes('fatal')) return 'error';
  if (msg.includes('success') || msg.includes('finished processing') || msg.includes('processed')) return 'success';
  if (msg.includes('will retry') || msg.includes('skipping') || msg.includes('no due')) return 'warning';
  if (msg.includes('triggered') || msg.includes('running schedules')) return 'highlight';
  return 'info';
}

function appendSchedulerLog(message, type = 'info') {
  const logsEl = document.getElementById('schedulerLogs');
  const stateEl = document.getElementById('schedulerConsoleState');
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

  if (logsEl.textContent.trim() === SCHEDULER_LOG_PLACEHOLDER) {
    logsEl.innerHTML = '';
  }

  logsEl.innerHTML += formattedMsg + '\n';
  logsEl.scrollTop = logsEl.scrollHeight;

  if (stateEl) {
    stateEl.className = 'console-title-text';
    const dot = stateEl.querySelector('span');
    if (dot) {
      dot.style.background = type === 'error' ? 'var(--error)' : 'var(--success)';
      dot.style.boxShadow = type === 'error' ? '0 0 6px var(--error)' : '0 0 6px var(--success)';
    }
  }
}

function renderSchedulerApiLogs(logs) {
  if (!Array.isArray(logs) || logs.length === 0) return;
  logs.forEach(log => appendSchedulerLog(log, classifySchedulerLogType(log)));
}

function clearSchedulerLogs() {
  const logsEl = document.getElementById('schedulerLogs');
  const stateEl = document.getElementById('schedulerConsoleState');
  if (logsEl) logsEl.textContent = SCHEDULER_LOG_PLACEHOLDER;
  if (stateEl) {
    stateEl.className = 'console-title-text console-idle';
    const dot = stateEl.querySelector('span');
    if (dot) {
      dot.style.background = '';
      dot.style.boxShadow = '';
    }
  }
}

async function copySchedulerLogs() {
  const logsEl = document.getElementById('schedulerLogs');
  if (!logsEl) return;
  const text = logsEl.innerText.trim();
  if (!text || text === SCHEDULER_LOG_PLACEHOLDER) {
    showToast('No logs to copy yet', 'info');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast('Scheduler logs copied to clipboard', 'success');
  } catch {
    showToast('Could not copy logs', 'error');
  }
}

window.toggleSchedulerFields = toggleSchedulerFields;
window.loadSchedules = loadSchedules;
window.handleCreateSchedule = handleCreateSchedule;
window.toggleScheduleState = toggleScheduleState;
window.deleteScheduleItem = deleteScheduleItem;
window.retryScheduleItem = retryScheduleItem;
window.testSubstackSession = testSubstackSession;
window.testAiKey = testAiKey;
window.testSchedAiKey = testSchedAiKey;
window.confirmSendScheduleNow = confirmSendScheduleNow;
window.sendScheduleNow = sendScheduleNow;
window.runManualCron = runManualCron;
window.clearSchedulerLogs = clearSchedulerLogs;
window.copySchedulerLogs = copySchedulerLogs;

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
      renderSchedulerApiLogs(data.logs);
      appendSchedulerLog(`Auto-poll processed ${data.processedCount} due post(s).`, 'success');
      showToast(`Automatically processed ${data.processedCount} due scheduled post(s)!`, 'success');
      await loadSchedules();
      if (document.getElementById('view-history')?.style.display !== 'none') {
        loadHistory();
      }
    } else if (res.ok) {
      await loadSchedules();
    } else {
      appendSchedulerLog(`Auto-poll failed: ${data.error || res.statusText}`, 'error');
    }
  } catch (err) {
    console.error('Silent queue check failed:', err);
    appendSchedulerLog(`Auto-poll error: ${err.message}`, 'error');
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
  
  const endpointEl = document.getElementById('cronEndpointSnippet');
  if (endpointEl) {
    endpointEl.textContent = `${window.location.origin}/api/cron/process-schedules`;
  }

  appendSchedulerLog('Scheduler polling started (every 60s).', 'info');
  
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
      bodyTextarea.placeholder = 'e.g. Latest AI agent news — share a short take on what you understood and why it matters to builders…';
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

function syncSchedApiKeyFromStorage() {
  const schedApiKey = document.getElementById('schedApiKey');
  if (!schedApiKey || schedApiKey.dataset.userEdited === 'true') return;

  const schedProvider = document.getElementById('schedProvider')?.value || '';
  const mainProvider = document.getElementById('provider')?.value || 'groq';
  const provider = schedProvider || mainProvider;
  const storedKey = getStoredApiKey(provider);
  if (storedKey) {
    schedApiKey.value = storedKey;
    schedApiKey.placeholder = 'Using key from Settings (saved with schedule on submit)';
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
  
  if (!provider) {
    syncSchedApiKeyFromStorage();
    return;
  }
  
  const models = MODELS[provider] || [];
  models.forEach((m) => {
    const opt = document.createElement('option');
    opt.value = m.value;
    opt.textContent = m.label;
    modelSelect.appendChild(opt);
  });

  syncSchedApiKeyFromStorage();
}

window.togglePasswordVisibility = togglePasswordVisibility;
window.startSchedulerPolling = startSchedulerPolling;
window.stopSchedulerPolling = stopSchedulerPolling;
window.toggleSchedSearchFields = toggleSchedSearchFields;
window.updateSchedModelOptions = updateSchedModelOptions;

// ─── Scheduled Date & Time (simple inputs) ───

function dtPad(n) {
  return String(n).padStart(2, '0');
}

function dtFormatDateInput(date) {
  return `${date.getFullYear()}-${dtPad(date.getMonth() + 1)}-${dtPad(date.getDate())}`;
}

function dtFormatTimeInput(date) {
  return `${dtPad(date.getHours())}:${dtPad(date.getMinutes())}`;
}

function dtSyncHiddenInput() {
  const date = document.getElementById('schedDate')?.value;
  const time = document.getElementById('schedTimeInput')?.value;
  const hidden = document.getElementById('schedTime');
  if (!date || !time || !hidden) return;
  hidden.value = `${date}T${time}`;
}

function dtBuildSelectedDate() {
  dtSyncHiddenInput();
  const raw = document.getElementById('schedTime')?.value;
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function dtGetRelativeLabel(targetDate) {
  if (!targetDate) return '';
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);

  if (diffMins < 0) return 'This time is in the past';
  if (diffMins < 1) return 'Publishing in less than a minute';
  if (diffMins < 60) return `Publishing in ${diffMins} minute${diffMins === 1 ? '' : 's'}`;

  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `Publishing in ${diffHours} hour${diffHours === 1 ? '' : 's'}`;

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const dayDiff = Math.round((startOfTarget - startOfToday) / 86400000);

  if (dayDiff === 0) return 'Publishing today';
  if (dayDiff === 1) return 'Publishing tomorrow';
  if (dayDiff < 7) return `Publishing in ${dayDiff} days`;

  const diffWeeks = Math.round(dayDiff / 7);
  return `Publishing in ${diffWeeks} week${diffWeeks === 1 ? '' : 's'}`;
}

function dtUpdateHint() {
  const target = dtBuildSelectedDate();
  const relativeEl = document.getElementById('dtRelative');
  if (relativeEl) {
    relativeEl.textContent = target ? dtGetRelativeLabel(target) : '';
  }
}

function dtApplyDateTime(date) {
  const dateEl = document.getElementById('schedDate');
  const timeEl = document.getElementById('schedTimeInput');
  if (dateEl) dateEl.value = dtFormatDateInput(date);
  if (timeEl) timeEl.value = dtFormatTimeInput(date);
  dtSyncHiddenInput();
  dtUpdateHint();
}

function dtInitWidget() {
  const defaultDate = new Date();
  defaultDate.setHours(defaultDate.getHours() + 1, 0, 0, 0);

  const tzEl = document.getElementById('dtTzBadge');
  if (tzEl) {
    tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  dtApplyDateTime(defaultDate);

  const dateEl = document.getElementById('schedDate');
  const timeEl = document.getElementById('schedTimeInput');
  const onChange = () => {
    dtSyncHiddenInput();
    dtUpdateHint();
  };
  dateEl?.addEventListener('change', onChange);
  timeEl?.addEventListener('change', onChange);
  timeEl?.addEventListener('input', onChange);
}

function dtQuickSchedule(minutesFromNow) {
  dtApplyDateTime(new Date(Date.now() + minutesFromNow * 60000));
}

function dtQuickScheduleTomorrow(hour, minute) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(hour, minute, 0, 0);
  dtApplyDateTime(date);
}

function dtSelectPromptPreset(type) {
  const schedBody = document.getElementById('schedBody');
  if (!schedBody) return;

  const presets = {
    brief: 'Share a short personal take on the topic. Explain what you understood in plain language. Keep it under 150 words. No jargon, no hype, no long intro.',
    builder: 'Focus on what matters for builders and engineers. One practical insight from the news and why it might matter in production. Keep it brief and conversational.',
    reaction: 'Write like you just read the news and are posting your honest reaction. Simple, direct, human. One key point plus a short personal opinion.',
  };

  schedBody.value = presets[type] || '';
}

window.dtQuickSchedule = dtQuickSchedule;
window.dtQuickScheduleTomorrow = dtQuickScheduleTomorrow;
window.dtSelectPromptPreset = dtSelectPromptPreset;



