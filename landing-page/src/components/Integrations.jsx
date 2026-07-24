import { useState } from 'react';
import './Integrations.css';

const methods = [
  {
    id: 'mcp',
    step: 'Method 01',
    title: 'MCP Protocol Server',
    subtitle: 'Native agent tool-calling for Claude Desktop & Cursor',
    desc: 'Run the MCP server locally or over stdio. Claude gets 9 native tools to publish, comment, and browse your Substack publication.',
    code: `{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "/path/to/src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-cookie-sid",
        "SUBSTACK_PUB_URL": "yourpub.substack.com"
      }
    }
  }
}`,
    highlights: ['Stdio Transport', 'Claude Desktop', 'Cursor IDE', 'No Server Setup'],
  },
  {
    id: 'api',
    step: 'Method 02',
    title: 'REST HTTP API',
    subtitle: 'Deployable on Vercel for n8n, GPTs & Custom Workflows',
    desc: 'Fully typed OpenAPI 3.0 endpoints. Call `/api/tools/*` from n8n automation pipelines, custom GPTs, Zapier, or backend webhooks.',
    code: `POST /api/tools/publish-newsletter
Authorization: Bearer $API_SECRET
Content-Type: application/json

{
  "title": "Automated Weekly Digest",
  "body": "Markdown newsletter body here...",
  "isDraft": false
}`,
    highlights: ['Vercel Ready', 'OpenAPI Schema', 'n8n & Zapier', 'Bearer Auth'],
  },
  {
    id: 'dashboard',
    step: 'Method 03',
    title: 'Local Web Dashboard',
    subtitle: 'GUI control panel with live Markdown & AI generation',
    desc: 'Launch the local browser interface to draft posts, test prompts with Groq/Gemini/OpenAI, and manage scheduled publications.',
    code: `npm run dev
# Server running at http://localhost:3456`,
    highlights: ['Browser UI', 'Live Preview', 'AI Prompts', 'Local JSON Storage'],
  },
];

export default function Integrations() {
  const [activeMethod, setActiveMethod] = useState('mcp');
  const [copied, setCopied] = useState(false);

  const current = methods.find((m) => m.id === activeMethod);

  const handleCopy = () => {
    if (!current) return;
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="integrations" id="integrations">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Architecture</span>
          <h2 className="section-title">
            Flexible integration <span className="brand-gradient">by design</span>
          </h2>
          <p className="section-subtitle">
            Integrate Substack Agent using the protocol and transport that fits your workflow.
          </p>
        </div>

        <div className="integration-wrapper">
          <div className="integration-nav" role="tablist" aria-label="Integration methods">
            {methods.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={activeMethod === m.id}
                className={`nav-item ${activeMethod === m.id ? 'active' : ''}`}
                onClick={() => setActiveMethod(m.id)}
              >
                <span className="item-step">{m.step}</span>
                <span className="item-title">{m.title}</span>
              </button>
            ))}
          </div>

          <div className="integration-card" role="tabpanel">
            <div className="card-header">
              <div>
                <span className="card-step">{current.step}</span>
                <h3 className="card-heading">{current.title}</h3>
                <p className="card-sub">{current.subtitle}</p>
              </div>
              <button className="btn btn-outline btn-sm copy-btn" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy snippet'}
              </button>
            </div>

            <p className="card-description">{current.desc}</p>

            <div className="code-display">
              <pre><code>{current.code}</code></pre>
            </div>

            <div className="tags-row">
              {current.highlights.map((h) => (
                <span className="tag-pill" key={h}>{h}</span>
              ))}
            </div>

            {copied && (
              <p className="integration-next-step">
                Snippet copied — <a href="/playground">open the playground</a> to try it live.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
