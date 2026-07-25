/**
 * Auth middleware tests — run against a local server.
 * Usage: API_SECRET=... node scripts/test-auth.js
 */
import { BASE_URL, runTestSuite } from './test-helpers.js';

async function run() {
  const secret = process.env.API_SECRET || process.env.TEST_API_SECRET;

  const tests = [
    {
      name: 'GET /api/tools/health rejects missing Bearer',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/health`);
        if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
        const data = await res.json();
        if (data.success !== false) throw new Error('Expected success: false');
      },
    },
    {
      name: 'GET /api/tools/health rejects invalid Bearer',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/health`, {
          headers: { Authorization: 'Bearer invalid-token' },
        });
        if (res.status !== 403) throw new Error(`Expected 403, got ${res.status}`);
      },
    },
    {
      name: 'GET /api/mcp rejects missing Bearer',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/mcp`, { method: 'GET' });
        if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
      },
    },
  ];

  if (secret) {
    tests.push({
      name: 'GET /api/tools/health accepts valid Bearer',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/health`, {
          headers: { Authorization: `Bearer ${secret}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
        if (data.success !== true) throw new Error('Expected success: true');
        if (!data.data?.version) throw new Error('Missing version in health response');
        if (typeof data.data.connected !== 'boolean') {
          throw new Error('Missing connected boolean in health response');
        }
      },
    });
  }

  const { failed } = await runTestSuite({
    title: 'Auth & health tests',
    tests,
  });

  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
