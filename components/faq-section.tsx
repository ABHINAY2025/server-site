"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MaskTextReveal } from "./effects/mask-text-reveal"
import { GlitchText } from "./effects/glitch-text"

const faqData = [
  {
    question: "What is Quantum Data Leap (QDL), in plain terms?",
    answer:
      "QDL is a single platform that shows you what's happening with your bank's money and data in real time — instead of waiting for end-of-day reports. It keeps your systems in sync, watches for suspicious transactions, forecasts your cash position, and lets your team set business rules without needing a developer.",
  },
  {
    question: "Who is QDL built for?",
    answer:
      "Banks, fintechs, and treasury teams who process a high volume of transactions and need to know what's happening right now, not tomorrow morning. It's also used by analysts and data teams who need reliable, up-to-the-minute numbers to forecast trends and manage cash.",
  },
  {
    question: "Can non-technical staff create and manage rules without coding?",
    answer:
      "Yes. Business users can write rules in plain language — for example, \"flag any transfer over $50,000 for manager approval\" — and the system checks for conflicts or duplicates automatically before the rule goes live. No developer or IT ticket required.",
  },
  {
    question: "How does QDL catch fraudulent or suspicious transactions?",
    answer:
      "QDL's anomaly detection watches every transaction as it happens and flags anything that looks out of the ordinary — an unusual amount, an unfamiliar destination, an odd time of day. Flagged transactions go to a compliance officer for a quick second look before anything is approved, so no single person can push a suspicious payment through alone.",
  },
  {
    question: "How does QDL keep our data safe and compliant?",
    answer:
      "Every piece of data is encrypted, both while it's moving between systems and while it's stored. Access is limited by role, so people only see what their job requires. Every action is logged, and any sensitive change needs a second person's sign-off — so there's always a clear, auditable trail for regulators.",
  },
  {
    question: "Will QDL work with our current systems, including older ones?",
    answer:
      "Yes. QDL is built to connect with the banking systems, payment networks, and data sources you already run — including older, legacy systems — without you needing to replace or rebuild anything.",
  },
]

export function FAQSection() {
  return (
    <section id="faq-section" className="relative flex w-full flex-col items-center justify-center px-5 pb-24">
      <div className="pointer-events-none absolute left-1/2 top-[150px] z-0 h-[500px] w-[300px] -translate-x-1/2 rotate-[-33.39deg] bg-primary/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center gap-4 pb-12 pt-8 text-center">
        <MaskTextReveal
          text="Frequently Asked Questions"
          className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg text-sm font-medium leading-[18.2px] text-white/50"
        >
          Straight answers about what QDL does and who it's for
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 w-full max-w-[680px]"
      >
        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <GlitchText>{faq.question}</GlitchText>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
