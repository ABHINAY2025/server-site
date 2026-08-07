import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Where a bank sits on straight-through processing, by tier.
 *
 * The point of the chart is the gap: the largest banks clear almost everything
 * first-pass, and every tier below pays for the difference in salaried hours.
 * A regional bank should be able to find its own band and read what the gap
 * costs before it reads a word of copy.
 */

type Tier = {
  label: string
  detail: string
  /** Typical straight-through rate for the tier, as a percentage. */
  stp: number
  /** True for the band this site is written for. */
  focus?: boolean
}

const TIERS: Tier[] = [
  {
    label: 'Money center',
    detail: 'Over $500B in assets',
    stp: 97,
  },
  {
    label: 'Super-regional',
    detail: '$100B to $500B',
    stp: 92,
  },
  {
    label: 'Regional',
    detail: '$10B to $100B',
    stp: 84,
    focus: true,
  },
  {
    label: 'Community',
    detail: 'Under $10B',
    stp: 73,
  },
]

/** What the gap costs, expressed the way an operations lead measures it. */
const COSTS = [
  {
    figure: '16%',
    label: 'of payments touched by hand',
    body: 'At an 84% straight-through rate, roughly one payment in six reaches an operator before it settles.',
  },
  {
    figure: '3.2x',
    label: 'the exception load of the top tier',
    body: 'The same volume generates several times the manual work when first-pass rates sit thirteen points lower.',
  },
  {
    figure: '98%',
    label: 'reachable without replatforming',
    body: 'QDL repairs the data causing those exceptions, on the core you already run.',
  },
]

function Bar({ tier, run, index }: { tier: Tier; run: boolean; index: number }) {
  return (
    <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_auto] sm:gap-5">
      <div>
        <p
          className={`text-[13.5px] font-semibold tracking-[-0.01em] sm:text-[15px] ${
            tier.focus ? 'text-gray-900' : 'text-gray-600'
          }`}
        >
          {tier.label}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-tight text-gray-400 sm:text-[12px]">
          {tier.detail}
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200 sm:h-3.5">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
            tier.focus ? 'qdl-gradient-bg' : 'bg-gray-400'
          }`}
          style={{
            width: run ? `${tier.stp}%` : '0%',
            transitionDelay: `${index * 120}ms`,
          }}
        />
      </div>

      <span
        className={`w-[3.2rem] text-right text-[14px] font-semibold tabular-nums sm:text-[16px] ${
          tier.focus ? 'qdl-gradient-text' : 'text-gray-500'
        }`}
      >
        {tier.stp}%
      </span>
    </div>
  )
}

export default function OperationalEfficiency() {
  const ref = useRef<HTMLElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRun(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRun(true)
        io.disconnect()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            2
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Operational efficiency
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-6 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-8 sm:px-8 lg:px-12"
        >
          The straight-through gap
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          is paid for in salaried hours.
        </h2>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mb-10 max-w-[46rem] px-5 text-[14px] leading-relaxed text-gray-600 sm:mb-14 sm:px-8 sm:text-[15px] lg:px-12"
        >
          Straight-through processing is the share of payments that settle
          without anyone touching them. The largest US banks clear almost
          everything first-pass. Every tier below absorbs the difference as
          manual repair work.
        </p>

        {/* The chart */}
        <div
          data-reveal
          style={{ '--reveal-delay': '220ms' } as CSSProperties}
          className="px-5 sm:px-8 lg:px-12"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              Typical straight-through rate by bank tier
            </p>

            <div className="mt-6 space-y-5 sm:space-y-6">
              {TIERS.map((tier, i) => (
                <Bar key={tier.label} tier={tier} run={run} index={i} />
              ))}
            </div>

            <p className="mt-7 border-t border-gray-200 pt-4 text-[12px] leading-relaxed text-gray-500">
              Indicative industry ranges, shown to locate your own bank rather
              than to benchmark it. The regional band is highlighted.
            </p>
          </div>
        </div>

        {/* What the gap costs */}
        <div className="mt-10 grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 lg:mt-14 lg:grid-cols-3 lg:gap-7 lg:px-12">
          {COSTS.map((cost, i) => (
            <article
              key={cost.label}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` } as CSSProperties}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-7"
            >
              <p className="qdl-gradient-text text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.035em] tabular-nums">
                {cost.figure}
              </p>
              <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16px]">
                {cost.label}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                {cost.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
