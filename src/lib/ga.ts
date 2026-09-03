/**
 * Google Analytics 4, loaded only after analytics consent.
 *
 * The tag is not in index.html on purpose. A gtag script in the document head
 * runs and sets cookies before anyone has been asked anything, which makes the
 * consent banner decorative. This injects it after a decision and never before.
 *
 * Set VITE_GA4_ID to the measurement ID (G-XXXXXXXXXX). With it unset, nothing
 * loads at all, which is the correct behaviour in development.
 */

import { hasConsent, onConsentChange } from './consent'

const GA_ID = import.meta.env.VITE_GA4_ID as string | undefined

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false

function injectTag(id: string) {
  if (loaded) return
  loaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }

  window.gtag('js', new Date())
  /* Consent Mode, set before config so the first hit already carries it. */
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('config', id, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
}

/** Tells GA the consent state changed, without needing a reload. */
function updateConsentSignal(granted: boolean) {
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  })
}

export function initGoogleAnalytics() {
  if (typeof window === 'undefined' || !GA_ID) return () => {}

  if (hasConsent('analytics')) injectTag(GA_ID)

  return onConsentChange((consent) => {
    if (consent?.analytics) {
      injectTag(GA_ID)
      updateConsentSignal(true)
    } else {
      /* Already-loaded tags cannot be unloaded, so the signal is withdrawn and
         GA stops using storage for the rest of the session. */
      updateConsentSignal(false)
    }
  })
}

/** A conversion, for example a submitted demo request. */
export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID || !hasConsent('analytics')) return
  window.gtag?.('event', name, params ?? {})
}
