import { describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { LanguageProvider } from './i18n'
import { useI18n } from './useI18n'

function Probe({ k }) {
  const { t } = useI18n()
  return <span data-testid="out">{String(t(k))}</span>
}

describe('t()', () => {
  function renderKey(key, lang = 'id') {
    cleanup()
    window.localStorage.setItem('lang', lang)
    render(
      <LanguageProvider>
        <Probe k={key} />
      </LanguageProvider>
    )
    return screen.getByTestId('out').textContent
  }

  it('resolve path string dari ui.json (id)', () => {
    expect(renderKey('hero.description')).toContain('website modern')
  })

  it('resolve path string dengan bahasa en', () => {
    expect(renderKey('hero.viewWork', 'en')).toBe('See Work')
  })

  it('resolve objek { id, en }', () => {
    expect(renderKey({ id: 'Halo', en: 'Hello' })).toBe('Halo')
    expect(renderKey({ id: 'Halo', en: 'Hello' }, 'en')).toBe('Hello')
  })

  it('mengembalikan kunci jika path tidak ditemukan', () => {
    expect(renderKey('tidak.ada.key')).toBe('tidak.ada.key')
  })

  it('mengembalikan nilai apa adanya untuk null', () => {
    expect(renderKey(null)).toBe('null')
  })
})
