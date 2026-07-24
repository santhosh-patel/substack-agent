import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-url-meta',
      transformIndexHtml(html) {
        if (!siteUrl) {
          return html
            .replace(/\s*<link rel="canonical"[^>]*>\s*/g, '\n')
            .replace(/\s*<meta property="og:url"[^>]*>\s*/g, '\n')
        }
        return html
          .replace(/__SITE_URL__/g, siteUrl)
      },
    },
  ],
  resolve: {
    alias: {
      '@docs': path.resolve(__dirname, '../docs'),
    },
  },
})
