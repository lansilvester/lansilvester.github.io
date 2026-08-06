const RSS_TO_JSON_URL = 'https://api.rss2json.com/v1/api.json'
const MEDIUM_STAT_IMAGE = 'medium.com/_/stat'

export function mediumFeedUrl(username) {
  return `https://medium.com/feed/${username.replace(/^@/, '')}`
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
  if (!src || src.includes(MEDIUM_STAT_IMAGE)) return ''
  return src
}

export function mapMediumItem(item) {
  return {
    title: item.title || '',
    link: item.link || '',
    date: item.pubDate || '',
    thumbnail: extractThumbnail(item.description || item.content || ''),
    tags: Array.isArray(item.categories) ? item.categories.filter((c) => c && c !== 'medium') : [],
    excerpt: stripHtml(item.description || ''),
  }
}

export function mapMediumResponse(data) {
  if (!data || !Array.isArray(data.items)) return []
  return data.items.map(mapMediumItem).filter((p) => p.title)
}

export async function fetchMediumPosts(username) {
  const endpoint = `${RSS_TO_JSON_URL}?rss_url=${encodeURIComponent(mediumFeedUrl(username))}`
  const res = await fetch(endpoint)
  if (!res.ok) throw new Error(`Medium feed request failed: ${res.status}`)
  const data = await res.json()
  if (data.status !== 'ok') throw new Error(data.message || 'Medium feed error')
  return mapMediumResponse(data)
}
