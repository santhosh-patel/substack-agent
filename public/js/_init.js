// ─── Initialization ───
document.addEventListener('DOMContentLoaded', async () => {
  initMacConsoleHighlight();
  loadSavedSettings();

  // Initialize App Theme
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    setTimeout(() => updateThemeToggleIcon(true), 50);
  }

  await loadConfigFromBackend();
  loadPublishHistory();
  initOnboardingChecklist();

  // Auto-open settings on first visit if no SID
  if (!getStoredSid() && !window.backendConfig?.hasSubstackSid) {
    const grid = document.querySelector('.main-grid');
    if (grid) grid.classList.remove('sidebar-collapsed');
  }

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
  toggleSchedulerFields();
  toggleRecurrenceFields();
  toggleSchedSearchFields();

  // Restore Active Tab on reload from URL path
  const activeTab = getTabFromPath(window.location.pathname);
  switchTab(activeTab, true);

  // Listen for browser back/forward navigation
  window.addEventListener('popstate', () => {
    const tab = getTabFromPath(window.location.pathname);
    switchTab(tab, true);
  });
});
