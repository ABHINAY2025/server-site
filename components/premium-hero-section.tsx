"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Gradient } from "stripe-gradient"
import { Header } from "./header"
import { DemoModal } from "./demo-modal"

export function PremiumHeroSection() {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [heroVisible, setHeroVisible] = React.useState(true)
  const [videoClosedByUser, setVideoClosedByUser] = React.useState(false)
  const heroSectionRef = React.useRef<HTMLDivElement | null>(null)

  // Stripe-style animated canvas gradient
  React.useEffect(() => {
    if (typeof window === "undefined") return

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
  }, [])

  // Track hero section visibility
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      {/* STRIPE CANVAS BACKGROUND - FULL HEIGHT */}
      <canvas
        id="gradient-canvas"
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none", height: "100%" }}
      />

      {/* HEADER */}
      <div className="relative z-40">
        <Header onDemoClick={() => setDemoModalOpen(true)} />
      </div>

      {/* MAIN HERO - FULL BLEED LAYOUT */}
      <div className="relative z-20 min-h-[calc(100vh-120px)] flex items-center" ref={heroSectionRef}>
        <div className="mx-auto max-w-7xl px-6 w-full py-20 lg:py-0">
          {/* TWO COLUMN LAYOUT - LEFT TEXT, RIGHT VIDEO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            
            {/* LEFT SIDE - TEXT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="space-y-6 text-left order-2 lg:order-1"
            >
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
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
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className={`order-1 lg:order-2 hidden lg:block ${
                heroVisible && !videoClosedByUser
                  ? 'w-full' 
                  : !videoClosedByUser
                  ? 'fixed bottom-6 right-6 w-96 z-50'
                  : 'hidden'
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md p-3 border border-white/30 shadow-2xl">
                {!heroVisible && (
                  <button
                    onClick={() => setVideoClosedByUser(true)}
                    className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    aria-label="Close video"
                  >
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <iframe
                  ref={videoRef}
                  src="https://drive.google.com/file/d/1u6sENoDL-EBAX56_QCh9nAIwRJra3Jkr/preview"
                  className="h-full w-full rounded-2xl aspect-video"
                  allow="autoplay"
                  allowFullScreen
                />
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
