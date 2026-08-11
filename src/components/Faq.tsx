import { useState, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '../router'

/**
 * Common questions.
 *
 * The questions a payments lead asks before they will book time: what it does
 * to a payment, what it costs them to run, who stays in control, and where the
 * data sits. One answer is open at a time, so the section closes the page
 * argument rather than becoming another wall of copy.
 */

type Item = {
  question: string
  answer: string
  /** Optional route the answer sends the reader to for the long version. */
  link?: { label: string; to: string }
}

const ITEMS: Item[] = [
  {
    question: 'What does QDL do to a payment?',
    answer:
      'It reads the payment as it arrives, completes the fields that are missing or malformed, and releases it before it reaches an exception queue. Anything it cannot finish on its own is handed to an operator with the repair already proposed, a confidence score attached and the evidence in view.',
  },
  {
    question: 'Do we have to replace our core to use it?',
    answer:
      'No. QDL runs beside the systems you already operate and ingests from them by stream or by batch, so nothing about the core changes. There is no migration programme and no replatforming to schedule.',
  },
  {
    question: 'Is QDL certified for ISO 20022?',
    answer:
      'QDL is built for ISO 20022 payment messaging, and works with the ACH, Fedwire and RTP formats already moving through your rails. Certification of a payment message belongs to the scheme and the sending bank; what we take on is that richer messaging arrives structured and stays that way.',
  },
  {
    question: 'Who stays in control of an automated repair?',
    answer:
      'Your team does. Every proposed repair can be approved, modified or rejected, the confidence behind it is shown rather than implied, and each decision is written to an audit record with the operator, the timestamp and the before and after values.',
    link: { label: 'How we handle data', to: '/data-handling' },
  },
  {
    question: 'Where does our data live, and is it used for training?',
    answer:
      'Customer payment data is processed for your instance only and is not used to train models for anyone else. Residency, access controls and retention are set out in full on the data handling page.',
    link: { label: 'Read the data handling page', to: '/data-handling' },
  },
  {
    question: 'How do we find out what this would be worth to us?',
    answer:
      'Send a transaction sample and we will come back with a breakdown of what could have been repaired automatically, drawn from your own traffic rather than a benchmark. It costs nothing and it is the fastest way to see the size of the gap.',
    link: { label: 'Request a free repair analysis', to: '/demo' },
  },
]

function Row({
  item,
  open,
  onToggle,
  index,
}: {
  item: Item
  open: boolean
  onToggle: () => void
  index: number
}) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-question-${index}`

  return (
    <div
      data-reveal
      style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
      className="border-b border-gray-300"
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left lg:py-7"
        >
          <span
            className={`text-[16px] font-semibold tracking-[-0.01em] transition-colors duration-300 sm:text-[18px] ${
              open ? 'text-gray-900' : 'text-gray-700'
            }`}
          >
            {item.question}
          </span>
          {/* The arrow turns to point at the answer as it opens, and nudges
              forward under the pointer. Same control the rail uses. */}
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
              open
                ? 'bg-[#062698] text-white'
                : 'bg-[#eef2ff] text-[#062698] group-hover:bg-[#dfe6ff]'
            }`}
          >
            <ArrowRight
              size={16}
              className={`transition-transform duration-500 ease-out ${
                open ? 'rotate-90' : 'group-hover:translate-x-0.5'
              }`}
            />
          </span>
        </button>
      </h3>

      {/* Height is animated by grid rows so the copy never has to be measured */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        /* Collapsed copy is hidden outright, not just squeezed to nothing, so
           a closed answer keeps its links out of the tab order. */
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open
            ? 'visible grid-rows-[1fr] opacity-100'
            : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[60ch] pb-6 pr-10 text-[14.5px] leading-relaxed text-gray-600 sm:text-[15.5px] lg:pb-7">
            {item.answer}
          </p>
          {item.link ? (
            <Link
              to={item.link.to}
              className="mb-6 inline-flex text-[14px] font-medium text-[#062698] transition-colors duration-300 hover:text-[#0867e6] lg:mb-7"
            >
              {item.link.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* Search engines read the answers from here rather than inferring them from a
   collapsed accordion, which is what makes the section eligible for a rich
   result. Kept in sync with ITEMS by construction. */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="faq"
      className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            6
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Common questions
          </span>
        </div>

        <h2
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mb-6 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-8 sm:px-8 lg:px-12"
        >
          The questions that come up
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          before the first call.
        </h2>

        <div className="px-5 sm:px-8 lg:px-12">
          {ITEMS.map((item, i) => (
            <Row
              key={item.question}
              item={item}
              index={i}
              open={open === i}
              /* Collapsing the open row leaves nothing expanded, which is a
                 valid state: the reader is done. */
              onToggle={() => setOpen((current) => (current === i ? -1 : i))}
            />
          ))}
        </div>

        <p
          data-reveal
          className="mt-10 px-5 text-[14px] leading-relaxed text-gray-600 sm:px-8 sm:text-[15px] lg:px-12"
        >
          Something not answered here?{' '}
          <Link
            to="/demo"
            className="font-medium text-[#062698] transition-colors duration-300 hover:text-[#0867e6]"
          >
            Send it to us
          </Link>{' '}
          and we will respond within one business day.
        </p>
      </div>
    </section>
  )
}
