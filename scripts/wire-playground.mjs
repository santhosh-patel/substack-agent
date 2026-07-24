#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public/js');

const STATE_VARS = [
  'isConnected', 'allHistoryItems', 'commentAutomationAbortController',
  'schedulerPollingInterval', 'apiKeySaveTimer', 'currentProfile',
];

const FILE_DEPS = {
  'models.js': [],
  'ui.js': [],
  'storage.js': ['escapeHtml'],
  'settings.js': ['showToast', 'setButtonLoading', 'escapeHtml', 'getStoredSid', 'getStoredApiKey', 'hasBackendApiKey', 'getStoredSettings', 'MODELS'],
  'publish.js': ['showToast', 'setButtonLoading', 'getStoredApiKey', 'hasBackendApiKey', 'getStoredSid', 'isConnected', 'addPostToHistory', 'updateOnboardingChecklist', 'updatePreviewMetadata'],
  'tabs.js': ['loadSystemPromptForTab', 'loadHistory', 'loadNotes', 'loadSchedules', 'updateSchedModelOptions', 'syncSchedApiKeyFromStorage', 'dtRefreshTimeWheel', 'startSchedulerPolling', 'stopSchedulerPolling'],
  'comments.js': ['showToast', 'setButtonLoading', 'escapeHtml', 'getStoredApiKey', 'hasBackendApiKey', 'isConnected'],
  'history.js': ['showToast', 'setButtonLoading', 'escapeHtml', 'getStoredSid', 'isConnected', 'switchTab', 'handleGenerate', 'handleGenerateNote'],
  'notes.js': ['showToast', 'setButtonLoading', 'getStoredApiKey', 'hasBackendApiKey', 'isConnected', 'addToInputHistory', 'escapeHtml'],
  'scheduler-core.js': ['showToast', 'setButtonLoading', 'escapeHtml', 'showAppConfirm', 'getStoredApiKey', 'getStoredSid', 'hasBackendApiKey', 'getSelectLabel', 'testAiKey', 'isTwiceDailyRecurrence', 'getTwiceDailyTimes', 'computeTwiceDailyInitialIso', 'formatMinutesLabel', 'formatRecurrenceTimesLabel', 'formatScheduleDueLabel', 'dtBuildSelectedDate', 'MODELS'],
  'datetime.js': ['showToast', 'isTwiceDailyRecurrence', 'computeTwiceDailyInitialIso', 'getTwiceDailyTimes', 'formatMinutesLabel'],
  'scheduler-polling.js': ['showToast', 'appendSchedulerLog', 'renderSchedulerApiLogs', 'loadSchedules', 'loadHistory', 'classifySchedulerLogType'],
};

function processFile(file) {
  let body = fs.readFileSync(path.join(dir, file), 'utf-8');
  body = body.replace(/^export /gm, '');

  for (const v of STATE_VARS) {
    body = body.replace(new RegExp(`\\b${v}\\b`, 'g'), `PG.${v}`);
  }

  const fnExports = [...body.matchAll(/^(?:async )?function (\w+)/gm)].map((m) => m[1]);
  const constExports = [...body.matchAll(/^const (\w+) =/gm)].map((m) => m[1]);
  const allConsts = constExports.filter((n) => /^[A-Z]/.test(n) || n === 'dtState');
  const exports = [...new Set([...fnExports, ...allConsts])];

  const deps = FILE_DEPS[file] || [];
  const depLines = deps.map((d) => {
    if (STATE_VARS.includes(d)) return `const ${d} = PG.${d};`;
    return `const ${d} = (...args) => PG.${d}(...args);`;
  }).join('\n');

  const assign = exports.map((n) => `PG.${n} = ${n};`).join('\n');
  const header = `import PG from './pg.js';\nimport './state.js';\n${depLines ? depLines + '\n' : ''}`;
  fs.writeFileSync(path.join(dir, file), `${header}\n${body}\n${assign}\nexport {};\n`);
}

const order = [
  'models.js', 'ui.js', 'storage.js', 'settings.js', 'publish.js',
  'tabs.js', 'comments.js', 'history.js', 'notes.js',
  'scheduler-core.js', 'datetime.js', 'scheduler-polling.js',
];

for (const file of order) {
  if (fs.existsSync(path.join(dir, file))) processFile(file);
}
console.log('Wired', order.length, 'playground modules');
