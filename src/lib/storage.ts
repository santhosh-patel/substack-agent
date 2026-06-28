import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  status: 'pending' | 'completed' | 'failed' | 'paused';
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
 * Fetch schedules from Vercel KV via REST API.
 */
async function getKVSchedules(): Promise<ScheduledPost[]> {
  const url = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['GET', 'substack_schedules']),
    });

    if (!res.ok) {
      console.error(`[Storage] Vercel KV GET failed: ${res.statusText}`);
      return [];
    }

    const data = await res.json() as any;
    if (data.result) {
      return JSON.parse(data.result);
    }
  } catch (err) {
    console.error('[Storage] Error reading from Vercel KV:', err);
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
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', 'substack_schedules', JSON.stringify(schedules)]),
    });

    if (!res.ok) {
      console.error(`[Storage] Vercel KV SET failed: ${res.statusText}`);
    }
  } catch (err) {
    console.error('[Storage] Error writing to Vercel KV:', err);
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
  }
}

// ─── Public API ───

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
  const schedules = await getSchedules();
  const newPost: ScheduledPost = {
    ...post,
    id: Math.random().toString(36).substring(2, 11),
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
    // If the scheduled time is in the past, reset it to now/future
    if (new Date(post.scheduledAt) <= new Date()) {
      post.scheduledAt = new Date().toISOString();
    }
  } else if (post.status === 'pending') {
    post.status = 'paused';
  } else {
    // If completed or failed, reset to pending/now
    post.status = 'pending';
    post.scheduledAt = new Date().toISOString();
    post.errorMessage = undefined;
  }

  await saveSchedules(schedules);
  return post;
}

/**
 * Calculate the next run time for recurring schedules.
 */
export function calculateNextRun(currentScheduled: string, recurrence: ScheduledPost['recurrence']): string {
  const next = new Date(currentScheduled);
  const now = new Date();

  while (next <= now) {
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
  return next.toISOString();
}
