/**
 * Cookie consent state.
 *
 * Held in localStorage rather than a cookie, because nothing here needs to
 * reach the server on every request, and a store the user can clear themselves
 * is easier to reason about.
 *
 * The whole point of this module is that it is the single gate: analytics asks
 * it before every send, so a decision recorded here is actually honoured
 * rather than merely recorded.
 */

export type Category = 'necessary' | 'analytics' | 'marketing'

export type Consent = {
  /** Always true. Without these the site cannot function. */
  necessary: true
  analytics: boolean
  marketing: boolean
  /** When the choice was made, so it can be re-asked after a policy change. */
  at: string
  version: number
}

const KEY = 'qdl.consent'

/** Bump when the categories or the policy change, which re-prompts everyone. */
export const CONSENT_VERSION = 1

const listeners = new Set<(c: Consent | null) => void>()

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    /* A stored decision from an older policy is treated as no decision. */
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    /* Private mode and blocked storage both throw. Treat as undecided rather
       than assuming consent. */
    return null
  }
}

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  return read()
}

export function hasConsent(category: Category): boolean {
  if (category === 'necessary') return true
  const consent = getConsent()
  /* Undecided means no. Nothing non-essential runs before a choice is made. */
  return consent ? consent[category] === true : false
}

export function setConsent(choice: { analytics: boolean; marketing: boolean }) {
  const value: Consent = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    at: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    /* Nothing to do. The in-memory notification below still applies for this
       page view, and the banner will simply ask again next time. */
  }
  listeners.forEach((fn) => fn(value))
  return value
}

/** Clears the decision, so the banner asks again. */
export function resetConsent() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignored */
  }
  listeners.forEach((fn) => fn(null))
}

export function onConsentChange(fn: (c: Consent | null) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
