import * as React from "react"

/**
 * One code-drawn, animated visual per control plane, replacing the product
 * screenshots. Each is pure SVG + CSS — no images, no client JS, and safe to
 * render on the server.
 *
 * Geometry is fixed and hand-authored; nothing here encodes real data.
 */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative aspect-[16/8] w-full overflow-hidden border-b border-border
                 bg-[radial-gradient(28rem_14rem_at_50%_120%,hsl(var(--primary)/0.10),transparent)]"
      aria-hidden="true"
    >
      {/* Faint grid, so the panels read as instrumentation rather than decoration */}
      <svg className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <pattern id="qdl-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path
              d="M 26 0 L 0 0 0 26"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeOpacity="0.055"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#qdl-grid)" />
      </svg>
      {children}
    </div>
  )
}

/** Data Control — nodes synchronising, with packets travelling the links. */
function DataControlVisual() {
  const links = [
    { d: "M 40 70 C 100 70 100 30 160 30", delay: 0 },
    { d: "M 40 70 C 100 70 100 110 160 110", delay: 400 },
    { d: "M 160 30 C 220 30 220 70 280 70", delay: 900 },
    { d: "M 160 110 C 220 110 220 70 280 70", delay: 1300 },
  ]
  const nodes = [
    { cx: 40, cy: 70 },
    { cx: 160, cy: 30 },
    { cx: 160, cy: 110 },
    { cx: 280, cy: 70 },
  ]

  return (
    <Frame>
      <svg viewBox="0 0 320 140" className="absolute inset-0 size-full">
        {links.map((link, i) => (
          <g key={i}>
            <path
              d={link.d}
              pathLength={1}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              className="qdl-draw"
              style={{
                ["--draw-duration" as string]: "1500ms",
                ["--draw-delay" as string]: `${link.delay}ms`,
              }}
            />
            <circle
              r="3"
              fill="hsl(var(--primary))"
              className="qdl-travel"
              style={{
                offsetPath: `path("${link.d}")`,
                ["--travel-duration" as string]: "3.4s",
                ["--travel-delay" as string]: `${link.delay + 900}ms`,
              }}
            />
          </g>
        ))}

        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="7"
              fill="hsl(var(--primary))"
              fillOpacity="0.18"
              className="qdl-pulse"
              style={{ ["--pulse-delay" as string]: `${i * 500}ms` }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="5"
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth="1.8"
            />
          </g>
        ))}
      </svg>
    </Frame>
  )
}

/** Liquidity — a position curve drawing itself under a filled area. */
function LiquidityVisual() {
  const line =
    "M 10 104 L 48 88 L 86 96 L 124 62 L 162 74 L 200 44 L 238 56 L 276 28 L 310 36"
  const area = `${line} L 310 130 L 10 130 Z`

  return (
    <Frame>
      <svg viewBox="0 0 320 140" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="qdl-liq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Baseline the position is measured against */}
        <line
          x1="10" y1="80" x2="310" y2="80"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.16"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        <path
          d={area}
          fill="url(#qdl-liq-fill)"
          className="qdl-enter"
          style={{ ["--enter-delay" as string]: "900ms" }}
        />
        <path
          d={line}
          pathLength={1}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="qdl-draw"
          style={{ ["--draw-duration" as string]: "1900ms" }}
        />

        {/* Emphasised endpoint */}
        <circle
          cx="310" cy="36" r="8"
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          className="qdl-pulse"
          style={{ ["--pulse-delay" as string]: "1900ms" }}
        />
        <circle cx="310" cy="36" r="3.5" fill="hsl(var(--primary))" />
      </svg>
    </Frame>
  )
}

/** Fraud — a radar sweep over a field, with two anomalies pulsing. */
function FraudVisual() {
  const dots = [
    { cx: 70, cy: 44 }, { cx: 118, cy: 92 }, { cx: 152, cy: 36 },
    { cx: 196, cy: 78 }, { cx: 238, cy: 50 }, { cx: 92, cy: 108 },
    { cx: 262, cy: 100 }, { cx: 40, cy: 76 },
  ]
  const anomalies = [{ cx: 176, cy: 58 }, { cx: 244, cy: 84 }]

  return (
    <Frame>
      <svg viewBox="0 0 320 140" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="qdl-sweep-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.30" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[26, 46, 66].map((r) => (
          <circle
            key={r}
            cx="160" cy="70" r={r}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeOpacity="0.10"
            strokeWidth="1"
          />
        ))}

        <g className="qdl-sweep" style={{ transformOrigin: "160px 70px" }}>
          <path
            d="M 160 70 L 160 4 A 66 66 0 0 1 217 37 Z"
            fill="url(#qdl-sweep-grad)"
          />
        </g>

        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx} cy={dot.cy} r="2.5"
            fill="hsl(var(--foreground))"
            fillOpacity="0.3"
          />
        ))}

        {anomalies.map((a, i) => (
          <g key={i}>
            <circle
              cx={a.cx} cy={a.cy} r="6"
              fill="hsl(var(--destructive))"
              className="qdl-pulse"
              style={{ ["--pulse-delay" as string]: `${i * 1100}ms` }}
            />
            <circle cx={a.cx} cy={a.cy} r="3.5" fill="hsl(var(--destructive))" />
          </g>
        ))}
      </svg>
    </Frame>
  )
}

/** Rules — a decision tree drawing in, with a token flowing down one branch. */
function RulesVisual() {
  const branches = [
    { d: "M 46 70 L 120 70", delay: 0 },
    { d: "M 120 70 C 150 70 150 34 190 34", delay: 500 },
    { d: "M 120 70 C 150 70 150 106 190 106", delay: 700 },
    { d: "M 190 34 L 268 34", delay: 1100 },
    { d: "M 190 106 L 268 106", delay: 1300 },
  ]

  return (
    <Frame>
      <svg viewBox="0 0 320 140" className="absolute inset-0 size-full">
        {branches.map((b, i) => (
          <path
            key={i}
            d={b.d}
            pathLength={1}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            className="qdl-draw"
            style={{
              ["--draw-duration" as string]: "900ms",
              ["--draw-delay" as string]: `${b.delay}ms`,
            }}
          />
        ))}

        {/* Decision node */}
        <g>
          <rect
            x="106" y="56" width="28" height="28" rx="4"
            transform="rotate(45 120 70)"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.8"
          />
        </g>

        {/* Input and outcome nodes */}
        {[
          { x: 30, y: 62, w: 22 },
          { x: 258, y: 26, w: 22 },
          { x: 258, y: 98, w: 22 },
        ].map((n, i) => (
          <rect
            key={i}
            x={n.x} y={n.y} width={n.w} height="16" rx="3"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.6"
          />
        ))}

        {/* Token flowing the true branch */}
        <circle
          r="3"
          fill="hsl(var(--primary))"
          className="qdl-travel"
          style={{
            offsetPath:
              'path("M 46 70 L 120 70 C 150 70 150 34 190 34 L 268 34")',
            ["--travel-duration" as string]: "3.6s",
            ["--travel-delay" as string]: "1800ms",
          }}
        />
      </svg>
    </Frame>
  )
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "data-control": DataControlVisual,
  "liquidity-control": LiquidityVisual,
  "fraud-control": FraudVisual,
  "rules-engine": RulesVisual,
}

export function ModuleVisual({ slug }: { slug: string }) {
  const Visual = VISUALS[slug]
  return Visual ? <Visual /> : null
}
