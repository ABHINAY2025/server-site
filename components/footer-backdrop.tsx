"use client"

import { motion } from "framer-motion"

export function FooterBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient background - Matches theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-blue-100/40 to-transparent" />
      
      {/* Animated orbs - Subtle and elegant */}
      <motion.div
        className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/20 to-indigo-300/10 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-32 top-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/15 to-blue-300/10 blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Elegant grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(71,85,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Subtle top vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 via-transparent to-transparent" />
    </div>
  )
}
