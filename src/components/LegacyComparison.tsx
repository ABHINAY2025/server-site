import type { CSSProperties } from 'react'

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
}

const ROWS: Row[] = [
  {
    dimension: 'Straight-through rate',
    legacyFigure: '81%',
    legacy: 'Typical for a US regional bank today',
    qdlFigure: '98%',
    qdl: 'Released first-pass, no operator involved',
  },
  {
    dimension: 'Data repair',
    legacyFigure: 'By hand',
    legacy: 'An analyst opens each exception and fixes the field',
    qdlFigure: 'In flight',
    qdl: 'Corrected before the payment reaches a queue',
  },
  {
    dimension: 'Reconciliation',
    legacyFigure: 'Next day',
    legacy: 'Breaks surface after the cycle has closed',
    qdlFigure: 'Continuous',
    qdl: 'Positions agree as payments move, not overnight',
  },
  {
    dimension: 'Case resolution',
    legacyFigure: 'Baseline',
    legacy: 'Investigation time rises with volume',
    qdlFigure: '90% faster',
    qdl: 'Context arrives with the case, already assembled',
  },
]

export default function LegacyComparison() {
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
              className="grid grid-cols-1 gap-4 border-b border-gray-300 py-6 transition-colors duration-200 hover:bg-white/60 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:py-7"
            >
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16px]">
                {row.dimension}
              </h3>

              {/* Legacy */}
              <div className="flex items-baseline gap-3">
                <span className="w-[6.5rem] shrink-0 text-[16px] font-semibold tabular-nums text-gray-400">
                  {row.legacyFigure}
                </span>
                <span className="text-[13px] leading-snug text-gray-500 sm:text-[14px]">
                  {row.legacy}
                </span>
              </div>

              {/* QDL */}
              <div className="flex items-baseline gap-3">
                <span className="qdl-gradient-text w-[6.5rem] shrink-0 text-[21px] font-semibold tabular-nums tracking-[-0.02em] sm:text-[23px]">
                  {row.qdlFigure}
                </span>
                <span className="text-[13px] leading-snug text-gray-900 sm:text-[14px]">
                  {row.qdl}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
