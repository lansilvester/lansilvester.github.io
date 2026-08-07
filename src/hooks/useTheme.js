import { useCallback, useEffect, useState } from 'react'

const listeners = new Set()

function isDark() {
  return document.documentElement.classList.contains('dark')
}

function setGlobalDark(dark) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  listeners.forEach((fn) => fn(dark))
}

export function useTheme() {
  const [dark, setDark] = useState(isDark)

  useEffect(() => {
    listeners.add(setDark)
    return () => listeners.delete(setDark)
  }, [])

  const toggle = useCallback(() => {
    setGlobalDark(!isDark())
  }, [])

  return { dark, toggle }
}
