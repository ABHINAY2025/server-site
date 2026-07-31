"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

type TransitionValue = {
  type?: string
  duration?: number
  delay?: number
  ease?: string | number[]
  staggerChildren?: number
}

type StaggerFrom = "start" | "center" | "end" | "random"

interface SpotlightRevealProps {
  text: string
  className?: string
  color?: string
  blur?: number
  staggerFrom?: StaggerFrom
  transition?: TransitionValue
  /** Substring of `text` to render with the violet-teal gradient (e.g. a brand name). */
  highlight?: string
}

const START_SCALE = 1.45

const mapEase = (ease: TransitionValue["ease"]): string => {
  if (typeof ease !== "string") return "power2.out"

  const easeMap: Record<string, string> = {
    linear: "none",
    easeIn: "power2.in",
    easeOut: "power2.out",
    easeInOut: "power2.inOut",
    circIn: "circ.in",
    circOut: "circ.out",
    circInOut: "circ.inOut",
    backIn: "back.in",
    backOut: "back.out(1.7)",
    backInOut: "back.inOut",
    anticipate: "back.out(1.7)",
  }

  return easeMap[ease] ?? ease
}

export function SpotlightReveal({
  text,
  className,
  color,
  blur = 20,
  staggerFrom = "start",
  transition = {
    duration: 0.4,
    delay: 0,
    ease: "easeOut",
    staggerChildren: 0.06,
  },
  highlight,
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const el = containerRef.current
    const chars = el.querySelectorAll<HTMLElement>(".char")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        gsap.killTweensOf(chars)
        gsap.set(chars, { clearProps: "transform,opacity,filter" })

        gsap.from(chars, {
          opacity: 0,
          scale: START_SCALE,
          filter: `blur(${blur}px)`,
          duration: transition.duration ?? 0.4,
          delay: transition.delay ?? 0,
          stagger: {
            each: transition.staggerChildren ?? 0.06,
            from: staggerFrom,
          },
          ease: mapEase(transition.ease),
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text, blur, staggerFrom, transition])

  const highlightStart = highlight ? text.indexOf(highlight) : -1
  const highlightEnd = highlightStart >= 0 ? highlightStart + (highlight as string).length : -1

  // `background-clip: text` only clips the background of the element it's set on — it
  // won't paint through to child `.char` spans. If the caller wants the whole heading
  // gradient-filled, move that class down onto every char instead of the parent h2.
  const isFullGradient = className?.includes("gradient-text-violet-teal") ?? false
  const containerClassName = isFullGradient
    ? className!.replace(/gradient-text-violet-teal\s*/g, "").trim()
    : className

  // Group characters by word so a line break can only happen between words,
  // never inside one (e.g. splitting "QDL" into "Q" / "DL").
  const words = text.split(" ")
  let charIndex = 0

  return (
    <h2
      ref={containerRef}
      aria-label={text}
      className={cn("flex flex-wrap", containerClassName)}
      style={color ? { color } : undefined}
    >
      {words.map((word, wordIdx) => {
        const wordSpans = word.split("").map((char) => {
          const index = charIndex++
          const isHighlighted = isFullGradient || (index >= highlightStart && index < highlightEnd)
          return (
            <span
              key={index}
              className={cn("char", isHighlighted && "gradient-text-violet-teal")}
              aria-hidden="true"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          )
        })
        // Consume the space that followed this word (if any) in the running index.
        if (wordIdx < words.length - 1) charIndex++
        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {wordSpans}
            {wordIdx < words.length - 1 && (
              <span className="char inline-block w-[0.28em]" aria-hidden="true" />
            )}
          </span>
        )
      })}
    </h2>
  )
}
