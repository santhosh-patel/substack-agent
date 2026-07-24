import './ConnectionModes.css';

const modes = [
  {
    title: 'Local MCP (stdio)',
    command: 'npm run mcp',
    desc: 'Claude Desktop and Cursor — runs on your machine alongside the client.',
  },
  {
    title: 'Tools API (HTTP)',
    command: 'https://your-domain/api/tools/*',
    desc: 'n8n, Custom GPTs, webhooks — deploy anywhere with Bearer auth.',
  },
  {
    title: 'Remote MCP (HTTP)',
    command: 'https://your-domain/api/mcp',
    desc: 'Hosted MCP at your domain for remote agent clients.',
  },
];

export default function ConnectionModes() {
  return (
    <section className="connection-modes" id="connection-modes">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Connect</span>
          <h2 className="section-title">
            Pick how your <span className="brand-gradient">agent connects</span>
          </h2>
          <p className="section-subtitle">
            Local MCP for desktop clients. Your domain for HTTP tools and remote MCP.
          </p>
        </div>

        <div className="connection-modes-grid">
          {modes.map((mode) => (
            <div className="connection-mode-card" key={mode.title}>
              <h3>{mode.title}</h3>
              <code>{mode.command}</code>
              <p>{mode.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
