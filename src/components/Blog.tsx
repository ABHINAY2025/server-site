import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { FEATURED as POSTS } from '../lib/posts'
import { navigate } from '../router'

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

export default function Blog() {
  const [active, setActive] = useState(0)
  /* Where the pointer can hover, a panel is already open by the time it is
     clicked, so the click should follow the link. Where it cannot, the first
     tap has to open the panel instead, or a reader is sent to an article they
     never saw. */
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  /* Pointing at a panel opens it without committing the selection, so the
     accordion answers immediately and the row returns to the chosen story on
     the way out. */
  const [hovered, setHovered] = useState<number | null>(null)
  const open = hovered ?? active
  const post = POSTS[open]

  const step = useCallback((direction: 1 | -1) => {
    setHovered(null)
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

        {/* One accordion row. Pointing at a panel opens it the whole way and
            the rest fall back to slivers. Every image stays mounted, so an
            open never waits on a fetch. */}
        <div
          data-blog-rail
          data-reveal
          style={{ '--reveal-delay': '120ms' } as CSSProperties}
          className="mt-8 flex gap-2.5 sm:mt-10"
        >
          {POSTS.map((item, i) => {
            const isOpen = i === open

            return (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                data-open={isOpen}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={(event) => {
                  /* A closed panel on a touch screen opens rather than
                     navigating, so nobody is sent to an article they never
                     saw. */
                  if (!canHover && !isOpen) {
                    event.preventDefault()
                    setActive(i)
                    return
                  }
                  setActive(i)
                  /* Our own articles are a route, so they are taken in the app
                     rather than as a fresh page load. Modifier clicks fall
                     through to the browser. */
                  if (
                    !item.external &&
                    event.button === 0 &&
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey
                  ) {
                    event.preventDefault()
                    navigate(item.href)
                    window.scrollTo(0, 0)
                  }
                }}
                aria-label={`${item.title}. ${item.tag}.`}
                aria-current={isOpen}
                className="blog-item group relative block h-[18rem] min-w-0 overflow-hidden rounded-2xl bg-[#0b1c3d] text-left sm:h-[24rem] lg:h-[30rem]"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Closed panels sit back so the open one carries the section */}
                <span
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ background: 'rgba(4,12,30,0.45)' }}
                  aria-hidden="true"
                />

                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(4,12,30,0.86) 0%, rgba(4,12,30,0.25) 42%, rgba(4,12,30,0) 72%)',
                  }}
                  aria-hidden="true"
                />

                {/* Copy only once the panel is wide enough to hold it */}
                <span
                  className={`pointer-events-none absolute inset-x-0 bottom-0 block whitespace-nowrap p-5 transition-all duration-500 sm:p-7 ${
                    isOpen
                      ? 'translate-y-0 opacity-100 delay-150'
                      : 'translate-y-3 opacity-0'
                  }`}
                >
                  <span className="inline-flex rounded-md bg-white/20 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span className="mt-3 block text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
                    {item.title}
                  </span>
                </span>
              </a>
            )
          })}
        </div>

        {/* Description and link, beneath the panel */}
        <div
          data-reveal
          style={{ '--reveal-delay': '180ms' } as CSSProperties}
          className="mt-6 flex flex-wrap items-start justify-between gap-x-10 gap-y-3"
        >
          <p
            key={`desc-${post.href}`}
            className="sr-spot-copy-in max-w-[56ch] text-[14.5px] leading-relaxed text-gray-600 sm:text-[15.5px]"
          >
            <span className="font-semibold text-gray-900">{post.source}.</span>{' '}
            {post.description}
          </p>

          <a
            href={post.href}
            target={post.external ? '_blank' : undefined}
            rel={post.external ? 'noopener noreferrer' : undefined}
            onClick={(event) => {
              if (post.external || event.button !== 0) return
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return
              }
              event.preventDefault()
              navigate(post.href)
              window.scrollTo(0, 0)
            }}
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
