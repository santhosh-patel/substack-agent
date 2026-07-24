import './CTA.css';

export default function CTA({ onOpenPlayground }) {
  return (
    <section className="cta-section" id="get-started">
      <div className="container">
        <div className="cta-card animate-in">
          <span className="cta-badge">GET STARTED TODAY</span>
          <h2 className="cta-heading">
            Automate Substack with <span className="brand-gradient">AI Agents</span>
          </h2>
          <p className="cta-subheading">
            Open-source under MIT License. Connect your session cookie and start publishing programmatically.
          </p>

          <div className="cta-actions">
            <button onClick={onOpenPlayground} className="btn btn-accent btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Try in Playground
            </button>

            <a 
              href="http://localhost:3456" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-lg"
            >
              Open Live App (http://localhost:3456)
            </a>

            <a 
              href="https://github.com/santhosh-patel/substack-agent" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-ghost btn-lg"
            >
              GitHub Repo
            </a>
          </div>

          <div className="cta-terminal">
            <div className="terminal-top">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="terminal-title">Quick Installation</span>
            </div>
            <pre><code>{`$ git clone https://github.com/santhosh-patel/substack-agent.git
$ cd substack-agent && npm install
$ cp .env.example .env
$ npm run dev`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
