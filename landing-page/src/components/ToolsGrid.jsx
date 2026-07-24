import './ToolsGrid.css';

const tools = [
  { name: 'publish_newsletter', desc: 'Draft or publish live and email subscribers' },
  { name: 'publish_note', desc: 'Short updates with optional link cards' },
  { name: 'post_comment', desc: 'Comment on any post by URL or ID' },
  { name: 'automate_comments', desc: 'AI scans, matches by keyword, and comments' },
  { name: 'schedule_post', desc: 'Queue posts with recurring schedules' },
  { name: 'list_newsletters', desc: 'Browse recent newsletters' },
  { name: 'list_notes', desc: 'Browse recent notes and engagement' },
  { name: 'list_comments', desc: 'View full comment history' },
  { name: 'list_schedules', desc: 'View the scheduled post queue' },
];

export default function ToolsGrid() {
  return (
    <section className="tools-grid-section" id="tools">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">MCP Tools</span>
          <h2 className="section-title">
            9 tools your AI<br /><span className="gradient-text">can call natively</span>
          </h2>
          <p className="section-subtitle">
            Each tool is available through MCP, HTTP API, and the web dashboard.
          </p>
        </div>

        <div className="tools-table">
          {tools.map((tool, i) => (
            <div className="tool-row animate-in" key={tool.name} style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="tool-name"><code>{tool.name}</code></div>
              <div className="tool-desc">{tool.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
