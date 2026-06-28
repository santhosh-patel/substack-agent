// ─── AI Post Generation Module ───
// Unified interface for Groq, Gemini, and OpenAI

import { searchInternet } from '../lib/search.js';

export interface GenerateRequest {
  topic: string;
  provider: 'groq' | 'gemini' | 'openai' | 'openrouter';
  model: string;
  apiKey: string;
  systemPrompt?: string;
}

export interface GeneratedPost {
  title: string;
  subtitle: string;
  body: string;
}

export const AUTHOR_CONTEXT = `Author background (write from this perspective):
I am a passionate Full Stack AI Engineer with over 3 years of experience designing, developing, and deploying intelligent software solutions that combine modern AI with scalable engineering. Experienced in building AI powered products, AI agents, SWE agents, Retrieval Augmented Generation (RAG) systems, multi agent architectures, conversational AI applications, and enterprise automation platforms that solve real business challenges.

I have built and deployed more than 20 production AI systems across startups and enterprise environments, ranging from AI assistants and workflow automation platforms to AWS MCP integrations, OpenClaw based SWE agents, AI audit systems, and knowledge management solutions. I turn complex business requirements into reliable, production ready applications with a focus on scalability, maintainability, and user experience.

Skilled across the full software development lifecycle, from product architecture and MVP development to cloud deployment, optimization, and long term scaling. I build web, desktop, and mobile applications using Python, TypeScript, Node.js, React, FastAPI, Tauri, Android Studio, and modern AI frameworks. Proficient in backend architectures, REST APIs, event driven systems, workflow automation, and cloud native infrastructure. Deep technical expertise includes AI agent orchestration, RAG pipelines, knowledge retrieval, and vector search.`;

export const SYSTEM_PROMPT = `${AUTHOR_CONTEXT}

Write a Substack newsletter post as this author. Keep it simple, small, and brief. Sound like a human sharing what they understood after reading about the topic, not like a polished AI summary or press release.

Writing rules:
1. Tone: Clear, honest, conversational. First person when it feels natural. Write like you are explaining your take to a peer.
2. Length: Under 200 words. Two or three short paragraphs at most.
3. No AI filler: Avoid words like "delve", "tapestry", "revolutionize", "game changer", "beacon", "furthermore", "in conclusion", "moreover", or "it is important to note".
4. No emojis or icons.
5. No hyphens or em dashes for bullet lists. Use plain sentences or numbered lists if needed.
6. Structure: A simple title, a one line subtitle, and a body that gets to the point fast.

Return ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "title": "A short simple title",
  "subtitle": "One brief sentence on what this is about",
  "body": "The full markdown formatted body following all rules above."
}`;

// ─── Groq & OpenAI (both use OpenAI-compatible API) ───

async function callOpenAICompatible(
  endpoint: string,
  apiKey: string,
  model: string,
  topic: string,
  systemPrompt?: string
): Promise<GeneratedPost> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt || SYSTEM_PROMPT },
        { role: 'user', content: `Write a Substack newsletter post about: ${topic}` },
      ],
      temperature: 0.8,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty response from AI');

  return parseAIResponse(content);
}

// ─── Gemini ───

