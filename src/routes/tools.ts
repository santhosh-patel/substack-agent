/**
 * AI Tool-Calling Routes — /api/tools/*
 * 
 * Simplified, AI-agent-optimized endpoints for Substack automation.
 * These are designed for Claude (MCP), N8N, ChatGPT GPTs, and any
 * OpenAPI-aware agent to discover and call as tool functions.
 * 
 * Key differences from the existing /api/* routes:
 * - Auto-connect: No explicit /api/connect step needed
 * - No AI provider params: The calling AI generates content itself
 * - Consistent response format: { success, data?, error? }
 */

import { Router, Request, Response } from 'express';
import {
  ensureConnected,
  substackClient,
  ownProfile,
  currentSid,
  ensureHttpClientPatched,
  getGotScraping,
  getPubHostname,
} from '../lib/substack-client.js';
import { analyzeAndGenerateComment } from '../ai/generate.js';
import fs from 'fs';
import path from 'path';

const router = Router();

// ─── Helper ───
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    history.unshift(comment);
    fs.writeFileSync(filePath, JSON.stringify(history, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save comment to history:', err);
  }
}

// ─── Markdown to ProseMirror (reused from api.ts) ───

function parseInlineText(text: string): any[] {
  const tokens: any[] = [];
  const pattern = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      tokens.push({ type: 'text', text: text.substring(lastIndex, matchIndex) });
    }
    if (match[1]) {
      tokens.push({ type: 'text', text: match[2], marks: [{ type: 'strong' }] });
    } else if (match[3]) {
      tokens.push({ type: 'text', text: match[4], marks: [{ type: 'em' }] });
    } else if (match[5]) {
      tokens.push({ type: 'text', text: match[5], marks: [{ type: 'code' }] });
    } else if (match[6]) {
      tokens.push({ type: 'text', text: match[6], marks: [{ type: 'link', attrs: { href: match[7] } }] });
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', text: text.substring(lastIndex) });
  }
  if (tokens.length === 0) {
    tokens.push({ type: 'text', text: text || ' ' });
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
      if (currentList) { content.push(currentList); currentList = null; }
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
      currentList.content.push({ type: 'list_item', content: [{ type: 'paragraph', content: parseInlineText(text) }] });
      continue;
    }

    if (isOrdered) {
      if (!currentList || currentList.type !== 'ordered_list') {
        if (currentList) content.push(currentList);
        currentList = { type: 'ordered_list', content: [] };
      }
      const text = trimmed.replace(/^\d+\.\s+/, '').trim();
      currentList.content.push({ type: 'list_item', content: [{ type: 'paragraph', content: parseInlineText(text) }] });
      continue;
    }

    if (currentList) { content.push(currentList); currentList = null; }

    if (trimmed.startsWith('#')) {
      const headingLevel = trimmed.match(/^#+/)?.[0].length || 1;
      const text = trimmed.replace(/^#+\s+/, '').trim();
      content.push({ type: 'heading', attrs: { level: Math.min(headingLevel, 6) }, content: parseInlineText(text) });
      continue;
    }

    if (trimmed.startsWith('>')) {
      const text = trimmed.substring(1).trim();
      content.push({ type: 'blockquote', content: [{ type: 'paragraph', content: parseInlineText(text) }] });
      continue;
    }

    content.push({ type: 'paragraph', content: parseInlineText(trimmed) });
  }

  if (currentList) content.push(currentList);
  return JSON.stringify({ type: 'doc', content });
}

// ─── Helper to resolve target account info ───

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


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOOL ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


