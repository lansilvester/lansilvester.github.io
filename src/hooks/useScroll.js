import { useEffect, useRef, useState } from 'react'

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const observerRef = useRef(null)
  const observedIds = useRef(new Set())

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    observerRef.current = observer
    observedIds.current.clear()

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observedIds.current.add(id)
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
      if (observerRef.current === observer) observerRef.current = null
      observedIds.current.clear()
    }
  }, [ids])

  useEffect(() => {
    const checkNewSections = () => {
      if (!observerRef.current) return
      ids.forEach((id) => {
        if (observedIds.current.has(id)) return
        const el = document.getElementById(id)
        if (el) {
          observedIds.current.add(id)
          observerRef.current.observe(el)
        }
      })
      return observedIds.current.size === ids.length
    }

    if (checkNewSections()) return
    let tries = 0
    const interval = setInterval(() => {
      tries += 1
      if (checkNewSections() || tries >= 30) clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [ids])

  return active
}
