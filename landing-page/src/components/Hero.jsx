import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      {/* Floating chat bubbles & avatars */}
      <div className="floating-element float-1" aria-hidden="true">
        <div className="avatar-circle avatar-orange">S</div>
      </div>
      <div className="floating-element float-2" aria-hidden="true">
        <div className="chat-bubble">
          <span className="chat-dot green" />
          Newsletter published! 🚀
        </div>
      </div>
      <div className="floating-element float-3" aria-hidden="true">
        <div className="avatar-circle avatar-purple">A</div>
      </div>
      <div className="floating-element float-4" aria-hidden="true">
        <div className="chat-bubble">
          <span className="chat-dot blue" />
          3 comments posted ✨
        </div>
      </div>
      <div className="floating-element float-5" aria-hidden="true">
        <div className="avatar-circle avatar-teal">C</div>
      </div>
      <div className="floating-element float-6" aria-hidden="true">
        <div className="chat-bubble">Looks great 👍</div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Open Source · MIT Licensed
        </div>

        <h1 className="hero-title">
          Automate Substack<br />
          <span className="gradient-text">with your AI tools</span>
        </h1>

        <p className="hero-subtitle">
          Substack Agent connects your publication to Claude, Cursor, ChatGPT, and n8n.
          Publish newsletters, post notes, and engage with readers — all programmatically
          from the tools you already use.
        </p>

        <div className="hero-cta">
          <a href="#get-started" className="btn btn-primary btn-lg" id="cta-hero-start">
            Start automating
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="https://github.com/santhosh-patel/substack-agent" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" id="cta-hero-github">
            View on GitHub
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">9</span>
            <span className="stat-label">MCP Tools</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">AI Providers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Workflows</span>
          </div>
        </div>
      </div>

      {/* Dashboard preview */}
      <div className="container hero-preview-container">
        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-toolbar">
              <div className="toolbar-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="toolbar-url">substack-agent · dashboard</div>
              <div className="toolbar-actions">⚡</div>
            </div>
            <div className="preview-content">
              {/* Left: Activity */}
              <div className="preview-panel preview-sidebar">
                <div className="panel-header">
                  <span className="panel-title">📊 Recent Activity</span>
                </div>
                <ActivityItem avatar="N" color="orange" name="Newsletter Published" meta="AI-generated · 2min ago" badge="LIVE" badgeType="" />
                <ActivityItem avatar="C" color="purple" name="5 Comments Posted" meta="Automated · 8min ago" badge="DONE" badgeType="success" />
                <ActivityItem avatar="S" color="teal" name="Note Scheduled" meta="MCP · Tomorrow 9AM" badge="QUEUE" badgeType="pending" />
                <ActivityItem avatar="D" color="blue" name="Draft Saved" meta="Via API · 15min ago" badge="DRAFT" badgeType="draft" />
              </div>
              {/* Right: Stats */}
              <div className="preview-panel preview-stats-panel">
                <div className="panel-header">
                  <span className="panel-title">📈 Engagement</span>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Conversion Rate</div>
                  <div className="stat-card-value">
                    16.2%
                    <span className="stat-card-change positive">↑ 24%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Posts This Week</div>
                  <div className="stat-card-value">12</div>
                  <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '75%' }} /></div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Auto-Comments</div>
                  <div className="stat-card-value">48</div>
                  <div className="stat-bar"><div className="stat-bar-fill teal" style={{ width: '60%' }} /></div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Subscribers Reached</div>
                  <div className="stat-card-value">1,200+</div>
                  <div className="stat-bar"><div className="stat-bar-fill purple" style={{ width: '88%' }} /></div>
                </div>
                <div className="stats-gradient-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityItem({ avatar, color, name, meta, badge, badgeType }) {
  return (
    <div className="activity-item">
      <div className={`activity-avatar avatar-${color}`}>{avatar}</div>
      <div className="activity-info">
        <span className="activity-name">{name}</span>
        <span className="activity-meta">{meta}</span>
      </div>
      <span className={`activity-badge ${badgeType ? `badge-${badgeType}` : ''}`}>{badge}</span>
    </div>
  );
}
