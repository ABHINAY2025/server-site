"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <span className={cn("group/glitch relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 opacity-0 transition-opacity duration-150 group-hover/glitch:opacity-70"
        style={{ color: "#8B5CF6", animation: "glitch-shift-1 0.35s steps(2, jump-none) infinite" }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 opacity-0 transition-opacity duration-150 group-hover/glitch:opacity-70"
        style={{ color: "#14B8A6", animation: "glitch-shift-2 0.35s steps(2, jump-none) infinite" }}
      >
        {children}
      </span>
    </span>
  )
}
