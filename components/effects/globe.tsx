"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  Color,
  Mesh,
  Group,
  InstancedMesh,
  Matrix4,
  Raycaster,
  Vector2,
  TubeGeometry,
  CatmullRomCurve3,
  QuadraticBezierCurve3,
  Vector3,
  CanvasTexture,
} from "three"
import { geoEquirectangular, geoPath } from "d3-geo"

type Rgba = { r: number; g: number; b: number; a: number }

function parseColorToRgba(input: string): Rgba {
  if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 }
  const str = input.trim()
  const rgbaMatch = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i)
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255
    const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255
    const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255
    const a = rgbaMatch[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4]))) : 1
    return { r, g, b, a }
  }
  const hex = str.replace(/^#/, "")
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    }
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    }
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    }
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    }
  }
  return { r: 0, g: 0, b: 0, a: 1 }
}

function mapLinear(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax === inMin) return outMin
  const t = (value - inMin) / (inMax - inMin)
  return outMin + t * (outMax - outMin)
}

function mapSpeedUiToInternal(ui: number): number {
  if (ui === 0) return 0
  const clamped = Math.max(0, Math.min(10, ui))
  return mapLinear(clamped, 0, 10, 0, 0.9)
}
function mapDensityUiToSpacing(ui: number): number {
  const clamped = Math.max(1, Math.min(10, ui))
  return mapLinear(clamped, 1, 10, 24, 8)
}
function mapScaleUiToMultiplier(ui: number): number {
  const clamped = Math.max(1, Math.min(20, ui))
  return mapLinear(clamped, 1, 20, 0.2, 2)
}
function mapDotSizeUiToMultiplier(ui: number): number {
  const clamped = Math.max(1, Math.min(10, ui))
  return mapLinear(clamped, 1, 10, 0.1, 0.5)
}
function mapMarkerDotSizeUiToMultiplier(ui: number): number {
  const clamped = Math.max(0, Math.min(100, ui))
  return mapLinear(clamped, 0, 100, 0.1, 2.5)
}
function normalizeSmoothing(ui: number): number {
  return Math.max(0, Math.min(1, ui / 10))
}
function mapDragSpeedUiToSensitivity(ui: number): number {
  return mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0.001, 0.02)
}
function mapDetailToStepSize(ui: number): number {
  const clamped = Math.max(1, Math.min(10, ui))
  return mapLinear(clamped, 1, 10, 10, 1)
}

function simplifyRing(ring: number[][], detail: number): number[][] {
  if (ring.length < 2) return ring
  if (detail >= 10) return ring
  const stepSize = Math.max(1, Math.floor(mapDetailToStepSize(detail)))
  const simplified: number[][] = []
  simplified.push(ring[0])
  for (let i = stepSize; i < ring.length - 1; i += stepSize) {
    const idx = Math.min(i, ring.length - 1)
    simplified.push(ring[idx])
  }
  const lastPoint = ring[ring.length - 1]
  const firstPoint = ring[0]
  const isClosed = Math.abs(lastPoint[0] - firstPoint[0]) < 1e-4 && Math.abs(lastPoint[1] - firstPoint[1]) < 1e-4
  if (!isClosed) {
    simplified.push(lastPoint)
  }
  return simplified.length >= 2 ? simplified : ring
}

function latLngToPosition(lat: number, lng: number): { x: number; y: number; z: number } {
  const latRad = lat * (Math.PI / 180)
  const lngRad = lng * (Math.PI / 180)
  const x = Math.cos(latRad) * Math.sin(lngRad)
  const y = Math.sin(latRad)
  const z = Math.cos(latRad) * Math.cos(lngRad)
  return { x, y, z }
}

interface Marker {
  lat: number
  lng: number
}
interface MarkerConfig {
  markers: Marker[]
  color: string
  size: number
}
interface DotsConfig {
  color: string
  size: number
  density: number
  allDots: boolean
}
interface ArcConfig {
  from: [number, number] // [lat, lng]
  to: [number, number] // [lat, lng]
  color: string
}
interface GlobeProps {
  speed?: number
  smoothing?: number
  dots?: DotsConfig
  fill?: "dots" | "solid"
  fillColor?: string
  scale?: number
  stopOnHover?: boolean
  markerConfig?: MarkerConfig
  arcs?: ArcConfig[]
  direction?: "left" | "right"
  initialLatitude?: number
  initialLongitude?: number
  oceanColor?: string
  outlineColor?: string
  showOutline?: boolean
  graticuleColor?: string
  showGrid?: boolean
  outlineWidth?: number
  dragSpeed?: number
  detail?: number
  style?: CSSProperties
}

