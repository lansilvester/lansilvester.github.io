import { describe, expect, it } from 'vitest'
import { parsePost, formatPostDate } from './blog'

const fixture = `---
title: "Contoh Artikel"
date: 2026-01-15
excerpt: "Ringkasan singkat."
tags: ["React", "Vite"]
lang: id
featured: true
---

# Judul

Isi **markdown** artikel.
`

describe('blog utils', () => {
  it('parse frontmatter + body markdown', () => {
    const post = parsePost('src/blog/posts/contoh.md', fixture)
    expect(post.slug).toBe('contoh')
    expect(post.title).toBe('Contoh Artikel')
    expect(post.lang).toBe('id')
    expect(post.tags).toEqual(['React', 'Vite'])
    expect(post.content).toContain('**markdown**')
  })

  it('format tanggal sesuai locale', () => {
    expect(formatPostDate('2026-01-15', 'id-ID')).toContain('Januari')
    expect(formatPostDate('', 'id-ID')).toBe('')
  })
})
