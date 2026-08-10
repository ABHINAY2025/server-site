import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Operational efficiency.
 *
 * Where a bank sits on straight-through processing, by tier. The point of the
 * chart is the gap: the largest banks clear almost everything first-pass, and
 * every tier below pays for the difference in salaried hours. A regional bank
 * should be able to find its own band before it reads a word of copy.
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
  { label: 'Money center', detail: 'Over $500B in assets', stp: 97 },
  { label: 'Super-regional', detail: '$100B to $500B', stp: 92 },
  { label: 'Regional', detail: '$10B to $100B', stp: 84, focus: true },
  { label: 'Community', detail: 'Under $10B', stp: 73 },
]

function Bar({ tier, run, index }: { tier: Tier; run: boolean; index: number }) {
  return (
    <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto] sm:gap-6">
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

      <div className="h-3.5 overflow-hidden rounded-full bg-gray-200 sm:h-4">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
            tier.focus ? 'qdl-gradient-bg' : 'bg-gray-400'
          }`}
          style={{
            width: run ? `${tier.stp}%` : '0%',
            transitionDelay: `${index * 130}ms`,
          }}
        />
      </div>

      <span
        className={`w-[3.4rem] text-right text-[15px] font-semibold tabular-nums sm:text-[17px] ${
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
            1
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
          Work the operations floor
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          stops having to do.
        </h2>

        {/* Where the product came from, before what it does */}
        <div
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mb-10 max-w-[52rem] px-5 sm:mb-14 sm:px-8 lg:px-12"
        >
          <p className="text-[15px] leading-relaxed text-gray-900 sm:text-[16px]">
            QDL was built from extensive research into how payment operations
            actually run, carried out with industry practitioners who have spent
            their careers inside these functions.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
            That work set out to find the bottlenecks rather than assume them,
            and every one traced back to the same place: payment data arriving
            incomplete, and a person paid to finish it.
          </p>
        </div>

        {/* The chart */}
        <div
          data-reveal
          style={{ '--reveal-delay': '220ms' } as CSSProperties}
          className="px-5 sm:px-8 lg:px-12"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-9">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              Typical straight-through rate by bank tier
            </p>

            <div className="mt-7 space-y-6 sm:space-y-7">
              {TIERS.map((tier, i) => (
                <Bar key={tier.label} tier={tier} run={run} index={i} />
              ))}
            </div>

            <p className="mt-8 border-t border-gray-200 pt-5 text-[12.5px] leading-relaxed text-gray-500">
              Straight-through processing is the share of payments that settle
              without anyone touching them. Indicative industry ranges, shown to
              locate your own bank rather than to benchmark it. The regional band
              is highlighted.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
