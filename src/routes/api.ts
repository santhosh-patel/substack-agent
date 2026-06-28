import { Router, Request, Response } from 'express';
import { Marked } from 'marked';
import { generatePost, SYSTEM_PROMPT, analyzeAndGenerateComment, generateNote, NOTE_SYSTEM_PROMPT, DEFAULT_AI_MODELS, testAIKey, deriveResearchSearchQuery, generateNewsletterWithWebResearch, generateNoteWithWebResearch } from '../ai/generate.js';
import fs from 'fs';
import path from 'path';
import {
  substackClient,
  ownProfile,
  currentSid,
  decodeSid,
  ensureHttpClientPatched,
  getGotScraping,
  connectSubstack,
  disconnectSubstack,
  getPubHostname,
  ensureConnected,
} from '../lib/substack-client.js';
import {
  getSchedules,
  saveSchedules,
  addSchedule,
  deleteSchedule,
  toggleSchedule,
  retrySchedule,
  recoverStuckSchedules,
  applyScheduleFailure,
  calculateNextRun,
  validateScheduledPost,
  MAX_SCHEDULE_RETRIES,
  runScheduleNow,
  getScheduleQueueStats,
  sanitizeSchedulesForClient,
  sanitizeScheduleForClient,
  type ScheduledPost,
} from '../lib/storage.js';
import { getPublicationHistory, savePublicationToHistory } from '../lib/publication-history.js';

const router = Router();
const marked = new Marked();

// NOTE: httpClient patching, state management, and auto-connect logic
// are now centralized in ../lib/substack-client.ts and shared with
// the tool routes (/api/tools/*).

// ─── GET /api/config ───
// Returns only non-secret flags and defaults — never expose SID or API keys to the browser.
router.get('/config', (_req: Request, res: Response) => {
  res.json({
    hasSubstackSid: Boolean(process.env.SUBSTACK_SID),
    publicationUrl: process.env.SUBSTACK_PUB_URL || process.env.PUBLICATION_URL || '',
    hasGroqApiKey: Boolean(process.env.GROQ_API_KEY),
    hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
    hasOpenAiApiKey: Boolean(process.env.OPENAI_API_KEY),
    hasOpenrouterApiKey: Boolean(process.env.OPENROUTER_API_KEY),
    defaultSystemPrompt: SYSTEM_PROMPT,
    defaultNoteSystemPrompt: NOTE_SYSTEM_PROMPT,
  });
});

// ─── POST /api/connect ───
router.post('/connect', async (req: Request, res: Response) => {
  try {
    const { sid, publicationUrl } = req.body;
    const result = await connectSubstack(sid, publicationUrl);

    if (!result.success) {
      const status = result.error?.includes('Authentication') ? 401 : 400;
      res.status(status).json({ error: result.error });
      return;
    }

    res.json({
      success: true,
      profile: result.profile,
    });
  } catch (err: any) {
    console.error('Connect error:', err);
    res.status(500).json({ error: err.message || 'Failed to connect' });
  }
});

// ─── GET /api/profile ───
router.get('/profile', async (_req: Request, res: Response) => {
  if (!ownProfile) {
    res.status(401).json({ error: 'Not connected. Call /api/connect first.' });
    return;
  }

  res.json({
    name: ownProfile.name,
    slug: ownProfile.slug,
    followerCount: ownProfile.followerCount,
  });
});

// ─── POST /api/disconnect ───
router.post('/disconnect', (_req: Request, res: Response) => {
  disconnectSubstack();
  res.json({ success: true });
});


// ─── POST /api/generate ───
router.post('/generate', async (req: Request, res: Response) => {
  try {
    let { topic, provider, model, apiKey, systemPrompt, useWebSearch } = req.body;

    if (!topic) {
      res.status(400).json({ error: 'Topic or writing guidelines are required' });
      return;
    }
    if (!provider || !model) {
      res.status(400).json({ error: 'Provider and model are required' });
      return;
    }
    if (!apiKey) {
      if (provider === 'groq') apiKey = process.env.GROQ_API_KEY;
      else if (provider === 'gemini') apiKey = process.env.GEMINI_API_KEY;
      else if (provider === 'openai') apiKey = process.env.OPENAI_API_KEY;
      else if (provider === 'openrouter') apiKey = process.env.OPENROUTER_API_KEY;
    }

    if (!apiKey) {
      res.status(400).json({ error: 'API key is required' });
      return;
    }

    const baseReq = { topic, provider, model, apiKey, systemPrompt };
    if (useWebSearch) {
      const { post, searchQuery, searchResults } = await generateNewsletterWithWebResearch(baseReq);
      res.json({
        success: true,
        post,
        research: {
          searchQuery,
          searchResultsPreview: searchResults.substring(0, 500),
        },
      });
      return;
    }

    const post = await generatePost(baseReq);
    res.json({ success: true, post });
  } catch (err: any) {
    console.error('Generate error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate post' });
  }
});

function parseInlineText(text: string): any[] {
  const tokens: any[] = [];
  const pattern = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    const matchIndex = match.index;
    
    if (matchIndex > lastIndex) {
      tokens.push({
        type: 'text',
        text: text.substring(lastIndex, matchIndex)
      });
    }

    if (match[1]) { // Bold
      tokens.push({
        type: 'text',
        text: match[2],
        marks: [{ type: 'strong' }]
      });
    } else if (match[3]) { // Italic
      tokens.push({
        type: 'text',
        text: match[4],
        marks: [{ type: 'em' }]
      });
    } else if (match[5]) { // Code
      tokens.push({
        type: 'text',
        text: match[5],
        marks: [{ type: 'code' }]
      });
    } else if (match[6]) { // Link
      tokens.push({
        type: 'text',
        text: match[6],
        marks: [{
          type: 'link',
          attrs: {
            href: match[7]
          }
        }]
      });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      text: text.substring(lastIndex)
    });
  }

  if (tokens.length === 0) {
    tokens.push({
      type: 'text',
      text: text || ' '
    });
  }

  return tokens;
}

