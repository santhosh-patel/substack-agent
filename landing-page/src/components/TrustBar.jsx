import './TrustBar.css';

const logos = [
  { name: 'Claude Desktop', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
  { name: 'Cursor', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M13.325 3.05L8.667 20.432l1.932.518 4.658-17.382-1.932-.518zM7.612 18.36l1.36-1.448-4.444-4.174.006-.008 4.438-4.166-1.36-1.45-5.6 5.262a.504.504 0 000 .722l5.6 5.262zm8.776 0l5.6-5.262a.504.504 0 000-.722l-5.6-5.262-1.36 1.45 4.438 4.166.006.008-4.444 4.174 1.36 1.448z"/></svg> },
  { name: 'ChatGPT', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0012 .944a5.985 5.985 0 00-5.058 2.772 6.046 6.046 0 00-6.51 2.9 5.985 5.985 0 00.518 4.91A5.985 5.985 0 00.434 15.44a6.046 6.046 0 006.51 2.9A6.065 6.065 0 0012 23.056a5.985 5.985 0 005.058-2.772 6.046 6.046 0 006.51-2.9 5.985 5.985 0 00-.518-4.91z"/></svg> },
  { name: 'n8n', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.795 2H6.205A4.205 4.205 0 002 6.205v11.59A4.205 4.205 0 006.205 22h11.59A4.205 4.205 0 0022 17.795V6.205A4.205 4.205 0 0017.795 2zM12 18.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"/></svg> },
  { name: 'Vercel', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 19.5h20L12 2z"/></svg> },
  { name: 'Substack', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v3H4V4zm0 5h16v2H4V9zm0 4h16v8l-8-4.5L4 21V13z"/></svg> },
];

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container">
        <p className="trust-label">Works seamlessly with</p>
        <div className="trust-logos">
          {logos.map((logo) => (
            <div className="trust-logo" key={logo.name}>
              {logo.icon}
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
