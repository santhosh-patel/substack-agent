import { Router, Request, Response } from 'express';
import { Marked } from 'marked';
import { generatePost, SYSTEM_PROMPT, analyzeAndGenerateComment, generateNote, NOTE_SYSTEM_PROMPT } from '../ai/generate.js';
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
} from '../lib/substack-client.js';

const router = Router();
const marked = new Marked();

// NOTE: httpClient patching, state management, and auto-connect logic
// are now centralized in ../lib/substack-client.ts and shared with
// the tool routes (/api/tools/*).

// ─── GET /api/config ───
router.get('/config', (_req: Request, res: Response) => {
  res.json({
    sid: process.env.SUBSTACK_SID || '',
    publicationUrl: process.env.SUBSTACK_PUB_URL || process.env.PUBLICATION_URL || '',
    groqApiKey: process.env.GROQ_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
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
    let { topic, provider, model, apiKey, systemPrompt } = req.body;

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
    }

    if (!apiKey) {
      res.status(400).json({ error: 'API key is required' });
      return;
    }

    const post = await generatePost({ topic, provider, model, apiKey, systemPrompt });
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

    const { title, subtitle, body, isDraft } = req.body;

    if (!title || !body) {
      res.status(400).json({ error: 'Title and body are required' });
      return;
    }

    const docJson = markdownToProseMirror(body);
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
    let { topic, provider, model, apiKey, systemPrompt } = req.body;

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
    }

    if (!apiKey) {
      res.status(400).json({ error: 'API key is required' });
      return;
    }

    const note = await generateNote({ topic, provider, model, apiKey, systemPrompt });
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

    const { body, link } = req.body;

    if (!body) {
      res.status(400).json({ error: 'Body is required' });
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

export default router;

