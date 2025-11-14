'use client'

import { motion } from 'framer-motion'
import { Brain, CheckCircle2 } from 'lucide-react'

const features = [
  'Advanced AI models trained on banking industry data',
  'Predictive forecasting for revenue and expenses',
  'Anomaly detection for fraud prevention',
  'Customer behavior prediction and segmentation',
  'Risk assessment and mitigation recommendations',
  'Data-driven decision support dashboards',
]

export default function PredictiveIntelligencePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Brain className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Predictive Intelligence</h1>
        <p className="text-lg text-muted-foreground">
          Make data-driven decisions with AI-powered insights and forecasting
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Capabilities</h2>
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
        <h2 className="text-2xl font-semibold">Intelligence Advantage</h2>
        <p className="text-muted-foreground">
          Leverage machine learning algorithms that understand complex banking relationships and market dynamics. Our predictive models help you stay ahead of trends and make proactive business decisions before your competitors.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <h2 className="text-2xl font-semibold">Get Intelligent Insights</h2>
        <p className="text-muted-foreground">
          Transform your data into actionable intelligence and gain competitive advantage.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Schedule a Demo
        </button>
      </div>
    </motion.div>
  )
}
