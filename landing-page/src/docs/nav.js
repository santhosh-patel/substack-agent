/** Sidebar navigation and page metadata for /docs */

export const GITHUB_EDIT_BASE =
  'https://github.com/santhosh-patel/substack-agent/edit/main/docs';

export const docsNav = [
  {
    title: 'Introduction',
    items: [
      { title: 'Overview', path: '', file: 'index.md', modes: [] },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      { title: 'Install', path: 'getting-started/install', file: 'getting-started/install.md', modes: [] },
      { title: 'Session Cookie', path: 'getting-started/session-cookie', file: 'getting-started/session-cookie.md', modes: ['Local Dashboard', 'MCP'] },
      { title: 'Environment Variables', path: 'getting-started/environment-variables', file: 'getting-started/environment-variables.md', modes: [] },
      { title: 'First Publish', path: 'getting-started/first-publish', file: 'getting-started/first-publish.md', modes: ['Local Dashboard'] },
    ],
  },
  {
    title: 'Local Dashboard',
    items: [
      { title: 'Overview', path: 'dashboard/overview', file: 'dashboard/overview.md', modes: ['Local Dashboard'] },
      { title: 'Settings', path: 'dashboard/settings', file: 'dashboard/settings.md', modes: ['Local Dashboard'] },
      { title: 'Newsletters', path: 'dashboard/newsletters', file: 'dashboard/newsletters.md', modes: ['Local Dashboard'] },
      { title: 'Notes', path: 'dashboard/notes', file: 'dashboard/notes.md', modes: ['Local Dashboard'] },
      { title: 'Comments', path: 'dashboard/comments', file: 'dashboard/comments.md', modes: ['Local Dashboard'] },
      { title: 'Scheduler', path: 'dashboard/scheduler', file: 'dashboard/scheduler.md', modes: ['Local Dashboard'] },
      { title: 'History', path: 'dashboard/history', file: 'dashboard/history.md', modes: ['Local Dashboard'] },
    ],
  },
  {
    title: 'MCP Server',
    items: [
      { title: 'Setup', path: 'mcp/setup', file: 'mcp/setup.md', modes: ['MCP'] },
      { title: 'Remote MCP (HTTP)', path: 'mcp/remote', file: 'mcp/remote.md', modes: ['MCP', 'Tools API'] },
      { title: 'Tools Reference', path: 'mcp/tools', file: 'mcp/tools.md', modes: ['MCP'] },
      { title: 'Limitations', path: 'mcp/limitations', file: 'mcp/limitations.md', modes: ['MCP'] },
    ],
  },
  {
    title: 'Tools API',
    items: [
      { title: 'Overview', path: 'api/overview', file: 'api/overview.md', modes: ['Tools API'] },
      { title: 'Endpoints', path: 'api/endpoints', file: 'api/endpoints.md', modes: ['Tools API'] },
      { title: 'OpenAPI', path: 'api/openapi', file: 'api/openapi.md', modes: ['Tools API'] },
      { title: 'Dashboard API', path: 'api/dashboard-api', file: 'api/dashboard-api.md', modes: ['Local Dashboard'] },
    ],
  },
  {
    title: 'Deployment',
    items: [
      { title: 'Deployment Modes', path: 'deployment/modes', file: 'deployment/modes.md', modes: [] },
      { title: 'Deploy Tools API', path: 'deployment/deploy', file: 'deployment/deploy.md', modes: ['Tools API'] },
      { title: 'Vercel (optional)', path: 'deployment/vercel', file: 'deployment/vercel.md', modes: ['Tools API'] },
      { title: 'Scheduler & Cron', path: 'deployment/scheduler-cron', file: 'deployment/scheduler-cron.md', modes: ['Local Dashboard'] },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { title: 'Claude Desktop', path: 'integrations/claude-desktop', file: 'integrations/claude-desktop.md', modes: ['MCP'] },
      { title: 'Cursor', path: 'integrations/cursor', file: 'integrations/cursor.md', modes: ['MCP'] },
      { title: 'n8n', path: 'integrations/n8n', file: 'integrations/n8n.md', modes: ['Tools API'] },
      { title: 'Custom GPT', path: 'integrations/custom-gpt', file: 'integrations/custom-gpt.md', modes: ['Tools API'] },
    ],
  },
  {
    title: 'Operations',
    items: [
      { title: 'Security', path: 'security', file: 'security.md', modes: [] },
      { title: 'Troubleshooting', path: 'troubleshooting', file: 'troubleshooting.md', modes: [] },
      { title: 'Changelog', path: 'changelog', file: 'changelog.md', modes: [] },
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
