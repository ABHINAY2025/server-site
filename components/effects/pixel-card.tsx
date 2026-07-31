"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const COLS = 6
const ROWS = 4
const CELLS = Array.from({ length: COLS * ROWS })

export function PixelCard({ children, className, ...props }: PixelCardProps) {
  return (
    <div
      className={cn(
        "group/pixel relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 grid opacity-0 transition-opacity duration-300 group-hover/pixel:opacity-100"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
        aria-hidden="true"
      >
        {CELLS.map((_, i) => (
          <span
            key={i}
            className="scale-0 bg-gradient-to-br from-violet-500/25 to-teal-400/25 opacity-0 transition-all duration-300 group-hover/pixel:scale-100 group-hover/pixel:opacity-100"
            style={{ transitionDelay: `${(i % COLS) * 25 + Math.floor(i / COLS) * 40}ms` }}
          />
        ))}
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
