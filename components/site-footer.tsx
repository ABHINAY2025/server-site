import Link from "next/link"
import Image from "next/image"

import { MODULES } from "@/lib/site-config"

const COMPANY_LINKS = [
  { name: "Resources", href: "/blogs" },
  { name: "Request a demo", href: "/demo" },
]

const LEGAL_LINKS = [
  { name: "Privacy policy", href: "/privacy-policy" },
  { name: "Terms of service", href: "/terms-of-service" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Quantum Data Leap — home"
            >
              <Image
                src="/logos/logo.png"
                alt=""
                width={28}
                height={28}
                className="size-7"
              />
              <span className="font-semibold tracking-tight text-foreground">
                QDL
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The intelligence layer for modern banking.
            </p>
          </div>

          <nav aria-labelledby="footer-platform" className="flex flex-col gap-3">
            <h2
              id="footer-platform"
              className="text-eyebrow uppercase text-subtle"
            >
              Platform
            </h2>
            <ul className="flex flex-col gap-2">
              {MODULES.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/#${m.slug}`}
                    className="text-sm text-muted-foreground transition-colors duration-micro hover:text-foreground"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="flex flex-col gap-3">
            <h2
              id="footer-company"
              className="text-eyebrow uppercase text-subtle"
            >
              Company
            </h2>
            <ul className="flex flex-col gap-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-micro hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal" className="flex flex-col gap-3">
            <h2 id="footer-legal" className="text-eyebrow uppercase text-subtle">
              Legal
            </h2>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-micro hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-subtle">
            &copy; {new Date().getFullYear()} Quantum Data Leap. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
