import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFadeInView } from '../hooks/useFadeInView'

interface Props {
  onOpen: () => void
}

// ── Canvas ribbon animator ───────────────────────────────────────────────
function RibbonCanvas({ height = 180, inverted = false }: { height?: number; inverted?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Ribbon band — draws a thick curved stroke with gradient and glow
    const drawRibbon = (
      offsetY: number,
      amplitude: number,
      frequency: number,
      phase: number,
      width: number,
      alpha: number,
      colorStops: [number, string][]
    ) => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      ctx.save()
      if (inverted) {
        ctx.translate(W, H)
        ctx.scale(-1, -1)
      }

      // Build gradient along the path
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      colorStops.forEach(([stop, color]) => grad.addColorStop(stop, color))

      ctx.beginPath()
      ctx.moveTo(0, H * offsetY + Math.sin(phase) * amplitude)

      for (let x = 0; x <= W; x += 2) {
        const nx = x / W
        const y =
          H * offsetY +
          Math.sin(nx * Math.PI * frequency + phase) * amplitude +
          Math.sin(nx * Math.PI * frequency * 0.5 + phase * 1.3) * amplitude * 0.4
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = grad
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.globalAlpha = alpha

      // Glow pass
      ctx.shadowColor = '#ff1050'
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.shadowBlur = 0

      // Bright core pass
      ctx.lineWidth = width * 0.35
      ctx.globalAlpha = alpha * 0.7
      const brightGrad = ctx.createLinearGradient(0, 0, W, 0)
      brightGrad.addColorStop(0, 'rgba(255,180,180,0.9)')
      brightGrad.addColorStop(0.5, 'rgba(255,80,80,0.6)')
      brightGrad.addColorStop(1, 'rgba(200,0,40,0.9)')
      ctx.strokeStyle = brightGrad
      ctx.stroke()

      ctx.restore()
    }

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      t += 0.008

      // Band 1 — thick main ribbon
      drawRibbon(
        0.38, 55, 1.8, t,
        38, 0.95,
        [[0, '#ff0040'], [0.35, '#ff3060'], [0.65, '#cc0030'], [1, '#ff1050']]
      )

      // Band 2 — mid shadow ribbon
      drawRibbon(
        0.52, 42, 1.8, t + 0.4,
        22, 0.6,
        [[0, '#990020'], [0.5, '#cc0030'], [1, '#880018']]
      )

      // Band 3 — thin highlight
      drawRibbon(
        0.3, 38, 2.1, t * 1.2,
        10, 0.45,
        [[0, '#ff6080'], [0.5, '#ff2050'], [1, '#ff4060']]
      )

      // Ridges — vertical lines across the ribbon surface
      const ridgeCount = 18
      for (let i = 0; i < ridgeCount; i++) {
        const nx = i / ridgeCount
        const x = nx * W
        const phase = nx * Math.PI * 1.8 + t
        const cy =
          H * 0.38 +
          Math.sin(phase) * 55 +
          Math.sin(phase * 0.5) * 22

        ctx.save()
        if (inverted) {
          ctx.translate(W, H)
          ctx.scale(-1, -1)
        }
        ctx.beginPath()
        ctx.moveTo(x, cy - 22)
        ctx.lineTo(x + 4, cy + 22)
        ctx.strokeStyle = 'rgba(255,80,80,0.18)'
        ctx.lineWidth = 1.2
        ctx.globalAlpha = 0.5
        ctx.stroke()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [inverted])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height, display: 'block' }}
    />
  )
}

// ── Second canvas: circle + sweeping ribbon ──────────────────────────────
function RibbonCanvasBottom({ height = 200 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      t += 0.008

      // ── Sweeping ribbon across the right (full width now) ──
      const drawRibbon = (
        yOffset: number,
        amp: number,
        freq: number,
        phase: number,
        lw: number,
        alpha: number
      ) => {
        const startX = 0
        ctx.beginPath()
        ctx.moveTo(startX, H * yOffset + Math.sin(phase) * amp)
        for (let x = startX; x <= W + 10; x += 2) {
          const nx = (x - startX) / (W - startX)
          const y =
            H * yOffset +
            Math.sin(nx * Math.PI * freq + phase) * amp +
            Math.sin(nx * Math.PI * freq * 0.6 + phase * 1.2) * amp * 0.35
          ctx.lineTo(x, y)
        }
        const grad = ctx.createLinearGradient(startX, 0, W, 0)
        grad.addColorStop(0, '#ff0040')
        grad.addColorStop(0.5, '#cc0030')
        grad.addColorStop(1, '#ff2050')
        ctx.strokeStyle = grad
        ctx.lineWidth = lw
        ctx.globalAlpha = alpha
        ctx.lineCap = 'round'
        ctx.shadowColor = '#ff1050'
        ctx.shadowBlur = 14
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      drawRibbon(0.38, 38, 1.8, t, 32, 0.9)
      drawRibbon(0.5,  28, 1.8, t + 0.5, 18, 0.55)
      drawRibbon(0.28, 26, 2.2, t * 1.1, 9, 0.35)

      // Ridges on ribbon
      for (let i = 0; i < 14; i++) {
        const nx = i / 14
        const x = nx * W
        const phase = nx * Math.PI * 1.8 + t
        const cy2 = H * 0.38 + Math.sin(phase) * 38 + Math.sin(phase * 0.6) * 15
        ctx.beginPath()
        ctx.moveTo(x, cy2 - 18)
        ctx.lineTo(x + 3, cy2 + 18)
        ctx.strokeStyle = 'rgba(255,80,80,0.2)'
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.5
        ctx.stroke()
      }

      // Lower sweeping ribbon
      ctx.globalAlpha = 1
      const grad2 = ctx.createLinearGradient(0, 0, W, 0)
      grad2.addColorStop(0, '#880018')
      grad2.addColorStop(0.5, '#cc0030')
      grad2.addColorStop(1, '#660010')
      ctx.beginPath()
      ctx.moveTo(W * 0.1, H * 0.8)
      for (let x = W * 0.1; x <= W; x += 2) {
        const nx = (x - W * 0.1) / (W * 0.9)
        const y = H * 0.78 + Math.sin(nx * Math.PI * 2.5 + t * 0.9 + 1) * 20
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = grad2
      ctx.lineWidth = 18
      ctx.globalAlpha = 0.65
      ctx.lineCap = 'round'
      ctx.shadowColor = '#cc0030'
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height, display: 'block' }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────
export function RetrospectCard({ onOpen }: Props) {
  const ref = useFadeInView()

  return (
    <div
      ref={ref}
      className="mx-4 mb-8 rounded-3xl overflow-hidden relative"
      style={{ background: '#050505' }}
    >
      {/* Fita superior */}
      <RibbonCanvas height={140} />

      {/* Texto central */}
      <div className="flex flex-col items-center px-6 py-4 relative z-10">
        <h2 className="text-white font-black text-3xl text-center leading-tight mb-2">
          Sua Retrospectiva
        </h2>
        <p className="text-white/50 text-base text-center mb-6">
          Explore o seu tempo de casal
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="rounded-full px-10 py-3.5 text-base font-bold"
          style={{ background: '#7dd3fc', color: '#080808' }}
        >
          Vamos lá
        </motion.button>
      </div>

      {/* Fita inferior */}
      <RibbonCanvasBottom height={180} />
    </div>
  )
}
