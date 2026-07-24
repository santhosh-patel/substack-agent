import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const isTwiceDailyRecurrence = (...args) => PG.isTwiceDailyRecurrence(...args);
const computeTwiceDailyInitialIso = (...args) => PG.computeTwiceDailyInitialIso(...args);
const getTwiceDailyTimes = (...args) => PG.getTwiceDailyTimes(...args);
const formatMinutesLabel = (...args) => PG.formatMinutesLabel(...args);

// ─── Scheduled Date & Time Picker ───

const DT_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

let dtState = {
  viewYear: 2026,
  viewMonth: 0,
  selectedYear: 2026,
  selectedMonth: 0,
  selectedDay: 1,
  selectedMinutes: 0,
  confirmed: null,
};

const DT_WHEEL_ITEM_HEIGHT = 36;
const DT_WHEEL_COL_IDS = ['dtWheelHour', 'dtWheelMinute', 'dtWheelAmPm'];
let dtWheelReady = false;
let dtWheelScrolling = false;
let dtWheelScrollTimer = null;
let dtWheelUnlockTimer = null;

function dtPad(n) {
  return String(n).padStart(2, '0');
}

function dtDateFromState() {
  const hours = Math.floor(dtState.selectedMinutes / 60);
  const minutes = dtState.selectedMinutes % 60;
  return new Date(dtState.selectedYear, dtState.selectedMonth, dtState.selectedDay, hours, minutes, 0, 0);
}

function dtSetStateFromDate(date) {
  dtState.selectedYear = date.getFullYear();
  dtState.selectedMonth = date.getMonth();
  dtState.selectedDay = date.getDate();
  dtState.selectedMinutes = date.getHours() * 60 + date.getMinutes();
  dtState.viewYear = date.getFullYear();
  dtState.viewMonth = date.getMonth();
}

function dtSyncHiddenInput() {
  const hidden = document.getElementById('schedTime');
  if (!hidden) return;
  const d = dtDateFromState();
  hidden.value = `${d.getFullYear()}-${dtPad(d.getMonth() + 1)}-${dtPad(d.getDate())}T${dtPad(d.getHours())}:${dtPad(d.getMinutes())}`;
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

function dtFormatSummary(date) {
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function dtUpdateSummary() {
  const summaryEl = document.getElementById('dtPickerSummary');
  const relativeEl = document.getElementById('dtRelative');
  let target = dtDateFromState();

  if (isTwiceDailyRecurrence()) {
    const nextIso = computeTwiceDailyInitialIso();
    if (nextIso) target = new Date(nextIso);
    const { firstMinutes, secondMinutes } = getTwiceDailyTimes();
    const firstLabel = formatMinutesLabel(firstMinutes);
    const secondLabel = formatMinutesLabel(secondMinutes);
    if (summaryEl) {
      summaryEl.textContent = `${dtFormatSummary(dtDateFromState())} · daily at ${firstLabel} and ${secondLabel}`;
    }
  } else if (summaryEl) {
    summaryEl.textContent = dtFormatSummary(target);
  }

  if (relativeEl) {
    relativeEl.textContent = dtGetRelativeLabel(target);
  }
}

function dtRenderCalendar() {
  const grid = document.getElementById('dtCalendarGrid');
  const monthYearEl = document.getElementById('dtMonthYear');
  if (!grid || !monthYearEl) return;

  const year = dtState.viewYear;
  const month = dtState.viewMonth;
  monthYearEl.textContent = `${DT_MONTH_NAMES[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let html = '';

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    html += `<button type="button" class="dt-day dt-day-outside dt-day-disabled" tabindex="-1" disabled>${d}</button>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(year, month, d);
    const isPast = thisDate < today;
    const isToday = thisDate.getTime() === today.getTime();
    const isSelected =
      dtState.selectedYear === year &&
      dtState.selectedMonth === month &&
      dtState.selectedDay === d;

    let cls = 'dt-day';
    if (isToday) cls += ' dt-day-today';
    if (isSelected) cls += ' dt-day-selected';
    if (isPast) cls += ' dt-day-disabled';

    html += `<button type="button" class="${cls}" onclick="dtSelectDay(${d})"${isPast ? ' disabled' : ''}>${d}</button>`;
  }

  const totalCells = firstDay + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    html += `<button type="button" class="dt-day dt-day-outside dt-day-disabled" tabindex="-1" disabled>${d}</button>`;
  }

  grid.innerHTML = html;
}

function dtWheelItemsHtml(items) {
  return items.map(({ value, label }) =>
    `<button type="button" class="dt-wheel-item" data-value="${value}">${label}</button>`
  ).join('');
}

function dtWheelCol(id) {
  return document.getElementById(id);
}

