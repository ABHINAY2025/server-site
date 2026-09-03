import type { CSSProperties } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Footer from '../components/Footer'
import DemoLink from '../components/DemoLink'
import { Link } from '../router'
import { useSeo, SITE } from '../lib/seo'
import type { Solution } from './solutions-content'

/**
 * One template behind every solution landing page.
 *
 * Each page answers a single search: the problem in the reader's own words,
 * the answer, three specifics, the figures, then the questions a buyer asks
 * before they will book anything.
 *
 * The FAQ is also emitted as JSON-LD, which is what lets those answers appear
 * directly in a result rather than only on the page.
 */
export default function SolutionPage({ solution }: { solution: Solution }) {
  useSeo({
    title: solution.title,
    description: solution.description,
    path: `/${solution.slug}`,
  })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: solution.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top bar */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/qdl-mark.png"
              alt={SITE.name}
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="wordmark text-[24px] sm:text-[28px]">QDL</span>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900"
          >
            <ArrowRight
              size={15}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to site
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12">
        <p
          data-reveal
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#fb5725]"
        >
          {solution.eyebrow}
        </p>

        <h1
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
          className="mt-5 max-w-[22ch] text-[clamp(1.9rem,5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900"
        >
          {solution.heading}
        </h1>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
          className="mt-6 max-w-[52ch] text-[15px] leading-[1.65] text-gray-700 sm:text-[17px]"
        >
          {solution.lead}
        </p>

        <div
          data-reveal
          style={{ '--reveal-delay': '240ms' } as CSSProperties}
          className="mt-8"
        >
          <DemoLink />
        </div>

        {/* Figures */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-gray-200 pt-8 sm:grid-cols-3 sm:gap-8">
          {solution.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
            >
              <p className="qdl-gradient-text text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                {stat.value}
              </p>
              <p className="mt-2.5 text-[13.5px] leading-snug text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem, then answer */}
      <section className="bg-[#F5F5F5] py-14 sm:py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
          <article
            data-reveal
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              Today
            </p>
            <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-gray-900 sm:text-[23px]">
              {solution.problem.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
              {solution.problem.body}
            </p>
          </article>

          <article
            data-reveal
            style={{ '--reveal-delay': '110ms' } as CSSProperties}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
          >
            <p className="qdl-gradient-text text-[10.5px] font-semibold uppercase tracking-[0.12em]">
              With QDL
            </p>
            <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-gray-900 sm:text-[23px]">
              {solution.answer.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
              {solution.answer.body}
            </p>
          </article>
        </div>
      </section>

      {/* Specifics */}
      <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {solution.points.map((point, i) => (
            <article
              key={point.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:p-7"
            >
              <span className="qdl-gradient-bg flex h-9 w-9 items-center justify-center rounded-xl">
                <Check size={17} className="text-white" strokeWidth={2.2} />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[17px]">
                {point.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600 sm:text-[14px]">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Questions a buyer asks */}
      <section className="bg-[#F5F5F5] py-14 sm:py-18 lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <h2
            data-reveal
            className="text-[clamp(1.4rem,3.2vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-gray-900"
          >
            Common questions.
          </h2>

          <dl className="mt-8 max-w-[52rem] divide-y divide-gray-300 border-t border-gray-300">
            {solution.faqs.map((faq, i) => (
              <div
                key={faq.q}
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                className="py-6"
              >
                <dt className="text-[15.5px] font-semibold tracking-[-0.01em] text-gray-900 sm:text-[16.5px]">
                  {faq.q}
                </dt>
                <dd className="mt-2.5 text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-10">
            <DemoLink />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
