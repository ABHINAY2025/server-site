'use client'

import { motion } from 'framer-motion'
import { Zap, CheckCircle2 } from 'lucide-react'

const features = [
  'Intelligent workflow automation that learns from your patterns',
  'Real-time process optimization and bottleneck detection',
  'Customizable automation rules for your specific business needs',
  'Integration with existing systems and applications',
  'Automated error detection and resolution',
  'Detailed audit trails and compliance logging',
]

export default function AutomatedWorkflowsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Zap className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Automated Workflows</h1>
        <p className="text-lg text-muted-foreground">
          Streamline operations with intelligent automation that adapts to your business needs
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">What You Get</h2>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <p className="text-muted-foreground">
          Our AI-powered automation system analyzes your current workflows and automatically creates optimized automation rules. It continuously learns from your business processes and adapts in real-time to maximize efficiency and reduce manual work.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <h2 className="text-2xl font-semibold">Ready to Automate?</h2>
        <p className="text-muted-foreground">
          Start with a free consultation to understand how automated workflows can transform your banking operations.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Schedule a Demo
        </button>
      </div>
    </motion.div>
  )
}
