import Icon from '../ui/Icon'
import { useI18n } from '../../useI18n'
import { HERO } from '../../data/content'

export default function WhatsAppFloat() {
  const { t } = useI18n()
  const message = encodeURIComponent('Halo Alan, saya ingin bertanya tentang layanan Anda.')

  return (
    <a
      href={`${HERO.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsappFloat.label')}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-title opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:pr-2 group-hover:opacity-100">
        {t('whatsappFloat.label')}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        <span className="wa-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
        <Icon name="whatsapp" size={26} className="relative" />
      </span>
    </a>
  )
}
