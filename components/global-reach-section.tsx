"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"

const Globe = dynamic(() => import("./effects/globe").then((mod) => mod.Globe), {
  ssr: false,
})

const capabilities = [
  "Payments settle instantly, whether they're moving domestically or across a border",
  "Plugs straight into your existing core banking, payments, and compliance systems",
  "Keeps customer data in the country it's required to stay in",
  "One view of every account balance, across every connected bank",
  "Handles currency conversion automatically — no manual reconciliation at month-end",
]

export function GlobalReachSection() {
  return (
    <AnimatedSection
      id="global-reach-section"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#080c16]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-teal-400 to-violet-500" />

        <div className="grid grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT - copy */}
          <div>
            <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
              For banks operating in multiple countries
            </span>

            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              Expanding to a new country shouldn&apos;t mean rebuilding your systems
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/60">
              QDL already speaks the language of banking systems, payment networks, and data
              rules in the markets you operate in — so opening in a new country is a setup
              task for your team, not a multi-month engineering project.
            </p>

            <ul className="mt-8 space-y-4">
              {capabilities.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
                    <Check className="h-3.5 w-3.5 text-teal-300" />
                  </span>
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glow-border mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-teal-400 px-6 py-3 font-semibold text-white shadow-lg transition-shadow duration-300 hover:shadow-violet-500/40"
            >
              Talk to Sales
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* RIGHT - globe visual */}
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
            <Globe
              dots={{ color: "#8B5CF6", size: 4, density: 7, allDots: false }}
              outlineColor="rgba(139,92,246,0.55)"
              graticuleColor="rgba(139,92,246,0.15)"
              markerConfig={{
                color: "#14B8A6",
                size: 55,
                markers: [
                  { lat: 40.7128, lng: -74.006 }, // New York
                  { lat: 51.5074, lng: -0.1278 }, // London
                  { lat: 1.3521, lng: 103.8198 }, // Singapore
                  { lat: 25.2048, lng: 55.2708 }, // Dubai
                  { lat: 36.7783, lng: -119.4179 }, // California
                  { lat: 31.9686, lng: -99.9018 }, // Texas
                ],
              }}
              arcs={[
                { from: [36.7783, -119.4179], to: [31.9686, -99.9018], color: "#F59E0B" }, // California -> Texas
                { from: [40.7128, -74.006], to: [51.5074, -0.1278], color: "#8B5CF6" }, // New York -> London
                { from: [1.3521, 103.8198], to: [25.2048, 55.2708], color: "#14B8A6" }, // Singapore -> Dubai
              ]}
              speed={1.5}
              scale={9}
              stopOnHover
            />
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
