"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Gradient } from "stripe-gradient"
import { Header } from "./header"
import { DemoModal } from "./demo-modal"

export function PremiumHeroSection() {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* STRIPE CANVAS BACKGROUND */}
      <canvas
        id="gradient-canvas"
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none" }}
      />

      {/* HEADER */}
      <div className="relative z-40">
        <Header onDemoClick={() => setDemoModalOpen(true)} />
      </div>

      {/* DIAGONAL WHITE CUT */}
      <div
        className="absolute bottom-0 left-0 z-10 h-[46%] w-full bg-white"
        style={{
          clipPath: "polygon(0 65%, 100% 4%, 100% 100%, 0 100%)",
        }}
      />

      {/* HERO CONTENT */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-6 text-center lg:text-left"
          >
          


            <h1 className="text-5xl pb-10 font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Quantum Data Leap
              </h1>
              <span className="bg-clip-text text-2xl pt-16 text-transparent bg-white">
              Intelligent Banking Powered by AI
              </span>
            

            <p className="max-w-xl text-lg text-white">
              QDL (Quantum Data Leap) enables real-time payments, AI-driven fraud
              detection, digital KYC, and automated compliance for
              next-generation banks.
            </p>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="relative z-30 mx-auto lg:mx-0"
          >
      <div className="overflow-hidden rounded-2xl bg-white p-2 
                      shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                      w-[720px] h-[420px] lg:w-[600px] lg:h-[380px]">
        <video
          ref={videoRef}
          src="/invideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/mcp-intgretion/hero-bg-webp"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

          </motion.div>
        </div>
      </div>

      {/* DEMO MODAL */}
      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section>
  )
}
