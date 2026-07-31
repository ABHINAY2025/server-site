"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ElectricBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ElectricBorder({ children, className, ...props }: ElectricBorderProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      className="group relative h-full rounded-2xl p-px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rotating gradient layer — only visible as the 1px ring around the card below */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <div
          className="electric-current-spin absolute -inset-[150%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #8B5CF6 315deg, #14B8A6 345deg, transparent 360deg)",
          }}
        />
      </div>

      <div
        className={cn(
          "relative h-full rounded-2xl border border-white/10 bg-[#0a0f1c] backdrop-blur-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
