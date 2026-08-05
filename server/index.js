import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createMailApp } from './mail-app.js'

/**
 * Production server: the built site and the mail endpoint on one port.
 *
 * In development none of this is needed, because the same mail app is mounted
 * inside Vite and `npm run dev` serves both. This is what `npm start` runs on a
 * host, where dist/ is a folder of static files and something still has to
 * answer the form post and hand back index.html for client-side routes.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

/* Hosts hand the port in through PORT. MAIL_PORT is the local fallback. */
const PORT = Number(process.env.PORT || process.env.MAIL_PORT || 8787)

const { app: mailApp, mode, problem, mailTo } = await createMailApp()

const app = express()

/* The API first, so the SPA fallback below can never swallow it. */
app.use(mailApp)

if (fs.existsSync(path.join(DIST, 'index.html'))) {
  /* Hashed asset filenames are safe to cache hard. index.html must not be, or
     a deploy leaves people on the previous bundle. */
  app.use(
    '/assets',
    express.static(path.join(DIST, 'assets'), {
      immutable: true,
      maxAge: '1y',
    }),
  )
  app.use(express.static(DIST, { index: false, maxAge: '1h' }))

  /* Client-side routes. /demo and the legal screens have no file on disk, so
     anything that is not an asset or an API call gets the shell. */
  app.get(/^\/(?!api\/).*/, (req, res, next) => {
    if (path.extname(req.path)) return next()
    res.sendFile(path.join(DIST, 'index.html'))
  })
} else {
  console.warn(
    '\n[server] dist/ is missing, so only the API is being served.\n' +
      '[server] run `npm run build` first.\n',
  )
}

if (mode === 'misconfigured') {
  /* The site is still worth serving even when mail cannot send, so this warns
     rather than exits. The endpoint itself answers 503. */
  console.warn(`\n[mail] ${problem}\n`)
}

app.listen(PORT, () => {
  console.log(`\n[server] listening on http://localhost:${PORT}`)
  console.log(`[server] mail mode: ${mode}`)
  if (mode !== 'misconfigured' && mode !== 'echo' && mode !== 'preview') {
    console.log(`[server] delivering enquiries to ${mailTo}`)
  }
  console.log('')
})
