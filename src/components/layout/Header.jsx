import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'
import { NAV_LINKS } from '../../data/content'
import { useScrolled, useActiveSection } from '../../hooks/useScroll'

const SECTION_IDS = ['home', 'about', 'skills', 'services', 'portfolio', 'contact']

export default function Header({ dark, onToggleTheme }) {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-line bg-card/95 shadow-card backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          className="text-xl font-bold text-title transition-colors hover:text-primary"
          onClick={() => setMenuOpen(false)}
        >
          Alan
        </a>

        <div
          className={`fixed inset-x-0 top-16 z-40 transition-all duration-300 lg:static lg:pointer-events-auto lg:translate-y-0 lg:opacity-100 ${
            menuOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-3 opacity-0'
          }`}
        >
          <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:hidden">
            <div className="grid gap-1 rounded-2xl border border-line bg-card p-2 shadow-card">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:translate-x-1 ${
                      isActive
                        ? 'bg-primary-lighter/40 text-primary'
                        : 'text-text hover:bg-primary-lighter/30 hover:text-primary'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? 'bg-primary text-white' : 'bg-primary-lighter/50 text-primary'
                      }`}
                    >
                      <Icon name={link.icon} size={18} />
                    </span>
                    <span className="flex-1">{link.label}</span>
                    {isActive && <Icon name="arrowRight" size={16} className="text-primary" />}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group link-underline flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                    isActive ? 'active text-primary' : 'text-text hover:text-primary'
                  }`}
                >
                  <Icon
                    name={link.icon}
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Ganti tema"
            className="rounded-xl p-2 text-title transition-all duration-300 hover:rotate-6 hover:scale-110 hover:bg-primary-lighter/60 hover:text-primary active:scale-90"
          >
            <Icon name={dark ? 'sun' : 'moon'} size={22} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            className="rounded-xl p-2 text-title transition-all duration-300 hover:rotate-6 hover:scale-110 hover:bg-primary-lighter/60 hover:text-primary active:scale-90 lg:hidden"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </nav>
    </header>
  )
}
