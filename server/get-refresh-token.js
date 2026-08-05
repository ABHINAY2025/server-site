import 'dotenv/config'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

/**
 * One-time helper: walks the Google consent screen and writes the refresh
 * token straight into .env.
 *
 * The OAuth client downloaded from Google carries a client id and secret but no
 * refresh token. That only exists once a user has granted consent, which is
 * what this does. Run it, approve in the browser, and you are finished.
 *
 * Before running, add this exact redirect URI to the OAuth client in
 * Google Cloud Console, under APIs & Services, Credentials, and save:
 *
 *   http://localhost:5555/oauth2callback
 */

const PORT = 5555
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`

/* SMTP with XOAUTH2 needs the full mail scope. The narrower gmail.send scope
   only works through the Gmail API, not through SMTP. */
const SCOPE = 'https://mail.google.com/'

const ENV_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '.env',
)

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    '\nGOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env first.\n',
  )
  process.exit(1)
}

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPE,
    /* offline plus consent is what actually returns a refresh token. Without
       prompt=consent Google omits it on every grant after the first. */
    access_type: 'offline',
    prompt: 'consent',
  })

/** Writes the token into .env, replacing any existing line. */
function saveToEnv(token) {
  let text = fs.readFileSync(ENV_PATH, 'utf8')
  if (/^GOOGLE_REFRESH_TOKEN=.*$/m.test(text)) {
    text = text.replace(/^GOOGLE_REFRESH_TOKEN=.*$/m, `GOOGLE_REFRESH_TOKEN=${token}`)
  } else {
    text += `\nGOOGLE_REFRESH_TOKEN=${token}\n`
  }
  fs.writeFileSync(ENV_PATH, text)
}

function openBrowser(url) {
  const command =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '""', url]]
      : process.platform === 'darwin'
        ? ['open', [url]]
        : ['xdg-open', [url]]
  try {
    spawn(command[0], command[1], { stdio: 'ignore', detached: true }).unref()
  } catch {
    /* The URL is printed anyway, so this failing is not fatal */
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  if (url.pathname !== '/oauth2callback') {
    res.writeHead(404).end()
    return
  }

  const error = url.searchParams.get('error')
  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end(`Denied: ${error}`)
    console.error(`\n  Consent was denied: ${error}\n`)
    server.close()
    process.exit(1)
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: url.searchParams.get('code'),
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    const data = await response.json()

    if (!data.refresh_token) {
      throw new Error(
        data.error_description ||
          data.error ||
          'No refresh token came back. Revoke the app at ' +
            'https://myaccount.google.com/permissions and run this again.',
      )
    }

    saveToEnv(data.refresh_token)

    res
      .writeHead(200, { 'Content-Type': 'text/html' })
      .end(
        '<body style="font-family:system-ui;padding:3rem;max-width:32rem">' +
          '<h2 style="color:#062698;margin:0 0 .5rem">Connected</h2>' +
          '<p style="color:#374151">The refresh token was written to .env. ' +
          'Return to the terminal and run <code>npm run mail</code>. ' +
          'You can close this tab.</p></body>',
      )

    console.log('\n  Refresh token saved to .env\n')
    console.log('  Now run:  npm run mail\n')

    server.close()
    process.exit(0)
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end(String(err.message))
    console.error(`\n  Token exchange failed: ${err.message}\n`)
    server.close()
    process.exit(1)
  }
})

server.listen(PORT, () => {
  console.log('\n  Opening the Google consent screen.')
  console.log('  Sign in as the mailbox that should send, and approve.\n')
  console.log(`  If the browser does not open, paste this:\n\n${authUrl}\n`)
  console.log(
    '  Seeing "redirect_uri_mismatch"? Add this to the OAuth client in\n' +
      '  Google Cloud Console, Credentials, Authorised redirect URIs:\n\n' +
      `    ${REDIRECT_URI}\n`,
  )
  openBrowser(authUrl)
})