async function callGemini(
  apiKey: string,
  model: string,
  topic: string,
  systemPrompt?: string
): Promise<GeneratedPost> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `${systemPrompt || SYSTEM_PROMPT}\n\nWrite a Substack newsletter post about: ${topic}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!content) throw new Error('Empty response from Gemini');

  return parseAIResponse(content);
}

// ─── Response Parser ───

function escapeControlCharsInJsonStrings(jsonStr: string): string {
  let result = '';
  let inString = false;
  let isEscaped = false;

  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];

    if (inString) {
      if (isEscaped) {
        result += char;
        isEscaped = false;
      } else if (char === '\\') {
        result += char;
        isEscaped = true;
      } else if (char === '"') {
        result += char;
        inString = false;
      } else if (char === '\n') {
        result += '\\n';
      } else if (char === '\r') {
        result += '\\r';
      } else if (char === '\t') {
        result += '\\t';
      } else {
        result += char;
      }
    } else {
      result += char;
      if (char === '"') {
        inString = true;
        isEscaped = false;
      }
    }
  }

  return result;
}

function parseAIResponse(raw: string): GeneratedPost {
  let cleaned = raw.trim();

  // Find the JSON block by finding the first '{' and the last '}'
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.substring(start, end + 1);
  } else {
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
  }

  try {
    const escaped = escapeControlCharsInJsonStrings(cleaned);
    const parsed = JSON.parse(escaped);
    return {
      title: parsed.title || 'Untitled Post',
      subtitle: parsed.subtitle || '',
      body: parsed.body || '',
    };
  } catch (err) {
    console.error('Failed to parse AI response JSON:', err);
    return {
      title: 'Generated Post',
      subtitle: '',
      body: raw,
    };
  }
}

// ─── Public API ───

export const DEFAULT_AI_MODELS: Record<'groq' | 'gemini' | 'openai' | 'openrouter', string> = {
  groq: 'llama-3.3-70b-versatile',
  gemini: 'gemini-2.5-flash',
  openai: 'gpt-4o-mini',
  openrouter: 'openrouter/free:online',
};

export async function generatePost(req: GenerateRequest): Promise<GeneratedPost> {
  const { topic, provider, model, apiKey, systemPrompt } = req;

  switch (provider) {
    case 'groq':
      return callOpenAICompatible(
        'https://api.groq.com/openai/v1/chat/completions',
        apiKey,
        model,
        topic,
        systemPrompt
      );

    case 'openai':
      return callOpenAICompatible(
        'https://api.openai.com/v1/chat/completions',
        apiKey,
        model,
        topic,
        systemPrompt
      );

    case 'openrouter':
      return callOpenAICompatible(
        'https://openrouter.ai/api/v1/chat/completions',
        apiKey,
        model,
        topic,
        systemPrompt
      );

    case 'gemini':
      return callGemini(apiKey, model, topic, systemPrompt);

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

// ─── Web research → title, subtitle, body ───

export interface WebResearchResult {
  post: GeneratedPost;
  searchQuery: string;
  searchResults: string;
}

export function deriveResearchSearchQuery(guidelines: string, titleHint?: string): string {
  const body = guidelines?.trim() || '';
  const title = titleHint?.trim() || '';
  if (title && body) {
    return `${title}. ${body.substring(0, 200)}`;
  }
  return title || body || 'latest technology and AI engineering news';
}

export function buildWebResearchNewsletterPrompt(guidelines: string, searchResults: string): string {
  return [
    'Write a complete Substack newsletter using live web research.',
    '',
    'Author guidelines (tone, angle, audience):',
    guidelines,
    '',
    'Web search results:',
    searchResults,
    '',
    'Your tasks:',
    '1. Read the search results and pick the SINGLE best, most timely topic or news angle that fits the guidelines.',
    '2. Write a specific title about that chosen topic (not generic — name the news, product, or trend).',
    '3. Write a one-sentence subtitle that adds context or your angle.',
    '4. Write the full post body grounded in the search results. Keep it brief and human.',
    '',
    'Return JSON with title, subtitle, and body only.',
  ].join('\n');
}

export function buildWebResearchNotePrompt(topic: string, searchResults: string): string {
  return [
    'Write a Substack Note using live web research.',
    '',
    'Topic / guidelines:',
    topic,
    '',
    'Web search results:',
    searchResults,
    '',
    'Pick the best timely angle from the results and write one concise note grounded in what you found.',
  ].join('\n');
}

export function buildOnlineModelNewsletterPrompt(guidelines: string): string {
  return [
    'Search the web for the latest news related to these guidelines, then write a complete Substack newsletter.',
    '',
    'Author guidelines:',
    guidelines,
    '',
    'Pick the best timely topic you find. Generate a specific title, one-sentence subtitle, and brief post body.',
  ].join('\n');
}

export async function generateNewsletterWithWebResearch(
  req: GenerateRequest & { searchQuery?: string }
): Promise<WebResearchResult> {
  const guidelines = req.topic.trim();
  const searchQuery = req.searchQuery?.trim() || deriveResearchSearchQuery(guidelines);

  if (req.provider === 'openrouter' && req.model === 'openrouter/free:online') {
    const post = await generatePost({
      ...req,
      topic: buildOnlineModelNewsletterPrompt(guidelines),
    });
    return { post, searchQuery, searchResults: '' };
  }

  const searchResults = await searchInternet(searchQuery);
  const prompt = buildWebResearchNewsletterPrompt(guidelines, searchResults);
  const post = await generatePost({ ...req, topic: prompt });
  return { post, searchQuery, searchResults };
}

export async function generateNoteWithWebResearch(
  req: GenerateRequest & { searchQuery?: string }
): Promise<{ body: string; searchQuery: string; searchResults: string }> {
  const topic = req.topic.trim();
  const searchQuery = req.searchQuery?.trim() || topic;

  if (req.provider === 'openrouter' && req.model === 'openrouter/free:online') {
    const note = await generateNote({
      ...req,
      topic: `${topic}\n\nSearch the web for the latest on this topic and write a concise note.`,
    });
    return { body: note.body, searchQuery, searchResults: '' };
  }

  const searchResults = await searchInternet(searchQuery);
  const prompt = buildWebResearchNotePrompt(topic, searchResults);
  const note = await generateNote({ ...req, topic: prompt });
  return { body: note.body, searchQuery, searchResults };
}

// ─── Comment Analysis & Generation ───

export interface CommentAnalysisRequest {
  postTitle: string;
  postSubtitle: string;
  postBody: string;
  keyword: string;
  commentInstruction?: string;
  provider: 'groq' | 'gemini' | 'openai' | 'openrouter';
  model: string;
  apiKey: string;
}

export interface CommentAnalysisResponse {
  matched: boolean;
  comment?: string;
}

function parseCommentResponse(raw: string): CommentAnalysisResponse {
  let cleaned = raw.trim();

  // Find the JSON block by finding the first '{' and the last '}'
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.substring(start, end + 1);
  } else {
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
  }

  try {
    const escaped = escapeControlCharsInJsonStrings(cleaned);
    const parsed = JSON.parse(escaped);
    return {
      matched: parsed.matched === true,
      comment: parsed.comment || undefined,
    };
  } catch (err) {
    console.error('Failed to parse AI comment response JSON:', err);
    return {
      matched: false,
    };
  }
}

async function callAIForComment(
  provider: string,
  model: string,
  apiKey: string,
  systemPrompt: string,
  userContent: string
): Promise<CommentAnalysisResponse> {
  if (provider === 'groq' || provider === 'openai' || provider === 'openrouter') {
    const endpoint = provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : provider === 'openai'
      ? 'https://api.openai.com/v1/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`AI API error (${res.status}): ${err}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Empty response from AI');
    return parseCommentResponse(content);

  } else if (provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\nUser Content:\n${userContent}` },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${err}`);
    }

    const data = await res.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!content) throw new Error('Empty response from Gemini');
    return parseCommentResponse(content);
  } else {
    throw new Error(`Unknown provider: ${provider}`);
  }
}