function markdownToProseMirror(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const content: any[] = [];
  let currentList: any = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentList) {
        content.push(currentList);
        currentList = null;
      }
      continue;
    }

    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const isOrdered = /^\d+\.\s/.test(trimmed);

    if (isBullet) {
      if (!currentList || currentList.type !== 'bullet_list') {
        if (currentList) content.push(currentList);
        currentList = { type: 'bullet_list', content: [] };
      }
      const text = trimmed.substring(2).trim();
      currentList.content.push({
        type: 'list_item',
        content: [{ type: 'paragraph', content: parseInlineText(text) }]
      });
      continue;
    }

    if (isOrdered) {
      if (!currentList || currentList.type !== 'ordered_list') {
        if (currentList) content.push(currentList);
        currentList = { type: 'ordered_list', content: [] };
      }
      const text = trimmed.replace(/^\d+\.\s+/, '').trim();
      currentList.content.push({
        type: 'list_item',
        content: [{ type: 'paragraph', content: parseInlineText(text) }]
      });
      continue;
    }

    if (currentList) {
      content.push(currentList);
      currentList = null;
    }

    if (trimmed.startsWith('#')) {
      const headingLevel = trimmed.match(/^#+/)?.[0].length || 1;
      const text = trimmed.replace(/^#+\s+/, '').trim();
      content.push({
        type: 'heading',
        attrs: { level: Math.min(headingLevel, 6) },
        content: parseInlineText(text)
      });
      continue;
    }

    if (trimmed.startsWith('>')) {
      const text = trimmed.substring(1).trim();
      content.push({
        type: 'blockquote',
        content: [{ type: 'paragraph', content: parseInlineText(text) }]
      });
      continue;
    }

    content.push({
      type: 'paragraph',
      content: parseInlineText(trimmed)
    });
  }

  if (currentList) {
    content.push(currentList);
  }

  return JSON.stringify({
    type: 'doc',
    content: content
  });
}

// ─── POST /api/publish ───
router.post('/publish', async (req: Request, res: Response) => {
  try {
    if (!ownProfile || !substackClient) {
      res.status(401).json({ error: 'Not connected. Call /api/connect first.' });
      return;
    }

    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    const subtitle = typeof req.body.subtitle === 'string' ? req.body.subtitle.trim() : '';
    const body = typeof req.body.body === 'string' ? req.body.body.trim() : '';
    const isDraft = req.body.isDraft;

    if (!title || !body) {
      res.status(400).json({ error: 'Title and body are required and cannot be empty' });
      return;
    }

    const docJson = markdownToProseMirror(body);
    if (!ownProfile.id) {
      throw new Error('Missing profile ID. Please reconnect Substack.');
    }
    const bylines = [{ id: ownProfile.id, is_guest: false }];

    const payload = {
      draft_title: title,
      draft_subtitle: subtitle || undefined,
      draft_body: docJson,
      draft_bylines: bylines,
      type: 'newsletter',
      audience: 'everyone'
    };

    const response = await (substackClient as any).publicationClient.post('/api/v1/drafts', payload);

    if (!response || !response.id) {
      throw new Error('Failed to create draft on Substack');
    }

    const pubHostname = getPubHostname();

    if (isDraft === false) {
      try {
        await (substackClient as any).publicationClient.get(`/api/v1/drafts/${response.id}/prepublish`);
      } catch (e) {
        console.warn('Prepublish call failed or returned non-JSON:', e);
      }

      const publishResponse = await (substackClient as any).publicationClient.post(
        `/api/v1/drafts/${response.id}/publish`,
        {
          send: true,
          share_automatically: false,
        }
      );

      const slug = publishResponse?.slug || response.slug || '';
      const postUrl = slug ? `https://${pubHostname}/p/${slug}` : `https://${pubHostname}/publish/post/${response.id}`;

      savePublicationToHistory({
        type: 'newsletter',
        title: response.title || title,
        body: subtitle || body.substring(0, 280),
        url: postUrl,
        publishedAt: new Date().toISOString(),
        source: 'manual',
        isDraft: false,
      });

      res.json({
        success: true,
        post: {
          id: response.id,
          title: response.title || title,
          isDraft: false,
          url: postUrl,
        },
      });
      return;
    }

    const draftUrl = `https://${pubHostname}/publish/post/${response.id}`;

    savePublicationToHistory({
      type: 'newsletter',
      title: response.title || title,
      body: subtitle || body.substring(0, 280),
      url: draftUrl,
      publishedAt: new Date().toISOString(),
      source: 'manual',
      isDraft: true,
    });

    res.json({
      success: true,
      post: {
        id: response.id,
        title: response.title || title,
        isDraft: true,
        url: draftUrl,
      },
    });
  } catch (err: any) {
    console.error('Publish error:', err);
    res.status(500).json({ error: err.message || 'Failed to publish post' });
  }
});

// Helper to sleep/delay execution
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to resolve target account information from URL, user ID, or handle
async function resolveTargetInfo(target: string) {
  let slug = '';
  let hostname = '';
  let profileId: number | null = null;

  target = target.trim();

  if (/^\d+$/.test(target)) {
    profileId = Number(target);
  } else if (target.includes('//') || target.includes('.')) {
    let cleanUrl = target.replace(/^(https?:\/\/)?(www\.)?/, '');
    if (cleanUrl.includes('substack.com/@')) {
      const parts = cleanUrl.split('substack.com/@');
      slug = parts[1].split('/')[0].split('?')[0];
    } else if (cleanUrl.includes('substack.com/profile/')) {
      const parts = cleanUrl.split('substack.com/profile/');
      const idPart = parts[1].split('/')[0].split('-')[0];
      if (/^\d+$/.test(idPart)) {
        profileId = Number(idPart);
      } else {
        slug = parts[1].split('/')[0];
      }
    } else {
      hostname = cleanUrl.split('/')[0].split('?')[0];
    }
  } else {
    slug = target.replace(/^@/, '');
  }

  return { slug, hostname, profileId };
}

