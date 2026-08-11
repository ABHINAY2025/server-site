import { useEffect, type CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Footer from '../components/Footer'
import { Link, navigate } from '../router'
import { ARTICLES_BY_SLUG, readingTime, type Block } from '../lib/articles'
import { formatDate, relatedTo } from '../lib/posts'

/**
 * One article.
 *
 * The page a search result lands on, so it carries the whole argument: the
 * piece itself, then a way to act on it, then somewhere else to read. Title
 * and description are written into the document head on mount, since the site
 * renders on the client and a crawler that executes JavaScript should still
 * find the right metadata.
 */

const SITE = 'https://quantumdataleap.ai'

function Prose({ block }: { block: Block }) {
  if (block.kind === 'h2') {
    return (
      <h2 className="mt-10 text-[20px] font-semibold tracking-[-0.02em] text-gray-900 sm:mt-12 sm:text-[24px]">
        {block.text}
      </h2>
    )
  }

  if (block.kind === 'ul') {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className="qdl-gradient-bg mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full"
              aria-hidden="true"
            />
            <span className="text-[15px] leading-relaxed text-gray-700 sm:text-[16.5px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  if (block.kind === 'quote') {
    return (
      <blockquote className="mt-8 border-l-2 border-[#062698] pl-5 text-[17px] font-medium leading-relaxed tracking-[-0.01em] text-gray-900 sm:text-[19px]">
        {block.text}
      </blockquote>
    )
  }

  return (
    <p className="mt-5 text-[15px] leading-[1.75] text-gray-700 sm:text-[16.5px]">
      {block.text}
    </p>
  )
}

export default function ArticlePage({ slug }: { slug: string }) {
  const article = ARTICLES_BY_SLUG.get(slug)

  useEffect(() => {
    if (!article) return
    const previousTitle = document.title
    document.title = `${article.title} | Quantum Data Leap`

    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', article.description)

    /* A canonical tag matters here: the same piece may be syndicated later. */
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = `${SITE}/blog/${article.slug}`
    document.head.appendChild(canonical)

    return () => {
      document.title = previousTitle
      meta?.setAttribute('content', previousDescription)
      canonical.remove()
    }
  }, [article])

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start px-5 py-24 sm:px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
            Not found
          </p>
          <h1 className="mt-3 text-[clamp(1.6rem,4vw,2.6rem)] font-semibold tracking-[-0.02em] text-gray-900">
            That article has moved, or never existed.
          </h1>
          <Link
            to="/blog"
            className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#062698] transition-colors duration-300 hover:text-[#0867e6]"
          >
            Back to all articles
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const related = relatedTo(`/blog/${article.slug}`, article.tag)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: `${SITE}/blog/${article.slug}`,
    image: `${SITE}${article.image}`,
    author: { '@type': 'Organization', name: 'Quantum Data Leap' },
    publisher: { '@type': 'Organization', name: 'Quantum Data Leap' },
    articleSection: article.tag,
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/qdl-mark.png"
              alt="Quantum Data Leap"
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="wordmark text-[24px] sm:text-[28px]">QDL</span>
          </Link>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900"
          >
            <ArrowRight
              size={15}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            All articles
          </Link>
        </div>
      </div>

      {/* The piece */}
      <article className="mx-auto w-full max-w-[46rem] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <div
          data-reveal
          className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400"
        >
          <span className="text-[#062698]">{article.tag}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime(article)} min read</span>
        </div>

        <h1
          data-reveal
          style={{ '--reveal-delay': '60ms' } as CSSProperties}
          className="mt-4 text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-gray-900"
        >
          {article.title}
        </h1>

        <p
          data-reveal
          style={{ '--reveal-delay': '120ms' } as CSSProperties}
          className="mt-5 text-[17px] leading-relaxed text-gray-500 sm:text-[18.5px]"
        >
          {article.description}
        </p>

        <img
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          src={article.image}
          alt=""
          className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
        />

        <div className="qdl-gradient-bg mt-8 h-px w-full" aria-hidden="true" />

        <div data-reveal style={{ '--reveal-delay': '180ms' } as CSSProperties}>
          {article.body.map((block, i) => (
            <Prose key={i} block={block} />
          ))}
        </div>

        {/* What to do with it */}
        <aside className="mt-14 rounded-2xl border border-gray-200 bg-[#F5F5F5] p-6 sm:p-8">
          <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[20px]">
            See it against your own traffic
          </h2>
          <p className="mt-2.5 max-w-[44ch] text-[14.5px] leading-relaxed text-gray-600 sm:text-[15.5px]">
            Send a transaction sample and we will come back with a breakdown of
            what could have been repaired automatically. We respond within one
            business day.
          </p>
          <Link
            to="/demo"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#062698] px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#0867e6]"
          >
            Request a free repair analysis
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </aside>
      </article>

      {/* Related */}
      <section className="border-t border-gray-200 bg-white pb-16 pt-12 sm:pb-20 sm:pt-16">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.25rem,3vw,1.9rem)] font-semibold tracking-[-0.02em] text-gray-900">
            Keep reading
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {related.map((post) => (
              <a
                key={post.href}
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
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] sm:p-6"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#062698]">
                  {post.tag}
                </span>
                <span className="mt-3 text-[16px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 sm:text-[17px]">
                  {post.title}
                </span>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13.5px] font-medium text-[#062698] transition-colors duration-300 group-hover:text-[#0867e6]">
                  {post.external ? (
                    <>
                      Read on {post.source}
                      <ArrowUpRight size={15} />
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
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