export async function analyzeAndGenerateComment(req: CommentAnalysisRequest): Promise<CommentAnalysisResponse> {
  const systemPrompt = `You are an AI assistant analyzing a Substack blog post to determine if it is relevant/similar/connected to a specific keyword or sentence, and writing a short, context-appropriate comment if it matches.

Interest Keyword/Sentence: "${req.keyword}"

You MUST evaluate if the post is relevant to the keyword/sentence.

Return ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "matched": true or false,
  "comment": "If matched is true, write a simple, natural, context-aware comment for this post. It must be a single paragraph, feel authentic and human, and not contain any emojis or hashtags under any circumstances. If matched is false, this can be empty."
}`;

  const userContent = `Post Title: "${req.postTitle}"
Post Subtitle: "${req.postSubtitle}"
Post Content: "${req.postBody}"

${req.commentInstruction ? `Specific Comment Guidelines: ${req.commentInstruction}` : ''}`;

  return callAIForComment(req.provider, req.model, req.apiKey, systemPrompt, userContent);
}

// ─── Note AI Generation ───

export interface GenerateNoteRequest {
  topic: string;
  provider: 'groq' | 'gemini' | 'openai' | 'openrouter';
  model: string;
  apiKey: string;
  systemPrompt?: string;
}

export interface GeneratedNote {
  body: string;
}

