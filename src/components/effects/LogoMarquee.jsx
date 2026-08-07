
import { useMemo, useRef } from 'react'
import useInView from '../../hooks/useInView'
import { ADOBE_LOGOS, TECH_LOGOS } from '../../data/logos'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

function buildTrack(logos) {
  const seq = shuffle(logos)
  return [...seq, ...seq]
}

function AdobeBadge({ logo }) {
  return (
    <div
      title={logo.name}
      className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl shadow-card"
      style={{ backgroundColor: logo.bg }}
    >
      <span className="text-2xl font-bold leading-none" style={{ color: logo.color }}>
        {logo.code}
      </span>
    </div>
  )
}

function TechBadge({ logo }) {
  return (
    <div
      title={logo.name}
      className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl shadow-card"
      style={{ backgroundColor: logo.bg }}
    >
      {logo.d ? (
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill={logo.color} aria-hidden="true">
          <path d={logo.d} />
        </svg>
      ) : (
        <span className="text-2xl font-bold leading-none" style={{ color: logo.color }}>
          {logo.code}
        </span>
      )}
    </div>
  )
}

function MarqueeRow({ logos, Badge }) {
  return (
    <>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex w-max shrink-0 items-center gap-8 pr-8"
          aria-hidden={copy === 1}
        >
          {logos.map((logo) => (
            <Badge key={logo.name} logo={logo} />
          ))}
        </div>
      ))}
    </>
  )
}

export default function LogoMarquee({ mode }) {
  const isTech = mode === 'developer'
  const target = isTech ? TECH_LOGOS : ADOBE_LOGOS
  const Badge = isTech ? TechBadge : AdobeBadge
  const track = useMemo(() => buildTrack(target), [target])
  const ref = useRef(null)
  const visible = useInView(ref, '100px')

  return (
    <div
      ref={ref}
      className={`marquee relative w-full overflow-hidden${visible ? '' : ' marquee-paused'}`}
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    >
      <div key={mode} className="marquee-enter">
        <div className="marquee-edge">
          <div className="marquee-track flex w-max items-center py-4 blur-[5px] saturate-0">
            <MarqueeRow logos={track} Badge={Badge} />
          </div>
        </div>
        <div className="marquee-fade pointer-events-none absolute inset-0">
          <div className="marquee-track flex h-full w-max items-center">
            <MarqueeRow logos={track} Badge={Badge} />
          </div>
        </div>
      </div>
    </div>
  )
}
