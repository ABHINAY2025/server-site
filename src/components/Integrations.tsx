import type { CSSProperties } from 'react'

/**
 * Supported connectors.
 *
 * Grouped by how the data actually arrives rather than by vendor, because the
 * question a bank asks is "can you read what we already produce", not "is my
 * logo on your website". Photography rather than line icons, so the section
 * reads as financial infrastructure rather than as a developer tools page.
 */

const CONNECTORS = [
  {
    image: '/images/stock/payments.jpg',
    name: 'Core banking',
    detail: 'FIS, Fiserv, Jack Henry and in-house cores, read beside the ledger',
    systems: ['FIS', 'Fiserv', 'Jack Henry'],
  },
  {
    image: '/images/stock/real-time-payments.jpg',
    name: 'Payment rails',
    detail: 'Messages ingested as they arrive, across every domestic rail',
    systems: ['ACH', 'Fedwire', 'RTP', 'FedNow'],
  },
  {
    image: '/images/stock/automation.jpg',
    name: 'Streaming and batch',
    detail: 'Continuous topics or scheduled files, whichever you already run',
    systems: ['Kafka', 'Kinesis', 'SFTP', 'NACHA'],
  },
  {
    image: '/images/stock/agentic-ai.jpg',
    name: 'Warehouses',
    detail: 'Read directly from the analytics estate, with no copy step',
    systems: ['Snowflake', 'Databricks', 'BigQuery', 'Redshift'],
  },
  {
    image: '/images/stock/fraud.jpg',
    name: 'Risk and compliance',
    detail: 'Case management and screening, kept in step with decisions',
    systems: ['Sanctions screening', 'Case management'],
  },
  {
    image: '/images/stock/compliance.jpg',
    name: 'Identity',
    detail: 'Single sign-on through the provider your bank already uses',
    systems: ['Okta', 'Entra ID', 'Ping', 'SAML'],
  },
]

export default function Integrations() {
  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            6
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Integrations
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-6 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-8 sm:px-8 lg:px-12"
        >
          Reads what you already produce.
        </h2>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mb-10 max-w-[46rem] px-5 text-[14px] leading-relaxed text-gray-600 sm:mb-14 sm:px-8 sm:text-[15px] lg:px-12"
        >
          Connectors sit beside your systems rather than in front of them.
          Nothing is migrated, and no format has to change before QDL can work
          with it.
        </p>

        <div className="grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:grid-cols-3 lg:px-12">
          {CONNECTORS.map((connector, i) => (
            <article
              key={connector.name}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-[9.5rem] overflow-hidden bg-[#0b1c3d] sm:h-[10.5rem]">
                <img
                  src={connector.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(4,12,30,0.72) 0%, rgba(4,12,30,0.1) 55%, rgba(4,12,30,0) 100%)',
                  }}
                  aria-hidden="true"
                />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-[17px] font-semibold tracking-[-0.01em] text-white sm:text-[18px]">
                  {connector.name}
                </h3>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                  {connector.detail}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {connector.systems.map((system) => (
                    <span
                      key={system}
                      className="rounded-full border border-gray-200 px-2.5 py-1 text-[11.5px] font-medium text-gray-600"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
