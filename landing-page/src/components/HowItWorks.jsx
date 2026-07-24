import './HowItWorks.css';

const steps = [
  {
    num: 1,
    title: 'Clone & Install',
    desc: "Clone the repo and install dependencies. That's literally it for setup.",
    code: 'git clone https://github.com/santhosh-patel/substack-agent.git && cd substack-agent && npm install',
  },
  {
    num: 2,
    title: 'Add Your Session Cookie',
    desc: (
      <>
        Log into Substack, grab your <code>connect.sid</code> from browser DevTools, and paste it in <code>.env</code>.
      </>
    ),
  },
  {
    num: 3,
    title: 'Pick Your Integration',
    desc: 'Run the MCP server for Claude/Cursor, deploy the API to Vercel, or launch the web dashboard.',
  },
  {
    num: 4,
    title: 'Automate Everything',
    desc: 'Your AI tools can now publish newsletters, post notes, schedule content, and engage with readers — automatically.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">How It Works</span>
          <h2 className="section-title">
            Up and running<br /><span className="gradient-text">in under 5 minutes</span>
          </h2>
        </div>

        <div className="steps">
          {steps.map((step, i) => (
            <div key={step.num}>
              <div className="step animate-in" id={`step-${step.num}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  {step.code && (
                    <div className="step-code">
                      <code>{step.code}</code>
                    </div>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
