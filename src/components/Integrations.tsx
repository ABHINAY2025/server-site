import type { CSSProperties } from 'react'
import {
  Database,
  Radio,
  FileSpreadsheet,
  Landmark,
  Cloud,
  Workflow,
  ShieldCheck,
  Boxes,
} from 'lucide-react'

/**
 * Supported connectors.
 *
 * Grouped by how the data actually arrives rather than by vendor, because the
 * question a bank asks is "can you read what we already produce", not "is my
 * logo on your website".
 */

const CONNECTORS = [
  {
    icon: Landmark,
    name: 'Core banking',
    detail: 'FIS, Fiserv, Jack Henry and in-house cores, read beside the ledger',
  },
  {
    icon: Radio,
    name: 'Payment rails',
    detail: 'ACH, Fedwire, RTP and FedNow, ingested as messages arrive',
  },
  {
    icon: Workflow,
    name: 'Streaming',
    detail: 'Kafka and Kinesis topics, consumed continuously',
  },
  {
    icon: Database,
    name: 'Warehouses',
    detail: 'Snowflake, Databricks, BigQuery and Redshift',
  },
  {
    icon: FileSpreadsheet,
    name: 'Batch and files',
    detail: 'NACHA, BAI2, MT and ISO 20022 files over SFTP',
  },
  {
    icon: Cloud,
    name: 'Cloud storage',
    detail: 'S3, Azure Blob and GCS, scheduled or event driven',
  },
  {
    icon: Boxes,
    name: 'Operational systems',
    detail: 'Case management, sanctions screening and ERP',
  },
  {
    icon: ShieldCheck,
    name: 'Identity',
    detail: 'SAML and OIDC through Okta, Entra ID and Ping',
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

        <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {CONNECTORS.map((connector, i) => {
            const Icon = connector.icon
            return (
              <article
                key={connector.name}
                data-reveal
                style={{ '--reveal-delay': `${(i % 4) * 90}ms` } as CSSProperties}
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-6"
              >
                <span className="qdl-gradient-bg flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon size={18} className="text-white" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16px]">
                  {connector.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600">
                  {connector.detail}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
