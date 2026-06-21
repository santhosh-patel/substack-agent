/**
 * Shared Substack client singleton.
 * Manages session state and provides auto-connect so tool endpoints
 * don't require explicit /api/connect calls.
 */

let httpClientPatched = false;
let gotScraping: any = null;

export let substackClient: any = null;
export let ownProfile: any = null;
export let currentSid: string = '';

/**
 * Decode SID (handles URL-encoded values from .env or browser)
 */
export function decodeSid(raw: string): string {
  if (!raw) return raw;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/**
 * Patch the Substack library's HttpClient to use got-scraping
 * for browser-like TLS/HTTP2 fingerprints (bypass Cloudflare).
 */
export async function ensureHttpClientPatched() {
  if (httpClientPatched) return;
  try {
    const { SubstackClient } = await import('substack-api');
    const gotModule = await import('got-scraping');
    gotScraping = gotModule.gotScraping;
    const tempClient = new SubstackClient({ apiKey: 'temp', hostname: 'substack.com' });
    const HttpClientClass = (tempClient as any).publicationClient.constructor;

    HttpClientClass.prototype.makeRequest = async function (url: string, options: any = {}) {
      let origin = 'https://substack.com';
      try {
        const urlObj = new URL(url);
        origin = `${urlObj.protocol}//${urlObj.hostname}`;
      } catch {}

      const mergedHeaders: Record<string, string> = {
        'Cookie': this.cookie,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': origin,
        'Referer': `${origin}/`,
        ...(options.headers || {}),
      };

      try {
        const response = await gotScraping({
          url,
          method: options.method || 'GET',
          headers: mergedHeaders,
          body: options.body,
          responseType: 'json',
          retry: { limit: 0 },
        });
        return response.body;
      } catch (err: any) {
        if (err.response) {
          throw new Error(`HTTP ${err.response.statusCode}: ${err.response.statusMessage || err.message}`);
        }
        throw err;
      }
    };
    httpClientPatched = true;
    console.log('[Substack] HttpClient patched with got-scraping browser headers & TLS/HTTP2 fingerprints');
  } catch (err) {
    console.error('[Substack] Failed to patch HttpClient with got-scraping:', err);
  }
}

/**
 * Get the initialized gotScraping instance.
 */
export function getGotScraping() {
  return gotScraping;
}

/**
 * Connect to Substack using provided or env-var credentials.
 */
export async function connectSubstack(sid?: string, publicationUrl?: string): Promise<{
  success: boolean;
  profile?: { name: string; slug: string; followerCount: number };
  error?: string;
}> {
  try {
    if (!sid) sid = process.env.SUBSTACK_SID;
    sid = decodeSid(sid || '');

    if (!publicationUrl) {
      publicationUrl = process.env.SUBSTACK_PUB_URL || process.env.PUBLICATION_URL;
    }

    if (!sid) {
      return { success: false, error: 'SID is required' };
    }

    await ensureHttpClientPatched();

    const { SubstackClient } = await import('substack-api');

    let hostname = 'substack.com';
    if (publicationUrl) {
      let cleanUrl = publicationUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
      cleanUrl = cleanUrl.split('/')[0];
      if (cleanUrl) hostname = cleanUrl;
    }

    console.log(`[Substack] Connecting with hostname: ${hostname}`);

    substackClient = new SubstackClient({
      apiKey: sid,
      hostname: hostname,
    });

    try {
      ownProfile = await substackClient.ownProfile();
    } catch (profileErr: any) {
      console.error('[Substack] ownProfile() failed:', profileErr.message);
      substackClient = null;
      ownProfile = null;
      return { success: false, error: 'Authentication failed — check your SID cookie and Publication URL' };
    }

    if (!ownProfile.slug && publicationUrl) {
      let cleanUrl = publicationUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
      cleanUrl = cleanUrl.split('/')[0];
      const parts = cleanUrl.split('.');
      if (parts.length > 2 && parts[1] === 'substack') {
        ownProfile.slug = parts[0];
      } else {
        ownProfile.slug = parts[0];
      }
    }

    currentSid = sid;
    console.log(`[Substack] Connected as: ${ownProfile.name} (@${ownProfile.slug})`);

    return {
      success: true,
      profile: {
        name: ownProfile.name,
        slug: ownProfile.slug,
        followerCount: ownProfile.followerCount,
      },
    };
  } catch (err: any) {
    console.error('Connect error:', err);
    substackClient = null;
    ownProfile = null;
    return { success: false, error: err.message || 'Failed to connect' };
  }
}

/**
 * Disconnect / clear session.
 */
export function disconnectSubstack() {
  substackClient = null;
  ownProfile = null;
  currentSid = '';
  console.log('[Substack] Session disconnected.');
}

/**
 * Ensure connected — auto-connects using env vars if not already connected.
 * Used by tool endpoints so callers don't need explicit /api/connect.
 */
export async function ensureConnected(): Promise<{ success: boolean; error?: string }> {
  if (substackClient && ownProfile && currentSid) {
    return { success: true };
  }

  const result = await connectSubstack();
  if (!result.success) {
    return { success: false, error: result.error };
  }
  return { success: true };
}

/**
 * Get publication hostname from the connected client.
 */
export function getPubHostname(): string {
  if (!substackClient) return 'substack.com';
  return (substackClient as any).publicationClient.baseUrl
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .split('/')[0];
}
