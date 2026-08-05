import { useEffect, useRef } from 'react'

/**
 * Custom pointer: the QDL arrow head, drawn as three rounded bars fanning from
 * the tip rather than as a conventional arrow outline.
 *
 * A CSS `cursor: url()` cannot do this. It caps out around 32px and takes a
 * static bitmap, so the arrow is an element that follows the pointer instead.
 *
 * Only runs where there is a real pointer. On touch there is nothing to follow,
 * and under reduced motion the eased follow would be unwelcome, so both cases
 * keep the native arrow.
 */

/** How tightly the arrow tracks the pointer. 1 would be no lag at all. */
const EASE = 0.38

export default function Cursor() {
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    const root = document.documentElement
    root.classList.add('cursor-custom')

    /* Start off-screen so nothing flashes in the corner before the first move */
    let targetX = -100
    let targetY = -100
    let x = -100
    let y = -100
    let raf = 0
    let visible = false

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!visible) {
        visible = true
        root.classList.add('cursor-visible')
      }
    }

    const onLeave = () => {
      visible = false
      root.classList.remove('cursor-visible')
    }

    /* Grow the arrow over anything clickable, so the pointer still signals
       affordance the way the native one did. */
    const onOver = (event: PointerEvent) => {
      const el = event.target as Element | null
      const interactive = el?.closest?.(
        'a, button, [role="button"], input, textarea, select, label, summary',
      )
      root.classList.toggle('cursor-active', Boolean(interactive))
    }

    const tick = () => {
      x += (targetX - x) * EASE
      y += (targetY - y) * EASE
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('cursor-custom', 'cursor-visible', 'cursor-active')
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={arrowRef} className="cursor-arrow">
        <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
          <defs>
            {/* Runs down the length of the head, so the bands read violet at
                the tip through magenta to orange at the tail. */}
            <linearGradient id="qdlCursor" x1="0.15" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#9450e0" />
              <stop offset="34%" stopColor="#7b1fb5" />
              <stop offset="62%" stopColor="#c9268f" />
              <stop offset="84%" stopColor="#fb5725" />
              <stop offset="100%" stopColor="#fdb022" />
            </linearGradient>
          </defs>

          {/* One solid arrow head. The stroke matches the fill purely to round
              the corners off, which is what gives it the chunky look. */}
          <path
            d="M7 5 L25.5 22.5 L16.2 23.4 L11.6 32.6 Z"
            fill="url(#qdlCursor)"
            stroke="url(#qdlCursor)"
            strokeWidth="4.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
