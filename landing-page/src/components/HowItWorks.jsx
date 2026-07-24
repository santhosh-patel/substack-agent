import MacWindow from './MacWindow';
import './HowItWorks.css';

const steps = [
  {
    step: '01',
    title: 'Repository Setup',
    desc: 'Clone the open-source repository and install the Node.js dependencies.',
    code: 'git clone https://github.com/santhosh-patel/substack-agent.git\ncd substack-agent && npm install',
  },
  {
    step: '02',
    title: 'Configure Environment',
    desc: 'Extract your Substack connect.sid session cookie from browser DevTools and save it to .env or paste it in the playground settings.',
    code: 'SUBSTACK_SID=your-connect-sid-cookie\nSUBSTACK_PUB_URL=yourpub.substack.com',
  },
  {
    step: '03',
    title: 'Launch & Connect',
    desc: 'Start the MCP server locally, or deploy the Tools API to any Node host and use your domain for HTTP tool clients.',
    code: 'npm run mcp        # For Claude / Cursor\nnpm run dev        # For Dashboard / Tools API',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Setup Guide</span>
          <h2 className="section-title">
            Getting started in <span className="brand-gradient">three simple steps</span>
          </h2>
          <p className="section-subtitle">
            Clone, configure your session cookie, and connect in a few minutes.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((item, i) => (
            <div className="step-card animate-in" key={item.step} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="step-badge">{item.step}</div>
              <h3 className="step-heading">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
              <MacWindow compact>
                <pre><code>{item.code}</code></pre>
              </MacWindow>
            </div>
          ))}
        </div>

        <div className="how-it-works-cta">
          <a href="/playground" className="btn btn-accent btn-lg">Open Playground</a>
          <a
            href="https://github.com/santhosh-patel/substack-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