// ─── POST /api/tools/publish-newsletter ───
router.post('/publish-newsletter', async (req: Request, res: Response) => {
  try {
    const conn = await ensureConnected();
    if (!conn.success) {
      res.status(401).json({ success: false, error: conn.error });
      return;
    }

    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    const subtitle = typeof req.body.subtitle === 'string' ? req.body.subtitle.trim() : '';
    const body = typeof req.body.body === 'string' ? req.body.body.trim() : '';
    const isDraft = req.body.isDraft;

    if (!title || !body) {
      res.status(400).json({ success: false, error: 'title and body are required and cannot be empty.' });
      return;
    }

    const docJson = markdownToProseMirror(body);
    if (!ownProfile || !ownProfile.id) {
      throw new Error('Missing profile details. Please check your Substack SID.');
    }
    const bylines = [{ id: ownProfile.id, is_guest: false }];

    const payload = {
      draft_title: title,
      draft_subtitle: subtitle || undefined,
      draft_body: docJson,
      draft_bylines: bylines,
      type: 'newsletter',
      audience: 'everyone',
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
        { send: true, share_automatically: false }
      );

      const slug = publishResponse?.slug || response.slug || '';
      const postUrl = slug ? `https://${pubHostname}/p/${slug}` : `https://${pubHostname}/publish/post/${response.id}`;

      res.json({
        success: true,
        data: {
          id: response.id,
          title: response.title || title,
          isDraft: false,
          url: postUrl,
        },
      });
      return;
    }

    const draftUrl = `https://${pubHostname}/publish/post/${response.id}`;
    res.json({
      success: true,
      data: {
        id: response.id,
        title: response.title || title,
        isDraft: true,
        url: draftUrl,
      },
    });
  } catch (err: any) {
    console.error('Tool publish-newsletter error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to publish newsletter' });
  }
});


// ─── POST /api/tools/publish-note ───
router.post('/publish-note', async (req: Request, res: Response) => {
  try {
    const conn = await ensureConnected();
    if (!conn.success) {
      res.status(401).json({ success: false, error: conn.error });
      return;
    }

    const body = typeof req.body.body === 'string' ? req.body.body.trim() : '';
    const link = typeof req.body.link === 'string' ? req.body.link.trim() : '';

    if (!body) {
      res.status(400).json({ success: false, error: 'body is required and cannot be empty.' });
      return;
    }

    if (body.length > 1000) {
      res.status(400).json({ success: false, error: 'Note body is too long (maximum 1000 characters)' });
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

    const noteUrl = ownProfile.slug
      ? `https://substack.com/@${ownProfile.slug}/note/c-${response.id}`
      : 'https://substack.com/notes';

    res.json({
      success: true,
      data: {
        id: response.id,
        body: body,
        url: noteUrl,
      },
    });
  } catch (err: any) {
    console.error('Tool publish-note error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to publish note' });
  }
});


// ─── POST /api/tools/comment ───
router.post('/comment', async (req: Request, res: Response) => {
  try {
    const conn = await ensureConnected();
    if (!conn.success) {
      res.status(401).json({ success: false, error: conn.error });
      return;
    }

    const { postUrl, postId, comment } = req.body;

    if (!comment) {
      res.status(400).json({ success: false, error: 'comment text is required.' });
      return;
    }

    if (!postUrl && !postId) {
      res.status(400).json({ success: false, error: 'Either postUrl or postId is required.' });
      return;
    }

    // Determine post ID and hostname from URL
    let resolvedPostId = postId;
    let postPubHostname = getPubHostname();

    if (postUrl) {
      try {
        const urlObj = new URL(postUrl);
        postPubHostname = urlObj.hostname;
        // Try to extract post slug from URL and look up its ID
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (pathParts[0] === 'p' && pathParts[1]) {
          // URL format: /p/<slug> — need to fetch post ID from the publication
          const slugOrId = pathParts[1];
          // Try treating it as a numeric ID first
          if (/^\d+$/.test(slugOrId)) {
            resolvedPostId = Number(slugOrId);
          } else {
            // Fetch the post by slug to get ID
            const postLookupUrl = `https://${postPubHostname}/api/v1/posts/${slugOrId}`;
            const lookupRes = await fetch(postLookupUrl);
            if (lookupRes.ok) {
              const postData = await lookupRes.json() as any;
              resolvedPostId = postData.id;
            }
          }
        }
      } catch (e) {
        console.warn('Failed to parse postUrl:', e);
      }
    }

    if (!resolvedPostId) {
      res.status(400).json({ success: false, error: 'Could not determine post ID. Provide a valid postUrl or postId.' });
      return;
    }

    await ensureHttpClientPatched();
    const gotScraping = getGotScraping();

    const commentEndpoint = `https://${postPubHostname}/api/v1/post/${resolvedPostId}/comment`;

    try {
      await gotScraping({
        url: commentEndpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `connect.sid=${currentSid}`,
          'Origin': `https://${postPubHostname}`,
          'Referer': `https://${postPubHostname}/p/${resolvedPostId}`,
        },
        body: JSON.stringify({ body: comment }),
        responseType: 'json',
        retry: { limit: 0 },
      });
    } catch (err: any) {
      const statusCode = err.response?.statusCode || 500;
      const statusText = err.response?.body
        ? (typeof err.response.body === 'object' ? JSON.stringify(err.response.body) : String(err.response.body))
        : err.message;
      res.status(statusCode).json({ success: false, error: `Failed to post comment: ${statusText}` });
      return;
    }

    // Save to history
    saveCommentToHistory({
      postTitle: `Post ${resolvedPostId}`,
      postUrl: postUrl || `https://${postPubHostname}/p/${resolvedPostId}`,
      body: comment,
      publishedAt: new Date().toISOString(),
    });

    res.json({
      success: true,
      data: {
        postId: resolvedPostId,
        comment: comment,
        status: 'posted',
      },
    });
  } catch (err: any) {
    console.error('Tool comment error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to post comment' });
  }
});