export function Globe({
  speed = 2,
  smoothing = 8,
  dots = { color: "#8B5CF6", size: 4, density: 7, allDots: false },
  fill = "dots",
  fillColor = "#8B5CF6",
  scale = 8,
  stopOnHover = true,
  markerConfig = { markers: [], color: "#14B8A6", size: 40 },
  arcs = [],
  direction = "left",
  initialLatitude = 23,
  initialLongitude = -23,
  oceanColor = "rgba(0,0,0,0)",
  outlineColor = "rgba(139,92,246,0.35)",
  showOutline = true,
  graticuleColor = "rgba(139,92,246,0.08)",
  showGrid = true,
  outlineWidth = 1,
  dragSpeed = 5,
  detail = 5,
  style,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dotColor = dots.color
  const dotSize = dots.size
  const density = dots.density
  const allDots = dots.allDots
  const gridWidth = 1
  const smoothingN = normalizeSmoothing(smoothing)

  const baseRotationSpeed = mapSpeedUiToInternal(speed)
  const rotationSpeed = direction === "left" ? -baseRotationSpeed : baseRotationSpeed
  const dotSpacing = mapDensityUiToSpacing(density)
  const dotSizeMultiplier = mapDotSizeUiToMultiplier(dotSize)
  const markerRadiusMultiplier = mapMarkerDotSizeUiToMultiplier(markerConfig.size)
  const scaleMultiplier = mapScaleUiToMultiplier(scale)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const containerWidth = container.clientWidth || container.offsetWidth || 800
    const containerHeight = container.clientHeight || container.offsetHeight || 600

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, containerWidth / containerHeight, 0.1, 1e3)
    const baseRadius = 1
    const globeRadius = baseRadius * scaleMultiplier
    const cameraDistance = 2.5 / scaleMultiplier
    camera.position.set(0, 0, cameraDistance)
    camera.lookAt(0, 0, 0)

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerWidth, containerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = "srgb"
    const canvas = renderer.domElement
    canvas.style.position = "absolute"
    canvas.style.inset = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"
    canvas.style.opacity = "0"
    canvas.style.visibility = "hidden"
    container.appendChild(canvas)

    const resolvedOceanColor = oceanColor
    const resolvedOutlineColor = outlineColor
    const resolvedDotColor = dotColor
    const resolvedMarkerColor = markerConfig.color
    const resolvedGraticuleColor = graticuleColor
    const resolvedFillColor = fillColor
    const oceanRgba = parseColorToRgba(resolvedOceanColor)
    const outlineRgba = parseColorToRgba(resolvedOutlineColor)
    const dotRgba = parseColorToRgba(resolvedDotColor)
    const markerRgba = parseColorToRgba(resolvedMarkerColor)
    const graticuleRgba = parseColorToRgba(resolvedGraticuleColor)
    const fillRgba = parseColorToRgba(resolvedFillColor)
    void markerRgba

    const oceanGeometry = new SphereGeometry(globeRadius, 64, 64)
    const oceanColorObj = resolvedOceanColor ? new Color(resolvedOceanColor) : new Color(0, 0, 0)
    const oceanMaterial = new MeshBasicMaterial({
      color: oceanColorObj,
      transparent: oceanRgba.a < 1 || oceanRgba.a === 0,
      opacity: oceanRgba.a,
    })
    const oceanMesh = new Mesh(oceanGeometry, oceanMaterial)
    scene.add(oceanMesh)

    let globeOutlineMesh: Mesh | null = null
    if (showOutline && outlineColor && outlineRgba.a > 0) {
      const outlinePositions: number[] = []
      const segments = 128
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const x = Math.cos(angle) * globeRadius
        const y = Math.sin(angle) * globeRadius
        const z = 0
        outlinePositions.push(x, y, z)
      }
      const outlinePoints: Vector3[] = []
      for (let i = 0; i < outlinePositions.length; i += 3) {
        outlinePoints.push(new Vector3(outlinePositions[i], outlinePositions[i + 1], outlinePositions[i + 2]))
      }
      if (outlinePoints.length >= 2) {
        outlinePoints.push(outlinePoints[0].clone())
        const outlineColorObj = new Color(resolvedOutlineColor)
        const outlineMaterial = new MeshBasicMaterial({
          color: outlineColorObj,
          transparent: outlineRgba.a < 1,
          opacity: outlineRgba.a,
        })
        const curve = new CatmullRomCurve3(outlinePoints)
        const radius = (outlineWidth / 10) * 0.01
        const tubeGeometry = new TubeGeometry(curve, outlinePoints.length * 2, radius, 8, false)
        globeOutlineMesh = new Mesh(tubeGeometry, outlineMaterial)
      }
    }
    void globeOutlineMesh

    const continentOutlineGroup = new Group()

    const graticuleGroup = new Group()
    if (showGrid && resolvedGraticuleColor && graticuleRgba.a > 0) {
      const graticuleColorObj = resolvedGraticuleColor ? new Color(resolvedGraticuleColor) : new Color(1, 1, 1)
      const graticuleMaterial = new MeshBasicMaterial({
        color: graticuleColorObj,
        transparent: graticuleRgba.a < 1 || graticuleRgba.a === 0,
        opacity: graticuleRgba.a,
      })
      const gridSpacing = 15
      for (let lat = -90; lat <= 90; lat += gridSpacing) {
        const positions: number[] = []
        const segments = 64
        for (let i = 0; i <= segments; i++) {
          const lng = (i / segments) * 360 - 180
          const pos = latLngToPosition(lat, lng)
          positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius)
        }
        if (positions && positions.length >= 6) {
          const points: Vector3[] = []
          for (let i = 0; i < positions.length; i += 3) {
            points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]))
          }
          if (points.length >= 2) {
            const curve = new CatmullRomCurve3(points)
            const radius = (gridWidth / 10) * 0.01
            const tubeGeometry = new TubeGeometry(curve, points.length * 2, radius, 8, false)
            const tubeMesh = new Mesh(tubeGeometry, graticuleMaterial)
            tubeMesh.renderOrder = 0
            graticuleGroup.add(tubeMesh)
          }
        }
      }
      for (let lng = -180; lng < 180; lng += gridSpacing) {
        const positions: number[] = []
        const segments = 64
        for (let i = 0; i <= segments; i++) {
          const lat = (i / segments) * 180 - 90
          const pos = latLngToPosition(lat, lng)
          positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius)
        }
        if (positions && positions.length >= 6) {
          const points: Vector3[] = []
          for (let i = 0; i < positions.length; i += 3) {
            points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]))
          }
          if (points.length >= 2) {
            const curve = new CatmullRomCurve3(points)
            const radius = (gridWidth / 10) * 0.01
            const tubeGeometry = new TubeGeometry(curve, points.length * 2, radius, 8, false)
            const tubeMesh = new Mesh(tubeGeometry, graticuleMaterial)
            tubeMesh.renderOrder = 0
            graticuleGroup.add(tubeMesh)
          }
        }
      }
    }

    let dotInstances: InstancedMesh | Mesh | null = null
    let markerMeshes: Mesh[] = []

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json"
        )
        if (!response.ok) throw new Error("Failed to load land data")
        const landFeatures = await response.json()

        while (continentOutlineGroup.children.length > 0) {
          continentOutlineGroup.remove(continentOutlineGroup.children[0])
        }
        if (showOutline && outlineColor && outlineRgba.a > 0) {
          const outlineColorObj = new Color(resolvedOutlineColor)
          const outlineMaterial = new MeshBasicMaterial({
            color: outlineColorObj,
            transparent: outlineRgba.a < 1,
            opacity: outlineRgba.a,
            depthTest: true,
            depthWrite: true,
          })
          const projection = geoEquirectangular()
          const pathGenerator = geoPath().projection(projection)
          landFeatures.features.forEach((feature: any) => {
            const featureType = feature.properties?.featurecla || feature.properties?.type || ""
            const featureName = feature.properties?.name || ""
            if (
              featureType.toLowerCase().includes("graticule") ||
              featureType.toLowerCase().includes("grid") ||
              featureType.toLowerCase().includes("line") ||
              featureName.toLowerCase().includes("graticule") ||
              featureName.toLowerCase().includes("grid") ||
              featureName.toLowerCase().includes("line")
            ) {
              return
            }
            const pathString = pathGenerator(feature)
            if (!pathString) return
            const commands = pathString.match(/[ML][^MLZ]*/g) || []
            if (commands.length === 0) return

            const geometry = feature.geometry
            if (!geometry || !geometry.coordinates) return

            const processRing = (ring: number[][]) => {
              if (ring.length < 2) return
              const simplifiedRing = simplifyRing(ring, detail)
              const positions: number[] = []
              simplifiedRing.forEach((coord) => {
                const [lng, lat] = coord
                const pos = latLngToPosition(lat, lng)
                positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius)
              })
              if (positions && positions.length >= 6) {
                const points: Vector3[] = []
                for (let i = 0; i < positions.length; i += 3) {
                  points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]))
                }
                if (points.length > 0 && points[0].distanceTo(points[points.length - 1]) > 0.001) {
                  points.push(points[0].clone())
                }
                if (points.length >= 2) {
                  const curve = new CatmullRomCurve3(points)
                  const radius = (outlineWidth / 10) * 0.01
                  const tubeGeometry = new TubeGeometry(curve, points.length * 2, radius, 8, false)
                  const tubeMesh = new Mesh(tubeGeometry, outlineMaterial)
                  tubeMesh.renderOrder = 0
                  continentOutlineGroup.add(tubeMesh)
                }
              }
            }
            if (geometry.type === "Polygon" && geometry.coordinates.length > 0) {
              processRing(geometry.coordinates[0])
            } else if (geometry.type === "MultiPolygon") {
              geometry.coordinates.forEach((polygon: any) => {
                if (polygon.length > 0) {
                  processRing(polygon[0])
                }
              })
            }
          })
        }

        const bitmapWidth = 2048
        const bitmapHeight = 1024
        const offscreenCanvas = document.createElement("canvas")
        offscreenCanvas.width = bitmapWidth
        offscreenCanvas.height = bitmapHeight
        const ctx = offscreenCanvas.getContext("2d", { willReadFrequently: true })
        if (!ctx) throw new Error("Canvas not supported")
        const projection = geoEquirectangular().fitSize([bitmapWidth, bitmapHeight], { type: "Sphere" } as any)
        const pathGenerator = geoPath().projection(projection).context(ctx as any)
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, bitmapWidth, bitmapHeight)
        ctx.fillStyle = "#fff"
        ctx.beginPath()
        landFeatures.features.forEach((feature: any) => {
          pathGenerator(feature)
        })
        ctx.fill()
        const imageData = ctx.getImageData(0, 0, bitmapWidth, bitmapHeight)
        const pixels = imageData.data
        const isOnLand = (lng: number, lat: number) => {
          const x = Math.round(((lng + 180) / 360) * bitmapWidth) % bitmapWidth
          const y = Math.round(((90 - lat) / 180) * bitmapHeight)
          const clampedY = Math.max(0, Math.min(bitmapHeight - 1, y))
          const idx = (clampedY * bitmapWidth + x) * 4
          return pixels[idx] > 128
        }

        if (fill === "solid") {
          const texW = 1024
          const texH = 512
          const fillCanvas = document.createElement("canvas")
          fillCanvas.width = texW
          fillCanvas.height = texH
          const fctx = fillCanvas.getContext("2d")!
          const img = fctx.createImageData(texW, texH)
          const data = img.data
          const fr = Math.round(fillRgba.r * 255)
          const fg = Math.round(fillRgba.g * 255)
          const fb = Math.round(fillRgba.b * 255)
          const fa = Math.round((fillRgba.a || 1) * 255)
          for (let ty = 0; ty < texH; ty++) {
            for (let tx = 0; tx < texW; tx++) {
              const u = tx / texW
              const v = ty / texH
              let lng = (u - 0.25) * 360
              lng = ((((lng + 180) % 360) + 360) % 360) - 180
              const lat = (v - 0.5) * 180
              const onLand = allDots || isOnLand(lng, lat)
              const idx = (ty * texW + tx) * 4
              if (onLand) {
                data[idx] = fr
                data[idx + 1] = fg
                data[idx + 2] = fb
                data[idx + 3] = fa
              } else {
                data[idx + 3] = 0
              }
            }
          }
          fctx.putImageData(img, 0, 0)
          const fillTexture = new CanvasTexture(fillCanvas)
          fillTexture.flipY = false
          fillTexture.needsUpdate = true
          const fillGeometry = new SphereGeometry(globeRadius * 1.002, 64, 64)
          const fillMaterial = new MeshBasicMaterial({ map: fillTexture, transparent: true })
          dotInstances = new Mesh(fillGeometry, fillMaterial)
          globeGroup.add(dotInstances)
        } else {
          const dotCoordinates: number[][] = []
          const baseStep = dotSpacing * 0.08
          const poleGuard = 85 // skip the polar caps entirely to avoid degenerate ring sampling
          for (let lat = -90; lat <= 90; lat += baseStep) {
            if (Math.abs(lat) > poleGuard) continue
            const latRad = (Math.abs(lat) * Math.PI) / 180
            const cosLat = Math.max(Math.cos(latRad), 0.05)
            // Use an integer division count per ring (rounded, minimum 6) instead of a
            // raw float step — a float step whose row-to-row rounding drifts is what
            // produced the spiral moiré near the poles.
            const ringPoints = Math.max(6, Math.round(360 / (baseStep / cosLat)))
            const lngStep = 360 / ringPoints
            for (let i = 0; i < ringPoints; i++) {
              const lng = -180 + i * lngStep
              if (allDots || isOnLand(lng, lat)) {
                dotCoordinates.push([lng, lat])
              }
            }
          }

          if (dotCoordinates.length > 0) {
            const dotGeometry = new SphereGeometry(0.01 * dotSizeMultiplier, 4, 4)
            const dotColorObj = resolvedDotColor ? new Color(resolvedDotColor) : new Color(0.6, 0.6, 0.6)
            const dotMaterial = new MeshBasicMaterial({
              color: dotColorObj,
              transparent: dotRgba.a < 1 || dotRgba.a === 0,
              opacity: dotRgba.a,
            })
            const instanced = new InstancedMesh(dotGeometry, dotMaterial, dotCoordinates.length)
            const matrix = new Matrix4()
            for (let i = 0; i < dotCoordinates.length; i++) {
              const [lng, lat] = dotCoordinates[i]
              const pos = latLngToPosition(lat, lng)
              matrix.makeScale(1, 1, 1)
              matrix.setPosition(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius)
              instanced.setMatrixAt(i, matrix)
            }
            instanced.instanceMatrix.needsUpdate = true
            dotInstances = instanced
            globeGroup.add(dotInstances)
          }
        }

        updateMarkers()
        buildArcs()
        renderer.render(scene, camera)
        canvas.style.opacity = "1"
        canvas.style.visibility = "visible"
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const updateMarkers = () => {
      markerMeshes.forEach((mesh) => globeGroup.remove(mesh))
      markerMeshes = []
      if (markerConfig.markers && markerConfig.markers.length > 0) {
        const markerSize = 0.01 * markerRadiusMultiplier
        const markerGeometry = new SphereGeometry(markerSize, 16, 16)
        const markerColorObj = resolvedMarkerColor ? new Color(resolvedMarkerColor) : new Color(1, 1, 1)
        const markerMaterial = new MeshBasicMaterial({ color: markerColorObj })
        markerConfig.markers.forEach((marker) => {
          if (!marker || typeof marker.lat !== "number" || typeof marker.lng !== "number") return
          const pos = latLngToPosition(marker.lat, marker.lng)
          const markerMesh = new Mesh(markerGeometry, markerMaterial.clone())
          markerMesh.position.set(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius)
          globeGroup.add(markerMesh)
          markerMeshes.push(markerMesh)
        })
      }
    }

    const arcGroup = new Group()
    const arcAnimations: {
      curve: QuadraticBezierCurve3
      lineMesh: Mesh
      pulseMesh: Mesh
      material: MeshBasicMaterial
      pulseMaterial: MeshBasicMaterial
      tubeRadius: number
      travelDuration: number
      restDuration: number
      offset: number
      lastSegments: number
    }[] = []

    const buildArcs = () => {
      while (arcGroup.children.length > 0) arcGroup.remove(arcGroup.children[0])
      arcAnimations.length = 0
      if (!arcs || arcs.length === 0) return

      arcs.forEach((arc, arcIndex) => {
        const [fromLat, fromLng] = arc.from
        const [toLat, toLng] = arc.to
        const fromPos = latLngToPosition(fromLat, fromLng)
        const toPos = latLngToPosition(toLat, toLng)
        const start = new Vector3(fromPos.x, fromPos.y, fromPos.z).multiplyScalar(globeRadius)
        const end = new Vector3(toPos.x, toPos.y, toPos.z).multiplyScalar(globeRadius)

        // Lift the midpoint outward from the sphere surface so the arc bows above the globe.
        // The lift scales with the chord distance so short hops (e.g. two nearby cities)
        // get a gentle bow instead of the same bulge as a trans-continental arc.
        const chordLength = start.distanceTo(end)
        const mid = start.clone().add(end).multiplyScalar(0.5)
        const liftAmount = Math.min(globeRadius * 0.6, chordLength * 0.5)
        mid.normalize().multiplyScalar(globeRadius + liftAmount)

        const curve = new QuadraticBezierCurve3(start, mid, end)
        const arcColor = new Color(arc.color)
        const tubeRadius = globeRadius * 0.004

        // Line mesh geometry is rebuilt each frame to only cover the drawn-in portion
        // of the curve (see the animation loop), so start with a minimal placeholder.
        const material = new MeshBasicMaterial({ color: arcColor, transparent: true, opacity: 0.85 })
        const placeholderCurve = new CatmullRomCurve3([start, start.clone().lerp(end, 0.01)])
        const lineGeometry = new TubeGeometry(placeholderCurve, 2, tubeRadius, 6, false)
        const lineMesh = new Mesh(lineGeometry, material)
        lineMesh.renderOrder = 1
        lineMesh.visible = false
        arcGroup.add(lineMesh)

        // Lead pulse dot at the tip of the drawn-in line
        const pulseGeometry = new SphereGeometry(tubeRadius * 3, 8, 8)
        const pulseMaterial = new MeshBasicMaterial({ color: arcColor, transparent: true, opacity: 1 })
        const pulseMesh = new Mesh(pulseGeometry, pulseMaterial)
        pulseMesh.renderOrder = 2
        pulseMesh.visible = false
        arcGroup.add(pulseMesh)

        arcAnimations.push({
          curve,
          lineMesh,
          pulseMesh,
          material,
          pulseMaterial,
          tubeRadius,
          travelDuration: 2,
          restDuration: 1,
          // Stagger each arc's cycle so they don't all draw in lockstep.
          offset: arcIndex * 1,
          lastSegments: -1,
        })
      })
    }

    const initialLongitudeRad = (initialLongitude * Math.PI) / 180
    const initialLatitudeRad = (initialLatitude * Math.PI) / 180
    const rotation = { x: initialLongitudeRad, y: initialLatitudeRad }
    const targetRotation = { x: initialLongitudeRad, y: initialLatitudeRad }
    const velocity = { x: 0, y: 0 }
    let isDragging = false
    let isHovering = false
    let lastMouseX = 0
    let lastMouseY = 0
    let animationFrameId: number | null = null
    const lerpFactor = smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03)
    const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96)

    const globeGroup = new Group()
    globeGroup.rotation.y = initialLongitudeRad
    globeGroup.rotation.x = initialLatitudeRad
    scene.add(globeGroup)
    globeGroup.add(oceanMesh)
    if (showGrid && graticuleColor && graticuleRgba.a > 0) {
      globeGroup.add(graticuleGroup)
    }
    globeGroup.add(continentOutlineGroup)
    globeGroup.add(arcGroup)
    markerMeshes.forEach((mesh) => globeGroup.add(mesh))

    const clock = { start: Date.now() }

    const animate = () => {
      let needsRender = false
      const threshold = 0.01

      if (arcAnimations.length > 0) {
        const elapsed = (Date.now() - clock.start) / 1000
        const maxTubeSegments = 48
        arcAnimations.forEach((anim) => {
          const { curve, lineMesh, pulseMesh, material, pulseMaterial, tubeRadius, travelDuration, restDuration, offset } = anim
          const cycleDuration = travelDuration + restDuration
          const cycleTime = ((elapsed + offset) % cycleDuration + cycleDuration) % cycleDuration

          if (cycleTime <= travelDuration) {
            // Drawing in: grow the visible line from the start point up to the
            // current progress, with a lead pulse dot at the growing tip.
            const t = Math.max(0.02, cycleTime / travelDuration)
            const segments = Math.max(2, Math.round(maxTubeSegments * t))

            if (segments !== anim.lastSegments) {
              const points = curve.getPoints(maxTubeSegments).slice(0, segments + 1)
              lineMesh.geometry.dispose()
              const drawnCurve = new CatmullRomCurve3(points.length >= 2 ? points : [points[0], points[0]])
              lineMesh.geometry = new TubeGeometry(drawnCurve, Math.max(2, segments), tubeRadius, 6, false)
              anim.lastSegments = segments
            }

            const tipPoint = curve.getPointAt(Math.min(1, t))
            pulseMesh.position.copy(tipPoint)

            lineMesh.visible = true
            pulseMesh.visible = true
            material.opacity = 0.85
            pulseMaterial.opacity = 1
          } else {
            // Resting: the fully-drawn line disappears until the next cycle.
            lineMesh.visible = false
            pulseMesh.visible = false
            anim.lastSegments = -1
          }
        })
        needsRender = true
      }

      if (!isDragging && rotationSpeed !== 0 && (!stopOnHover || !isHovering)) {
        targetRotation.x += rotationSpeed * 0.01
      }
      if (!isDragging && smoothingN > 0) {
        if (Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold) {
          targetRotation.x += velocity.x
          targetRotation.y += velocity.y
          targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y))
          velocity.x *= velocityDecay
          velocity.y *= velocityDecay
        } else {
          velocity.x = 0
          velocity.y = 0
        }
      }
      const dx = targetRotation.x - rotation.x
      const dy = targetRotation.y - rotation.y
      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold || rotationSpeed !== 0 || isDragging) {
        rotation.x += dx * lerpFactor
        rotation.y += dy * lerpFactor
        rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y))
        needsRender = true
      }
      if (needsRender || rotationSpeed !== 0 || isDragging) {
        globeGroup.rotation.y = rotation.x
        globeGroup.rotation.x = rotation.y
        renderer.render(scene, camera)
      }
      const hasVelocity = Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold
      const hasLerpDelta = Math.abs(dx) > threshold || Math.abs(dy) > threshold
      const needsContinue = isDragging || rotationSpeed !== 0 || hasVelocity || hasLerpDelta || arcAnimations.length > 0
      if (needsContinue) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        animationFrameId = null
      }
    }

    const startAnimation = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    if (rotationSpeed !== 0 || arcs.length > 0) {
      startAnimation()
    }

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true
      velocity.x = 0
      velocity.y = 0
      lastMouseX = event.clientX
      lastMouseY = event.clientY
      startAnimation()
      const handleMouseMoveDrag = (moveEvent: MouseEvent) => {
        const sensitivity = mapDragSpeedUiToSensitivity(dragSpeed)
        const dx = moveEvent.clientX - lastMouseX
        const dy = moveEvent.clientY - lastMouseY
        targetRotation.x += dx * sensitivity
        targetRotation.y += dy * sensitivity
        targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y))
        velocity.x = dx * sensitivity * 0.3
        velocity.y = dy * sensitivity * 0.3
        lastMouseX = moveEvent.clientX
        lastMouseY = moveEvent.clientY
      }
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMoveDrag)
        document.removeEventListener("mouseup", handleMouseUp)
        isDragging = false
      }
      document.addEventListener("mousemove", handleMouseMoveDrag)
      document.addEventListener("mouseup", handleMouseUp)
    }
    canvas.addEventListener("mousedown", handleMouseDown)

    const raycaster = new Raycaster()
    const mouse = new Vector2()
    const handleMouseMove = (event: MouseEvent) => {
      if (!stopOnHover) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(oceanMesh)
      isHovering = intersects.length > 0
    }
    canvas.addEventListener("mousemove", handleMouseMove)

    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth || container.offsetWidth || 800
      const newHeight = container.clientHeight || container.offsetHeight || 600
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
      const newCameraDistance = 2.5 / scaleMultiplier
      camera.position.set(0, 0, newCameraDistance)
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    })
    resizeObserver.observe(container)

    loadWorldData()

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      resizeObserver.disconnect()
      renderer.dispose()
      container.removeChild(canvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    speed,
    smoothing,
    dots,
    fill,
    fillColor,
    allDots,
    density,
    dotSize,
    dotColor,
    scale,
    stopOnHover,
    markerConfig,
    arcs,
    direction,
    initialLatitude,
    initialLongitude,
    oceanColor,
    outlineColor,
    showOutline,
    graticuleColor,
    showGrid,
    outlineWidth,
    dragSpeed,
    detail,
    rotationSpeed,
    dotSpacing,
    dotSizeMultiplier,
    markerRadiusMultiplier,
    scaleMultiplier,
  ])

  const containerStyle: CSSProperties = {
    ...style,
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            textAlign: "center",
            padding: "16px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 600 }}>Error loading Earth visualization</div>
          <div style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}>{error}</div>
        </div>
      </div>
    )
  }

  return <div ref={containerRef} style={containerStyle} />
}
