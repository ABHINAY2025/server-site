import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import express from 'express'
import nodemailer from 'nodemailer'

const DATA_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'data',
)
const LOG_PATH = path.join(DATA_DIR, 'demo-requests.jsonl')

/**
 * Appends a submission to disk before anything is sent.
 *
 * The endpoint answers before the mail goes out, so without this a crash
 * between the response and the send would lose an enquiry with nobody the
 * wiser. One JSON object per line: cheap to append, and survives a process
 * that dies mid-write without corrupting earlier records.
 */
function recordSubmission(record) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.appendFileSync(LOG_PATH, `${JSON.stringify(record)}\n`)
  } catch (err) {
    console.error('[mail] could not write the submission log:', err.message)
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Retries transient SMTP failures. Nobody is watching the response now. */
async function withRetry(label, fn, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === attempts) throw err
      const wait = 2 ** (attempt - 1) * 1000
      console.warn(
        `[mail] ${label} failed (${err.message}), retrying in ${wait}ms`,
      )
      await sleep(wait)
    }
  }
}

/**
 * The demo request mail endpoint, as an Express app.
 *
 * An Express app is just a (req, res, next) function, so this mounts straight
 * into Vite's dev server as middleware. That is why `npm run dev` alone serves
 * both the site and this endpoint, with no second process, no second port and
 * no proxy. server/index.js runs the same app standalone for production.
 *
 * This has to run on the server either way. A browser cannot open the TCP
 * socket SMTP needs, and shipping the credential to the client would publish
 * it. Running inside Vite keeps it to one command without changing that.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SETUP_HELP =
  'Pick one of these in .env:\n\n' +
  '  Deliver to a real inbox, no OAuth flow:\n' +
  '    GMAIL_APP_PASSWORD=<16 characters from myaccount.google.com/apppasswords>\n\n' +
  '  Full OAuth:\n' +
  '    npm run mail:token\n\n' +
  '  See the message without any Google setup:\n' +
  '    MAIL_PREVIEW=1'

/** Values land in an HTML mail, so they cannot go in raw. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Makes a value safe to sit in a header's display name.
 *
 * The submitted name reaches a From header, so carriage returns have to go or
 * a crafted name could inject extra headers. Quotes are stripped too, since the
 * result is wrapped in them.
 */
