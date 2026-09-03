/**
 * Campaign attribution.
 *
 * UTM parameters are on the landing URL and gone by the time someone reaches
 * the demo form two clicks later, so they are captured on arrival and carried
 * through the visit. Without this every enquiry from a campaign is reported as
 * direct traffic, which is the usual reason a campaign looks like it did
 * nothing.
 *
 * Held in sessionStorage, not a cookie: it lasts the visit, is never sent
 * anywhere on its own, and disappears when the tab closes. That keeps it inside
 * what "strictly necessary" reasonably covers, since it only ever travels
 * attached to a form the visitor chose to submit.
 */

const KEY = 'qdl.utm'

const FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  /* Ad platform click ids, which is how paid traffic is actually matched */
  'gclid',
  'msclkid',
  'fbclid',
] as const

export type Attribution = Partial<Record<(typeof FIELDS)[number], string>> & {
  landing?: string
  referrer?: string
}

/** Captures on first arrival. Later pages must not overwrite the entry point. */
export function captureAttribution() {
  if (typeof window === 'undefined') return

  try {
    if (sessionStorage.getItem(KEY)) return

    const params = new URLSearchParams(window.location.search)
    const found: Attribution = {}
    for (const field of FIELDS) {
      const value = params.get(field)
      if (value) found[field] = value.slice(0, 120)
    }

    /* Only store something if there is something worth storing, or the first
       page of every visit would be recorded as an empty campaign. */
    const hasCampaign = Object.keys(found).length > 0
    if (!hasCampaign && !document.referrer) return

    found.landing = window.location.pathname
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer)
        /* Origin only. The full referring URL is more than is needed to know
           where a lead came from. */
        if (ref.origin !== window.location.origin) found.referrer = ref.origin
      } catch {
        /* malformed referrer, ignored */
      }
    }

    sessionStorage.setItem(KEY, JSON.stringify(found))
  } catch {
    /* Blocked storage. Attribution is a nicety, never a blocker. */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}

/** Flattened for an email body, where a nested object is unreadable. */
export function describeAttribution(a: Attribution): string {
  const parts = Object.entries(a)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
  return parts.length ? parts.join(' · ') : 'Direct'
}
