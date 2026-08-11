import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import { useI18n } from '../../useI18n'
import { formatPostDate } from '../../utils/blog'
import mediumPosts from '../../data/medium-posts.json'

function MediumCard({ post }) {
  const { t, lang } = useI18n()
  const date = formatPostDate(post.date, lang === 'id' ? 'id-ID' : 'en-US')

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group flex w-72 shrink-0 snap-start flex-col gap-2 rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:w-80 lg:w-96"
    >
      {post.thumbnail ? (
        <img
          src={post.thumbnail}
          alt={post.title}
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          className="mb-1 h-40 w-full rounded-xl object-cover"
        />
      ) : (
        <div className="mb-1 flex h-40 w-full items-center justify-center rounded-xl bg-primary-lighter/30" aria-hidden="true">
          <Icon name="file" size={32} className="text-primary/50" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {post.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary-lighter/40 px-3 py-0.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
        {date && <span className="text-xs text-muted">{date}</span>}
      </div>
      <h2 className="text-lg font-semibold text-title transition-colors group-hover:text-primary sm:text-xl">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      )}
      <span className="mt-2 inline-flex items-center gap-2 self-start text-sm font-medium text-primary">
        {t('blog.readOnMedium')}
        <Icon
          name="external"
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  )
}

export default function BlogList() {
  const { t } = useI18n()
  const visible = mediumPosts && mediumPosts.length ? mediumPosts : []

  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const suppressClick = useRef(false)
  const suppressTimer = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
      window.clearTimeout(suppressTimer.current)
    }
  }, [visible.length])

  const scrollByCard = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('a')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = trackRef.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const d = drag.current
    const el = trackRef.current
    if (!d.active || !el) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 6) {
      d.moved = true
      suppressClick.current = true
    }
    el.scrollLeft = d.startScroll - dx
  }

  const onPointerUp = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current.active = false
    window.clearTimeout(suppressTimer.current)
    suppressTimer.current = window.setTimeout(() => {
      suppressClick.current = false
    }, 350)
  }

  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClick.current = false
    }
  }

  const arrowBtn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-muted shadow-card transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <section id="blog" className="section pb-24 pt-28 sm:pb-28 sm:pt-32">
      <div className="w-full px-2 sm:px-4">
        <div className="mb-12 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold text-title sm:text-3xl">{t('blog.sectionTitle')}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-2 text-sm text-muted">{t('blog.sectionSubtitle')}</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-6 inline-flex gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                aria-label={t('blog.prev')}
                className={arrowBtn}
              >
                <Icon name="arrowLeft" size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                aria-label={t('blog.next')}
                className={arrowBtn}
              >
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </Reveal>
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted">{t('blog.empty')}</p>
        )}

        {visible.length > 0 && (
          <div
            ref={trackRef}
            onClickCapture={onClickCapture}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="mt-4 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4 scrollbar-hide"
          >
            {visible.map((post) => (
              <MediumCard key={post.link} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
