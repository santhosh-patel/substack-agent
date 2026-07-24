import { useState } from 'react';
import './PlaygroundModal.css';

export default function PlaygroundModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('draft');
  const [title, setTitle] = useState('Substack Agent Test Post');
  const [content, setContent] = useState('Drafting newsletter with AI agent automation...');
  const [logs, setLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePublish = () => {
    setIsSimulating(true);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Connecting to Substack API...`]);

    setTimeout(() => {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Authenticated session (connect.sid)`]);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Converted Markdown to ProseMirror JSON`]);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Draft created! ID: #14920812`]);
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <div className="playground-modal-overlay" onClick={onClose}>
      <div className="playground-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-status-dot" />
            <h3>Substack Automation Playground</h3>
            <span className="modal-badge">Interactive Demo</span>
          </div>
          <div className="modal-header-actions">
            <a 
              href="http://localhost:3456" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-sm external-link-btn"
            >
              Open Full App (http://localhost:3456)
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <button className="close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="playground-sidebar">
            <button 
              className={`sidebar-item ${activeTab === 'draft' ? 'active' : ''}`}
              onClick={() => setActiveTab('draft')}
            >
              ✍️ Newsletter Publisher
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              💬 Post Substack Note
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'comment' ? 'active' : ''}`}
              onClick={() => setActiveTab('comment')}
            >
              🤖 AI Comment Automator
            </button>
          </div>

          <div className="playground-main">
            {activeTab === 'draft' && (
              <div className="playground-form">
                <div className="form-group">
                  <label>Post Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter newsletter title"
                  />
                </div>

                <div className="form-group">
                  <label>Body Content (Markdown)</label>
                  <textarea 
                    rows={6} 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write content in markdown..."
                  />
                </div>

                <div className="form-actions">
                  <button 
                    className="btn btn-accent" 
                    onClick={handleSimulatePublish}
                    disabled={isSimulating}
                  >
                    {isSimulating ? 'Publishing...' : 'Simulate API Publishing'}
                  </button>
                  <a 
                    href="http://localhost:3456" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                  >
                    Launch Live Server App
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="playground-form">
                <div className="form-group">
                  <label>Note Text</label>
                  <textarea 
                    rows={4} 
                    defaultValue="Checking out Substack Agent automation tools! 🚀" 
                  />
                </div>
                <div className="form-group">
                  <label>Attachment URL (Optional)</label>
                  <input type="text" defaultValue="https://github.com/santhosh-patel/substack-agent" />
                </div>
                <div className="form-actions">
                  <button className="btn btn-accent" onClick={handleSimulatePublish} disabled={isSimulating}>
                    {isSimulating ? 'Publishing...' : 'Post Note'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'comment' && (
              <div className="playground-form">
                <div className="form-group">
                  <label>Target Account / Publication</label>
                  <input type="text" defaultValue="@tech_digest" />
                </div>
                <div className="form-group">
                  <label>Keyword Filter</label>
                  <input type="text" defaultValue="AI agents" />
                </div>
                <div className="form-actions">
                  <button className="btn btn-accent" onClick={handleSimulatePublish} disabled={isSimulating}>
                    {isSimulating ? 'Scanning...' : 'Run Auto-Comment Pipeline'}
                  </button>
                </div>
              </div>
            )}

            {logs.length > 0 && (
              <div className="playground-logs">
                <div className="logs-header">Execution Console</div>
                {logs.map((log, index) => (
                  <div key={index} className="log-line">{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
