import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

export function CtaBand() {
  return (
    <Section spacing="lg">
      <Reveal direction="scale">
        <div
          className="qdl-shimmer relative flex flex-col items-start gap-6 overflow-hidden rounded-xl
                     border border-border bg-card p-8 shadow-2 sm:p-12
                     lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Ambient wash, drifting slowly behind the content */}
          <div
            aria-hidden="true"
            className="qdl-drift pointer-events-none absolute -right-24 -top-24 size-72 rounded-full
                       bg-[radial-gradient(circle,hsl(var(--primary)/0.16),transparent_70%)]"
          />

          <div className="relative flex flex-col gap-3">
            <h2 className="text-balance text-h2 text-foreground">
              See it against your own use case
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Thirty minutes, no slide deck. We show the platform running the
              scenario you care about, and send the security pack in advance so
              your review can start straight away.
            </p>
          </div>

          <Button asChild size="lg" className="group relative w-full shrink-0 sm:w-auto">
            <Link href="/demo">
              Request a demo
              <ArrowRight
                className="size-4 transition-transform duration-standard ease-entrance group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
