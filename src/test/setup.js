import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

const storage = new Map()

if (typeof window.localStorage === 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
      clear: () => storage.clear(),
      key: (index) => [...storage.keys()][index] ?? null,
      get length() {
        return storage.size
      },
    },
  })
}

afterEach(() => {
  storage.clear()
  cleanup()
})
