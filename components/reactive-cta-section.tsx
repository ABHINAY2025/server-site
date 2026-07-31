"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ReactiveLines } from "./effects/reactive-lines"
import { DemoModal } from "./demo-modal"

export function ReactiveCtaSection() {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false)

  return (
    <section className="relative z-10 overflow-hidden border-y border-white/10 py-28">
      <ReactiveLines />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          See QDL working with your own data
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-xl text-lg text-white/50"
        >
          Book a 30-minute walkthrough and we'll show you exactly how QDL keeps your systems in
          sync, catches suspicious transactions, and lets your team manage rules — no sales pitch, just the product.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => setDemoModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="glow-border mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-teal-400 px-7 py-3.5 font-semibold text-white shadow-lg transition-shadow duration-300 hover:shadow-violet-500/40"
        >
          Request Demo
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section>
  )
}
