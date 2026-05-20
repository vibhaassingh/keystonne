import {vercelPreset} from '@vercel/react-router/vite';

/**
 * React Router 7 config — Vercel SPA mode.
 *
 *   ssr: false   -> client-rendered SPA; all loaders run in the browser.
 *                   Required because every data source in Phase 1 is mock
 *                   data or browser localStorage (no server runtime needed).
 *   presets      -> @vercel/react-router gives the build the right output
 *                   shape for Vercel (static client bundle + routing).
 *
 * @typedef {import('@react-router/dev/config').Config} Config
 * @type {Config}
 */
export default {
  ssr: false,
  presets: [vercelPreset()],
};
