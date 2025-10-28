"use client"

import { ChevronRight } from "lucide-react"

export function FlowingArrows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Horizontal flowing arrows */}
      <div className="absolute top-1/4 left-0 w-full h-12 flex items-center justify-start">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`arrow-h-${i}`}
            className="flowing-arrow absolute"
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${i * 25}%`,
            }}
          >
            <ChevronRight className="w-6 h-6 text-primary/30" strokeWidth={1.5} />
          </div>
        ))}
      </div>

      {/* Vertical flowing arrows */}
      <div className="absolute left-1/3 top-0 h-full w-12 flex flex-col items-center justify-start">
        {[0, 1, 2].map((i) => (
          <div
            key={`arrow-v-${i}`}
            className="floating-arrow absolute"
            style={{
              animationDelay: `${i * 1}s`,
              top: `${i * 30}%`,
            }}
          >
            <ChevronRight className="w-5 h-5 text-primary/20 rotate-90" strokeWidth={1.5} />
          </div>
        ))}
      </div>

      {/* Diagonal flowing arrows */}
      <div className="absolute right-1/4 bottom-1/4 w-32 h-32">
        {[0, 1].map((i) => (
          <div
            key={`arrow-d-${i}`}
            className="flowing-arrow absolute"
            style={{
              animationDelay: `${i * 1}s`,
              right: `${i * 40}px`,
              bottom: `${i * 40}px`,
            }}
          >
            <ChevronRight className="w-5 h-5 text-primary/25 rotate-45" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  )
}
