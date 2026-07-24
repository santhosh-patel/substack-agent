import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MarketingApp from './MarketingApp.jsx';
import DocsLayout from './docs/DocsLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingApp />} />
        <Route path="/docs/*" element={<DocsLayout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
