import { useRef } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { ABOUT } from '../../data/content'
import { useTheme } from '../../hooks/useTheme'

const REVEAL_MASK =
  'radial-gradient(circle 180px at var(--mx) var(--my), black 0%, rgba(0, 0, 0, 0.75) 55%, transparent 78%)'

export default function About({ mode }) {
  const { t } = useI18n()
  const { dark } = useTheme()
  const sectionRef = useRef(null)
  const photoSrc = mode === 'developer' ? ABOUT.photoDeveloper : ABOUT.photo

  const handleMouseMove = (e) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    const el = sectionRef.current
    if (!el) return
    el.style.setProperty('--mx', '-999px')
    el.style.setProperty('--my', '-999px')
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`section relative isolate overflow-hidden bg-about py-24 transition-colors duration-500 sm:py-28 ${
        dark ? 'about-invert' : ''
      }`}
      style={{ '--mx': '-999px', '--my': '-999px' }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center opacity-25 dark:opacity-100 dark:blur-[6px] dark:saturate-0 dark:brightness-[0.55]"
          style={{ backgroundImage: `url(${ABOUT.background})` }}
        />
        {dark && (
          <>
            <div
              className="absolute inset-0 bg-fixed bg-cover bg-center"
              style={{
                backgroundImage: `url(${ABOUT.background})`,
                WebkitMaskImage: REVEAL_MASK,
                maskImage: REVEAL_MASK,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle 260px at var(--mx) var(--my), rgba(255, 255, 255, 0.16), transparent 72%)',
              }}
            />
          </>
        )}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-white/70 dark:bg-transparent"
      />

      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.72) 100%)',
            boxShadow: 'inset 0 0 130px 45px rgba(0, 0, 0, 0.8)',
          }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle
          className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          subtitleClassName="font-semibold text-primary"
          title={t('about.sectionTitle')}
          subtitle={t('about.sectionSubtitle')}
        />

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          <Reveal direction="left">
            <div
              key={mode}
              className={`about-photo mx-auto h-64 w-64 sm:h-80 sm:w-80 ${
                mode === 'developer' ? 'about-photo-shift' : ''
              }`}
            >
              <img
                src={photoSrc}
                alt="Alan"
                width={320}
                height={320}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-full object-cover shadow-card"
              />
              <span className="about-highlight" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="text-center md:text-left">
              <p className="font-display text-lg font-medium leading-relaxed text-title sm:text-xl">
                {t('about.description')}
              </p>

              <div className="mt-8 flex justify-center gap-12 md:justify-start">
                {ABOUT.stats.map((stat) => {
                  const value = stat.since
                    ? `${new Date().getFullYear() - stat.since}+`
                    : stat.value
                  return (
                  <div key={stat.label.id}>
                    <span className="block font-display text-4xl font-bold text-primary sm:text-5xl">
                      {value}
                    </span>
                    <span className="mt-1 block text-sm font-semibold uppercase tracking-wide text-primary sm:text-base">
                      {t(stat.label)}
                    </span>
                  </div>
                  )
                })}
              </div>

              <div className="mt-9">
                <a
                  href={ABOUT.cv}
                  download="CV - Varland Lengkong.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-9 py-3.5 text-base font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t('about.downloadCV')}{' '}
                  <Icon
                    name="download"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