// ─── GET /api/newsletters ───
router.get('/newsletters', async (_req: Request, res: Response) => {
  try {
    if (!ownProfile || !substackClient) {
      res.status(401).json({ error: 'Not connected. Call /api/connect first.' });
      return;
    }

    const pubHostname = getPubHostname();
    const response = await (substackClient as any).publicationClient.get('/api/v1/archive?limit=25');
    const posts: any[] = [];
    
    const rawPosts = Array.isArray(response) ? response : (response.posts || []);
    for (const post of rawPosts) {
      posts.push({
        id: post.id,
        title: post.title,
        subtitle: post.subtitle || post.description || '',
        publishedAt: post.post_date || post.published_date || new Date().toISOString(),
        truncatedBody: post.truncated_body_text || '',
        url: post.canonical_url || `https://${pubHostname}/p/${post.slug || post.id}`
      });
    }

    res.json({
      success: true,
      posts
    });
  } catch (err: any) {
    console.error('Newsletters error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch newsletters' });
  }
});

// ─── POST /api/notes/generate ───
router.post('/notes/generate', async (req: Request, res: Response) => {
  try {
    let { topic, provider, model, apiKey, systemPrompt, useWebSearch } = req.body;

    if (!topic) {
      res.status(400).json({ error: 'Topic is required' });
      return;
    }
    if (!provider || !model) {
      res.status(400).json({ error: 'Provider and model are required' });
      return;
    }
    if (!apiKey) {
      if (provider === 'groq') apiKey = process.env.GROQ_API_KEY;
      else if (provider === 'gemini') apiKey = process.env.GEMINI_API_KEY;
      else if (provider === 'openai') apiKey = process.env.OPENAI_API_KEY;
      else if (provider === 'openrouter') apiKey = process.env.OPENROUTER_API_KEY;
    }

    if (!apiKey) {
      res.status(400).json({ error: 'API key is required' });
      return;
    }

    const baseReq = { topic, provider, model, apiKey, systemPrompt };
    if (useWebSearch) {
      const result = await generateNoteWithWebResearch(baseReq);
      res.json({
        success: true,
        note: { body: result.body },
        research: {
          searchQuery: result.searchQuery,
          searchResultsPreview: result.searchResults.substring(0, 500),
        },
      });
      return;
    }

    const note = await generateNote(baseReq);
    res.json({ success: true, note });
  } catch (err: any) {
    console.error('Generate note error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate note' });
  }
});

// ─── POST /api/notes/publish ───
router.post('/notes/publish', async (req: Request, res: Response) => {
  try {
    if (!ownProfile || !substackClient) {
      res.status(401).json({ error: 'Not connected. Call /api/connect first.' });
      return;
    }

    const body = typeof req.body.body === 'string' ? req.body.body.trim() : '';
    const link = typeof req.body.link === 'string' ? req.body.link.trim() : '';

    if (!body) {
      res.status(400).json({ error: 'Body is required and cannot be empty' });
      return;
    }

    if (body.length > 1000) {
      res.status(400).json({ error: 'Note body is too long (maximum 1000 characters)' });
      return;
    }

    let response;
    if (link) {
      response = await ownProfile.newNoteWithLink(link).paragraph().text(body).publish();
    } else {
      response = await ownProfile.newNote().paragraph().text(body).publish();
    }

    if (!response || !response.id) {
      throw new Error('Failed to create note on Substack');
    }

    const noteUrl = ownProfile.slug ? `https://substack.com/@${ownProfile.slug}/note/c-${response.id}` : 'https://substack.com/notes';

    savePublicationToHistory({
      type: 'note',
      title: ownProfile.name ? `${ownProfile.name}'s Note` : 'Published Note',
      body,
      url: noteUrl,
      publishedAt: new Date().toISOString(),
      source: 'manual',
    });

    res.json({
      success: true,
      note: {
        id: response.id,
        body: body,
        url: noteUrl
      }
    });
  } catch (err: any) {
    console.error('Publish note error:', err);
    res.status(500).json({ error: err.message || 'Failed to publish note' });
  }
});

// ─── GET /api/notes ───
router.get('/notes', async (_req: Request, res: Response) => {
  try {
    if (!ownProfile || !substackClient) {
      res.status(401).json({ error: 'Not connected. Call /api/connect first.' });
      return;
    }

    const notes: any[] = [];
    for await (const note of ownProfile.notes({ limit: 25 })) {
      const noteId = String(note.id);
      const cleanNoteId = noteId.startsWith('c-') ? noteId : `c-${noteId}`;
      notes.push({
        id: note.id,
        body: note.body,
        likesCount: note.likesCount,
        publishedAt: note.publishedAt,
        author: note.author,
        url: ownProfile.slug ? `https://substack.com/@${ownProfile.slug}/note/${cleanNoteId}` : 'https://substack.com/notes'
      });
    }

    res.json({
      success: true,
      notes
    });
  } catch (err: any) {
    console.error('Fetch notes error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch notes' });
  }
});

