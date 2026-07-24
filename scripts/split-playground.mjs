#!/usr/bin/env node
/**
 * One-time splitter: converts public/app.js into ES modules under public/js/
 */
import fs from 'fs';
import path from 'path';

const root = path.join(process.cwd(), 'public');
const src = fs.readFileSync(path.join(root, 'app.js'), 'utf-8');
const lines = src.split('\n');

function slice(start, end) {
  return lines.slice(start - 1, end).join('\n');
}

const chunks = {
  'models.js': slice(4, 26),
  'state.js': `export let isConnected = false;\nexport let allHistoryItems = [];\nexport let currentProfile = null;\nexport let commentAutomationAbortController = null;\nexport let schedulerPollingInterval = null;\nexport let apiKeySaveTimer = null;\n`,
  'storage.js': slice(137, 172) + '\n' + slice(1878, 1906),
  'ui.js': slice(32, 44) + '\n' + slice(759, 961) + '\n' + slice(2843, 2863),
  'config.js': slice(174, 264),
  'settings.js': slice(266, 403) + '\n' + slice(405, 460) + '\n' + slice(630, 757) + '\n' + slice(896, 1045) + '\n' + slice(2581, 2682),
  'publish.js': slice(462, 625) + '\n' + slice(977, 1045),
  'tabs.js': slice(1047, 1132),
  'comments.js': slice(1134, 1286),
  'history.js': slice(1288, 1665),
  'notes.js': slice(1667, 1876),
  'scheduler.js': slice(1908, 3022) + '\n' + slice(3024, 3507),
};

const outDir = path.join(root, 'js');
fs.mkdirSync(outDir, { recursive: true });

for (const [name, body] of Object.entries(chunks)) {
  fs.writeFileSync(path.join(outDir, name), body + '\n');
}

console.log('Wrote', Object.keys(chunks).length, 'module stubs to public/js/');
