"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

interface ScrambleTextProps {
  text: string
  className?: string
  as?: "h2" | "span"
}

export function ScrambleText({ text, className, as = "h2" }: ScrambleTextProps) {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [display, setDisplay] = React.useState(text)
  const played = React.useRef(false)

  React.useEffect(() => {
    if (!inView || played.current) return
    played.current = true

    let frame = 0
    const totalFrames = 18
    const interval = setInterval(() => {
      frame++
      const revealCount = Math.floor((frame / totalFrames) * text.length)
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " "
            if (i < revealCount) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )
      if (frame >= totalFrames) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [inView, text])

  const Tag = as === "span" ? motion.span : motion.h2

  return (
    <Tag ref={ref as any} className={cn("font-mono", className)}>
      {display}
    </Tag>
  )
}
