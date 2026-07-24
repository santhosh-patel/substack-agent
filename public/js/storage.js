import PG from './pg.js';
import './state.js';
import './ui.js';
const escapeHtml = (...args) => PG.escapeHtml(...args);

const SETTINGS_STORAGE_KEY = 'substack_settings';

function getStoredSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function getStoredSid() {
  const sidInput = document.getElementById('sid');
  const fromInput = sidInput ? sidInput.value.trim() : '';
  if (fromInput) return fromInput;
  return getStoredSettings().sid || '';
}

function getStoredApiKey(provider) {
  const providerVal = provider || document.getElementById('provider')?.value;
  const keyInput = document.getElementById('aiKey');
  const fromInput = keyInput ? keyInput.value.trim() : '';
  if (fromInput) return fromInput;
  if (!providerVal) return '';
  return localStorage.getItem(`substack_apikey_${providerVal}`) || '';
}

function hasBackendApiKey(provider) {
  if (!window.backendConfig) return false;
  const flags = {
    groq: 'hasGroqApiKey',
    gemini: 'hasGeminiApiKey',
    openai: 'hasOpenAiApiKey',
    openrouter: 'hasOpenrouterApiKey',
  };
  return Boolean(window.backendConfig[flags[provider]]);
}

function addToInputHistory(inputId, value) {
  if (!value) return;
  const historyKey = `history_${inputId}`;
  let history = JSON.parse(localStorage.getItem(historyKey) || '[]');

  history = history.filter(item => item !== value);
  history.unshift(value);

  if (history.length > 10) history.pop();

  localStorage.setItem(historyKey, JSON.stringify(history));
  updateDatalist(inputId);
}

function updateDatalist(inputId) {
  const historyKey = `history_${inputId}`;
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  const datalist = document.getElementById(`${inputId}-history`);
  if (!datalist) return;

  datalist.innerHTML = history.map(val => `<option value="${escapeHtml(val)}"></option>`).join('');
}

function loadAllInputHistories() {
  const inputIds = ['topic', 'commentTarget', 'commentKeyword', 'noteTopic', 'noteLink'];
  inputIds.forEach(id => updateDatalist(id));
}

PG.SETTINGS_STORAGE_KEY = SETTINGS_STORAGE_KEY;
PG.getStoredSettings = getStoredSettings;
PG.getStoredSid = getStoredSid;
PG.getStoredApiKey = getStoredApiKey;
PG.hasBackendApiKey = hasBackendApiKey;
PG.addToInputHistory = addToInputHistory;
PG.updateDatalist = updateDatalist;
PG.loadAllInputHistories = loadAllInputHistories;
export {};
