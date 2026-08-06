import { describe, expect, it, vi, afterEach } from 'vitest'
import {
  mediumFeedUrl,
  decodeHtml,
  stripHtml,
  extractThumbnail,
  mapMediumItem,
  mapMediumResponse,
  fetchMediumPosts,
} from './medium'

describe('medium utils', () => {
  it('membangun URL feed dari username', () => {
    expect(mediumFeedUrl('@alan.lengkong')).toBe('https://medium.com/feed/alan.lengkong')
    expect(mediumFeedUrl('alan.lengkong')).toBe('https://medium.com/feed/alan.lengkong')
  })

  it('mendekode entitas HTML', () => {
    expect(decodeHtml('a &amp; b &quot;c&quot; &#39;d&#39;')).toBe('a & b "c" \'d\'')
  })

  it('menghapus tag HTML dan merapikan spasi', () => {
    expect(stripHtml('<p>Halo   <strong>dunia</strong></p>')).toBe('Halo dunia')
    expect(stripHtml('&amp;')).toBe('&')
  })

  it('mengambil thumbnail dari deskripsi', () => {
    const html = '<p>Intro</p><figure><img src="https://cdn-images-1.medium.com/max/630/1*abc.png" /></figure>'
    expect(extractThumbnail(html)).toBe('https://cdn-images-1.medium.com/max/630/1*abc.png')
    expect(extractThumbnail('<img src="https://medium.com/_/stat?event=post.clientViewed" />')).toBe('')
    expect(extractThumbnail('tanpa gambar')).toBe('')
  })

  it('memetakan satu item feed Medium', () => {
    const item = {
      title: 'Judul Artikel',
      link: 'https://medium.com/@alan.lengkong/judul-123',
      pubDate: '2024-09-14 19:14:12',
      categories: ['ai', 'medium'],
      description: '<p><img src="https://cdn-images-1.medium.com/1*x.png" /> Ringkasan <b>artikel</b>.</p>',
    }
    const post = mapMediumItem(item)
    expect(post.title).toBe('Judul Artikel')
    expect(post.link).toContain('medium.com')
    expect(post.thumbnail).toBe('https://cdn-images-1.medium.com/1*x.png')
    expect(post.tags).toEqual(['ai'])
    expect(post.excerpt).toContain('Ringkasan artikel')
  })

  it('memetakan response feed', () => {
    const data = {
      status: 'ok',
      items: [
        { title: 'A', link: 'https://medium.com/a', categories: [] },
        { title: 'B', link: 'https://medium.com/b', categories: [] },
      ],
    }
    expect(mapMediumResponse(data).map((p) => p.title)).toEqual(['A', 'B'])
    expect(mapMediumResponse(null)).toEqual([])
    expect(mapMediumResponse({ items: [{ link: 'x' }] })).toEqual([])
  })

  it('fetch artikel Medium', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'ok',
        items: [{ title: 'Dari Medium', link: 'https://medium.com/artikel', categories: [] }],
      }),
    })

    const posts = await fetchMediumPosts('@alan.lengkong')
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Dari Medium')
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('https://medium.com/feed/alan.lengkong'))
    )
  })

  it('melempar error saat response tidak ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 503 })
    await expect(fetchMediumPosts('@alan.lengkong')).rejects.toThrow(/503/)
  })

  it('melempar error saat status feed gagal', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'error', message: 'boom' }) })
    await expect(fetchMediumPosts('@alan.lengkong')).rejects.toThrow('boom')
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})
