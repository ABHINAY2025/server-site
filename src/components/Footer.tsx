import { Mail } from 'lucide-react'
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
 * The site map, at the end of the page.
 *
 * Every destination here resolves to something that exists: a route, a section
 * of the home page, or an address someone answers. Capability names that had no
 * page behind them are pointed at the section that demonstrates them instead,
 * which is the honest version of the same menu.
 */

type FooterLink = { label: string; href: string; external?: boolean }

/* What the platform does, each pointing at the part of the site that shows it */
const SOLUTIONS: FooterLink[] = [
  { label: 'Automated repair', href: '/#product' },
  { label: 'Predictive intelligence', href: '/#outcomes' },
  { label: 'Real-time insights', href: '/#platform' },
  { label: 'Natural language queries', href: '/#assistant' },
  { label: 'Multi-rail coverage', href: '/#corridors' },
  { label: 'Enhanced security', href: '/data-handling' },
]

const COMPANY: FooterLink[] = [
  { label: 'Contact sales', href: '/demo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Common questions', href: '/#faq' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/quantum-data-leap',
    external: true,
  },
]

const LEGAL: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Data handling', href: '/data-handling' },
  { label: 'Security', href: '/privacy-policy#security' },
]

const SOCIALS = [
  {
    label: 'QDL on LinkedIn',
    href: 'https://www.linkedin.com/company/quantum-data-leap',
    icon: <LinkedInIcon className="h-3.5 w-3.5" />,
  },
  {
    label: 'Email QDL',
    href: 'mailto:support@quantumdataleap.ai',
    icon: <Mail className="h-4 w-4" strokeWidth={1.75} />,
  },
]

const linkClass =
  'text-[13.5px] text-gray-600 transition-colors duration-300 hover:text-[#062698]'

/* A hash destination has to stay a plain anchor. The router pushes a pathname
   and scrolls to the top, which is exactly wrong for a link into a section. */
function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    )
  }
  if (link.href.includes('#')) {
    return (
      <a href={link.href} className={linkClass}>
        {link.label}
      </a>
    )
  }
  return (
    <Link to={link.href} className={linkClass}>
      {link.label}
    </Link>
  )
}

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="text-[13.5px] font-semibold tracking-[-0.01em] text-gray-900">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterAnchor link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* The brand band, cut on the diagonal so the footer opens rather than
          just stopping. Decorative only. */}
      <div
        aria-hidden="true"
        className="h-10 w-full sm:h-14 lg:h-16"
        style={{
          background:
            'linear-gradient(100deg, #14225c 0%, #2b1c6e 46%, #5c1a4f 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 18%, 0 100%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src="/qdl-mark.png"
                alt="Quantum Data Leap"
                className="h-10 w-10 object-contain"
              />
              <span className="wordmark text-[24px]">QDL</span>
            </Link>

            <p className="mt-4 max-w-[20rem] text-[13.5px] leading-relaxed text-gray-600">
              Empowering intelligent banking systems with AI-powered solutions,
              built for US regional banks.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href.startsWith('mailto:') ? undefined : '_blank'
                  }
                  rel={
                    social.href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors duration-300 hover:border-[#062698] hover:text-[#062698]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <Column title="Solutions" links={SOLUTIONS} />
          <Column title="Company" links={COMPANY} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-gray-500">
            © {new Date().getFullYear()} Quantum Data Leap. All rights reserved.
          </p>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL.map((link) => (
              <FooterAnchor key={link.label} link={link} />
            ))}

            {/* Consent has to be withdrawable as easily as it was given, so
                the banner can always be reopened from here. */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event('qdl:cookie-settings'))
              }
              className="text-[13.5px] text-gray-600 transition-colors duration-300 hover:text-[#062698]"
            >
              Cookie settings
            </button>
          </nav>
        </div>
      </div>
    </footer>
  )
}
