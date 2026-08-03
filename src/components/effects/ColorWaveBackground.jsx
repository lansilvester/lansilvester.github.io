import { useEffect, useRef } from 'react'

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

function hexToRgb(hex) {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}

function rgbToHex(rgb) {
  return '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function mix(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t)
}

function getColors() {
  const cs = getComputedStyle(document.documentElement)
  const card = cs.getPropertyValue('--c-card').trim() || '#ffffff'
  const primary = cs.getPropertyValue('--p-primary').trim() || '#3b82f6'
  const base = hexToRgb(card)
  const accentRgb = hexToRgb(primary)
  const colors = [0, 0.08, 0.16, 0.26].map((t) => rgbToHex(mix(base, accentRgb, t)))
  return { colors, accent: primary }
}

export default function ColorWaveBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    let colorIndex = 0
    let { colors, accent } = getColors()
    let bgColor = colors[0]
    let initialTimer = 0
    const active = []

    const nextColor = () => {
      colorIndex = (colorIndex + 1) % colors.length
      return colors[colorIndex]
    }

    const rand = (min, max) => min + Math.random() * (max - min)

    const tween = (obj, target, duration, easing, onComplete) => {
      const initial = {}
      for (const key in target) initial[key] = obj[key]
      active.push({
        obj,
        initial,
        target,
        duration,
        easing,
        onComplete,
        start: performance.now(),
      })
    }

    const calcFillRadius = (x, y) => {
      const l = Math.max(x, width - x)
      const h = Math.max(y, height - y)
      return Math.hypot(l, h)
    }

    const drawCircle = (c) => {
      ctx.globalAlpha = c.opacity ?? 1
      ctx.beginPath()
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false)
      if (c.stroke) {
        ctx.strokeStyle = c.stroke.color
        ctx.lineWidth = c.stroke.width
        ctx.stroke()
      }
      if (c.fill) {
        ctx.fillStyle = c.fill
        ctx.fill()
      }
      ctx.closePath()
      ctx.globalAlpha = 1
    }

    const burst = (x, y) => {
      const next = nextColor()
      const targetR = calcFillRadius(x, y)
      const rippleSize = Math.min(200, width * 0.4)
      const minCoverDuration = 750

      const pageFill = { x, y, r: 0, fill: next }
      tween(pageFill, { r: targetR }, Math.max(targetR / 2, minCoverDuration), easeOutQuart, () => {
        bgColor = pageFill.fill
      })

      const ripple = { x, y, r: 0, fill: accent, opacity: 1, stroke: { width: 3, color: accent } }
      tween(ripple, { r: rippleSize, opacity: 0 }, 900, easeOutExpo)

      for (let i = 0; i < 32; i++) {
        const p = { x, y, fill: accent, r: rand(24, 48) }
        tween(
          p,
          {
            x: x + rand(-rippleSize, rippleSize),
            y: y + rand(-rippleSize * 1.15, rippleSize * 1.15),
            r: 0,
          },
          rand(1000, 1300),
          easeOutExpo
        )
      }
    }

    const draw = () => {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)

      const now = performance.now()
      for (let i = active.length - 1; i >= 0; i--) {
        const t = active[i]
        const p = Math.min((now - t.start) / t.duration, 1)
        const v = t.easing(p)
        for (const key in t.initial) {
          t.obj[key] = t.initial[key] + (t.target[key] - t.initial[key]) * v
        }
        if (p >= 1) {
          active.splice(i, 1)
          if (t.onComplete) t.onComplete()
        }
      }

      for (const t of active) drawCircle(t.obj)

      raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
    }

    const onDown = (e) => {
      const point = e.touches ? e.touches[0] : e
      const rect = canvas.getBoundingClientRect()
      burst(point.clientX - rect.left, point.clientY - rect.top)
      window.clearTimeout(initialTimer)
    }

    const startInitial = () => {
      initialTimer = window.setTimeout(() => {
        burst(width / 2, height / 2)
      }, 800)
    }

    const themeObserver = new MutationObserver(() => {
      const next = getColors()
      colors = next.colors
      accent = next.accent
      colorIndex = 0
      bgColor = colors[0]
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-mode'],
    })

    resize()
    window.addEventListener('resize', resize)
    canvas.parentElement.addEventListener('mousedown', onDown)
    canvas.parentElement.addEventListener('touchstart', onDown, { passive: true })

    if (reduced) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
    } else {
      raf = requestAnimationFrame(draw)
      startInitial()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(initialTimer)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      canvas.parentElement.removeEventListener('mousedown', onDown)
      canvas.parentElement.removeEventListener('touchstart', onDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
