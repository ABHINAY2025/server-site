import type { Metadata } from "next"
import { Clock, MonitorPlay, ShieldCheck, Lock } from "lucide-react"

import { DemoForm } from "@/components/demo/demo-form"
import { MODULES } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "See QDL running your scenario. Thirty minutes, no slide deck, security pack sent in advance.",
}

const EXPECTATIONS = [
  {
    icon: Clock,
    title: "Thirty minutes, no slide deck",
    body: "We use the time on the product, not on a company overview.",
  },
  {
    icon: MonitorPlay,
    title: "Live product, your use case",
    body: "Tell us the scenario that matters and we'll run it in the session.",
  },
  {
    icon: ShieldCheck,
    title: "Security pack in advance",
    body: "Sent before the call so your review can start straight away.",
  },
]

/**
 * The demo form was previously modal-only, so it had no URL — it could not be
 * a campaign destination, a retargeting target, or the destination for the
 * module CTAs that used to point at an internal LAN address.
 */
export default function DemoPage({
  searchParams,
}: {
  searchParams: { module?: string }
}) {
  const requested = MODULES.find((m) => m.slug === searchParams.module)

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-eyebrow uppercase text-primary">
              Request a demo
            </span>
            <h1 className="text-balance text-display text-foreground">
              {requested
                ? `See ${requested.name} against your own data`
                : "See QDL against your own use case"}
            </h1>
            <p className="max-w-prose text-pretty text-lg leading-relaxed text-muted-foreground">
              {requested
                ? requested.tagline
                : "Tell us who you are and what you're trying to solve. We'll show you the platform running that scenario."}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-1 sm:p-8">
            <DemoForm defaultModule={requested?.slug} />
          </div>
        </div>

        <aside className="flex flex-col gap-8 lg:pt-24">
          <div className="flex flex-col gap-5">
            <h2 className="text-eyebrow uppercase text-subtle">
              What to expect
            </h2>
            <ul className="flex flex-col gap-5">
              {EXPECTATIONS.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span
                    className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-wash text-primary"
                    aria-hidden="true"
                  >
                    <item.icon className="size-4" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-sm leading-snug text-muted-foreground">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Answers the objection that otherwise ends the deal, at the exact
              moment it surfaces. */}
          <div className="flex gap-3 rounded-xl border border-border bg-muted/50 p-5">
            <Lock
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                Your data is never used to train our models.
              </span>{" "}
              Demo environments run on synthetic data. Nothing you share in
              this form leaves our systems.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
