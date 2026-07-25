import PG from './pg.js';
import './state.js';
import './models.js';
import './ui.js';
import './storage.js';
import './settings.js';
import './publish.js';
import './tabs.js';
import './comments.js';
import './history.js';
import './notes.js';
import './scheduler-core.js';
import './datetime.js';
import './scheduler-polling.js';

const WINDOW_EXPORTS = [
  'initMacConsoleHighlight', 'toggleSidebar', 'handleDisconnect',
  'handleConnect', 'togglePasswordVisibility', 'testSubstackSession', 'testAiKey',
  'saveApiKey', 'resetSystemPrompt', 'handleGenerate', 'handlePublish',
  'runCommentAutomation', 'stopCommentAutomation', 'handleGenerateNote',
  'handlePublishNote', 'loadNotes', 'switchTab', 'loadHistory',
  'toggleSchedulerFields', 'toggleRecurrenceFields', 'loadSchedules',
  'handleCreateSchedule', 'toggleScheduleState', 'deleteScheduleItem',
  'retryScheduleItem', 'testSchedAiKey', 'confirmSendScheduleNow',
  'sendScheduleNow', 'runManualCron', 'clearSchedulerLogs', 'copySchedulerLogs',
  'startSchedulerPolling', 'stopSchedulerPolling', 'toggleSchedSearchFields',
  'updateSchedModelOptions', 'dtNavigateMonth', 'dtSelectDay', 'dtSelectTime',
  'dtConfirm', 'dtCancel', 'dtQuickSchedule', 'dtQuickScheduleTomorrow',
  'dtSelectPromptPreset', 'copyHistoryLink', 'toggleBodyText', 'reuseHistoryItem',
  'loadNotes', 'openSidebarAndFocusSid', 'openPreviewFullscreen', 'closePreviewFullscreen',
];

for (const name of WINDOW_EXPORTS) {
  if (PG[name] != null) {
    window[name] = PG[name];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  PG.initMacConsoleHighlight();
  PG.initPreviewFullscreen();
  PG.loadSavedSettings();
  document.body.classList.remove('light-theme');

  await PG.loadConfigFromBackend();
  PG.loadPublishHistory();
  PG.initOnboardingChecklist();
  PG.initSecurityCallout();

  if (!PG.getStoredSid() && !window.backendConfig?.hasSubstackSid) {
    const grid = document.querySelector('.main-grid');
    if (grid) grid.classList.remove('sidebar-collapsed');
  }

  const sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  const grid = document.querySelector('.main-grid');
  if (sidebarCollapsed && grid) {
    grid.classList.add('sidebar-collapsed');
  }
  if (typeof PG.syncSidebarToggleUi === 'function') {
    PG.syncSidebarToggleUi(Boolean(grid?.classList.contains('sidebar-collapsed')));
  }

  const connectionBadge = document.getElementById('connectionBadge');
  if (connectionBadge) {
    const openReconnect = (e) => {
      if (!connectionBadge.classList.contains('is-actionable')) return;
      if (e.target.closest('a, button')) return;
      e.preventDefault();
      PG.openSidebarAndFocusSid();
    };
    connectionBadge.addEventListener('click', openReconnect);
    connectionBadge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openReconnect(e);
    });
  }

  if (window.lucide) {
    lucide.createIcons();
  }

  document.getElementById('systemPrompt').addEventListener('input', PG.saveSystemPrompt);
  document.getElementById('pubUrl').addEventListener('input', PG.saveSettings);
  document.getElementById('sid').addEventListener('input', PG.saveSettings);

  const aiKeyInput = document.getElementById('aiKey');
  if (aiKeyInput) {
    aiKeyInput.addEventListener('input', PG.scheduleApiKeySave);
    aiKeyInput.addEventListener('blur', () => {
      const keyVal = aiKeyInput.value.trim();
      if (keyVal) PG.saveApiKey({ silent: true });
    });
  }

  const postTitle = document.getElementById('postTitle');
  const postSubtitle = document.getElementById('postSubtitle');
  if (postTitle) postTitle.addEventListener('input', PG.updatePreviewMetadata);
  if (postSubtitle) postSubtitle.addEventListener('input', PG.updatePreviewMetadata);

  const noteLink = document.getElementById('noteLink');
  if (noteLink) noteLink.addEventListener('input', PG.updateNotePreview);

  PG.loadAllInputHistories();

  const draftToggle = document.getElementById('draftToggle');
  if (draftToggle) {
    draftToggle.addEventListener('change', PG.updatePublishButtonLabel);
  }
  PG.updatePublishButtonLabel();

  PG.dtInitWidget();
  PG.toggleSchedulerFields();
  PG.toggleRecurrenceFields();
  PG.toggleSchedSearchFields();

  const activeTab = PG.getTabFromPath(window.location.pathname);
  PG.switchTab(activeTab, true);

  window.addEventListener('popstate', () => {
    const tab = PG.getTabFromPath(window.location.pathname);
    PG.switchTab(tab, true);
  });
});

export {};
