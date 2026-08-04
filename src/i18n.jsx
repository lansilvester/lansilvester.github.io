import { useEffect, useRef, useState } from 'react'
import { LanguageContext } from './useI18n'
import ui from './data/ui.json'

const FADE_DURATION = 220

// Telusuri ui.json mengikuti path bertitik (mis. "hero.description").
function lookupPath(node, segments) {
  let cur = node
  for (const seg of segments) {
    if (cur == null || typeof cur !== 'object') return null
    cur = cur[seg]
  }
  return cur
}

// Value teks bertipe objek { id, en }; atau node path yang memuat { id, en }.
function resolve(value, lang) {
  if (value != null && typeof value === 'object') {
    return value[lang] ?? value.id ?? null
  }
  return null
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'id')
  const [fading, setFading] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  const setLang = (next) => {
    if (next === lang) return
    setFading(true)
    timers.current.push(
      window.setTimeout(() => {
        setLangState(next)
        timers.current.push(
          window.setTimeout(() => setFading(false), FADE_DURATION)
        )
      }, FADE_DURATION)
    )
  }

  const value = {
    lang,
    setLang,
    t: (key) => {
      if (key == null) return key
      if (typeof key === 'object') return resolve(key, lang) ?? key
      const node = lookupPath(ui, key.split('.'))
      const val = resolve(node, lang)
      return val === null ? key : val
    },
  }

  return (
    <LanguageContext.Provider value={value}>
      <div className={`lang-fade${fading ? ' lang-fade-out' : ''}`}>{children}</div>
    </LanguageContext.Provider>
  )
}
