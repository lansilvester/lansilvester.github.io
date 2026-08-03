import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