function dtWheelItems(col) {
  return col ? [...col.querySelectorAll('.dt-wheel-item')] : [];
}

function dtWheelDataIndex(col) {
  if (!col) return 0;
  const items = dtWheelItems(col);
  if (!items.length) return 0;
  const idx = Math.round(col.scrollTop / DT_WHEEL_ITEM_HEIGHT);
  return Math.max(0, Math.min(items.length - 1, idx));
}

function dtSetWheelScrolling(ms = 120) {
  dtWheelScrolling = true;
  clearTimeout(dtWheelUnlockTimer);
  dtWheelUnlockTimer = setTimeout(() => {
    dtWheelScrolling = false;
  }, ms);
}

function dtScrollWheelTo(col, index, smooth = false) {
  if (!col) return;
  const items = dtWheelItems(col);
  if (!items.length) return;
  const clamped = Math.max(0, Math.min(items.length - 1, index));
  const top = clamped * DT_WHEEL_ITEM_HEIGHT;
  if (smooth) {
    col.scrollTo({ top, behavior: 'smooth' });
  } else {
    col.scrollTop = top;
  }
}

function dtUpdateWheelItemStyles() {
  DT_WHEEL_COL_IDS.forEach((id) => {
    const col = dtWheelCol(id);
    if (!col) return;
    const activeIdx = dtWheelDataIndex(col);
    dtWheelItems(col).forEach((item, i) => {
      item.classList.toggle('dt-wheel-item-active', i === activeIdx);
    });
  });
}

function dtMinutesFromWheelParts(hour12, minute, isPm) {
  let hour24 = hour12 % 12;
  if (isPm) hour24 += 12;
  return hour24 * 60 + minute;
}

function dtWheelPartsFromMinutes(totalMinutes) {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  return {
    hourIndex: (hour24 % 12 || 12) - 1,
    minuteIndex: minute,
    ampmIndex: hour24 >= 12 ? 1 : 0,
  };
}

function dtReadWheelsToState() {
  const hourCol = dtWheelCol('dtWheelHour');
  const minCol = dtWheelCol('dtWheelMinute');
  const ampmCol = dtWheelCol('dtWheelAmPm');
  if (!hourCol || !minCol || !ampmCol) return;

  const hour12 = parseInt(dtWheelItems(hourCol)[dtWheelDataIndex(hourCol)]?.dataset.value || '12', 10);
  const minute = parseInt(dtWheelItems(minCol)[dtWheelDataIndex(minCol)]?.dataset.value || '0', 10);
  const isPm = parseInt(dtWheelItems(ampmCol)[dtWheelDataIndex(ampmCol)]?.dataset.value || '0', 10) === 1;

  dtState.selectedMinutes = dtMinutesFromWheelParts(hour12, minute, isPm);
  dtSyncHiddenInput();
  dtUpdateSummary();
  dtUpdateWheelItemStyles();
}

function dtSyncWheelFromState() {
  if (!dtWheelReady) return;

  const { hourIndex, minuteIndex, ampmIndex } = dtWheelPartsFromMinutes(dtState.selectedMinutes);

  dtSetWheelScrolling(80);
  dtScrollWheelTo(dtWheelCol('dtWheelHour'), hourIndex, false);
  dtScrollWheelTo(dtWheelCol('dtWheelMinute'), minuteIndex, false);
  dtScrollWheelTo(dtWheelCol('dtWheelAmPm'), ampmIndex, false);
  dtUpdateWheelItemStyles();
}

function dtSnapWheelCol(col, smooth = true) {
  if (!col) return;
  dtScrollWheelTo(col, dtWheelDataIndex(col), smooth);
}

function dtSnapAllWheels(smooth = true) {
  DT_WHEEL_COL_IDS.forEach((id) => dtSnapWheelCol(dtWheelCol(id), smooth));
}

function dtFinishWheelInteraction() {
  if (dtWheelScrolling) return;
  dtSnapAllWheels(true);
  dtReadWheelsToState();
}

function dtOnWheelScroll() {
  if (dtWheelScrolling) return;
  dtUpdateWheelItemStyles();
  clearTimeout(dtWheelScrollTimer);
  dtWheelScrollTimer = setTimeout(dtFinishWheelInteraction, 120);
}

function dtOnWheelScrollEnd() {
  if (dtWheelScrolling) return;
  clearTimeout(dtWheelScrollTimer);
  dtFinishWheelInteraction();
}

function dtBindWheelColumn(col) {
  if (!col || col.dataset.bound === '1') return;
  col.dataset.bound = '1';
  col.addEventListener('scroll', dtOnWheelScroll, { passive: true });
  col.addEventListener('scrollend', dtOnWheelScrollEnd);

  dtWheelItems(col).forEach((item, index) => {
    item.addEventListener('click', () => {
      dtScrollWheelTo(col, index, true);
      clearTimeout(dtWheelScrollTimer);
      dtWheelScrollTimer = setTimeout(dtFinishWheelInteraction, 160);
    });
  });
}

