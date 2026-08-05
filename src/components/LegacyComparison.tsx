/**
 * Legacy stack against QDL, stated in figures.
 *
 * The dimensions and the qualitative contrast come from server-site's
 * platform-bento comparison table. Every figure on the QDL side is a real
 * number carried over from that site: settlement and repair rates from the
 * data quality panel, 99.4% and 90% and $280M from the savings band, the rule
 * counts from the governance panel, and the 0.8s ledger sync from the
 * deployment panel.
 */

import type { CSSProperties } from 'react'

type Row = {
  dimension: string
  legacy: string
  legacyFigure: string
  qdl: string
  qdlFigure: string
}

const ROWS: Row[] = [
  {
    dimension: 'Settlement',
    legacy: 'Repaired by hand in an operations queue',
    legacyFigure: 'Manual',
    qdl: 'Released without manual intervention',
    qdlFigure: '80.5%',
  },
  {
    dimension: 'Exceptions',
    legacy: 'Corrected after the payment has settled',
    legacyFigure: 'After the fact',
    qdl: 'Repaired in flight by the rules engine',
    qdlFigure: '6%',
  },
  {
    dimension: 'Fraud',
    legacy: 'Reviewed in an overnight batch',
    legacyFigure: 'Next day',
    qdl: 'Anomalies flagged in flight',
    qdlFigure: '99.4%',
  },
  {
    dimension: 'Investigation',
    legacy: 'Analyst works each case by hand',
    legacyFigure: 'Baseline',
    qdl: 'Less time to resolve each case',
    qdlFigure: '90%',
  },
  {
    dimension: 'Liquidity',
    legacy: 'Reported once at the end of the day',
    legacyFigure: '1 per day',
    qdl: 'Forward position projected continuously',
    qdlFigure: '10 months',
  },
  {
    dimension: 'Rules',
    legacy: 'Static thresholds, rewritten by engineers',
    legacyFigure: 'Engineering',
    qdl: 'Live rules, every change with an audit record',
    qdlFigure: '1,284',
  },
  {
    dimension: 'Deployment',
    legacy: 'A multi year replatforming programme',
    legacyFigure: 'Years',
    qdl: 'Change capture beside the core ledger',
    qdlFigure: '0.8s',
  },
  {
    dimension: 'Operating cost',
    legacy: 'Rises in step with transaction volume',
    legacyFigure: 'Scales up',
    qdl: 'Returned in annual operating cost',
    qdlFigure: '$280M',
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
            4
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
          The same payment,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          handled two ways.
        </h2>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mb-10 max-w-[46rem] px-5 text-[14px] leading-relaxed text-gray-600 sm:mb-14 sm:px-8 sm:text-[15px] lg:px-12"
        >
          Everything a legacy stack does after the fact, QDL does as it happens.
          The figures below are the platform operating at production volume.
        </p>

        <div className="px-5 sm:px-8 lg:px-12">
          {/* Column headings, desktop only */}
          <div className="hidden grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,1fr)] gap-6 border-b border-gray-200 pb-4 lg:grid">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Dimension
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Legacy systems
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#062698]">
              Quantum Data Leap
            </span>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.dimension}
              data-reveal
              style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
              className="group grid grid-cols-1 gap-4 border-b border-gray-200 py-6 transition-colors duration-200 hover:bg-gray-50 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:py-7"
            >
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16px]">
                {row.dimension}
              </h3>

              {/* Legacy */}
              <div className="flex items-baseline gap-3">
                <span className="w-[6.5rem] shrink-0 text-[15px] font-semibold tabular-nums text-gray-400 sm:text-[16px]">
                  {row.legacyFigure}
                </span>
                <span className="text-[13px] leading-snug text-gray-500 sm:text-[14px]">
                  {row.legacy}
                </span>
              </div>

              {/* QDL */}
              <div className="flex items-baseline gap-3">
                <span className="w-[6.5rem] shrink-0 text-[20px] font-semibold tabular-nums tracking-[-0.02em] text-[#062698] sm:text-[22px]">
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
