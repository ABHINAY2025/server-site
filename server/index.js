import { createMailApp } from './mail-app.js'

/**
 * Standalone mail server.
 *
 * In development you do not need this: the same app is mounted inside Vite, so
 * `npm run dev` serves the site and the endpoint together. This exists for
 * production, where the built site is static and something still has to accept
 * the form post.
 */

const PORT = Number(process.env.MAIL_PORT ?? 8787)

const { app, mode, problem, mailTo } = await createMailApp()

if (mode === 'misconfigured') {
  console.error(`\n${problem}\n`)
  process.exit(1)
}

app.listen(PORT, () => {
  console.log(`\n[mail] listening on http://localhost:${PORT}`)
  console.log(`[mail] mode: ${mode}`)
  if (mode === 'echo' || mode === 'preview') {
    console.log('[mail] nothing will reach a real inbox in this mode.')
  } else {
    console.log(`[mail] delivering to ${mailTo}`)
  }
  console.log('')
})
