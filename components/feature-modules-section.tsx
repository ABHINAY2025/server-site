"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Database, TrendingUp, Shield, FileCode } from "lucide-react"
import Link from "next/link"
import { ModuleCard } from "./module-card"
import { AnimatedSection } from "./animated-section"

const modules = [
  {
    icon: <Database className="h-7 w-7" />,
    title: "Data Control",
    href: "http://10.30.0.104:3000/",
    description:
      "Take complete control of your banking data with intelligent management, real-time synchronization, and comprehensive audit trails.",
    features: [
      {
        label: "Real-time Sync",
        description:
          "Instant data synchronization across all systems and platforms",
      },
      {
        label: "Data Governance",
        description: "Comprehensive policies and controls for data management",
      },
      {
        label: "Audit Trails",
        description: "Complete tracking and logging of all data operations",
      },
    ],
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    title: "Liquidity Management",
    href: "http://10.30.0.104:3000/liquidity-dashboard",
    description:
      "Optimize cash flow and liquidity with AI-powered forecasting, automated compliance, and intelligent risk management with QDL.",
    features: [
      {
        label: "AI Forecasting",
        description:
          "Predictive analytics for accurate liquidity predictions",
      },
      {
        label: "Risk Management",
        description: "Proactive identification and mitigation of liquidity risks",
      },
      {
        label: "Compliance",
        description: "Automated compliance with regulatory requirements",
      },
    ],
  },
  {
    icon: <Shield className="h-7 w-7" />,
    title: "Fraud Detection",
    href: "http://10.30.0.104:3000/fraud-control",
    description:
      "Protect your institution with advanced AI-driven fraud detection, real-time monitoring, and automated response systems.",
    features: [
      {
        label: "AI-Powered",
        description:
          "Machine learning algorithms detect patterns and anomalies",
      },
      {
        label: "Real-time Monitoring",
        description: "Continuous surveillance of all transactions and activities",
      },
      {
        label: "Automated Response",
        description: "Instant action on detected fraudulent activities",
      },
    ],
  },
  {
    icon: <FileCode className="h-7 w-7" />,
    title: "Rules Engine",
    href: "http://10.30.0.104:3000/configuration",
    description:
      "Automate complex business rules and compliance policies with a flexible, no-code rule engine that adapts to your needs.",
    features: [
      {
        label: "No-Code Builder",
        description: "Create rules without writing code",
      },
      {
        label: "Flexible Logic",
        description: "Support for complex conditional logic and workflows",
      },
      {
        label: "Version Control",
        description: "Track and manage rule versions and changes",
      },
    ],
  },
]

export function FeatureModulesSection() {
  return (
    <AnimatedSection id="features-section" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Powerful Modules for
          <span className="block bg-gradient-to-r from-[#FF6B9A] to-[#7B5CF6] bg-clip-text text-transparent
">
            Intelligent Banking
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground"
          style={{color: "#4b535c"}}

        >
          Comprehensive solutions designed to transform every aspect of your
          banking operations
        </motion.p>
      </div>

      {/* Staggered grid on desktop, vertical stack on mobile */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {modules.map((module, index) => (


<ModuleCard
            key={index}
            icon={module.icon}
            title={module.title}
            description={module.description}
            features={module.features}
            delay={index * 0.1}
            className="h-full"
          />
        ))}
      </div>
    </AnimatedSection>
  )
}



