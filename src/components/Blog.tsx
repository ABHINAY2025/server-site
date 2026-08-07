import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * The writing rail, restored from the earlier draft.
 *
 * A slider rather than a grid: the list is long, and a horizontal rail lets it
 * sit in one band instead of pushing the rest of the page down. Scrolling is
 * native, so a trackpad swipe, a touch drag and the arrow buttons all move the
 * same thing, and the scrollbar stays available to anyone using a keyboard.
 */

type Post = {
  title: string
  description: string
  tag: string
  source: string
  readTime: string
  url: string
}

const POSTS: Post[] = [
  {
    title: 'The Rise of AI in Finance Automation',
    description:
      'How artificial intelligence is reshaping financial automation through predictive analytics, fraud detection and real-time decision systems.',
    tag: 'AI & Finance',
    source: 'AIX Circle',
    readTime: '11 min read',
    url: 'https://medium.com/@aixcircleblogs/the-rise-of-ai-in-finance-automation-1509766e2b69',
  },
  {
    title: 'AI in Finance: Automation, Use Cases and Business Impact',
    description:
      'A strategic overview of how AI is implemented in finance to automate process, personalise service and drive sustainable growth.',
    tag: 'Strategy',
    source: 'Growth Jockey',
    readTime: '9 min read',
    url: 'https://www.growthjockey.com/blogs/ai-in-finance',
  },
  {
    title: 'Straight-through processing and the cost of an exception',
    description:
      'Why a payment that stops for repair costs far more than the transaction that carries it, and where the time actually goes.',
    tag: 'Operations',
    source: 'Quantum Data Leap',
    readTime: '7 min read',
    url: '#',
  },
  {
    title: 'ISO 20022 for US regional banks',
    description:
      'What richer payment messaging changes for reconciliation, screening and reporting once the migration deadlines pass.',
    tag: 'Standards',
    source: 'Quantum Data Leap',
    readTime: '8 min read',
    url: '#',
  },
  {
    title: 'Agentic rules engines, and why static thresholds break',
    description:
      'Rule sets grow until nobody will touch them. What changes when the engine learns from outcomes instead.',
    tag: 'Product',
    source: 'Quantum Data Leap',
    readTime: '6 min read',
    url: '#',
  },
  {
    title: 'Maker, checker, and the audit record regulators ask for',
    description:
      'Segregation of duties across fraud, compliance and rules, and what a complete change history has to contain.',
    tag: 'Governance',
    source: 'Quantum Data Leap',
    readTime: '5 min read',
    url: '#',
  },
]

export default function Blog() {
  const railRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  /* Drives whether the arrows are usable, so they are never dead controls. */
  const readPosition = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft >= max - 8)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    readPosition()
    el.addEventListener('scroll', readPosition, { passive: true })
    window.addEventListener('resize', readPosition)
    return () => {
      el.removeEventListener('scroll', readPosition)
      window.removeEventListener('resize', readPosition)
    }
  }, [readPosition])

  const nudge = (direction: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    /* One card plus its gap, so a click always lands on a card edge. */
    const step = el.clientWidth > 900 ? 372 : el.clientWidth * 0.86
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          data-reveal
          className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            7
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Blog
          </span>
        </div>

        <div
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 px-5 sm:px-8 lg:px-12"
        >
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            What we are writing.
          </h2>

          {/* Arrows disable at each end rather than looping, so position is
              always obvious */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous articles"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-all duration-300 hover:border-gray-900 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gray-300"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="More articles"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-all duration-300 hover:border-gray-900 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gray-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* The rail. Scroll snapping keeps cards aligned however it is moved. */}
        <div
          ref={railRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:mt-10 sm:px-8 lg:px-12"
        >
          {POSTS.map((post) => {
            const external = post.url.startsWith('http')
            return (
              <a
                key={post.title}
                href={post.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex w-[85vw] shrink-0 snap-start flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:w-[21rem] sm:p-7"
              >
                <div className="flex items-center gap-2">
                  <span className="qdl-gradient-text text-[10.5px] font-semibold uppercase tracking-[0.12em]">
                    {post.tag}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    · {post.readTime}
                  </span>
                </div>

                <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 sm:text-[18px]">
                  {post.title}
                </h3>

                <p className="mt-2.5 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                  {post.description}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-6 text-[12.5px] font-medium text-gray-500">
                  {post.source}
                  <ArrowRight
                    size={14}
                    className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
