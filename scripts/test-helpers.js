import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3456';

export const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

/** Throw to mark a test as skipped (not a failure). */
export function skip(reason) {
  const err = new Error(`Skipped: ${reason}`);
  err.skip = true;
  throw err;
}

export function isSkipError(err) {
  return err?.skip === true || String(err?.message || '').startsWith('Skipped:');
}

/** Merge `.env` file values with process.env (process.env wins). */
export function loadEnv() {
  const env = {};
  const envPath = path.join(__dirname, '..', '.env');

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index > 0) {
        const key = trimmed.substring(0, index).trim();
        let val = trimmed.substring(index + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        env[key] = val;
      }
    });
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && value !== '') env[key] = value;
  }

  return env;
}

export function firstAiProvider(env) {
  if (env.GROQ_API_KEY) {
    return { provider: 'groq', model: 'llama-3.1-8b-instant', apiKey: env.GROQ_API_KEY };
  }
  if (env.GEMINI_API_KEY) {
    return { provider: 'gemini', model: 'gemini-2.5-flash', apiKey: env.GEMINI_API_KEY };
  }
  if (env.OPENAI_API_KEY) {
    return { provider: 'openai', model: 'gpt-4o-mini', apiKey: env.OPENAI_API_KEY };
  }
  return null;
}

export async function runTestSuite({
  title,
  tests,
  failOnSkip = process.env.CI_STRICT === '1',
}) {
  console.log(`${colors.bold}${colors.cyan}${title}${colors.reset}\n`);

  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const test of tests) {
    process.stdout.write(`${test.name} … `);
    try {
      const msg = await test.run();
      console.log(`${colors.green}PASS${colors.reset}`);
      if (msg) console.log(`  └─ ${colors.cyan}${msg}${colors.reset}`);
      passed++;
    } catch (err) {
      if (isSkipError(err) && !failOnSkip) {
        console.log(`${colors.yellow}SKIP${colors.reset}`);
        console.log(`  └─ ${colors.yellow}${err.message}${colors.reset}`);
        skipped++;
      } else {
        console.log(`${colors.red}FAIL${colors.reset}`);
        console.log(`  └─ ${colors.red}${err.message}${colors.reset}`);
        failed++;
      }
    }
    console.log('');
  }

  console.log(`${colors.bold}${passed} passed, ${failed} failed, ${skipped} skipped${colors.reset}`);
  return { passed, failed, skipped };
}
