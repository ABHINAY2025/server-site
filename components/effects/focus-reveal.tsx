"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FocusRevealProps {
  children: React.ReactNode
  className?: string
}

export function FocusReveal({ children, className }: FocusRevealProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, filter: "blur(14px)", scale: 1.03 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.h2>
  )
}
