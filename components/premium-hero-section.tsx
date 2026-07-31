"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Sparkles, ShieldCheck, Activity, Zap } from "lucide-react"
import { Header } from "./header"
import { DemoModal } from "./demo-modal"
import { StaggerTextRise } from "./stagger-text-rise"
import { InteractiveGrid } from "./interactive-grid"

function DashboardMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
      whileHover={{ rotateX: 2, rotateY: -2 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:p-6"
    >
      {/* Window chrome */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="text-xs font-medium text-white/40">QDL Live Console</span>
      </div>

      {/* Status pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { label: "Live Sync", icon: Activity, color: "text-teal-300", dot: "bg-teal-400" },
          { label: "Anomaly Scan", icon: ShieldCheck, color: "text-violet-300", dot: "bg-violet-400" },
          { label: "Uptime 99.99%", icon: Zap, color: "text-amber-300", dot: "bg-amber-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${item.dot} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${item.dot}`} />
            </span>
            <span className={item.color}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Animated transaction graph */}
      <div className="mb-5 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-white/50">
          <span>Real-time Transaction Volume</span>
          <span className="text-teal-300">+18.4%</span>
        </div>
        <svg viewBox="0 0 300 80" className="h-16 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,60 C20,45 35,65 55,40 C75,15 90,50 110,35 C130,20 150,55 170,30 C190,10 210,45 230,25 C250,10 270,35 300,15"
            fill="none"
            stroke="url(#heroLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          />
        </svg>
      </div>

      {/* Mini metric tiles */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Transactions/s", value: "12.4K" },
          { label: "Anomalies Blocked", value: "342" },
          { label: "Active Rules", value: "58" },
        ].map((tile) => (
          <div key={tile.label} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-lg font-bold text-white">{tile.value}</div>
            <div className="text-[10px] uppercase tracking-wide text-white/40">{tile.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function PremiumHeroSection() {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false)
  const [tourOpen, setTourOpen] = React.useState(false)

  return (
    <section id="hero-section" className="mesh-gradient-bg relative w-full overflow-hidden">
      <InteractiveGrid />

      <div className="relative z-40">
        <Header onDemoClick={() => setDemoModalOpen(true)} />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:pt-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* LEFT - TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-6 text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200"
            >
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              Built for banks, fintechs & treasury teams
            </motion.div>

            <div className="space-y-4">
              <StaggerTextRise
                text="Quantum Data Leap"
                delay={0.15}
                className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
              />
              <p className="text-2xl font-semibold text-white/90 sm:text-3xl">
                One platform to run your bank&apos;s{" "}
                <span className="gradient-text-violet-teal">data, fraud checks & rules</span>
              </p>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
              QDL keeps your transaction data in sync across every system, flags suspicious
              activity before it becomes a loss, and lets your team update compliance rules
              without writing code — all from one dashboard.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <motion.button
                onClick={() => setDemoModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="glow-border inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-teal-400 px-7 py-3.5 font-semibold text-white shadow-lg transition-shadow duration-300 hover:shadow-violet-500/40"
              >
                Request Demo
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                onClick={() => setTourOpen((v) => !v)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <Play className="h-4 w-4" />
                Watch Interactive Tour
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT - DASHBOARD MOCK / VIDEO TOUR */}
          <div className="relative hidden lg:block">
            {tourOpen ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-md"
              >
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-black"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    src="https://drive.google.com/file/d/19JNH4q8s1yToCcCquhUHSXfQSWPBTWxH/preview"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-xl"
                    allow="autoplay"
                  />
                </div>
              </motion.div>
            ) : (
              <DashboardMock />
            )}
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-white/40"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section>
  )
}
