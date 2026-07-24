import MacWindow from './MacWindow';
import './Features.css';

const features = [
  {
    id: 'publish',
    title: 'Newsletter Publishing',
    desc: 'Draft or publish live newsletters with Markdown support and email subscriber delivery via API or MCP.',
    badge: 'Core Tool',
    codeSnippet: `publish_newsletter({
  title: "Weekly AI Insights",
  body: "# Heading\\nMarkdown content here...",
  isDraft: false
})`,
  },
  {
    id: 'notes',
    title: 'Substack Notes',
    desc: 'Post short notes programmatically with optional link cards directly to your reader feed.',
    badge: 'Engagement',
    codeSnippet: `publish_note({
  body: "New update released for Substack Agent!",
  link: "https://github.com/santhosh-patel/substack-agent"
})`,
  },
  {
    id: 'comments',
    title: 'Automated Comments',
    desc: 'Scan target accounts, analyze posts by keyword, and generate contextual replies automatically.',
    badge: 'AI Automation',
    codeSnippet: `automate_comments({
  targetAccount: "@tech_insights",
  keyword: "AI agents",
  provider: "groq",
  model: "llama-3.3-70b"
})`,
  },
  {
    id: 'schedule',
    title: 'Post Scheduling Queue',
    desc: 'Queue posts for future publishing once, daily, weekly, or on custom recurring cron schedules.',
    badge: 'Scheduling',
    codeSnippet: `schedule_post({
  title: "Scheduled Release",
  scheduledAt: "2026-07-30T14:00:00Z",
  recurrence: "weekly"
})`,
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    desc: 'Exposes 9 native tools to Claude Desktop, Cursor, and MCP clients for seamless chat-based actions.',
    badge: 'Protocol',
    codeSnippet: `npx tsx src/mcp-server.ts`,
  },
  {
    id: 'ai-providers',
    title: 'Multi-LLM Integration',
    desc: 'Bring your own API key for Groq, Gemini, or OpenAI to handle content generation and smart replies.',
    badge: 'LLMs',
    codeSnippet: `GROQ_API_KEY=...
GEMINI_API_KEY=...
OPENAI_API_KEY=...`,
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Capabilities</span>
          <h2 className="section-title">
            Built for modern <span className="brand-gradient">publisher workflows</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive suite of automation tools engineered for high performance and reliability.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <div 
              className="feature-card animate-in" 
              key={feature.id}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="card-top">
                <span className="card-badge">{feature.badge}</span>
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-desc">{feature.desc}</p>
              <MacWindow compact>
                <pre><code>{feature.codeSnippet}</code></pre>
              </MacWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
