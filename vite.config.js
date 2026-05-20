import {defineConfig} from 'vite';
import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';

/**
 * Vite + React Router 7 + Tailwind v4 config for Vercel (SPA mode).
 *
 * Phase 1 ships as a static SPA: all data is mock (`app/lib/mock/`) or
 * client-side (`localStorage` for cart + partner session), so SSR adds
 * nothing. The Hydrogen / Oxygen Vite plugins from the original scaffold
 * targeted Cloudflare Workers (Shopify Oxygen) — Vercel uses a different
 * runtime, so they were removed during the Vercel migration.
 */
export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
});
