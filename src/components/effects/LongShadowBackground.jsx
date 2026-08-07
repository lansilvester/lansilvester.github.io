import { useEffect, useRef } from 'react'
import useInView from '../../hooks/useInView'
import { ADOBE_LOGOS, TECH_LOGOS } from '../../data/logos'
import { MODES } from '../../data/content'
import { findLogo } from '../../utils/skillLogo'

const LOGO_COUNT = 12
const SHADOW_LENGTH = 1200
const MIN_SIZE = 40
const MAX_SIZE = 96

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
  return {
    base: rgbToHex(base),
    light: rgbToHex(mix(base, hexToRgb(primary), 0.2)),
  }
}

function skillsLogos(mode) {
  const logos = mode === 'creative' ? ADOBE_LOGOS : TECH_LOGOS
  const set = new Map()
  for (const group of MODES[mode].skills) {
    for (const skill of group.skills) {
      const logo = findLogo(skill, logos)
      if (logo && !set.has(logo.name)) set.set(logo.name, logo)
    }
  }
  return [...set.values()]
}

export default function LongShadowBackground({ mode = 'developer', className = '' }) {
  const canvasRef = useRef(null)
  const visible = useInView(canvasRef, '100px')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    let colors = getColors()
    const light = { x: 160, y: 200 }
    const logos = skillsLogos(mode)
    const particles = []
    const makeParticle = () => {
      const logo = logos[Math.floor(Math.random() * logos.length)]
      return {
        logo,
        size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * Math.PI,
      }
    }

    const getCorners = (p) => {
      const half = p.size / 2
      const cos = Math.cos(p.r)
      const sin = Math.sin(p.r)
      return [
        [-half, -half],
        [half, -half],
        [half, half],
        [-half, half],
      ].map(([ox, oy]) => ({
        x: p.x + ox * cos - oy * sin,
        y: p.y + ox * sin + oy * cos,
      }))
    }

    const drawLight = () => {
      ctx.beginPath()
      ctx.arc(light.x, light.y, 1000, 0, Math.PI * 2)
      const g = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000)
      g.addColorStop(0, colors.light)
      g.addColorStop(1, colors.base)
      ctx.fillStyle = g
      ctx.fill()

      ctx.beginPath()
      ctx.arc(light.x, light.y, 20, 0, Math.PI * 2)
      const spot = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5)
      spot.addColorStop(0, '#fff')
      spot.addColorStop(1, colors.light)
      ctx.fillStyle = spot
      ctx.fill()
    }

    const drawShadow = (p) => {
      const corners = getCorners(p)
      const points = corners.map((corner) => {
        const angle = Math.atan2(light.y - corner.y, light.x - corner.x)
        return {
          endX: corner.x + SHADOW_LENGTH * Math.sin(-angle - Math.PI / 2),
          endY: corner.y + SHADOW_LENGTH * Math.cos(-angle - Math.PI / 2),
          startX: corner.x,
          startY: corner.y,
        }
      })

      for (let i = points.length - 1; i >= 0; i--) {
        const n = i === 3 ? 0 : i + 1
        ctx.beginPath()
        ctx.moveTo(points[i].startX, points[i].startY)
        ctx.lineTo(points[n].startX, points[n].startY)
        ctx.lineTo(points[n].endX, points[n].endY)
        ctx.lineTo(points[i].endX, points[i].endY)
        ctx.fillStyle = colors.base
        ctx.fill()
      }
    }

    const drawBadge = (p) => {
      const { logo, size } = p
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      const half = size / 2
      ctx.beginPath()
      ctx.rect(-half, -half, size, size)
      ctx.fillStyle = logo.bg
      ctx.fill()
      if (logo.d) {
        const path = new Path2D(logo.d)
        ctx.scale(size / 24, size / 24)
        ctx.translate(-12, -12)
        ctx.fillStyle = logo.color
        ctx.fill(path)
      } else if (logo.code) {
        ctx.fillStyle = logo.color
        ctx.font = `700 ${size * 0.4}px "JetBrains Mono", ui-monospace, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(logo.code, 0, size * 0.04)
      }
      ctx.restore()
    }

    const update = (p) => {
      p.r += 0.002
      p.x += 0.25
      p.y += 0.25
      if (p.y - p.size > height) p.y -= height + 100
      if (p.x - p.size > width) p.x -= width + 100
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)
      drawLight()
      for (const p of particles) update(p)
      for (const p of particles) drawShadow(p)
      for (const p of particles) drawBadge(p)
    }

    const loop = () => {
      drawFrame()
      raf = requestAnimationFrame(loop)
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
      if (light.x === 160 && light.y === 200) {
        light.x = width / 2
        light.y = window.innerHeight / 2
      }
      measureSection()
    }

    const measureSection = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      sectionTop = rect.top + window.scrollY
      sectionHeight = rect.height
    }

    let sectionTop = 0
    let sectionHeight = 0
    let lastOffset = -1

    const onScroll = () => {
      const offset = Math.min(Math.max(window.scrollY - sectionTop, 0), sectionHeight)
      if (offset === lastOffset) return
      lastOffset = offset
      canvas.style.transform =
        offset > 0 ? `translate3d(0, ${offset}px, 0)` : ''
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      light.x = e.clientX - rect.left
      light.y = e.clientY - rect.top
    }

    const themeObserver = new MutationObserver(() => {
      colors = getColors()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-mode'],
    })

    resize()
    while (particles.length < LOGO_COUNT) particles.push(makeParticle())

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    canvas.parentElement.addEventListener('mousemove', onMove)

    if (reduced || !visible) {
      drawFrame()
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      canvas.parentElement.removeEventListener('mousemove', onMove)
    }
  }, [mode, visible])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
