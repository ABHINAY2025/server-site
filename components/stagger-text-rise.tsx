"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface StaggerTextRiseProps {
  text: string
  className?: string
  delay?: number
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
}

const word: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export function StaggerTextRise({ text, className, delay = 0 }: StaggerTextRiseProps) {
  const words = text.split(" ")

  return (
    <motion.h1
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-1 last:mr-0">
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  )
}
