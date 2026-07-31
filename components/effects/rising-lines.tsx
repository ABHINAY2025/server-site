"use client"

const LINE_COUNT = 24

export function RisingLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="flex h-full w-full justify-between px-2">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="rising-line w-px bg-gradient-to-t from-transparent via-violet-400/40 to-transparent"
            style={{
              animationDuration: `${5 + (i % 6)}s`,
              animationDelay: `${(i % 8) * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
