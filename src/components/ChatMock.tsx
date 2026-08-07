import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * The QDL assistant, answering a run of questions the way a treasury desk
 * actually asks them. The conversation plays itself: a question is sent, the
 * assistant thinks, and the reply arrives as a figure rather than a paragraph.
 *
 * Drawn in markup rather than screenshotted, so it stays crisp at any size and
 * costs no network. It settles on the finished thread for anyone who has asked
 * for reduced motion.
 */

/** How long the assistant appears to think before a reply lands. */
const THINK_PAUSE = 1600
/** Reading time on a reply before the next question is sent. */
const REPLY_PAUSE = 4800
/** Beat at the end of the thread before it starts over. */
const RESTART_PAUSE = 6000
/** Settling beat before the first question is sent. */
const OPENING_PAUSE = 900

type Reply = 'position' | 'rails' | 'stp' | 'risk' | 'payment'

type Msg =
  | { role: 'user'; text: string }
  | { role: 'bot'; text: string; reply?: Reply }

const THREAD: Msg[] = [
  { role: 'user', text: 'What is our net position today?' },
  {
    role: 'bot',
    text: '$38.4M across every rail, up 6.4% on yesterday.',
    reply: 'position',
  },
  { role: 'user', text: 'Break that down by rail.' },
  { role: 'bot', text: 'ACH carries most of it.', reply: 'rails' },
  { role: 'user', text: 'How is straight through processing tracking?' },
  {
    role: 'bot',
    text: '98.2% this week, four points ahead of last.',
    reply: 'stp',
  },
  { role: 'user', text: 'Anything flagged for review?' },
  {
    role: 'bot',
    text: '412 payments held. Velocity is driving most of it.',
    reply: 'risk',
  },
  { role: 'user', text: 'Repair and release the Meridian wire' },
  {
    role: 'bot',
    text: 'Beneficiary address completed from the counterparty record. Ready for your approval.',
    reply: 'payment',
  },
]

const PANEL =
  'mt-2.5 rounded-xl bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.08)]'
const EYEBROW =
  'text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400'

/* ---------- Figures the assistant replies with ---------- */

const COLUMNS = [34, 41, 38, 52, 47, 58, 55, 67, 63, 74, 71, 86, 82, 95]

