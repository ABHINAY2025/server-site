import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Detection alongside false positives, deliberately. A detection rate on its
 * own says nothing: a model that flags everything scores 100% and buries the
 * team. The pair is what an operations lead actually needs.
 */
const STATS = [
  {
    to: 99.4,
    decimals: 1,
    suffix: '%',
    label: 'detection rate on anomalies, scored in flight',
  },
  {
    to: 1.8,
    decimals: 1,
    suffix: '%',
    label: 'false positive rate, so review queues stay small',
  },
]

const STANDARDS = ['ISO 20022', 'ACH', 'Fedwire', 'RTP']
const DURATION = 1500

function Stat({
  to,
  decimals,
  prefix = '',
  suffix = '',
  label,
  run,
}: {
  to: number
  decimals: number
  prefix?: string
  suffix?: string
  label: string
  run: boolean
}) {
  const [value, setValue] = useState(to)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setValue(0)
    setArmed(true)
  }, [])

  useEffect(() => {
    if (!run || !armed) return
    let raf = 0
    const began = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / DURATION)
      /* Ease out, so the figure lands rather than stopping dead */
      setValue(to * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, armed, to])

  return (
    <div className="px-2 py-8 text-center sm:px-6 sm:py-0">
      <p className="qdl-gradient-text text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-none tracking-[-0.035em] tabular-nums">
        <span aria-hidden="true">
          {prefix}
          {value.toFixed(decimals)}
          {suffix}
        </span>
        <span className="sr-only">{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>
      </p>
      <p className="mx-auto mt-4 max-w-[15rem] text-[14px] leading-snug text-gray-600 sm:text-[15px]">
        {label}
      </p>
    </div>
  )
}

export default function Numbers() {
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
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            1
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Measured outcomes
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-8 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-10 sm:px-8 lg:px-12"
        >
          Structured on arrival,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          settled without intervention.
        </h2>

        <div className="flex flex-wrap items-center gap-3 px-5 sm:px-8 lg:px-12">
          {STANDARDS.map((standard, i) => (
            <span
              key={standard}
              data-reveal
              style={{ '--reveal-delay': `${160 + i * 70}ms` } as CSSProperties}
              className="inline-flex items-center gap-2 rounded-full border border-[#062698]/30 bg-white px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] text-[#062698] sm:text-[14px]"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#062698]"
                aria-hidden="true"
              />
              {standard}
            </span>
          ))}
        </div>

        <div className="mt-10 grid divide-y divide-gray-200 px-5 sm:mt-14 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` } as CSSProperties}
            >
              <Stat {...stat} run={run} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
