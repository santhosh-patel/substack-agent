// ─── Post illustration generation (Default preset) ───

export interface GeneratedImage {
  buffer: Buffer;
  mimeType: string;
  width: number;
  height: number;
}

const IMAGE_SIZE = '1024x1024';

export function buildIllustrationPrompt(title: string, body: string): string {
  const context = `${title}. ${body}`.replace(/\s+/g, ' ').trim().slice(0, 420);
  return (
    'Editorial sketch illustration for a science and technology newsletter. ' +
    'Soft pencil line art with gentle watercolor washes, muted sage green and cream palette, ' +
    'elegant minimal composition, subtle sense of motion, abstract and symbolic, ' +
    'no text, no words, no letters, no logos, no watermarks. ' +
    `Topic: ${context}`
  );
}

export function resolveOpenAIImageApiKey(options: {
  provider?: string;
  apiKey?: string;
}): string | null {
  if (options.provider === 'openai' && options.apiKey?.trim()) {
    return options.apiKey.trim();
  }
  return process.env.OPENAI_API_KEY?.trim() || null;
}

export async function generatePostIllustration(options: {
  title: string;
  body: string;
  apiKey: string;
}): Promise<GeneratedImage> {
  const prompt = buildIllustrationPrompt(options.title, options.body);

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: IMAGE_SIZE,
      response_format: 'b64_json',
      quality: 'standard',
      style: 'natural',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Image generation failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error('Image generation returned no image data');
  }

  const [width, height] = IMAGE_SIZE.split('x').map(Number);

  return {
    buffer: Buffer.from(b64, 'base64'),
    mimeType: 'image/png',
    width,
    height,
  };
}
