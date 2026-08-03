import { describe, expect, it } from 'vitest'
import { parseFrontmatter } from './frontmatter'

describe('parseFrontmatter', () => {
  it('mem-parse deklarasi sederhana', () => {
    const { data, content } = parseFrontmatter(`---
title: "Halo"
date: 2026-01-01
featured: true
---

Konten **markdown**.
`)
    expect(data.title).toBe('Halo')
    expect(data.featured).toBe(true)
    expect(content).toContain('**markdown**')
  })

  it('mem-parse daftar block gaya Decap (- item)', () => {
    const { data } = parseFrontmatter(`---
tags:
  - React
  - Vite
  - "Tailwind"
---

Konten.
`)
    expect(data.tags).toEqual(['React', 'Vite', 'Tailwind'])
  })

  it('mem-parse daftar flow [a, b]', () => {
    const { data } = parseFrontmatter(`---
tags: [React, Vite]
lang: en
---

Konten.
`)
    expect(data.tags).toEqual(['React', 'Vite'])
    expect(data.lang).toBe('en')
  })

  it('mengembalikan raw sebagai konten jika tanpa frontmatter', () => {
    const { data, content } = parseFrontmatter('hanya konten')
    expect(data).toEqual({})
    expect(content).toBe('hanya konten')
  })
})
