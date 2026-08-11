import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ARCHIVE, formatDate } from '../lib/posts'
import { navigate } from '../router'

/**
 * The full index, underneath the rail.
 *
 * The rail promotes six stories and asks the reader to choose between them.
 * This is the other job: every article we have published, newest first, as
 * plain cards a search engine can read and a reader can scan. Real anchors,
 * real headings, real dates, no JavaScript required to see any of it.
 */

const MEDIUM_PROFILE = 'https://medium.com/@aixcircleblogs'

/* Structured data wants absolute URLs. Update this if the site moves. */
const SITE = 'https://quantumdataleap.ai'

/* The index as data, so a crawler gets the list without having to infer it
   from the markup. Titles, dates and destinations only: the articles
   themselves live on Medium. */
const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Quantum Data Leap',
  description:
    'Applied AI in banking, payments and operations, from the Quantum Data Leap team.',
  blogPost: ARCHIVE.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: post.external ? post.href : `${SITE}${post.href}`,
    publisher: { '@type': 'Organization', name: 'Quantum Data Leap' },
  })),
}

export default function BlogArchive() {
  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_SCHEMA) }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4"
        >
          <div>
            <h2 className="text-[clamp(1.5rem,4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-gray-900">
              All articles
            </h2>
            <p className="mt-1 text-[14.5px] leading-relaxed text-gray-600 sm:text-[15.5px]">
              {ARCHIVE.length} pieces on applied AI in banking, payments and
              operations.
            </p>
          </div>

          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-medium text-[#062698] transition-colors duration-300 hover:text-[#0867e6] sm:text-[15px]"
          >
            Follow us on Medium
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {ARCHIVE.map((post, i) => (
            <article
              key={post.href}
              data-reveal
              /* The delay resets each row so a wide grid does not finish its
                 last card noticeably after the reader has arrived at it. */
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as CSSProperties}
              className="h-full"
            >
              <a
                href={post.href}
                target={post.external ? '_blank' : undefined}
                rel={post.external ? 'noopener noreferrer' : undefined}
                onClick={(event) => {
                  /* Our own articles are routes. Anything but a plain left
                     click still belongs to the browser. */
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
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#0b1c3d]">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    <span className="text-[#062698]">{post.tag}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 sm:text-[18px]">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-gray-600 sm:text-[14.5px]">
                    {post.description}
                  </p>

                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13.5px] font-medium text-[#062698] transition-colors duration-300 group-hover:text-[#0867e6]">
                    {post.external ? (
                      <>
                        Read on {post.source}
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    ) : (
                      <>
                        Read the article
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
