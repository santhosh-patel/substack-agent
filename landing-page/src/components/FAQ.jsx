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
    a: 'You can configure Groq (e.g. Llama 3.3 70B), Google Gemini (e.g. Gemini 1.5 Pro/Flash), or OpenAI models by supplying your API key in the environment variables.',
  },
  {
    q: 'Is it safe to store my SUBSTACK_SID session cookie?',
    a: 'Your session cookie is stored strictly in your local .env file or Vercel environment variables. It is never logged, tracked, or transmitted outside of official Substack API endpoints.',
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
      </div>
    </section>
  );
}
