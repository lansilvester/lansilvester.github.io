import Icon from '../ui/Icon'
import { useScrolled } from '../../hooks/useScroll'

export default function ScrollUp() {
  const visible = useScrolled(500)

  return (
    <a
      href="#home"
      aria-label="Kembali ke atas"
      className={`group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-primary-alt hover:shadow-lg ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon
        name="arrowUp"
        size={22}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </a>
  )
}