function dtBuildTimeWheel() {
  const container = document.getElementById('dtTimeList');
  if (!container) return;

  if (!dtWheelReady) {
    const hours = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1) }));
    const minutes = Array.from({ length: 60 }, (_, i) => ({ value: i, label: dtPad(i) }));
    const ampm = [{ value: 0, label: 'AM' }, { value: 1, label: 'PM' }];

    container.innerHTML = `
      <div class="dt-wheel-fade dt-wheel-fade-top"></div>
      <div class="dt-wheel-fade dt-wheel-fade-bottom"></div>
      <div class="dt-wheel-highlight" aria-hidden="true"></div>
      <div class="dt-wheel-columns">
        <div class="dt-wheel-col" id="dtWheelHour" aria-label="Hour">
          <div class="dt-wheel-inner">${dtWheelItemsHtml(hours)}</div>
        </div>
        <span class="dt-wheel-sep" aria-hidden="true">:</span>
        <div class="dt-wheel-col" id="dtWheelMinute" aria-label="Minute">
          <div class="dt-wheel-inner">${dtWheelItemsHtml(minutes)}</div>
        </div>
        <div class="dt-wheel-col dt-wheel-col-ampm" id="dtWheelAmPm" aria-label="AM or PM">
          <div class="dt-wheel-inner">${dtWheelItemsHtml(ampm)}</div>
        </div>
      </div>
    `;

    DT_WHEEL_COL_IDS.forEach((id) => dtBindWheelColumn(dtWheelCol(id)));
    dtWheelReady = true;
  }

  dtSyncWheelFromState();
}

function dtRefreshTimeWheel() {
  dtBuildTimeWheel();
  dtSyncWheelFromState();
  dtUpdateSummary();
}

function dtRenderTimeWheel() {
  if (!dtWheelReady) {
    dtBuildTimeWheel();
    return;
  }
  dtSyncWheelFromState();
}

