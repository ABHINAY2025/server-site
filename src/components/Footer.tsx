import { Link } from '../router'

/** lucide dropped brand marks in v1, so the LinkedIn glyph is drawn inline */
function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/**
 * A two line footer: the mark and what the company does on one row, the
 * copyright underneath. Deliberately small, so it closes the page rather than
 * becoming another section of it. Carried over from server-site.
 */

const LINKS = [
  { label: 'Contact sales', href: 'mailto:support@quantumdataleap.ai', external: true },
  { label: 'Privacy Policy', href: '/privacy-policy', external: false },
  { label: 'Terms of Service', href: '/terms-of-service', external: false },
]

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* The brand gradient as a hairline, closing the page */}
      <div className="qdl-gradient-bg h-px w-full" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex shrink-0 items-center gap-2.5">
              <img
                src="/qdl-mark.png"
                alt="Quantum Data Leap"
                className="h-8 w-8 object-contain"
              />
              <span className="wordmark text-[22px]">
                QDL
              </span>
            </Link>
            <span
              className="hidden h-4 w-px bg-gray-200 sm:block"
              aria-hidden="true"
            />
            <p className="hidden max-w-[22rem] text-[13px] leading-snug text-gray-500 sm:block">
              Intelligent banking systems, powered by applied artificial
              intelligence.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13.5px] text-gray-600 transition-colors duration-300 hover:text-[#062698]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[13.5px] text-gray-600 transition-colors duration-300 hover:text-[#062698]"
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              href="https://www.linkedin.com/company/quantum-data-leap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="QDL on LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors duration-300 hover:border-[#062698] hover:text-[#062698]"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <p className="mt-6 border-t border-gray-200 pt-5 text-[13px] text-gray-500">
          © {new Date().getFullYear()} Quantum Data Leap. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
