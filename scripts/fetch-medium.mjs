import { readFileSync, writeFileSync } from 'node:fs'
import { parseMediumRss, mapMediumItem, mediumFeedUrl } from '../src/utils/medium.js'

const readJson = (rel) => JSON.parse(readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8'))
const site = readJson('src/data/site.json')
const OUT = new URL('../src/data/medium-posts.json', import.meta.url)

if (!site.mediumUsername) {
  console.warn('[medium] mediumUsername kosong di src/data/site.json — lewati fetch.')
  process.exit(0)
}

try {
  const res = await fetch(mediumFeedUrl(site.mediumUsername), {
    headers: {
      'User-Agent': 'portfolio-react-build (static blog fetcher)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const posts = parseMediumRss(await res.text())
  if (!posts.length) throw new Error('feed tidak mengembalikan artikel')
  const items = posts.map((p) => ({
    title: p.title,
    link: p.link,
    date: p.pubDate,
    thumbnail: mapMediumItem(p).thumbnail,
    tags: mapMediumItem(p).tags,
    excerpt: mapMediumItem(p).excerpt,
  }))
  writeFileSync(OUT, `${JSON.stringify(items, null, 2)}\n`)
  console.log(`[medium] ${items.length} artikel disimpan ke src/data/medium-posts.json`)
} catch (err) {
  console.warn(`[medium] Gagal memperbarui feed (${err.message}) — memakai data yang sudah ada.`)
}
