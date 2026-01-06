"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"

const processSteps = [
  {
    step: "01",
    title: "Integrate with the System",
    description:
      "Integrate seamlessly with your existing banking infrastructure and data sources using our secure APIs.",
    icon: CheckCircle2,
  },
  {
    step: "02",
    title: "Configurations",
    description:
      "Set up intelligent modules for data control, liquidity management, fraud detection, and rule automation.",
    icon: CheckCircle2,
  },
  {
    step: "03",
    title: "Deploy & Automate",
    description:
      "Launch your intelligent banking platform with automated workflows that adapt to your business needs.",
    icon: CheckCircle2,
  },
  {
    step: "04",
    title: "Monitor & Optimize",
    description:
      "Track performance with real-time dashboards and continuously improve with AI-powered insights.",
    icon: CheckCircle2,
  },
]

export function ProcessFlowSection() {
  return (
    <AnimatedSection
      id="process-section"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Simple
          <span className="block bg-gradient-to-r from-[#FF6B9A] to-[#7B5CF6] bg-clip-text text-transparent
">
            Implementation Process
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          Get started with QDL in four straightforward steps
        </motion.p>
      </div>

      {/* Process Steps */}
      <div className="mt-16 relative">
        {/* Connection Line (hidden on mobile) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((process, index) => {
            const Icon = process.icon
            return (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.15,
                }}
                className="relative group"
              >
                {/* Step Card */}
                <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                  {/* Step Number Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {process.step}
                    </span>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block">
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.15 + 0.2,
                    }}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                    {process.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {process.description}
                  </p>
                </div>

                {/* Arrow Connector for Mobile/Tablet */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
