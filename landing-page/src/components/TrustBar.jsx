import './TrustBar.css';

const integrations = [
  { name: 'Claude Desktop' },
  { name: 'Cursor' },
  { name: 'ChatGPT' },
  { name: 'n8n Workflows' },
  { name: 'Vercel' },
  { name: 'Substack' },
];

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container trust-container">
        <span className="trust-title">INTEGRATES WITH</span>
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
