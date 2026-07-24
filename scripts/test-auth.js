/**
 * Auth middleware tests — run against a local server or mock NODE_ENV.
 * Usage: node scripts/test-auth.js
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3456';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  bold: '\x1b[1m',
};

async function run() {
  let passed = 0;
  let failed = 0;

  const tests = [
    {
      name: 'GET /api/tools/health rejects missing Bearer',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/health`);
        if (res.status !== 401) {
          throw new Error(`Expected 401, got ${res.status}`);
        }
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
        if (res.status !== 403) {
          throw new Error(`Expected 403, got ${res.status}`);
        }
      },
    },
    {
      name: 'GET /api/mcp rejects missing Bearer',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/mcp`, { method: 'GET' });
        if (res.status !== 401) {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      },
    },
  ];

  const secret = process.env.API_SECRET || process.env.TEST_API_SECRET;
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

  console.log(`${colors.bold}Auth & health tests${colors.reset}\n`);

  for (const test of tests) {
    process.stdout.write(`${test.name} … `);
    try {
      await test.run();
      console.log(`${colors.green}PASS${colors.reset}`);
      passed++;
    } catch (err) {
      console.log(`${colors.red}FAIL${colors.reset}`);
      console.log(`  ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
