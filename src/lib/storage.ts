import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ScheduledPost {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  isDraft: boolean;
  scheduledAt: string; // ISO string
  recurrence: 'once' | 'daily' | 'twice_daily' | 'alternate_days' | 'weekly';
  postType: 'newsletter' | 'note';
  noteLink?: string; // only if postType === 'note'
  lastRunAt?: string; // ISO string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  errorMessage?: string;
  retryCount?: number;
  processingStartedAt?: string; // ISO string — set while status is processing
  createdAt: string; // ISO string
  
  // Custom automated search & dynamic generation parameters
  enableSearch?: boolean;
  provider?: 'groq' | 'gemini' | 'openai' | 'openrouter';
  model?: string;
  apiKey?: string;
  systemPrompt?: string;
  publishedUrl?: string;
  publishedTitle?: string;
}

const LOCAL_DATA_DIR = process.env.VERCEL === '1' ? '/tmp' : path.join(process.cwd(), 'src', 'data');
const LOCAL_FILE_PATH = path.join(LOCAL_DATA_DIR, 'schedules.json');

export const MAX_SCHEDULE_RETRIES = 3;
const STUCK_PROCESSING_MS = 15 * 60 * 1000;

/** Delay before each retry attempt: 1 min, 5 min, 15 min */
export function calculateRetryDelayMs(retryCount: number): number {
  const delays = [60_000, 5 * 60_000, 15 * 60_000];
  return delays[Math.min(retryCount - 1, delays.length - 1)] ?? 15 * 60_000;
}

/**
 * Check if Vercel KV environment variables are configured.
 */
function isKVEnabled(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Fetch helper with exponential backoff retries for transient KV errors.
 */
async function fetchWithRetry(url: string, options: RequestInit, retries = 2, delay = 200): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  throw new Error('Fetch failed after retries');
}

/**
 * Fetch schedules from Vercel KV via REST API.
 */
async function getKVSchedules(): Promise<ScheduledPost[]> {
  const url = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;
  try {
    const res = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['GET', 'substack_schedules']),
    });

    const data = await res.json() as any;
    if (data && data.result) {
      const parsed = JSON.parse(data.result);
      if (Array.isArray(parsed)) {
        // Validate each item has minimal required fields
        return parsed.filter((item: any): item is ScheduledPost => 
          item && typeof item === 'object' && typeof item.id === 'string' && typeof item.body === 'string'
        );
      }
    }
  } catch (err) {
    console.error('[Storage] Error reading from Vercel KV:', err);
    throw err; // throw instead of returning [] on error so cron doesn't wipe or think there are none
  }
  return [];
}

/**
 * Save schedules to Vercel KV via REST API.
 */
async function saveKVSchedules(schedules: ScheduledPost[]): Promise<void> {
  const url = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;
  try {
    const res = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', 'substack_schedules', JSON.stringify(schedules)]),
    });
    const data = await res.json() as any;
    if (data && data.error) {
      throw new Error(data.error);
    }
  } catch (err) {
    console.error('[Storage] Error writing to Vercel KV:', err);
    throw new Error(`Failed to save schedules to Vercel KV: ${err instanceof Error ? err.message : String(err)}`);
  }
}

/**
 * Read all schedules from local JSON file.
 */
function getLocalSchedules(): ScheduledPost[] {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const content = fs.readFileSync(LOCAL_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('[Storage] Error reading local schedules file:', err);
    return [];
  }
}

/**
 * Write schedules to local JSON file.
 */
