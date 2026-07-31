"use client"

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  type PointerEvent as ReactPointerEvent,
} from "react"

interface CurvedMarqueeProps {
  text?: string
  color?: string
  direction?: "left" | "right"
  baseVelocity?: number
  curveAmount?: number
  gap?: number
  draggable?: boolean
  dragIntensity?: number
  fade?: boolean
  fadePercent?: number
  className?: string
}

const MAX_SPEED = 800

export function CurvedMarquee({
  text = "Meridian Trust  •  Northbridge Capital  •  Vantage Financial  •  Ledgerline Bank  •  Corestone Holdings  •  Apex Clearing Co.  •  Silverpeak Bancorp  •  Harborview Credit Union  •  ",
  color = "rgba(255,255,255,0.55)",
  direction = "left",
  baseVelocity = 12,
  curveAmount = 24,
  gap = 6,
  draggable = true,
  dragIntensity = 4,
  fade = true,
  fadePercent = 12,
  className,
}: CurvedMarqueeProps) {
  const measureRef = useRef<SVGTextElement>(null)
  const tspansRef = useRef<SVGTSpanElement[]>([])
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [textWidth, setTextWidth] = useState(0)

  const staticId = useMemo(() => {
    const propsString = `${text}-${curveAmount}-${direction}-${baseVelocity}`
    let hash = 0
    for (let i = 0; i < propsString.length; i++) {
      const char = propsString.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(36)
  }, [text, curveAmount, direction, baseVelocity])

  const pathId = `curve-${staticId}`
  const fadeGradientId = `fadeGradient-${staticId}`
  const fadeMaskId = `fadeMask-${staticId}`
  const pathD = `M-100,120 Q720,${120 + curveAmount} 1540,120`

  const isDragging = useRef(false)
  const dragVelocity = useRef(0)
  const effectiveVelocity = (baseVelocity / 100) * MAX_SPEED
  const actualBaseVelocity = direction === "left" ? -effectiveVelocity : effectiveVelocity
  const dragFactor = dragIntensity * 0.1

  const gapPx = (gap + 1) * 10
  const processedText = useMemo(() => text.trim(), [text])
  const spacing = textWidth + gapPx

  useEffect(() => {
    if (measureRef.current) {
      setTextWidth(measureRef.current.getComputedTextLength())
    }
  }, [text, color, direction, baseVelocity, curveAmount, gap])

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [curveAmount])

  const calculatedRepeats = spacing > 0 ? Math.ceil(pathLength / spacing) + 2 : 0
  const ready = pathLength > 0 && spacing > 0

  useEffect(() => {
    if (!ready) return
    let raf = 0
    let last = performance.now()

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const tick = (now: number) => {
      const delta = now - last
      last = now
      const spans = tspansRef.current
      if (spans.length > 0) {
        const maxX = (spans.length - 1) * spacing
        if (isDragging.current) {
          for (const tspan of spans) {
            if (!tspan) continue
            let x = parseFloat(tspan.getAttribute("x") || "0")
            x += dragVelocity.current
            if (x < -spacing) x = maxX
            if (x > maxX) x = -spacing
            tspan.setAttribute("x", x.toString())
          }
          dragVelocity.current *= 0.9
          if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0
        } else if (!reduceMotion) {
          let moveBy = actualBaseVelocity * (delta / 1000)
          moveBy += dragVelocity.current
          if (Math.abs(dragVelocity.current) > 0.01) {
            dragVelocity.current *= 0.96
          } else {
            dragVelocity.current = 0
          }
          for (const tspan of spans) {
            if (!tspan) continue
            let x = parseFloat(tspan.getAttribute("x") || "0")
            x += moveBy
            if (x < -spacing) x = maxX
            if (x > maxX) x = -spacing
            tspan.setAttribute("x", x.toString())
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready, spacing, actualBaseVelocity])

  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e: ReactPointerEvent<SVGTextElement>) => {
    if (!draggable) return
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.style.cursor = "grabbing"
    isDragging.current = true
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }
    dragVelocity.current = 0
  }
  const handlePointerMove = (e: ReactPointerEvent<SVGTextElement>) => {
    if (!draggable || !isDragging.current) return
    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastPointerPosition.current.x
    dragVelocity.current = deltaX * dragFactor
    lastPointerPosition.current = currentPosition
  }
  const handlePointerUp = (e: ReactPointerEvent<SVGTextElement>) => {
    if (!draggable) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    e.currentTarget.style.cursor = "grab"
    isDragging.current = false
  }

  const fadeStart = `${fadePercent}%`
  const fadeEnd = `${100 - fadePercent}%`

  return (
    <div
      className={className}
      style={{
        visibility: ready ? "visible" : "hidden",
        width: "100%",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 1440 240"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          userSelect: "none",
          width: "100%",
          aspectRatio: "1440 / 240",
          overflow: "visible",
          display: "block",
          fill: color,
          fontFamily: "inherit",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {processedText}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
          {fade && (
            <>
              <linearGradient id={fadeGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset={fadeStart} stopColor="white" stopOpacity="1" />
                <stop offset={fadeEnd} stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id={fadeMaskId}>
                <rect width="100%" height="100%" fill={`url(#${fadeGradientId})`} />
              </mask>
            </>
          )}
        </defs>
        {ready && (
          <text
            xmlSpace="preserve"
            mask={fade ? `url(#${fadeMaskId})` : undefined}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ cursor: draggable ? "grab" : "default" }}
          >
            <textPath href={`#${pathId}`} xmlSpace="preserve">
              {Array.from({ length: calculatedRepeats }).map((_, i) => (
                <tspan
                  key={i}
                  x={i * spacing}
                  ref={(el) => {
                    if (el) tspansRef.current[i] = el
                  }}
                >
                  {processedText}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  )
}
