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
  createdAt: string; // ISO string
}

const LOCAL_DATA_DIR = path.join(process.cwd(), 'src', 'data');
const LOCAL_FILE_PATH = path.join(LOCAL_DATA_DIR, 'schedules.json');

/**
 * Check if Vercel KV environment variables are configured.
 */
function isKVEnabled(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Ensure KV is configured if running in production or Vercel environment.
 */
function checkKVConfig() {
  const isProdOrVercel = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  if (isProdOrVercel && !isKVEnabled()) {
    throw new Error('Vercel KV environment variables (KV_REST_API_URL and KV_REST_API_TOKEN) must be configured for scheduling in production / Vercel.');
  }
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
  if (post.postType === 'note') {
    if (!post.body || typeof post.body !== 'string' || post.body.trim().length === 0) {
      return 'Body is required for notes';
    }
    if (post.body.length > 1000) {
      return 'Note body is too long (maximum 1000 characters)';
    }
  } else if (post.postType === 'newsletter') {
    if (!post.title || typeof post.title !== 'string' || post.title.trim().length === 0) {
      return 'Title is required for newsletters';
    }
    if (!post.body || typeof post.body !== 'string' || post.body.trim().length === 0) {
      return 'Body is required for newsletters';
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
  checkKVConfig();
  if (isKVEnabled()) {
    return await getKVSchedules();
  }
  return getLocalSchedules();
}

/**
 * Save all schedules.
 */
export async function saveSchedules(schedules: ScheduledPost[]): Promise<void> {
  checkKVConfig();
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
