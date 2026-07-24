import { useState } from 'react';
import './Integrations.css';

const cards = [
  {
    id: 'mcp',
    number: '01',
    title: 'MCP Server',
    desc: <>Native tools for Claude Desktop, Cursor, and any MCP-compatible AI client. Your assistant gets <strong>9 Substack tools</strong> — directly in chat.</>,
    filename: 'claude_desktop_config.json',
    code: `{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "src/mcp-server.ts"]
    }
  }
}`,
    tags: ['Claude Desktop', 'Cursor', 'Claude Code'],
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  },
  {
    id: 'api',
    number: '02',
    title: 'HTTP API',
    desc: <>Deploy to Vercel and call OpenAPI-defined endpoints. Any tool that speaks HTTP can publish to Substack — <strong>GPTs, n8n, Zapier, Make</strong>, or your own code.</>,
    filename: 'API Request',
    code: `curl -X POST /api/tools/publish-newsletter \\
  -H "Authorization: Bearer $KEY" \\
  -d '{"title":"Hello","body":"# Hi"}'`,
    tags: ['n8n', 'ChatGPT GPTs', 'Zapier', 'REST'],
    featured: true,
    badge: 'Most Flexible',
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  },
  {
    id: 'dashboard',
    number: '03',
    title: 'Web Dashboard',
    desc: <>A local UI for manual control with AI-assisted drafting. Connect your session, generate content, preview live Markdown, and publish with a click.</>,
    filename: 'Terminal',
    code: `npm run dev
# Open http://localhost:3456`,
    tags: ['Browser UI', 'Live Preview', 'AI Drafts'],
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  },
];

export default function Integrations() {
  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Integrations</span>
          <h2 className="section-title">
            Three ways to connect.<br /><span className="gradient-text">Zero friction.</span>
          </h2>
          <p className="section-subtitle">
            Pick the integration that fits your workflow. They all talk to the same powerful engine.
          </p>
        </div>

        <div className="integration-cards">
          {cards.map((card, i) => (
            <IntegrationCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationCard({ card, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(card.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`integration-card animate-in ${card.featured ? 'featured' : ''}`}
      id={`integration-${card.id}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {card.badge && <div className="integration-badge">{card.badge}</div>}
      <div className="integration-number">{card.number}</div>
      <div className="integration-icon">{card.icon}</div>
      <h3>{card.title}</h3>
      <p className="integration-desc">{card.desc}</p>

      <div className="integration-code">
        <div className="code-header">
          <span className="code-filename">{card.filename}</span>
          <button className="copy-btn" onClick={handleCopy} aria-label="Copy code">
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            )}
          </button>
        </div>
        <pre><code>{card.code}</code></pre>
      </div>

      <div className="integration-tags">
        {card.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