// ─── Comments History Helper & Route ───
function saveCommentToHistory(comment: { postTitle: string; postUrl: string; body: string; publishedAt: string }) {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'comments_history.json');
    let history: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        history = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        history = [];
      }
    }
    history.unshift(comment); // add to beginning
    fs.writeFileSync(filePath, JSON.stringify(history, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save comment to history:', err);
  }
}

router.get('/comments', (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'comments_history.json');
    let history: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        history = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        history = [];
      }
    }
    res.json({ success: true, comments: history });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch comments history' });
  }
});

router.get('/publications/history', async (_req: Request, res: Response) => {
  try {
    const publications = getPublicationHistory();
    const knownUrls = new Set(publications.map(p => p.url));

    const schedules = await getSchedules();
    for (const schedule of schedules) {
      if (schedule.status !== 'completed' || !schedule.lastRunAt) continue;
      const url = schedule.publishedUrl || `schedule://${schedule.id}`;
      if (knownUrls.has(url)) continue;

      publications.push({
        id: schedule.id,
        type: schedule.postType,
        title: schedule.publishedTitle || schedule.title || 'Scheduled Post',
        body: schedule.subtitle || schedule.body.substring(0, 280),
        url,
        publishedAt: schedule.lastRunAt,
        source: 'scheduled',
        scheduleId: schedule.id,
        isDraft: schedule.isDraft,
      });
      knownUrls.add(url);
    }

    publications.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    res.json({ success: true, publications });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch publication history' });
  }
});

// ─── POST /api/comments/automate ───
router.post('/comments/automate', async (req: Request, res: Response) => {
  const logs: string[] = [];
  const results: any[] = [];
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    logs.push(`[${time}] ${msg}`);
    console.log(`[SubstackAuto] ${msg}`);
  };

  try {
    if (!ownProfile || !substackClient || !currentSid) {
      res.status(401).json({ error: 'Not connected. Please connect your Substack account first.' });
      return;
    }

    const { targetAccount, keyword, commentInstruction, provider, model, apiKey } = req.body;

    if (!targetAccount || !keyword) {
      res.status(400).json({ error: 'Target account and keyword are required.' });
      return;
    }

    if (!provider || !model || !apiKey) {
      res.status(400).json({ error: 'AI provider, model, and API key are required.' });
      return;
    }

    addLog(`Starting comment automation checking for keyword: "${keyword}"`);
    addLog(`Resolving target account: ${targetAccount}`);

    const target = await resolveTargetInfo(targetAccount);
    let targetPosts: any[] = [];
    let defaultPubHostname = 'substack.com';

    if (target.profileId) {
      addLog(`Target resolved to profile ID: ${target.profileId}. Fetching profile...`);
      const profile = await substackClient.profileForId(target.profileId);
      addLog(`Found profile: ${profile.name || 'Unknown'}. Fetching posts...`);
      for await (const post of profile.posts({ limit: 10 })) {
        targetPosts.push({
          id: post.id,
          title: post.title,
          subtitle: post.subtitle || '',
          body: post.body || post.truncatedBody || '',
          url: `https://substack.com/p/${post.id}`
        });
      }
    } else if (target.slug) {
      addLog(`Target resolved to slug: ${target.slug}. Fetching profile...`);
      const profile = await substackClient.profileForSlug(target.slug);
      addLog(`Found profile: ${profile.name || 'Unknown'}. Fetching posts...`);
      for await (const post of profile.posts({ limit: 10 })) {
        targetPosts.push({
          id: post.id,
          title: post.title,
          subtitle: post.subtitle || '',
          body: post.body || post.truncatedBody || '',
          url: `https://substack.com/p/${post.id}`
        });
      }
    } else if (target.hostname) {
      defaultPubHostname = target.hostname;
      addLog(`Target resolved to publication domain: ${target.hostname}. Fetching archive...`);
      const archiveUrl = `https://${target.hostname}/api/v1/archive?limit=10`;
      
      const archiveRes = await fetch(archiveUrl);
      if (!archiveRes.ok) {
        throw new Error(`Failed to fetch target archive: ${archiveRes.statusText}`);
      }
      
      const archiveData = (await archiveRes.json()) as any;
      let rawPosts: any[] = [];
      if (Array.isArray(archiveData)) {
        rawPosts = archiveData;
      } else if (archiveData && Array.isArray(archiveData.posts)) {
        rawPosts = archiveData.posts;
      } else if (archiveData && typeof archiveData === 'object') {
        const keys = Object.keys(archiveData);
        for (const key of keys) {
          if (Array.isArray(archiveData[key])) {
            rawPosts = archiveData[key];
            break;
          }
        }
      }

      addLog(`Fetched ${rawPosts.length} posts from archive.`);
      for (const p of rawPosts) {
        targetPosts.push({
          id: p.id,
          title: p.title || '',
          subtitle: p.subtitle || p.description || '',
          body: p.truncated_body_text || p.body_html || '',
          url: p.canonical_url || `https://${target.hostname}/p/${p.id}`
        });
      }
    } else {
      throw new Error('Could not parse target account. Please enter a valid user ID, slug, or URL.');
    }

    addLog(`Total posts found to evaluate: ${targetPosts.length}`);

    for (let i = 0; i < targetPosts.length; i++) {
      const post = targetPosts[i];
      addLog(`[Post ${i + 1}/${targetPosts.length}] Evaluating: "${post.title}" (ID: ${post.id})`);

      let postPubHostname = defaultPubHostname;
      if (post.url && post.url.includes('//')) {
        try {
          const urlObj = new URL(post.url);
          postPubHostname = urlObj.hostname;
        } catch {
          // Fallback to default
        }
      }

      // 1. Fetch comments of this post to check if we already commented
      let alreadyCommented = false;
      try {
        addLog(`Checking if already commented on post ${post.id}...`);
        
        const commentsUrl = `https://${postPubHostname}/api/v1/post/${post.id}/comments`;
        const commentsRes = await fetch(commentsUrl);
        if (commentsRes.ok) {
          const commentsData = (await commentsRes.json()) as any;
          const comments = commentsData.comments || [];
          
          alreadyCommented = comments.some((c: any) => {
            const authorId = c.author_id || c.user_id || (c.author && c.author.id);
            const authorName = c.author_name || (c.author && c.author.name);
            return authorId === ownProfile.id || authorName === ownProfile.name;
          });
        }
      } catch (e: any) {
        addLog(`Warning: Failed to check comments: ${e.message}. Proceeding assuming no comments.`);
      }

      if (alreadyCommented) {
        addLog(`Skipping: You have already commented on this post.`);
        results.push({
          postTitle: post.title,
          url: post.url,
          matched: false,
          status: 'already_commented'
        });
        continue;
      }

      // 2. Call AI to analyze relevance and generate comment
      addLog(`Sending to AI for similarity analysis...`);
      const aiResult = await analyzeAndGenerateComment({
        postTitle: post.title,
        postSubtitle: post.subtitle,
        postBody: post.body,
        keyword,
        commentInstruction,
        provider,
        model,
        apiKey
      });

      if (!aiResult.matched || !aiResult.comment) {
        addLog(`AI Result: Not relevant to keyword. Skipping.`);
        results.push({
          postTitle: post.title,
          url: post.url,
          matched: false,
          status: 'skipped'
        });
        continue;
      }

      addLog(`AI Result: MATCHED! Generated Comment: "${aiResult.comment}"`);
      addLog(`Posting comment to Substack...`);

      // 3. Post the comment to Substack
      const commentEndpoint = `https://${postPubHostname}/api/v1/post/${post.id}/comment`;
      let postCommentRes: { ok: boolean; status?: number; statusText?: string };
      try {
        await ensureHttpClientPatched(); // Ensure gotScraping is initialized
        const gotScrapingFn = getGotScraping();
        const response = await gotScrapingFn({
          url: commentEndpoint,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `connect.sid=${currentSid}`,
            'Origin': `https://${postPubHostname}`,
            'Referer': `https://${postPubHostname}/p/${post.id}`
          },
          body: JSON.stringify({ body: aiResult.comment }),
          responseType: 'json',
          retry: { limit: 0 }
        });
        postCommentRes = { ok: true };
      } catch (err: any) {
        postCommentRes = {
          ok: false,
          status: err.response?.statusCode || 500,
          statusText: err.response?.body ? (typeof err.response.body === 'object' ? JSON.stringify(err.response.body) : String(err.response.body)) : err.message
        };
      }

      if (!postCommentRes.ok) {
        addLog(`Error: Failed to post comment (HTTP ${postCommentRes.status}): ${postCommentRes.statusText}`);
        results.push({
          postTitle: post.title,
          url: post.url,
          matched: true,
          comment: aiResult.comment,
          status: `failed: ${postCommentRes.status}`
        });
      } else {
        addLog(`Success! Comment posted successfully on "${post.title}"`);
        
        // Save comment to local JSON history file
        saveCommentToHistory({
          postTitle: post.title,
          postUrl: post.url,
          body: aiResult.comment,
          publishedAt: new Date().toISOString()
        });

        results.push({
          postTitle: post.title,
          url: post.url,
          matched: true,
          comment: aiResult.comment,
          status: 'success'
        });
      }

      // Wait between posts to avoid rate limit/blocks
      addLog(`Sleeping 2 seconds...`);
      await sleep(2000);
    }

    addLog(`Comment automation finished.`);
    res.json({
      success: true,
      logs,
      results
    });

  } catch (err: any) {
    console.error('Comment automation error:', err);
    addLog(`Fatal Error: ${err.message}`);
    res.status(500).json({
      error: err.message || 'Failed to complete comment automation',
      logs
    });
  }
});

