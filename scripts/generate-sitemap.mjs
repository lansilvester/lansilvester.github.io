// Menghasilkan public/sitemap.xml dari halaman utama + artikel blog.
// Menjalankan: node scripts/generate-sitemap.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const POSTS_DIR = join(ROOT, 'src/blog/posts')
const OUT = join(ROOT, 'public/sitemap.xml')
const BASE = 'https://lansilvester.github.io'

const today = new Date().toISOString().slice(0, 10)

function postDate(raw) {
  const match = raw.match(/^date:\s*["']?([\d-]+)/m)
  return match ? match[1] : today
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const slugs = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const slug = f.replace(/\.md$/, '')
    const raw = readFileSync(join(POSTS_DIR, f), 'utf8')
    return { slug, lastmod: postDate(raw) }
  })
  .sort((a, b) => b.lastmod.localeCompare(a.lastmod))

const urls = [
  { loc: `${BASE}/`, lastmod: today, changefreq: 'monthly', priority: '1.0' },
  ...slugs.map(({ slug, lastmod }) => ({
    loc: `${BASE}/blog/${slug}/`,
    lastmod,
    changefreq: 'monthly',
    priority: '0.8',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(OUT, xml, 'utf8')
console.log(`sitemap.xml ditulis: ${urls.length} URL (${OUT})`)