function dtRenderAll() {
  dtRenderCalendar();
  dtRenderTimeWheel();
  dtUpdateSummary();
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

function dtSelectDay(day) {
  dtState.selectedYear = dtState.viewYear;
  dtState.selectedMonth = dtState.viewMonth;
  dtState.selectedDay = day;
  dtSyncHiddenInput();
  dtRenderCalendar();
  dtUpdateSummary();
}

function dtSelectTime(minutes) {
  dtState.selectedMinutes = minutes;
  dtSyncHiddenInput();
  dtSyncWheelFromState();
  dtUpdateSummary();
}

function dtApplyDateTime(date, confirm = true) {
  dtSetStateFromDate(date);
  dtSyncHiddenInput();
  if (confirm) {
    dtState.confirmed = {
      selectedYear: dtState.selectedYear,
      selectedMonth: dtState.selectedMonth,
      selectedDay: dtState.selectedDay,
      selectedMinutes: dtState.selectedMinutes,
      viewYear: dtState.viewYear,
      viewMonth: dtState.viewMonth,
    };
  }
  dtRenderAll();
}

function dtInitWidget() {
  const defaultDate = new Date();
  defaultDate.setSeconds(0, 0);
  defaultDate.setMinutes(defaultDate.getMinutes() + 1);
  defaultDate.setHours(defaultDate.getHours() + 1);

  const tzEl = document.getElementById('dtTzBadge');
  if (tzEl) {
    tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  dtApplyDateTime(defaultDate, true);
  if (window.lucide) lucide.createIcons();

  // Scheduler tab may be hidden on load — sync wheels once layout is ready
  requestAnimationFrame(() => dtRefreshTimeWheel());
}

function dtConfirm() {
  dtState.confirmed = {
    selectedYear: dtState.selectedYear,
    selectedMonth: dtState.selectedMonth,
    selectedDay: dtState.selectedDay,
    selectedMinutes: dtState.selectedMinutes,
    viewYear: dtState.viewYear,
    viewMonth: dtState.viewMonth,
  };
  dtSyncHiddenInput();
  dtUpdateSummary();
  showToast(`Scheduled: ${dtFormatSummary(dtDateFromState())}`, 'info');
}

function dtCancel() {
  if (!dtState.confirmed) return;
  Object.assign(dtState, dtState.confirmed);
  dtSyncHiddenInput();
  dtRenderAll();
}

function dtQuickSchedule(minutesFromNow) {
  const date = new Date(Date.now() + minutesFromNow * 60000);
  date.setSeconds(0, 0);
  dtApplyDateTime(date, true);
}

function dtQuickScheduleTomorrow(hour, minute) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(hour, minute, 0, 0);
  dtApplyDateTime(date, true);
}

function dtSelectPromptPreset(type) {
  const schedBody = document.getElementById('schedBody');
  const presetModeEl = document.getElementById('schedPresetMode');
  if (!schedBody) return;

  const presets = {
    default: 'Search the web and pick the single best current story where artificial intelligence meets healthcare, nanotechnology, biotechnology, health technology, space technology, rural development, or robotics. Focus on one field per post.\n\nWrite a simple, clean, elegant newsletter in 100 to 150 words. Plain prose only. No icons, emojis, bullet lists, or hyphenated phrases. Avoid buzzwords, hype, and press release tone. Name real developments, companies, or research where possible. End with one clear thought worth keeping.\n\nAlso create an editorial sketch illustration related to the post and publish it at the top of the draft.',
    brief: 'Find the most interesting recent news on this topic. Write an engaging post with a strong hook, specific names/details from the story, and a clear builder-focused takeaway. Make it worth reading — not a flat summary.',
    builder: 'Lead with why this news matters for engineers shipping AI in production. Include concrete details, a sharp insight, and a memorable close. Engaging and professional, not bland.',
    reaction: 'Write like something in the news genuinely caught your attention. Strong opening, honest reaction, one sharp opinion — make it feel alive and specific, not generic.',
  };

  schedBody.value = presets[type] || '';
  if (presetModeEl) {
    presetModeEl.value = presets[type] ? type : '';
  }
}

window.dtNavigateMonth = dtNavigateMonth;
window.dtSelectDay = dtSelectDay;
window.dtSelectTime = dtSelectTime;
window.dtConfirm = dtConfirm;
window.dtCancel = dtCancel;
window.dtQuickSchedule = dtQuickSchedule;
window.dtQuickScheduleTomorrow = dtQuickScheduleTomorrow;
window.dtSelectPromptPreset = dtSelectPromptPreset;

PG.dtPad = dtPad;
PG.dtDateFromState = dtDateFromState;
PG.dtSetStateFromDate = dtSetStateFromDate;
PG.dtSyncHiddenInput = dtSyncHiddenInput;
PG.dtBuildSelectedDate = dtBuildSelectedDate;
PG.dtGetRelativeLabel = dtGetRelativeLabel;
PG.dtFormatSummary = dtFormatSummary;
PG.dtUpdateSummary = dtUpdateSummary;
PG.dtRenderCalendar = dtRenderCalendar;
PG.dtWheelItemsHtml = dtWheelItemsHtml;
PG.dtWheelCol = dtWheelCol;
PG.dtWheelItems = dtWheelItems;
PG.dtWheelDataIndex = dtWheelDataIndex;
PG.dtSetWheelScrolling = dtSetWheelScrolling;
PG.dtScrollWheelTo = dtScrollWheelTo;
PG.dtUpdateWheelItemStyles = dtUpdateWheelItemStyles;
PG.dtMinutesFromWheelParts = dtMinutesFromWheelParts;
PG.dtWheelPartsFromMinutes = dtWheelPartsFromMinutes;
PG.dtReadWheelsToState = dtReadWheelsToState;
PG.dtSyncWheelFromState = dtSyncWheelFromState;
PG.dtSnapWheelCol = dtSnapWheelCol;
PG.dtSnapAllWheels = dtSnapAllWheels;
PG.dtFinishWheelInteraction = dtFinishWheelInteraction;
PG.dtOnWheelScroll = dtOnWheelScroll;
PG.dtOnWheelScrollEnd = dtOnWheelScrollEnd;
PG.dtBindWheelColumn = dtBindWheelColumn;
PG.dtBuildTimeWheel = dtBuildTimeWheel;
PG.dtRefreshTimeWheel = dtRefreshTimeWheel;
PG.dtRenderTimeWheel = dtRenderTimeWheel;
PG.dtRenderAll = dtRenderAll;
PG.dtNavigateMonth = dtNavigateMonth;
PG.dtSelectDay = dtSelectDay;
PG.dtSelectTime = dtSelectTime;
PG.dtApplyDateTime = dtApplyDateTime;
PG.dtInitWidget = dtInitWidget;
PG.dtConfirm = dtConfirm;
PG.dtCancel = dtCancel;
PG.dtQuickSchedule = dtQuickSchedule;
PG.dtQuickScheduleTomorrow = dtQuickScheduleTomorrow;
PG.dtSelectPromptPreset = dtSelectPromptPreset;
PG.DT_MONTH_NAMES = DT_MONTH_NAMES;
PG.DT_WHEEL_ITEM_HEIGHT = DT_WHEEL_ITEM_HEIGHT;
PG.DT_WHEEL_COL_IDS = DT_WHEEL_COL_IDS;
export {};