// ─── POST /api/tools/automate-comments ───
router.post('/automate-comments', async (req: Request, res: Response) => {
  const logs: string[] = [];
  const results: any[] = [];
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    logs.push(`[${time}] ${msg}`);
    console.log(`[ToolAuto] ${msg}`);
  };

  try {
    const conn = await ensureConnected();
    if (!conn.success) {
      res.status(401).json({ success: false, error: conn.error });
      return;
    }

    const { targetAccount, keyword, commentInstruction, provider, model, apiKey } = req.body;

    if (!targetAccount || !keyword) {
      res.status(400).json({ success: false, error: 'targetAccount and keyword are required.' });
      return;
    }

    // For AI-generated comments, require provider/model/apiKey
    // The calling AI can either provide its own generated comments via /comment
    // or use this endpoint with AI provider details for auto-generation
    if (!provider || !model || !apiKey) {
      res.status(400).json({
        success: false,
        error: 'provider, model, and apiKey are required for AI comment generation. Alternatively, use /api/tools/comment to post pre-written comments.',
      });
      return;
    }

    addLog(`Starting comment automation for keyword: "${keyword}"`);
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
          id: post.id, title: post.title, subtitle: post.subtitle || '',
          body: post.body || post.truncatedBody || '', url: `https://substack.com/p/${post.id}`,
        });
      }
    } else if (target.slug) {
      addLog(`Target resolved to slug: ${target.slug}. Fetching profile...`);
      const profile = await substackClient.profileForSlug(target.slug);
      addLog(`Found profile: ${profile.name || 'Unknown'}. Fetching posts...`);
      for await (const post of profile.posts({ limit: 10 })) {
        targetPosts.push({
          id: post.id, title: post.title, subtitle: post.subtitle || '',
          body: post.body || post.truncatedBody || '', url: `https://substack.com/p/${post.id}`,
        });
      }
    } else if (target.hostname) {
      defaultPubHostname = target.hostname;
      addLog(`Target resolved to domain: ${target.hostname}. Fetching archive...`);
      const archiveUrl = `https://${target.hostname}/api/v1/archive?limit=10`;
      const archiveRes = await fetch(archiveUrl);
      if (!archiveRes.ok) throw new Error(`Failed to fetch target archive: ${archiveRes.statusText}`);
      const archiveData = (await archiveRes.json()) as any;
      let rawPosts: any[] = [];
      if (Array.isArray(archiveData)) rawPosts = archiveData;
      else if (archiveData?.posts && Array.isArray(archiveData.posts)) rawPosts = archiveData.posts;
      else if (archiveData && typeof archiveData === 'object') {
        for (const key of Object.keys(archiveData)) {
          if (Array.isArray(archiveData[key])) { rawPosts = archiveData[key]; break; }
        }
      }
      addLog(`Fetched ${rawPosts.length} posts from archive.`);
      for (const p of rawPosts) {
        targetPosts.push({
          id: p.id, title: p.title || '', subtitle: p.subtitle || p.description || '',
          body: p.truncated_body_text || p.body_html || '',
          url: p.canonical_url || `https://${target.hostname}/p/${p.id}`,
        });
      }
    } else {
      throw new Error('Could not parse target account. Provide a valid user ID, slug, or URL.');
    }

    addLog(`Total posts to evaluate: ${targetPosts.length}`);

    for (let i = 0; i < targetPosts.length; i++) {
      const post = targetPosts[i];
      addLog(`[Post ${i + 1}/${targetPosts.length}] Evaluating: "${post.title}" (ID: ${post.id})`);

      let postPubHostname = defaultPubHostname;
      if (post.url?.includes('//')) {
        try { postPubHostname = new URL(post.url).hostname; } catch {}
      }

      // Check for existing comments
      let alreadyCommented = false;
      try {
        addLog(`Checking for existing comments on post ${post.id}...`);
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
        addLog(`Warning: Could not check comments: ${e.message}. Proceeding.`);
      }

      if (alreadyCommented) {
        addLog(`Skipping: Already commented on this post.`);
        results.push({ postTitle: post.title, url: post.url, matched: false, status: 'already_commented' });
        continue;
      }

      // AI analysis
      addLog(`Sending to AI for relevance analysis...`);
      const aiResult = await analyzeAndGenerateComment({
        postTitle: post.title, postSubtitle: post.subtitle, postBody: post.body,
        keyword, commentInstruction, provider, model, apiKey,
      });

      if (!aiResult.matched || !aiResult.comment) {
        addLog(`AI: Not relevant. Skipping.`);
        results.push({ postTitle: post.title, url: post.url, matched: false, status: 'skipped' });
        continue;
      }

      addLog(`AI: MATCHED! Comment: "${aiResult.comment}"`);
      addLog(`Posting comment...`);

      // Post comment
      const commentEndpoint = `https://${postPubHostname}/api/v1/post/${post.id}/comment`;
      let postCommentOk = false;
      try {
        await ensureHttpClientPatched();
        const gotScraping = getGotScraping();
        await gotScraping({
          url: commentEndpoint, method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `connect.sid=${currentSid}`,
            'Origin': `https://${postPubHostname}`,
            'Referer': `https://${postPubHostname}/p/${post.id}`,
          },
          body: JSON.stringify({ body: aiResult.comment }),
          responseType: 'json', retry: { limit: 0 },
        });
        postCommentOk = true;
      } catch (err: any) {
        const status = err.response?.statusCode || 500;
        const msg = err.response?.body ? JSON.stringify(err.response.body) : err.message;
        addLog(`Error: Failed to post comment (HTTP ${status}): ${msg}`);
        results.push({ postTitle: post.title, url: post.url, matched: true, comment: aiResult.comment, status: `failed: ${status}` });
      }

      if (postCommentOk) {
        addLog(`Success! Comment posted on "${post.title}"`);
        saveCommentToHistory({
          postTitle: post.title, postUrl: post.url,
          body: aiResult.comment, publishedAt: new Date().toISOString(),
        });
        results.push({ postTitle: post.title, url: post.url, matched: true, comment: aiResult.comment, status: 'success' });
      }

      addLog(`Sleeping 2 seconds...`);
      await sleep(2000);
    }

    addLog(`Comment automation finished.`);
    res.json({ success: true, data: { logs, results } });
  } catch (err: any) {
    console.error('Tool automate-comments error:', err);
    addLog(`Fatal Error: ${err.message}`);
    res.status(500).json({ success: false, error: err.message || 'Failed to complete comment automation', data: { logs } });
  }
});


// ─── GET /api/tools/list-newsletters ───
router.get('/list-newsletters', async (_req: Request, res: Response) => {
  try {
    const conn = await ensureConnected();
    if (!conn.success) {
      res.status(401).json({ success: false, error: conn.error });
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
        url: post.canonical_url || `https://${pubHostname}/p/${post.slug || post.id}`,
      });
    }

    res.json({ success: true, data: { posts } });
  } catch (err: any) {
    console.error('Tool list-newsletters error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch newsletters' });
  }
});


// ─── GET /api/tools/list-notes ───
router.get('/list-notes', async (_req: Request, res: Response) => {
  try {
    const conn = await ensureConnected();
    if (!conn.success) {
      res.status(401).json({ success: false, error: conn.error });
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
        url: ownProfile.slug
          ? `https://substack.com/@${ownProfile.slug}/note/${cleanNoteId}`
          : 'https://substack.com/notes',
      });
    }

    res.json({ success: true, data: { notes } });
  } catch (err: any) {
    console.error('Tool list-notes error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch notes' });
  }
});


// ─── GET /api/tools/list-comments ───
router.get('/list-comments', (_req: Request, res: Response) => {
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
    res.json({ success: true, data: { comments: history } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch comments history' });
  }
});


export default router;
