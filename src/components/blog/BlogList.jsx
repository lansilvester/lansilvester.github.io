import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { getAllPosts, formatPostDate } from '../../utils/blog'

export default function BlogList() {
  const { t, lang } = useI18n()
  const posts = getAllPosts()
  const langPosts = posts.filter((p) => !p.lang || p.lang === lang)
  const visible = langPosts.length ? langPosts : posts

  return (
    <section className="section pb-24 pt-28 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle title={t('blog.sectionTitle')} subtitle={t('blog.sectionSubtitle')} />

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">{t('blog.empty')}</p>
        ) : (
          <div className="mt-12 grid gap-6">
            {visible.map((post) => (
              <Link
                key={post.slug}
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
