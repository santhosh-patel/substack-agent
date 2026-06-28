import { ensureConnected, getPubHostname, substackClient } from './substack-client.js';
import type { GeneratedImage } from '../ai/generate-image.js';

export interface UploadedSubstackImage {
  url: string;
  bytes: number;
  contentType: string;
  width: number;
  height: number;
}

export function buildCaptionedImageNode(options: {
  src: string;
  width: number;
  height: number;
  bytes: number;
  contentType: string;
  draftId?: string | number;
  pubHostname?: string;
  topImage?: boolean;
}) {
  const internalRedirect =
    options.draftId && options.pubHostname
      ? `https://${options.pubHostname}/i/${options.draftId}?img=${encodeURIComponent(options.src)}`
      : undefined;

  return {
    type: 'captionedImage',
    content: [
      {
        type: 'image2',
        attrs: {
          src: options.src,
          width: options.width,
          height: options.height,
          bytes: options.bytes,
          type: options.contentType,
          ...(internalRedirect ? { internalRedirect } : {}),
          belowTheFold: false,
          topImage: options.topImage ?? true,
          isProcessing: false,
        },
      },
    ],
  };
}

export function prependNodeToProseMirrorDoc(docJson: string, node: Record<string, unknown>): string {
  const doc = JSON.parse(docJson) as { type: string; content?: Record<string, unknown>[] };
  doc.content = [node, ...(doc.content || [])];
  return JSON.stringify(doc);
}

export async function uploadImageToSubstack(image: GeneratedImage): Promise<UploadedSubstackImage> {
  const connected = await ensureConnected();
  if (!connected.success || !substackClient) {
    throw new Error(connected.error || 'Not connected to Substack');
  }

  const dataUri = `data:${image.mimeType};base64,${image.buffer.toString('base64')}`;
  const response = await (substackClient as any).publicationClient.post('/api/v1/image', {
    image: dataUri,
  });

  const url =
    response?.url ||
    response?.imageUrl ||
    response?.upload?.url ||
    response?.image?.url;

  if (!url || typeof url !== 'string') {
    throw new Error('Substack image upload did not return a URL');
  }

  return {
    url,
    bytes: typeof response?.bytes === 'number' ? response.bytes : image.buffer.length,
    contentType: response?.contentType || image.mimeType,
    width: image.width,
    height: image.height,
  };
}

export async function updateNewsletterDraftBody(
  draftId: string | number,
  draftBody: string,
  meta: {
    title: string;
    subtitle?: string;
    bylineId: number | string;
  }
): Promise<void> {
  if (!substackClient) {
    throw new Error('Not connected to Substack');
  }

  await (substackClient as any).publicationClient.put(`/api/v1/drafts/${draftId}`, {
    draft_title: meta.title,
    draft_subtitle: meta.subtitle || undefined,
    draft_body: draftBody,
    draft_bylines: [{ id: meta.bylineId, is_guest: false }],
    type: 'newsletter',
    audience: 'everyone',
  });
}

export async function attachIllustrationToDraft(options: {
  draftId: string | number;
  docJson: string;
  title: string;
  bodyMarkdown: string;
  subtitle?: string;
  bylineId: number | string;
  openaiApiKey: string;
  addLog?: (msg: string) => void;
}): Promise<string> {
  const log = options.addLog || (() => undefined);

  log('Default mode: generating editorial sketch illustration...');
  const { generatePostIllustration } = await import('../ai/generate-image.js');
  const generated = await generatePostIllustration({
    title: options.title,
    body: options.bodyMarkdown,
    apiKey: options.openaiApiKey,
  });

  log('Uploading illustration to Substack...');
  const uploaded = await uploadImageToSubstack(generated);
  const pubHostname = getPubHostname();
  const imageNode = buildCaptionedImageNode({
    src: uploaded.url,
    width: uploaded.width,
    height: uploaded.height,
    bytes: uploaded.bytes,
    contentType: uploaded.contentType,
    draftId: options.draftId,
    pubHostname,
    topImage: true,
  });

  const docWithImage = prependNodeToProseMirrorDoc(options.docJson, imageNode);
  await updateNewsletterDraftBody(options.draftId, docWithImage, {
    title: options.title,
    subtitle: options.subtitle,
    bylineId: options.bylineId,
  });

  log('Illustration attached to draft.');
  return docWithImage;
}
