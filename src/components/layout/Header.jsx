import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import Icon from '../ui/Icon'
import { NAV_LINKS } from '../../data/content'
import { useI18n } from '../../useI18n'
import { useScrolled, useActiveSection } from '../../hooks/useScroll'

const SECTION_IDS = ['home', 'about', 'skills', 'services', 'portfolio', 'blog', 'contact']

export default function Header({ dark, onToggleTheme }) {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const { t, lang, setLang } = useI18n()
  const location = useLocation()

  const isActiveLink = (href) =>
    href.startsWith('#')
      ? active === href.slice(1)
      : location.pathname.startsWith(href)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled || menuOpen ? 'px-3 pt-3 sm:px-6 sm:pt-4' : 'px-0 pt-0'
      }`}
    >
      <nav
        className={`relative flex w-full items-center backdrop-blur-xl transition-all duration-500 ${
          scrolled || menuOpen
            ? 'h-14 max-w-4xl rounded-full border border-line bg-card/85 shadow-lg'
            : 'h-16 max-w-[100vw] rounded-none border-b border-line bg-card/95 shadow-card'
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center">
          <Link
            to="/"
            className="font-display px-2.5 text-xl font-bold text-title transition-colors hover:text-primary sm:px-3"
            onClick={() => setMenuOpen(false)}
          >
            Alan
          </Link>
        </div>

        <div className="hidden h-full items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href)
            const className = `group link-underline flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors ${
              isActive ? 'active text-primary' : 'text-text hover:text-primary'
            }`
            const inner = (
              <>
                <Icon
                  name={link.icon}
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                {t(link.label)}
              </>
            )
            return link.href.startsWith('#') ? (
              <a key={link.href} href={link.href} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={className}>
                {inner}
              </Link>
            )
          })}
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            aria-label={t('header.toggleLanguage')}
            title={t('header.toggleLanguage')}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-bold text-title transition-all duration-300 hover:rotate-6 hover:scale-110 hover:bg-primary-lighter/60 hover:text-primary active:scale-90"
          >
            <Icon name="languages" size={18} />
            {t('header.switchTo')}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t('header.toggleTheme')}
            className="rounded-full p-2 text-title transition-all duration-300 hover:rotate-6 hover:scale-110 hover:bg-primary-lighter/60 hover:text-primary active:scale-90"
          >
            <Icon name={dark ? 'sun' : 'moon'} size={22} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-title transition-all duration-300 hover:rotate-6 hover:scale-110 hover:bg-primary-lighter/60 hover:text-primary active:scale-90 lg:hidden"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-20 z-40 flex justify-center px-4 transition-all duration-300 lg:hidden ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <div className="w-full max-w-md rounded-3xl border border-line bg-card/90 p-2 shadow-card backdrop-blur-xl">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href)
            const inner = (
              <>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isActive ? 'bg-primary text-white' : 'bg-primary-lighter/50 text-primary'
                  }`}
                >
                  <Icon name={link.icon} size={18} />
                </span>
                <span className="flex-1">{t(link.label)}</span>
                {isActive && <Icon name="arrowRight" size={16} className="text-primary" />}
              </>
            )
            const className = `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:translate-x-1 ${
              isActive
                ? 'bg-primary-lighter/40 text-primary'
                : 'text-text hover:bg-primary-lighter/30 hover:text-primary'
            }`
            return link.href.startsWith('#') ? (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className={className}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
