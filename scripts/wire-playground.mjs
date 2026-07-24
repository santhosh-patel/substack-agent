#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public/js');

function wrap(name, body, extra = '') {
  return `import PG from './pg.js';\nimport './state.js';\n${extra}\n${body.replace(/\bisConnected\b/g, 'PG.isConnected').replace(/\ballHistoryItems\b/g, 'PG.allHistoryItems').replace(/\bcommentAutomationAbortController\b/g, 'PG.commentAutomationAbortController').replace(/\bschedulerPollingInterval\b/g, 'PG.schedulerPollingInterval').replace(/\bapiKeySaveTimer\b/g, 'PG.apiKeySaveTimer').replace(/\bcurrentProfile\b/g, 'PG.currentProfile')}\n\nconst _exp = {${Object.entries(PG_exports[name] || {}).map(([k, v]) => `${k}: ${v}`).join(', ')}};\nObject.assign(PG, _exp);\nexport {};\n`;
}

const PG_exports = {
  models: { MODELS: 'MODELS' },
  ui: { initMacConsoleHighlight: 'initMacConsoleHighlight', setButtonLoading: 'setButtonLoading', showToast: 'showToast', escapeHtml: 'escapeHtml', showAppConfirm: 'showAppConfirm', togglePasswordVisibility: 'togglePasswordVisibility' },
  storage: { SETTINGS_STORAGE_KEY: 'SETTINGS_STORAGE_KEY', getStoredSettings: 'getStoredSettings', getStoredSid: 'getStoredSid', getStoredApiKey: 'getStoredApiKey', hasBackendApiKey: 'hasBackendApiKey', addToInputHistory: 'addToInputHistory', updateDatalist: 'updateDatalist', loadAllInputHistories: 'loadAllInputHistories' },
};

// Simpler: prepend PG import and replace state vars, assign all exports to PG at end
function processFile(file, deps = '') {
  let body = fs.readFileSync(path.join(dir, file), 'utf-8');
  body = body.replace(/^export /gm, '');
  body = body.replace(/\bisConnected\b/g, 'PG.isConnected');
  body = body.replace(/\ballHistoryItems\b/g, 'PG.allHistoryItems');
  body = body.replace(/\bcommentAutomationAbortController\b/g, 'PG.commentAutomationAbortController');
  body = body.replace(/\bschedulerPollingInterval\b/g, 'PG.schedulerPollingInterval');
  body = body.replace(/\bapiKeySaveTimer\b/g, 'PG.apiKeySaveTimer');
  body = body.replace(/\bcurrentProfile\b/g, 'PG.currentProfile');

  const fnExports = [...body.matchAll(/^(?:async )?function (\w+)/gm)].map((m) => m[1]);
  const constExports = [...body.matchAll(/^const (\w+) =/gm)].map((m) => m[1]);
  const exports = [...new Set([...fnExports, ...constExports.filter((n) => n === 'MODELS' || n === 'SETTINGS_STORAGE_KEY' || n.startsWith('TAB_') || n.startsWith('PATH_') || n.startsWith('ONBOARDING') || n.startsWith('SCHEDULER_') || n.startsWith('DT_') || n === 'dtState')])];

  const assign = exports.map((n) => `PG.${n} = ${n};`).join('\n');

  const header = `import PG from './pg.js';\n${deps}\n`;
  fs.writeFileSync(path.join(dir, file), `${header}${body}\n${assign}\nexport {};\n`);
}

const order = [
  ['models.js', "import './state.js';"],
  ['ui.js', "import './state.js';"],
  ['storage.js', "import './state.js';\nimport './ui.js';"],
  ['settings.js', "import './state.js';\nimport './models.js';\nimport './ui.js';\nimport './storage.js';"],
  ['publish.js', "import './state.js';\nimport './models.js';\nimport './ui.js';\nimport './storage.js';\nimport './settings.js';"],
  ['tabs.js', "import './state.js';\nimport './ui.js';\nimport './settings.js';"],
  ['comments.js', "import './state.js';\nimport './ui.js';\nimport './storage.js';\nimport './settings.js';"],
  ['history.js', "import './state.js';\nimport './ui.js';\nimport './storage.js';\nimport './settings.js';"],
  ['notes.js', "import './state.js';\nimport './ui.js';\nimport './storage.js';\nimport './settings.js';\nimport './publish.js';"],
  ['scheduler-core.js', "import './state.js';\nimport './models.js';\nimport './ui.js';\nimport './storage.js';\nimport './settings.js';"],
  ['datetime.js', "import './state.js';\nimport './ui.js';\nimport './scheduler-core.js';"],
  ['scheduler-polling.js', "import './state.js';\nimport './ui.js';\nimport './settings.js';\nimport './scheduler-core.js';"],
];

for (const [file, deps] of order) {
  if (fs.existsSync(path.join(dir, file))) processFile(file, deps);
}
console.log('Wired playground modules');
