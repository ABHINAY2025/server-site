"use client"

import * as React from "react"

export function InteractiveGrid() {
  const ref = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--gx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--gy", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="pointer-events-auto absolute inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        backgroundPosition: "-1px -1px",
        WebkitMaskImage:
          "radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), black 0%, transparent 75%)",
        maskImage:
          "radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), black 0%, transparent 75%)",
      }}
    />
  )
}
