"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MaskTextRevealProps {
  text: string
  className?: string
}

export function MaskTextReveal({ text, className }: MaskTextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.h2
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        className={cn(className)}
      >
        {text}
      </motion.h2>
    </div>
  )
}
