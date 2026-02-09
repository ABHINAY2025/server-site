"use client"

import { motion } from "framer-motion"

export function PageBackdrop() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient background - Elegant dark light theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-100/50 to-slate-100" />
      
      {/* Animated orbs - Sophisticated muted colors */}
      <motion.div
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-blue-300/30 to-indigo-300/20 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/25 to-indigo-300/15 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-slate-300/25 to-blue-300/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/25 to-slate-300/20 blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Elegant grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(71,85,105,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Subtle radial vignette for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/5" />
    </div>
  )
}
