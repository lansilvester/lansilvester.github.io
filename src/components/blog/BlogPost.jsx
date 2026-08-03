import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Icon from '../ui/Icon'
import { useI18n } from '../../useI18n'
import { getPost, formatPostDate } from '../../utils/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const { t, lang } = useI18n()
  const post = getPost(slug)

  useEffect(() => {
    if (post?.title) document.title = `${post.title} — ${t('blog.sectionTitle')}`
    return () => {
      document.title = 'Alan | Web Developer & Creative'
    }
  }, [post, t])

  if (!post) {
    return (
      <section className="section pb-24 pt-28 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-muted">404</p>
          <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <Icon name="arrowLeft" size={16} />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section pb-24 pt-28 sm:pb-28 sm:pt-32">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-alt"
        >
          <Icon name="arrowLeft" size={16} />
          {t('blog.backToBlog')}
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-lighter/40 px-3 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-title sm:text-3xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {t('blog.publishedOn')}{' '}
            {formatPostDate(post.date, lang === 'id' ? 'id-ID' : 'en-US')}
          </p>
          <div className="mt-6 h-px w-full bg-line" aria-hidden="true" />
        </header>

        <div className="blog-content mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </section>
  )
}
