import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * The product walkthrough, embedded in the page.
 *
 * Plays by itself, loops, and carries no chrome beyond a sound toggle. The
 * video is the content, so scrubbers and a play button would only sit on top of
 * it.
 *
 * It starts muted because browsers only permit autoplay without a gesture on a
 * muted video. The toggle is the gesture that earns sound, which is why
 * unmuting from it is allowed where an unmuted autoplay would have been
 * refused outright.
 */
export default function EmbeddedVideo({
  src,
  poster,
  className = '',
}: {
  src: string
  poster?: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)

  /* Only runs while on screen. A looping video decoding behind the fold costs
     battery for something nobody is watching. */
  useEffect(() => {
    const video = videoRef.current
    const host = containerRef.current
    if (!video || !host) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Autoplay can still be refused. The poster stands in. */
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )

    io.observe(host)
    return () => io.disconnect()
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
    /* Turning sound on is a gesture, so this is the moment playback is allowed
       to begin if autoplay was previously refused. */
    if (!next) void video.play().catch(() => {})
  }

  return (
    <div
      ref={containerRef}
      /* Set here rather than passed in: a data attribute handed to a component
         is not forwarded to the DOM on its own, so the reveal would silently
         never run. */
      data-reveal
      /* The container sets the ratio and the video fills it absolutely.
         Sizing both of them independently left sub-pixel gaps at the edges,
         and any background behind the video showed through as dark lines. No
         background colour here for the same reason. */
      className={`group relative aspect-video overflow-hidden rounded-2xl ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 block h-full w-full object-cover"
      />

      {/* Sound only. No border, no plate: a white glyph on a soft shadow so it
          stays legible over a light frame without drawing a box on the video. */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity duration-300 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))' }}
      >
        {muted ? (
          <VolumeX size={20} strokeWidth={2} />
        ) : (
          <Volume2 size={20} strokeWidth={2} />
        )}
      </button>
    </div>
  )
}
