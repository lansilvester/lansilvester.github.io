import { describe, expect, it } from 'vitest'
import content from './content.json'
import layout from './layout.json'

describe('content.json integrity', () => {
  it('modes developer & creative lengkap', () => {
    for (const key of ['developer', 'creative']) {
      const mode = content.MODES[key]
      expect(mode).toBeTruthy()
      expect(Array.isArray(mode.skills)).toBe(true)
      expect(Array.isArray(mode.services)).toBe(true)
      expect(Array.isArray(mode.portfolio)).toBe(true)
      expect(mode.cta?.primary?.href).toBeTruthy()
    }
  })

  it('mode creative punya galeri video', () => {
    expect(Array.isArray(content.MODES.creative.videos)).toBe(true)
  })

  it('form kontak punya kunci accessKey & endpoint', () => {
    expect(content.CONTACT_FORM).toHaveProperty('accessKey')
    expect(content.CONTACT_FORM).toHaveProperty('endpoint')
  })

  it('menu navigasi berisi tautan blog', () => {
    expect(content.NAV_LINKS.some((l) => l.href === '/blog')).toBe(true)
  })

  it('hero punya tautan WhatsApp', () => {
    expect(content.HERO.whatsapp).toMatch(/^https:\/\/wa\.me\//)
  })

  it('layout memiliki semua section yang dipakai App', () => {
    const ids = new Set(layout.sections.map((s) => s.id))
    for (const id of ['home', 'about', 'modeswitch', 'skills', 'qualification', 'services', 'portfolio', 'gallery', 'testimonial', 'pricing', 'cta', 'contact']) {
      expect(ids.has(id)).toBe(true)
    }
  })
})
