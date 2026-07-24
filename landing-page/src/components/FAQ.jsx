import './FAQ.css';

const faqs = [
  {
    q: 'Is Substack Agent free?',
    a: "Yes, completely. It's open source under the MIT license. You can use, modify, and deploy it however you want — no strings attached.",
  },
  {
    q: 'Does Substack have an official API?',
    a: "Not a public one for publishing, commenting, or notes. Substack Agent bridges that gap by using session-based authentication to interact with Substack's internal APIs reliably.",
  },
  {
    q: 'Is my session cookie safe?',
    a: 'Your connect.sid cookie stays in your .env file and is never sent anywhere except Substack. If you deploy to Vercel, it lives in your environment variables. Treat it like a password and never commit it to git.',
  },
  {
    q: 'What AI providers are supported?',
    a: 'Groq, Google Gemini, and OpenAI. You can use any model from these providers for content generation and comment automation. Just provide your API key in the environment variables.',
  },
  {
    q: 'Can I deploy this to production?',
    a: 'Absolutely. The HTTP API is designed for Vercel deployment out of the box. Run vercel to deploy, set your env vars, and you have a production API for Substack automation.',
  },
  {
    q: "What's the difference between MCP and HTTP API?",
    a: "MCP (Model Context Protocol) gives AI assistants like Claude native tool access — they can call Substack functions directly from chat. The HTTP API is for any service that can make web requests: GPTs, n8n workflows, Zapier, or your own backend code.",
  },
];

export default function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">
            Frequently asked<br /><span className="gradient-text">questions</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <details className="faq-item animate-in" key={i} id={`faq-${i + 1}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <summary>{faq.q}</summary>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
