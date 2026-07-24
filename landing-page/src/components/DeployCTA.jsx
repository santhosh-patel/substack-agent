import './DeployCTA.css';

const envVars = ['SUBSTACK_SID', 'SUBSTACK_PUB_URL', 'API_SECRET'];

export default function DeployCTA() {
  return (
    <section className="deploy-cta" id="deploy">
      <div className="container">
        <div className="deploy-card animate-in">
          <span className="section-badge">Deploy</span>
          <h2 className="section-title">Deploy the Tools API to Vercel</h2>
          <p className="deploy-subtitle">
            Host stateless tool endpoints for n8n, GPTs, and webhooks. Use local <code>npm run dev</code> for the full dashboard and scheduler.
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
              href="https://vercel.com/new/clone?repository-url=https://github.com/santhosh-patel/substack-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg"
            >
              Deploy to Vercel
            </a>
            <a
              href="https://github.com/santhosh-patel/substack-agent#deploy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              Deployment docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