function headerSafe(value) {
  return String(value)
    .replace(/[\r\n]+/g, ' ')
    .replace(/["\\]/g, '')
    .trim()
    .slice(0, 78)
}

function formatReceived(date) {
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/** The notification that goes to the team when someone asks for a demo. */
function notification({ name, email, phone, regulated, receivedAt, from, to }) {
  const fields = [
    ['Phone', phone],
    ['Regulated institution', regulated || 'Not answered'],
    ['Received', formatReceived(receivedAt)],
  ]

  return {
    /* The enquirer's name rides in the display name so the sender column is
       useful. Gmail shows "me" instead whenever from and to are the same
       mailbox, which is a quirk of self-addressed mail, not of this header. */
    from: `"${headerSafe(name)} via QDL Website" <${from}>`,
    to,
    replyTo: `${headerSafe(name)} <${email}>`,
    subject: `Demo request from ${headerSafe(name)}`,
    text: [
      'New demo request from the Quantum Data Leap website.',
      '',
      `Name: ${name}`,
      `Work email: ${email}`,
      ...fields.map(([label, value]) => `${label}: ${value}`),
      '',
      `Reply directly to this message to reach ${name}.`,
    ].join('\n'),
    html: `
<div style="margin:0;padding:24px;background:#f5f5f5;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
    <tr>
      <td style="height:4px;background:#062698;font-size:0;line-height:0">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:24px 28px 0">
        <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#9ca3af">
          New demo request
        </p>
        <h1 style="margin:10px 0 0;font-size:24px;font-weight:600;letter-spacing:-0.02em;color:#111827">
          ${escapeHtml(name)}
        </h1>
        <p style="margin:6px 0 0;font-size:14px">
          <a href="mailto:${escapeHtml(email)}" style="color:#062698;text-decoration:none">${escapeHtml(email)}</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 28px 0">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e5e7eb">
          ${fields
            .map(
              ([label, value]) => `
          <tr>
            <td style="padding:12px 12px 12px 0;font-size:13px;color:#6b7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6">${escapeHtml(label)}</td>
            <td style="padding:12px 0;font-size:13.5px;font-weight:500;color:#111827;text-align:right;border-bottom:1px solid #f3f4f6">${escapeHtml(value)}</td>
          </tr>`,
            )
            .join('')}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 28px 28px">
        <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: your Quantum Data Leap demo request`)}"
           style="display:inline-block;background:#062698;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;padding:12px 22px;border-radius:999px">
          Reply to ${escapeHtml(name.split(/\s+/)[0])}
        </a>
        <p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#9ca3af">
          Replying to this message goes straight to them.
        </p>
      </td>
    </tr>
  </table>
</div>`,
  }
}

const NEXT_STEPS = [
  'One of our team reads your note and comes back to you directly.',
  'We arrange a walkthrough on your own payment flows, at a time that suits you.',
  'You get a deployment shape for the core systems you already run.',
]

/**
 * The acknowledgement sent back to whoever filled in the form.
 *
 * Inline styles and a table layout, because that is what mail clients render
 * reliably. No images, so nothing depends on remote content being unblocked.
 */
function acknowledgement({ name, email, from }) {
  const firstName = name.split(/\s+/)[0]

  return {
    from: `"Quantum Data Leap" <${from}>`,
    to: `${headerSafe(name)} <${email}>`,
    replyTo: from,
    subject: 'Thanks for your interest in Quantum Data Leap',
    text: [
      `Hello ${firstName},`,
      '',
      'Thank you for requesting a demo of Quantum Data Leap. We have your details and someone from the team will be in touch shortly to arrange your walkthrough.',
      '',
      'What happens next:',
      ...NEXT_STEPS.map((step) => `  - ${step}`),
      '',
      `If anything is urgent, reply to this message or write to ${from}.`,
      '',
      'Quantum Data Leap',
      'FiSec Global Inc.',
    ].join('\n'),
    html: `
<div style="margin:0;padding:24px;background:#f5f5f5;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
    <tr>
      <td style="height:4px;background:#062698;font-size:0;line-height:0">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:24px 28px 0">
        <p style="margin:0;font-size:19px;font-weight:700;letter-spacing:-0.02em;color:#062698">QDL</p>
        <p style="margin:2px 0 0;font-size:12px;color:#9ca3af">Quantum Data Leap</p>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 28px 0">
        <h1 style="margin:0;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#111827">
          Thanks for getting in touch, ${escapeHtml(firstName)}.
        </h1>
        <p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#374151">
          We have your request for a demo of Quantum Data Leap. Someone from the
          team will be in touch shortly to arrange your walkthrough.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px 0">
        <p style="margin:0 0 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#9ca3af">
          What happens next
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">
          ${NEXT_STEPS.map(
            (step, i) => `
          <tr>
            <td style="padding:0 10px 12px 0;vertical-align:top">
              <span style="display:inline-block;width:20px;height:20px;border-radius:999px;background:#062698;color:#ffffff;font-size:11px;font-weight:600;text-align:center;line-height:20px">${i + 1}</span>
            </td>
            <td style="padding:0 0 12px;font-size:13.5px;line-height:1.6;color:#374151">${escapeHtml(step)}</td>
          </tr>`,
          ).join('')}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 28px">
        <div style="border-top:1px solid #e5e7eb;padding-top:18px">
          <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280">
            If anything is urgent, simply reply to this message or write to
            <a href="mailto:${escapeHtml(from)}" style="color:#062698;text-decoration:underline">${escapeHtml(from)}</a>.
          </p>
          <p style="margin:16px 0 0;font-size:12px;color:#9ca3af">
            Quantum Data Leap, FiSec Global Inc.
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>`,
  }
}

/**
 * Resolves how mail should be sent from whatever is present in .env.
 * Returns a problem string rather than exiting, so mounting inside the dev
 * server cannot take the dev server down with it.
 */
async function buildTransport() {
  if (process.env.MAIL_DEV_ECHO === '1') {
    return { transporter: null, mode: 'echo' }
  }

  if (process.env.MAIL_PREVIEW === '1') {
    try {
      const account = await nodemailer.createTestAccount()
      return {
        mode: 'preview',
        transporter: nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: { user: account.user, pass: account.pass },
        }),
      }
    } catch (err) {
      return {
        transporter: null,
        mode: 'echo',
        problem: `Could not reach Ethereal (${err.message}). Logging instead.`,
      }
    }
  }

  if (process.env.GMAIL_APP_PASSWORD) {
    if (!process.env.GMAIL_USER) {
      return {
        transporter: null,
        mode: 'misconfigured',
        problem: 'GMAIL_APP_PASSWORD is set but GMAIL_USER is missing.',
      }
    }
    return {
      mode: 'gmail-app-password',
      transporter: nodemailer.createTransport({
        service: 'gmail',
        /* Reuse the TLS connection. Without pooling every send pays a fresh
           handshake and login, which was most of the original delay. */
        pool: true,
        maxConnections: 2,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
        },
      }),
    }
  }

  const required = [
    'GMAIL_USER',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REFRESH_TOKEN',
  ]
  const missing = required.filter((key) => !process.env[key])

  if (missing.length) {
    return {
      transporter: null,
      mode: 'misconfigured',
      problem: `Mail is not configured. Missing in .env: ${missing.join(', ')}\n\n${SETUP_HELP}`,
    }
  }

  return {
    mode: 'gmail-oauth2',
    transporter: nodemailer.createTransport({
      service: 'gmail',
      pool: true,
      maxConnections: 2,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    }),
  }
}

export async function createMailApp() {
  const { transporter, mode, problem } = await buildTransport()
  const mailTo = process.env.MAIL_TO || process.env.GMAIL_USER
  /* The visible From. Gmail only honours this when the address belongs to the
     authenticated account or is a verified "Send mail as" alias, otherwise it
     rewrites the header to the account that authenticated. */
  const mailFrom = process.env.MAIL_FROM || process.env.GMAIL_USER
  const echoing = transporter === null && mode !== 'misconfigured'
  /* On unless explicitly disabled */
  const sendAck = process.env.MAIL_ACK !== '0'

  /* Gmail silently rewrites the From to the authenticated account and still
     answers 250 OK, so a mismatch here looks like it worked and does not.
     Warn rather than fail: it is legitimate once a send-as alias is verified. */
  if (
    mailFrom !== process.env.GMAIL_USER &&
    (mode === 'gmail-app-password' || mode === 'gmail-oauth2')
  ) {
    console.warn(
      `\n  \x1b[33m[mail] MAIL_FROM is ${mailFrom} but authentication is as ` +
        `${process.env.GMAIL_USER}.\n` +
        `  Gmail will rewrite the From unless ${mailFrom} is a verified ` +
        `"Send mail as" alias\n  on that account. Only reply-to would survive.\x1b[0m\n`,
    )
  }

  const app = express()
  app.use(express.json({ limit: '16kb' }))

  /* Keeps a stray script from hammering the mailbox. */
  const recent = new Map()
  const WINDOW = 60_000
  const MAX_PER_WINDOW = 5

  app.get('/api/health', (_req, res) =>
    res.json({
      ok: mode !== 'misconfigured',
      mode,
      deliversToRealInbox: mode === 'gmail-app-password' || mode === 'gmail-oauth2',
      ...(problem ? { problem } : {}),
    }),
  )

  app.post('/api/demo/demo-requests', async (req, res) => {
    if (mode === 'misconfigured') {
      console.error(`\n[mail] refused a submission: ${problem}\n`)
      return res.status(503).json({ error: 'Mail is not configured on the server.' })
    }

    const ip = req.ip ?? req.socket?.remoteAddress ?? 'unknown'
    const now = Date.now()
    const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW)
    hits.push(now)
    recent.set(ip, hits)
    if (hits.length > MAX_PER_WINDOW) {
      return res.status(429).json({ error: 'Too many requests. Try again shortly.' })
    }

    const name = String(req.body?.name ?? '').trim()
    const email = String(req.body?.email ?? '').trim()
    const phone = String(req.body?.phone ?? '').trim()
    const regulated = String(req.body?.regulated ?? '').trim()

    if (name.length < 2 || !EMAIL.test(email) || phone.replace(/\D/g, '').length < 7) {
      return res.status(400).json({ error: 'Please check the details and try again.' })
    }

    const receivedAt = new Date()
    const submissionId = randomUUID()

    /* Persist before replying, so an enquiry survives a crash between the
       response and the send. */
    recordSubmission({
      id: submissionId,
      at: receivedAt.toISOString(),
      event: 'received',
      name,
      email,
      phone,
      regulated,
    })

    if (echoing) {
      const rows = [
        ['Name', name],
        ['Work email', email],
        ['Phone', phone],
        ['Regulated institution', regulated || 'Not answered'],
        ['Received', formatReceived(receivedAt)],
      ]
      console.log('\n[mail] nothing was sent, this is echo mode. Submission:')
      for (const [label, value] of rows) console.log(`  ${label}: ${value}`)
      if (sendAck) console.log(`  (an acknowledgement would go to ${email})`)
      console.log('')
      return res.status(202).json({ ok: true, echoed: true })
    }

    /* Answer now. SMTP takes seconds and the person filling in a form should
       not be made to watch it. The record is already on disk, so the enquiry
       cannot be lost by replying ahead of delivery. 202 rather than 200: this
       is accepted for processing, not processed. */
    res.status(202).json({ ok: true })

    /* Runs after the response has been flushed. Everything past this point
       must never touch res. */
    setImmediate(async () => {
      const results = await Promise.allSettled([
        withRetry('notification', () =>
          transporter.sendMail(
            notification({
              name,
              email,
              phone,
              regulated,
              receivedAt,
              from: mailFrom,
              to: mailTo,
            }),
          ),
        ),
        sendAck
          ? withRetry('acknowledgement', () =>
              transporter.sendMail(acknowledgement({ name, email, from: mailFrom })),
            )
          : Promise.resolve(null),
      ])

      const [notified, acknowledged] = results

      if (notified.status === 'fulfilled') {
        const preview = nodemailer.getTestMessageUrl(notified.value)
        console.log(
          preview
            ? `\n[mail] notification sent. Read it here:\n  ${preview}\n`
            : `[mail] notification -> accepted ${JSON.stringify(notified.value.accepted)}` +
              ` | ${notified.value.response}`,
        )
      } else {
        console.error(
          `\n[mail] NOTIFICATION FAILED for ${email}: ${notified.reason?.message}\n` +
            `[mail] the submission is safe in data/demo-requests.jsonl\n`,
        )
      }

      if (acknowledged.status === 'fulfilled' && acknowledged.value) {
        const ackPreview = nodemailer.getTestMessageUrl(acknowledged.value)
        console.log(
          ackPreview
            ? `[mail] acknowledgement sent. Read it here:\n  ${ackPreview}\n`
            : `[mail] acknowledgement -> accepted ${JSON.stringify(acknowledged.value.accepted)}` +
              ` | ${acknowledged.value.response}`,
        )
      } else if (acknowledged.status === 'rejected') {
        console.error(
          `[mail] acknowledgement failed for ${email}: ${acknowledged.reason?.message}`,
        )
      }

      /* Record the outcome so a failed send can be found later. */
      recordSubmission({
        id: submissionId,
        at: receivedAt.toISOString(),
        event: 'delivery',
        notified: notified.status,
        acknowledged: acknowledged.status,
      })
    })
  })

  return { app, mode, problem, mailTo }
}
