"use client"

import * as React from "react"
import { ShieldCheck, AlertTriangle, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Hero visual. Replaces the product screenshot with a code-drawn, animated
 * illustration of what the platform does: transactions arriving, being
 * scored, and resolving to cleared or flagged.
 *
 * All data here is synthetic and fixed — it illustrates the mechanism, it
 * does not report performance. Nothing is rendered from a real feed.
 *
 * Deterministic by construction: the sequence is a static array advanced by
 * an index, so server and client render identically and there is no
 * Math.random() hydration hazard.
 */

type Verdict = "scoring" | "cleared" | "flagged"

type Txn = {
  id: string
  rail: string
  amount: string
  verdict: Verdict
  score: number
}

const LEDGER: Txn[] = [
  { id: "TXN-8841-QK", rail: "SWIFT",  amount: "1,284,900.00", verdict: "cleared", score: 4 },
  { id: "TXN-8842-RD", rail: "SEPA",   amount: "62,140.55",    verdict: "cleared", score: 9 },
  { id: "TXN-8843-LM", rail: "RTGS",   amount: "8,930,000.00", verdict: "flagged", score: 87 },
  { id: "TXN-8844-ZP", rail: "ACH",    amount: "14,772.10",    verdict: "cleared", score: 6 },
  { id: "TXN-8845-BW", rail: "SWIFT",  amount: "445,318.00",   verdict: "cleared", score: 12 },
  { id: "TXN-8846-NX", rail: "FASTER", amount: "2,190.75",     verdict: "cleared", score: 3 },
  { id: "TXN-8847-JC", rail: "RTGS",   amount: "7,410,650.00", verdict: "flagged", score: 92 },
  { id: "TXN-8848-VE", rail: "SEPA",   amount: "318,004.20",   verdict: "cleared", score: 11 },
]

const VISIBLE_ROWS = 5
const TICK_MS = 2100

const VERDICT_STYLE: Record<
  Verdict,
  { label: string; className: string; icon: typeof ShieldCheck }
> = {
  scoring: {
    label: "Scoring",
    className: "bg-muted text-muted-foreground",
    icon: Loader2,
  },
  cleared: {
    label: "Cleared",
    className: "bg-success-wash text-success",
    icon: ShieldCheck,
  },
  flagged: {
    label: "Flagged",
    className: "bg-destructive-wash text-destructive",
    icon: AlertTriangle,
  },
}

export function TransactionStream() {
  const [cursor, setCursor] = React.useState(0)
  // The newest row shows as "scoring" briefly before resolving.
  const [resolving, setResolving] = React.useState(true)
  const [live, setLive] = React.useState(false)

  React.useEffect(() => {
    // Only animate after mount, and only if the visitor accepts motion.
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (query.matches) return
    setLive(true)

    const tick = window.setInterval(() => {
      setCursor((c) => (c + 1) % LEDGER.length)
      setResolving(true)
      window.setTimeout(() => setResolving(false), 850)
    }, TICK_MS)

    return () => window.clearInterval(tick)
  }, [])

  const rows = React.useMemo(
    () =>
      Array.from({ length: VISIBLE_ROWS }, (_, i) => {
        const item = LEDGER[(cursor + i) % LEDGER.length]
        return { ...item, isNewest: i === 0 }
      }),
    [cursor]
  )

  return (
    <div className="relative">
      {/* Ambient glow behind the panel */}
      <div
        aria-hidden="true"
        className="qdl-drift pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]
                   bg-[radial-gradient(24rem_16rem_at_60%_20%,hsl(var(--primary)/0.14),transparent)]"
        style={{ ["--drift-duration" as string]: "9s" }}
      />

      <div className="qdl-shimmer relative overflow-hidden rounded-xl border border-border bg-card shadow-3">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              {live ? (
                <span
                  className="qdl-pulse absolute inline-flex size-2 rounded-full bg-success"
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="text-eyebrow uppercase text-muted-foreground">
              Transaction flow
            </span>
          </div>
          <span className="font-mono text-[11px] text-subtle">
            illustrative
          </span>
        </div>

        <ul className="divide-y divide-border-subtle">
          {rows.map((row, index) => {
            const verdict: Verdict =
              row.isNewest && resolving && live ? "scoring" : row.verdict
            const style = VERDICT_STYLE[verdict]
            const Icon = style.icon

            return (
              <li
                // Keying on the transaction id restarts the entrance animation
                // as each row enters the window.
                key={`${row.id}-${cursor}`}
                className={cn(
                  "grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3",
                  row.isNewest && live && "qdl-stream"
                )}
                style={{
                  opacity: 1 - index * 0.13,
                }}
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-mono text-xs text-foreground">
                      {row.id}
                    </span>
                    <span className="shrink-0 rounded border border-border px-1.5 py-px font-mono text-[10px] text-subtle">
                      {row.rail}
                    </span>
                  </div>
                  <span className="tabular font-mono text-sm text-muted-foreground">
                    {row.amount}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="tabular font-mono text-[11px] text-subtle">
                    {verdict === "scoring" ? "··" : String(row.score).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-standard",
                      style.className
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-3",
                        verdict === "scoring" && "animate-spin"
                      )}
                      aria-hidden="true"
                    />
                    {style.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <span className="text-xs text-subtle">
            Scored before settlement
          </span>
          <Sparkline />
        </div>
      </div>
    </div>
  )
}

/** Small self-drawing trend line. Fixed geometry, no data claims. */
function Sparkline() {
  const points = [14, 11, 15, 9, 12, 7, 10, 5, 8, 4]
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * 9} ${p}`)
    .join(" ")

  return (
    <svg
      width="82"
      height="18"
      viewBox="0 0 82 18"
      fill="none"
      aria-hidden="true"
      className="overflow-visible"
    >
      <path
        d={path}
        pathLength={1}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="qdl-draw"
        style={{ ["--draw-duration" as string]: "1800ms" }}
      />
      <circle
        cx={81}
        cy={4}
        r="2.5"
        fill="hsl(var(--primary))"
        className="qdl-pulse"
        style={{ ["--pulse-delay" as string]: "1800ms" }}
      />
    </svg>
  )
}
