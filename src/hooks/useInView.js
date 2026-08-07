import { useEffect, useState } from 'react'

export default function useInView(ref, rootMargin = '0px') {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)

    const onVisibility = () => {
      if (document.hidden) {
        setVisible(false)
      } else {
        const rect = el.getBoundingClientRect()
        setVisible(rect.bottom > 0 && rect.top < window.innerHeight)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ref, rootMargin])

  return visible
}
