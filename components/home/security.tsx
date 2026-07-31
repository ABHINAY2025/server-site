import { KeyRound, Lock, ScrollText, UserCheck, Network, Boxes } from "lucide-react"

import { Section, SectionHeader } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"

/**
 * New section. A bank cannot buy without a security review, and the previous
 * site gave them a single benefit blurb — the highest-value missing content
 * on the whole surface.
 *
 * Everything stated here is drawn from claims the site already made in its
 * own FAQ copy. Certification marks (SOC 2, ISO 27001) are deliberately NOT
 * asserted until they can be evidenced.
 */
const CONTROLS = [
  {
    icon: KeyRound,
    title: "Role-based access control",
    body: "Permissions scoped by role and entity, enforced at the data layer rather than the interface.",
  },
  {
    icon: Lock,
    title: "Encryption in transit and at rest",
    body: "All data encrypted on the wire and on disk, with key management separated from application access.",
  },
  {
    icon: ScrollText,
    title: "Full audit trails",
    body: "Every read, write and rule change logged and attributable, retained for regulatory review.",
  },
  {
    icon: UserCheck,
    title: "Maker/Checker workflows",
    body: "Segregation of duties on every material action, so no single operator can both raise and approve.",
  },
  {
    icon: Network,
    title: "Deploys into your perimeter",
    body: "Runs against existing core banking, payment rails and KYC providers without re-architecture.",
  },
  {
    icon: Boxes,
    title: "Streaming and batch ingest",
    body: "Real-time pipelines alongside batch ETL, so legacy systems integrate without being replaced first.",
  },
]

export function Security() {
  return (
    <Section
      id="security"
      spacing="lg"
      bleedClassName="border-y border-border bg-muted/40"
    >
      <Reveal>
        <SectionHeader
          eyebrow="Security & compliance"
          title="Built to survive a regulator's review"
          lede="Controls are part of the architecture rather than a layer added for procurement. Here is what your security officer will be looking for."
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CONTROLS.map((control, index) => (
          <Reveal
            as="li"
            key={control.title}
            direction="scale"
            delay={index * 70}
            className="group qdl-lift flex flex-col gap-3 rounded-xl border border-border
                       bg-card p-6 shadow-1 hover:border-primary/40"
          >
            <span
              className="inline-flex size-9 items-center justify-center rounded-md bg-primary-wash
                         text-primary transition-transform duration-standard ease-entrance
                         group-hover:-translate-y-0.5 group-hover:scale-110"
              aria-hidden="true"
            >
              <control.icon className="size-[18px]" />
            </span>
            <h3 className="text-base font-semibold text-foreground">
              {control.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {control.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
