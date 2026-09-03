import { useState, type CSSProperties, type FormEvent } from 'react'
import { ArrowRight, Check, Copy, Loader2 } from 'lucide-react'
import { Shader, FlowingGradient } from 'shaders/react'
import Footer from '../components/Footer'
import { Link } from '../router'
import { getAttribution } from '../lib/utm'
import { gaEvent } from '../lib/ga'
import { useSeo } from '../lib/seo'
import EmbeddedVideo from '../components/EmbeddedVideo'

/**
 * The demo request page every "Request a demo" button lands on.
 *
 * Four questions and nothing else. The pitch sits on the left, the form on the
 * right. Motion is confined to what it can earn: fields that acknowledge
 * focus, a choice that confirms itself, a meter that tracks how much is left.
 *
 * Submissions POST to the same path server-site uses, so moving this page into
 * that app needs no change. Override it with VITE_DEMO_ENDPOINT if the API
 * lives elsewhere.
 */

const ENDPOINT =
  import.meta.env.VITE_DEMO_ENDPOINT ?? '/api/demo/demo-requests'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Where transaction samples go. */
const SAMPLE_ADDRESS = 'quantumdataleap.ai@gmail.com'
const SAMPLE_SUBJECT = 'Free repair analysis'
const SAMPLE_BODY =
  'Attach a transaction sample and we will come back with a breakdown of what could have been repaired automatically.'

/**
 * Gmail's compose window, opened in the browser.
 *
 * A mailto delegates to whatever the operating system has registered, which on
 * a machine with no mail client, or one pointed at an app the visitor does not
 * use, means the button appears to do nothing. This opens a compose window
 * directly instead, so the action works without any local setup.
 */
const GMAIL_COMPOSE =
  'https://mail.google.com/mail/?view=cm&fs=1' +
  `&to=${encodeURIComponent(SAMPLE_ADDRESS)}` +
  `&su=${encodeURIComponent(SAMPLE_SUBJECT)}` +
  `&body=${encodeURIComponent(SAMPLE_BODY)}`

/** The same message handed to a desktop client, for anyone who prefers one. */
const MAILTO =
  `mailto:${SAMPLE_ADDRESS}` +
  `?subject=${encodeURIComponent(SAMPLE_SUBJECT)}` +
  `&body=${encodeURIComponent(SAMPLE_BODY)}`

type Status = 'idle' | 'sending' | 'sent' | 'error'

