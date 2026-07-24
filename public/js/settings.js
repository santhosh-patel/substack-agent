import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const escapeHtml = (...args) => PG.escapeHtml(...args);
const getStoredSid = (...args) => PG.getStoredSid(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);
const getStoredSettings = (...args) => PG.getStoredSettings(...args);
const MODELS = PG.MODELS;

import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const escapeHtml = (...args) => PG.escapeHtml(...args);
const getStoredSid = (...args) => PG.getStoredSid(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);
const getStoredSettings = (...args) => PG.getStoredSettings(...args);
const MODELS = PG.MODELS;

async function loadConfigFromBackend() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return;
    const config = await res.json();
    window.backendConfig = config;

    applyDeploymentMode(config);

    const pubUrlInput = document.getElementById('pubUrl');
    if (config.publicationUrl && pubUrlInput && !pubUrlInput.value.trim()) {
      pubUrlInput.value = config.publicationUrl;
      saveSettings();
    }

    loadSystemPromptForTab('newsletters');
    await restorePersistedSession();
    updateOnboardingChecklist();
  } catch (err) {
    console.error('Failed to load backend config:', err);
  }
}

function applyDeploymentMode(config) {
  const isVercel = config.deploymentMode === 'vercel';
  const isProduction = config.deploymentMode === 'production' || isVercel;
  const toolsApiUrl = config.toolsApiBaseUrl || null;

  const deployBanner = document.getElementById('deploymentBanner');
  if (deployBanner) {
    if (isVercel) {
      deployBanner.hidden = false;
      deployBanner.innerHTML =
        '<strong>Local dashboard vs deployed Tools API:</strong> This playground uses unauthenticated <code>/api/*</code> routes. ' +
        'For GPTs, n8n, or remote agents, use the Bearer-protected Tools API at your domain. ' +
        'Scheduler queue data is ephemeral on Vercel — run <code>npm run dev</code> locally for full scheduling. ' +
        '<a href="/docs/deployment/scheduler-cron" target="_blank" rel="noopener">Scheduler docs</a>';
    } else if (isProduction && toolsApiUrl) {
      deployBanner.hidden = false;
      deployBanner.innerHTML =
        '<strong>Deployed instance:</strong> Playground <code>/api/*</code> routes are for local dashboard use. ' +
        `External integrations should call the Tools API at <code>${escapeHtml(toolsApiUrl)}</code> with Bearer auth.`;
    } else {
      deployBanner.hidden = true;
    }
  }

  const serverSidBanner = document.getElementById('serverSidBanner');
  if (serverSidBanner) {
    serverSidBanner.hidden = !(config.hasSubstackSid && isProduction);
  }

  const schedBanner = document.getElementById('schedulerDeployBanner');
  if (schedBanner) {
    if (isVercel) {
      schedBanner.hidden = false;
      schedBanner.innerHTML =
        '<strong>Vercel scheduler limits:</strong> Queue data may be lost on cold starts. ' +
        'Use local <code>npm run dev</code>, or set up external cron with durable storage. ' +
        '<a href="/docs/deployment/scheduler-cron" target="_blank" rel="noopener">Read scheduler setup</a>';
    } else {
      schedBanner.hidden = true;
    }
  }

  if (isVercel) {
    document.querySelectorAll('.scheduler-create-action').forEach((el) => {
      el.disabled = true;
      el.title = 'Scheduling requires local npm run dev or durable storage + external cron on Vercel';
    });
  } else {
    document.querySelectorAll('.scheduler-create-action').forEach((el) => {
      el.disabled = false;
      el.title = '';
    });
  }
}

const ONBOARDING_KEY = 'onboarding_checklist_v1';

function initOnboardingChecklist() {
  const panel = document.getElementById('onboardingChecklist');
  if (!panel) return;

  if (localStorage.getItem(ONBOARDING_KEY) === 'done') {
    panel.hidden = true;
    return;
  }

  panel.hidden = false;
  updateOnboardingChecklist();

  document.getElementById('onboardingDismiss')?.addEventListener('click', () => {
    localStorage.setItem(ONBOARDING_KEY, 'done');
    panel.hidden = true;
  });
}

