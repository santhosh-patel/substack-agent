import './ToolsGrid.css';

const tools = [
  { name: 'publish_newsletter', category: 'Publishing', desc: 'Draft or publish newsletters directly to subscriber inboxes' },
  { name: 'publish_note', category: 'Engagement', desc: 'Post short notes to Substack feed with optional link attachments' },
  { name: 'post_comment', category: 'Engagement', desc: 'Add comments to any Substack post by URL or numerical post ID' },
  { name: 'automate_comments', category: 'AI Automation', desc: 'Scan target profile, match posts by keyword, and reply with AI' },
  { name: 'schedule_post', category: 'Scheduling', desc: 'Queue newsletter drafts or live posts with recurring cron settings' },
  { name: 'list_newsletters', category: 'Content Query', desc: 'Fetch recent newsletter archive posts and metadata' },
  { name: 'list_notes', category: 'Content Query', desc: 'Query published notes history and subscriber like counts' },
  { name: 'list_comments', category: 'Automation Log', desc: 'Review local comment automation log (not Substack inbox)' },
  { name: 'list_schedules', category: 'Scheduling', desc: 'View current scheduled publishing queue status' },
];

export default function ToolsGrid() {
  return (
    <section className="tools-grid-section" id="tools">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">MCP Specification</span>
          <h2 className="section-title">
            9 Native <span className="brand-gradient">Agent Tools</span>
          </h2>
          <p className="section-subtitle">
            Exposed via Model Context Protocol and OpenAPI specifications.{' '}
            <a href="/openapi.json" target="_blank" rel="noopener noreferrer" className="tools-openapi-link">
              View OpenAPI spec
            </a>
          </p>
        </div>

        <div className="tools-grid-container">
          <div className="tools-header-row">
            <span>TOOL NAME</span>
            <span>CATEGORY</span>
            <span>DESCRIPTION</span>
          </div>

          <div className="tools-rows">
            {tools.map((t, i) => (
              <div className="tool-row-item animate-in" key={t.name} style={{ transitionDelay: `${i * 40}ms` }}>
                <div className="col-name">
                  <code>{t.name}</code>
                </div>
                <div className="col-cat">
                  <span className="cat-pill">{t.category}</span>
                </div>
                <div className="col-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
