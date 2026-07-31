"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MODULES, PRIMARY_NAV } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/**
 * Replaces the previous header, which:
 *  - imported Sheet/SheetTrigger/Menu and never rendered any of them, leaving
 *    the site with no navigation at all below 768px;
 *  - carried three unrelated colour stories in 130 lines (a pink->orange
 *    gradient bar, a teal underline, a pink->purple button);
 *  - bound an unthrottled non-passive scroll listener that called
 *    getBoundingClientRect() on every event, forcing layout on the scroll path.
 *
 * The scroll state is now an IntersectionObserver sentinel, which costs
 * nothing on the main thread.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [platformOpen, setPlatformOpen] = React.useState(false)

  const sentinelRef = React.useRef<HTMLDivElement | null>(null)
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const panelRef = React.useRef<HTMLDivElement | null>(null)
  const platformRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Close the mobile panel on Escape and restore focus to its trigger.
  React.useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    panelRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Dismiss the platform menu on outside click or Escape.
  React.useEffect(() => {
    if (!platformOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (!platformRef.current?.contains(e.target as Node)) {
        setPlatformOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlatformOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [platformOpen])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-standard",
          // One visual treatment at all scroll positions. It picks up a
          // hairline border and a blur once the page moves, and nothing else.
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-md"
              aria-label="Quantum Data Leap — home"
            >
              <Image
                src="/logos/logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8"
                priority
              />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                QDL
              </span>
            </Link>

            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary"
            >
              <div ref={platformRef} className="relative">
                <button
                  type="button"
                  onClick={() => setPlatformOpen((v) => !v)}
                  aria-expanded={platformOpen}
                  aria-haspopup="true"
                  className="qdl-underline rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-micro hover:text-foreground"
                >
                  Platform
                </button>

                {platformOpen ? (
                  <div className="qdl-enter absolute left-0 top-full mt-2 w-[min(92vw,26rem)] overflow-hidden rounded-lg border border-border bg-card p-2 shadow-2">
                    <ul className="flex flex-col">
                      {MODULES.map((m) => (
                        <li key={m.slug}>
                          <Link
                            href={`/#${m.slug}`}
                            onClick={() => setPlatformOpen(false)}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors duration-micro hover:bg-muted"
                          >
                            <m.icon
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium text-foreground">
                                {m.name}
                              </span>
                              <span className="text-xs leading-snug text-muted-foreground">
                                {m.tagline}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {PRIMARY_NAV.filter((i) => !("hasMenu" in i && i.hasMenu)).map(
                (item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="qdl-underline rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-micro hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/demo">Request a demo</Link>
            </Button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors duration-micro hover:bg-muted md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation — the panel the previous header imported but never
          rendered, leaving every route unreachable below 768px. */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col border-l border-border bg-background shadow-3 focus:outline-none"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="text-sm font-semibold text-foreground">Menu</span>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  menuButtonRef.current?.focus()
                }}
                className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors duration-micro hover:bg-muted"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
              aria-label="Mobile"
            >
              <span className="px-3 pb-1 pt-2 text-eyebrow uppercase text-subtle">
                Platform
              </span>
              {MODULES.map((m) => (
                <Link
                  key={m.slug}
                  href={`/#${m.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors duration-micro hover:bg-muted"
                >
                  <m.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {m.name}
                </Link>
              ))}

              <span className="px-3 pb-1 pt-4 text-eyebrow uppercase text-subtle">
                More
              </span>
              {PRIMARY_NAV.filter((i) => !("hasMenu" in i && i.hasMenu)).map(
                (item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors duration-micro hover:bg-muted"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            <div className="border-t border-border p-4">
              <Button asChild block>
                <Link href="/demo" onClick={() => setMenuOpen(false)}>
                  Request a demo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
