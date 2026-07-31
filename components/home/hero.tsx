import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TransactionStream } from "@/components/visuals/transaction-stream"
import { COMPLIANCE_MARKS } from "@/lib/site-config"

/**
 * Hero.
 *
 * No product screenshot: the right column is a code-drawn, animated
 * illustration of the mechanism instead. That removes the image weight from
 * the critical path entirely — the largest element on the page is now text.
 *
 * The left column plays a staggered entrance on load; everything below the
 * fold reveals on scroll.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Fixed, non-animated brand wash. Decorative only, and low enough in
          opacity that type contrast never depends on it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]
                   bg-[radial-gradient(60rem_28rem_at_50%_-6rem,hsl(var(--primary)/0.12),transparent)]"
      />

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span
            className="qdl-enter inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-eyebrow uppercase text-primary"
            style={{ ["--enter-delay" as string]: "0ms" }}
          >
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            AI banking infrastructure
          </span>

          <h1
            className="qdl-enter text-balance text-display text-foreground"
            style={{ ["--enter-delay" as string]: "90ms" }}
          >
            The intelligence layer for modern banking.
          </h1>

          <p
            className="qdl-enter max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            style={{ ["--enter-delay" as string]: "180ms" }}
          >
            Real-time payments, fraud defence, liquidity control and automated
            compliance — on one platform your operations, treasury and risk
            teams share.
          </p>

          <div
            className="qdl-enter flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={{ ["--enter-delay" as string]: "270ms" }}
          >
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/demo">
                Request a demo
                <ArrowRight
                  className="size-4 transition-transform duration-standard ease-entrance group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link href="#platform">See the platform</Link>
            </Button>
          </div>

          {/* Security posture above the fold. For a bank it *is* the value
              proposition; burying it in a benefit page inverts the buyer's
              priority. */}
          <ul
            className="qdl-enter flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground"
            style={{ ["--enter-delay" as string]: "360ms" }}
          >
            {COMPLIANCE_MARKS.map((mark) => (
              <li key={mark} className="flex items-center gap-1.5">
                <Check className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                {mark}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="qdl-enter"
          style={{ ["--enter-delay" as string]: "420ms" }}
        >
          <TransactionStream />
        </div>
      </div>
    </section>
  )
}
