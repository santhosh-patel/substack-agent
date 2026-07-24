import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="nav-logo footer-logo-link">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="8" fill="#FF6719" />
                  <path d="M7 7h14v3H7V7zm0 5h14v9L14 17.5 7 21V12z" fill="white" />
                </svg>
              </div>
              <span>Substack Agent</span>
            </a>
            <p className="footer-desc">
              Automate your Substack publication with AI agents. Open source, free forever.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#integrations">Integrations</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#tools">MCP Tools</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="https://github.com/santhosh-patel/substack-agent" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://github.com/santhosh-patel/substack-agent/blob/main/README.md" target="_blank" rel="noopener noreferrer">Documentation</a>
              <a href="https://github.com/santhosh-patel/substack-agent/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a>
              <a href="https://github.com/santhosh-patel/substack-agent/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License (MIT)</a>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="https://github.com/santhosh-patel" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              <a href="https://github.com/santhosh-patel/substack-agent/issues" target="_blank" rel="noopener noreferrer">Report Issues</a>
              <a href="https://github.com/santhosh-patel/substack-agent/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer">Security</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Substack Agent. MIT License. Built by{' '}
            <a href="https://github.com/santhosh-patel" target="_blank" rel="noopener noreferrer">Santhosh Patel</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
