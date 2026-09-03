import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Legacy stack against QDL, cut down to the reconciliation story.
 *
 * The long version listed eight dimensions and read as a feature matrix. Four
 * rows, all about getting payment data to agree, land harder: each one pairs a
 * figure with the thing an operations lead measures.
 */

type Row = {
  dimension: string
  legacy: string
  legacyFigure: string
  qdl: string
  qdlFigure: string
  /** Shown in the panel that follows the pointer across this row. */
  image: string
}

const ROWS: Row[] = [
  {
    dimension: 'Straight-through rate',
    legacyFigure: '81%',
    legacy: 'Typical for a US regional bank today',
    qdlFigure: '98%',
    qdl: 'Released first-pass, no operator involved',
    image: '/images/product/straight-through.jpg',
  },
  {
    dimension: 'Data repair',
    legacyFigure: 'By hand',
    legacy: 'An analyst opens each exception and fixes the field',
    qdlFigure: 'In flight',
    qdl: 'Corrected before the payment reaches a queue',
    image: '/images/product/data-repair.jpg',
  },
  {
    dimension: 'Reconciliation',
    legacyFigure: 'Next day',
    legacy: 'Breaks surface after the cycle has closed',
    qdlFigure: 'Continuous',
    qdl: 'Positions agree as payments move, not overnight',
    image: '/images/product/reconciliation.jpg',
  },
  {
    dimension: 'Case resolution',
    legacyFigure: 'Baseline',
    legacy: 'Investigation time rises with volume',
    qdlFigure: '90% faster',
    qdl: 'Context arrives with the case, already assembled',
    image: '/images/product/case-resolution.jpg',
  },
]

const PANEL_W = 460
const PANEL_H = 216

export default function LegacyComparison() {
  /* Which row the pointer is over, and where to put the panel. */
  const [active, setActive] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const frame = useRef(0)

  /* Pointer devices only. There is no hover on touch, and a panel chasing a
     finger would sit underneath it. */
  useEffect(() => {
    setEnabled(
      window.matchMedia('(hover: hover)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  const move = useCallback((event: React.PointerEvent) => {
    const { clientX, clientY } = event
    /* Coalesced into a frame: pointermove fires far more often than the screen
       refreshes, so setting state on every event is wasted work. */
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      setPos({
        /* Clamped, so a row near an edge cannot push the panel off screen. */
        x: Math.min(
          Math.max(clientX + 28, 12),
          window.innerWidth - PANEL_W - 12,
        ),
        y: Math.min(
          Math.max(clientY - PANEL_H / 2, 12),
          window.innerHeight - PANEL_H - 12,
        ),
      })
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            5
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Legacy systems compared
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-6 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-8 sm:px-8 lg:px-12"
        >
          Getting the data to agree,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          before it costs you a cycle.
        </h2>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mb-10 max-w-[46rem] px-5 text-[14px] leading-relaxed text-gray-600 sm:mb-14 sm:px-8 sm:text-[15px] lg:px-12"
        >
          Everything a legacy stack reconciles after the fact, QDL reconciles as
          it happens.
        </p>

        <div className="px-5 sm:px-8 lg:px-12">
          {/* Column headings, desktop only */}
          <div className="hidden grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] gap-6 border-b border-gray-300 pb-4 lg:grid">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Measure
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Legacy stack
            </span>
            <span className="qdl-gradient-text text-[11px] font-semibold uppercase tracking-[0.1em]">
              Quantum Data Leap
            </span>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.dimension}
              data-reveal
              style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
              onPointerEnter={enabled ? () => setActive(i) : undefined}
              onPointerLeave={enabled ? () => setActive(null) : undefined}
              onPointerMove={enabled ? move : undefined}
              className={`grid grid-cols-1 gap-4 border-b border-gray-300 py-6 transition-colors duration-200 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:py-7 ${
                active === i ? 'bg-white' : 'hover:bg-white/60'
              }`}
            >
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16px]">
                {row.dimension}
              </h3>

              {/* Legacy. Figure above its description rather than beside it:
                  the values are words as often as numbers, so no fixed column
                  width fits them all. */}
              <div>
                <span className="block text-[16px] font-semibold text-gray-400">
                  {row.legacyFigure}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-gray-500 sm:text-[14px]">
                  {row.legacy}
                </span>
              </div>

              {/* QDL */}
              <div>
                <span className="qdl-gradient-text block text-[21px] font-semibold leading-tight tracking-[-0.02em] sm:text-[23px]">
                  {row.qdlFigure}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-gray-900 sm:text-[14px]">
                  {row.qdl}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* One shared panel pinned to the pointer. Every image is mounted and
          crossfaded rather than swapped by key: remounting restarts the fetch,
          so the first hover over each row would flash an empty frame. */}
      {enabled && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed z-50 overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_24px_60px_-18px_rgba(16,24,40,0.45)] transition-opacity duration-200 ${
            active === null ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${PANEL_W}px`,
            height: `${PANEL_H}px`,
          }}
        >
          {ROWS.map((row, i) => (
            <img
              key={row.dimension}
              src={row.image}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-300 ${
                active === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
