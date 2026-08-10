import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * Latest updates.
 *
 * One story is open at a time in a large panel, with the rest standing beside
 * it as narrow strips. Selecting a strip promotes it. This reads better than a
 * row of equal cards: the eye is given somewhere to land, and the strips carry
 * enough of their image to be worth clicking without competing for attention.
 *
 * The strips collapse below the panel on narrow screens, where there is no room
 * to stand them alongside.
 */

type Post = {
  title: string
  tag: string
  source: string
  description: string
  image: string
  url: string
}

const POSTS: Post[] = [
  {
    title: 'Agentic AI',
    tag: 'Agentic AI',
    source: 'Medium',
    description:
      'An introduction to agentic AI systems and how autonomous decisioning is reshaping enterprise workflows.',
    image: '/images/stock/agentic-ai.jpg',
    url: 'https://medium.com/@aixcircleblogs/the-rise-of-ai-in-finance-automation-1509766e2b69',
  },
  {
    title: 'The cost of an exception',
    tag: 'Operations',
    source: 'Quantum Data Leap',
    description:
      'Why a payment that stops for repair costs far more than the transaction that carries it, and where the time actually goes.',
    image: '/images/stock/fraud.jpg',
    url: '#',
  },
  {
    title: 'ISO 20022 for US regional banks',
    tag: 'Standards',
    source: 'Quantum Data Leap',
    description:
      'What richer payment messaging changes for reconciliation, screening and reporting once the migration deadlines pass.',
    image: '/images/stock/payments.jpg',
    url: '#',
  },
  {
    title: 'Rules that reason',
    tag: 'Product',
    source: 'Quantum Data Leap',
    description:
      'Rule sets grow until nobody will touch them. What changes when the engine learns from outcomes instead of thresholds.',
    image: '/images/stock/automation.jpg',
    url: '#',
  },
  {
    title: 'Maker, checker, audit record',
    tag: 'Governance',
    source: 'Quantum Data Leap',
    description:
      'Segregation of duties across fraud, compliance and rules, and what a complete change history has to contain.',
    image: '/images/stock/compliance.jpg',
    url: '#',
  },
  {
    title: 'Deploying beside the core',
    tag: 'Deployment',
    source: 'Quantum Data Leap',
    description:
      'Streaming and batch ingestion running alongside the systems you already operate, without a migration programme.',
    image: '/images/stock/real-time-payments.jpg',
    url: '#',
  },
]

export default function Blog() {
  const [active, setActive] = useState(0)
  const post = POSTS[active]
  const external = post.url.startsWith('http')

  const step = useCallback((direction: 1 | -1) => {
    setActive((current) => (current + direction + POSTS.length) % POSTS.length)
  }, [])

  /* Arrow keys move the selection once the rail has focus. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = document.activeElement
      if (!el?.closest?.('[data-blog-rail]')) return
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading and controls */}
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4"
        >
          {/* Both lines rise from behind their own mask, as the hero does */}
          <div>
            <h2 className="reveal-mask text-[clamp(1.5rem,4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-gray-900">
              <span
                data-reveal
                style={{ '--reveal-y': '100%' } as CSSProperties}
                className="block"
              >
                Latest updates
              </span>
            </h2>
            <p className="reveal-mask mt-1 text-[clamp(1.1rem,2.6vw,1.7rem)] font-medium leading-tight tracking-[-0.02em] text-gray-400">
              <span
                data-reveal
                style={
                  {
                    '--reveal-y': '100%',
                    '--reveal-delay': '110ms',
                  } as CSSProperties
                }
                className="block"
              >
                Insight and analysis from Quantum Data Leap.
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous update"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#062698] transition-colors duration-300 hover:bg-[#dfe6ff]"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next update"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#062698] transition-colors duration-300 hover:bg-[#dfe6ff]"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Panel and strips */}
        <div
          data-blog-rail
          data-reveal
          style={{ '--reveal-delay': '120ms' } as CSSProperties}
          className="mt-8 flex gap-2.5 sm:mt-10"
        >
          {/* The open story */}
          <a
            href={post.url}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-[#0b1c3d]"
          >
            {/* Every image is mounted and crossfaded rather than swapped by
                key. Remounting restarts the fetch and decode, so the entrance
                animation played over a blank frame and the picture appeared
                afterwards, which read as no animation at all. */}
            <div className="relative h-[18rem] w-full sm:h-[24rem] lg:h-[30rem]">
              {POSTS.map((item, i) => (
                <img
                  key={item.title}
                  src={item.image}
                  alt=""
                  aria-hidden={i !== active}
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>

            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(0deg, rgba(4,12,30,0.86) 0%, rgba(4,12,30,0.25) 42%, rgba(4,12,30,0) 72%)',
              }}
              aria-hidden="true"
            />

            <div
              key={`copy-${post.image}`}
              className="sr-spot-copy-in absolute inset-x-0 bottom-0 p-5 sm:p-7"
            >
              <span className="inline-flex rounded-md bg-white/20 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                {post.tag}
              </span>
              <h3 className="mt-3 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
                {post.title}
              </h3>
            </div>
          </a>

          {/* The rest, as strips. Hidden where there is no room for them. */}
          <div className="hidden gap-2.5 md:flex">
            {POSTS.map((item, i) =>
              i === active ? null : (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Open: ${item.title}`}
                  className="group relative h-[24rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#0b1c3d] transition-[width] duration-500 ease-out hover:w-[6rem] lg:h-[30rem] lg:w-[5.5rem] lg:hover:w-[7rem]"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0"
                    aria-hidden="true"
                  />
                </button>
              ),
            )}
          </div>
        </div>

        {/* Description and link, beneath the panel */}
        <div
          data-reveal
          style={{ '--reveal-delay': '180ms' } as CSSProperties}
          className="mt-6 flex flex-wrap items-start justify-between gap-x-10 gap-y-3"
        >
          <p
            key={`desc-${post.image}`}
            className="sr-spot-copy-in max-w-[56ch] text-[14.5px] leading-relaxed text-gray-600 sm:text-[15.5px]"
          >
            <span className="font-semibold text-gray-900">{post.source}.</span>{' '}
            {post.description}
          </p>

          <a
            href={post.url}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-medium text-[#062698] transition-colors duration-300 hover:text-[#0867e6] sm:text-[15px]"
          >
            Read the article
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
