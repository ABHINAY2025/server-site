"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Zap, Brain, Lock, MessageSquare, TrendingUp, Building2 } from "lucide-react"
import { AnimatedSection } from "./animated-section"

const benefits = [
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Streamline operations with intelligent automation that adapts to your business needs",
    href: "/benefits/automated-workflows",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "Make data-driven decisions with AI-powered insights and forecasting",
    href: "/benefits/predictive-intelligence",
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description: "Bank-level encryption and compliance standards protecting your data",
    href: "/benefits/enhanced-security",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description: "Ask questions in plain English and get instant answers from your data",
    href: "/benefits/natural-language-queries",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Insights",
    description: "Monitor your operations with live dashboards and instant analytics",
    href: "/benefits/real-time-insights",
  },
  {
    icon: Building2,
    title: "Multi-Bank Integration",
    description: "Connect seamlessly with multiple banking systems and platforms",
    href: "/benefits/multi-bank-integration",
  },
]

export function BenefitsSection() {
  return (
    <AnimatedSection id="benefits-section" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Background with subtle noise texture */}
      <div
        className="absolute inset-0 rounded-3xl opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Why Businesses Love QDL
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          Experience the benefits of intelligent banking automation
        </motion.p>
      </div>

      {/* 3-column grid with icon + title + description */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 h-full">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <Link key={index} href={benefit.href} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5 cursor-pointer h-full flex flex-col"
              >
                {/* Icon with spring animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.1 + 0.2,
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </AnimatedSection>
  )
}
