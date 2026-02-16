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
    title: "Ai Assisted Data Control",
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
    title: "Agentic Liquidity Management",
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
    title: "Ai Assisted Fraud Detection",
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
    title: "Rules Engine Ai Chatbot",
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

// Animated Money Symbol Component
const AnimatedMoneySymbol = ({ delay }: { delay: number }) => {
  const symbols = ["$", "€", "¥", "₹"]
  const symbol = symbols[Math.floor(Math.random() * symbols.length)]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: -50, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [100, -100],
        x: [-50, Math.random() * 100 - 50],
        scale: [0, 1, 1, 0],
        rotate: [0, 360],
      }}
      transition={{ 
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute text-5xl font-bold text-white/30"
    >
      {symbol}
    </motion.div>
  )
}

export function FeatureModulesSection() {
  return (
    <AnimatedSection id="features-section" className="relative z-10 mx-auto w-full py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40 backdrop-blur-xl border border-white/70 shadow-2xl p-12 lg:p-16 overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-pink-200/20 to-blue-200/20 rounded-full blur-3xl -ml-36 -mb-36 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Complete{" "} <span className="bg-gradient-to-r from-[#ff6b9a] to-[#7b5cf6] bg-clip-text text-transparent">
  Feature Suite
</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each module is designed with enterprise-grade security, real-time capabilities, and seamless integration to power your banking operations.
              </p>
            </motion.div>

            {/* 2x2 Grid Layout for cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <ModuleCard
                    icon={module.icon}
                    title={module.title}
                    description={module.description}
                    features={module.features}
                    delay={index * 0.1}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}



