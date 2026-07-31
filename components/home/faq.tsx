import { Section, SectionHeader } from "@/components/ui/section"
import { Reveal } from "@/components/ui/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/**
 * Same questions as before, now in a Radix accordion. The previous
 * implementation was a `<div onClick>` with no button, tabindex, role,
 * aria-expanded or key handler — unreachable by keyboard entirely.
 */
const FAQS = [
  {
    q: "What is the Quantum Data Leap platform?",
    a: "QDL is a data infrastructure and analytics platform for real-time financial intelligence. It brings liquidity control, fund allocation, fraud detection and counterparty position management into one environment built for high-volume, low-latency processing.",
  },
  {
    q: "Who is it for?",
    a: "Financial institutions, investment firms and treasury teams managing high transaction volumes who need real-time risk visibility. It also serves analysts and data teams who need a scalable environment for modelling, forecasting and liquidity optimisation.",
  },
  {
    q: "Can non-technical users create and manage rules without writing code?",
    a: "Yes. The rules engine uses a conversational interface that lets business users define, edit and query operational rules in plain language. Real-time validation and guided prompts prevent duplicate or conflicting rules, so no engineering ticket is required for a policy change.",
  },
  {
    q: "How does the platform detect fraudulent transactions?",
    a: "Machine learning models score transactions for anomalies and pattern matches in real time, flagging suspicious activity as it happens. Compliance officers act on flagged cases through Maker/Checker workflows, so no single operator can both raise and approve a decision.",
  },
  {
    q: "How is compliance and data security handled?",
    a: "Security is built into each layer: role-based access control, encryption in transit and at rest, full audit trails, and policy enforcement at the data layer. Maker/Checker workflows enforce segregation of duties for regulatory requirements.",
  },
  {
    q: "Will it integrate with our legacy systems?",
    a: "Yes. The architecture supports both real-time streaming and batch ETL pipelines, so it integrates with existing core banking systems, payment networks and external data sources without requiring infrastructure changes first.",
  },
]

export function FAQ() {
  return (
    <Section id="faq" spacing="lg" width="narrow">
      <Reveal>
        <SectionHeader
          eyebrow="Questions"
          title="Frequently asked"
          align="center"
          className="mx-auto"
        />
      </Reveal>

      <Accordion type="multiple" className="mt-10 flex flex-col gap-3">
        {FAQS.map((faq, index) => (
          <Reveal key={faq.q} delay={index * 60}>
            <AccordionItem value={`faq-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </Section>
  )
}
