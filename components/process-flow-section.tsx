"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Zap, Lock, TrendingUp } from "lucide-react"
import { AnimatedSection } from "./animated-section"

const processSteps = [
  {
    step: "01",
    title: "Integrate with the System",
    description:
      "Integrate seamlessly with your existing banking infrastructure and data sources using our secure APIs.",
    icon: Zap,
    color: "from-[#FF6B9A] to-[#FF8AB8]",
    bgColor: "rgba(255, 107, 154, 0.08)",
  },
  {
    step: "02",
    title: "Configurations",
    description:
      "Set up intelligent modules for data control, liquidity management, fraud detection, and rule automation.",
    icon: Lock,
    color: "from-[#7B5CF6] to-[#9D7FF3]",
    bgColor: "rgba(123, 92, 246, 0.08)",
  },
  {
    step: "03",
    title: "Deploy & Automate",
    description:
      "Launch your intelligent banking platform with automated workflows that adapt to your business needs.",
    icon: Zap,
    color: "from-[#FF6B9A] to-[#FF8AB8]",
    bgColor: "rgba(255, 107, 154, 0.08)",
  },
  {
    step: "04",
    title: "Monitor & Optimize",
    description:
      "Track performance with real-time dashboards and continuously improve with AI-powered insights.",
    icon: TrendingUp,
    color: "from-[#7B5CF6] to-[#9D7FF3]",
    bgColor: "rgba(123, 92, 246, 0.08)",
  },
]

export function ProcessFlowSection() {
  return (
    <AnimatedSection
      id="process-section"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl text-gray-900"
        >
          Simple
          <span className="block bg-gradient-to-r from-[#FF6B9A] to-[#7B5CF6] bg-clip-text text-transparent">
            Implementation Process
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg font-medium"
          style={{ color: "#4b535c" }}
        >
          Get started with QDL in four straightforward steps
        </motion.p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Vertical Connecting Line */}
        <div
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255, 107, 154, 0.3), rgba(123, 92, 246, 0.5), rgba(255, 107, 154, 0.3))",
          }}
        />

        <div className="space-y-10 md:space-y-12">
          {processSteps.map((process, index) => {
            const Icon = process.icon
            const isEven = index % 2 === 0

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
                className={`relative flex items-center gap-6 md:gap-12 ${
                  !isEven && "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.15 + 0.1,
                    }}
                    className="relative"
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${process.color.split(" ")[1]}, ${process.color.split(" ")[3]})`,
                        boxShadow: "0 0 20px rgba(255, 107, 154, 0.3)",
                      }}
                    />
                    <div
                      className="absolute inset-0 w-6 h-6 rounded-full -z-10 blur-lg"
                      style={{
                        background: `linear-gradient(135deg, ${process.color.split(" ")[1]}, ${process.color.split(" ")[3]})`,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Step Card - Left/Right */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    className="relative group rounded-xl border border-gray-200 bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    {/* Background Gradient Accent */}
                    <div
                      className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${process.bgColor}, transparent)`,
                      }}
                    />

                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-1 relative z-10">
                      <span
                        className="inline-flex items-center justify-center h-7 w-7 rounded-full font-bold text-xs text-white"
                        style={{
                          background: "linear-gradient(135deg, rgb(238 199 220), rgb(168 158 245))",
                        }}
                      >
                        {process.step}
                      </span>
                    </div>

                    {/* Content Flex Layout */}
                    <div className="flex items-center gap-3 relative z-10">
                      {/* Left Content - Title and Description */}
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="mb-1 text-base font-semibold text-gray-900">
                          {process.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-xs leading-snug"
                          style={{ color: "#4b535c" }}
                        >
                          {process.description}
                        </p>
                      </div>

                      {/* Right Icon */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: index * 0.15 + 0.15,
                        }}
                        className="flex-shrink-0"
                      >
                        <div
                          className="inline-flex h-14 w-14 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor: process.bgColor,
                            background: `linear-gradient(135deg, ${process.bgColor}, rgba(123, 92, 246, 0.04))`,
                          }}
                        >
                          <Icon
                            className="h-7 w-7"
                            style={{
                              background: `linear-gradient(135deg, ${process.color
                                .split(" ")[1]}, ${process.color.split(" ")[3]})`,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Border Gradient on Hover */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, rgba(255, 107, 154, 0.1), rgba(123, 92, 246, 0.1))`,
                        border: "1px solid transparent",
                        backgroundClip: "padding-box",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for layout */}
                <div className="hidden md:block w-1/2" />

                {/* Mobile Timeline Indicator */}
                {index < processSteps.length - 1 && (
                  <div className="md:hidden absolute left-[11px] top-24 w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
