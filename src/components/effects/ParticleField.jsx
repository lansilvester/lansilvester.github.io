import { useEffect, useRef } from 'react'

const LINK_DIST = 120
const MOUSE_DIST = 150

function getColors() {
  const cs = getComputedStyle(document.documentElement)
  const val = (name, fallback) => cs.getPropertyValue(name).trim() || fallback
  return {
    line: val('--c-border', 'rgba(140, 140, 150, 0.25)'),
    particle: val('--c-text', 'rgba(140, 140, 150, 0.6)'),
    accent: val('--p-primary', '#3b82f6'),
  }
}

export default function ParticleField({
  className = '',
  density = 18000,
  interactive = true,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let width = 0
    let height = 0
    let particles = []
    let colors = getColors()
    const mouse = { x: -9999, y: -9999 }

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / density), 80)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.8,
      }))
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
      initParticles()
      drawFrame()
    }

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = colors.line
            ctx.globalAlpha = (1 - dist / LINK_DIST) * 0.6
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (interactive && mouse.x > -1000) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DIST) {
            ctx.strokeStyle = colors.accent
            ctx.globalAlpha = (1 - dist / MOUSE_DIST) * 0.55
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      for (const p of particles) {
        ctx.fillStyle = colors.particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      drawFrame()
      raf = requestAnimationFrame(loop)
    }

    const themeObserver = new MutationObserver(() => {
      colors = getColors()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-mode'],
    })

    resize()
    window.addEventListener('resize', resize)
    if (interactive) {
      canvas.parentElement.addEventListener('mousemove', onMouse)
      canvas.parentElement.addEventListener('mouseleave', onLeave)
    }

    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      if (interactive) {
        canvas.parentElement.removeEventListener('mousemove', onMouse)
        canvas.parentElement.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [density, interactive])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
