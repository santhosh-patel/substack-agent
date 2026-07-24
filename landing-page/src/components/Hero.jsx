import { useEffect, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('mcp');
  const [showcaseActive, setShowcaseActive] = useState(false);

  useEffect(() => {
    if (!showcaseActive) return undefined;

    const onDocumentClick = () => setShowcaseActive(false);
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [showcaseActive]);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-subtle" />

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>Substack Automation 2.0</span>
          <span className="badge-sep">•</span>
          <a
            href="https://github.com/santhosh-patel/substack-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="badge-link"
          >
            Open Source
          </a>
        </div>

        <h1 className="hero-title">
          Automate your Substack publication<br className="desktop-only-br" />
          <span className="gradient-text">with native AI agent workflows</span>
        </h1>

        <p className="hero-subtitle">
          Connect Substack to Claude, Cursor, ChatGPT, and n8n. Draft newsletters, 
          publish posts, and engage with readers programmatically.
        </p>

        <div className="hero-cta">
          <a href="/playground" className="btn btn-accent btn-lg" id="cta-hero-playground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Try in Playground
          </a>

          <a 
            href="https://github.com/santhosh-patel/substack-agent" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-ghost btn-lg" 
            id="cta-hero-github"
          >
            GitHub Repo
          </a>
        </div>
      </div>

      <div className="container hero-showcase-container">
        <div
          className={`showcase-card ${showcaseActive ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setShowcaseActive(true);
          }}
          role="presentation"
        >
          <div className="showcase-header">
            <div className="mac-window-traffic" aria-hidden="true">
              <span className="mac-dot mac-dot-close" />
              <span className="mac-dot mac-dot-minimize" />
              <span className="mac-dot mac-dot-maximize" />
            </div>
              <div className="showcase-tabs" role="tablist" aria-label="Integration examples">
              <button 
                role="tab"
                aria-selected={activeTab === 'mcp'}
                className={`tab-btn ${activeTab === 'mcp' ? 'active' : ''}`}
                onClick={() => setActiveTab('mcp')}
              >
                Claude MCP Server
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'api'}
                className={`tab-btn ${activeTab === 'api' ? 'active' : ''}`}
                onClick={() => setActiveTab('api')}
              >
                REST API Tool
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'cli'}
                className={`tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
                onClick={() => setActiveTab('cli')}
              >
                CLI & Web Dashboard
              </button>
            </div>
            <div className="status-tag">
              <span className="status-indicator" />
              Example
            </div>
          </div>

          <div className="showcase-body">
            {activeTab === 'mcp' && (
              <div className="showcase-view">
                <div className="code-pane">
                  <div className="code-label">claude_desktop_config.json</div>
                  <pre><code>{`{
  "mcpServers": {
    "substack": {
      "command": "npx",
      "args": ["tsx", "src/mcp-server.ts"],
      "env": {
        "SUBSTACK_SID": "your-connect-sid",
        "SUBSTACK_PUB_URL": "yourpub.substack.com"
      }
    }
  }
}`}</code></pre>
                </div>
                <div className="output-pane">
                  <div className="pane-header">Available Agent Tools</div>
                  <div className="tools-mini-list">
                    <div className="mini-tool-item">
                      <span className="tool-tag">tool</span>
                      <span className="tool-title">publish_newsletter</span>
                      <span className="tool-desc">Draft or publish live to subscribers</span>
                    </div>
                    <div className="mini-tool-item">
                      <span className="tool-tag">tool</span>
                      <span className="tool-title">publish_note</span>
                      <span className="tool-desc">Post short notes with link cards</span>
                    </div>
                    <div className="mini-tool-item">
                      <span className="tool-tag">tool</span>
                      <span className="tool-title">automate_comments</span>
                      <span className="tool-desc">AI scans posts & replies with context</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="showcase-view">
                <div className="code-pane">
                  <div className="code-label">POST /api/tools/publish-newsletter</div>
                  <pre><code>{`curl -X POST https://your-agent.vercel.app/api/tools/publish-newsletter \\
  -H "Authorization: Bearer $API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "AI Agent Dispatch #4",
    "body": "## Built with Substack Agent\\nProgrammatic publishing works cleanly.",
    "isDraft": false
  }'`}</code></pre>
                </div>
                <div className="output-pane">
                  <div className="pane-header">API Response (200 OK)</div>
                  <pre className="json-response"><code>{`{
  "success": true,
  "data": {
    "id": 14920812,
    "title": "AI Agent Dispatch #4",
    "isDraft": false,
    "url": "https://yourpub.substack.com/p/ai-agent-dispatch-4"
  }
}`}</code></pre>
                </div>
              </div>
            )}

            {activeTab === 'cli' && (
              <div className="showcase-view">
                <div className="code-pane">
                  <div className="code-label">Quick Start Command</div>
                  <pre><code>{`$ git clone https://github.com/santhosh-patel/substack-agent.git
$ cd substack-agent && npm install
$ cp .env.example .env
$ npm run dev

> Server running on http://localhost:3456`}</code></pre>
                </div>
                <div className="output-pane">
                  <div className="pane-header">System Metrics</div>
                  <div className="metrics-grid">
                    <div className="metric-box">
                      <span className="metric-val">9</span>
                      <span className="metric-lbl">Native MCP Tools</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">4</span>
                      <span className="metric-lbl">LLM Providers</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">MIT</span>
                      <span className="metric-lbl">Open Source</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