function updateOnboardingChecklist() {
  const step1 = document.getElementById('onboardStep1');
  const step2 = document.getElementById('onboardStep2');
  const step3 = document.getElementById('onboardStep3');
  if (!step1) return;

  const hasSid = Boolean(getStoredSid()) || Boolean(window.backendConfig?.hasSubstackSid);
  const hasAiKey = ['groq', 'gemini', 'openai', 'openrouter'].some((p) =>
    Boolean(getStoredApiKey(p)) || hasBackendApiKey(p)
  );
  const hasPublished = (JSON.parse(localStorage.getItem('substack_publish_history') || '[]')).length > 0;

  step1?.classList.toggle('is-done', PG.PG.isConnected || hasSid);
  step2?.classList.toggle('is-done', hasAiKey);
  step3?.classList.toggle('is-done', hasPublished);

  if (PG.PG.isConnected && hasAiKey && hasPublished) {
    localStorage.setItem(ONBOARDING_KEY, 'done');
    const panel = document.getElementById('onboardingChecklist');
    if (panel) panel.hidden = true;
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


function scheduleApiKeySave() {
  clearTimeout(PG.PG.apiKeySaveTimer);
  PG.PG.apiKeySaveTimer = setTimeout(() => {
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

    PG.PG.isConnected = true;
    updateConnectionBadge(data.profile);
    document.getElementById('publishBtn').disabled = false;
    saveSettings();
    if (!auto) {
      showToast(`Connected as ${data.profile.name} (@${data.profile.slug})`, 'success');
    }
    updateOnboardingChecklist();
  } catch (err) {
    PG.PG.isConnected = false;
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
function updateConnectionBadge(profile) {
  const badge = document.getElementById('connectionBadge');
  const text = document.getElementById('connectionText');
  const avatar = document.getElementById('profileAvatar');
  const subLink = document.getElementById('profileSubLink');
  const discBtn = document.getElementById('disconnectBtn');

  PG.PG.currentProfile = profile;

  if (profile) {
    badge.className = 'profile-card connected';
    text.textContent = profile.name || 'Connected';

    const initials = (profile.name || '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2) || 'U';
    avatar.textContent = initials;
    avatar.style.background = 'var(--accent)';
    avatar.style.color = 'var(--bg-primary)';

    const tooltipParts = [profile.name || 'Connected'];
    if (profile.slug) tooltipParts.push(`${profile.slug}.substack.com`);
    badge.title = tooltipParts.join(' · ');
    avatar.title = badge.title;

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
    badge.title = 'Not connected';
    avatar.title = 'Not connected';
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

    PG.PG.isConnected = false;
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
  updateOnboardingChecklist();
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
    PG.PG.isConnected = true;
    updateConnectionBadge(data.profile);
    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) publishBtn.disabled = false;

    showToast(`Session OK — connected as ${data.profile.name} (@${data.profile.slug})`, 'success');
  } catch (err) {
    PG.PG.isConnected = false;
    updateConnectionBadge(null);
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, 'Test');
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

PG.loadConfigFromBackend = loadConfigFromBackend;
PG.applyDeploymentMode = applyDeploymentMode;
PG.initOnboardingChecklist = initOnboardingChecklist;
PG.updateOnboardingChecklist = updateOnboardingChecklist;
PG.restorePersistedSession = restorePersistedSession;
PG.loadSavedSettings = loadSavedSettings;
PG.saveSettings = saveSettings;
PG.scheduleApiKeySave = scheduleApiKeySave;
PG.loadApiKeyForProvider = loadApiKeyForProvider;
PG.saveApiKey = saveApiKey;
PG.updateModelOptions = updateModelOptions;
PG.handleConnect = handleConnect;
PG.updateConnectionBadge = updateConnectionBadge;
PG.updateSimulatedPreviewHeader = updateSimulatedPreviewHeader;
PG.handleDisconnect = handleDisconnect;
PG.loadSystemPromptForTab = loadSystemPromptForTab;
PG.saveSystemPrompt = saveSystemPrompt;
PG.resetSystemPrompt = resetSystemPrompt;
PG.toggleSidebar = toggleSidebar;
PG.openSidebarAndFocusSid = openSidebarAndFocusSid;
PG.toggleTheme = toggleTheme;
PG.updateThemeToggleIcon = updateThemeToggleIcon;
PG.loadPublishHistory = loadPublishHistory;
PG.addPostToHistory = addPostToHistory;
PG.updatePublishButtonLabel = updatePublishButtonLabel;
PG.testSubstackSession = testSubstackSession;
PG.testAiKey = testAiKey;
PG.testSchedAiKey = testSchedAiKey;
PG.ONBOARDING_KEY = ONBOARDING_KEY;
{};

PG.loadConfigFromBackend = loadConfigFromBackend;
PG.applyDeploymentMode = applyDeploymentMode;
PG.initOnboardingChecklist = initOnboardingChecklist;
PG.updateOnboardingChecklist = updateOnboardingChecklist;
PG.restorePersistedSession = restorePersistedSession;
PG.loadSavedSettings = loadSavedSettings;
PG.saveSettings = saveSettings;
PG.scheduleApiKeySave = scheduleApiKeySave;
PG.loadApiKeyForProvider = loadApiKeyForProvider;
PG.saveApiKey = saveApiKey;
PG.updateModelOptions = updateModelOptions;
PG.handleConnect = handleConnect;
PG.updateConnectionBadge = updateConnectionBadge;
PG.updateSimulatedPreviewHeader = updateSimulatedPreviewHeader;
PG.handleDisconnect = handleDisconnect;
PG.loadSystemPromptForTab = loadSystemPromptForTab;
PG.saveSystemPrompt = saveSystemPrompt;
PG.resetSystemPrompt = resetSystemPrompt;
PG.toggleSidebar = toggleSidebar;
PG.openSidebarAndFocusSid = openSidebarAndFocusSid;
PG.toggleTheme = toggleTheme;
PG.updateThemeToggleIcon = updateThemeToggleIcon;
PG.loadPublishHistory = loadPublishHistory;
PG.addPostToHistory = addPostToHistory;
PG.updatePublishButtonLabel = updatePublishButtonLabel;
PG.testSubstackSession = testSubstackSession;
PG.testAiKey = testAiKey;
PG.testSchedAiKey = testSchedAiKey;
PG.MODELS = MODELS;
PG.ONBOARDING_KEY = ONBOARDING_KEY;
export {};
