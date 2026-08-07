import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { PRICING, HERO } from '../../data/content'

export default function Pricing() {
  const { t } = useI18n()

  return (
    <section id="pricing" className="section bg-card py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle title={t('pricing.sectionTitle')} subtitle={t('pricing.sectionSubtitle')} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRICING.plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 100}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  plan.popular
                    ? 'border-primary bg-gradient-to-b from-primary-lighter/20 to-body'
                    : 'border-line bg-body hover:border-primary/40'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-card">
                    {t('pricing.popular')}
                  </span>
                )}

                <h3 className="text-lg font-semibold text-title">{t(plan.name)}</h3>
                <p className="mt-1.5 text-sm text-muted">{t(plan.desc)}</p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-3xl font-bold text-primary">Rp{plan.price}</span>
                  <span className="mb-1 text-xs text-muted">{t('pricing.starting')}</span>
                </div>

                <ul className="mt-6 grid flex-1 gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-2 text-sm text-text">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>

                <a
                  href={HERO.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={`group btn-shine mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-alt'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {t('pricing.choose')}
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
