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

export function getTabFromPath(pathname) {
  // Normalize: strip trailing slash
  const p = pathname.replace(/\/$/, '') || '/';
  return PATH_TO_TAB[p] || 'newsletters';
}

// ─── Tab Switching ───
export function switchTab(tabId, skipPush) {
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
    requestAnimationFrame(() => dtRefreshTimeWheel());
  }

  if (tabId === 'scheduler') {
    startSchedulerPolling();
  } else {
    stopSchedulerPolling();
  }
}
