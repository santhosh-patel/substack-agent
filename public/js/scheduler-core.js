import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const escapeHtml = (...args) => PG.escapeHtml(...args);
const showAppConfirm = (...args) => PG.showAppConfirm(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const getStoredSid = (...args) => PG.getStoredSid(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);
const getSelectLabel = (...args) => PG.getSelectLabel(...args);
const testAiKey = (...args) => PG.testAiKey(...args);
const isTwiceDailyRecurrence = (...args) => PG.isTwiceDailyRecurrence(...args);
const getTwiceDailyTimes = (...args) => PG.getTwiceDailyTimes(...args);
const computeTwiceDailyInitialIso = (...args) => PG.computeTwiceDailyInitialIso(...args);
const formatMinutesLabel = (...args) => PG.formatMinutesLabel(...args);
const formatRecurrenceTimesLabel = (...args) => PG.formatRecurrenceTimesLabel(...args);
const formatScheduleDueLabel = (...args) => PG.formatScheduleDueLabel(...args);
const dtBuildSelectedDate = (...args) => PG.dtBuildSelectedDate(...args);
const MODELS = PG.MODELS;

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

  toggleSchedSearchFields();
}

function parseTimeInputToMinutes(value) {
  if (!value || typeof value !== 'string') return null;
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function formatMinutesLabel(minutes) {
  if (!Number.isFinite(minutes)) return '';
  const date = new Date();
  date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function isTwiceDailyRecurrence() {
  return document.getElementById('schedRecurrence')?.value === 'twice_daily';
}

function getTwiceDailyTimes() {
  const firstMinutes = dtState.selectedMinutes;
  const secondMinutes = parseTimeInputToMinutes(document.getElementById('schedSecondTime')?.value);
  return { firstMinutes, secondMinutes };
}

function computeTwiceDailyInitialIso() {
  const { firstMinutes, secondMinutes } = getTwiceDailyTimes();
  if (!Number.isFinite(firstMinutes) || !Number.isFinite(secondMinutes)) return null;
  if (firstMinutes === secondMinutes) return null;

  const now = new Date();
  const dayBase = dtDateFromState();
  dayBase.setHours(0, 0, 0, 0);

  const slots = [firstMinutes, secondMinutes]
    .sort((a, b) => a - b)
    .map((minutes) => {
      const slot = new Date(dayBase);
      slot.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
      return slot;
    });

  for (const slot of slots) {
    if (slot > now) return slot.toISOString();
  }

  const tomorrow = new Date(dayBase);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(Math.floor(firstMinutes / 60), firstMinutes % 60, 0, 0);
  return tomorrow.toISOString();
}

function toggleRecurrenceFields() {
  const twiceDaily = isTwiceDailyRecurrence();
  const secondGroup = document.getElementById('schedSecondTimeGroup');
  const dateLabel = document.getElementById('schedDateTimeLabel');

  if (secondGroup) {
    secondGroup.hidden = !twiceDaily;
  }
  if (dateLabel) {
    dateLabel.textContent = twiceDaily ? 'Scheduled Date & First Time' : 'Scheduled Date & Time';
  }
  dtUpdateSummary();
}

function formatRecurrenceTimesLabel(times) {
  if (!Array.isArray(times) || times.length !== 2) return '';
  return `${formatMinutesLabel(times[0])} and ${formatMinutesLabel(times[1])}`;
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
  if (isTwiceDailyRecurrence()) {
    return computeTwiceDailyInitialIso();
  }
  const built = dtBuildSelectedDate();
  if (built) return built.toISOString();
  const raw = document.getElementById('schedTime')?.value;
  if (!raw) return '';
  return new Date(raw).toISOString();
}

async function confirmSendScheduleNow(btn) {
  if (!btn) return;

  const id = btn.dataset.scheduleId;
  const postType = btn.dataset.postType || 'newsletter';
  const isDraft = btn.dataset.isDraft === 'true';
  const scheduledAt = btn.dataset.scheduledAt;
  const label = btn.dataset.scheduleLabel || postType;

  const when = scheduledAt ? new Date(scheduledAt).toLocaleString() : 'the scheduled time';
  const publishAction = postType === 'note'
    ? 'publish this note to Substack'
    : (isDraft ? 'save this newsletter as a draft on Substack' : 'publish this newsletter live on Substack');

  const confirmed = await showAppConfirm({
    title: 'Send now?',
    message:
      `Send "${label}" immediately?\n\n` +
      `This skips the scheduled time (${when}) and will ${publishAction}.`,
    confirmLabel: 'Send Now',
    cancelLabel: 'Cancel',
    icon: 'send',
  });
  if (!confirmed) return;

  if (postType === 'newsletter' && !isDraft) {
    const liveConfirmed = await showAppConfirm({
      title: 'Publish live?',
      message:
        'This will publish live to your Substack audience.\n\n' +
        'Subscribers may be notified depending on your Substack settings.',
      confirmLabel: 'Publish Live',
      cancelLabel: 'Go Back',
      variant: 'danger',
      icon: 'alert-triangle',
    });
    if (!liveConfirmed) return;
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
                <span>Recurrence: <strong>${escapeHtml(item.recurrence)}</strong>${item.recurrence === 'twice_daily' && Array.isArray(item.recurrenceTimes) ? ` · ${escapeHtml(formatRecurrenceTimesLabel(item.recurrenceTimes))}` : ''}</span>
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
              <button class="btn btn-primary btn-sm" onclick="retryScheduleItem('${item.id}', this)" title="Retry publishing this failed schedule now" style="display: flex; align-items: center; gap: 4px;">
                <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i> Retry Now
              </button>
            ` : !isFailed ? `
              <button class="btn btn-secondary btn-sm" onclick="toggleScheduleState('${item.id}')" title="${isPaused ? 'Resume this schedule so it can run again' : 'Pause this schedule without deleting it'}" style="display: flex; align-items: center; gap: 4px;">
                <i data-lucide="${toggleIcon}" style="width: 14px; height: 14px;"></i> ${toggleText}
              </button>
            ` : ''}
            <button class="btn btn-secondary btn-sm" style="color: var(--error); border-color: rgba(239, 68, 68, 0.2); display: flex; align-items: center; gap: 4px;" onclick="deleteScheduleItem('${item.id}')" title="Remove this item from the schedule queue">
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

function getSelectLabel(selectId, value) {
  const select = document.getElementById(selectId);
  if (!select) return value;
  const option = Array.from(select.options).find((opt) => opt.value === value);
  return option ? option.textContent.trim() : value;
}

function truncateScheduleText(text, max = 160) {
  if (!text) return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max).trim()}…`;
}

function buildScheduleConfirmHtml(details) {
  const rows = [];

  const addRow = (label, value) => {
    if (value == null || value === '') return;
    rows.push(
      `<div class="schedule-confirm-row">` +
        `<span class="schedule-confirm-label">${escapeHtml(label)}</span>` +
        `<span class="schedule-confirm-value">${escapeHtml(value)}</span>` +
      `</div>`
    );
  };

  addRow('Post type', details.postTypeLabel);
  addRow('Date & time', details.scheduledAtLabel);
  addRow('Recurrence', details.recurrenceLabel);
  if (details.recurrenceTimesLabel) {
    addRow('Daily times', details.recurrenceTimesLabel);
  }
  addRow('Publish as', details.publishMode);

  if (details.postType === 'newsletter') {
    addRow('Title', details.title || (details.enableSearch ? 'AI generated at run time' : ''));
    addRow('Subtitle', details.subtitle);
  }

  if (details.postType === 'note') {
    addRow('Link', details.noteLink);
  }

  addRow('Topic / guidelines', truncateScheduleText(details.body));
  addRow('Web search', details.searchLabel);

  if (details.enableSearch) {
    addRow('AI provider', details.providerLabel);
    addRow('Model', details.modelLabel);
  }

  if (details.presetMode === 'default') {
    addRow('Illustration', 'Editorial sketch (generated and attached)');
  }

  return `<div class="schedule-confirm-details">${rows.join('')}</div>`;
}

async function confirmSchedulePost(details) {
  return showAppConfirm({
    title: 'Confirm scheduled post',
    messageHtml: buildScheduleConfirmHtml(details),
    confirmLabel: 'Confirm Schedule',
    cancelLabel: 'Go Back',
    icon: 'calendar',
  });
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
  const presetMode = document.getElementById('schedPresetMode')?.value.trim() || '';

  const btn = document.getElementById('schedSubmitBtn');

  if (postType === 'note') {
    if (!body) {
      showToast('Research topic/keywords is required for notes', 'error');
      return;
    }
  } else {
    if (enableSearch) {
      if (!title && !body) {
        showToast('Add research topic or writing guidelines — AI will search and create the title, subtitle, and post', 'error');
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
    if (isTwiceDailyRecurrence()) {
      showToast('Please select a date, first time, and second time', 'error');
    } else {
      showToast('Please select a scheduled date and time', 'error');
    }
    return;
  }

  let recurrenceTimes;
  if (recurrence === 'twice_daily') {
    const { firstMinutes, secondMinutes } = getTwiceDailyTimes();
    if (!Number.isFinite(secondMinutes)) {
      showToast('Please choose a second time of day', 'error');
      return;
    }
    if (firstMinutes === secondMinutes) {
      showToast('First and second times must be different', 'error');
      return;
    }
    recurrenceTimes = [firstMinutes, secondMinutes];
  }

  if (enableSearch && !apiKey && !hasBackendApiKey(resolvedProvider)) {
    showToast(
      `Add your ${resolvedProvider.toUpperCase()} API key in Settings — scheduled research posts store the key with the job so cron can run offline.`,
      'error'
    );
    return;
  }

  const postTypeLabel = getSelectLabel('schedPostType', postType);
  const recurrenceLabel = getSelectLabel('schedRecurrence', recurrence);
  const scheduledAtLabel = new Date(scheduledAtRaw).toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  const recurrenceTimesLabel = recurrenceTimes ? formatRecurrenceTimesLabel(recurrenceTimes) : '';

  let publishMode = 'Publish live';
  if (postType === 'note') {
    publishMode = 'Publish note';
  } else if (isDraft) {
    publishMode = 'Save as draft';
  }

  const confirmed = await confirmSchedulePost({
    postType,
    postTypeLabel,
    title,
    subtitle,
    body,
    noteLink,
    isDraft,
    recurrence,
    recurrenceLabel,
    scheduledAtLabel,
    recurrenceTimesLabel,
    enableSearch,
    publishMode,
    searchLabel: enableSearch ? 'Enabled' : 'Disabled',
    providerLabel: (resolvedProvider || 'Default').toUpperCase(),
    modelLabel: resolvedModel || 'Default model',
    presetMode,
  });

  if (!confirmed) return;

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
        recurrenceTimes,
        postType,
        noteLink,
        enableSearch,
        provider: enableSearch ? (resolvedProvider || undefined) : (schedProviderVal || undefined),
        model: enableSearch ? (resolvedModel || undefined) : (document.getElementById('schedModel').value || undefined),
        apiKey: apiKey || undefined,
        systemPrompt: systemPrompt || undefined,
        presetMode: presetMode || undefined,
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
    const presetModeEl = document.getElementById('schedPresetMode');
    if (presetModeEl) presetModeEl.value = '';

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

PG.toggleSchedulerFields = toggleSchedulerFields;
PG.parseTimeInputToMinutes = parseTimeInputToMinutes;
PG.formatMinutesLabel = formatMinutesLabel;
PG.isTwiceDailyRecurrence = isTwiceDailyRecurrence;
PG.getTwiceDailyTimes = getTwiceDailyTimes;
PG.computeTwiceDailyInitialIso = computeTwiceDailyInitialIso;
PG.toggleRecurrenceFields = toggleRecurrenceFields;
PG.formatRecurrenceTimesLabel = formatRecurrenceTimesLabel;
PG.formatScheduleDueLabel = formatScheduleDueLabel;
PG.getScheduleIsoTime = getScheduleIsoTime;
PG.confirmSendScheduleNow = confirmSendScheduleNow;
PG.sendScheduleNow = sendScheduleNow;
PG.loadSchedules = loadSchedules;
PG.getSelectLabel = getSelectLabel;
PG.truncateScheduleText = truncateScheduleText;
PG.buildScheduleConfirmHtml = buildScheduleConfirmHtml;
PG.confirmSchedulePost = confirmSchedulePost;
PG.handleCreateSchedule = handleCreateSchedule;
PG.toggleScheduleState = toggleScheduleState;
PG.deleteScheduleItem = deleteScheduleItem;
PG.retryScheduleItem = retryScheduleItem;
export {};
