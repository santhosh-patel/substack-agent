// ─── AI Post Generation Module ───
// Unified interface for Groq, Gemini, and OpenAI

export interface GenerateRequest {
  topic: string;
  provider: 'groq' | 'gemini' | 'openai';
  model: string;
  apiKey: string;
  systemPrompt?: string;
}

export interface GeneratedPost {
  title: string;
  subtitle: string;
  body: string;
}

export const SYSTEM_PROMPT = `You are a professional newsletter writer for Substack. Given a topic, generate a compelling blog post.

Return ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "title": "An engaging, click-worthy title",
  "subtitle": "A brief subtitle that hooks the reader",
  "body": "The full post body in Markdown format"
}

Guidelines for the body:
- Start with a compelling hook paragraph
- Use ## headings to break content into sections
- Include bullet points or numbered lists where appropriate
- Write 600-1000 words
- End with a strong conclusion or call-to-action
- Use a conversational, authoritative tone
- Do NOT use any emojis or emoticons under any circumstances. Keep the text completely clean of emojis.`;

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

    case 'gemini':
      return callGemini(apiKey, model, topic, systemPrompt);

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

// ─── Comment Analysis & Generation ───

export interface CommentAnalysisRequest {
  postTitle: string;
  postSubtitle: string;
  postBody: string;
  keyword: string;
  commentInstruction?: string;
  provider: 'groq' | 'gemini' | 'openai';
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
  if (provider === 'groq' || provider === 'openai') {
    const endpoint = provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';

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
  provider: 'groq' | 'gemini' | 'openai';
  model: string;
  apiKey: string;
  systemPrompt?: string;
}

export interface GeneratedNote {
  body: string;
}

export const NOTE_SYSTEM_PROMPT = `You are a professional writer creating Substack Notes. Given a topic, generate a brief, engaging note.

Return ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "body": "The note body. It must be concise (under 500 characters), conversational, and formatted with basic Markdown (bold, italic) if appropriate. Do NOT use emojis under any circumstances."
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

    case 'gemini':
      return callGeminiNote(apiKey, model, topic, systemPrompt);

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}


