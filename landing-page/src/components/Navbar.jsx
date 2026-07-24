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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar-container container">
        <a href="/" className="nav-brand">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#FF6719" />
              <path d="M7 7h14v3H7V7zm0 5h14v9L14 17.5 7 21V12z" fill="white" />
            </svg>
          </div>
          <span>Substack Agent</span>
        </a>

        {mobileOpen && (
          <div className="nav-backdrop" onClick={() => setMobileOpen(false)} />
        )}

        <div className={`nav-menu ${mobileOpen ? 'is-open' : ''}`}>
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#integrations" onClick={() => setMobileOpen(false)}>Integrations</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#tools" onClick={() => setMobileOpen(false)}>Tools</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
          <a href="/playground" className="btn btn-primary nav-mobile-cta" onClick={() => setMobileOpen(false)}>
            Try in Playground
          </a>
        </div>

        <div className="nav-actions">
          <a href="/playground" className="btn btn-primary nav-cta nav-cta-desktop">
            Try in Playground
          </a>

          <button 
            className={`mobile-toggle ${mobileOpen ? 'is-active' : ''}`} 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
