import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: 'Is Substack Agent free & open source?',
    a: 'Yes. It is published under the MIT license. You can deploy it locally, host it on Vercel, or include it in proprietary agent pipelines without restrictions.',
  },
  {
    q: 'How does it communicate with Substack without an official API?',
    a: 'Substack Agent uses session-based authentication via your connect.sid cookie. It handles session maintenance, header spoofing, and ProseMirror JSON translation transparently.',
  },
  {
    q: 'How do I use Substack Agent with Claude Desktop or Cursor?',
    a: 'Add the substack entry to your mcpServers config in claude_desktop_config.json or Cursor settings pointing to src/mcp-server.ts. Claude will automatically detect all 9 available tools.',
  },
  {
    q: 'Which AI models can I use for automated comment generation?',
    a: 'You can configure Groq (e.g. Llama 3.3 70B), Google Gemini (e.g. Gemini 2.5 Flash), OpenAI, or OpenRouter models by supplying your API key in the playground settings or environment variables.',
  },
  {
    q: 'Is it safe to store my SUBSTACK_SID session cookie?',
    a: 'Your connect.sid cookie is equivalent to your Substack password. In the playground, it is saved in browser localStorage and sent to your Substack Agent server when you connect. In MCP/API mode, store it in .env or Vercel env vars only. Never share it publicly — rotate immediately if exposed.',
  },
  {
    q: 'Can I integrate Substack Agent into n8n or Zapier workflows?',
    a: 'Yes. Deploy the REST API endpoints to Vercel and use standard HTTP Request nodes with Bearer authorization.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Questions</span>
          <h2 className="section-title">
            Frequently Asked <span className="brand-gradient">Questions</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                className={`faq-item animate-in ${isOpen ? 'is-open' : ''}`}
                key={i}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="faq-q">{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className="faq-answer"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-a">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="faq-help">
          Still stuck?{' '}
          <a href="https://github.com/santhosh-patel/substack-agent/issues" target="_blank" rel="noopener noreferrer">
            Open a GitHub issue
          </a>{' '}
          or read the{' '}
          <a href="https://github.com/santhosh-patel/substack-agent#readme" target="_blank" rel="noopener noreferrer">
            setup guide
          </a>.
        </p>
      </div>
    </section>
  );
}
