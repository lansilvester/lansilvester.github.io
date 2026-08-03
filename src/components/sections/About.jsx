import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { ABOUT } from '../../data/content'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={t('about.sectionTitle')} subtitle={t('about.sectionSubtitle')} />

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          <Reveal direction="left">
            <img
              src={ABOUT.photo}
              alt="Alan"
              loading="lazy"
              decoding="async"
              className="mx-auto h-64 w-64 rounded-full object-cover shadow-card sm:h-80 sm:w-80"
            />
          </Reveal>

          <Reveal direction="right">
            <div className="text-center md:text-left">
              <p className="text-sm leading-relaxed text-text">{t('about.description')}</p>

              <div className="mt-6 flex justify-center gap-10 md:justify-start">
                {ABOUT.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-2xl font-semibold text-primary sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs leading-tight text-muted sm:text-sm">
                      {t(stat.label)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <a
                  href={ABOUT.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="group btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t('about.downloadCV')}{' '}
                  <Icon
                    name="download"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