function saveLocalSchedules(schedules: ScheduledPost[]): void {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(schedules, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Error writing local schedules file:', err);
    throw new Error(`Failed to save local schedules: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// ─── Public API ───

/**
 * Validate schedule input. Returns error message if invalid, or null if valid.
 */
export function validateScheduledPost(post: any): string | null {
  if (!post || typeof post !== 'object') {
    return 'Invalid post object';
  }
  const isSearchEnabled = post.enableSearch === true;

  if (post.postType === 'note') {
    if (!post.body || typeof post.body !== 'string' || post.body.trim().length === 0) {
      return 'Topic/Prompt is required for notes';
    }
    if (post.body.length > 1000) {
      return 'Note topic is too long (maximum 1000 characters)';
    }
  } else if (post.postType === 'newsletter') {
    if (isSearchEnabled) {
      if ((!post.title || typeof post.title !== 'string' || post.title.trim().length === 0) &&
          (!post.body || typeof post.body !== 'string' || post.body.trim().length === 0)) {
        return 'Either Title/Topic or Writing Guidelines must be provided for newsletters';
      }
    } else {
      if (!post.title || typeof post.title !== 'string' || post.title.trim().length === 0) {
        return 'Title/Topic is required for newsletters';
      }
      if (!post.body || typeof post.body !== 'string' || post.body.trim().length === 0) {
        return 'Body is required for newsletters';
      }
    }
  } else {
    return 'Invalid postType. Must be newsletter or note.';
  }

  if (!post.scheduledAt) {
    return 'Schedule time is required';
  }
  const date = new Date(post.scheduledAt);
  if (isNaN(date.getTime())) {
    return 'Invalid schedule time format';
  }
  if (date.getTime() < Date.now() - 30000) {
    return 'Schedule time must be in the future';
  }

  const recurrences = ['once', 'daily', 'twice_daily', 'alternate_days', 'weekly'];
  if (post.recurrence && !recurrences.includes(post.recurrence)) {
    return `Invalid recurrence. Must be one of: ${recurrences.join(', ')}`;
  }

  return null;
}

/**
 * Get all scheduled posts.
 */
export async function getSchedules(): Promise<ScheduledPost[]> {
  if (isKVEnabled()) {
    return await getKVSchedules();
  }
  return getLocalSchedules();
}

/**
 * Save all schedules.
 */
export async function saveSchedules(schedules: ScheduledPost[]): Promise<void> {
  if (isKVEnabled()) {
    await saveKVSchedules(schedules);
  } else {
    saveLocalSchedules(schedules);
  }
}

/**
 * Add a new scheduled post.
 */
export async function addSchedule(post: Omit<ScheduledPost, 'id' | 'createdAt' | 'status'>): Promise<ScheduledPost> {
  const validationError = validateScheduledPost(post);
  if (validationError) {
    throw new Error(`Validation failed: ${validationError}`);
  }

  const schedules = await getSchedules();
  const newPost: ScheduledPost = {
    ...post,
    id: randomUUID(),
    status: 'pending',
    retryCount: 0,
    createdAt: new Date().toISOString(),
  };
  schedules.push(newPost);
  await saveSchedules(schedules);
  return newPost;
}

/**
 * Delete a scheduled post by ID.
 */
export async function deleteSchedule(id: string): Promise<boolean> {
  const schedules = await getSchedules();
  const initialLength = schedules.length;
  const filtered = schedules.filter(p => p.id !== id);
  if (filtered.length === initialLength) return false;
  await saveSchedules(filtered);
  return true;
}

/**
 * Toggle a schedule's pause/resume state.
 */
export async function toggleSchedule(id: string): Promise<ScheduledPost | null> {
  const schedules = await getSchedules();
  const post = schedules.find(p => p.id === id);
  if (!post) return null;

  if (post.status === 'paused') {
    post.status = 'pending';
    // If the scheduled time is in the past, reset it to a proper future slot
    const scheduledTime = new Date(post.scheduledAt);
    if (isNaN(scheduledTime.getTime()) || scheduledTime <= new Date()) {
      if (post.recurrence && post.recurrence !== 'once') {
        post.scheduledAt = calculateNextRun(post.scheduledAt, post.recurrence);
      } else {
        // Reschedule for 1 minute in the future
        post.scheduledAt = new Date(Date.now() + 60000).toISOString();
      }
    }
  } else if (post.status === 'pending' || post.status === 'processing') {
    post.status = 'paused';
  } else {
    // If completed or failed, reset to pending
    post.status = 'pending';
    post.errorMessage = undefined;
    post.retryCount = 0;
    post.processingStartedAt = undefined;
    const scheduledTime = new Date(post.scheduledAt);
    if (isNaN(scheduledTime.getTime()) || scheduledTime <= new Date()) {
      if (post.recurrence && post.recurrence !== 'once') {
        post.scheduledAt = calculateNextRun(post.scheduledAt, post.recurrence);
      } else {
        // Reschedule for 1 minute in the future
        post.scheduledAt = new Date(Date.now() + 60000).toISOString();
      }
    }
  }

  await saveSchedules(schedules);
  return post;
}

/**
 * Calculate the next run time for recurring schedules.
 */
export function calculateNextRun(currentScheduled: string, recurrence: ScheduledPost['recurrence']): string {
  const next = new Date(currentScheduled);
  if (isNaN(next.getTime())) {
    return new Date(Date.now() + 60000).toISOString();
  }
  const now = new Date();

  let iterations = 0;
  const MAX_ITERATIONS = 1000;

  while (next <= now && iterations < MAX_ITERATIONS) {
    iterations++;
    switch (recurrence) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'twice_daily':
        next.setHours(next.getHours() + 12);
        break;
      case 'alternate_days':
        next.setDate(next.getDate() + 2);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      default:
        // 'once' or fallback: don't loop infinitely, just return now plus a default offset
        return new Date(now.getTime() + 60000).toISOString();
    }
  }

  if (iterations >= MAX_ITERATIONS) {
    return new Date(now.getTime() + 60000).toISOString();
  }

  return next.toISOString();
}

/**
 * Recover schedules stuck in processing (e.g. after a server crash).
 */
export async function recoverStuckSchedules(
  onRecover?: (post: ScheduledPost) => void
): Promise<number> {
  const schedules = await getSchedules();
  const now = Date.now();
  let recovered = 0;

  for (const post of schedules) {
    if (post.status !== 'processing') continue;
    const startedAt = post.processingStartedAt
      ? new Date(post.processingStartedAt).getTime()
      : NaN;
    const isStuck = !Number.isFinite(startedAt) || now - startedAt > STUCK_PROCESSING_MS;
    if (!isStuck) continue;

    post.status = 'pending';
    post.processingStartedAt = undefined;
    post.scheduledAt = new Date(now + 5000).toISOString();
    recovered++;
    onRecover?.(post);
  }

  if (recovered > 0) {
    await saveSchedules(schedules);
  }

  return recovered;
}

/**
 * Manually retry a failed or waiting schedule and run immediately.
 */
export async function retrySchedule(
  id: string,
  updates?: Partial<Pick<ScheduledPost, 'apiKey' | 'provider' | 'model'>>
): Promise<ScheduledPost | null> {
  const schedules = await getSchedules();
  const post = schedules.find(p => p.id === id);
  if (!post) return null;

  const canRetry =
    post.status === 'failed' ||
    (post.status === 'pending' && (post.retryCount || 0) > 0 && Boolean(post.errorMessage)) ||
    post.status === 'paused';

  if (!canRetry) return null;

  if (updates?.apiKey) post.apiKey = updates.apiKey;
  if (updates?.provider) post.provider = updates.provider;
  if (updates?.model) post.model = updates.model;

  post.status = 'pending';
  post.retryCount = 0;
  post.errorMessage = undefined;
  post.processingStartedAt = undefined;
  post.scheduledAt = new Date().toISOString();
  await saveSchedules(schedules);
  return post;
}

/**
 * Apply retry or permanent failure after a processing error.
 */
export function applyScheduleFailure(
  post: ScheduledPost,
  errorMessage: string
): { willRetry: boolean; nextRunAt?: string } {
  const attempt = (post.retryCount || 0) + 1;
  post.retryCount = attempt;
  post.processingStartedAt = undefined;

  if (attempt <= MAX_SCHEDULE_RETRIES) {
    const delayMs = calculateRetryDelayMs(attempt);
    const nextRunAt = new Date(Date.now() + delayMs).toISOString();
    post.status = 'pending';
    post.scheduledAt = nextRunAt;
    post.errorMessage = `Attempt ${attempt}/${MAX_SCHEDULE_RETRIES} failed: ${errorMessage}`;
    return { willRetry: true, nextRunAt };
  }

  post.status = 'failed';
  post.errorMessage = `Failed after ${MAX_SCHEDULE_RETRIES} attempts: ${errorMessage}`;
  return { willRetry: false };
}
