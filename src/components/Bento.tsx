import { Suspense, lazy, type CSSProperties } from 'react'
import ChatMock from './ChatMock'

/* three.js is heavy and the globe sits well below the fold, so it is split out
   of the initial bundle and fetched when this section is reached. */
const Globe = lazy(() => import('./Globe'))

/* Outcomes a bank can expect, rather than figures describing our own reach. */
const FACTS = [
  {
    figure: '4 in 5',
    label: 'exceptions never reach a person',
    body: 'Repaired in flight, so your operations queue shrinks as volume grows.',
  },
  {
    figure: 'Same day',
    label: 'rule changes go live',
    body: 'Business users edit rules in plain language, with maker and checker approval.',
  },
  {
    figure: 'No',
    label: 'core migration required',
    body: 'QDL runs beside the core you already operate. Nothing gets replaced.',
  },
]

export default function Bento() {
  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            4
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            The platform in motion
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-6 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-8 sm:px-8 lg:px-12"
        >
          One position across every corridor,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          answerable in plain language.
        </h2>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mb-10 max-w-[46rem] px-5 text-[14px] leading-relaxed text-gray-600 sm:mb-14 sm:px-8 sm:text-[15px] lg:px-12"
        >
          Payments move continuously across rails, currencies and time zones.
          QDL holds a single view of that flow and lets the desk interrogate it
          without writing a query.
        </p>

        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-12 lg:px-12">
          {/* Globe */}
          <article
            data-reveal
            className="relative overflow-hidden rounded-2xl bg-[#EFEFEF] md:col-span-7"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 80% at 50% 45%, rgba(255,255,255,0.95) 0%, rgba(239,239,239,0) 72%)',
              }}
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="max-w-[26rem]">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#ff5f03]">
                  Global corridors
                </p>
                <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 sm:text-[23px]">
                  ACH, Fedwire and RTP on one live position
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                  Corridors light as value moves between Federal Reserve
                  districts and your correspondents. Drag to spin and tilt.
                </p>
              </div>

              <Suspense
                fallback={
                  <div
                    className="mt-4 h-[20rem] w-full sm:h-[24rem]"
                    aria-hidden="true"
                  />
                }
              >
                <Globe className="mt-4 h-[20rem] w-full sm:h-[24rem]" />
              </Suspense>
            </div>
          </article>

          {/* Assistant */}
          <article
            data-reveal
            style={{ '--reveal-delay': '110ms' } as CSSProperties}
            className="flex flex-col rounded-2xl border border-gray-200 bg-[#F5F5F5] p-6 sm:p-8 md:col-span-5"
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#062698]">
              The assistant
            </p>
            <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 sm:text-[23px]">
              Ask in plain language, answered with the figures
            </h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
              The desk asks, the assistant executes on the instruction and
              replies with the number rather than a paragraph.
            </p>

            <ChatMock className="mt-6" />
          </article>

          {/* Facts */}
          {FACTS.map((fact, i) => (
            <article
              key={fact.label}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` } as CSSProperties}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-7 md:col-span-4"
            >
              <p className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.035em] tabular-nums text-[#062698]">
                {fact.figure}
              </p>
              <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16px]">
                {fact.label}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                {fact.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
