'use client'

import { motion } from 'framer-motion'
import { TrendingUp, CheckCircle2 } from 'lucide-react'

const features = [
  'Live dashboards that update in real-time',
  'Customizable widgets for your specific KPIs',
  'Historical data tracking and trend analysis',
  'Instant alerts for anomalies and opportunities',
  'Mobile-responsive analytics interface',
  'Export data and reports in multiple formats',
]

export default function RealTimeInsightsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl" style={{background: "linear-gradient(135deg, rgba(255, 107, 154, 0.1), rgba(123, 92, 246, 0.1))"}}>
          <TrendingUp className="h-8 w-8" style={{background: "linear-gradient(135deg, #FF6B9A, #7B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}} />
        </div>
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Real-Time Insights</h1>
        <p className="text-lg text-muted-foreground">
          Monitor your operations with live dashboards and instant analytics
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Analytics Features</h2>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" style={{background: "linear-gradient(135deg, #FF6B9A, #7B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}} />
              <span className="text-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Stay Informed</h2>
        <p className="text-muted-foreground">
          Never miss important developments with real-time monitoring and instant notifications. Our advanced analytics engine processes data as it comes in, providing you with up-to-the-second insights to drive informed decisions.
        </p>
      </div>

      {/* <div className="space-y-4 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <h2 className="text-2xl font-semibold">Monitor Your Success</h2>
        <p className="text-muted-foreground">
          Gain real-time visibility into your banking operations and make faster, more informed decisions.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Schedule a Demo
        </button>
      </div> */}
    </motion.div>
  )
}
