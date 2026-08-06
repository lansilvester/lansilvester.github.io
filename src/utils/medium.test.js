import { describe, expect, it } from 'vitest'
import {
  mediumFeedUrl,
  decodeHtml,
  stripHtml,
  extractThumbnail,
  parseMediumRss,
  mapMediumItem,
  mapMediumResponse,
} from './medium'

const rssFixture = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Feed</title>
  <item>
    <title><![CDATA[Judul Artikel]]></title>
    <link>https://medium.com/@alan.lengkong/judul-123</link>
    <category><![CDATA[ai]]></category>
    <category><![CDATA[medium]]></category>
    <dc:creator><![CDATA[Varland Lengkong]]></dc:creator>
    <pubDate>Sat, 14 Sep 2024 19:14:12 GMT</pubDate>
    <content:encoded><![CDATA[<p><img src="https://cdn-images-1.medium.com/1*x.png" /> Ringkasan <b>artikel</b>.</p>]]></content:encoded>
  </item>
  <item>
    <title><![CDATA[Tanpa Gambar]]></title>
    <link>https://medium.com/@alan.lengkong/tanpa-gambar</link>
    <pubDate>Sun, 15 Sep 2024 08:00:00 GMT</pubDate>
    <content:encoded><![CDATA[<p>Halo dunia</p>]]></content:encoded>
  </item>
</channel></rss>`

describe('medium utils', () => {
  it('membangun URL feed dengan tanda @', () => {
    expect(mediumFeedUrl('@alan.lengkong')).toBe('https://medium.com/feed/@alan.lengkong')
    expect(mediumFeedUrl('alan.lengkong')).toBe('https://medium.com/feed/@alan.lengkong')
  })

  it('mendekode entitas HTML', () => {
    expect(decodeHtml('a &amp; b &quot;c&quot; &#39;d&#39;')).toBe('a & b "c" \'d\'')
  })

  it('menghapus tag HTML dan merapikan spasi', () => {
    expect(stripHtml('<p>Halo   <strong>dunia</strong></p>')).toBe('Halo dunia')
    expect(stripHtml('&amp;')).toBe('&')
  })

  it('mengambil thumbnail dari konten', () => {
    const html = '<p>Intro</p><figure><img src="https://cdn-images-1.medium.com/max/630/1*abc.png" /></figure>'
    expect(extractThumbnail(html)).toBe('https://cdn-images-1.medium.com/max/630/1*abc.png')
    expect(extractThumbnail('<img src="https://medium.com/_/stat?event=post.clientViewed" />')).toBe('')
    expect(extractThumbnail('tanpa gambar')).toBe('')
  })

  it('mem-parsing RSS Medium', () => {
    const posts = parseMediumRss(rssFixture)
    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Judul Artikel')
    expect(posts[0].link).toBe('https://medium.com/@alan.lengkong/judul-123')
    expect(posts[0].pubDate).toContain('2024')
    expect(posts[0].categories).toEqual(['ai', 'medium'])
    expect(posts[0].content).toContain('cdn-images-1.medium.com')
    expect(posts[1].title).toBe('Tanpa Gambar')
    expect(parseMediumRss('')).toEqual([])
  })

  it('memetakan satu item feed Medium', () => {
    const post = mapMediumItem({
      title: 'Judul',
      link: 'https://medium.com/x',
      pubDate: 'Sat, 14 Sep 2024 19:14:12 GMT',
      categories: ['ai', 'medium'],
      content: '<p><img src="https://cdn-images-1.medium.com/1*x.png" /> Ringkasan <b>artikel</b>.</p>',
    })
    expect(post.title).toBe('Judul')
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
})
