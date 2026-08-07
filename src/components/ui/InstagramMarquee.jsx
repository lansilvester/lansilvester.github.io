import { useEffect, useRef } from 'react'
import Icon from './Icon'
import { useI18n } from '../../useI18n'
import useInView from '../../hooks/useInView'

const SPEED = 0.6

const EDGE_MASK =
  'linear-gradient(to right, black 0%, black 22%, transparent 34%, transparent 66%, black 78%, black 100%)'
const CENTER_MASK =
  'linear-gradient(to right, transparent 0%, transparent 22%, black 34%, black 66%, transparent 78%, transparent 100%)'

function MarqueeRow({ items, direction }) {
  const { t } = useI18n()
  const sharpRef = useRef(null)
  const blurRef = useRef(null)
  const inView = useInView(sharpRef, '150px')
  const paused = useRef(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const suppressClick = useRef(false)
  const suppressTimer = useRef(null)
  const idleTimer = useRef(null)

  const sync = () => {
    const s = sharpRef.current
    const b = blurRef.current
    if (s && b) b.scrollLeft = s.scrollLeft
  }

  const resumeSoon = () => {
    window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => {
      if (!drag.current.active) paused.current = false
    }, 1600)
  }

  const trackRef = () => (sharpRef.current ? sharpRef.current.firstElementChild : null)

  const getHalf = () => (trackRef() ? trackRef().scrollWidth / 3 : 0)

  const getMax = () => {
    const el = sharpRef.current
    if (!el || !trackRef()) return 0
    return Math.max(trackRef().scrollWidth - el.clientWidth, 0)
  }

  useEffect(() => {
    const el = sharpRef.current
    if (el && direction === -1) {
      el.scrollLeft = getMax()
      sync()
    }
  }, [direction, items.length])

  useEffect(() => {
    let raf = 0
    const step = () => {
      const el = sharpRef.current
      if (el && !paused.current && inView) {
        const halfW = getHalf()
        el.scrollLeft += SPEED * direction
        if (direction === 1) {
          if (el.scrollLeft >= getMax()) el.scrollLeft -= halfW
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfW
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(idleTimer.current)
      window.clearTimeout(suppressTimer.current)
    }
  }, [direction, inView])

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') {
      paused.current = true
      resumeSoon()
      return
    }
    const el = sharpRef.current
    if (!el) return
    paused.current = true
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  const onPointerMove = (e) => {
    const d = drag.current
    const el = sharpRef.current
    if (!d.active || !el) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 6) {
      d.moved = true
      suppressClick.current = true
    }
    el.scrollLeft = d.startScroll - dx
  }

  const onPointerUp = () => {
    drag.current.active = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.clearTimeout(suppressTimer.current)
    suppressTimer.current = window.setTimeout(() => {
      suppressClick.current = false
    }, 350)
    resumeSoon()
  }

  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClick.current = false
    }
  }

  const tripled = [...items, ...items, ...items]

  const tile = (item, i, overlay) => (
    <a
      key={`${item.shortcode}-${i}`}
      href={item.permalink}
      target="_blank"
      rel="noreferrer"
      aria-label={item.caption || t('portfolio.openInstagram')}
      className="group relative block h-60 w-44 shrink-0 overflow-hidden bg-card sm:h-80 sm:w-64"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${
            overlay
              ? 'scale-[1.03] saturate-0 blur-[5px]'
              : 'transition-transform duration-500 group-hover:scale-105'
          }`}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-primary-lighter/30"
          aria-hidden="true"
        >
          <Icon name="camera" size={32} className="text-primary/50" />
        </div>
      )}

      {!overlay && (
        <>
          <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {t(`categories.${item.category || 'other'}`)}
          </span>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/65 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="line-clamp-3 text-sm font-medium leading-snug text-white">
              {item.caption}
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-alt">
              <Icon name="instagram" size={14} />
              {t('portfolio.openInstagram')}
            </span>
          </div>
        </>
      )}
    </a>
  )

  return (
    <div className="relative w-full">
      <div
        ref={blurRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        style={{
          WebkitMaskImage: EDGE_MASK,
          maskImage: EDGE_MASK,
        }}
      >
        <div className="flex w-max items-stretch gap-0.5">
          {tripled.map((item, i) => tile(item, i, true))}
        </div>
      </div>

      <div
        ref={sharpRef}
        onScroll={sync}
        onWheel={() => {
          paused.current = true
          resumeSoon()
        }}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        className="relative z-20 flex w-full cursor-grab overflow-x-auto scrollbar-hide active:cursor-grabbing"
        style={{
          WebkitMaskImage: CENTER_MASK,
          maskImage: CENTER_MASK,
        }}
      >
        <div className="flex w-max items-stretch gap-0.5">
          {tripled.map((item, i) => tile(item, i, false))}
        </div>
      </div>
    </div>
  )
}

export default function InstagramMarquee({ items }) {
  const half = Math.ceil(items.length / 2)
  const row1 = items.slice(0, half)
  const row2 = items.slice(half)

  return (
    <div className="relative mt-12 w-full">
      <div className="space-y-4">
        {row1.length > 0 && <MarqueeRow items={row1} direction={1} />}
        {row2.length > 0 && <MarqueeRow items={row2} direction={-1} />}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.72) 100%)',
          boxShadow: 'inset 0 0 130px 45px rgba(0, 0, 0, 0.8)',
        }}
      />
    </div>
  )
}
