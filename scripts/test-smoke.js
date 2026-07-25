/**
 * Credential-free HTTP smoke tests for CI.
 * Requires a running server (default http://localhost:3456).
 * Usage: API_SECRET=... node scripts/test-smoke.js
 */
import { BASE_URL, runTestSuite } from './test-helpers.js';

const API_SECRET = process.env.API_SECRET || process.env.TEST_API_SECRET;

async function expectStatus(url, status, init) {
  const res = await fetch(url, init);
  if (res.status !== status) {
    throw new Error(`${url} expected ${status}, got ${res.status}`);
  }
  return res;
}

async function run() {
  if (!API_SECRET) {
    console.error('API_SECRET (or TEST_API_SECRET) is required for smoke tests');
    process.exit(1);
  }

  const tests = [
    {
      name: 'GET / returns landing HTML',
      run: async () => {
        const res = await expectStatus(`${BASE_URL}/`, 200);
        const html = await res.text();
        if (!html.includes('<div id="root">')) throw new Error('missing #root');
        if (!html.includes('/assets/index-')) throw new Error('missing index bundle');
      },
    },
    {
      name: 'GET /docs returns SPA shell',
      run: async () => {
        const res = await expectStatus(`${BASE_URL}/docs`, 200);
        const html = await res.text();
        if (!html.includes('<div id="root">')) throw new Error('missing #root');
      },
    },
    {
      name: 'GET /playground returns dashboard',
      run: async () => {
        const res = await expectStatus(`${BASE_URL}/playground`, 200);
        const html = await res.text();
        if (!html.includes('app-header')) throw new Error('missing app-header');
      },
    },
    {
      name: 'GET /favicon.svg',
      run: async () => {
        await expectStatus(`${BASE_URL}/favicon.svg`, 200);
      },
    },
    {
      name: 'GET /openapi.json is valid OpenAPI',
      run: async () => {
        const res = await expectStatus(`${BASE_URL}/openapi.json`, 200);
        const spec = await res.json();
        if (!spec.openapi || !spec.paths?.['/api/tools/health']) {
          throw new Error('invalid or incomplete OpenAPI spec');
        }
      },
    },
    {
      name: 'GET /.well-known/ai-plugin.json',
      run: async () => {
        const res = await expectStatus(`${BASE_URL}/.well-known/ai-plugin.json`, 200);
        const data = await res.json();
        if (!data.api?.url) throw new Error('ai-plugin missing api.url');
      },
    },
    {
      name: 'GET /api/config does not leak secrets',
      run: async () => {
        const res = await expectStatus(`${BASE_URL}/api/config`, 200);
        const data = await res.json();
        for (const key of ['sid', 'groqApiKey', 'openaiApiKey', 'geminiApiKey', 'apiSecret']) {
          if (key in data) throw new Error(`config leaked ${key}`);
        }
        if (typeof data.hasSubstackSid !== 'boolean') {
          throw new Error('missing hasSubstackSid');
        }
      },
    },
    {
      name: 'Dashboard routes reject missing Substack session',
      run: async () => {
        for (const path of ['/api/newsletters', '/api/notes', '/api/profile']) {
          const res = await fetch(`${BASE_URL}${path}`);
          if (res.status !== 401) {
            throw new Error(`${path} expected 401 without session, got ${res.status}`);
          }
        }
      },
    },
    {
      name: 'GET /api/tools/health auth matrix',
      run: async () => {
        const noAuth = await fetch(`${BASE_URL}/api/tools/health`);
        if (noAuth.status !== 401) throw new Error(`no auth expected 401, got ${noAuth.status}`);

        const bad = await fetch(`${BASE_URL}/api/tools/health`, {
          headers: { Authorization: 'Bearer wrong-secret' },
        });
        if (bad.status !== 403) throw new Error(`bad auth expected 403, got ${bad.status}`);

        const okRes = await fetch(`${BASE_URL}/api/tools/health`, {
          headers: { Authorization: `Bearer ${API_SECRET}` },
        });
        const data = await okRes.json();
        if (!okRes.ok || data.success !== true) {
          throw new Error(`valid auth failed: ${okRes.status}`);
        }
      },
    },
    {
      name: 'Tools list endpoints require auth',
      run: async () => {
        for (const path of [
          '/api/tools/list-newsletters',
          '/api/tools/list-notes',
          '/api/tools/list-comments',
          '/api/tools/list-schedules',
        ]) {
          const res = await fetch(`${BASE_URL}${path}`);
          if (res.status !== 401) {
            throw new Error(`${path} expected 401, got ${res.status}`);
          }
        }
      },
    },
    {
      name: 'POST tools reject unauthenticated publish',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/publish-note`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ body: 'ci should reject' }),
        });
        if (res.status !== 401) throw new Error(`expected 401, got ${res.status}`);
      },
    },
  ];

  const { failed } = await runTestSuite({
    title: `HTTP smoke tests (${BASE_URL})`,
    tests,
  });

  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
