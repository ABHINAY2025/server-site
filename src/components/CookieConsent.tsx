import { useCallback, useEffect, useState } from 'react'
import { Link } from '../router'
import {
  getConsent,
  onConsentChange,
  setConsent,
  type Consent,
} from '../lib/consent'
import { initAnalytics, trackPageView } from '../lib/analytics'

/**
 * Cookie consent.
 *
 * Shown until a choice is recorded, and nothing beyond the strictly necessary
 * runs before then. Reject carries the same weight as Accept rather than being
 * buried inside Customize, which is both the fair reading of consent and what
 * the ePrivacy rules ask for.
 */

type Panel = 'summary' | 'customize'

const CATEGORIES = [
  {
    key: 'necessary' as const,
    title: 'Strictly necessary',
    body: 'Needed for the site to work at all, including remembering this choice. Cannot be switched off.',
    locked: true,
  },
  {
    key: 'analytics' as const,
    title: 'Analytics',
    body: 'Which pages get read, counted first-party. No third-party script and no advertising identifiers.',
    locked: false,
  },
  {
    key: 'marketing' as const,
    title: 'Marketing',
    body: 'Measuring which campaigns bring people here. Off unless you turn it on.',
    locked: false,
  },
]

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#2778fc]' : 'bg-white/25'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
          checked ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export default function CookieConsent() {
  /* Undefined until read, so the banner never flashes for someone who has
     already answered. */
  const [decided, setDecided] = useState<Consent | null | undefined>(undefined)
  const [panel, setPanel] = useState<Panel>('summary')
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    setDecided(getConsent())
    const stop = initAnalytics()
    return stop
  }, [])

  /* A page view is raised on load and on every route change. It is only sent
     if analytics consent is in place; before a decision it waits in a queue. */
  useEffect(() => {
    if (decided === undefined) return
    trackPageView()
    const onNavigate = () => trackPageView()
    window.addEventListener('popstate', onNavigate)
    return () => window.removeEventListener('popstate', onNavigate)
  }, [decided])

  /* Reopened by the footer link, so a decision can always be changed. */
  useEffect(() => {
    const stop = onConsentChange((c) => setDecided(c))
    const reopen = () => {
      const current = getConsent()
      setAnalytics(current?.analytics ?? false)
      setMarketing(current?.marketing ?? false)
      setPanel('customize')
      setDecided(null)
    }
    window.addEventListener('qdl:cookie-settings', reopen)
    return () => {
      stop()
      window.removeEventListener('qdl:cookie-settings', reopen)
    }
  }, [])

  const decide = useCallback((a: boolean, m: boolean) => {
    setConsent({ analytics: a, marketing: m })
    setPanel('summary')
  }, [])

  if (decided === undefined || decided) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 z-[60] sm:right-auto sm:max-w-[34rem]"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-6 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] sm:p-7">
        {panel === 'summary' ? (
          <>
            <h2 className="text-[19px] font-semibold tracking-[-0.01em]">
              We value your privacy
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">
              This site uses cookies to improve your browsing experience,
              analyze site traffic, and show personalized content. See our{' '}
              <Link
                to="/privacy-policy"
                className="text-white underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* Reject sits first and carries the same weight as Accept */}
              <button
                type="button"
                onClick={() => decide(false, false)}
                className="rounded-lg bg-white/10 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-white/15"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => decide(true, true)}
                className="rounded-lg bg-white px-5 py-2.5 text-[14px] font-semibold text-gray-900 transition-colors duration-200 hover:bg-white/90"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => setPanel('customize')}
                className="ml-auto rounded-lg bg-white/10 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-white/15"
              >
                Customize
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-[19px] font-semibold tracking-[-0.01em]">
              Choose what we may use
            </h2>

            <div className="mt-5 space-y-4">
              {CATEGORIES.map((category) => {
                const checked =
                  category.key === 'necessary'
                    ? true
                    : category.key === 'analytics'
                      ? analytics
                      : marketing
                const set =
                  category.key === 'analytics' ? setAnalytics : setMarketing

                return (
                  <div key={category.key} className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold">
                        {category.title}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
                        {category.body}
                      </p>
                    </div>
                    <Toggle
                      checked={checked}
                      disabled={category.locked}
                      onChange={category.locked ? () => {} : set}
                      label={category.title}
                    />
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPanel('summary')}
                className="rounded-lg bg-white/10 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-white/15"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => decide(analytics, marketing)}
                className="rounded-lg bg-white px-5 py-2.5 text-[14px] font-semibold text-gray-900 transition-colors duration-200 hover:bg-white/90"
              >
                Save choices
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
