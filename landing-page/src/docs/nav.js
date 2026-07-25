/** Sidebar navigation and page metadata for /docs */

export const GITHUB_EDIT_BASE =
  'https://github.com/santhosh-patel/substack-agent/edit/main/docs';

export const docsNav = [
  {
    title: 'Introduction',
    items: [
      {
        title: 'Overview',
        path: '',
        file: 'index.md',
        modes: [],
        description: 'Start here — choose a deployment mode and follow the right learning path.',
      },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Install',
        path: 'getting-started/install',
        file: 'getting-started/install.md',
        modes: [],
        description: 'Clone, configure `.env`, and run the local server or MCP.',
      },
      {
        title: 'Session Cookie',
        path: 'getting-started/session-cookie',
        file: 'getting-started/session-cookie.md',
        modes: ['Local Dashboard', 'MCP'],
        description: 'How to extract and rotate your Substack `connect.sid` cookie safely.',
      },
      {
        title: 'Environment Variables',
        path: 'getting-started/environment-variables',
        file: 'getting-started/environment-variables.md',
        modes: [],
        description: 'Reference for all server env vars — required, optional, and production-only.',
      },
      {
        title: 'First Publish',
        path: 'getting-started/first-publish',
        file: 'getting-started/first-publish.md',
        modes: ['Local Dashboard'],
        description: 'Step-by-step walkthrough: connect, generate, and save your first draft.',
      },
    ],
  },
  {
    title: 'Local Dashboard',
    items: [
      {
        title: 'Overview',
        path: 'dashboard/overview',
        file: 'dashboard/overview.md',
        modes: ['Local Dashboard'],
        description: 'Playground architecture, tabs, and when to use the dashboard vs the Tools API.',
      },
      {
        title: 'Settings',
        path: 'dashboard/settings',
        file: 'dashboard/settings.md',
        modes: ['Local Dashboard'],
        description: 'Substack session, AI providers, system prompts, and connection testing.',
      },
      {
        title: 'Newsletters',
        path: 'dashboard/newsletters',
        file: 'dashboard/newsletters.md',
        modes: ['Local Dashboard'],
        description: 'AI-assisted newsletter compose, preview, draft, and publish.',
      },
      {
        title: 'Notes',
        path: 'dashboard/notes',
        file: 'dashboard/notes.md',
        modes: ['Local Dashboard'],
        description: 'Short Substack notes with optional link cards.',
      },
      {
        title: 'Comments',
        path: 'dashboard/comments',
        file: 'dashboard/comments.md',
        modes: ['Local Dashboard'],
        description: 'Keyword-based comment automation on target accounts.',
      },
      {
        title: 'Scheduler',
        path: 'dashboard/scheduler',
        file: 'dashboard/scheduler.md',
        modes: ['Local Dashboard'],
        description: 'Queue newsletters and notes for one-off or recurring publish times.',
      },
      {
        title: 'History',
        path: 'dashboard/history',
        file: 'dashboard/history.md',
        modes: ['Local Dashboard'],
        description: 'Unified history of publishes, notes, comments, and Substack archive.',
      },
    ],
  },
  {
    title: 'MCP Server',
    items: [
      {
        title: 'Setup',
        path: 'mcp/setup',
        file: 'mcp/setup.md',
        modes: ['MCP'],
        description: 'Local stdio MCP for Claude Desktop and Cursor.',
      },
      {
        title: 'Remote MCP (HTTP)',
        path: 'mcp/remote',
        file: 'mcp/remote.md',
        modes: ['MCP', 'Tools API'],
        description: 'Connect MCP clients to your deployed domain at `/api/mcp`.',
      },
      {
        title: 'Tools Reference',
        path: 'mcp/tools',
        file: 'mcp/tools.md',
        modes: ['MCP'],
        description: 'All 9 MCP tools with parameters and examples.',
      },
      {
        title: 'Limitations',
        path: 'mcp/limitations',
        file: 'mcp/limitations.md',
        modes: ['MCP'],
        description: 'Session auth, scheduling, and platform constraints.',
      },
    ],
  },
  {
    title: 'Tools API',
    items: [
      {
        title: 'Overview',
        path: 'api/overview',
        file: 'api/overview.md',
        modes: ['Tools API'],
        description: 'REST endpoints for n8n, GPTs, and custom automations at your domain.',
      },
      {
        title: 'Endpoints',
        path: 'api/endpoints',
        file: 'api/endpoints.md',
        modes: ['Tools API'],
        description: 'Complete route list with curl examples.',
      },
      {
        title: 'OpenAPI',
        path: 'api/openapi',
        file: 'api/openapi.md',
        modes: ['Tools API'],
        description: 'Import the spec into GPT Actions, Postman, or n8n.',
      },
      {
        title: 'Dashboard API',
        path: 'api/dashboard-api',
        file: 'api/dashboard-api.md',
        modes: ['Local Dashboard'],
        description: 'Unauthenticated `/api/*` routes used by the playground UI.',
      },
    ],
  },
  {
    title: 'Deployment',
    items: [
      {
        title: 'Deployment Modes',
        path: 'deployment/modes',
        file: 'deployment/modes.md',
        modes: [],
        description: 'Compare local dashboard, Tools API, stdio MCP, and remote MCP.',
      },
      {
        title: 'Deploy Tools API',
        path: 'deployment/deploy',
        file: 'deployment/deploy.md',
        modes: ['Tools API'],
        description: 'Deploy anywhere: Docker, Railway, Render, Fly, or any Node host.',
      },
      {
        title: 'Vercel (optional)',
        path: 'deployment/vercel',
        file: 'deployment/vercel.md',
        modes: ['Tools API'],
        description: 'Serverless deploy notes and ephemeral storage limits.',
      },
      {
        title: 'Scheduler & Cron',
        path: 'deployment/scheduler-cron',
        file: 'deployment/scheduler-cron.md',
        modes: ['Local Dashboard'],
        description: 'Local worker, manual triggers, and external cron setup.',
      },
    ],
  },
  {
    title: 'Integrations',
    items: [
      {
        title: 'Claude Desktop',
        path: 'integrations/claude-desktop',
        file: 'integrations/claude-desktop.md',
        modes: ['MCP'],
        description: 'Configure stdio MCP in `claude_desktop_config.json`.',
      },
      {
        title: 'Cursor',
        path: 'integrations/cursor',
        file: 'integrations/cursor.md',
        modes: ['MCP'],
        description: 'Local stdio or remote HTTP MCP in Cursor settings.',
      },
      {
        title: 'n8n',
        path: 'integrations/n8n',
        file: 'integrations/n8n.md',
        modes: ['Tools API'],
        description: 'HTTP Request nodes against `/api/tools/*`.',
      },
      {
        title: 'Custom GPT',
        path: 'integrations/custom-gpt',
        file: 'integrations/custom-gpt.md',
        modes: ['Tools API'],
        description: 'OpenAPI Actions pointing at your deployment.',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        title: 'Security',
        path: 'security',
        file: 'security.md',
        modes: [],
        description: 'Auth model, cookie handling, and production hardening.',
      },
      {
        title: 'Troubleshooting',
        path: 'troubleshooting',
        file: 'troubleshooting.md',
        modes: [],
        description: 'Symptom → cause → fix for common failures.',
      },
      {
        title: 'Changelog',
        path: 'changelog',
        file: 'changelog.md',
        modes: [],
        description: 'Release history for Substack Agent.',
      },
    ],
  },
];

