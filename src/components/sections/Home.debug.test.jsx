import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { LanguageProvider } from '../../i18n'
import Home from './Home'
import { vi } from 'vitest'

class IO {
  constructor(cb) { this.cb = cb }
  observe(el) { this.cb([{ isIntersecting: true, target: el }]) }
  unobserve() {}
  disconnect() {}
}

describe('Home debug', () => {
  it('renders hero text strictly', () => {
    vi.useFakeTimers()
    global.IntersectionObserver = IO
    global.HTMLCanvasElement.prototype.getContext = () => ({
      setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, arc() {}, fill() {},
    })
    global.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
    global.MutationObserver = class { observe() {} disconnect() {} }
    render(
      <LanguageProvider>
        <Home mode="developer" />
      </LanguageProvider>
    )
    vi.advanceTimersByTime(3000)
    const body = document.body.textContent
    expect(body).toContain('website modern')
    expect(body).toContain('Bikin Website Estetik & Super Kencang Buat Bisnis Kamu')
  })
})
