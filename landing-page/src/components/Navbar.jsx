import { useState, useEffect } from 'react';
import './Navbar.css';

const DESKTOP_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tools', href: '#tools' },
  { label: 'Docs', href: '/docs' },
  { label: 'FAQ', href: '#faq' },
];

const MOBILE_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tools', href: '#tools' },
  { label: 'FAQ', href: '#faq' },
];

const RESOURCE_LINKS = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Playground', href: '/playground' },
];

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
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

          <div className="nav-menu nav-menu--desktop">
            {DESKTOP_LINKS.map(({ label, href }) => (
              <a key={href} href={href}>{label}</a>
            ))}
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
              aria-controls="mobile-nav"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="nav-backdrop" onClick={closeMobile} aria-hidden="true" />
      )}

      <div
        className={`nav-mobile-panel ${mobileOpen ? 'is-open' : ''}`}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
      >
        <div className="nav-mobile-scroll">
          <p className="nav-mobile-label">Product</p>
          {MOBILE_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-mobile-link" onClick={closeMobile}>
              {label}
            </a>
          ))}

          <p className="nav-mobile-label">Resources</p>
          {RESOURCE_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-mobile-link" onClick={closeMobile}>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-mobile-footer">
          <a
            href="/playground"
            className="btn btn-accent nav-mobile-cta"
            onClick={closeMobile}
          >
            Try in Playground
          </a>
        </div>
      </div>
    </>
  );
}
