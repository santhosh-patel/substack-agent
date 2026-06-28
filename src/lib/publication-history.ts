import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface PublicationHistoryEntry {
  id: string;
  type: 'newsletter' | 'note';
  title: string;
  body: string;
  url: string;
  publishedAt: string;
  source: 'manual' | 'scheduled';
  scheduleId?: string;
  isDraft?: boolean;
}

const LOCAL_DATA_DIR = process.env.VERCEL === '1' ? '/tmp' : path.join(process.cwd(), 'src', 'data');
const FILE_PATH = path.join(LOCAL_DATA_DIR, 'publications_history.json');
const MAX_ENTRIES = 200;

function ensureDataDir() {
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
  }
}

export function getPublicationHistory(): PublicationHistoryEntry[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const parsed = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('[PublicationHistory] Failed to read history:', err);
    return [];
  }
}

export function savePublicationToHistory(
  entry: Omit<PublicationHistoryEntry, 'id'> & { id?: string }
): PublicationHistoryEntry {
  ensureDataDir();

  const record: PublicationHistoryEntry = {
    id: entry.id || randomUUID(),
    type: entry.type,
    title: entry.title,
    body: entry.body,
    url: entry.url,
    publishedAt: entry.publishedAt || new Date().toISOString(),
    source: entry.source,
    scheduleId: entry.scheduleId,
    isDraft: entry.isDraft,
  };

  let history = getPublicationHistory();
  history = history.filter(item => item.url !== record.url && item.id !== record.id);
  history.unshift(record);
  if (history.length > MAX_ENTRIES) {
    history = history.slice(0, MAX_ENTRIES);
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(history, null, 2), 'utf-8');
  return record;
}
