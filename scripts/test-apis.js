import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3456';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index > 0) {
        const key = trimmed.substring(0, index).trim();
        let val = trimmed.substring(index + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        env[key] = val;
      }
    });
  }
  return env;
}

async function runTests() {
  console.log(`${colors.bold}${colors.cyan}=========================================`);
  console.log('      SUBSTACK AUTOMATION API TESTER     ');
  console.log(`=========================================${colors.reset}\n`);

  const env = loadEnv();
  const sid = env.SUBSTACK_SID;
  const pubUrl = env.SUBSTACK_PUB_URL || env.PUBLICATION_URL;

  if (!sid) {
    console.log(`${colors.yellow}Warning: SUBSTACK_SID not found in .env. Connection tests will fail.${colors.reset}\n`);
  }

  const tests = [
    {
      name: 'GET /api/config',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/config`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
        if (data.defaultSystemPrompt === undefined) throw new Error('Response missing defaultSystemPrompt');
        if ('sid' in data || 'groqApiKey' in data) {
          throw new Error('Config endpoint must not expose secrets');
        }
        return `Config loaded. hasSubstackSid=${data.hasSubstackSid}`;
      }
    },
    {
      name: 'POST /api/connect',
      run: async () => {
        if (!sid) throw new Error('Skipped: SUBSTACK_SID missing in .env');
        const res = await fetch(`${BASE_URL}/api/connect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sid, publicationUrl: pubUrl })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Connected as ${data.profile.name} (Slug: ${data.profile.slug})`;
      }
    },
    {
      name: 'GET /api/newsletters',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/newsletters`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Newsletters fetched successfully. Found ${data.posts?.length || 0} newsletters.`;
      }
    },
    {
      name: 'GET /api/notes',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/notes`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Notes fetched successfully. Found ${data.notes?.length || 0} notes.`;
      }
    },
    {
      name: 'GET /api/comments',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/comments`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Comments history fetched successfully. Found ${data.comments?.length || 0} comments in history.`;
      }
    },
    {
      name: 'POST /api/notes/generate',
      run: async () => {
        // Find first available AI Provider key
        let provider = '';
        let model = '';
        let apiKey = '';

        if (env.GROQ_API_KEY) {
          provider = 'groq';
          model = 'llama-3.1-8b-instant';
          apiKey = env.GROQ_API_KEY;
        } else if (env.GEMINI_API_KEY) {
          provider = 'gemini';
          model = 'gemini-2.5-flash';
          apiKey = env.GEMINI_API_KEY;
        } else if (env.OPENAI_API_KEY) {
          provider = 'openai';
          model = 'gpt-4o-mini';
          apiKey = env.OPENAI_API_KEY;
        }

        if (!provider) {
          throw new Error('Skipped: No AI Provider API key (GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY) found in .env');
        }

        const res = await fetch(`${BASE_URL}/api/notes/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: 'Importance of Software Testing',
            provider,
            model,
            apiKey
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `AI generated note successfully using ${provider} (${model}): "${data.note.body.substring(0, 60)}..."`;
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    process.stdout.write(`Testing ${colors.bold}${test.name}${colors.reset} ... `);
    try {
      const msg = await test.run();
      console.log(`${colors.green}PASS${colors.reset}`);
      console.log(`  └─ ${colors.cyan}${msg}${colors.reset}\n`);
      passed++;
    } catch (e) {
      console.log(`${colors.red}FAIL${colors.reset}`);
      console.log(`  └─ ${colors.red}Error: ${e.message}${colors.reset}\n`);
      failed++;
    }
  }

  console.log(`=========================================`);
  console.log(`Result: ${colors.bold}${passed} Passed, ${failed} Failed${colors.reset}`);
  console.log(`=========================================`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Fatal testing error:', err);
  process.exit(1);
});
