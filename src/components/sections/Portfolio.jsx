import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import InstagramMarquee from '../ui/InstagramMarquee'
import playClickSound from '../../utils/playClickSound'
import { useI18n } from '../../useI18n'
import { MODES } from '../../data/content'
import instagramPosts from '../../data/instagram-posts.json'

export default function Portfolio({ mode }) {
  const modeData = MODES[mode]
  const { t } = useI18n()
  const igConfig = MODES.creative?.instagram
  const igItems = instagramPosts && instagramPosts.length ? instagramPosts : []
  const useInstagram = mode === 'creative' && igConfig?.username && igItems.length > 0

  const igCats = useInstagram
    ? [
        'all',
        ...(igConfig.categories || []),
        ...(igItems.some((p) => !p.category) ? ['other'] : []),
      ]
    : []
  const categories = useInstagram
    ? igCats
    : ['all', ...new Set(modeData.portfolio?.map((p) => p.category) || [])]

  const [activeCat, setActiveCat] = useState('all')
  const [activeIndex, setActiveIndex] = useState(null)

  const items = useInstagram
    ? activeCat === 'all'
      ? igItems
      : activeCat === 'other'
        ? igItems.filter((p) => !p.category)
        : igItems.filter((p) => p.category === activeCat)
    : activeCat === 'all'
      ? (modeData.portfolio || [])
      : (modeData.portfolio || []).filter((p) => p.category === activeCat)

  const current = activeIndex !== null ? items[activeIndex] : null

  useEffect(() => {
    setActiveIndex(null)
  }, [mode, activeCat])

  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    
    // Focus Trap setup
    const modal = document.getElementById('portfolio-modal')
    const focusable = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const firstFocusable = focusable && focusable[0]
    const lastFocusable = focusable && focusable[focusable.length - 1]

    if (firstFocusable) {
      firstFocusable.focus()
    }

    const onKey = (e) => {
      if (e.key === 'Escape') {
        playClickSound()
        setActiveIndex(null)
      }
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1 + items.length) % items.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + items.length) % items.length)

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable?.focus()
            e.preventDefault()
          }
        }
      }
    }
    
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeIndex, items.length])

  function go(step) {
    playClickSound()
    setActiveIndex((i) => (i + step + items.length) % items.length)
  }

  return (
    <section id="portfolio" className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle title={t('portfolio.sectionTitle')} subtitle={t(modeData.portfolioSubtitle)} />

        <Reveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playClickSound()
                  setActiveCat(cat)
                }}
                aria-pressed={activeCat === cat}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                  activeCat === cat
                    ? 'bg-primary text-white shadow-card'
                    : 'border border-line bg-card text-text hover:border-primary hover:text-primary'
                }`}
              >
                {cat === 'all' ? t('portfolio.all') : t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {items.length === 0 ? (
        <p className="mx-auto mt-12 max-w-6xl px-2 text-center text-sm text-muted sm:px-4">
          {t('portfolio.empty')}
        </p>
      ) : useInstagram ? (
        <InstagramMarquee items={items} />
      ) : (
        <div className="mx-auto mt-12 max-w-6xl px-2 sm:px-4">
          <Reveal direction="zoom">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound()
                      setActiveIndex(index)
                    }}
                    className="relative block w-full cursor-pointer overflow-hidden text-left"
                    aria-label={t(item.title)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {t(`categories.${item.category}`)}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-title">{t(item.title)}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                      {t(item.description)}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound()
                        setActiveIndex(index)
                      }}
                      className="group/btn mt-4 inline-flex items-center gap-2 self-start text-sm font-medium text-primary transition-colors hover:text-primary-alt"
                    >
                      {t('portfolio.demo')}
                      <Icon
                        name="arrowRight"
                        size={16}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      )}

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            playClickSound()
            setActiveIndex(null)
          }}
        >
          <div
            id="portfolio-modal"
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={current.image}
                alt={current.title}
                width={400}
                height={400}
                className="max-h-[45vh] w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {t(`categories.${current.category}`)}
              </span>
              <button
                type="button"
                onClick={() => {
                  playClickSound()
                  setActiveIndex(null)
                }}
                aria-label={t('portfolio.close')}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-90"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xl font-semibold text-title">{t(current.title)}</h4>
                <span className="text-xs text-muted">
                  {activeIndex + 1} / {items.length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">{t(current.description)}</p>

              {current.tech && current.tech.length > 0 && (
                <div className="mt-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    {t('portfolio.tools')}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {current.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-primary-lighter/40 px-3 py-1 text-xs font-medium text-title"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {current.demo && current.demo !== '#' && (
                  <a
                    href={current.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-alt hover:shadow-lg"
                  >
                    {t('portfolio.demo')}
                    <Icon name="external" size={16} />
                  </a>
                )}
                {current.github && current.github !== '#' && (
                  <a
                    href={current.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-body px-6 py-2.5 text-sm font-medium text-title transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
                  >
                    <Icon name="github" size={16} />
                    {t('portfolio.github')}
                  </a>
                )}
                {(current.demo === '#' || !current.demo) && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-body px-6 py-2.5 text-sm font-medium text-title transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
                  >
                    {t('portfolio.close')}
                  </button>
                )}
              </div>
            </div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t('portfolio.prev')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-90"
                >
                  <Icon name="arrowLeft" size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t('portfolio.next')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-90"
                >
                  <Icon name="arrowRight" size={22} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