function Field({
  name,
  label,
  type = 'text',
  value,
  onChange,
  done,
  autoComplete,
}: {
  name: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  done: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-gray-900">
        {label}
        <span className="text-[#062698]">*</span>
        {done && (
          <Check
            size={14}
            className="ml-auto text-[#0a8f6a]"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        )}
      </span>

      <input
        name={name}
        type={type}
        required
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-3.5 text-[14px] text-gray-900 outline-none transition-colors duration-200 focus:border-[#062698] focus:bg-white"
      />
    </label>
  )
}

export default function Demo() {
  useSeo({
    title: 'Request a Demo | Quantum Data Leap',
    description:
      'See QDL repair payment data on your own flows. A walkthrough across ACH, Fedwire and RTP, on the core you already run. We respond within one business day.',
    path: '/demo',
  })

  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [regulated, setRegulated] = useState<'Yes' | 'No' | null>(null)
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_ADDRESS)
    } catch {
      /* Clipboard access can be refused, and an unusable button is worse than
         a visible address. Select it instead so it can be copied by hand. */
      const node = document.createElement('textarea')
      node.value = SAMPLE_ADDRESS
      document.body.appendChild(node)
      node.select()
      document.execCommand('copy')
      node.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const done = [
    name.trim().length > 1,
    EMAIL.test(email),
    phone.replace(/\D/g, '').length >= 7,
    regulated !== null,
  ]
  const complete = done.filter(Boolean).length

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          regulated: regulated ?? '',
          /* Which campaign produced this lead, captured on arrival */
          attribution: getAttribution(),
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      /* The conversion GA4 counts. Only reaches GA if analytics is consented. */
      gaEvent('generate_lead', { form: 'demo_request' })
      setStatus('sent')
      setName('')
      setEmail('')
      setPhone('')
      setRegulated(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F5]">
      {/* Flowing colour band behind the page.
          Masked from the top right and faded out well before it reaches the
          copy or the form, so it stays decoration rather than competing with
          the thing the page is actually for. Inert, and if WebGPU is
          unavailable the canvas simply stays transparent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[75vh] select-none"
        style={{
          maskImage:
            'radial-gradient(125% 105% at 100% 0%, #000 0%, #000 32%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(125% 105% at 100% 0%, #000 0%, #000 32%, transparent 70%)',
        }}
      >
        <Shader className="absolute inset-0 opacity-80">
          <FlowingGradient
            colorA="#eef2ff"
            colorB="#2778fc"
            colorC="#b0169c"
            colorD="#fb5725"
            speed={0.35}
            distortion={0.62}
          />
        </Shader>
      </div>

      {/* This page is the destination, so the top only needs a way back */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/qdl-mark.png"
              alt="Quantum Data Leap"
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="wordmark text-[24px] sm:text-[28px]">
              QDL
            </span>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900"
          >
            <ArrowRight
              size={15}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to site
          </Link>
        </div>
      </div>

      {/* Tighter than a content section. The form is the point of this page, so
          it should be reachable without scrolling on a laptop. */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12 lg:pb-24 lg:pt-10">
        {/* Badge row, as on every section of the site */}
        <div className="mb-4 flex items-center gap-3 sm:mb-5">
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Request a demo
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-14 xl:gap-20">
          {/* Pitch */}
          <div>
            <h1
              data-reveal
              className="text-[clamp(1.6rem,6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2rem,3.4vw,2.75rem)]"
            >
              Experience Quantum Data
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Leap in action.
            </h1>

            <p
              data-reveal
              style={{ '--reveal-delay': '110ms' } as CSSProperties}
              className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.6] text-gray-700 sm:text-[15.5px]"
            >
              A walkthrough on your own payment flows. Ask the hard questions
              and see how the intelligence layer sits on top of the stack you
              already operate.
            </p>

            <EmbeddedVideo
              src="/video/qdl-demo.mp4"
              poster="/video/qdl-demo-poster.jpg"
              className="mt-8 shadow-[0_18px_50px_-24px_rgba(16,24,40,0.4)]"
            />

            {/* Secondary route in, for anyone not ready to book time */}
            <div
              data-reveal
              style={{ '--reveal-delay': '560ms' } as CSSProperties}
              className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
            >
              <p className="qdl-gradient-text text-[10.5px] font-semibold uppercase tracking-[0.12em]">
                No meeting required
              </p>
              <h2 className="mt-2.5 text-[18px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[20px]">
                Free repair analysis
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                Send a transaction sample and receive a breakdown of what could
                have been repaired automatically.
              </p>
              {/* Opens a compose window in the browser, so it works whatever
                  the machine has registered for mail. */}
              <a
                href={GMAIL_COMPOSE}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-gray-300 px-5 py-2.5 text-[13.5px] font-medium text-gray-900 transition-colors duration-300 hover:border-gray-900 sm:text-[14px]"
              >
                Send a sample
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <p className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-gray-500">
                <a
                  href={MAILTO}
                  className="font-medium text-[#062698] underline underline-offset-2"
                >
                  Use your own mail app
                </a>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center gap-1.5 font-medium text-[#062698] underline underline-offset-2"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[#0a8f6a]" strokeWidth={2.5} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy the address
                    </>
                  )}
                </button>
                <span className="w-full text-gray-400 sm:w-auto">
                  {SAMPLE_ADDRESS}
                </span>
              </p>
            </div>

          </div>

          {/* Form */}
          <div
            data-reveal
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:sticky lg:top-6"
          >
            {/* How much is left, as a line across the top of the card */}
            <div className="h-1 w-full bg-gray-200" aria-hidden="true">
              <div
                className="h-full bg-gradient-to-r from-[#062698] to-[#0867e6] transition-[width] duration-500 ease-out"
                style={{ width: `${(complete / 4) * 100}%` }}
              />
            </div>

            <div className="p-5 sm:p-6">
              {status === 'sent' ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#062698]">
                    <Check size={28} className="text-white" strokeWidth={2.5} />
                  </span>
                  <h2 className="mt-6 text-[22px] font-semibold tracking-[-0.02em] text-gray-900">
                    Thanks, we have it.
                  </h2>
                  <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-gray-600">
                    Someone from the team will be in touch shortly to arrange
                    your walkthrough.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#062698] px-5 py-3 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#0867e6]"
                  >
                    Back to the site
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-gray-900">
                      Schedule a demo
                    </h2>
                    <p className="mt-1 text-[13.5px] text-gray-500">
                      Four questions, then we will do the rest.
                    </p>
                  </div>

                  <Field
                    name="name"
                    label="Full name"
                    value={name}
                    onChange={setName}
                    done={done[0]}
                    autoComplete="name"
                  />

                  <Field
                    name="email"
                    label="Work email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    done={done[1]}
                    autoComplete="email"
                  />

                  <Field
                    name="phone"
                    label="Phone number"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    done={done[2]}
                    autoComplete="tel"
                  />

                  <fieldset className="pt-1">
                    <legend className="text-[13px] font-medium text-gray-900">
                      Are you a regulated financial institution?
                    </legend>
                    <div className="mt-2.5 grid grid-cols-2 gap-3">
                      {(['Yes', 'No'] as const).map((value) => {
                        const active = regulated === value
                        return (
                          <label key={value} className="relative cursor-pointer">
                            <input
                              type="radio"
                              name="regulated"
                              value={value}
                              required
                              checked={active}
                              onChange={() => setRegulated(value)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-[14px] font-medium transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#062698] peer-focus-visible:ring-offset-2 ${
                                active
                                  ? 'border-[#062698] bg-[#eef2ff] text-[#062698] shadow-[0_8px_20px_-12px_rgba(6,38,152,0.75)]'
                                  : 'border-gray-200 bg-white text-gray-600'
                              }`}
                            >
                              {active && (
                                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                              )}
                              {value}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#062698] text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#0867e6] disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Request a demo
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  {/* Sets the expectation the moment they commit to sending */}
                  <p className="text-center text-[12.5px] text-gray-500">
                    We respond within one business day.
                  </p>

                  {status === 'error' && (
                    <p className="text-[13px] leading-relaxed text-[#b0163f]">
                      Something went wrong sending that. Please try again, or
                      email us at{' '}
                      <a
                        href="mailto:support@quantumdataleap.ai"
                        className="font-medium underline underline-offset-2"
                      >
                        support@quantumdataleap.ai
                      </a>
                      .
                    </p>
                  )}

                  <p className="text-[12px] leading-relaxed text-gray-500">
                    By submitting this form you agree to our{' '}
                    <Link
                      to="/privacy-policy"
                      className="underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
