"use client"

import * as React from "react"

// Generates dot positions on a sphere silhouette projected to 2D, with a simple
// "near side" falloff so it reads as a globe rather than a flat dot grid.
function useGlobeDots(rows: number, cols: number) {
  return React.useMemo(() => {
    const dots: { x: number; y: number; r: number; o: number }[] = []
    const cx = 50
    const cy = 50
    const radius = 46

    for (let row = 0; row < rows; row++) {
      const v = (row / (rows - 1)) * Math.PI // 0..PI (top to bottom)
      const y = cy - radius * Math.cos(v)
      const ringRadius = radius * Math.sin(v)
      if (ringRadius < 1) continue

      const circumference = (ringRadius / radius) * cols
      const count = Math.max(4, Math.round(circumference))

      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2
        const x = cx + ringRadius * Math.cos(u)
        // Fake depth: dots toward the horizontal center of the sphere are "front-facing"
        const depth = Math.cos(u)
        if (depth < -0.15) continue // hide back-of-sphere dots
        dots.push({
          // Round to avoid server/client floating-point drift causing hydration warnings
          x: Math.round(x * 1000) / 1000,
          y: Math.round(y * 1000) / 1000,
          r: Math.round((0.55 + depth * 0.25) * 1000) / 1000,
          o: Math.round((0.25 + Math.max(0, depth) * 0.55) * 1000) / 1000,
        })
      }
    }
    return dots
  }, [rows, cols])
}

interface Arc {
  from: [number, number]
  to: [number, number]
  color: string
  delay: number
  duration: number
}

const ARCS: Arc[] = [
  { from: [30, 38], to: [68, 30], color: "#8B5CF6", delay: 0, duration: 3.2 },
  { from: [68, 30], to: [58, 62], color: "#14B8A6", delay: 1.1, duration: 3.6 },
  { from: [30, 38], to: [58, 62], color: "#F59E0B", delay: 2.2, duration: 3.4 },
]

function arcPath(from: [number, number], to: [number, number]) {
  const [x1, y1] = from
  const [x2, y2] = to
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.35
  return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`
}

export function DottedGlobe() {
  const dots = useGlobeDots(26, 34)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="globe-fade" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="47" fill="url(#globe-fade)" />

        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#8B5CF6" opacity={d.o} />
        ))}

        {ARCS.map((arc, i) => {
          const d = arcPath(arc.from, arc.to)
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={arc.color} strokeWidth={0.35} strokeOpacity={0.35} />
              <circle r={0.9} fill={arc.color}>
                <animateMotion
                  dur={`${arc.duration}s`}
                  begin={`${arc.delay}s`}
                  repeatCount="indefinite"
                  path={d}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur={`${arc.duration}s`}
                  begin={`${arc.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={arc.from[0]} cy={arc.from[1]} r={1.1} fill={arc.color} />
              <circle cx={arc.to[0]} cy={arc.to[1]} r={1.1} fill={arc.color} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
