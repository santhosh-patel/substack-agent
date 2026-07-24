import { useState } from 'react';
import './Hero.css';

export default function Hero({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('mcp');

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-subtle" />

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>Substack Automation 2.0</span>
          <span className="badge-sep">•</span>
          <span className="badge-link">Open Source</span>
        </div>

        <h1 className="hero-title">
          Automate your Substack publication<br />
          <span className="gradient-text">with native AI agent workflows</span>
        </h1>

        <p className="hero-subtitle">
          Connect Substack to Claude, Cursor, ChatGPT, and n8n. Draft newsletters, 
          publish posts, and engage with readers programmatically.
        </p>

        <div className="hero-cta">
          <a href="/playground" className="btn btn-accent btn-lg" id="cta-hero-playground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Try in Playground
          </a>

          <button onClick={onOpenPlayground} className="btn btn-outline btn-lg" id="cta-hero-demo">
            Quick Interactive Demo
          </button>

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

      {/* Clean Structured Showcase Card */}
      <div className="container hero-showcase-container">
        <div className="showcase-card">
          <div className="showcase-header">
            <div className="window-dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <div className="showcase-tabs">
              <button 
                className={`tab-btn ${activeTab === 'mcp' ? 'active' : ''}`}
                onClick={() => setActiveTab('mcp')}
              >
                Claude MCP Server
              </button>
              <button 
                className={`tab-btn ${activeTab === 'api' ? 'active' : ''}`}
                onClick={() => setActiveTab('api')}
              >
                REST API Tool
              </button>
              <button 
                className={`tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
                onClick={() => setActiveTab('cli')}
              >
                CLI & Web Dashboard
              </button>
            </div>
            <div className="status-tag">
              <span className="status-indicator" />
              Connected
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
                      <span className="metric-val">3</span>
                      <span className="metric-lbl">LLM Providers</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">&lt;50ms</span>
                      <span className="metric-lbl">Avg API Overhead</span>
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
