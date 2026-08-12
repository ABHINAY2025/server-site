import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Where QDL adds value, by the function that feels it.
 *
 * Organised by who inside the bank benefits rather than by capability, because
 * the reader is usually one of these four people and wants to find themselves
 * quickly. Each card leads with the figure that matters to that desk.
 *
 * Every number here is one QDL publishes for its own platform. Nothing is
 * presented as an industry benchmark, which is a claim we would have to source.
 */

type Area = {
  function: string
  headline: string
  figure: string
  unit: string
  caption: string
  body: string
  support: { value: string; label: string }[]
}

const AREAS: Area[] = [
  {
    function: 'Payment operations',
    headline: 'Fewer payments ever reach a person',
    figure: '80.5',
    unit: '%',
    caption: 'released first-pass, with no operator involved',
    body: 'Exceptions are repaired in flight rather than queued for an analyst, so the operations desk absorbs volume growth without absorbing headcount.',
    support: [
      { value: '6%', label: 'corrected automatically in flight' },
      { value: '0.8s', label: 'ledger sync beside the core' },
    ],
  },
  {
    function: 'Risk and compliance',
    headline: 'Caught early, without burying the queue',
    figure: '99.4',
    unit: '%',
    caption: 'detection rate on anomalies, scored as the payment moves',
    body: 'Detection only means something alongside the false positive rate. Scoring happens at the moment of the transaction rather than in an overnight batch, so a held payment can still be released the same day.',
    support: [
      { value: '1.8%', label: 'false positive rate' },
      { value: '100%', label: 'rule changes with an audit record' },
    ],
  },
  {
    function: 'Investigations',
    headline: 'Cases close in a fraction of the time',
    figure: '90',
    unit: '%',
    caption: 'less time to resolve each case',
    body: 'Context arrives with the case already assembled, so an investigator starts from the evidence rather than spending the first hour gathering it from four systems.',
    support: [
      { value: '1,284', label: 'live rules in production' },
      { value: 'Same day', label: 'rule changes go live' },
    ],
  },
  {
    function: 'Treasury',
    headline: 'A forward position, not yesterday’s balance',
    figure: '10',
    unit: ' months',
    caption: 'of forward position, projected continuously',
    body: 'Funding decisions move from after-the-fact adjustment to planning against a forecast, with idle and trapped balances surfaced while they can still be put to work.',
    support: [
      { value: 'Continuous', label: 'position updates as payments move' },
      { value: 'All rails', label: 'ACH, Fedwire and RTP in one view' },
    ],
  },
]

function Card({
  area,
  run,
  index,
}: {
  area: Area
  run: boolean
  index: number
}) {
  const [value, setValue] = useState(0)
  const target = Number(area.figure)
  const numeric = !Number.isNaN(target)
  const decimals = area.figure.includes('.') ? 1 : 0

  useEffect(() => {
    if (!run || !numeric) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf = 0
    const began = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - began - index * 120) / 1400)
      if (t > 0) setValue(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, numeric, target, index])

  return (
    <article
      data-reveal
      style={{ '--reveal-delay': `${(index % 2) * 110}ms` } as CSSProperties}
      className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-8"
    >
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        {area.function}
      </p>

      <p className="qdl-gradient-text mt-4 text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.035em] tabular-nums">
        <span aria-hidden="true">
          {numeric ? value.toFixed(decimals) : area.figure}
          {area.unit}
        </span>
        <span className="sr-only">{`${area.figure}${area.unit}`}</span>
      </p>
      <p className="mt-2.5 text-[13.5px] leading-snug text-gray-600 sm:text-[14px]">
        {area.caption}
      </p>

      <h3 className="mt-6 text-[17px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[18px]">
        {area.headline}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600 sm:text-[14px]">
        {area.body}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-4 border-t border-gray-200 pt-5 sm:gap-6">
        {area.support.map((item) => (
          <div key={item.label}>
            <p className="text-[16px] font-semibold tabular-nums text-gray-900 sm:text-[17px]">
              {item.value}
            </p>
            <p className="mt-1 text-[12px] leading-snug text-gray-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}

export default function OperationalEfficiency() {
  const ref = useRef<HTMLElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRun(true)
        io.disconnect()
      },
      { threshold: 0.2 },
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
            Where QDL adds value
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-6 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-8 sm:px-8 lg:px-12"
        >
          What changes for your bank,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          and by how much.
        </h2>

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
            That work traced every bottleneck back to the same place: payment
            data arriving incomplete, and someone paid to finish it. These are
            the four desks that feel the difference when it arrives complete
            instead.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 lg:grid-cols-2 lg:gap-7 lg:px-12">
          {AREAS.map((area, i) => (
            <Card key={area.function} area={area} run={run} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
