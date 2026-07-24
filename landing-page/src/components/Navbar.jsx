import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#FF6719" />
              <path d="M7 7h14v3H7V7zm0 5h14v9L14 17.5 7 21V12z" fill="white" />
            </svg>
          </div>
          <span>Substack Agent</span>
        </a>

        <div className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#integrations" onClick={() => setMobileOpen(false)}>Integrations</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#tools" onClick={() => setMobileOpen(false)}>Tools</a>
          <a href="https://github.com/santhosh-patel/substack-agent" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>GitHub</a>
        </div>

        <div className="nav-actions">
          <a href="https://github.com/santhosh-patel/substack-agent" target="_blank" rel="noopener noreferrer" className="btn btn-ghost nav-github-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star
          </a>
          <a href="#get-started" className="btn btn-primary">Get Started</a>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
