import { useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import ParticleField from '../effects/ParticleField'
import useInView from '../../hooks/useInView'
import { useI18n } from '../../useI18n'
import { HERO, MODES, SOCIALS } from '../../data/content'

const ORBITS = [
  {
    size: '115%',
    dur: '16s',
    dir: 'normal',
    dots: [
      { pos: 'top', size: '7px', color: 'var(--p-primary)', opacity: 0.9, glow: '10px' },
      { pos: 'right', size: '5px', color: 'var(--p-primary)', opacity: 0.7, glow: '8px' },
      { pos: 'bottom', size: '9px', color: 'var(--p-primary-alt)', opacity: 0.8, glow: '12px' },
      { pos: 'left', size: '5px', color: 'var(--p-primary-alt)', opacity: 0.7, glow: '8px' },
    ],
  },
  {
    size: '135%',
    dur: '11s',
    dir: 'reverse',
    dots: [
      { pos: 'top', size: '5px', color: 'var(--c-title)', opacity: 0.85, glow: '8px' },
      { pos: 'right', size: '7px', color: 'var(--p-primary)', opacity: 0.6, glow: '10px' },
      { pos: 'left', size: '6px', color: 'var(--p-primary)', opacity: 0.6, glow: '9px' },
    ],
  },
  {
    size: '155%',
    dur: '22s',
    dir: 'normal',
    dots: [
      { pos: 'top', size: '6px', color: 'var(--p-primary-alt)', opacity: 0.5, glow: '10px' },
      { pos: 'bottom', size: '6px', color: 'var(--p-primary)', opacity: 0.5, glow: '10px' },
    ],
  },
]

function BlobOrbit() {
  return (
    <>
      {ORBITS.map((ring, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="blob-orbit"
          style={{ '--size': ring.size, '--dur': ring.dur, '--dir': ring.dir }}
        >
          {ring.dots.map((dot, j) => (
            <span
              key={j}
              className={`blob-orbit-dot blob-orbit-dot--${dot.pos}`}
              style={{
                '--dot-size': dot.size,
                '--dot-color': dot.color,
                '--dot-opacity': dot.opacity,
                '--dot-glow': dot.glow,
              }}
            />
          ))}
        </div>
      ))}
    </>
  )
}

function BlobPhoto() {
  return (
    <div className="relative mx-auto w-56 sm:w-72 lg:w-80">
      <div className="animate-float relative">
        <BlobOrbit />
        <svg
          viewBox="0 0 200 187"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="h-auto w-full"
          role="img"
          aria-label="Foto profil"
        >
          <mask id="blob-mask" mask-type="alpha">
            <path
              d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547
              130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775
              97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666
              0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
            />
          </mask>
          <g mask="url(#blob-mask)">
            <path
              d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346
              165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403
              129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028
              -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
              fill="url(#blob-gradient)"
            />
            <image
              href={HERO.photo}
              x="5"
              y="10"
              width="190"
              height="190"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
          <defs>
            <linearGradient id="blob-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-alt)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default function Home({ mode }) {
  const modeData = MODES[mode]
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const visible = useInView(sectionRef)
  const primaryCta = modeData.cta?.primary || { label: { id: t('hero.viewWork'), en: t('hero.viewWork') }, href: '#portfolio' }
  const secondaryCta = modeData.cta?.secondary || { label: { id: t('hero.contact'), en: t('hero.contact') }, href: '#contact' }

  return (
    <section id="home" ref={sectionRef} className="section relative overflow-hidden pt-28 sm:pt-32">
      <ParticleField />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-2 pb-6 sm:px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="order-2 grid grid-cols-[auto_1fr] items-center gap-4 lg:order-1">
            <Reveal direction="left">
              <div className="flex flex-col gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="text-xl text-muted transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-primary"
                  >
                    <Icon name={social.icon} size={24} />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className="text-center lg:text-left">
              {visible ? (
                <TypeAnimation
                  sequence={[
                    t('hero.greeting1'),
                    2200,
                    t('hero.greeting2'),
                    1800,
                    t('hero.greeting3'),
                    1800,
                  ]}
                  wrapper="h1"
                  speed={55}
                  deletionSpeed={35}
                  repeat={Infinity}
                  className="font-display text-3xl font-bold text-title sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
                />
              ) : (
                <h1 className="font-display text-3xl font-bold text-title sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
                  {t('hero.greeting1')}
                </h1>
              )}
              <h3 className="mt-2 text-lg font-medium text-text sm:text-xl">
                {t(modeData.homeSubtitle)}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted lg:mx-0">
                {t('hero.description')}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href={primaryCta.href}
                  className="btn-fill inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t(primaryCta.label)} <Icon name="layout" size={18} />
                </a>
                <a
                  href={secondaryCta.href}
                  className="group btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t(secondaryCta.label)}{' '}
                  <Icon
                    name="mail"
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" className="order-1 lg:order-2">
            <BlobPhoto />
          </Reveal>
        </div>

        <div className="flex justify-center lg:justify-start">
          <a
            href="#about"
            className="group inline-flex flex-col items-center gap-1 text-muted transition-colors hover:text-primary sm:flex-row"
          >
            <Icon
              name="mouse"
              size={26}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="font-mono text-xs font-medium">{t('hero.scroll')}</span>
            <Icon
              name="arrowDown"
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
