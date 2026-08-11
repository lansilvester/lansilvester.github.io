import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { marked } from 'marked'
import site from '../../data/site.json'
import { getPost, formatPostDate } from '../../utils/blog'
import { useI18n } from '../../useI18n'
import Icon from '../ui/Icon'

marked.use({ gfm: true, breaks: false })

export default function BlogPost() {
  const { slug } = useParams()
  const { t, lang } = useI18n()
  const post = useMemo(() => (slug ? getPost(slug) : null), [slug])

  useEffect(() => {
    if (post) document.title = `${post.title} | ${site.title}`
  }, [post])

  const html = useMemo(() => (post ? marked.parse(post.content || '') : ''), [post])

  if (!post) return <Navigate to="/" replace />

  const date = formatPostDate(post.date, lang === 'id' ? 'id-ID' : 'en-US')

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28 sm:pb-28 sm:pt-32">
      <Link
        to="/"
        className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
      >
        <Icon
          name="arrowLeft"
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        {t('blog.backToBlog')}
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-lighter/40 px-3 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
          {date && <span className="text-xs text-muted">{date}</span>}
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-title sm:text-4xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 border-l-4 border-primary pl-4 text-base italic leading-relaxed text-muted">
            {post.excerpt}
          </p>
        )}
      </header>

      <hr className="my-8 border-line" />

      <article
        lang={post.lang === 'en' ? 'en' : 'id'}
        className="blog-post-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
