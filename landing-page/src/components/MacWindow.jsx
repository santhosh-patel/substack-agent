import { useEffect, useState } from 'react';
import './MacWindow.css';

export default function MacWindow({
  title,
  children,
  className = '',
  compact = false,
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return undefined;

    const onDocumentClick = () => setActive(false);
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [active]);

  return (
    <div
      className={`mac-window ${active ? 'is-active' : ''} ${compact ? 'mac-window-compact' : ''} ${className}`.trim()}
      onClick={(e) => {
        e.stopPropagation();
        setActive(true);
      }}
      role="presentation"
    >
      <div className="mac-window-titlebar">
        <div className="mac-window-traffic" aria-hidden="true">
          <span className="mac-dot mac-dot-close" />
          <span className="mac-dot mac-dot-minimize" />
          <span className="mac-dot mac-dot-maximize" />
        </div>
        {title ? <span className="mac-window-title">{title}</span> : null}
      </div>
      <div className="mac-window-body">{children}</div>
    </div>
  );
}
