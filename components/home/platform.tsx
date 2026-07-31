import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Section, SectionHeader } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"
import { ModuleVisual } from "@/components/visuals/module-visuals"
import { MODULES } from "@/lib/site-config"

/**
 * Module cards. Product screenshots have been replaced with a code-drawn
 * animated visual per control plane, so the section carries no image weight
 * at all — the whole grid is SVG and CSS.
 *
 * Cards reveal on scroll with a stagger and lift on hover.
 */
export function Platform() {
  return (
    <Section id="platform" spacing="lg">
      <Reveal>
        <SectionHeader
          eyebrow="The platform"
          title="Four control planes, one operating picture"
          lede="Each plane runs independently and shares the same data, rules and audit trail — so treasury, operations and risk are never reconciling three different versions of the truth."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {MODULES.map((module, index) => (
          <Reveal
            key={module.slug}
            as="article"
            direction="up"
            delay={index * 90}
            id={module.slug}
            className="group qdl-lift flex scroll-mt-24 flex-col overflow-hidden rounded-xl
                       border border-border bg-card shadow-1 hover:border-primary/40"
          >
            <ModuleVisual slug={module.slug} />

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md
                             bg-primary-wash text-primary transition-transform duration-standard
                             ease-entrance group-hover:scale-110"
                  aria-hidden="true"
                >
                  <module.icon className="size-[18px]" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-h3 text-foreground">{module.name}</h3>
                  <p className="text-sm font-medium text-primary">
                    {module.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {module.description}
              </p>

              <dl className="flex flex-col gap-3 border-t border-border-subtle pt-4">
                {module.capabilities.map((cap) => (
                  <div key={cap.label} className="flex flex-col gap-0.5">
                    <dt className="text-sm font-medium text-foreground">
                      {cap.label}
                    </dt>
                    <dd className="text-sm leading-snug text-muted-foreground">
                      {cap.description}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/demo?module=${module.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary
                           transition-colors duration-micro hover:text-primary-hover"
              >
                See {module.name} in a demo
                <ArrowRight
                  className="size-4 transition-transform duration-standard ease-entrance group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
