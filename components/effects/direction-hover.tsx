"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Direction = "top" | "right" | "bottom" | "left"

function getDirection(e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement): Direction {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  const angle = Math.atan2(y, x) * (180 / Math.PI)

  if (angle >= -45 && angle < 45) return "right"
  if (angle >= 45 && angle < 135) return "bottom"
  if (angle >= -135 && angle < -45) return "top"
  return "left"
}

const offsets: Record<Direction, { x: string; y: string }> = {
  top: { x: "0%", y: "-100%" },
  right: { x: "100%", y: "0%" },
  bottom: { x: "0%", y: "100%" },
  left: { x: "-100%", y: "0%" },
}

interface DirectionHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DirectionHover({ children, className, ...props }: DirectionHoverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [direction, setDirection] = React.useState<Direction>("bottom")
  const [hovered, setHovered] = React.useState(false)

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) setDirection(getDirection(e, ref.current))
    setHovered(true)
  }
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) setDirection(getDirection(e, ref.current))
    setHovered(false)
  }

  const { x, y } = offsets[direction]

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-violet-500/15 to-teal-400/15"
        initial={false}
        animate={{
          x: hovered ? "0%" : x,
          y: hovered ? "0%" : y,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
