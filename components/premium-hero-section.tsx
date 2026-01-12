"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Gradient } from "stripe-gradient"
import { Header } from "./header"
import { DemoModal } from "./demo-modal"

export function PremiumHeroSection() {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false)
  const [videoClosedByUser, setVideoClosedByUser] = React.useState(false)

  // Stripe-style animated canvas gradient - deferred to avoid blocking LCP
  React.useEffect(() => {
    if (typeof window === "undefined") return

    // Use requestIdleCallback to defer gradient initialization
    const timeoutId = setTimeout(() => {
      const canvas = document.getElementById(
        "gradient-canvas"
      ) as HTMLCanvasElement | null

      if (!canvas) return

      const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resize()

      const gradient = new Gradient()
      gradient.initGradient("#gradient-canvas")

      window.addEventListener("resize", resize)
      return () => window.removeEventListener("resize", resize)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      {/* STRIPE CANVAS BACKGROUND - FULL HEIGHT */}
      <canvas
        id="gradient-canvas"
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none", height: "100%", contentVisibility: "auto" }}
      />

      {/* HEADER */}
      <div className="relative z-40">
        <Header onDemoClick={() => setDemoModalOpen(true)} />
      </div>

      {/* MAIN HERO - FULL BLEED LAYOUT */}
      <div className="relative z-20 min-h-[calc(100vh-120px)] flex items-center">
        <div className="mx-auto max-w-7xl px-6 w-full py-20 lg:py-0">
          {/* TWO COLUMN LAYOUT - LEFT TEXT, RIGHT VIDEO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            
            {/* LEFT SIDE - TEXT CONTENT */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="space-y-6 text-left order-2 lg:order-1"
            >
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-7xl font-bold leading-tight text-white" style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                  Quantum Data Leap
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold text-white/90">
                  Intelligent Banking Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300">AI</span>
                </p>
              </div>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
                Real-time payments. Intelligent fraud defense. Digital KYC. Automated compliance. Quantum Data Leap is the intelligence layer for modern banking.
              </p>

            </motion.div>

            {/* RIGHT SIDE - VIDEO CONTAINER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className={`order-1 lg:order-2 hidden lg:block w-full ${
                videoClosedByUser ? 'invisible h-0' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md p-3 border border-white/30 shadow-2xl">
                {/* YouTube Video Embed - aspect ratio container */}
<div
  className="relative w-full bg-black rounded-2xl overflow-hidden"
  style={{ paddingBottom: '56.25%' }}
>
  <iframe
    src="https://drive.google.com/file/d/19JNH4q8s1yToCcCquhUHSXfQSWPBTWxH/preview"
    title="Quantum Data Leap Demo"
    className="absolute inset-0 w-full h-full"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-presentation"
    referrerPolicy="no-referrer"
  />
</div>


              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WAVY DIVIDER */}
      <svg
        viewBox="0 0 1440 120"
        className="relative z-20 w-full h-auto"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q360,80 720,40 T1440,40 L1440,120 L0,120 Z"
          fill="white"
        />
      </svg>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/60"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

      {/* DEMO MODAL */}
      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section>
  )
}