// ─── GET /api/schedule ───
router.get('/schedule', async (_req: Request, res: Response) => {
  try {
    const schedules = await getSchedules();
    res.json({ success: true, schedules: sanitizeSchedulesForClient(schedules) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch schedules' });
  }
});

// ─── POST /api/schedule ───
router.post('/schedule', async (req: Request, res: Response) => {
  try {
    const { 
      title, subtitle, body, isDraft, scheduledAt, recurrence, postType, noteLink,
      enableSearch, provider, model, apiKey, systemPrompt
    } = req.body;

    const payload = {
      title: title || '',
      subtitle: subtitle || '',
      body: body || '',
      isDraft: isDraft !== false,
      scheduledAt,
      recurrence: recurrence || 'once',
      postType: postType || 'newsletter',
      noteLink: noteLink || '',
      enableSearch: enableSearch === true,
      provider,
      model,
      apiKey,
      systemPrompt,
    };

    const validationError = validateScheduledPost(payload);
    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }

    const schedule = await addSchedule(payload);
    res.json({ success: true, schedule: sanitizeScheduleForClient(schedule) });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create schedule' });
  }
});

// ─── DELETE /api/schedule/:id ───
router.delete('/schedule/:id', async (req: Request, res: Response) => {
  try {
    const success = await deleteSchedule(req.params.id as string);
    if (!success) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete schedule' });
  }
});

// ─── POST /api/schedule/:id/toggle ───
router.post('/schedule/:id/toggle', async (req: Request, res: Response) => {
  try {
    const schedule = await toggleSchedule(req.params.id as string);
    if (!schedule) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }
    res.json({ success: true, schedule: sanitizeScheduleForClient(schedule) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to toggle schedule' });
  }
});

// ─── POST /api/schedule/:id/run-now ───
router.post('/schedule/:id/run-now', async (req: Request, res: Response) => {
  try {
    const { apiKey, provider, model } = req.body || {};
    const schedule = await runScheduleNow(req.params.id as string);
    if (!schedule) {
      res.status(404).json({ error: 'Schedule not found or cannot be run now' });
      return;
    }

    if (apiKey || provider || model) {
      const schedules = await getSchedules();
      const fresh = schedules.find(p => p.id === schedule.id);
      if (fresh) {
        if (apiKey) fresh.apiKey = apiKey;
        if (provider) fresh.provider = provider;
        if (model) fresh.model = model;
        await saveSchedules(schedules);
      }
    }

    const logs: string[] = [];
    const addLog = (msg: string) => {
      logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      console.log(`[CronScheduler] ${msg}`);
    };

    addLog(`Send now requested for schedule ${schedule.id}.`);
    const { processed } = await runScheduleProcessing(addLog);
    const result = processed.find(item => item.id === schedule.id);

    res.json({
      success: true,
      schedule: sanitizeScheduleForClient(schedule),
      processed: result || null,
      processedCount: processed.length,
      logs,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to run schedule now' });
  }
});

// ─── POST /api/test/substack ───
type AIProvider = 'groq' | 'gemini' | 'openai' | 'openrouter';

router.post('/test/substack', async (req: Request, res: Response) => {
  try {
    const { sid, publicationUrl } = req.body || {};
    const cookie = sid?.trim() || process.env.SUBSTACK_SID;
    if (!cookie) {
      res.status(400).json({ error: 'Session cookie (connect.sid) is required' });
      return;
    }

    const result = await connectSubstack(cookie, publicationUrl || process.env.SUBSTACK_PUB_URL);
    if (!result.success) {
      res.status(401).json({
        success: false,
        error: result.error || 'Substack session test failed',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Substack session is valid',
      profile: {
        name: result.profile?.name,
        slug: result.profile?.slug,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Substack session test failed' });
  }
});

// ─── POST /api/test/ai-key ───
router.post('/test/ai-key', async (req: Request, res: Response) => {
  try {
    let { provider, model, apiKey } = req.body || {};
    if (!provider) {
      res.status(400).json({ error: 'Provider is required' });
      return;
    }

    if (!apiKey) {
      if (provider === 'groq') apiKey = process.env.GROQ_API_KEY;
      else if (provider === 'gemini') apiKey = process.env.GEMINI_API_KEY;
      else if (provider === 'openai') apiKey = process.env.OPENAI_API_KEY;
      else if (provider === 'openrouter') apiKey = process.env.OPENROUTER_API_KEY;
    }

    if (!apiKey) {
      res.status(400).json({ error: 'API key is required' });
      return;
    }

    if (!model) {
      model = DEFAULT_AI_MODELS[provider as AIProvider];
    }

    const result = await testAIKey(provider, model, apiKey);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(401).json({ success: false, error: err.message || 'API key test failed' });
  }
});

// ─── POST /api/schedule/:id/retry ───
router.post('/schedule/:id/retry', async (req: Request, res: Response) => {
  try {
    const { apiKey, provider, model } = req.body || {};
    const schedule = await retrySchedule(req.params.id as string, {
      apiKey: apiKey || undefined,
      provider: provider || undefined,
      model: model || undefined,
    });
    if (!schedule) {
      res.status(404).json({ error: 'Schedule not found or cannot be retried' });
      return;
    }

    const logs: string[] = [];
    const addLog = (msg: string) => {
      logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      console.log(`[CronScheduler] ${msg}`);
    };

    addLog(`Manual retry requested for schedule ${schedule.id}. Running now...`);
    const { processed } = await runScheduleProcessing(addLog);
    const result = processed.find(item => item.id === schedule.id);

    res.json({
      success: true,
      schedule: sanitizeScheduleForClient(schedule),
      processed: result || null,
      processedCount: processed.length,
      logs,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to retry schedule' });
  }
});

function resolveEnvApiKey(provider: AIProvider): string | undefined {
  if (provider === 'groq') return process.env.GROQ_API_KEY;
  if (provider === 'gemini') return process.env.GEMINI_API_KEY;
  if (provider === 'openai') return process.env.OPENAI_API_KEY;
  if (provider === 'openrouter') return process.env.OPENROUTER_API_KEY;
  return undefined;
}

function detectProviderFromEnv(): AIProvider | null {
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.OPENROUTER_API_KEY) return 'openrouter';
  return null;
}

function resolveScheduleAIConfig(
  post: ScheduledPost,
  addLog: (msg: string) => void
): { provider: AIProvider; model: string; apiKey: string } {
  let provider: AIProvider | null = post.provider || detectProviderFromEnv();
  if (!provider) {
    throw new Error(
      'No AI provider found. Set a provider on the schedule or configure GROQ_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY, or OPENROUTER_API_KEY in environment.'
    );
  }

  let apiKey = post.apiKey?.trim() || resolveEnvApiKey(provider);
  if (!apiKey) {
    throw new Error(
      `API key is missing for provider "${provider}". Add your key in Scheduler AI settings when creating the job, or set it in server environment variables.`
    );
  }

  if (post.apiKey?.trim()) {
    addLog(`Using API key stored on schedule for provider "${provider}".`);
  } else {
    addLog(`Using server environment API key for provider "${provider}".`);
  }

  const model = post.model || DEFAULT_AI_MODELS[provider];
  if (!model) {
    throw new Error(`Model selection is missing for provider: ${provider}.`);
  }

  return { provider, model, apiKey };
}

function deriveScheduleSearchQuery(post: ScheduledPost): string {
  if (post.postType === 'note') {
    return deriveResearchSearchQuery(post.body);
  }
  return deriveResearchSearchQuery(post.body, post.title);
}

// Core scheduler processor function
export async function runScheduleProcessing(addLog: (msg: string) => void): Promise<{ processed: any[] }> {
  const recovered = await recoverStuckSchedules((post) => {
    addLog(`Recovered stuck schedule ${post.id} from processing state.`);
  });
  if (recovered > 0) {
    addLog(`Recovered ${recovered} stuck schedule(s).`);
  }

  const schedules = await getSchedules();
  const now = new Date();
  const processed: any[] = [];
  let isSubstackConnected = false;

  // Filter to schedules that need processing: status must be pending and scheduledAt <= now
  const eligibleSchedules = schedules.filter(post => {
    if (post.status !== 'pending') return false;
    const scheduledTime = new Date(post.scheduledAt);
    return !isNaN(scheduledTime.getTime()) && scheduledTime <= now;
  });

  addLog(`Found ${eligibleSchedules.length} due schedules to process.`);

  for (const post of eligibleSchedules) {
    addLog(`Processing schedule ${post.id}: "${post.title || 'Note'}" (due: ${post.scheduledAt})`);

    // 1. Idempotency Lock: Mark as processing and save immediately
    try {
      const currentSchedules = await getSchedules();
      const freshPost = currentSchedules.find(p => p.id === post.id);
      if (!freshPost || freshPost.status !== 'pending') {
        addLog(`Skipping schedule ${post.id}: already processed or processing by concurrent run.`);
        continue;
      }

      freshPost.status = 'processing';
      freshPost.processingStartedAt = new Date().toISOString();
      await saveSchedules(currentSchedules);
    } catch (lockErr: any) {
      addLog(`Locking error for schedule ${post.id}: ${lockErr.message}`);
      continue;
    }

    // 2. Perform execution
    try {
      let finalTitle = post.title;
      let finalSubtitle = post.subtitle || '';
      let finalBody = post.body;

      if (post.enableSearch) {
        const { provider, model, apiKey } = resolveScheduleAIConfig(post, addLog);
        const guidelines = post.body?.trim() || post.title?.trim() || '';
        const searchQuery = deriveScheduleSearchQuery(post);

        addLog(`Generating content with web research using provider "${provider}" and model "${model}"...`);

        if (post.postType === 'note') {
          if (provider === 'openrouter' && model === 'openrouter/free:online') {
            addLog(`Using OpenRouter native online search model "${model}"...`);
          } else {
            addLog(`Searching the web for: "${searchQuery.substring(0, 120)}..."`);
          }

          const noteResult = await generateNoteWithWebResearch({
            topic: guidelines,
            provider,
            model,
            apiKey,
            systemPrompt: post.systemPrompt,
            searchQuery,
          });

          if (noteResult.searchResults) {
            addLog(`Research complete. Retrieved search results (first 200 chars): "${noteResult.searchResults.substring(0, 200)}..."`);
          }

          finalBody = noteResult.body;
          finalTitle = '';
          finalSubtitle = '';
          addLog(`Dynamic note generated successfully (first 50 chars): "${finalBody.substring(0, 50)}..."`);
        } else {
          if (provider === 'openrouter' && model === 'openrouter/free:online') {
            addLog(`Using OpenRouter native online search model "${model}"...`);
          } else {
            addLog(`Searching the web for: "${searchQuery.substring(0, 120)}..."`);
          }

          const research = await generateNewsletterWithWebResearch({
            topic: guidelines,
            provider,
            model,
            apiKey,
            systemPrompt: post.systemPrompt,
            searchQuery,
          });

          if (research.searchResults) {
            addLog(`Research complete. Retrieved search results (first 200 chars): "${research.searchResults.substring(0, 200)}..."`);
          }

          finalTitle = research.post.title;
          finalSubtitle = research.post.subtitle;
          finalBody = research.post.body;
          addLog(`Generated title: "${finalTitle}"`);
          if (finalSubtitle) {
            addLog(`Generated subtitle: "${finalSubtitle.substring(0, 80)}${finalSubtitle.length > 80 ? '...' : ''}"`);
          }
        }
      }

      if (!isSubstackConnected) {
        addLog('Initializing Substack connection...');
        const conn = await ensureConnected();
        if (!conn.success) {
          throw new Error(conn.error || 'Failed to connect to Substack');
        }
        isSubstackConnected = true;
        addLog('Connected successfully.');
      }

      let publishedUrl: string | undefined;
      let publishedTitle: string | undefined;

      if (post.postType === 'note') {
        addLog(`Publishing note: "${finalBody.substring(0, 50)}..."`);
        let response;
        if (post.noteLink) {
          response = await ownProfile.newNoteWithLink(post.noteLink).paragraph().text(finalBody).publish();
        } else {
          response = await ownProfile.newNote().paragraph().text(finalBody).publish();
        }
        if (!response?.id) {
          throw new Error('Failed to create note on Substack');
        }

        publishedUrl = ownProfile.slug
          ? `https://substack.com/@${ownProfile.slug}/note/c-${response.id}`
          : 'https://substack.com/notes';
        publishedTitle = ownProfile.name ? `${ownProfile.name}'s Note` : 'Scheduled Note';

        savePublicationToHistory({
          type: 'note',
          title: publishedTitle,
          body: finalBody,
          url: publishedUrl,
          publishedAt: new Date().toISOString(),
          source: 'scheduled',
          scheduleId: post.id,
        });

        addLog(`Note published successfully (ID: ${response.id}).`);
      } else {
        addLog(`Creating newsletter draft: "${finalTitle}"`);
        const docJson = markdownToProseMirror(finalBody);
        const bylines = [{ id: ownProfile.id, is_guest: false }];
        const payload = {
          draft_title: finalTitle,
          draft_subtitle: finalSubtitle || undefined,
          draft_body: docJson,
          draft_bylines: bylines,
          type: 'newsletter',
          audience: 'everyone'
        };

        const response = await (substackClient as any).publicationClient.post('/api/v1/drafts', payload);
        if (!response || !response.id) {
          throw new Error('Failed to create draft on Substack');
        }

        const pubHostname = getPubHostname();
        publishedUrl = `https://${pubHostname}/publish/post/${response.id}`;
        publishedTitle = finalTitle || response.title || 'Scheduled Newsletter';
        const isLivePublish = post.isDraft === false;

        if (isLivePublish) {
          addLog(`Publishing draft ${response.id} live...`);
          try {
            await (substackClient as any).publicationClient.get(`/api/v1/drafts/${response.id}/prepublish`);
          } catch (e) {
            addLog(`Prepublish call warning: ${e instanceof Error ? e.message : String(e)}`);
          }

          const publishResponse = await (substackClient as any).publicationClient.post(
            `/api/v1/drafts/${response.id}/publish`,
            { send: true, share_automatically: false }
          );
          const slug = publishResponse?.slug || response.slug || '';
          publishedUrl = slug
            ? `https://${pubHostname}/p/${slug}`
            : `https://${pubHostname}/publish/post/${response.id}`;
          addLog('Newsletter published live.');
        } else {
          addLog('Newsletter draft saved.');
        }

        savePublicationToHistory({
          type: 'newsletter',
          title: publishedTitle || finalTitle || 'Scheduled Newsletter',
          body: finalSubtitle || finalBody.substring(0, 280),
          url: publishedUrl,
          publishedAt: new Date().toISOString(),
          source: 'scheduled',
          scheduleId: post.id,
          isDraft: !isLivePublish,
        });
      }

      // Success: update status and recurrence on fresh list and save
      const currentSchedules = await getSchedules();
      const freshPost = currentSchedules.find(p => p.id === post.id);
      if (freshPost) {
        freshPost.lastRunAt = new Date().toISOString();
        freshPost.errorMessage = undefined;
        freshPost.retryCount = 0;
        freshPost.processingStartedAt = undefined;
        if (publishedUrl) freshPost.publishedUrl = publishedUrl;
        if (publishedTitle) freshPost.publishedTitle = publishedTitle;
        if (freshPost.recurrence === 'once') {
          freshPost.status = 'completed';
        } else {
          const prevScheduled = freshPost.scheduledAt;
          freshPost.scheduledAt = calculateNextRun(freshPost.scheduledAt, freshPost.recurrence);
          freshPost.status = 'pending';
          addLog(`Recurrent post reset from ${prevScheduled} to ${freshPost.scheduledAt}`);
        }
        await saveSchedules(currentSchedules);
      }

      processed.push({ id: post.id, title: post.title || 'Note', status: 'success' });
    } catch (postErr: any) {
      const errMsg = postErr.message || 'Publication failed';
      addLog(`Error processing schedule ${post.id}: ${errMsg}`);

      try {
        const currentSchedules = await getSchedules();
        const freshPost = currentSchedules.find(p => p.id === post.id);
        if (freshPost) {
          freshPost.lastRunAt = new Date().toISOString();
          const { willRetry, nextRunAt } = applyScheduleFailure(freshPost, errMsg);
          if (willRetry) {
            addLog(
              `Schedule ${post.id} will retry (attempt ${freshPost.retryCount}/${MAX_SCHEDULE_RETRIES}) at ${nextRunAt}.`
            );
          } else {
            addLog(`Schedule ${post.id} permanently failed after ${MAX_SCHEDULE_RETRIES} attempts.`);
          }
          await saveSchedules(currentSchedules);
        }
      } catch (saveErr: any) {
        addLog(`Failed to save error status for ${post.id}: ${saveErr.message}`);
      }

      processed.push({ id: post.id, title: post.title || 'Note', status: 'failed', error: errMsg });
    }
  }

  return { processed };
}

// ─── CRON Endpoint: process-schedules ───
const processSchedulesHandler = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  const apiSecret = process.env.API_SECRET;

  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const hasSecrets = Boolean(cronSecret || apiSecret);

  if (isProduction && hasSecrets) {
    let authorized = false;
    if (cronSecret && (authHeader === `Bearer ${cronSecret}` || req.query.secret === cronSecret)) {
      authorized = true;
    }
    if (apiSecret && (authHeader === `Bearer ${apiSecret}` || req.query.secret === apiSecret)) {
      authorized = true;
    }
    if (!authorized) {
      res.status(401).json({ error: 'Unauthorized: Invalid or missing bearer token/secret query' });
      return;
    }
  }

  const logs: string[] = [];
  const addLog = (msg: string) => {
    logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
    console.log(`[CronScheduler] ${msg}`);
  };

  addLog('Cron scheduler triggered. Running schedules...');

  try {
    const allSchedules = await getSchedules();
    const queueStats = getScheduleQueueStats(allSchedules);
    if (queueStats.pendingCount > 0 && queueStats.dueCount === 0 && queueStats.nextDueAt) {
      addLog(
        `No posts due yet. ${queueStats.pendingCount} pending — next run at ${queueStats.nextDueAt}.`
      );
    }

    const { processed } = await runScheduleProcessing(addLog);
    addLog(`Finished processing. Processed ${processed.length} schedules.`);
    res.json({
      success: true,
      processedCount: processed.length,
      processed,
      logs,
      ...queueStats,
    });
  } catch (err: any) {
    addLog(`Fatal cron error: ${err.message}`);
    res.status(500).json({ error: err.message || 'Cron execution failed', logs });
  }
};

router.get('/cron/process-schedules', processSchedulesHandler);
router.post('/cron/process-schedules', processSchedulesHandler);

export default router;

