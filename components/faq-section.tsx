"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "What is the Quantum Data Leap (QDL) Project?",
    answer:
      "Quantum Data Leap (QDL) is an advanced data infrastructure and analytics platform designed to enable real-time financial intelligence and decision-making. It integrates liquidity control, fund allocation, and counterparty position management within a unified, high-performance environment optimized for microsecond-level data processing.",
  },
  {
    question: "Who can benefit from using Quantum Data Leap?",
    answer:
      "QDL is designed for financial institutions, investment firms, and treasury teams that manage high-volume transactions and require real-time risk visibility. It also benefits data scientists and analysts who need a scalable environment for data modeling, trend forecasting, and liquidity optimization.",
  },
  {
    question: "Can non-technical users create and manage rules without coding?",
    answer:
      "Yes. The Rules Management Engine uses a conversational AI interface that allows business users to define, edit, and query operational rules in plain language. Real-time validation and AI-guided prompts ensure accuracy and prevent duplicate or conflicting rules—no technical expertise required.",
  },
  {
    question: "How does the system detect and prevent fraudulent transactions?",
    answer:
      "The Fraud Management Platform leverages machine learning models for anomaly detection and pattern recognition. It identifies suspicious transactions in real time, flags potential risks, and allows compliance officers to take immediate action through secure Maker/Checker workflows.",
  },
  {
    question: "How does the platform ensure compliance and data security?",
    answer:
      "Compliance and security are built into every layer, with role-based access control (RBAC), data encryption (in transit and at rest), full audit trails, and policy enforcement. Maker/Checker workflows ensure segregation of duties and adherence to regulatory requirements.",
  },
  {
    question: "Can the platforms integrate with multiple data sources and legacy systems?",
    answer:
      "Yes. The architecture supports both real-time streaming (via Kafka) and batch ETL pipelines, allowing seamless integration with legacy banking systems, payment networks, and external data sources without major infrastructure changes.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pb-20  px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="self-stretch text-center text-[#4b535c] text-sm font-medium leading-[18.20px] break-words">
            Everything you need to know about Pointer and how it can transform your development workflow
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
