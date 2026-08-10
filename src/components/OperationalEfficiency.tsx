import type { CSSProperties } from 'react'
import { Clock, FileWarning, Users, RefreshCw } from 'lucide-react'

/**
 * Operational efficiency.
 *
 * Written in terms of what the operations floor stops doing, rather than in
 * benchmark percentages we cannot stand behind. Each card names a job that
 * currently consumes a person and says what replaces it.
 */

const SHIFTS = [
  {
    icon: FileWarning,
    from: 'An analyst opens each exception and hunts for the missing field',
    to: 'The field is completed from the counterparty record before the payment queues',
    title: 'Exception handling',
  },
  {
    icon: RefreshCw,
    from: 'Breaks surface the next morning, after the cycle has closed',
    to: 'Positions agree continuously, so a break is visible while it can still be fixed',
    title: 'Reconciliation',
  },
  {
    icon: Clock,
    from: 'Rule changes wait on an engineering release',
    to: 'Business users edit rules in plain language, live the same day',
    title: 'Rule changes',
  },
  {
    icon: Users,
    from: 'Headcount grows with payment volume',
    to: 'Volume grows without the queue growing behind it',
    title: 'Scaling',
  },
]

export default function OperationalEfficiency() {
  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
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

        {/* Where the product came from, before what it does. The bottlenecks
            below were found by people who ran these desks. */}
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
            That work set out to find the bottlenecks rather than assume them.
            Four kept recurring across every institution studied, and every one
            of them traces back to payment data arriving incomplete. They are
            what the platform was designed around.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:px-12">
          {SHIFTS.map((shift, i) => {
            const Icon = shift.icon
            return (
              <article
                key={shift.title}
                data-reveal
                style={{ '--reveal-delay': `${(i % 2) * 110}ms` } as CSSProperties}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="qdl-gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <Icon size={17} className="text-white" strokeWidth={1.9} />
                  </span>
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[17px]">
                    {shift.title}
                  </h3>
                </div>

                {/* Today, then instead. The contrast is the whole point. */}
                <div className="mt-5 border-t border-gray-200 pt-4">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Today
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-500 sm:text-[14px]">
                    {shift.from}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="qdl-gradient-text text-[10.5px] font-semibold uppercase tracking-[0.12em]">
                    With QDL
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-900 sm:text-[14px]">
                    {shift.to}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
