"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Zap, Brain, Lock, MessageSquare, TrendingUp, Building2, Search, ArrowUpRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { SpotlightReveal } from "./effects/spotlight-reveal"

const benefits = [
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Repetitive approvals and manual checks run themselves, so your team spends time on decisions, not data entry.",
    href: "/benefits/automated-workflows",
    metric: "1,204",
    metricLabel: "tasks handled per day",
    status: "ACTIVE",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "See likely cash and risk trends before they happen, based on your own transaction history — not guesswork.",
    href: "/benefits/predictive-intelligence",
    metric: "97.3%",
    metricLabel: "forecast accuracy",
    status: "LEARNING",
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description: "Bank-grade encryption and access controls, so only the right people can see or change sensitive data.",
    href: "/benefits/enhanced-security",
    metric: "AES-256",
    metricLabel: "encryption standard",
    status: "SECURED",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description: "Type a question the way you'd ask a colleague, and get a straight answer pulled from your live data — no report-writing required.",
    href: "/benefits/natural-language-queries",
    searchPrompt: "Show me last month's flagged transactions",
    metric: "<400ms",
    metricLabel: "average response time",
    status: "READY",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Insights",
    description: "Your dashboards update the moment something changes — no waiting for an overnight batch job to catch up.",
    href: "/benefits/real-time-insights",
    metric: "12.4K",
    metricLabel: "updates per second",
    status: "STREAMING",
  },
  {
    icon: Building2,
    title: "Multi-Bank Integration",
    description: "Work with several banking partners through one system, instead of juggling logins and spreadsheets for each one.",
    href: "/benefits/multi-bank-integration",
    metric: "18",
    metricLabel: "banks connected",
    status: "SYNCED",
  },
]

export function BenefitsSection() {
  return (
    <AnimatedSection id="benefits-section" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-3xl text-center">
        <SpotlightReveal
          text="What changes on day one with QDL"
          highlight="QDL"
          className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-white/50"
        >
          Real outcomes our banking and fintech customers see after switching to QDL
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#080c16] shadow-2xl"
      >
        {/* Console chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>
          <span className="font-mono text-xs text-white/40">qdl // what-you-get.log</span>
        </div>

        <div className="divide-y divide-white/5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Link key={benefit.title} href={benefit.href}>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative flex cursor-pointer flex-col gap-4 px-5 py-5 transition-colors duration-200 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-6 sm:px-6"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors duration-200 group-hover:bg-teal-400/10">
                    <Icon className="h-5 w-5 text-teal-300" />
                  </div>

                  {/* Title + description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{benefit.title}</h3>
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition-colors duration-200 group-hover:text-teal-300" />
                    </div>
                    <p className="mt-0.5 text-sm text-white/50">{benefit.description}</p>

                    {benefit.searchPrompt && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5">
                        <Search className="h-3.5 w-3.5 shrink-0 text-white/30" />
                        <span className="truncate font-mono text-xs text-white/40">{benefit.searchPrompt}</span>
                      </div>
                    )}
                  </div>

                  {/* Live metric readout */}
                  <div className="flex shrink-0 items-center gap-4 pl-[3.75rem] sm:pl-0">
                    <div className="text-right">
                      <div className="font-mono text-lg font-bold text-white">{benefit.metric}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                        {benefit.metricLabel}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
                      </span>
                      <span className="font-mono text-[10px] font-medium tracking-wider text-teal-300">
                        {benefit.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
