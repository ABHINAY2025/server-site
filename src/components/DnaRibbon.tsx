import { useEffect, useRef } from 'react'

/**
 * A double helix drawn to canvas, used as page decoration.
 *
 * Two strands run a quarter-turn apart with rungs between them, so it reads as
 * DNA rather than as a ribbon. Colour is sampled from the QDL palette by
 * position along the strand and the sample point drifts over time, so the
 * colours travel through the helix instead of sitting still.
 *
 * Canvas rather than SVG: a few hundred segments redrawn every frame is
 * cheaper as immediate-mode drawing than as that many live DOM nodes.
 */

/** The palette the colour travels through, looping back to the first. */
const STOPS = [
  [39, 120, 252], // azure
  [123, 31, 181], // violet
  [176, 22, 156], // magenta
  [251, 87, 37], // orange
  [252, 154, 27], // amber
]

/** Samples the looping palette at p, where p wraps at 1. */
function sample(p: number) {
  const t = ((p % 1) + 1) % 1
  const scaled = t * STOPS.length
  const i = Math.floor(scaled)
  const f = scaled - i
  const a = STOPS[i % STOPS.length]
  const b = STOPS[(i + 1) % STOPS.length]
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ]
}

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
      /* Cap the pixel ratio. Beyond 2 the extra fidelity is invisible on a
         soft-edged graphic and the fill cost rises with its square. */
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

    /* Held still while the section is off screen, so an unseen canvas is not
       repainting sixty times a second. */
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(host)

    const SEGMENTS = 240
    const TURNS = 3.1
    /* The helix runs diagonally, as the reference does. */
    const TILT = -0.42

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      if (!width || !height) return

      const phase = reduced ? 0 : time * 0.00022
      const colourDrift = reduced ? 0 : time * 0.00007

      ctx.save()
      ctx.translate(width * 0.52, height * 0.34)
      ctx.rotate(TILT)

      const span = Math.hypot(width, height) * 1.15
      const amp = Math.min(height, 620) * 0.3
      const half = span / 2

      /* Rungs first, so the strands read as passing in front of them. */
      ctx.lineCap = 'round'
      for (let i = 0; i <= SEGMENTS; i += 5) {
        const u = i / SEGMENTS
        const x = -half + u * span
        const angle = u * Math.PI * 2 * TURNS + phase
        const y1 = Math.sin(angle) * amp
        const y2 = Math.sin(angle + Math.PI) * amp
        /* Rungs fade as the strand turns edge on, which is what sells depth */
        const face = Math.abs(Math.cos(angle))
        const [r, g, b] = sample(u * 0.85 + colourDrift)

        ctx.strokeStyle = `rgba(${r},${g},${b},${0.1 + face * 0.16})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y1)
        ctx.lineTo(x, y2)
        ctx.stroke()
      }

      /* Then each strand, one segment at a time so colour can vary along it. */
      for (const offset of [0, Math.PI]) {
        for (let i = 0; i < SEGMENTS; i++) {
          const u = i / SEGMENTS
          const uNext = (i + 1) / SEGMENTS
          const x = -half + u * span
          const xNext = -half + uNext * span
          const angle = u * Math.PI * 2 * TURNS + phase + offset
          const angleNext = uNext * Math.PI * 2 * TURNS + phase + offset

          const y = Math.sin(angle) * amp
          const yNext = Math.sin(angleNext) * amp

          /* Depth: the near half of each turn is thicker and more opaque */
          const depth = (Math.cos(angle) + 1) / 2
          const [r, g, b] = sample(u * 0.85 + colourDrift)

          ctx.strokeStyle = `rgba(${r},${g},${b},${0.3 + depth * 0.6})`
          ctx.lineWidth = 3 + depth * 11
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(xNext, yNext)
          ctx.stroke()
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
