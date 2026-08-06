import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { LanguageProvider } from '../../i18n'
import BlogList from './BlogList'
import mediumPosts from '../../data/medium-posts.json'

class IO {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true, target: el }])
  }
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IO

describe('BlogList', () => {
  it('menampilkan artikel Medium dan membukanya di tab baru', () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <BlogList />
        </MemoryRouter>
      </LanguageProvider>
    )

    const first = mediumPosts[0]
    expect(screen.getByText(first.title)).toBeInTheDocument()
    const links = screen.getAllByRole('link', { name: /baca di medium/i })
    expect(links).toHaveLength(mediumPosts.length)
    expect(links[0]).toHaveAttribute('href', first.link)
    expect(links[0]).toHaveAttribute('target', '_blank')
  })

  it('menampilkan thumbnail artikel Medium', () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <BlogList />
        </MemoryRouter>
      </LanguageProvider>
    )

    const postWithImage = mediumPosts.find((p) => p.thumbnail)
    if (postWithImage) {
      const img = screen.getByAltText(postWithImage.title)
      expect(img).toHaveAttribute('src', postWithImage.thumbnail)
    }
  })
})
