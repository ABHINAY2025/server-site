"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RevealDirection = "up" | "left" | "right" | "scale"

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "li" | "article" | "span"
  direction?: RevealDirection
  /** Milliseconds. Use small increments to stagger siblings. */
  delay?: number
  /** Fraction of the element that must be visible before it plays. */
  threshold?: number
}

/**
 * Scroll-triggered entrance, played once per element.
 *
 * IntersectionObserver rather than a scroll listener, so nothing runs on the
 * main thread between intersections. The animation itself is CSS
 * (see `[data-reveal]` in globals.css) and touches only opacity and
 * transform, so it stays on the compositor.
 */
export function Reveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  threshold = 0.15,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    // If the browser can't observe, show the content rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    // Already in view on load (above the fold) — play immediately.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={direction}
      data-visible={visible ? "true" : "false"}
      className={cn(className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}
