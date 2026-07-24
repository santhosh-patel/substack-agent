import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const appendSchedulerLog = (...args) => PG.appendSchedulerLog(...args);
const renderSchedulerApiLogs = (...args) => PG.renderSchedulerApiLogs(...args);
const loadSchedules = (...args) => PG.loadSchedules(...args);
const loadHistory = (...args) => PG.loadHistory(...args);
const classifySchedulerLogType = (...args) => PG.classifySchedulerLogType(...args);

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
window.toggleRecurrenceFields = toggleRecurrenceFields;
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

let PG.schedulerPollingInterval = null;

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
  if (PG.schedulerPollingInterval) return;
  
  const endpointEl = document.getElementById('cronEndpointSnippet');
  if (endpointEl) {
    endpointEl.textContent = `${window.location.origin}/api/cron/process-schedules`;
  }

  appendSchedulerLog('Scheduler polling started (every 60s).', 'info');
  
  // Initial run
  runSilentQueueCheck();
  
  PG.schedulerPollingInterval = setInterval(runSilentQueueCheck, 60 * 1000);
  
  const statusEl = document.getElementById('pollingStatus');
  if (statusEl) {
    statusEl.style.display = 'flex';
  }
}

function stopSchedulerPolling() {
  if (PG.schedulerPollingInterval) {
    clearInterval(PG.schedulerPollingInterval);
    PG.schedulerPollingInterval = null;
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
  const titleGroup = document.getElementById('schedTitleGroup');
  const subtitleGroup = document.getElementById('schedSubtitleGroup');
  const searchHelp = document.getElementById('schedSearchHelpText');

  if (enableSearch) {
    if (postType === 'newsletter') {
      bodyLabel.textContent = 'Research Topic & Writing Guidelines';
      bodyTextarea.placeholder = 'e.g. Latest AI agent news — write an engaging post with a hook, specific details, and a strong builder takeaway…';
      if (titleGroup) titleGroup.style.display = 'none';
      if (subtitleGroup) subtitleGroup.style.display = 'none';
      if (searchHelp) {
        searchHelp.textContent = 'AI searches the web at run time, then writes the title, subtitle, and post from your guidelines.';
      }
    } else {
      bodyLabel.textContent = 'Research Topic / Keywords';
      bodyTextarea.placeholder = 'e.g. SpaceX Mars Launch updates';
      if (titleGroup) titleGroup.style.display = 'none';
      if (subtitleGroup) subtitleGroup.style.display = 'none';
    }
  } else {
    if (titleGroup) titleGroup.style.display = '';
    if (subtitleGroup) subtitleGroup.style.display = '';
    if (searchHelp) {
      searchHelp.textContent = 'Turn on to let AI search the web and generate content at schedule time.';
    }
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

PG.renderSchedulerApiLogs = renderSchedulerApiLogs;
PG.clearSchedulerLogs = clearSchedulerLogs;
PG.copySchedulerLogs = copySchedulerLogs;
PG.togglePasswordVisibility = togglePasswordVisibility;
PG.runSilentQueueCheck = runSilentQueueCheck;
PG.startSchedulerPolling = startSchedulerPolling;
PG.stopSchedulerPolling = stopSchedulerPolling;
PG.toggleSchedSearchFields = toggleSchedSearchFields;
PG.syncSchedApiKeyFromStorage = syncSchedApiKeyFromStorage;
PG.updateSchedModelOptions = updateSchedModelOptions;
export {};
