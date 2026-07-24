import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-info">
            <a href="#" className="footer-brand">
              <div className="brand-icon">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="6" fill="#FF6719" />
                  <path d="M7 7h14v3H7V7zm0 5h14v9L14 17.5 7 21V12z" fill="white" />
                </svg>
              </div>
              <span>Substack Agent</span>
            </a>
            <p className="footer-tagline">
              Programmatic Substack publishing & automation for AI agents. Open source under MIT license.
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <span className="group-title">PRODUCT</span>
              <a href="#features">Features</a>
              <a href="#integrations">Integrations</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#tools">MCP Tools</a>
            </div>

            <div className="link-group">
              <span className="group-title">RESOURCES</span>
              <a href="https://github.com/santhosh-patel/substack-agent" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
              <a href="https://github.com/santhosh-patel/substack-agent#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
              <a href="https://github.com/santhosh-patel/substack-agent/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
            </div>

            <div className="link-group">
              <span className="group-title">COMMUNITY</span>
              <a href="https://santhosh-patel.vercel.app/" target="_blank" rel="noopener noreferrer">Creator Portfolio</a>
              <a href="https://github.com/santhosh-patel/substack-agent/issues" target="_blank" rel="noopener noreferrer">Issues & Feedback</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Substack Agent. Built by{' '}
            <a href="https://santhosh-patel.vercel.app/" target="_blank" rel="noopener noreferrer">
              Santhosh Patel
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
