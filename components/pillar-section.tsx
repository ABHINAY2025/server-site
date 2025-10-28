"use client"

import { motion } from "framer-motion"
import { Shield, Database, Zap, Shuffle, AlertTriangle, CheckCircle, Layers, Brain, TrendingUp } from "lucide-react"

interface PillarSectionProps {
  pillar: 1 | 2 | 3 | 4
}

const pillarData = {
  1: {
    title: "Data Control & Architecture",
    description: "Secure, intelligent data governance with quantum-level indexing capabilities.",
    keyPoints: [
      { label: "Security & Governance", icon: Shield },
      { label: "Smart Data Handling", icon: Database },
      { label: "Quantum Indexing", icon: Zap },
    ],
  },
  2: {
    title: "Liquidity Management (LQM)",
    description: "Optimize liquidity and cash flow across your banking operations.",
    keyPoints: [
      { label: "Sweeping & Pooling", icon: Shuffle },
      { label: "Multi-Bank Cash Concentration", icon: Database },
      { label: "AI-Powered Insights", icon: Brain },
    ],
  },
  3: {
    title: "Fraud Control",
    description: "Advanced fraud detection and prevention with minimal false positives.",
    keyPoints: [
      { label: "AI-Powered Detection", icon: AlertTriangle },
      { label: "Real-Time Learning", icon: Zap },
      { label: "Low False Positives", icon: CheckCircle },
    ],
  },
  4: {
    title: "Rules Management",
    description: "Create and manage complex rules without writing a single line of code.",
    keyPoints: [
      { label: "Drag & Drop Builder", icon: Layers },
      { label: "AI Rule Optimization", icon: Brain },
      { label: "Performance Tracking", icon: TrendingUp },
      { label: "Governance & Approvals", icon: Shield },
    ],
  },
}

export function PillarSection({ pillar }: PillarSectionProps) {
  const data = pillarData[pillar]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-14 relative flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-center items-center gap-4 z-10">
          <h2 className="w-full max-w-[655px] text-center text-foreground text-3xl md:text-5xl font-semibold leading-tight">
            {data.title}
          </h2>
          <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-lg font-medium leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="self-stretch flex flex-col md:flex-row justify-center items-center gap-4 z-10">
          {data.keyPoints.map(({ label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(120, 252, 214, 0.15)" }}
              className="overflow-hidden rounded-xl border border-white/20 px-6 py-4 flex flex-col justify-center items-center gap-2 relative transition-all duration-300 cursor-pointer group"
            >
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "rgba(231, 236, 235, 0.05)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              />
              <Icon className="relative z-10 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <p className="relative z-10 text-foreground text-sm md:text-base font-medium text-center group-hover:text-primary transition-colors duration-300">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
