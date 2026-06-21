/**
 * Vercel Serverless Entry Point
 * 
 * Exports the Express app for Vercel's Node.js runtime.
 * This file is the single serverless function that handles all /api/* routes.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import apiRoutes from '../src/routes/api.js';
import toolRoutes from '../src/routes/tools.js';
import { authMiddleware } from '../src/middleware/auth.js';

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

const app = express();

// ─── Middleware ───
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── CORS ───
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  next();
});

// ─── API routes (existing UI routes — no auth) ───
app.use('/api', apiRoutes);

// ─── Tool routes (AI agent routes — with auth) ───
app.use('/api/tools', authMiddleware, toolRoutes);

export default app;
