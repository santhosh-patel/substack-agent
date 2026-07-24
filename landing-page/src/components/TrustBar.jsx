import { useState, useEffect } from 'react';
import './TrustBar.css';

const integrations = [
  { name: 'Claude Desktop' },
  { name: 'Cursor' },
  { name: 'ChatGPT' },
  { name: 'n8n Workflows' },
  { name: 'Vercel' },
  { name: 'Substack' },
];

const GITHUB_REPO = 'santhosh-patel/substack-agent';
const FALLBACK_STARS = null;

export default function TrustBar() {
  const [stars, setStars] = useState(FALLBACK_STARS);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stargazers_count != null) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="trust-bar">
      <div className="container trust-container">
        <div className="trust-meta">
          <span className="trust-title">INTEGRATES WITH</span>
          {stars != null && (
            <a
              href={`https://github.com/${GITHUB_REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="trust-stars"
            >
              ★ {stars.toLocaleString()} on GitHub
            </a>
          )}
          <span className="trust-license">MIT License</span>
        </div>
        <div className="trust-pills">
          {integrations.map((item) => (
            <div className="trust-pill" key={item.name}>
              <span className="pill-dot" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
