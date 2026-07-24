import { Suspense, lazy } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MarketingApp from './MarketingApp.jsx';
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx';

const DocsLayout = lazy(() => import('./docs/DocsLayout.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingApp />} />
        <Route
          path="/docs/*"
          element={
            <RouteErrorBoundary fallbackHref="/docs">
              <Suspense fallback={<div className="docs-loading">Loading docs…</div>}>
                <DocsLayout />
              </Suspense>
            </RouteErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
