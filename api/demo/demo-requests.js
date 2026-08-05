import nodemailer from 'nodemailer'
import {
  buildTransport,
  notification,
  acknowledgement,
} from '../../server/mail-app.js'

/**
 * Vercel serverless handler for the demo request form.
 *
 * The Express app in server/mail-app.js is not reused here. Vercel's Node
 * runtime consumes and parses the request body itself, so express.json() would
 * be waiting on a stream that has already been read. This talks to the same
 * mail builders directly instead.
 *
 * Two further differences from the long-running server:
 *
 *   - Nothing is written to disk. Serverless filesystems are ephemeral, so the
 *     submission log would vanish. Failures are logged instead, and turning on
 *     a real store is the obvious next step if enquiries ever matter more than
 *     the mail itself.
 *   - Work is not deferred past the response by default. Vercel freezes the
 *     instance once a response is sent, so a setImmediate callback may simply
 *     never run. waitUntil is used when available, which keeps the response
 *     immediate and still guarantees the send completes.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Built once per warm instance rather than per request. */
let mailerPromise

function getMailer() {
  if (!mailerPromise) mailerPromise = buildTransport()
  return mailerPromise
}

/** Vercel's waitUntil keeps the instance alive for work past the response. */
async function getWaitUntil() {
  try {
    const mod = await import('@vercel/functions')
    return typeof mod.waitUntil === 'function' ? mod.waitUntil : null
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const regulated = String(body.regulated ?? '').trim()

  if (name.length < 2 || !EMAIL.test(email) || phone.replace(/\D/g, '').length < 7) {
    return res.status(400).json({ error: 'Please check the details and try again.' })
  }

  const { transporter, mode, problem } = await getMailer()

  if (mode === 'misconfigured') {
    console.error(`[mail] refused a submission: ${problem}`)
    return res.status(503).json({ error: 'Mail is not configured on the server.' })
  }

  const mailFrom = process.env.MAIL_FROM || process.env.GMAIL_USER
  const mailTo = process.env.MAIL_TO || process.env.GMAIL_USER
  const receivedAt = new Date()

  if (!transporter) {
    console.log(`[mail] echo mode, nothing sent. ${name} <${email}> ${phone}`)
    return res.status(202).json({ ok: true, echoed: true })
  }

  const deliver = async () => {
    const results = await Promise.allSettled([
      transporter.sendMail(
        notification({ name, email, phone, regulated, receivedAt, from: mailFrom, to: mailTo }),
      ),
      process.env.MAIL_ACK === '0'
        ? Promise.resolve(null)
        : transporter.sendMail(acknowledgement({ name, email, from: mailFrom })),
    ])

    const [notified, acknowledged] = results
    if (notified.status === 'rejected') {
      console.error(`[mail] NOTIFICATION FAILED for ${email}:`, notified.reason?.message)
    } else {
      console.log(`[mail] notification sent for ${email}`)
    }
    if (acknowledged.status === 'rejected') {
      console.error(`[mail] acknowledgement failed for ${email}:`, acknowledged.reason?.message)
    }
  }

  const waitUntil = await getWaitUntil()

  if (waitUntil) {
    /* Reply straight away, and let the platform keep the instance alive until
       the mail has actually gone. */
    waitUntil(deliver())
    return res.status(202).json({ ok: true })
  }

  /* No waitUntil available, so the send has to finish before responding or it
     would be cut off mid-flight. */
  try {
    await deliver()
    return res.status(202).json({ ok: true })
  } catch (err) {
    console.error('[mail] send failed:', err.message)
    return res.status(502).json({ error: 'Could not send the message.' })
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

/* Nodemailer needs the Node runtime, not Edge. */
export const config = { runtime: 'nodejs' }
