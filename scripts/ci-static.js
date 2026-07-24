/**
 * Static CI checks — no server required.
 * Usage: node scripts/ci-static.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  bold: '\x1b[1m',
};

let passed = 0;
let failed = 0;

function ok(name, detail = '') {
  passed++;
  console.log(`${colors.green}PASS${colors.reset} ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name, err) {
  failed++;
  console.log(`${colors.red}FAIL${colors.reset} ${name} — ${err}`);
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function walkMarkdown(dir, base = '') {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (fs.statSync(abs).isDirectory()) {
      if (name === 'superpowers') continue;
      out.push(...walkMarkdown(abs, rel));
    } else if (name.endsWith('.md')) {
      out.push(rel);
    }
  }
  return out;
}

function checkDocsNav() {
  const navPath = path.join(root, 'landing-page/src/docs/nav.js');
  const nav = fs.readFileSync(navPath, 'utf8');
  const files = [...nav.matchAll(/file:\s*'([^']+\.md)'/g)].map((m) => m[1]);
  const existing = walkMarkdown(path.join(root, 'docs'));

  const missing = files.filter((f) => !existing.includes(f));
  const unused = existing.filter((f) => !files.includes(f));

  if (missing.length) {
    fail('docs nav ↔ files', `nav references missing files: ${missing.join(', ')}`);
    return;
  }
  if (unused.length) {
    fail('docs nav ↔ files', `markdown not in nav: ${unused.join(', ')}`);
    return;
  }
  ok('docs nav ↔ files', `${files.length} pages`);
}

function checkOpenApi() {
  const specPath = path.join(root, 'public/openapi.json');
  if (!exists('public/openapi.json')) {
    fail('openapi.json', 'file missing');
    return;
  }

  let spec;
  try {
    spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  } catch (e) {
    fail('openapi.json', `invalid JSON: ${e.message}`);
    return;
  }

  if (!spec.openapi || !spec.paths) {
    fail('openapi.json', 'missing openapi/paths');
    return;
  }

  const expected = [
    '/api/tools/health',
    '/api/tools/publish-newsletter',
    '/api/tools/publish-note',
    '/api/tools/comment',
    '/api/tools/automate-comments',
    '/api/tools/list-newsletters',
    '/api/tools/list-notes',
    '/api/tools/list-comments',
    '/api/tools/schedule-post',
    '/api/tools/list-schedules',
    '/api/mcp',
  ];

  const missing = expected.filter((p) => !spec.paths[p]);
  if (missing.length) {
    fail('openapi paths', `missing: ${missing.join(', ')}`);
    return;
  }

  const toolsSrc = fs.readFileSync(path.join(root, 'src/routes/tools.ts'), 'utf8');
  const routeNames = [
    'health',
    'publish-newsletter',
    'publish-note',
    'comment',
    'automate-comments',
    'list-newsletters',
    'list-notes',
    'list-comments',
    'schedule-post',
    'list-schedules',
  ];
  const missingRoutes = routeNames.filter(
    (name) => !toolsSrc.includes(`'/${name}'`) && !toolsSrc.includes(`"/${name}"`)
  );
  if (missingRoutes.length) {
    fail('openapi ↔ tools routes', `route handlers missing: ${missingRoutes.join(', ')}`);
    return;
  }

  ok('openapi.json', `${Object.keys(spec.paths).length} paths`);
}

function checkPublicAssets() {
  const required = [
    'public/index.html',
    'public/playground.html',
    'public/favicon.svg',
    'public/openapi.json',
    'public/.well-known/ai-plugin.json',
  ];

  const missing = required.filter((f) => !exists(f));
  if (missing.length) {
    fail('required public files', missing.join(', '));
    return;
  }

  const assetsDir = path.join(root, 'public/assets');
  const assets = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
  const hasIndexJs = assets.some((f) => /^index-.*\.js$/.test(f));
  const hasDocsJs = assets.some((f) => /^DocsLayout-.*\.js$/.test(f));
  if (!hasIndexJs || !hasDocsJs) {
    fail('landing assets', `index js=${hasIndexJs}, DocsLayout js=${hasDocsJs}`);
    return;
  }

  const indexHtml = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
  const scriptMatch = indexHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
  if (!scriptMatch || !assets.includes(scriptMatch[1])) {
    fail('index.html script', 'bundle reference missing from public/assets');
    return;
  }

  ok('public assets', `favicon + ${assets.length} asset files`);
}

function checkEnvExample() {
  if (!exists('.env.example')) {
    fail('.env.example', 'missing');
    return;
  }
  const example = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
  const requiredKeys = ['API_SECRET', 'SUBSTACK_SID', 'SUBSTACK_PUB_URL'];
  const missing = requiredKeys.filter((k) => !example.includes(k));
  if (missing.length) {
    fail('.env.example', `missing keys: ${missing.join(', ')}`);
    return;
  }
  ok('.env.example', 'required keys present');
}

function checkChangelogParity() {
  const rootCl = path.join(root, 'CHANGELOG.md');
  const docsCl = path.join(root, 'docs/changelog.md');
  if (!fs.existsSync(rootCl) || !fs.existsSync(docsCl)) {
    fail('changelog parity', 'CHANGELOG.md or docs/changelog.md missing');
    return;
  }
  const a = fs.readFileSync(rootCl, 'utf8').trim();
  const b = fs.readFileSync(docsCl, 'utf8').trim();
  if (a !== b) {
    fail('changelog parity', 'CHANGELOG.md and docs/changelog.md differ');
    return;
  }
  ok('changelog parity');
}

console.log(`${colors.bold}Static CI checks${colors.reset}\n`);
checkDocsNav();
checkOpenApi();
checkPublicAssets();
checkEnvExample();
checkChangelogParity();

console.log(`\n${colors.bold}${passed} passed, ${failed} failed${colors.reset}`);
process.exit(failed > 0 ? 1 : 0);
