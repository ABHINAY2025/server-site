import * as React from "react"
import * as THREE from "three"

import { isLand } from "../lib/continents"

/**
 * Three.js globe: continents drawn as a dot lattice, payment corridors as
 * arcs between financial centres. An opaque inner sphere occludes the far
 * side so the rotation reads correctly.
 */

const RADIUS = 1
const LAT_STEP = 1.7
const LNG_STEP = 1.7

/**
 * Geographic coordinates to a point on the sphere.
 *
 * Longitude drives x through sine and z through cosine, not the other way
 * round. Swapping them mirrors the world east to west: the camera-facing
 * meridian lands at 90E and everything east of it draws to the left, so the
 * continents come out backwards. With this order 0 faces the camera and east
 * runs to the right, as a map does.
 */
function toVec3(lat: number, lng: number, r = RADIUS) {
  const phi = (lat * Math.PI) / 180
  const lambda = (lng * Math.PI) / 180
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.sin(lambda),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(lambda),
  )
}

/* US clearing centres and Federal Reserve districts, with the handful of
   overseas corridors a regional bank actually touches through correspondents. */
const HUBS: Record<string, [number, number]> = {
  newYork: [40.71, -74.01],
  chicago: [41.88, -87.63],
  dallas: [32.78, -96.8],
  atlanta: [33.75, -84.39],
  sanFrancisco: [37.77, -122.42],
  charlotte: [35.23, -80.84],
  minneapolis: [44.98, -93.27],
  kansasCity: [39.1, -94.58],
  boston: [42.36, -71.06],
  denver: [39.74, -104.99],
  philadelphia: [39.95, -75.17],
  richmond: [37.54, -77.44],
  stLouis: [38.63, -90.2],
  cleveland: [41.5, -81.69],
  seattle: [47.61, -122.33],
  london: [51.5, -0.13],
  toronto: [43.65, -79.38],
  frankfurt: [50.11, 8.68],
}

/** Corridors cycle the warm end of the logo: orange, magenta and amber.
    The band behind is violet/plum, so the blues are left out. */
const CORRIDOR_COLOURS = [0xff5f03, 0xfb5725, 0xfc9a1b, 0xff8c42]

const ROUTES: Array<[keyof typeof HUBS, keyof typeof HUBS]> = [
  ["newYork", "chicago"],
  ["chicago", "dallas"],
  ["newYork", "atlanta"],
  ["atlanta", "dallas"],
  ["sanFrancisco", "denver"],
  ["denver", "chicago"],
  ["charlotte", "newYork"],
  ["charlotte", "atlanta"],
  ["minneapolis", "chicago"],
  ["kansasCity", "dallas"],
  ["kansasCity", "minneapolis"],
  ["boston", "newYork"],
  ["philadelphia", "newYork"],
  ["richmond", "charlotte"],
  ["stLouis", "chicago"],
  ["cleveland", "philadelphia"],
  ["seattle", "sanFrancisco"],
  ["seattle", "minneapolis"],
  ["dallas", "denver"],
  ["stLouis", "kansasCity"],
  /* Correspondent corridors */
  ["newYork", "london"],
  ["newYork", "toronto"],
  ["chicago", "toronto"],
  ["newYork", "frankfurt"],
]

/** Great-circle arc lifted off the surface. */
function arcCurve(a: THREE.Vector3, b: THREE.Vector3, segments = 64) {
  const points: THREE.Vector3[] = []
  const angle = a.angleTo(b)
  // Long corridors still arc higher than short ones, but not so high they
  // sail outside the atmosphere shell.
  const lift = 0.1 + angle * 0.085

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const v = new THREE.Vector3().copy(a).lerp(b, t).normalize()
    v.multiplyScalar(RADIUS * (1 + lift * Math.sin(Math.PI * t)))
    points.push(v)
  }
  return points
}

