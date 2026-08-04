import Icon from '../ui/Icon'
import { useI18n } from '../../useI18n'
import { useScrolled } from '../../hooks/useScroll'

export default function ScrollUp() {
  const visible = useScrolled(500)
  const { t } = useI18n()

  return (
    <a
      href="#home"
      aria-label={t('scrollUp.label')}
      className={`group fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-primary-alt hover:shadow-lg ${
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
