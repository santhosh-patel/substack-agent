import './Features.css';

const features = [
  {
    id: 'publish',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    color: 'orange',
    title: 'Publish Newsletters',
    desc: 'Draft or publish newsletters with full Markdown support. Your AI writes, Substack Agent publishes — live to subscribers or saved as draft.',
    large: true,
    code: true,
  },
  {
    id: 'notes',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    color: 'purple',
    title: 'Post Notes',
    desc: 'Share quick updates with optional link cards — like tweets, but for your Substack audience.',
  },
  {
    id: 'comments',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    color: 'teal',
    title: 'Comment on Posts',
    desc: 'Engage with any Substack post by URL or ID. Build relationships at scale through thoughtful commenting.',
  },
  {
    id: 'automate',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    color: 'blue',
    title: 'Automate Comments',
    desc: 'AI scans a target account, matches posts by keyword, and auto-generates & posts relevant comments.',
  },
  {
    id: 'ai',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z"/><path d="M16 14H8a4 4 0 00-4 4v2h16v-2a4 4 0 00-4-4z"/></svg>,
    color: 'gradient',
    title: 'Multi-Provider AI Generation',
    desc: 'Use Groq, Gemini, or OpenAI to draft newsletters and generate contextual comments. Your AI, your choice of model.',
    large: true,
    chips: true,
  },
  {
    id: 'schedule',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    color: 'amber',
    title: 'Schedule Posts',
    desc: 'Queue newsletters & notes for future publishing — once, daily, weekly, or on custom recurring schedules.',
  },
  {
    id: 'list',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    color: 'emerald',
    title: 'List & Browse Content',
    desc: 'Query your newsletters, notes, and comment history. Full visibility into everything your automation has done.',
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2 className="section-title">
            Everything you need to<br /><span className="gradient-text">automate Substack</span>
          </h2>
          <p className="section-subtitle">
            From publishing newsletters to automating engagement — a complete toolkit built for AI-powered workflows.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              className={`feature-card animate-in ${f.large ? 'feature-card-large' : ''}`}
              key={f.id}
              id={`feature-${f.id}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`feature-icon-wrap ${f.color}`}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              {f.code && (
                <div className="feature-code">
                  <code>
                    <span className="code-comment">{'// From Claude Desktop'}</span><br />
                    <span className="code-keyword">publish_newsletter</span>({'{'}<br />
                    &nbsp;&nbsp;title: <span className="code-string">"Weekly Insights"</span>,<br />
                    &nbsp;&nbsp;body: <span className="code-keyword">markdownContent</span>,<br />
                    &nbsp;&nbsp;isDraft: <span className="code-bool">false</span><br />
                    {'}'})
                  </code>
                </div>
              )}
              {f.chips && (
                <div className="ai-provider-chips">
                  <span className="chip chip-groq">⚡ Groq</span>
                  <span className="chip chip-gemini">✦ Gemini</span>
                  <span className="chip chip-openai">◉ OpenAI</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
