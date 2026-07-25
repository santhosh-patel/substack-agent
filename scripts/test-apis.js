import {
  BASE_URL,
  colors,
  firstAiProvider,
  loadEnv,
  runTestSuite,
  skip,
} from './test-helpers.js';

async function runTests() {
  const env = loadEnv();
  const sid = env.SUBSTACK_SID;
  const pubUrl = env.SUBSTACK_PUB_URL || env.PUBLICATION_URL;
  const apiSecret = env.API_SECRET;
  const ai = firstAiProvider(env);

  let substackConnected = false;

  const tests = [];

  if (apiSecret) {
    tests.push({
      name: 'GET /api/tools/health (Bearer auth)',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/health`, {
          headers: { Authorization: `Bearer ${apiSecret}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
        if (typeof data.data?.connected !== 'boolean') {
          throw new Error('Health response missing connected flag');
        }
        return `Health OK — version ${data.data.version}, connected=${data.data.connected}`;
      },
    });
  } else {
    tests.push({
      name: 'GET /api/tools/health rejects unauthenticated',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/tools/health`);
        if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
        return 'Unauthenticated request correctly rejected';
      },
    });
  }

  tests.push(
    {
      name: 'GET /api/config',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/config`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
        if (data.defaultSystemPrompt === undefined) {
          throw new Error('Response missing defaultSystemPrompt');
        }
        if ('sid' in data || 'groqApiKey' in data) {
          throw new Error('Config endpoint must not expose secrets');
        }
        return `Config loaded. hasSubstackSid=${data.hasSubstackSid}`;
      },
    },
    {
      name: 'POST /api/connect',
      run: async () => {
        if (!sid) skip('SUBSTACK_SID missing (.env or environment)');
        const res = await fetch(`${BASE_URL}/api/connect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sid, publicationUrl: pubUrl }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        }
        substackConnected = true;
        return `Connected as ${data.profile.name} (Slug: ${data.profile.slug})`;
      },
    },
    {
      name: 'GET /api/newsletters',
      run: async () => {
        if (!substackConnected) {
          skip('Substack session not connected (set SUBSTACK_SID and run /api/connect)');
        }
        const res = await fetch(`${BASE_URL}/api/newsletters`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Newsletters fetched successfully. Found ${data.posts?.length || 0} newsletters.`;
      },
    },
    {
      name: 'GET /api/notes',
      run: async () => {
        if (!substackConnected) {
          skip('Substack session not connected (set SUBSTACK_SID and run /api/connect)');
        }
        const res = await fetch(`${BASE_URL}/api/notes`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Notes fetched successfully. Found ${data.notes?.length || 0} notes.`;
      },
    },
    {
      name: 'GET /api/comments',
      run: async () => {
        const res = await fetch(`${BASE_URL}/api/comments`);
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `Comments history fetched successfully. Found ${data.comments?.length || 0} comments in history.`;
      },
    },
    {
      name: 'POST /api/notes/generate',
      run: async () => {
        if (!ai) {
          skip('No AI Provider API key (GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY)');
        }
        const res = await fetch(`${BASE_URL}/api/notes/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: 'Importance of Software Testing',
            provider: ai.provider,
            model: ai.model,
            apiKey: ai.apiKey,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(`Status ${res.status}: ${data.error || JSON.stringify(data)}`);
        return `AI generated note successfully using ${ai.provider} (${ai.model}): "${data.note.body.substring(0, 60)}..."`;
      },
    },
  );

  if (!sid) {
    console.log(
      `${colors.yellow}Note: SUBSTACK_SID not set — Substack session tests will be skipped.${colors.reset}\n`,
    );
  }

  const { failed } = await runTestSuite({
    title: 'Substack Automation API tester',
    tests,
  });

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Fatal testing error:', err);
  process.exit(1);
});
