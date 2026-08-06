const EXCERPT_LIMIT = 220

export function mediumFeedUrl(username) {
  const name = username.replace(/^@/, '')
  return `https://medium.com/feed/@${name}`
}

export function decodeHtml(value) {
  if (!value) return ''
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

export function stripHtml(value) {
  return decodeHtml(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractThumbnail(description) {
  const html = description || ''
  const match = html.match(/<img[^>]+src="([^"]+)"/i)
  if (!match) return ''
  const src = decodeHtml(match[1])
  if (!src || src.includes('medium.com/_/stat')) return ''
  return src
}

function unwrapCdata(value) {
  const match = String(value || '').match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/)
  return match ? match[1] : String(value || '')
}

function truncate(value, limit) {
  const text = (value || '').trim()
  if (text.length <= limit) return text
  return `${text.slice(0, limit).trimEnd()}…`
}

// Parsing sederhana RSS Medium (feed berisi <content:encoded>, tanpa <description>).
export function parseMediumRss(xml) {
  if (!xml) return []
  return [...String(xml).matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => match[1])
    .map((raw) => {
      const title = raw.match(/<title>([\s\S]*?)<\/title>/i)
      const link = raw.match(/<link>([\s\S]*?)<\/link>/i)
      const pubDate = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)
      const content =
        raw.match(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/i) ||
        raw.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)
      const categories = [...raw.matchAll(/<category>([\s\S]*?)<\/category>/gi)]
      return {
        title: stripHtml(unwrapCdata(title && title[1])),
        link: unwrapCdata(link && link[1]).trim(),
        pubDate: unwrapCdata(pubDate && pubDate[1]).trim(),
        categories: categories.map((c) => stripHtml(unwrapCdata(c[1]))).filter(Boolean),
        content: unwrapCdata(content && content[1]),
      }
    })
    .filter((p) => p.title)
}

export function mapMediumItem(item) {
  return {
    title: item.title || '',
    link: item.link || '',
    date: item.pubDate || item.date || '',
    thumbnail: extractThumbnail(item.description || item.content || ''),
    tags: Array.isArray(item.categories) ? item.categories.filter((c) => c && c !== 'medium') : [],
    excerpt: truncate(stripHtml(item.description || item.content || ''), EXCERPT_LIMIT),
  }
}

export function mapMediumResponse(data) {
  if (!data || !Array.isArray(data.items)) return []
  return data.items.map(mapMediumItem).filter((p) => p.title)
}
