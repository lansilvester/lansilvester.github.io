import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../i18n'
import WhatsAppFloat from './WhatsAppFloat'

describe('WhatsAppFloat', () => {
  it('menampilkan tautan WhatsApp dengan aria-label', () => {
    render(
      <LanguageProvider>
        <WhatsAppFloat />
      </LanguageProvider>
    )
    const link = screen.getByRole('link', { name: 'Chat via WhatsApp' })
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })
})
