import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { docsNav, docsHref, findPageByPath, getAdjacentPages, flatPages, GITHUB_EDIT_BASE } from './nav';
import { getDocContent, getDocSearchIndex } from './content';
import MacWindow from '../components/MacWindow';
import './DocsLayout.css';

export default function DocsLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [rehypePlugins, setRehypePlugins] = useState([]);

  useEffect(() => {
    Promise.all([
      import('rehype-highlight'),
      import('highlight.js/styles/atom-one-dark.css'),
    ]).then(([rehypeHighlight]) => {
      setRehypePlugins([rehypeHighlight.default]);
    });
  }, []);

  const docSearchIndex = useMemo(() => {
    const bodies = Object.fromEntries(getDocSearchIndex().map((d) => [d.file, d.body]));
    return flatPages.map((page) => ({
      ...page,
      body: bodies[page.file] || '',
    }));
  }, []);

  const currentPage = findPageByPath(location.pathname);
  const { prev, next } = getAdjacentPages(location.pathname);

  const filteredNav = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return docsNav;

    const matchingFiles = new Set(
      docSearchIndex
        .filter(
          (entry) =>
            entry.title.toLowerCase().includes(q) ||
            entry.section.toLowerCase().includes(q) ||
            entry.body.toLowerCase().includes(q)
        )
        .map((entry) => entry.file)
    );

    return docsNav
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            section.title.toLowerCase().includes(q) ||
            matchingFiles.has(item.file)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [search, docSearchIndex]);

  return (
    <>
      <a href="#docs-content" className="skip-link">Skip to content</a>
      <Navbar />
      <div className="docs-shell">
        <button
          type="button"
          className="docs-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? 'Close menu' : 'Docs menu'}
        </button>

        {sidebarOpen && (
          <div className="docs-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`docs-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
          <div className="docs-sidebar-header">
            <Link to="/docs" className="docs-home-link" onClick={() => setSidebarOpen(false)}>
              Documentation
            </Link>
            <input
              type="search"
              className="docs-search"
              placeholder="Search docs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search documentation"
            />
          </div>

          <nav className="docs-nav" aria-label="Documentation">
            {filteredNav.map((section) => (
              <div className="docs-nav-section" key={section.title}>
                <div className="docs-nav-section-title">{section.title}</div>
                <ul>
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={docsHref(item.path)}
                        className={currentPage.path === item.path ? 'is-active' : ''}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="docs-main" id="docs-content">
          <DocsPageContent page={currentPage} rehypePlugins={rehypePlugins} />
          <div className="docs-pager">
            {prev ? (
              <Link to={docsHref(prev.path)} className="docs-pager-link docs-pager-prev">
                <span className="docs-pager-label">Previous</span>
                <span className="docs-pager-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={docsHref(next.path)} className="docs-pager-link docs-pager-next">
                <span className="docs-pager-label">Next</span>
                <span className="docs-pager-title">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

function slugifyHeading(text) {
  const plain = typeof text === 'string'
    ? text
    : Array.isArray(text)
      ? text.map((c) => (typeof c === 'string' ? c : '')).join('')
      : String(text ?? '');
  return plain
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(markdown) {
  if (!markdown) return [];
  return [...markdown.matchAll(/^## (.+)$/gm)].map((match) => ({
    id: slugifyHeading(match[1]),
    text: match[1],
  }));
}

function DocsPageContent({ page, rehypePlugins }) {
  const content = getDocContent(page.file);
  const editUrl = `${GITHUB_EDIT_BASE}/${page.file}`;
  const headings = useMemo(() => extractHeadings(content), [content]);

  if (!content) {
    return (
      <div className="docs-article">
        <h1>Page not found</h1>
        <p>The documentation file <code>{page.file}</code> could not be loaded.</p>
        <Link to="/docs">Back to docs home</Link>
      </div>
    );
  }

  return (
    <article className="docs-article">
      <div className="docs-meta">
        <nav className="docs-breadcrumb" aria-label="Breadcrumb">
          <Link to="/docs">Docs</Link>
          {page.section && page.section !== 'Introduction' && (
            <>
              <span aria-hidden="true"> / </span>
              <span>{page.section}</span>
            </>
          )}
          <span aria-hidden="true"> / </span>
          <span>{page.title}</span>
        </nav>
        {page.modes?.length > 0 && (
          <div className="docs-mode-badges">
            {page.modes.map((mode) => (
              <span className="docs-mode-badge" key={mode}>{mode}</span>
            ))}
          </div>
        )}
        <a href={editUrl} className="docs-edit-link" target="_blank" rel="noopener noreferrer">
          Edit on GitHub
        </a>
      </div>

      {page.description && (
        <p className="docs-lead">{page.description}</p>
      )}

      <div className={`docs-article-layout${headings.length >= 3 ? ' has-toc' : ''}`}>
        <div className="docs-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={rehypePlugins}
            components={{
              h2({ children, ...props }) {
                const id = slugifyHeading(children);
                return (
                  <h2 id={id} {...props}>
                    {children}
                  </h2>
                );
              },
              h3({ children, ...props }) {
                const id = slugifyHeading(children);
                return (
                  <h3 id={id} {...props}>
                    {children}
                  </h3>
                );
              },
              pre({ children, ...props }) {
                return (
                  <MacWindow className="mac-window-docs">
                    <pre {...props}>{children}</pre>
                  </MacWindow>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {headings.length >= 3 && (
          <nav className="docs-toc" aria-label="On this page">
            <div className="docs-toc-title">On this page</div>
            <ul>
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
