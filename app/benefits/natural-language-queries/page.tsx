'use client'

import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle2 } from 'lucide-react'

const features = [
  'Ask questions in plain English, French, Spanish, and more',
  'Instant answers directly from your banking data',
  'No SQL knowledge required - natural conversational interface',
  'Complex query understanding and context awareness',
  'Multi-language support for global teams',
  'Query history and saved searches for recurring questions',
]

export default function NaturalLanguageQueriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl" style={{background: "linear-gradient(135deg, rgba(255, 107, 154, 0.1), rgba(123, 92, 246, 0.1))"}}>
          <MessageSquare className="h-8 w-8" style={{background: "linear-gradient(135deg, #FF6B9A, #7B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}} />
        </div>
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Natural Language Queries</h1>
        <p className="text-lg text-muted-foreground">
          Ask questions in plain English and get instant answers from your data
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Query Powers</h2>
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
        <h2 className="text-2xl font-semibold">Democratizing Data Access</h2>
        <p className="text-muted-foreground">
          Empower everyone in your organization to explore data independently. No more waiting for data analysts to run queries - get insights instantly with conversational, intelligent data exploration.
        </p>
      </div>

      {/* <div className="space-y-4 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <h2 className="text-2xl font-semibold">Start Querying Today</h2>
        <p className="text-muted-foreground">
          Experience the power of conversational analytics and natural language data exploration.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Schedule a Demo
        </button>
      </div> */}
    </motion.div>
  )
}
