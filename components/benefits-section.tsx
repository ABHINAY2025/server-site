"use client"

import { motion } from "framer-motion"
import { Zap, Brain, Lock, MessageSquare, TrendingUp, Building2 } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    { label: "Automated Workflows", icon: Zap },
    { label: "Predictive Intelligence", icon: Brain },
    { label: "Enhanced Security", icon: Lock },
    { label: "Natural Language Queries", icon: MessageSquare },
    { label: "Real-Time Insights", icon: TrendingUp },
    { label: "Multi-Bank Integration", icon: Building2 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-6 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              Why Businesses Love QDL
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Experience the benefits of intelligent banking automation.
            </p>
          </div>
        </div>

        <motion.div
          className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map(({ label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(120, 252, 214, 0.12)" }}
              className="overflow-hidden rounded-2xl border-2 border-border bg-card p-6 flex flex-col justify-center items-center gap-4 relative transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
            >
              <Icon className="relative z-10 w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <p className="relative z-10 text-foreground text-lg font-semibold text-center group-hover:text-primary transition-colors duration-300">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
