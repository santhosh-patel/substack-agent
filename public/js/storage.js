export const SETTINGS_STORAGE_KEY = 'substack_settings';

export function getStoredSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function getStoredSid() {
  const sidInput = document.getElementById('sid');
  const fromInput = sidInput ? sidInput.value.trim() : '';
  if (fromInput) return fromInput;
  return getStoredSettings().sid || '';
}

export function getStoredApiKey(provider) {
  const providerVal = provider || document.getElementById('provider')?.value;
  const keyInput = document.getElementById('aiKey');
  const fromInput = keyInput ? keyInput.value.trim() : '';
  if (fromInput) return fromInput;
  if (!providerVal) return '';
  return localStorage.getItem(`substack_apikey_${providerVal}`) || '';
}

export function hasBackendApiKey(provider) {
  if (!window.backendConfig) return false;
  const flags = {
    groq: 'hasGroqApiKey',
    gemini: 'hasGeminiApiKey',
    openai: 'hasOpenAiApiKey',
    openrouter: 'hasOpenrouterApiKey',
  };
  return Boolean(window.backendConfig[flags[provider]]);
}
export function addToInputHistory(inputId, value) {
  if (!value) return;
  const historyKey = `history_${inputId}`;
  let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  
  history = history.filter(item => item !== value);
  history.unshift(value);
  
  if (history.length > 10) history.pop();
  
  localStorage.setItem(historyKey, JSON.stringify(history));
  updateDatalist(inputId);
}

export function updateDatalist(inputId) {
  const historyKey = `history_${inputId}`;
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  const datalist = document.getElementById(`${inputId}-history`);
  if (!datalist) return;
  
  datalist.innerHTML = history.map(val => `<option value="${escapeHtml(val)}"></option>`).join('');
}

export function loadAllInputHistories() {
  const inputIds = ['topic', 'commentTarget', 'commentKeyword', 'noteTopic', 'noteLink'];
  inputIds.forEach(id => updateDatalist(id));
}

// ─── Scheduler tab logic ───
