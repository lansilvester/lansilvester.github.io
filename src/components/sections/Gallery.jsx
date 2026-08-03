import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import playClickSound from '../../utils/playClickSound'
import { useI18n } from '../../useI18n'
import { MODES } from '../../data/content'

function embedUrl(item) {
  if (item.platform === 'youtube' || !item.platform) {
    return `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`
  }
  if (item.platform === 'vimeo') {
    return `https://player.vimeo.com/video/${item.videoId}?autoplay=1`
  }
  return item.platform
}

function thumbnailUrl(item) {
  if (item.thumbnail) return item.thumbnail
  if (item.platform === 'youtube' || !item.platform) {
    return `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`
  }
  return '/images/project.svg'
}

export default function Gallery({ mode }) {
  const videos = MODES.creative.videos || []
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    setActiveIndex(null)
  }, [mode])

  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        playClickSound()
        setActiveIndex(null)
      }
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1 + videos.length) % videos.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + videos.length) % videos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeIndex, videos.length])

  if (mode !== 'creative') return null

  const current = activeIndex !== null ? videos[activeIndex] : null

  return (
    <section id="gallery" className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={t('gallery.sectionTitle')} subtitle={t('gallery.sectionSubtitle')} />

        {videos.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">{t('gallery.empty')}</p>
        ) : (
          <Reveal direction="zoom" className="mt-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((item, index) => (
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
                    aria-label={`${t(item.title)} — ${t('gallery.watch')}`}
                  >
                    <img
                      src={thumbnailUrl(item)}
                      alt={t(item.title)}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-0">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-card transition-transform duration-300 group-hover:scale-110">
                        <Icon name="film" size={24} />
                      </span>
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
                      {t('gallery.watch')}
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
        )}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            playClickSound()
            setActiveIndex(null)
          }}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={embedUrl(current)}
                  title={t(current.title)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound()
                  setActiveIndex(null)
                }}
                aria-label={t('gallery.close')}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-90"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xl font-semibold text-title">{t(current.title)}</h4>
                <span className="text-xs text-muted">
                  {activeIndex + 1} / {videos.length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">{t(current.description)}</p>
            </div>

            {videos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setActiveIndex((i) => (i - 1 + videos.length) % videos.length)
                  }}
                  aria-label={t('portfolio.prev')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-90"
                >
                  <Icon name="arrowLeft" size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setActiveIndex((i) => (i + 1 + videos.length) % videos.length)
                  }}
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
