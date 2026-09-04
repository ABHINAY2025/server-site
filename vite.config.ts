import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mail from './server/vite-plugin-mail.js'
import seo from './scripts/vite-plugin-seo.js'

// https://vite.dev/config/
export default defineConfig({
  /* The mail endpoint runs inside the dev server, so `npm run dev` serves the
     site and /api/demo/demo-requests together on one port. */
  plugins: [react(), mail(), seo()],
})
