"use client"

import * as React from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

const NOISE = "#$%&*+=?"

interface TextRevealWallProps {
  text: string
  className?: string
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.02 } },
}

export function TextRevealWall({ text, className }: TextRevealWallProps) {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.h2
      ref={ref}
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {text.split("").map((ch, i) => (
        <WallChar key={i} finalChar={ch} inView={inView} />
      ))}
    </motion.h2>
  )
}

function WallChar({ finalChar, inView }: { finalChar: string; inView: boolean }) {
  const [char, setChar] = React.useState(finalChar === " " ? " " : NOISE[0])

  React.useEffect(() => {
    if (!inView || finalChar === " ") return
    let ticks = 0
    const maxTicks = 5 + Math.floor(Math.random() * 4)
    const interval = setInterval(() => {
      ticks++
      if (ticks >= maxTicks) {
        setChar(finalChar)
        clearInterval(interval)
      } else {
        setChar(NOISE[Math.floor(Math.random() * NOISE.length)])
      }
    }, 45)
    return () => clearInterval(interval)
  }, [inView, finalChar])

  if (finalChar === " ") {
    return <span className="inline-block w-[0.3em]" aria-hidden="true" />
  }

  return (
    <motion.span
      className="inline-block"
      variants={{ hidden: { opacity: 0.3 }, visible: { opacity: 1 } }}
    >
      {char}
    </motion.span>
  )
}
