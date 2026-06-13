import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Load .env file ───
const loadEnv = () => {
  const paths = [
    path.join(process.cwd(), '.env'),
    path.join(__dirname, '..', '.env')
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
const PORT = 3456;

// ─── Middleware ───
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Serve static frontend ───
app.use(express.static(path.join(__dirname, '..', 'public')));

// ─── API routes ───
app.use('/api', apiRoutes);

// ─── Fallback to index.html for SPA ───
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`\n Substack Automation running at:\n`);
  console.log(`     http://localhost:${PORT}\n`);
});
