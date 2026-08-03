import Icon from '../ui/Icon'
import { useI18n } from '../../useI18n'
import { FOOTER_SOCIALS } from '../../data/content'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-alt text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold">Alan</h2>
          <span className="mt-1 block text-sm text-white/80">{t('footer.tagline')}</span>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <li><a href="#services" className="link-underline transition-opacity hover:opacity-80">{t('footer.services')}</a></li>
          <li><a href="#portfolio" className="link-underline transition-opacity hover:opacity-80">{t('footer.portfolio')}</a></li>
          <li><a href="#contact" className="link-underline transition-opacity hover:opacity-80">{t('footer.contact')}</a></li>
        </ul>

        <div className="flex flex-wrap gap-3">
          {FOOTER_SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white/40 hover:shadow-lg"
            >
              <Icon name={social.icon} size={20} />
            </a>
          ))}
        </div>
      </div>

      <p className="border-t border-white/15 py-6 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} Varland Lengkong
        <br />
        {t('footer.madeWith')} <Icon name="heart" size={14} className="mx-auto my-1 text-red-400" />
      </p>
    </footer>
  )
}
