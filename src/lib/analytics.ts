/**
 * First-party analytics.
 *
 * Every send passes through hasConsent('analytics') first, so a visitor who
 * rejects is never measured. Events raised before a decision are held in memory
 * and only flushed if consent is later granted; if it is refused they are
 * dropped rather than sent.
 *
 * Deliberately first-party and coarse. No third-party script, no advertising
 * identifiers, no fingerprinting: a random session id that lives for the tab
 * and a page path is enough to answer which pages get read.
 */

import { getConsent, hasConsent, onConsentChange } from './consent'

const ENDPOINT = '/api/events'

type Event = {
  name: string
  path: string
  referrer: string
  /** Random per tab, so visits can be grouped without identifying anyone. */
  session: string
  at: string
  props?: Record<string, string | number | boolean>
}

/** Held only for this tab, and never written to storage. */
let sessionId = ''

function session() {
  if (!sessionId) {
    sessionId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
  }
  return sessionId
}

/** Raised before a decision was made. Flushed on consent, dropped on refusal. */
let pending: Event[] = []

function send(event: Event) {
  const body = JSON.stringify(event)
  try {
    /* sendBeacon survives the page being closed, which is exactly when the
       last event of a visit is raised. */
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }))
      return
    }
  } catch {
    /* fall through to fetch */
  }

  void fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    /* Analytics must never surface an error to the reader. */
  })
}

export function track(
  name: string,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return

  const event: Event = {
    name,
    path: window.location.pathname,
    referrer: document.referrer ? new URL(document.referrer).origin : '',
    session: session(),
    at: new Date().toISOString(),
    ...(props ? { props } : {}),
  }

  if (!hasConsent('analytics')) {
    /* Only queue while the visitor has yet to decide. Once they have refused,
       events are dropped on the spot: holding them would mean that changing
       their mind later retroactively sent everything gathered under the
       refusal, which is not what they agreed to. Bounded either way. */
    if (getConsent() === null && pending.length < 20) pending.push(event)
    return
  }

  send(event)
}

export function trackPageView() {
  track('page_view')
}

/**
 * Starts listening for a consent decision.
 *
 * On acceptance the queue is flushed. On refusal it is discarded, which is the
 * half people forget: holding events until the visitor changes their mind is
 * still processing data they declined.
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return () => {}

  const stop = onConsentChange((consent) => {
    if (consent?.analytics) {
      const queued = pending
      pending = []
      queued.forEach(send)
    } else {
      pending = []
    }
  })

  return stop
}
