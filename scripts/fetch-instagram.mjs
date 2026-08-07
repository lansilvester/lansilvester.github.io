import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (rel) => JSON.parse(readFileSync(join(ROOT, rel), 'utf8'))
const OUT = join(ROOT, 'src/data/instagram-posts.json')
const IMG_DIR = join(ROOT, 'public/images/instagram')
const IG_APP_ID = '936619743392459'

const HEADERS = {
  'x-ig-app-id': IG_APP_ID,
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
}

function captionOf(node) {
  const edges = node?.edge_media_to_caption?.edges
  return edges?.[0]?.node?.text ?? ''
}

function pickCategory(node, config) {
  const shortcode = node.shortcode
  if (config.mapping?.[shortcode]) return config.mapping[shortcode]
  const caption = captionOf(node).toLowerCase()
  for (const [cat, words] of Object.entries(config.keywords ?? {})) {
    if (words.some((w) => caption.includes(String(w).toLowerCase()))) return cat
  }
  return null
}

async function downloadImage(url, base) {
  const res = await fetch(url, {
    headers: { Referer: 'https://www.instagram.com/', 'User-Agent': HEADERS['User-Agent'] },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (!buf.length) throw new Error('respons kosong')
  const ext = extFor(res.headers.get('content-type') || 'image/jpeg')
  writeFileSync(`${base}${ext}`, buf)
  return `/images/instagram/${base.split('/').pop()}${ext}`
}

function extFor(contentType) {
  if (contentType.includes('png')) return '.png'
  if (contentType.includes('webp')) return '.webp'
  if (contentType.includes('gif')) return '.gif'
  return '.jpg'
}

try {
  const config = readJson('src/data/content.json').MODES?.creative?.instagram
  if (!config || !config.username) {
    console.warn('[instagram] konfigurasi instagram kosong di content.json — lewati fetch.')
    process.exit(0)
  }

  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(config.username)}`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const payload = await res.json()
  const user = payload?.data?.user
  if (!user || user.is_private) throw new Error(user ? 'akun privat' : 'struktur respons berubah')

  const edges = user.edge_owner_to_timeline_media?.edges ?? []
  const limit = Number(config.limit) || 12
  const previous = existsSync(OUT) ? readJson('src/data/instagram-posts.json') : []
  const prevByCode = new Map(previous.map((p) => [p.shortcode, p]))

  mkdirSync(IMG_DIR, { recursive: true })
  const posts = []
  let downloaded = 0

  for (const edge of edges.slice(0, limit)) {
    const node = edge.node
    const shortcode = node.shortcode
    if (!shortcode) continue

    let image = ``
    if (node.display_url) {
      const prev = prevByCode.get(shortcode)
      try {
        if (prev?.image) {
          image = prev.image
        } else {
          image = await downloadImage(node.display_url, join(IMG_DIR, shortcode))
          downloaded += 1
        }
      } catch (err) {
        image = prev?.image ?? ''
        console.warn(`[instagram] gagal mengunduh gambar ${shortcode} (${err.message})`)
      }
    } else {
      image = prevByCode.get(shortcode)?.image ?? ''
    }

    posts.push({
      id: node.id,
      shortcode,
      type: node.__typename ?? '',
      caption: captionOf(node),
      date: node.taken_at_timestamp
        ? new Date(node.taken_at_timestamp * 1000).toISOString()
        : '',
      image,
      permalink: `https://www.instagram.com/p/${shortcode}/`,
      category: pickCategory(node, config),
    })
  }

  if (!posts.length) throw new Error('tidak ada postingan')
  writeFileSync(OUT, `${JSON.stringify(posts, null, 2)}\n`)
  console.log(`[instagram] ${posts.length} postingan disimpan (${downloaded} gambar baru) ke src/data/instagram-posts.json`)
} catch (err) {
  console.warn(`[instagram] Gagal memperbarui feed (${err.message}) — memakai data yang sudah ada.`)
}
