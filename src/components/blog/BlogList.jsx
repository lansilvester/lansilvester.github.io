import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { getAllPosts, formatPostDate } from '../../utils/blog'
import { fetchMediumPosts } from '../../utils/medium'
import site from '../../data/site.json'

function MediumCard({ post }) {
  const { t, lang } = useI18n()
  const date = formatPostDate(post.date, lang === 'id' ? 'id-ID' : 'en-US')

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-2 rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      {post.thumbnail ? (
        <img
          src={post.thumbnail}
          alt={post.title}
          loading="lazy"
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

function LocalCard({ post }) {
  const { t, lang } = useI18n()
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="flex flex-wrap items-center gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary-lighter/40 px-3 py-0.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
        <span className="text-xs text-muted">{formatPostDate(post.date, lang === 'id' ? 'id-ID' : 'en-US')}</span>
      </div>
      <h2 className="text-lg font-semibold text-title transition-colors group-hover:text-primary sm:text-xl">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
      )}
      <span className="mt-2 inline-flex items-center gap-2 self-start text-sm font-medium text-primary">
        {t('blog.readMore')}
        <Icon
          name="arrowRight"
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}

export default function BlogList() {
  const { t, lang } = useI18n()
  const localPosts = getAllPosts()
  const langPosts = localPosts.filter((p) => !p.lang || p.lang === lang)
  const fallback = langPosts.length ? langPosts : localPosts
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchMediumPosts(site.mediumUsername)
      .then((items) => {
        if (!cancelled) setPosts(items)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const visible = posts ?? (error ? fallback : [])

  return (
    <section className="section pb-24 pt-28 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-2 sm:px-4">
        <SectionTitle title={t('blog.sectionTitle')} subtitle={t('blog.sectionSubtitle')} />

        {posts === null && !error && (
          <p className="mt-12 text-center text-sm text-muted">{t('blog.loading')}</p>
        )}

        {posts !== null && visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted">{t('blog.empty')}</p>
        )}

        {error && fallback.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted">{t('blog.empty')}</p>
        )}

        {visible.length > 0 && (
          <div className="mt-12 grid gap-6">
            {visible.map((post) =>
              post.link ? <MediumCard key={post.link} post={post} /> : <LocalCard key={post.slug} post={post} />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
