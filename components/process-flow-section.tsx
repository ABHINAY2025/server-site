"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Plug, Settings2, Rocket, LineChart, Check } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { SpotlightReveal } from "./effects/spotlight-reveal"
import { DirectionHover } from "./effects/direction-hover"

const processSteps = [
  {
    step: "01",
    title: "Connect",
    description:
      "We connect QDL to the systems you already use — your core banking platform, payment providers, and other data sources. Most banks are connected within days.",
    icon: Plug,
  },
  {
    step: "02",
    title: "Set Your Rules",
    description:
      "Tell us how you want things handled: which transactions to flag, what counts as a cash shortfall, who needs to approve what. No coding — your team sets this up directly.",
    icon: Settings2,
  },
  {
    step: "03",
    title: "Go Live",
    description:
      "Switch on real-time monitoring, fraud alerts, and cash forecasting. Your team keeps working the way they do today — QDL runs quietly in the background.",
    icon: Rocket,
  },
  {
    step: "04",
    title: "Track & Improve",
    description:
      "Watch everything from one dashboard, and adjust your rules as your business changes — the system gets more accurate the longer you use it.",
    icon: LineChart,
  },
]

export function ProcessFlowSection() {
  const [activeStep, setActiveStep] = React.useState(0)

  return (
    <AnimatedSection id="process-section" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-3xl text-center">
        <SpotlightReveal
          text="Simple"
          className="mb-1 block text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        />
        <SpotlightReveal
          text="Implementation Process"
          className="gradient-text-violet-teal text-3xl font-bold sm:text-4xl lg:text-5xl"
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut", staggerChildren: 0.05 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-white/50"
        >
          Get started with QDL in four straightforward steps
        </motion.p>
      </div>

      <div className="mt-16">
        {/* Progress rail */}
        <div className="relative mx-auto mb-10 hidden max-w-4xl items-center lg:flex">
          {processSteps.map((process, index) => (
            <React.Fragment key={process.step}>
              <button
                type="button"
                onClick={() => setActiveStep(index)}
                aria-label={`Go to step ${index + 1}: ${process.title}`}
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-transform duration-300 hover:scale-110"
                style={{
                  background:
                    index <= activeStep
                      ? "linear-gradient(135deg, #8B5CF6, #14B8A6)"
                      : "rgba(255,255,255,0.08)",
                  boxShadow: index === activeStep ? "0 0 0 4px rgba(139,92,246,0.25)" : "none",
                }}
              >
                {index < activeStep ? <Check className="h-4 w-4" /> : index + 1}
              </button>
              {index < processSteps.length - 1 && (
                <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-teal-400"
                    initial={false}
                    animate={{ width: index < activeStep ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((process, index) => {
            const Icon = process.icon
            const isActive = activeStep === index
            const isComplete = index < activeStep
            return (
              <motion.button
                key={process.step}
                type="button"
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, x: 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300"
                style={{
                  borderColor: isActive ? "rgba(139, 92, 246, 0.6)" : "rgba(255,255,255,0.12)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(20,184,166,0.1))"
                    : "rgba(255,255,255,0.04)",
                  boxShadow: isActive ? "0 20px 40px -12px rgba(139,92,246,0.3)" : "none",
                }}
              >
                <DirectionHover className="flex flex-1 flex-col p-6">
                  <div className="relative mb-5 flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white transition-shadow duration-300"
                      style={{
                        background: "linear-gradient(135deg, #8B5CF6, #14B8A6)",
                        boxShadow: isActive ? "0 0 0 4px rgba(139,92,246,0.25)" : "none",
                      }}
                    >
                      {isComplete ? <Check className="h-4 w-4" /> : process.step}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
                      style={{
                        color: isActive ? "#14B8A6" : "rgba(255,255,255,0.35)",
                        background: isActive ? "rgba(20,184,166,0.12)" : "transparent",
                      }}
                    >
                      {isActive ? "In Progress" : isComplete ? "Done" : "Up Next"}
                    </span>
                  </div>

                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ background: isActive ? "rgba(20,184,166,0.12)" : "rgba(255,255,255,0.06)" }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{
                        color: isActive ? "#14B8A6" : "rgba(255,255,255,0.7)",
                      }}
                    />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white">{process.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{process.description}</p>
                </DirectionHover>
              </motion.button>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
