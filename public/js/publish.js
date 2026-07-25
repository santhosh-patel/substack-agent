import PG from './pg.js';
import './state.js';
const showToast = (...args) => PG.showToast(...args);
const setButtonLoading = (...args) => PG.setButtonLoading(...args);
const getStoredApiKey = (...args) => PG.getStoredApiKey(...args);
const hasBackendApiKey = (...args) => PG.hasBackendApiKey(...args);
const getStoredSid = (...args) => PG.getStoredSid(...args);
const isConnected = PG.isConnected;
const addPostToHistory = (...args) => PG.addPostToHistory(...args);
const updateOnboardingChecklist = (...args) => PG.updateOnboardingChecklist(...args);

// ─── Generate Post with AI ───
async function handleGenerate() {
  const topic = document.getElementById('topic').value.trim();
  const provider = document.getElementById('provider').value;
  const model = document.getElementById('model').value;
  const apiKey = getStoredApiKey(provider);
  const systemPrompt = document.getElementById('systemPrompt').value.trim();
  const btn = document.getElementById('generateBtn');

  if (!topic) {
    showToast('Please enter a topic', 'error');
    return;
  }
  
  const hasBackendKey = hasBackendApiKey(provider);
  if (!apiKey && !hasBackendKey) {
    showToast(`Please enter your ${provider.toUpperCase()} API key`, 'error');
    return;
  }

  setButtonLoading(btn, true, 'Generating…');

  // Inject skeleton loaders into the simulated preview body
  const previewEl = document.getElementById('preview');
  if (previewEl) {
    previewEl.innerHTML = `
      <div class="skeleton skeleton-title" style="height: 24px; width: 75%; margin-bottom: 12px;"></div>
      <div class="skeleton skeleton-subtitle" style="height: 16px; width: 45%; margin-bottom: 24px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 100%; margin-bottom: 8px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 100%; margin-bottom: 8px;"></div>
      <div class="skeleton skeleton-text" style="height: 12px; width: 80%; margin-bottom: 8px;"></div>
    `;
  }
  const previewTitle = document.getElementById('previewTitle');
  const previewSubtitle = document.getElementById('previewSubtitle');
  if (previewTitle) {
    previewTitle.innerHTML = `<span class="skeleton" style="display: block; height: 30px; width: 80%;"></span>`;
  }
  if (previewSubtitle) {
    previewSubtitle.innerHTML = `<span class="skeleton" style="display: block; height: 18px; width: 50%;"></span>`;
    previewSubtitle.style.display = 'block';
  }

  try {
    const useWebSearch = document.getElementById('composeUseWebSearch')?.checked ?? true;
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, provider, model, apiKey, systemPrompt, useWebSearch }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Generation failed');
    }

    // Fill in the form
    document.getElementById('postTitle').value = data.post.title;
    document.getElementById('postSubtitle').value = data.post.subtitle;
    document.getElementById('editor').value = data.post.body;
    updatePreview();

    addToInputHistory('topic', topic);

    showToast('Title, subtitle, and post generated from web research!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setButtonLoading(btn, false, '<i data-lucide="sparkles"></i> Generate');
  }
}

// ─── Publish to Substack ───
async function handlePublish() {
  const title = document.getElementById('postTitle').value.trim();
  const subtitle = document.getElementById('postSubtitle').value.trim();
  const body = document.getElementById('editor').value.trim();
  const isDraft = document.getElementById('draftToggle').checked;
  const btn = document.getElementById('publishBtn');

  if (!title) {
    showToast('Please enter a title', 'error');
    return;
  }
  if (!body) {
    showToast('Please write some content', 'error');
    return;
  }

  btn.setAttribute('data-loading', 'true');
  const action = isDraft ? 'Saving draft…' : 'Publishing…';
  setButtonLoading(btn, true, action);

  try {
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subtitle, body, isDraft }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Publishing failed');
    }

    const msg = isDraft
      ? `Draft saved: "${data.post.title}"`
      : `Published: "${data.post.title}"`;

    showToast(msg, 'success');

    if (data.post.url) {
      showToast(`URL: ${data.post.url}`, 'info');
      addPostToHistory(data.post.title || title, data.post.url);
    }
    setTimeout(loadHistory, 1500);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.removeAttribute('data-loading');
    btn.disabled = false;
    updatePublishButtonLabel();
  }
}

// ─── Live Markdown Preview ───
function updatePreview() {
  const md = document.getElementById('editor').value;
  const previewEl = document.getElementById('preview');

  if (!md.trim()) {
    previewEl.innerHTML = '<div class="preview-placeholder">Preview will appear here…</div>';
  } else {
    try {
      previewEl.innerHTML = marked.parse(md);
    } catch {
      previewEl.textContent = md;
    }
  }
  updatePreviewMetadata();
}

function updatePreviewMetadata() {
  const title = document.getElementById('postTitle').value.trim();
  const subtitle = document.getElementById('postSubtitle').value.trim();
  
  const previewTitle = document.getElementById('previewTitle');
  const previewSubtitle = document.getElementById('previewSubtitle');

  if (previewTitle) {
    previewTitle.textContent = title || 'Post Title';
  }
  if (previewSubtitle) {
    if (subtitle) {
      previewSubtitle.textContent = subtitle;
      previewSubtitle.style.display = 'block';
    } else {
      previewSubtitle.style.display = 'none';
    }
  }
}


PG.handleGenerate = handleGenerate;
PG.handlePublish = handlePublish;
PG.updatePreview = updatePreview;
PG.updatePreviewMetadata = updatePreviewMetadata;
export {};
