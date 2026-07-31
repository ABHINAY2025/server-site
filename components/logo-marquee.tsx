"use client"

import * as React from "react"

const trustLogos = [
  "Meridian Trust",
  "Northbridge Capital",
  "Vantage Financial",
  "Ledgerline Bank",
  "Corestone Holdings",
  "Apex Clearing Co.",
  "Silverpeak Bancorp",
  "Harborview Credit Union",
]

export function LogoMarquee() {
  const items = [...trustLogos, ...trustLogos]

  return (
    <div className="marquee-pause relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-4">
        {items.map((name, index) => (
          <div
            key={`${name}-${index}`}
            className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold tracking-wide text-white/50 backdrop-blur-md grayscale transition-all duration-300 hover:text-white/90 hover:opacity-100 hover:grayscale-0"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}
