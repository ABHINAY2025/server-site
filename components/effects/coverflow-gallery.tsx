"use client"

import * as React from "react"
import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react"

const PERSPECTIVE = 1600
const SCALE_STEP = 0.16
const MAX_VISIBLE = 2
const DEPTH = 240

interface CoverflowGalleryProps<T> {
  items: T[]
  renderItem: (item: T, isActive: boolean) => React.ReactNode
  cardWidth?: number
  cardHeight?: number
  tilt?: number
  sideTilt?: number
  gap?: number
  dimOpacity?: number
  duration?: number
  className?: string
}

export function CoverflowGallery<T>({
  items,
  renderItem,
  cardWidth = 380,
  cardHeight = 380,
  tilt = 10,
  sideTilt = 6,
  gap = 8,
  dimOpacity = 88,
  duration = 0.6,
  className,
}: CoverflowGalleryProps<T>) {
  const n = items.length
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)))
  }, [n])

  const lockRef = useRef(false)
  const lock = useCallback(() => {
    lockRef.current = true
    window.setTimeout(() => {
      lockRef.current = false
    }, Math.max(50, duration * 1000))
  }, [duration])

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return
      lock()
      setActive((a) => (((a + dir) % n) + n) % n)
    },
    [n, lock]
  )

  const handleCardClick = useCallback(
    (i: number) => {
      if (lockRef.current) return
      lock()
      setActive((a) => (i === a ? (a + 1) % n : i))
    },
    [lock]
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        step(1)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        step(-1)
      }
    },
    [step]
  )

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)"
  const transitionCss = `transform ${duration}s ${ease}, opacity ${duration}s ${ease}`
  const dim = Math.max(0, Math.min(100, dimOpacity)) / 100

  const rootStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: cardHeight + 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: `${PERSPECTIVE}px`,
    overflow: "hidden",
    outline: "none",
  }

  return (
    <div
      className={className}
      style={rootStyle}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
    >
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, i) => {
          let rel = i - active
          if (rel > n / 2) rel -= n
          if (rel < -n / 2) rel += n
          const ax = Math.abs(rel)
          const visible = ax <= MAX_VISIBLE
          const isActive = rel === 0
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP)
          const tx = rel * (gap * 30)
          const tz = -ax * DEPTH
          const ry = -rel * tilt
          const rz = rel * sideTilt

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: cardWidth,
            height: cardHeight,
            borderRadius: 16,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
            transition: `${transitionCss}, filter ${duration}s ${ease}`,
            opacity: visible ? 1 : 0,
            filter: isActive ? "blur(0px)" : `blur(${Math.min(3, ax * 1.5)}px)`,
            boxShadow: isActive
              ? "0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.25)"
              : "none",
            cursor: isActive ? "default" : "pointer",
            pointerEvents: visible ? "auto" : "none",
          }

          return (
            <div
              key={i}
              style={cardStyle}
              onClick={() => handleCardClick(i)}
              aria-hidden={!visible}
            >
              {renderItem(item, isActive)}

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  opacity: isActive ? 0 : dim,
                  transition: `opacity ${duration}s ${ease}`,
                  pointerEvents: "none",
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Prev/next dots */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2 pb-1">
        {items.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              background: i === active ? "linear-gradient(90deg, #8B5CF6, #14B8A6)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
