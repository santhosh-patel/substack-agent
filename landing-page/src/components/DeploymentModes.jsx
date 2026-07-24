import MacWindow from './MacWindow';
import './DeploymentModes.css';

const modes = [
  {
    id: 'local',
    title: 'Local Dashboard',
    command: 'npm run dev',
    bestFor: 'Full UI, scheduling, AI compose, history',
    limits: 'Runs on localhost:3456. Best experience for hands-on publishing.',
    cta: { label: 'Open Playground', href: '/playground' },
  },
  {
    id: 'api',
    title: 'Deployed Tools API',
    command: 'any Node host + API_SECRET',
    bestFor: 'n8n, GPTs, webhooks, production automations',
    limits: 'Stateless tool calls only. Bearer auth required in production. Point clients at your domain.',
    cta: { label: 'View OpenAPI', href: '/openapi.json' },
  },
  {
    id: 'mcp',
    title: 'Local MCP Server',
    command: 'npm run mcp',
    bestFor: 'Claude Desktop, Cursor, chat-native workflows',
    limits: 'Stdio transport. Runs locally alongside your MCP client.',
    cta: { label: 'MCP Setup', href: '/docs/mcp/setup' },
  },
  {
    id: 'mcp-remote',
    title: 'Remote MCP (HTTP)',
    command: 'https://your-domain/api/mcp',
    bestFor: 'Cursor remote, cloud agents, deployed MCP clients',
    limits: 'Same tools as stdio MCP. Requires Bearer auth and SUBSTACK_SID on the host.',
    cta: { label: 'Remote MCP Docs', href: '/docs/mcp/remote' },
  },
];

export default function DeploymentModes() {
  return (
    <section className="deployment-modes" id="deployment-modes">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Deployment</span>
          <h2 className="section-title">
            Four ways to <span className="brand-gradient">run Substack Agent</span>
          </h2>
          <p className="section-subtitle">
            Pick the mode that matches your workflow. Each has different capabilities and limits.
          </p>
        </div>

        <div className="modes-grid">
          {modes.map((mode, i) => (
            <div className="mode-card animate-in" key={mode.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <h3 className="mode-title">{mode.title}</h3>
              <MacWindow compact className="mode-command-window">
                <code>{mode.command}</code>
              </MacWindow>
              <p className="mode-best"><strong>Best for:</strong> {mode.bestFor}</p>
              <p className="mode-limits"><strong>Limits:</strong> {mode.limits}</p>
              <a
                href={mode.cta.href}
                className="btn btn-outline btn-sm mode-cta"
                {...(mode.cta.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {mode.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
