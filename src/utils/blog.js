import { parseFrontmatter } from './frontmatter'

// Muat semua file markdown artikel (di-bundle saat build — edit lewat
// Decap CMS akan ikut ter-rebuild saat deploy).
const modules = import.meta.glob('../blog/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function slugFromPath(file) {
  return file.replace(/^.*[\\/]/, '').replace(/\.md$/, '')
}

export function parsePost(file, raw) {
  const { data, content } = parseFrontmatter(raw)
  return { slug: slugFromPath(file), ...data, content }
}

export function getAllPosts() {
  return Object.entries(modules)
    .map(([file, raw]) => parsePost(file, raw))
    .filter((p) => p.title)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null
}

export function formatPostDate(date, locale = 'id-ID') {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}
