'use client'

import { motion } from 'framer-motion'
import { Building2, CheckCircle2 } from 'lucide-react'

const features = [
  'Connect with major banking platforms and systems',
  'Seamless API integrations for automated data flow',
  'Real-time synchronization across multiple banks',
  'Consolidated view of all banking relationships',
  'Pre-built connectors for popular banking systems',
  'Custom integration support for legacy systems',
]

export default function MultiBankIntegrationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Building2 className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Multi-Bank Integration</h1>
        <p className="text-lg text-muted-foreground">
          Connect seamlessly with multiple banking systems and platforms
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Integration Capabilities</h2>
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
        <h2 className="text-2xl font-semibold">Unified Banking Platform</h2>
        <p className="text-muted-foreground">
          Eliminate data silos and manage all your banking relationships from one unified platform. Our multi-bank integration capabilities let you work with multiple financial institutions simultaneously while maintaining complete data consistency and security.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <h2 className="text-2xl font-semibold">Unify Your Banking</h2>
        <p className="text-muted-foreground">
          Connect all your banking systems and get a complete view of your financial operations.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Schedule a Demo
        </button>
      </div>
    </motion.div>
  )
}
