import { Section, SectionHeader } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

/**
 * The steps are genuinely sequential — you cannot configure before you
 * integrate, or optimise before you deploy — so the numbering encodes real
 * order rather than decorating the list.
 *
 * The connecting rule above each step draws left-to-right as the row
 * reveals, which reinforces that order rather than just animating for effect.
 */
const STEPS = [
  {
    title: "Integrate",
    body: "Connect to existing core banking systems, payment rails and data sources over secure APIs. Streaming and batch ingest run side by side, so legacy systems do not have to be replaced first.",
  },
  {
    title: "Configure",
    body: "Set up the control planes you need — data, liquidity, fraud, rules — and define operational policy in plain language. Validation catches conflicting or duplicate rules before they reach production.",
  },
  {
    title: "Deploy",
    body: "Move to production behind Maker/Checker approval, with full audit trails from the first transaction. Automated workflows take over the exception handling your team currently does by hand.",
  },
  {
    title: "Optimise",
    body: "Monitor position, exposure and exception rates in real time. Models and rules are tuned against what actually happened, not against a quarterly review cycle.",
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works" spacing="lg">
      <Reveal>
        <SectionHeader
          eyebrow="How it works"
          title="Four steps from connection to production"
          lede="QDL runs against the systems you already have. There is no migration phase and no replatform."
        />
      </Reveal>

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 120}
            className="group flex flex-col gap-3"
          >
            <span className="relative block h-0.5 w-full overflow-hidden rounded bg-border">
              <span
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded bg-primary
                           transition-transform duration-[900ms] ease-entrance
                           group-data-[visible=true]:scale-x-100"
                style={{ transitionDelay: `${index * 120 + 180}ms` }}
                aria-hidden="true"
              />
            </span>

            <span className="text-eyebrow uppercase tabular text-subtle">
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3 text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
