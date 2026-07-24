import './Comparison.css';

const rows = [
  { feature: 'Official Substack API', manual: 'Limited / none for publishing', agent: 'Session-based bridge', zapier: 'No native connector' },
  { feature: 'AI agent tools (MCP)', manual: 'No', agent: '9 native tools', zapier: 'Via HTTP only' },
  { feature: 'Local dashboard + AI compose', manual: 'Manual editor only', agent: 'Full playground UI', zapier: 'No' },
  { feature: 'Comment automation', manual: 'Manual', agent: 'Keyword + AI replies', zapier: 'Custom build' },
  { feature: 'Scheduling', manual: 'Substack native', agent: 'Local + cron queue', zapier: 'External scheduler' },
  { feature: 'Open source', manual: 'N/A', agent: 'MIT license', zapier: 'N/A' },
];

export default function Comparison() {
  return (
    <section className="comparison" id="comparison">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Compare</span>
          <h2 className="section-title">
            Why <span className="brand-gradient">Substack Agent</span>?
          </h2>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Manual Substack</th>
                <th>Substack Agent</th>
                <th>Generic automation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.manual}</td>
                  <td><strong>{row.agent}</strong></td>
                  <td>{row.zapier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
