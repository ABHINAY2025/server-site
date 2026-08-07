import type { CSSProperties } from 'react'
import DemoLink from './DemoLink'

/** The three intelligence pillars, from the FiSec Global corporate deck */
const PILLARS = [
  {
    title: 'Agentic AI Rules Engine',
    lead: 'Rules that reason, adapt and act autonomously.',
    body: 'Traditional rule engines are static, brittle and expensive to maintain. QDL evaluates payment data in context, learns from outcomes and adjusts decisions in real time. Institutions improve data quality, reduce exceptions and increase straight-through processing without constant manual tuning.',
  },
  {
    title: 'Liquidity Intelligence and Forecasting',
    lead: 'A forward position, not an end of day balance.',
    body: 'Liquidity management today is reactive, fragmented and backward looking. QDL provides real-time visibility and forward-looking insight across accounts, currencies and institutions, enabling treasury teams to anticipate liquidity needs, optimize cash utilization and reduce idle or trapped funds.',
  },
  {
    title: 'AI-Powered Fraud Intelligence',
    lead: 'Detected at the moment the transaction occurs.',
    body: 'Fraud systems typically depend on static thresholds and known patterns, making them slow to respond to emerging threats. QDL combines supervised and unsupervised learning with contextual payment data to identify suspicious behaviour earlier, reduce false positives and adapt to new fraud patterns without manual rule rewrites.',
  },
]

export default function Product() {
  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            3
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            The product
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-8 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-10 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:px-12"
        >
          Three intelligence pillars.
        </h2>

        <div className="px-5 sm:px-8 lg:px-12">
          <p
            data-reveal
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
            className="max-w-[52rem] text-[15px] font-medium leading-[1.65] text-gray-900 sm:text-[17px]"
          >
            Quantum Data Leap is the flagship product of FiSec Global Inc. It is
            built around three tightly integrated intelligence pillars that
            redefine how financial institutions manage payments, liquidity and
            risk. QDL is not a collection of tools. It is an intelligent
            foundation that moves institutions from reactive payment operations
            to adaptive, data-driven financial intelligence.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 lg:mt-16 lg:grid-cols-3 lg:gap-7 lg:px-12">
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` } as CSSProperties}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-8"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#062698] text-[12px] font-semibold text-white">
                {i + 1}
              </span>

              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-gray-900 sm:text-[20px]">
                {pillar.title}
              </h3>

              <p className="mt-2 text-[14px] font-medium leading-snug text-[#062698] sm:text-[15px]">
                {pillar.lead}
              </p>

              <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>

        {/* Closing claim and call to action */}
        <div
          data-reveal
          className="mt-10 flex flex-col items-start gap-6 px-5 sm:mt-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"
        >
          <p className="max-w-[46rem] text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
            Together these capabilities form a unified intelligence layer across
            the payment lifecycle. The platform integrates into existing
            enterprise environments and is built to scale with transaction
            volume, regulatory change and business growth.
          </p>

          <DemoLink />
        </div>
      </div>
    </section>
  )
}
