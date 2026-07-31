"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface LetterDropProps {
  text: string
  className?: string
  delay?: number
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.03, delayChildren: delay },
  }),
}

const letter: Variants = {
  hidden: { opacity: 0, y: -32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  },
}

export function LetterDrop({ text, className, delay = 0 }: LetterDropProps) {
  return (
    <motion.h2
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {text.split("").map((ch, i) => (
        <motion.span key={i} className="inline-block" variants={letter}>
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.h2>
  )
}
