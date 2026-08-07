import { useState, type CSSProperties } from 'react'

/**
 * The "QDL grows with your institution" section.
 *
 * One portrait held in a spotlight beside a roster of the team. Pointing at,
 * focusing or clicking a name moves the spotlight onto that person and brings
 * their claim about the platform with it. Nothing moves on its own, so the
 * section stays quiet until the reader asks something of it.
 */

type Person = {
  photo: string
  accent: string
  name: string
  role: string
  pronouns?: string
  location?: string
  company: string
  /** What QDL does. Every person carries one. */
  eyebrow: string
  headline: string
  body: string
}

const PEOPLE: Person[] = [
  {
    photo: '/images/people/ranjita-bheri.jpg',
    accent: '#fc9a1b',
    name: 'Ranjita Bheri',
    role: 'Entrepreneur, Founder & CEO',
    location: 'San Francisco Bay Area',
    company: 'Quantum Data Leap',
    eyebrow: 'Governance',
    headline: 'Maker, checker, audit trail',
    body: 'Segregation of duties across fraud, compliance and rules.',
  },
  {
    photo: '/images/people/dinesh-paderu.jpg',
    accent: '#b0169c',
    name: 'Dinesh Paderu',
    role: 'Co-Founder & COO',
    location: 'Pleasanton, California',
    company: 'FiSec Global Inc.',
    eyebrow: 'Liquidity',
    headline: 'A forward position, not a balance',
    body: 'Visibility in real time across accounts, currencies and institutions.',
  },
  {
    photo: '/images/people/mahesh-paderu.jpg',
    accent: '#fb5725',
    name: 'Mahesh Paderu',
    role: 'Managing Director',
    company: 'FiSec Global Inc.',
    eyebrow: 'Fraud intelligence',
    headline: 'Caught as it happens',
    body: 'Models score every transaction at the moment it moves, cutting false positives as they go.',
  },
  {
    photo: '/images/people/praveen-bharathi.png',
    accent: '#7b1fb5',
    name: 'Praveen Bharathi',
    role: 'AI Product Manager',
    pronouns: 'He/Him',
    company: 'Quantum Data Leap',
    eyebrow: 'Deployment',
    headline: 'No replatforming',
    body: 'Kafka streaming and batch ETL running beside the core systems you already operate.',
  },
  {
    photo: '/images/people/manoj-kaleru.jpg',
    accent: '#45c8fc',
    name: 'Manoj Kaleru',
    role: 'Operations Manager',
    company: 'FiSec Global Inc.',
    eyebrow: 'Data quality',
    headline: 'Repaired before it settles',
    body: 'Payment data is evaluated in context and corrected in flight, so exceptions never reach the operations queue.',
  },
  {
    photo: '/images/people/goutham.jpg',
    accent: '#2778fc',
    name: 'Goutham',
    role: 'Developer',
    company: 'Quantum Data Leap',
    eyebrow: 'Rules',
    headline: 'Rules that reason',
    body: 'An agentic engine that learns from outcomes instead of a rulebook that breaks.',
  },
]

export default function People() {
  const [active, setActive] = useState(0)
  const person = PEOPLE[active]

  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            8
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            The team
          </span>
        </div>

        <div
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 px-5 sm:px-8 lg:px-12"
        >
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            QDL grows with{' '}
            <span className="text-[#062698]">your institution.</span>
          </h2>
          <p className="text-[15px] font-medium text-gray-900 sm:text-[16px]">
            Banks, processors and treasury teams
          </p>
        </div>

        {/* Spotlight beside the roster */}
        <div
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mt-10 grid grid-cols-1 gap-6 px-5 sm:mt-14 sm:px-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-10 lg:px-12 xl:gap-14"
        >
          {/* Spotlight */}
          <figure className="relative overflow-hidden rounded-2xl bg-[#101318]">
            <span
              className="absolute inset-x-0 top-0 z-20 h-[3px] transition-colors duration-500"
              style={{ background: person.accent }}
              aria-hidden="true"
            />

            <div className="relative aspect-[4/5] w-full">
              <img
                key={person.photo}
                src={person.photo}
                alt={person.name}
                className="sr-spot-in h-full w-full object-cover grayscale contrast-[1.06]"
              />

              <span
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.05) 68%, rgba(0,0,0,0) 100%)',
                }}
                aria-hidden="true"
              />

              <figcaption
                key={`copy-${person.photo}`}
                className="sr-spot-copy-in absolute inset-x-0 bottom-0 p-6 sm:p-7"
              >
                <p
                  className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: person.accent }}
                >
                  {person.eyebrow}
                </p>
                <p className="mt-2.5 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[23px]">
                  {person.headline}
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-white/70 sm:text-[14px]">
                  {person.body}
                </p>

                <div className="mt-5 border-t border-white/15 pt-4">
                  <p className="text-[15px] font-semibold leading-tight text-white">
                    {person.name}
                    {person.pronouns && (
                      <span className="ml-1.5 text-[11px] font-normal text-white/45">
                        {person.pronouns}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-tight text-white/60">
                    {person.role}
                    {person.location ? `, ${person.location}` : ''}
                  </p>
                  <span
                    className="mt-2.5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em]"
                    style={{ color: person.accent }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: person.accent }}
                      aria-hidden="true"
                    />
                    {person.company}
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>

          {/* Roster */}
          <ul className="flex flex-col self-center">
            {PEOPLE.map((entry, i) => {
              const isOn = i === active
              return (
                <li key={entry.photo} className="border-b border-gray-300 last:border-b-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isOn}
                    className="group flex w-full items-center gap-4 py-4 text-left transition-colors duration-300 sm:py-5"
                  >
                    {/* Accent rail marks the selected person */}
                    <span
                      className="h-9 w-[3px] shrink-0 rounded-full transition-all duration-300"
                      style={{
                        background: isOn ? entry.accent : 'transparent',
                      }}
                      aria-hidden="true"
                    />

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[16px] font-semibold tracking-[-0.01em] transition-colors duration-300 sm:text-[18px] ${
                          isOn ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                        }`}
                      >
                        {entry.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-tight text-gray-500 sm:text-[13.5px]">
                        {entry.role}
                      </span>
                    </span>

                    <span
                      className={`hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] transition-opacity duration-300 sm:block ${
                        isOn ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ color: entry.accent }}
                    >
                      {entry.eyebrow}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
