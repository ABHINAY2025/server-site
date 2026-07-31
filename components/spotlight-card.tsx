"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className, onMouseMove, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = innerRef.current
      if (target) {
        const rect = target.getBoundingClientRect()
        target.style.setProperty("--x", `${e.clientX - rect.left}px`)
        target.style.setProperty("--y", `${e.clientY - rect.top}px`)
      }
      onMouseMove?.(e)
    }

    return (
      <div
        ref={(node) => {
          ;(innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md",
          className
        )}
        {...props}
      >
        <div
          className="spotlight-overlay pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    )
  }
)
SpotlightCard.displayName = "SpotlightCard"
