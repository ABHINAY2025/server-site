"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "./header"
import { Button } from "./ui/button"
import { DemoModal } from "./demo-modal"
import { DashboardPreview } from "./dashboard-preview"

export function PremiumHeroSection() {
  const [demoModalOpen, setDemoModalOpen] = React.useState(false)

  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(true)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const progressRef = React.useRef(0)
  const lastUpdateRef = React.useRef(0)

  // Animated gradient text using letter-by-letter reveal
  const headline = "Intelligent Banking Powered by AI"
  const subheadline =
    "Transform your banking operations with intelligent data control, liquidity management, fraud detection, and automated compliance rules."

  function formatTime(seconds: number) {
    if (!seconds || Number.isNaN(seconds)) return "0:00"
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-40">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Gradient Headline with letter-by-letter animation */}
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">
                {headline.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          duration: 0.5,
                        }}
                        className={
                          wordIndex === 3
                            ? "bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent"
                            : "text-gray-900"
                        }
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    <span className="inline-block w-2" />
                  </span>
                ))}
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg leading-relaxed text-gray-600 sm:text-xl"
            >
              {subheadline}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-3 sm:justify-center lg:justify-start"
            >
              {/* Primary CTA - Animated pulse on load */}
              <Link href="http://10.30.0.104:3000/">
                <Button
                  size="lg"
                  className="group relative mx-auto h-14 w-56 rounded-lg bg-gray-900 px-8 text-base font-semibold text-white shadow-lg hover:scale-105 hover:bg-gray-800 sm:mx-0"
                  style={{ backgroundColor: "#10b483" }}
                  aria-label="Get started free"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-lg bg-gray-800/20"
                  />
                  <span className="relative">Get Started Free</span>
                </Button>
              </Link>

              {/* Secondary CTA - Watch Demo */}
              <Button
                size="lg"
                variant="outline"
                className="group relative mx-auto h-14 w-56 rounded-lg border-2 border-gray-300 bg-white px-8 text-base font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 sm:mx-0"
                // className="group relative h-14 rounded-full bg-white px-8 text-base font-semibold text-teal-600 shadow-xl shadow-teal-500/20 transition-all hover:scale-105 hover:bg-white/95 hover:shadow-2xl hover:shadow-teal-500/30"

                onClick={() => setDemoModalOpen(true)}
                aria-label="Request demo"
              >
                
                <Play className="mr-2 h-5 w-5" />
                <span className="relative">Request Demo</span>
                </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-gray-600 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>99.9% uptime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5">
                  <video
                    ref={videoRef}
                    src="/video/invideo.mp4"
                    className="h-full w-full object-cover"
                    autoPlay
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    crossOrigin="anonymous"
                    aria-label="Demo video"
                    onCanPlayThrough={() => {
                      if (videoRef.current?.paused) {
                        videoRef.current.play().catch(() => {})
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (!videoRef.current) return
                      setDuration(videoRef.current.duration || 0)
                    }}
                    onTimeUpdate={() => {
                      if (!videoRef.current || !videoRef.current.duration) return
                      const newProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
                      if (Math.abs(newProgress - progressRef.current) > 1) {
                        progressRef.current = newProgress
                        setProgress(newProgress)
                      }
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onStalled={() => {
                      if (!videoRef.current || videoRef.current.readyState >= 3) return
                      console.warn("Video stalled, buffering...")
                    }}
                    onWaiting={() => {
                      console.warn("Video waiting for data...")
                    }}
                    onError={(e) => {
                      console.error("Video error:", e.currentTarget.error)
                    }}
                    onEnded={() => {
                      if (videoRef.current) videoRef.current.currentTime = 0
                      setIsPlaying(false)
                    }}
                  />

                  {/* Custom Controls Overlay (non-blurred for better performance) */}
                  <div className="absolute left-0 right-0 bottom-0 z-20 px-3 pb-3">
                    <div className="rounded-lg bg-black/50 backdrop-blur-sm px-3 py-2 flex items-center gap-3">
                      <button
                        onClick={() => {
                          const v = videoRef.current
                          if (!v) return
                          if (v.paused) {
                            v.play()
                          } else {
                            v.pause()
                          }
                        }}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          const v = videoRef.current
                          if (!v) return
                          v.muted = !v.muted
                          setIsMuted(v.muted)
                        }}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                      >
                        {isMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 5v10l-4-4H3V9h2l4-4zM14.536 5.464a6 6 0 010 8.486l1.414-1.414a4 4 0 000-5.657L14.536 5.464z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 5v10l-4-4H3V9h2l4-4zM13.121 6.879a4 4 0 010 6.243l1.415-1.414a2 2 0 000-3.172L13.12 6.88zM15.536 4.464a6 6 0 010 11.072l1.414-1.414a4 4 0 000-8.244L15.536 4.464z" />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1">
                        <div
                          className="h-2 w-full bg-white/20 rounded cursor-pointer relative"
                          onClick={(e) => {
                            const bar = e.currentTarget
                            const rect = bar.getBoundingClientRect()
                            const clickX = (e as React.MouseEvent<HTMLDivElement>).clientX - rect.left
                            const pct = Math.max(0, Math.min(1, clickX / rect.width))
                            if (!videoRef.current) return
                            videoRef.current.currentTime = (videoRef.current.duration || 0) * pct
                            setProgress(pct * 100)
                          }}
                        >
                          <div className="absolute left-0 top-0 h-2 bg-teal-400 rounded" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-white/80">
                          <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                          <span>{formatTime(duration || 0)}</span>
                        </div>
                      </div>

                      <button
                        onClick={async () => {
                          const el = videoRef.current?.parentElement
                          if (!el) return
                          try {
                            if (document.fullscreenElement) {
                              await document.exitFullscreen()
                            } else {
                              // vendor prefixed fallbacks
                              if ((el as any).requestFullscreen) await (el as any).requestFullscreen()
                              else if ((el as any).webkitRequestFullscreen) await (el as any).webkitRequestFullscreen()
                            }
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                        aria-label="Toggle fullscreen"
                        className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 3h6v2H5v4H3V3zm14 0v6h-2V5h-4V3h6zM3 17v-6h2v4h4v2H3zm14 0h-6v-2h4v-4h2v6z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200/30 to-cyan-200/30 blur-3xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-4 -left-4 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-200/30 to-teal-200/30 blur-3xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </section>
  )
}

