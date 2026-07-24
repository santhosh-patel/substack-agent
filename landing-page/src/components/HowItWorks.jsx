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
    desc: 'Extract your Substack connect.sid session cookie and save it to .env.',
    code: 'SUBSTACK_SID=your-connect-sid-cookie\nSUBSTACK_PUB_URL=yourpub.substack.com',
  },
  {
    step: '03',
    title: 'Launch & Connect',
    desc: 'Start the MCP server or deploy to Vercel for HTTP API tool access.',
    code: 'npm run mcp        # For Claude / Cursor\nnpm run dev        # For Dashboard',
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
            Zero complicated configuration. Works right out of the box.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((item, i) => (
            <div className="step-card animate-in" key={item.step} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="step-badge">{item.step}</div>
              <h3 className="step-heading">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
              <div className="step-code-box">
                <pre><code>{item.code}</code></pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