export default function Globe({ className = "" }: { className?: string }) {
  const hostRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 4.1)

    const globe = new THREE.Group()
    /* Yaw before pitch, then roll. With the default XYZ order the pitch is
       applied before the spin, so dragging vertically swings the globe about a
       world axis and it reads as inverted once it has been spun. YXZ is the
       turntable order: spin first, tilt in view space, axial tilt last. */
    globe.rotation.order = "YXZ"
    globe.rotation.z = (-18 * Math.PI) / 180 // axial tilt
    scene.add(globe)

    // --- Occluder: hides dots and arcs on the far side ---
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 0.985, 64, 48),
      new THREE.MeshBasicMaterial({ color: 0xf0f0f0 }),
    )
    globe.add(shell)

    // --- Land dots ---
    const landPositions: number[] = []
    for (let lat = -84; lat <= 84; lat += LAT_STEP) {
      // keep spacing roughly even away from the poles
      const step = LNG_STEP / Math.max(Math.cos((lat * Math.PI) / 180), 0.22)
      for (let lng = -180; lng < 180; lng += step) {
        if (!isLand(lng, lat)) continue
        const v = toVec3(lat, lng, RADIUS * 1.002)
        landPositions.push(v.x, v.y, v.z)
      }
    }

    const landGeo = new THREE.BufferGeometry()
    landGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(landPositions, 3),
    )
    const landMat = new THREE.PointsMaterial({
      color: 0xff5f03,
      size: 0.017,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    })
    globe.add(new THREE.Points(landGeo, landMat))

    // --- Graticule: faint meridians and parallels, so rotation reads ---
    const gratMat = new THREE.LineBasicMaterial({
      color: 0xb9bcc2,
      transparent: true,
      opacity: 0.55,
    })
    const graticule = new THREE.Group()
    for (let lng = -180; lng < 180; lng += 30) {
      const pts: THREE.Vector3[] = []
      for (let lat = -88; lat <= 88; lat += 4) {
        pts.push(toVec3(lat, lng, RADIUS * 1.0005))
      }
      graticule.add(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gratMat),
      )
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = []
      for (let lng = -180; lng <= 180; lng += 4) {
        pts.push(toVec3(lat, lng, RADIUS * 1.0005))
      }
      graticule.add(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gratMat),
      )
    }
    globe.add(graticule)

    // --- Arcs + hub markers ---
    const pulses: Array<{
      meshes: THREE.Mesh[]
      pts: THREE.Vector3[]
      offset: number
      speed: number
    }> = []

    ROUTES.forEach(([from, to], i) => {
      const a = toVec3(...HUBS[from])
      const b = toVec3(...HUBS[to])
      const pts = arcCurve(a, b, 96)
      const colour = CORRIDOR_COLOURS[i % CORRIDOR_COLOURS.length]

      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({
        color: colour,
        transparent: true,
        opacity: 0.55,
      })
      globe.add(new THREE.Line(geo, mat))

      // Head plus two fading followers, a comet rather than a dot
      const meshes = [0, 1, 2].map((k) => {
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(0.018 - k * 0.005, 10, 10),
          new THREE.MeshBasicMaterial({
            color: k === 0 ? 0x2f3237 : colour,
            transparent: true,
            opacity: 1 - k * 0.32,
          }),
        )
        globe.add(m)
        return m
      })

      pulses.push({
        meshes,
        pts,
        offset: i / ROUTES.length,
        speed: 0.18 + (i % 4) * 0.035,
      })
    })

    // Hub markers, each inside a ring that breathes
    const rings: THREE.Mesh[] = []
    Object.values(HUBS).forEach(([lat, lng], i) => {
      const pos = toVec3(lat, lng, RADIUS * 1.012)

      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x2f3237 }),
      )
      marker.position.copy(pos)
      globe.add(marker)

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.028, 0.036, 24),
        new THREE.MeshBasicMaterial({
          color: 0x2f3237,
          transparent: true,
          opacity: 0.45,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      )
      ring.position.copy(pos)
      ring.lookAt(pos.clone().multiplyScalar(2)) // lie flat on the surface
      ring.userData.phase = i / Object.keys(HUBS).length
      globe.add(ring)
      rings.push(ring)
    })

    /* No atmosphere shell. The globe sits on the flat hero grey, so a coloured
       rim behind it only muddied the band it is meant to sit on. */

    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // --- Drag to spin and tilt ---
    let dragging = false
    let lastX = 0
    let lastY = 0
    /* Opens facing North America. A point sits front-of-camera when its
       longitude plus this rotation reaches 90 degrees, so roughly 95W needs
       185 degrees, or 3.23 radians. */
    /* Opens on North America. A longitude faces the camera when it plus this
       rotation reaches zero, so roughly 95W needs +95 degrees, 1.66 radians. */
    let spin = 1.66
    let velocity = 0.09 // radians per second, the idle drift

    /* Vertical drag. Clamped short of the poles: past about 70 degrees the
       globe reads as upside down and the corridors stop making sense. */
    let tilt = 0
    const TILT_LIMIT = 1.2

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      host.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return

      const dx = e.clientX - lastX
      lastX = e.clientX
      spin += dx * 0.005
      velocity = dx * 0.25 // carry the throw

      const dy = e.clientY - lastY
      lastY = e.clientY
      tilt = Math.min(TILT_LIMIT, Math.max(-TILT_LIMIT, tilt + dy * 0.005))
    }
    const onUp = (e: PointerEvent) => {
      dragging = false
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId)
    }

    host.addEventListener("pointerdown", onDown)
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerup", onUp)
    host.addEventListener("pointercancel", onUp)
    /* The globe now claims vertical drag too, so the page can no longer scroll
       from a gesture that starts on it. "none" rather than "pan-y" is what
       makes the tilt usable on a touchscreen. */
    host.style.touchAction = "none"
    host.style.cursor = "grab"

    let raf = 0
    let running = true
    const start = performance.now()
    let prev = start

    const tick = () => {
      const now = performance.now()
      const t = (now - start) / 1000
      const dt = Math.min((now - prev) / 1000, 0.05)
      prev = now

      if (!reduceMotion) {
        if (!dragging) {
          // Ease a thrown spin back down to the idle drift
          velocity += (0.09 - velocity) * Math.min(dt * 1.6, 1)
          spin += velocity * dt
        }
        globe.rotation.y = spin
        globe.rotation.x = tilt
      }

      // Run each comet along its arc
      for (let i = 0; i < pulses.length; i++) {
        const { meshes, pts, offset, speed } = pulses[i]
        for (let k = 0; k < meshes.length; k++) {
          const u = ((t * speed + offset - k * 0.012 + 1) % 1) * (pts.length - 1)
          const idx = Math.floor(u)
          meshes[k].position
            .copy(pts[idx])
            .lerp(pts[Math.min(idx + 1, pts.length - 1)], u - idx)
        }
      }

      // Hub rings breathe out of phase with one another
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i]
        const phase = (t * 0.5 + (ring.userData.phase as number)) % 1
        const s = 1 + phase * 1.5
        ring.scale.setScalar(s)
        ;(ring.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - phase)
      }

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(tick)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(host)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      host.removeEventListener("pointerdown", onDown)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerup", onUp)
      host.removeEventListener("pointercancel", onUp)
      scene.traverse((obj) => {
        const any = obj as THREE.Mesh
        if (any.geometry) any.geometry.dispose()
        const m = any.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose())
        else if (m) m.dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label="Rotating globe showing payment corridors between financial centres"
    />
  )
}
