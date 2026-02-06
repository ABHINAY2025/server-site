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
          Why Businesses Love{" "}
            <span className="inline-block bg-gradient-to-r from-[#FF6B9A] to-[#7B5CF6] bg-clip-text text-transparent">
              QDL
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
          Experience the benefits of intelligent banking automation
        </motion.p>
      </div>
 
      {/* Responsive grid layout with enhanced tiles */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 h-full">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <Link key={index} href={benefit.href} className="h-full group">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -12,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className="relative overflow-hidden rounded-2xl border border-purple-200/30 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300/50 cursor-pointer h-full flex flex-col backdrop-blur-sm"
              >
                {/* Gradient overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
 
                {/* Icon container with enhanced styling */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    delay: index * 0.12 + 0.15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -8, 8, -8, 0],
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 107, 154, 0.12), rgba(123, 92, 246, 0.12))",
                    border: "1px solid rgba(255, 107, 154, 0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 107, 154, 0.2), rgba(123, 92, 246, 0.2))";
                    e.currentTarget.style.border = "1px solid rgba(255, 107, 154, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 107, 154, 0.12), rgba(123, 92, 246, 0.12))";
                    e.currentTarget.style.border = "1px solid rgba(255, 107, 154, 0.15)";
                  }}
                >
                  <Icon className="h-8 w-8" style={{background: "linear-gradient(135deg, #FF6B9A, #7B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}} />
                </motion.div>
 
                {/* Title with enhanced typography */}
                <h3 className="mb-3 text-xl font-bold text-slate-900 relative z-10 transition-colors duration-300 group-hover:text-purple-900">
                  {benefit.title}
                </h3>
 
                {/* Description with better line height */}
                <p className="text-slate-600 leading-relaxed relative z-10 flex-grow transition-colors duration-300 group-hover:text-slate-700">
                  {benefit.description}
                </p>
 
                {/* Subtle accent line on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FF6B9A] to-[#7B5CF6] w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            </Link>
          )
        })}
      </div>
    </AnimatedSection>
  )
}
 
 