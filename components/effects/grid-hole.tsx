"use client"

export function GridHole() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(139,92,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.12) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        WebkitMaskImage:
          "radial-gradient(55% 55% at 50% 45%, transparent 0%, transparent 35%, black 75%)",
        maskImage:
          "radial-gradient(55% 55% at 50% 45%, transparent 0%, transparent 35%, black 75%)",
      }}
      aria-hidden="true"
    />
  )
}
