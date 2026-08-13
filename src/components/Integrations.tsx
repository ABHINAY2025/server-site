import type { CSSProperties } from 'react'
import {
  Database,
  Server,
  Leaf,
  Cloud,
  Workflow,
  MessageSquare,
  Users,
  Webhook,
} from 'lucide-react'

/**
 * Data connectors, arranged as an orbit around the mark.
 *
 * The ring says the thing the copy would otherwise have to: QDL sits in the
 * middle of a stack that already exists, rather than replacing part of it.
 *
 * Icons stand in for the vendor logos. Those are trademarks and have to come
 * from each vendor's own brand assets, so drawing lookalikes here would be
 * both inaccurate and not ours to do.
 */

type Connector = {
  name: string
  icon: typeof Database
  tone: string
}

/* Ordered clockwise from the top, so the ring reads in a sensible sequence. */
const CONNECTORS: Connector[] = [
  { name: 'PostgreSQL', icon: Database, tone: '#336791' },
  { name: 'MySQL', icon: Database, tone: '#00758f' },
  { name: 'Oracle', icon: Server, tone: '#c74634' },
  { name: 'MongoDB', icon: Leaf, tone: '#13aa52' },
  { name: 'Amazon S3', icon: Cloud, tone: '#569a31' },
  { name: 'Apache Kafka', icon: Workflow, tone: '#231f20' },
  { name: 'Slack', icon: MessageSquare, tone: '#611f69' },
  { name: 'Teams', icon: Users, tone: '#4b53bc' },
  { name: 'REST API', icon: Webhook, tone: '#062698' },
]

const STATS = [
  { value: '9', label: 'Native sources' },
  { value: '0', label: 'Data migration' },
]

/** Where each chip sits on the ring, clockwise from the top. */
function seat(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + Math.cos(angle) * 42}%`,
    top: `${50 + Math.sin(angle) * 42}%`,
  }
}

function Chip({ connector }: { connector: Connector }) {
  const Icon = connector.icon
  return (
    <>
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
        style={{ background: `${connector.tone}14` }}
      >
        <Icon size={15} style={{ color: connector.tone }} strokeWidth={1.9} />
      </span>
      <span className="whitespace-nowrap text-[13px] font-semibold text-gray-900 sm:text-[13.5px]">
        {connector.name}
      </span>
    </>
  )
}

export default function Integrations() {
  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16">
          {/* The claim */}
          <div>
            <p
              data-reveal
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#fb5725]"
            >
              Data connectors
            </p>

            <h2
              data-reveal
              style={{ '--reveal-delay': '80ms' } as CSSProperties}
              className="mt-5 text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-gray-900"
            >
              Quantum Data Leap plugs into the stack you already run.
            </h2>

            <hr
              data-reveal
              style={{ '--reveal-delay': '140ms' } as CSSProperties}
              className="mt-8 border-gray-300"
            />

            <p
              data-reveal
              style={{ '--reveal-delay': '180ms' } as CSSProperties}
              className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-gray-600 sm:text-[16px]"
            >
              Databases, NoSQL, object storage, streaming and REST endpoints
              connect in minutes. Results land back in Slack and Teams.
            </p>

            <div
              data-reveal
              style={{ '--reveal-delay': '240ms' } as CSSProperties}
              className="mt-9 flex gap-12"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.03em] text-gray-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The ring. Chips are seated on a circle at large sizes, and fall
              back to a plain grid where there is no room to orbit anything. */}
          <div
            data-reveal
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
            className="relative"
          >
            <div className="relative hidden aspect-square w-full lg:block">
              {/* Orbit paths, drifting slowly so the ring is not inert */}
              <svg
                viewBox="0 0 100 100"
                className="sr-orbit absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {[0, 60, 120].map((rotation) => (
                  <ellipse
                    key={rotation}
                    cx="50"
                    cy="50"
                    rx="42"
                    ry="27"
                    fill="none"
                    stroke="#fb5725"
                    strokeOpacity="0.28"
                    strokeWidth="0.3"
                    transform={`rotate(${rotation} 50 50)`}
                  />
                ))}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#d4d4d8"
                  strokeWidth="0.25"
                />
              </svg>

              {/* The mark, held in the middle */}
              <div className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-[0_8px_30px_-12px_rgba(16,24,40,0.25)]">
                <img
                  src="/qdl-mark.png"
                  alt="Quantum Data Leap"
                  className="h-[46%] w-[46%] object-contain"
                />
              </div>

              {CONNECTORS.map((connector, i) => (
                <div
                  key={connector.name}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-[0_2px_10px_-4px_rgba(16,24,40,0.18)] transition-transform duration-300 hover:scale-105"
                  style={seat(i, CONNECTORS.length)}
                >
                  <Chip connector={connector} />
                </div>
              ))}
            </div>

            {/* Narrow screens */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
              {CONNECTORS.map((connector) => (
                <div
                  key={connector.name}
                  className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
                >
                  <Chip connector={connector} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
