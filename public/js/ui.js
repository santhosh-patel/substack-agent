import PG from './pg.js';
import './state.js';

function initMacConsoleHighlight() {
  document.querySelectorAll('.mac-console').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.mac-console.is-active').forEach((node) => node.classList.remove('is-active'));
      el.classList.add('is-active');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.mac-console.is-active').forEach((node) => node.classList.remove('is-active'));
  });
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

function showAppConfirm({
  title = 'Confirm',
  message = '',
  messageHtml = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  icon = 'send',
} = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById('appConfirmOverlay');
    const titleEl = document.getElementById('appConfirmTitle');
    const bodyEl = document.getElementById('appConfirmBody');
    const iconWrap = document.getElementById('appConfirmIconWrap');
    const iconEl = document.getElementById('appConfirmIcon');
    const cancelBtn = document.getElementById('appConfirmCancel');
    const confirmBtn = document.getElementById('appConfirmOk');

    if (!overlay || !titleEl || !bodyEl || !cancelBtn || !confirmBtn) {
      resolve(window.confirm(`${title}\n\n${message}`));
      return;
    }

    titleEl.textContent = title;
    if (messageHtml) {
      bodyEl.innerHTML = messageHtml;
      bodyEl.style.whiteSpace = 'normal';
    } else {
      bodyEl.textContent = message;
      bodyEl.style.whiteSpace = 'pre-line';
    }
    cancelBtn.textContent = cancelLabel;
    confirmBtn.textContent = confirmLabel;

    const isDanger = variant === 'danger';
    iconWrap.classList.toggle('danger', isDanger);
    confirmBtn.classList.toggle('danger', isDanger);
    iconEl.setAttribute('data-lucide', icon);

    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('app-modal-open');
      document.removeEventListener('keydown', onKeyDown);
      overlay.removeEventListener('click', onOverlayClick);
      cancelBtn.removeEventListener('click', onCancel);
      confirmBtn.removeEventListener('click', onConfirm);
      resolve(result);
    };

    const onCancel = () => finish(false);
    const onConfirm = () => finish(true);
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    const onOverlayClick = (e) => {
      if (e.target === overlay) onCancel();
    };

    cancelBtn.addEventListener('click', onCancel);
    confirmBtn.addEventListener('click', onConfirm);
    document.addEventListener('keydown', onKeyDown);
    overlay.addEventListener('click', onOverlayClick);

    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('app-modal-open');
    if (window.lucide) lucide.createIcons();
    cancelBtn.focus();
  });
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
function syncSidebarToggleUi(isCollapsed) {
  const openBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');
  if (openBtn) {
    openBtn.setAttribute('aria-expanded', String(!isCollapsed));
    openBtn.title = isCollapsed ? 'Open settings' : 'Hide settings';
  }
  if (closeBtn) {
    closeBtn.setAttribute('aria-expanded', String(!isCollapsed));
  }
}

function toggleSidebar() {
  const grid = document.querySelector('.main-grid');
  if (!grid) return;
  const isCollapsed = grid.classList.toggle('sidebar-collapsed');
  localStorage.setItem('sidebar_collapsed', String(isCollapsed));
  syncSidebarToggleUi(isCollapsed);
}

function openSidebarAndFocusSid() {
  const grid = document.querySelector('.main-grid');
  if (grid && grid.classList.contains('sidebar-collapsed')) {
    grid.classList.remove('sidebar-collapsed');
    localStorage.setItem('sidebar_collapsed', 'false');
    syncSidebarToggleUi(false);
  }
  const sidInput = document.getElementById('sid');
  if (sidInput) {
    sidInput.focus();
    sidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  showToast('Please paste your Substack SID cookie value to connect.', 'info');
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = btnEl.querySelector('i');

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    if (icon) icon.setAttribute('data-lucide', 'eye');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

PG.initMacConsoleHighlight = initMacConsoleHighlight;
PG.setButtonLoading = setButtonLoading;
PG.showToast = showToast;
PG.escapeHtml = escapeHtml;
PG.showAppConfirm = showAppConfirm;
PG.loadSystemPromptForTab = loadSystemPromptForTab;
PG.saveSystemPrompt = saveSystemPrompt;
PG.resetSystemPrompt = resetSystemPrompt;
PG.toggleSidebar = toggleSidebar;
PG.syncSidebarToggleUi = syncSidebarToggleUi;
PG.openSidebarAndFocusSid = openSidebarAndFocusSid;
PG.togglePasswordVisibility = togglePasswordVisibility;
export {};
