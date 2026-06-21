#!/usr/bin/env node

/**
 * Substack Automation — MCP Server
 * 
 * Model Context Protocol server that exposes Substack automation
 * as native tools for Claude Desktop, Claude Code, Cursor, etc.
 * 
 * Usage:
 *   npx tsx src/mcp-server.ts
 * 
 * Claude Desktop config (claude_desktop_config.json):
 *   {
 *     "mcpServers": {
 *       "substack": {
 *         "command": "npx",
 *         "args": ["tsx", "/absolute/path/to/src/mcp-server.ts"],
 *         "env": {
 *           "SUBSTACK_SID": "your-sid-cookie",
 *           "SUBSTACK_PUB_URL": "yourname.substack.com"
 *         }
 *       }
 *     }
 *   }
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  ensureConnected,
  substackClient,
  ownProfile,
  currentSid,
  ensureHttpClientPatched,
  getGotScraping,
  getPubHostname,
} from './lib/substack-client.js';
import { analyzeAndGenerateComment } from './ai/generate.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Load .env file ───
const loadEnv = () => {
  const paths = [
    path.join(process.cwd(), '.env'),
    path.join(__dirname, '..', '.env'),
  ];
  for (const envPath of paths) {
    if (fs.existsSync(envPath)) {
      try {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;
          const index = trimmed.indexOf('=');
          if (index > 0) {
            const key = trimmed.substring(0, index).trim();
            let val = trimmed.substring(index + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            process.env[key] = val;
          }
        });
        break;
      } catch (e) {
        console.error('Failed to load env from', envPath, e);
      }
    }
  }
};
loadEnv();

// ─── Helpers ───

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function saveCommentToHistory(comment: { postTitle: string; postUrl: string; body: string; publishedAt: string }) {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const filePath = path.join(dataDir, 'comments_history.json');
    let history: any[] = [];
    if (fs.existsSync(filePath)) {
      try { history = JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch { history = []; }
    }
    history.unshift(comment);
    fs.writeFileSync(filePath, JSON.stringify(history, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save comment to history:', err);
  }
}

function parseInlineText(text: string): any[] {
  const tokens: any[] = [];
  const pattern = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let lastIndex = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) tokens.push({ type: 'text', text: text.substring(lastIndex, match.index) });
    if (match[1]) tokens.push({ type: 'text', text: match[2], marks: [{ type: 'strong' }] });
    else if (match[3]) tokens.push({ type: 'text', text: match[4], marks: [{ type: 'em' }] });
    else if (match[5]) tokens.push({ type: 'text', text: match[5], marks: [{ type: 'code' }] });
    else if (match[6]) tokens.push({ type: 'text', text: match[6], marks: [{ type: 'link', attrs: { href: match[7] } }] });
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) tokens.push({ type: 'text', text: text.substring(lastIndex) });
  if (tokens.length === 0) tokens.push({ type: 'text', text: text || ' ' });
  return tokens;
}

function markdownToProseMirror(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const content: any[] = [];
  let currentList: any = null;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { if (currentList) { content.push(currentList); currentList = null; } continue; }
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const isOrdered = /^\d+\.\s/.test(trimmed);
    if (isBullet) {
      if (!currentList || currentList.type !== 'bullet_list') { if (currentList) content.push(currentList); currentList = { type: 'bullet_list', content: [] }; }
      currentList.content.push({ type: 'list_item', content: [{ type: 'paragraph', content: parseInlineText(trimmed.substring(2).trim()) }] });
      continue;
    }
    if (isOrdered) {
      if (!currentList || currentList.type !== 'ordered_list') { if (currentList) content.push(currentList); currentList = { type: 'ordered_list', content: [] }; }
      currentList.content.push({ type: 'list_item', content: [{ type: 'paragraph', content: parseInlineText(trimmed.replace(/^\d+\.\s+/, '').trim()) }] });
      continue;
    }
    if (currentList) { content.push(currentList); currentList = null; }
    if (trimmed.startsWith('#')) {
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      content.push({ type: 'heading', attrs: { level: Math.min(level, 6) }, content: parseInlineText(trimmed.replace(/^#+\s+/, '').trim()) });
      continue;
    }
    if (trimmed.startsWith('>')) {
      content.push({ type: 'blockquote', content: [{ type: 'paragraph', content: parseInlineText(trimmed.substring(1).trim()) }] });
      continue;
    }
    content.push({ type: 'paragraph', content: parseInlineText(trimmed) });
  }
  if (currentList) content.push(currentList);
  return JSON.stringify({ type: 'doc', content });
}

async function resolveTargetInfo(target: string) {
  let slug = '', hostname = '';
  let profileId: number | null = null;
  target = target.trim();
  if (/^\d+$/.test(target)) { profileId = Number(target); }
  else if (target.includes('//') || target.includes('.')) {
    let cleanUrl = target.replace(/^(https?:\/\/)?(www\.)?/, '');
    if (cleanUrl.includes('substack.com/@')) { slug = cleanUrl.split('substack.com/@')[1].split('/')[0].split('?')[0]; }
    else if (cleanUrl.includes('substack.com/profile/')) {
      const idPart = cleanUrl.split('substack.com/profile/')[1].split('/')[0].split('-')[0];
      if (/^\d+$/.test(idPart)) profileId = Number(idPart); else slug = cleanUrl.split('substack.com/profile/')[1].split('/')[0];
    }
    else { hostname = cleanUrl.split('/')[0].split('?')[0]; }
  }
  else { slug = target.replace(/^@/, ''); }
  return { slug, hostname, profileId };
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MCP SERVER DEFINITION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const server = new Server(
  {
    name: 'substack-automation',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);


// ─── List Tools ───

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'publish_newsletter',
        description: 'Publish a newsletter post to Substack. Provide a title, subtitle, and body in Markdown format. Set isDraft to false to publish live and email subscribers.',
        inputSchema: {
          type: 'object' as const,
          required: ['title', 'body'],
          properties: {
            title: { type: 'string', description: 'The title of the newsletter post' },
            subtitle: { type: 'string', description: 'Optional subtitle / teaser line' },
            body: { type: 'string', description: 'Full body content in Markdown format' },
            isDraft: { type: 'boolean', description: 'If true (default), saves as draft. If false, publishes and emails subscribers.', default: true },
          },
        },
      },
      {
        name: 'publish_note',
        description: 'Post a short note on Substack (similar to a tweet). Optionally attach a link.',
        inputSchema: {
          type: 'object' as const,
          required: ['body'],
          properties: {
            body: { type: 'string', description: 'The note content (under 500 characters recommended)' },
            link: { type: 'string', description: 'Optional URL to attach as a link card' },
          },
        },
      },
      {
        name: 'post_comment',
        description: 'Post a comment on a specific Substack post. Provide either a postUrl or postId.',
        inputSchema: {
          type: 'object' as const,
          required: ['comment'],
          properties: {
            postUrl: { type: 'string', description: 'Full URL of the Substack post (e.g. https://example.substack.com/p/some-post)' },
            postId: { type: 'number', description: 'Numeric Substack post ID' },
            comment: { type: 'string', description: 'The comment text to post' },
          },
        },
      },
      {
        name: 'automate_comments',
        description: 'Scan a target Substack account\'s recent posts, use AI to check relevance to a keyword, and auto-post comments on matching posts. Requires AI provider credentials.',
        inputSchema: {
          type: 'object' as const,
          required: ['targetAccount', 'keyword', 'provider', 'model', 'apiKey'],
          properties: {
            targetAccount: { type: 'string', description: 'Target: @username, profile ID, or publication URL' },
            keyword: { type: 'string', description: 'Keyword/phrase to match posts against' },
            commentInstruction: { type: 'string', description: 'Custom instructions for comment style' },
            provider: { type: 'string', enum: ['groq', 'gemini', 'openai'], description: 'AI provider' },
            model: { type: 'string', description: 'AI model name' },
            apiKey: { type: 'string', description: 'AI provider API key' },
          },
        },
      },
      {
        name: 'list_newsletters',
        description: 'List the 25 most recent newsletters from your Substack publication.',
        inputSchema: {
          type: 'object' as const,
          properties: {},
        },
      },
      {
        name: 'list_notes',
        description: 'List the 25 most recent notes from your Substack profile.',
        inputSchema: {
          type: 'object' as const,
          properties: {},
        },
      },
      {
        name: 'list_comments',
        description: 'List your comment history — all comments posted through the automation system.',
        inputSchema: {
          type: 'object' as const,
          properties: {},
        },
      },
    ],
  };
});


// ─── Call Tool ───

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {

      // ━━━ publish_newsletter ━━━
      case 'publish_newsletter': {
        const conn = await ensureConnected();
        if (!conn.success) return { content: [{ type: 'text', text: `Error: ${conn.error}` }], isError: true };

        const { title, subtitle, body, isDraft } = args as any;
        if (!title || !body) return { content: [{ type: 'text', text: 'Error: title and body are required.' }], isError: true };

        const docJson = markdownToProseMirror(body);
        const bylines = [{ id: ownProfile.id, is_guest: false }];
        const payload = { draft_title: title, draft_subtitle: subtitle || undefined, draft_body: docJson, draft_bylines: bylines, type: 'newsletter', audience: 'everyone' };

        const response = await (substackClient as any).publicationClient.post('/api/v1/drafts', payload);
        if (!response?.id) return { content: [{ type: 'text', text: 'Error: Failed to create draft on Substack.' }], isError: true };

        const pubHostname = getPubHostname();

        if (isDraft === false) {
          try { await (substackClient as any).publicationClient.get(`/api/v1/drafts/${response.id}/prepublish`); } catch {}
          const publishResponse = await (substackClient as any).publicationClient.post(`/api/v1/drafts/${response.id}/publish`, { send: true, share_automatically: false });
          const slug = publishResponse?.slug || response.slug || '';
          const postUrl = slug ? `https://${pubHostname}/p/${slug}` : `https://${pubHostname}/publish/post/${response.id}`;
          return { content: [{ type: 'text', text: `Newsletter published successfully!\n\nTitle: ${response.title || title}\nStatus: Published & emailed to subscribers\nURL: ${postUrl}` }] };
        }

        const draftUrl = `https://${pubHostname}/publish/post/${response.id}`;
        return { content: [{ type: 'text', text: `Newsletter draft saved!\n\nTitle: ${response.title || title}\nStatus: Draft (not published)\nURL: ${draftUrl}` }] };
      }

      // ━━━ publish_note ━━━
      case 'publish_note': {
        const conn = await ensureConnected();
        if (!conn.success) return { content: [{ type: 'text', text: `Error: ${conn.error}` }], isError: true };

        const { body, link } = args as any;
        if (!body) return { content: [{ type: 'text', text: 'Error: body is required.' }], isError: true };

        let response;
        if (link) response = await ownProfile.newNoteWithLink(link).paragraph().text(body).publish();
        else response = await ownProfile.newNote().paragraph().text(body).publish();

        if (!response?.id) return { content: [{ type: 'text', text: 'Error: Failed to create note.' }], isError: true };

        const noteUrl = ownProfile.slug ? `https://substack.com/@${ownProfile.slug}/note/c-${response.id}` : 'https://substack.com/notes';
        return { content: [{ type: 'text', text: `Note published!\n\nBody: ${body}\nURL: ${noteUrl}` }] };
      }

      // ━━━ post_comment ━━━
      case 'post_comment': {
        const conn = await ensureConnected();
        if (!conn.success) return { content: [{ type: 'text', text: `Error: ${conn.error}` }], isError: true };

        const { postUrl, postId, comment } = args as any;
        if (!comment) return { content: [{ type: 'text', text: 'Error: comment is required.' }], isError: true };
        if (!postUrl && !postId) return { content: [{ type: 'text', text: 'Error: Either postUrl or postId is required.' }], isError: true };

        let resolvedPostId = postId;
        let postPubHostname = getPubHostname();

        if (postUrl) {
          try {
            const urlObj = new URL(postUrl);
            postPubHostname = urlObj.hostname;
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            if (pathParts[0] === 'p' && pathParts[1]) {
              if (/^\d+$/.test(pathParts[1])) resolvedPostId = Number(pathParts[1]);
              else {
                const lookupRes = await fetch(`https://${postPubHostname}/api/v1/posts/${pathParts[1]}`);
                if (lookupRes.ok) { const data = await lookupRes.json() as any; resolvedPostId = data.id; }
              }
            }
          } catch {}
        }

        if (!resolvedPostId) return { content: [{ type: 'text', text: 'Error: Could not determine post ID.' }], isError: true };

        await ensureHttpClientPatched();
        const gotScraping = getGotScraping();
        await gotScraping({
          url: `https://${postPubHostname}/api/v1/post/${resolvedPostId}/comment`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Cookie': `connect.sid=${currentSid}`, 'Origin': `https://${postPubHostname}`, 'Referer': `https://${postPubHostname}/p/${resolvedPostId}` },
          body: JSON.stringify({ body: comment }),
          responseType: 'json', retry: { limit: 0 },
        });

        saveCommentToHistory({ postTitle: `Post ${resolvedPostId}`, postUrl: postUrl || `https://${postPubHostname}/p/${resolvedPostId}`, body: comment, publishedAt: new Date().toISOString() });
        return { content: [{ type: 'text', text: `Comment posted successfully on post ${resolvedPostId}!\n\nComment: ${comment}` }] };
      }

      // ━━━ automate_comments ━━━
      case 'automate_comments': {
        const conn = await ensureConnected();
        if (!conn.success) return { content: [{ type: 'text', text: `Error: ${conn.error}` }], isError: true };

        const { targetAccount, keyword, commentInstruction, provider, model, apiKey } = args as any;
        if (!targetAccount || !keyword || !provider || !model || !apiKey) {
          return { content: [{ type: 'text', text: 'Error: targetAccount, keyword, provider, model, and apiKey are all required.' }], isError: true };
        }

        const logs: string[] = [];
        const results: any[] = [];
        const addLog = (msg: string) => { logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`); };

        addLog(`Starting automation for keyword: "${keyword}"`);
        const target = await resolveTargetInfo(targetAccount);
        let targetPosts: any[] = [];
        let defaultPubHostname = 'substack.com';

        if (target.profileId) {
          const profile = await substackClient.profileForId(target.profileId);
          addLog(`Found profile: ${profile.name || 'Unknown'}`);
          for await (const post of profile.posts({ limit: 10 })) {
            targetPosts.push({ id: post.id, title: post.title, subtitle: post.subtitle || '', body: post.body || post.truncatedBody || '', url: `https://substack.com/p/${post.id}` });
          }
        } else if (target.slug) {
          const profile = await substackClient.profileForSlug(target.slug);
          addLog(`Found profile: ${profile.name || 'Unknown'}`);
          for await (const post of profile.posts({ limit: 10 })) {
            targetPosts.push({ id: post.id, title: post.title, subtitle: post.subtitle || '', body: post.body || post.truncatedBody || '', url: `https://substack.com/p/${post.id}` });
          }
        } else if (target.hostname) {
          defaultPubHostname = target.hostname;
          const archiveRes = await fetch(`https://${target.hostname}/api/v1/archive?limit=10`);
          if (!archiveRes.ok) return { content: [{ type: 'text', text: `Error: Failed to fetch archive from ${target.hostname}` }], isError: true };
          const archiveData = (await archiveRes.json()) as any;
          let rawPosts: any[] = Array.isArray(archiveData) ? archiveData : (archiveData?.posts || []);
          for (const p of rawPosts) {
            targetPosts.push({ id: p.id, title: p.title || '', subtitle: p.subtitle || '', body: p.truncated_body_text || '', url: p.canonical_url || `https://${target.hostname}/p/${p.id}` });
          }
        }

        addLog(`Found ${targetPosts.length} posts to evaluate.`);

        for (let i = 0; i < targetPosts.length; i++) {
          const post = targetPosts[i];
          let postPubHostname = defaultPubHostname;
          if (post.url?.includes('//')) { try { postPubHostname = new URL(post.url).hostname; } catch {} }

          // Check existing comments
          let alreadyCommented = false;
          try {
            const commentsRes = await fetch(`https://${postPubHostname}/api/v1/post/${post.id}/comments`);
            if (commentsRes.ok) {
              const data = (await commentsRes.json()) as any;
              alreadyCommented = (data.comments || []).some((c: any) => {
                const aid = c.author_id || c.user_id || c.author?.id;
                return aid === ownProfile.id || (c.author_name || c.author?.name) === ownProfile.name;
              });
            }
          } catch {}

          if (alreadyCommented) { addLog(`[${i + 1}] "${post.title}" — already commented, skipping.`); results.push({ postTitle: post.title, status: 'already_commented' }); continue; }

          const aiResult = await analyzeAndGenerateComment({ postTitle: post.title, postSubtitle: post.subtitle, postBody: post.body, keyword, commentInstruction, provider, model, apiKey });

          if (!aiResult.matched || !aiResult.comment) { addLog(`[${i + 1}] "${post.title}" — not relevant, skipping.`); results.push({ postTitle: post.title, status: 'skipped' }); continue; }

          addLog(`[${i + 1}] "${post.title}" — MATCHED! Posting: "${aiResult.comment}"`);

          try {
            await ensureHttpClientPatched();
            const gotScraping = getGotScraping();
            await gotScraping({
              url: `https://${postPubHostname}/api/v1/post/${post.id}/comment`, method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Cookie': `connect.sid=${currentSid}`, 'Origin': `https://${postPubHostname}`, 'Referer': `https://${postPubHostname}/p/${post.id}` },
              body: JSON.stringify({ body: aiResult.comment }), responseType: 'json', retry: { limit: 0 },
            });
            addLog(`[${i + 1}] Comment posted successfully!`);
            saveCommentToHistory({ postTitle: post.title, postUrl: post.url, body: aiResult.comment, publishedAt: new Date().toISOString() });
            results.push({ postTitle: post.title, comment: aiResult.comment, status: 'success' });
          } catch (err: any) {
            addLog(`[${i + 1}] Failed to post: ${err.message}`);
            results.push({ postTitle: post.title, comment: aiResult.comment, status: `failed: ${err.message}` });
          }

          await sleep(2000);
        }

        addLog('Automation finished.');
        const summary = results.map((r) => `• ${r.postTitle}: ${r.status}${r.comment ? ` — "${r.comment.substring(0, 80)}..."` : ''}`).join('\n');
        return { content: [{ type: 'text', text: `Comment automation complete!\n\n${summary}\n\n--- Logs ---\n${logs.join('\n')}` }] };
      }

      // ━━━ list_newsletters ━━━
      case 'list_newsletters': {
        const conn = await ensureConnected();
        if (!conn.success) return { content: [{ type: 'text', text: `Error: ${conn.error}` }], isError: true };

        const pubHostname = getPubHostname();
        const response = await (substackClient as any).publicationClient.get('/api/v1/archive?limit=25');
        const rawPosts = Array.isArray(response) ? response : (response.posts || []);
        const lines = rawPosts.map((p: any, i: number) => {
          const date = p.post_date || p.published_date || 'unknown';
          return `${i + 1}. "${p.title}" (${date})\n   ${p.canonical_url || `https://${pubHostname}/p/${p.slug || p.id}`}`;
        });
        return { content: [{ type: 'text', text: `Your ${rawPosts.length} most recent newsletters:\n\n${lines.join('\n\n')}` }] };
      }

      // ━━━ list_notes ━━━
      case 'list_notes': {
        const conn = await ensureConnected();
        if (!conn.success) return { content: [{ type: 'text', text: `Error: ${conn.error}` }], isError: true };

        const notes: any[] = [];
        for await (const note of ownProfile.notes({ limit: 25 })) {
          notes.push(note);
        }
        const lines = notes.map((n: any, i: number) => {
          const noteId = String(n.id);
          const cleanId = noteId.startsWith('c-') ? noteId : `c-${noteId}`;
          const url = ownProfile.slug ? `https://substack.com/@${ownProfile.slug}/note/${cleanId}` : 'https://substack.com/notes';
          return `${i + 1}. "${(n.body || '').substring(0, 100)}..." (Likes: ${n.likesCount || 0})\n   ${url}`;
        });
        return { content: [{ type: 'text', text: `Your ${notes.length} most recent notes:\n\n${lines.join('\n\n')}` }] };
      }

      // ━━━ list_comments ━━━
      case 'list_comments': {
        const filePath = path.join(process.cwd(), 'src', 'data', 'comments_history.json');
        let history: any[] = [];
        if (fs.existsSync(filePath)) {
          try { history = JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch { history = []; }
        }
        if (history.length === 0) return { content: [{ type: 'text', text: 'No comments in history yet.' }] };
        const lines = history.map((c: any, i: number) => `${i + 1}. On "${c.postTitle}" (${c.publishedAt})\n   Comment: "${c.body.substring(0, 100)}..."\n   ${c.postUrl}`);
        return { content: [{ type: 'text', text: `Your ${history.length} most recent comments:\n\n${lines.join('\n\n')}` }] };
      }

      default:
        return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
    }
  } catch (err: any) {
    return { content: [{ type: 'text', text: `Error executing ${name}: ${err.message}` }], isError: true };
  }
});


// ━━━ Start Server ━━━
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[MCP] Substack Automation MCP server started (stdio transport)');
}

main().catch((err) => {
  console.error('[MCP] Fatal error:', err);
  process.exit(1);
});