export const flatPages = docsNav.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title }))
);

export function findPageByPath(pathname) {
  const path = pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');
  return flatPages.find((p) => p.path === path) ?? flatPages[0];
}

export function getAdjacentPages(pathname) {
  const path = pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');
  const idx = flatPages.findIndex((p) => p.path === path);
  if (idx === -1) return { prev: null, next: flatPages[1] ?? null };
  return {
    prev: idx > 0 ? flatPages[idx - 1] : null,
    next: idx < flatPages.length - 1 ? flatPages[idx + 1] : null,
  };
}

export function docsHref(path) {
  return path ? `/docs/${path}` : '/docs';
}

function normalizeDocFilePath(filePath) {
  const parts = filePath.split('/');
  const stack = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  return stack.join('/');
}

/** Map markdown hrefs (repo-relative or file-relative) to /docs routes in the SPA. */
export function resolveMarkdownHref(href, currentFile) {
  if (!href) return { type: 'external', href: '#' };

  if (href.startsWith('#')) {
    return { type: 'hash', href };
  }

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return { type: 'external', href };
  }

  if (href === '/docs' || href.startsWith('/docs/')) {
    return { type: 'internal', to: href };
  }

  // /playground, /openapi.json, etc.
  if (href.startsWith('/')) {
    return { type: 'external', href };
  }

  const hashIndex = href.indexOf('#');
  const filePart = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex);

  if (filePart.endsWith('.md')) {
    let targetFile = filePart;

    if (targetFile.startsWith('docs/')) {
      targetFile = targetFile.slice('docs/'.length);
    } else if (currentFile) {
      const dir = currentFile.includes('/')
        ? currentFile.slice(0, currentFile.lastIndexOf('/'))
        : '';
      targetFile = normalizeDocFilePath(dir ? `${dir}/${targetFile}` : targetFile);
    }

    const page = flatPages.find((p) => p.file === targetFile);
    const routePath = page
      ? page.path
      : targetFile.replace(/\.md$/, '').replace(/\/index$/, '');

    return { type: 'internal', to: `${docsHref(routePath)}${hash}` };
  }

  return { type: 'external', href };
}