export const NOTE_SYSTEM_PROMPT = `${AUTHOR_CONTEXT}

Write a Substack Note as this author. Keep it very short. One or two sentences max, like a quick thought you would post after reading something interesting. Simple words. No hype.

Writing rules:
1. Tone: Casual and human. Share what you understood, not a summary essay.
2. Length: Under 280 characters.
3. No AI filler, no emojis, no hyphens or em dashes for lists.
4. First person is fine when it sounds natural.

Return ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "body": "The note body."
}`;

function parseNoteResponse(raw: string): GeneratedNote {
  let cleaned = raw.trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.substring(start, end + 1);
  } else {
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
  }

  try {
    const escaped = escapeControlCharsInJsonStrings(cleaned);
    const parsed = JSON.parse(escaped);
    return {
      body: parsed.body || '',
    };
  } catch (err) {
    console.error('Failed to parse AI note response JSON:', err);
    return {
      body: raw,
    };
  }
}

async function callOpenAICompatibleNote(
  endpoint: string,
  apiKey: string,
  model: string,
  topic: string,
  systemPrompt?: string
): Promise<GeneratedNote> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt || NOTE_SYSTEM_PROMPT },
        { role: 'user', content: `Write a Substack Note about: ${topic}` },
      ],
      temperature: 0.8,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty response from AI');

  return parseNoteResponse(content);
}

async function callGeminiNote(
  apiKey: string,
  model: string,
  topic: string,
  systemPrompt?: string
): Promise<GeneratedNote> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `${systemPrompt || NOTE_SYSTEM_PROMPT}\n\nWrite a Substack Note about: ${topic}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!content) throw new Error('Empty response from Gemini');

  return parseNoteResponse(content);
}

export async function generateNote(req: GenerateNoteRequest): Promise<GeneratedNote> {
  const { topic, provider, model, apiKey, systemPrompt } = req;

  switch (provider) {
    case 'groq':
      return callOpenAICompatibleNote(
        'https://api.groq.com/openai/v1/chat/completions',
        apiKey,
        model,
        topic,
        systemPrompt
      );

    case 'openai':
      return callOpenAICompatibleNote(
        'https://api.openai.com/v1/chat/completions',
        apiKey,
        model,
        topic,
        systemPrompt
      );

    case 'openrouter':
      return callOpenAICompatibleNote(
        'https://openrouter.ai/api/v1/chat/completions',
        apiKey,
        model,
        topic,
        systemPrompt
      );

    case 'gemini':
      return callGeminiNote(apiKey, model, topic, systemPrompt);

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

function getOpenAICompatibleEndpoint(provider: 'groq' | 'openai' | 'openrouter'): string {
  if (provider === 'groq') return 'https://api.groq.com/openai/v1/chat/completions';
  if (provider === 'openai') return 'https://api.openai.com/v1/chat/completions';
  return 'https://openrouter.ai/api/v1/chat/completions';
}

export async function testAIKey(
  provider: GenerateRequest['provider'],
  model: string,
  apiKey: string
): Promise<{ provider: string; model: string; message: string }> {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const resolvedModel = model || DEFAULT_AI_MODELS[provider];

  switch (provider) {
    case 'groq':
    case 'openai':
    case 'openrouter': {
      const res = await fetch(getOpenAICompatibleEndpoint(provider), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: resolvedModel,
          messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
          max_tokens: 8,
          temperature: 0,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API error (${res.status}): ${err}`);
      }

      return {
        provider,
        model: resolvedModel,
        message: 'API key is valid and the model responded successfully.',
      };
    }

    case 'gemini': {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Reply with exactly: OK' }] }],
          generationConfig: { maxOutputTokens: 8, temperature: 0 },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Gemini API error (${res.status}): ${err}`);
      }

      return {
        provider,
        model: resolvedModel,
        message: 'API key is valid and the model responded successfully.',
      };
    }

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

