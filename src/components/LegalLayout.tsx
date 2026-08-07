import { ArrowRight } from 'lucide-react'
import Footer from './Footer'
import { Link } from '../router'
import type { Block, LegalDoc } from '../pages/legal-content'

/**
 * Shared shell for the two legal screens.
 *
 * Long documents need a way in, so on wide viewports the sections are listed in
 * a sticky rail beside the prose. The measure is held near 70 characters, which
 * is a good deal narrower than the rest of the site, because legal copy is read
 * line by line rather than scanned.
 */

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.kind === 'list') {
          return (
            <ul key={i} className="mt-4 space-y-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#062698]"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-[1.7] text-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.kind === 'notice') {
          return (
            <p
              key={i}
              className="mt-4 rounded-2xl border border-gray-200 bg-[#F5F5F5] p-5 text-[12.5px] font-medium leading-[1.75] tracking-[0.01em] text-gray-700 sm:p-6 sm:text-[13px]"
            >
              {block.text}
            </p>
          )
        }

        return (
          <p key={i} className="mt-4 text-[15px] leading-[1.7] text-gray-700">
            {block.text}
          </p>
        )
      })}
    </>
  )
}

export default function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <main className="min-h-screen bg-white">
      {/* This screen is a destination, so the top only needs a way back */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/qdl-mark.png"
              alt="Quantum Data Leap"
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="wordmark text-[24px] sm:text-[28px]">
              QDL
            </span>
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

      <section className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-28 lg:pt-20">
        {/* Badge row, as on every section of the site */}
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Legal
          </span>
          {doc.updated && (
            <span className="text-[12px] text-gray-500 sm:text-[13px]">
              {doc.updated}
            </span>
          )}
        </div>

        <h1
          data-reveal
          className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.25rem,4.5vw,3.4rem)]"
        >
          {doc.title}
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,15rem)_minmax(0,46rem)] lg:gap-16">
          {/* Contents */}
          <nav aria-label="On this page" className="lg:sticky lg:top-10 lg:self-start">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 border-l border-gray-200 pl-4">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-[13.5px] leading-snug text-gray-500 transition-colors duration-300 hover:text-[#062698]"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Prose */}
          <div>
            <div className="border-b border-gray-200 pb-8">
              <Blocks blocks={doc.intro} />
            </div>

            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-reveal
                className="scroll-mt-10 border-b border-gray-200 py-8 last:border-b-0"
              >
                <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-gray-900 sm:text-[22px]">
                  {section.heading}
                </h2>
                <Blocks blocks={section.blocks} />
              </section>
            ))}

            <div className="mt-8 rounded-2xl border border-gray-200 bg-[#F5F5F5] p-6 sm:p-7">
              <p className="text-[15px] font-medium text-gray-900">
                Questions about this document?
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                Write to{' '}
                <a
                  href="mailto:support@quantumdataleap.ai"
                  className="font-medium text-[#062698] underline underline-offset-2"
                >
                  support@quantumdataleap.ai
                </a>{' '}
                and someone from the team will come back to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