function PositionFigure() {
  return (
    <div className={PANEL}>
      <p className={EYEBROW}>Net position today</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-gray-900">
          $38.4M
        </span>
        <span className="text-[11px] font-semibold text-[#0e9f6e]">▲ 6.4%</span>
      </div>
      <div className="mt-2.5 flex h-11 items-end gap-[3px]">
        {COLUMNS.map((h, i) => (
          <span
            key={i}
            className="sr-chat-rise flex-1 rounded-sm"
            style={
              {
                height: `${h}%`,
                '--i': i,
                background:
                  i > COLUMNS.length - 4
                    ? 'linear-gradient(180deg,#fb5725,#b0169c)'
                    : '#e6e9f0',
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}

const RAIL_ROWS = [
  { label: 'ACH', value: '$22.6M', pct: 82, tone: '#2778fc' },
  { label: 'Fedwire', value: '$11.2M', pct: 54, tone: '#b0169c' },
  { label: 'RTP', value: '$4.6M', pct: 31, tone: '#fb5725' },
]

function RailsFigure() {
  return (
    <div className={`${PANEL} space-y-2`}>
      {RAIL_ROWS.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between text-[11px]">
            <span className="font-medium text-gray-900">{r.label}</span>
            <span className="text-gray-600">{r.value}</span>
          </div>
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-[#eef0f5]">
            <span
              className="sr-chat-grow block h-full rounded-full"
              style={
                { width: `${r.pct}%`, background: r.tone, '--i': i } as CSSProperties
              }
            />
          </span>
        </div>
      ))}
    </div>
  )
}

const STP_WEEKS = [88, 90, 89, 92, 94, 93, 96, 98.2]

function StpFigure() {
  const min = 84
  const max = 100
  const x = (i: number) => (i * 200) / (STP_WEEKS.length - 1)
  const y = (v: number) => 46 - ((v - min) / (max - min)) * 40
  const line = STP_WEEKS.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ')

  return (
    <div className={PANEL}>
      <div className="flex items-baseline justify-between">
        <p className={EYEBROW}>Straight through</p>
        <span className="text-[16px] font-semibold leading-none tracking-[-0.02em] text-gray-900">
          98.2%
        </span>
      </div>
      <svg viewBox="0 0 200 52" className="mt-2 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="chatStpFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e9f6e" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#0e9f6e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L 200 52 L 0 52 Z`} fill="url(#chatStpFill)" />
        <path
          d={line}
          fill="none"
          stroke="#0e9f6e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={x(STP_WEEKS.length - 1)}
          cy={y(STP_WEEKS[STP_WEEKS.length - 1])}
          r="3.5"
          fill="#fff"
          stroke="#0e9f6e"
          strokeWidth="2"
        />
      </svg>
      <p className="text-[10px] text-gray-400">Last eight weeks</p>
    </div>
  )
}

const RISK_DRIVERS = [
  { label: 'Velocity', count: 248, pct: 100 },
  { label: 'Counterparty', count: 104, pct: 42 },
  { label: 'Amount deviation', count: 60, pct: 24 },
]

function RiskFigure() {
  return (
    <div className={PANEL}>
      <div className="flex items-baseline justify-between">
        <p className={EYEBROW}>Held for review</p>
        <span className="text-[16px] font-semibold leading-none tracking-[-0.02em] text-gray-900">
          412
        </span>
      </div>
      <div className="mt-2.5 space-y-2">
        {RISK_DRIVERS.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-[5.5rem] shrink-0 text-[10.5px] leading-tight text-gray-600">
              {d.label}
            </span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef0f5]">
              <span
                className="sr-chat-grow block h-full rounded-full"
                style={
                  {
                    width: `${d.pct}%`,
                    background: 'linear-gradient(90deg,#ec4899,#e11d48)',
                    '--i': i,
                  } as CSSProperties
                }
              />
            </span>
            <span className="w-6 text-right text-[10.5px] font-medium text-gray-900">
              {d.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const CHECKS = [
  { label: 'Sanctions', value: 'Clear' },
  { label: 'Liquidity', value: 'Funded' },
]

/** The confidence the engine puts on its own repair. */
const CONFIDENCE = 96

function PaymentFigure() {
  return (
    <div className={PANEL}>
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] font-semibold text-gray-900">
          Meridian Manufacturing
        </span>
        <span className="text-[13px] font-semibold text-gray-900">
          $240,000.00
        </span>
      </div>
      <p className="mt-0.5 text-[11px] text-gray-400">
        Fedwire · ABA 021000021 · value today
      </p>

      {/* What was repaired, and how sure the engine is about it */}
      <div className="mt-2.5 rounded-lg bg-[#f5f6f8] p-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">
            Repair confidence
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-[#0e9f6e]">
            {CONFIDENCE}%
          </span>
        </div>
        <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[#e3e6ec]">
          <span
            className="sr-chat-grow block h-full rounded-full"
            style={
              {
                width: `${CONFIDENCE}%`,
                background: 'linear-gradient(90deg,#0867e6,#0e9f6e)',
                '--i': 0,
              } as CSSProperties
            }
          />
        </span>
        <p className="mt-1.5 text-[10.5px] leading-snug text-gray-500">
          Beneficiary address completed from the counterparty record
        </p>
      </div>

      <ul className="mt-2.5 space-y-1.5">
        {CHECKS.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-[11px]">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" fill="#e7f6f0" />
              <path
                d="M4.8 8.2l2.1 2.1 4.3-4.3"
                stroke="#0e9f6e"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-gray-600">{c.label}</span>
            <span className="ml-auto font-medium text-gray-900">{c.value}</span>
          </li>
        ))}
      </ul>

      {/* Nothing releases itself. A person approves, amends or refuses. */}
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <span className="rounded-lg bg-[#062698] px-2 py-1.5 text-center text-[11px] font-semibold text-white">
          Approve
        </span>
        <span className="rounded-lg border border-gray-200 px-2 py-1.5 text-center text-[11px] font-medium text-gray-700">
          Modify
        </span>
        <span className="rounded-lg border border-gray-200 px-2 py-1.5 text-center text-[11px] font-medium text-[#b0163f]">
          Reject
        </span>
      </div>

      <p className="mt-2.5 border-t border-gray-200 pt-2 text-[10px] leading-snug text-gray-400">
        Audit record #48213 · maker J. Alvarez · checker pending · every field
        change retained
      </p>
    </div>
  )
}

function Figure({ reply }: { reply: Reply }) {
  switch (reply) {
    case 'position':
      return <PositionFigure />
    case 'rails':
      return <RailsFigure />
    case 'stp':
      return <StpFigure />
    case 'risk':
      return <RiskFigure />
    case 'payment':
      return <PaymentFigure />
  }
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ChatMock({ className = '' }: { className?: string }) {
  /* Anyone who has asked for reduced motion gets the settled thread instead */
  const [reduced] = useState(prefersReduced)
  const [shown, setShown] = useState(() => (prefersReduced() ? THREAD.length : 0))
  const [typing, setTyping] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  /* The conversation waits for the reader. It begins when the panel comes into
     view and holds where it is whenever it leaves again. */
  useEffect(() => {
    const el = rootRef.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  const live = !reduced && inView

  useEffect(() => {
    if (!live) return

    if (shown >= THREAD.length) {
      const id = window.setTimeout(() => setShown(0), RESTART_PAUSE)
      return () => window.clearTimeout(id)
    }

    if (THREAD[shown].role === 'user') {
      const id = window.setTimeout(
        () => setShown((n) => n + 1),
        shown === 0 ? OPENING_PAUSE : REPLY_PAUSE,
      )
      return () => window.clearTimeout(id)
    }

    /* The assistant thinks before it answers */
    setTyping(true)
    const id = window.setTimeout(() => {
      setTyping(false)
      setShown((n) => n + 1)
    }, THINK_PAUSE)
    return () => {
      window.clearTimeout(id)
      setTyping(false)
    }
  }, [live, shown])

  /* Keep the newest message in view without moving the page itself */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: live ? 'smooth' : 'auto' })
  }, [shown, typing, live])

  return (
    <div
      ref={rootRef}
      className={`flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-gray-200 px-4 py-3">
        <img
          src="/qdl-mark.png"
          alt=""
          className="h-7 w-7 shrink-0 object-contain"
        />
        <span className="text-[13px] font-semibold text-gray-900">
          QDL Assistant
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0e9f6e]" />
          Online
        </span>
      </div>

      {/* Conversation */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex h-[19.5rem] flex-col gap-3 overflow-y-auto p-4 sm:h-[21rem]"
      >
        {THREAD.slice(0, shown).map((msg, i) =>
          msg.role === 'user' ? (
            <p
              key={i}
              className="sr-chat-msg ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#062698] px-3.5 py-2.5 text-[12.5px] leading-snug text-white"
            >
              {msg.text}
            </p>
          ) : (
            <div
              key={i}
              className="sr-chat-msg max-w-[92%] rounded-2xl rounded-bl-md bg-[#f5f6f8] p-3"
            >
              <p className="text-[12.5px] leading-snug text-gray-600">
                {msg.text}
              </p>
              {msg.reply && <Figure reply={msg.reply} />}
            </div>
          ),
        )}

        {typing && (
          <div className="sr-chat-msg sr-typing flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-[#f5f6f8] px-3.5 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-gray-200 px-3 py-2.5">
        <span className="flex-1 text-[12px] text-gray-400">
          Ask anything about your money
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#062698]">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
            <path
              d="M2 8h11M8.5 3.5L13 8l-4.5 4.5"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}
