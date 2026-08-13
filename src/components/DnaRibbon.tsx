import { useEffect, useRef } from 'react'

/**
 * A twisted ribbon, drawn as solid colour.
 *
 * The two edges of the ribbon are sine curves half a turn apart, so they cross
 * wherever the twist goes edge on. Between two crossings the edges bow away
 * from each other and enclose a petal, and every petal is filled rather than
 * outlined. That is what makes it read as a solid waving band instead of a
 * pair of wires.
 *
 * Each face is shaded by which way it is turned: the half of a turn facing the
 * viewer is brighter and more opaque than the half turned away, which is what
 * gives a flat fill the appearance of twisting through depth.
 *
 * Canvas rather than SVG, since a few hundred filled quads redrawn every frame
 * is far cheaper drawn than held as that many live DOM nodes.
 */

/** The palette colour travels through, looping back to the first. */
const STOPS = [
  [39, 120, 252], // azure
  [123, 31, 181], // violet
  [176, 22, 156], // magenta
  [251, 87, 37], // orange
  [252, 154, 27], // amber
]

/** Samples the looping palette at p, which wraps at 1. */
function sample(p: number) {
  const t = ((p % 1) + 1) % 1
  const scaled = t * STOPS.length
  const i = Math.floor(scaled)
  const f = scaled - i
  const a = STOPS[i % STOPS.length]
  const b = STOPS[(i + 1) % STOPS.length]
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
  ]
}

/** Layered bands, so the composition has depth rather than one lone ribbon. */
const BANDS = [
  { amp: 0.34, turns: 2.6, phase: 0, offset: -0.06, weight: 1, speed: 1 },
  { amp: 0.26, turns: 3.4, phase: 1.9, offset: 0.1, weight: 0.62, speed: 1.25 },
  { amp: 0.19, turns: 4.3, phase: 3.6, offset: 0.02, weight: 0.4, speed: 0.82 },
]

const SEGMENTS = 150

export default function DnaRibbon({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0

    const resize = () => {
      /* Capped at 2: past that the extra fidelity is invisible on a
         soft-edged graphic while fill cost rises with its square. */
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    /* Held still while off screen, so an unseen canvas is not repainting. */
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(host)

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      if (!width || !height) return

      const t = reduced ? 0 : time
      const drift = t * 0.00006

      ctx.save()
      ctx.translate(width * 0.5, height * 0.36)
      ctx.rotate(-0.4)
      /* Normal compositing, deliberately. Additive blending would be right on
         a dark page, but this one sits on near-white: adding to it only drives
         the fill toward white and the colour disappears. */
      ctx.globalCompositeOperation = 'source-over'

      const span = Math.hypot(width, height) * 1.2
      const half = span / 2
      const base = Math.min(height, 700)

      for (const band of BANDS) {
        const amp = base * band.amp
        const phase = band.phase + t * 0.00025 * band.speed
        const yShift = base * band.offset

        for (let i = 0; i < SEGMENTS; i++) {
          const u = i / SEGMENTS
          const uNext = (i + 1) / SEGMENTS
          const x = -half + u * span
          const xNext = -half + uNext * span

          const angle = u * Math.PI * 2 * band.turns + phase
          const angleNext = uNext * Math.PI * 2 * band.turns + phase

          /* Two edges half a turn apart. They meet wherever sine crosses zero,
             which is what pinches the fill into petals. */
          const edgeA = Math.sin(angle) * amp + yShift
          const edgeANext = Math.sin(angleNext) * amp + yShift
          const edgeB = -Math.sin(angle) * amp + yShift
          const edgeBNext = -Math.sin(angleNext) * amp + yShift

          /* Which way this part of the twist is facing, 0 to 1. */
          const facing = (Math.cos(angle) + 1) / 2
          const [r, g, b] = sample(u * 0.8 + drift + band.phase * 0.05)

          /* The face turned away is dimmer, so the band reads as twisting.
             Weighted for a light page: a fill this size needs real opacity to
             register as colour rather than as a haze. */
          const alpha = (0.16 + facing * 0.5) * band.weight

          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`
          ctx.beginPath()
          ctx.moveTo(x, edgeA)
          ctx.lineTo(xNext, edgeANext)
          ctx.lineTo(xNext, edgeBNext)
          ctx.lineTo(x, edgeB)
          ctx.closePath()
          ctx.fill()
        }
      }

      ctx.restore()
    }

    let raf = 0
    const loop = (time: number) => {
      if (visible) draw(time)
      raf = requestAnimationFrame(loop)
    }

    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
