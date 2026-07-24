import './UseCases.css';

const cases = [
  {
    title: 'Solo Newsletter Writer',
    desc: 'Draft with AI in the playground, preview markdown live, and publish drafts without leaving your browser.',
    tags: ['Playground', 'AI Compose', 'Draft/Publish'],
  },
  {
    title: 'AI Agent Builder',
    desc: 'Expose 9 MCP tools to Claude Desktop or Cursor so your agent can publish, comment, and schedule from chat.',
    tags: ['MCP', 'Claude', 'Cursor'],
  },
  {
    title: 'Automation Engineer',
    desc: 'Deploy the REST tools API anywhere and wire n8n, Zapier, or custom GPTs to your domain with Bearer auth.',
    tags: ['REST API', 'n8n', 'OpenAPI'],
  },
];

export default function UseCases() {
  return (
    <section className="use-cases" id="use-cases">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Use Cases</span>
          <h2 className="section-title">
            Built for <span className="brand-gradient">real workflows</span>
          </h2>
        </div>

        <div className="use-cases-grid">
          {cases.map((item, i) => (
            <div className="use-case-card animate-in" key={item.title} style={{ transitionDelay: `${i * 60}ms` }}>
              <h3 className="use-case-title">{item.title}</h3>
              <p className="use-case-desc">{item.desc}</p>
              <div className="use-case-tags">
                {item.tags.map((tag) => (
                  <span className="use-case-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
