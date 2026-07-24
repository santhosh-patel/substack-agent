/**
 * Copy Vite landing-page build output into ../public for serving.
 * Safer than shell globs in CI.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'landing-page', 'dist');
const publicDir = path.join(root, 'public');
const assetsDir = path.join(publicDir, 'assets');

if (!fs.existsSync(dist)) {
  console.error('landing-page/dist missing — run the Vite build first');
  process.exit(1);
}

const stalePrefixes = [
  'index-',
  'DocsLayout-',
  'rolldown-runtime-',
  'lib-',
  'rehype-highlight-',
  'atom-one-dark-',
];

fs.mkdirSync(assetsDir, { recursive: true });

for (const name of fs.readdirSync(assetsDir)) {
  if (stalePrefixes.some((prefix) => name.startsWith(prefix))) {
    fs.unlinkSync(path.join(assetsDir, name));
  }
}

fs.copyFileSync(path.join(dist, 'index.html'), path.join(publicDir, 'index.html'));

for (const file of ['favicon.svg', 'icons.svg']) {
  const src = path.join(dist, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicDir, file));
  }
}

const distAssets = path.join(dist, 'assets');
if (!fs.existsSync(distAssets)) {
  console.error('landing-page/dist/assets missing');
  process.exit(1);
}

for (const name of fs.readdirSync(distAssets)) {
  fs.copyFileSync(path.join(distAssets, name), path.join(assetsDir, name));
}

console.log('Synced landing-page/dist → public/');
