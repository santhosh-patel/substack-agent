import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const escapeHtml = (...args) => PG.escapeHtml(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);
const isConnected = PG.isConnected;

import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const escapeHtml = (...args) => PG.escapeHtml(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);

// ─── Comment Automation ───

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

  if (!PG.isConnected) {
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

  PG.commentAutomationAbortController = new AbortController();

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
      signal: PG.commentAutomationAbortController.signal
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
    PG.commentAutomationAbortController = null;
    if (consoleTitleState) {
      consoleTitleState.className = 'console-title-text console-idle';
    }
  }
}

function stopCommentAutomation() {
  if (PG.commentAutomationAbortController) {
    PG.commentAutomationAbortController.abort();
  }
}

// ─── Newsletters Listing ───

PG.appendCommentLog = appendCommentLog;
PG.runCommentAutomation = runCommentAutomation;
PG.stopCommentAutomation = stopCommentAutomation;
{};

PG.appendCommentLog = appendCommentLog;
PG.runCommentAutomation = runCommentAutomation;
PG.stopCommentAutomation = stopCommentAutomation;
export {};
