import { useEffect, useState } from 'react'
import { LanguageContext } from './useI18n'
import ui from './data/ui.json'

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
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

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

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
