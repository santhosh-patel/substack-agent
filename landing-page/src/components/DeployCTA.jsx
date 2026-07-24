import './DeployCTA.css';

const envVars = ['SUBSTACK_SID', 'SUBSTACK_PUB_URL', 'API_SECRET'];

export default function DeployCTA() {
  return (
    <section className="deploy-cta" id="deploy">
      <div className="container">
        <div className="deploy-card animate-in">
          <span className="section-badge">Deploy</span>
          <h2 className="section-title">Deploy the Tools API anywhere</h2>
          <p className="deploy-subtitle">
            Host the OpenAPI tools endpoints on any Node host. Then use your domain with agents, automations, and MCP-style tool clients (n8n, custom GPTs, webhooks). Keep local <code>npm run mcp</code> / <code>npm run dev</code> for Claude Desktop and the full dashboard.
          </p>

          <div className="deploy-env-checklist">
            <span className="deploy-env-label">Required environment variables:</span>
            <ul>
              {envVars.map((v) => (
                <li key={v}><code>{v}</code></li>
              ))}
            </ul>
          </div>

          <div className="deploy-actions">
            <a
              href="https://github.com/santhosh-patel/substack-agent#deploy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg"
            >
              Deployment docs
            </a>
            <a
              href="https://github.com/santhosh-patel/substack-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
