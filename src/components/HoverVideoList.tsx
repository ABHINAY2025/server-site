import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Numbered rows with a video that follows the pointer.
 *
 * Hovering a row floats a preview panel near the cursor and plays it muted.
 * The panel is shared rather than one per row: a single mounted video element
 * means one download and one decoder, and moving between rows resumes the same
 * playback instead of restarting a fresh one each time.
 *
 * Muted is not a styling choice. Browsers only permit autoplay without a
 * gesture when a video is muted, so an unmuted source would simply refuse to
 * start.
 */

export type VideoRow = {
  title: string
  body: string
}

const PANEL_W = 420
const PANEL_H = 236

export default function HoverVideoList({
  rows,
  src,
  poster,
}: {
  rows: VideoRow[]
  src: string
  poster?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const frame = useRef(0)

  /* Pointer devices only. On touch there is no hover, and a floating panel
     chasing a finger would sit under it. */
  useEffect(() => {
    setEnabled(
      window.matchMedia('(hover: hover)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  const move = useCallback((event: React.PointerEvent) => {
    const { clientX, clientY } = event
    /* Coalesced into a frame: pointermove fires far more often than the screen
       refreshes, and setting state on every one is wasted work. */
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      /* Kept inside the viewport, so a row near an edge does not push the
         panel off screen. */
      const x = Math.min(
        Math.max(clientX + 24, 12),
        window.innerWidth - PANEL_W - 12,
      )
      const y = Math.min(
        Math.max(clientY - PANEL_H / 2, 12),
        window.innerHeight - PANEL_H - 12,
      )
      setPos({ x, y })
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  /* Play while a row is hovered, pause when the pointer leaves. Autoplay can
     still be refused, and a rejected promise must not surface as an error. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active !== null) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [active])

  return (
    <>
      <ul className="border-t border-gray-200">
        {rows.map((row, i) => (
          <li
            key={row.title}
            onPointerEnter={enabled ? () => setActive(i) : undefined}
            onPointerLeave={enabled ? () => setActive(null) : undefined}
            onPointerMove={enabled ? move : undefined}
            className={`grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 border-b border-gray-200 py-7 transition-colors duration-300 sm:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-x-8 sm:py-9 ${
              active === i ? 'bg-white' : ''
            }`}
          >
            <span className="pt-1.5 text-[12px] font-medium tabular-nums text-gray-400">
              {String(i + 1).padStart(2, '0')}
            </span>

            <h3 className="text-[clamp(1.15rem,2.4vw,1.7rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900">
              {row.title}
            </h3>

            <p className="col-start-2 mt-2 text-[13.5px] leading-relaxed text-gray-600 sm:col-start-3 sm:mt-1.5 sm:text-[14px]">
              {row.body}
            </p>
          </li>
        ))}
      </ul>

      {/* One shared panel, fixed to the viewport and pinned to the pointer */}
      {enabled && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed z-50 overflow-hidden rounded-xl border border-black/10 bg-[#0b1c3d] shadow-[0_24px_60px_-18px_rgba(16,24,40,0.45)] transition-opacity duration-200 ${
            active === null ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${PANEL_W}px`,
            height: `${PANEL_H}px`,
          }}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </>
  )
}
