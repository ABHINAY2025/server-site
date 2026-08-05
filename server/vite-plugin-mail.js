import { createMailApp } from './mail-app.js'

/**
 * Mounts the mail endpoint inside the Vite dev server.
 *
 * Vite's dev server is a Connect stack and an Express app is a valid middleware
 * function, so the API lives on the same origin and port as the site. One
 * command, no proxy, no second terminal.
 *
 * A misconfiguration is reported and left in place rather than thrown: the dev
 * server should keep serving the site even when mail cannot send.
 */
export default function mailPlugin() {
  return {
    name: 'qdl-mail',
    apply: 'serve',
    async configureServer(server) {
      const { app, mode, problem, mailTo } = await createMailApp()

      server.middlewares.use(app)

      server.httpServer?.once('listening', () => {
        if (problem) {
          console.log(`\n  \x1b[33m[mail] ${problem}\x1b[0m\n`)
        } else if (mode === 'echo') {
          console.log('\n  \x1b[33m[mail] echo mode: submissions are logged, not sent.\x1b[0m\n')
        } else if (mode === 'preview') {
          console.log('\n  \x1b[33m[mail] preview mode: sends to a throwaway inbox, not to you.\x1b[0m\n')
        } else {
          console.log(`\n  \x1b[32m[mail] ready, delivering to ${mailTo}\x1b[0m\n`)
        }
      })
    },
  }
}
