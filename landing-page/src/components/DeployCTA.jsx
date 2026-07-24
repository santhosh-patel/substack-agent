import { useState } from 'react';
import './DeployCTA.css';

const envVars = ['SUBSTACK_SID', 'SUBSTACK_PUB_URL', 'API_SECRET'];

const CURL_EXAMPLE = `curl -s "https://your-domain/api/tools/health" \\
  -H "Authorization: Bearer $API_SECRET"`;

export default function DeployCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CURL_EXAMPLE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

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
              href="/docs/deployment/deploy"
              className="btn btn-accent btn-lg"
            >
              Deployment docs
            </a>
            <button type="button" className="btn btn-outline btn-lg" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy health check curl'}
            </button>
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
