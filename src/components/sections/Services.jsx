import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import ColorWaveBackground from '../effects/ColorWaveBackground'
import playClickSound from '../../utils/playClickSound'
import { useI18n } from '../../useI18n'
import { MODES } from '../../data/content'

export default function Services({ mode }) {
  const modeData = MODES[mode]
  const [activeModal, setActiveModal] = useState(null)
  const { t } = useI18n()

  return (
    <section id="services" className="section relative overflow-hidden bg-card py-24 sm:py-28">
      <ColorWaveBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle title={t('services.sectionTitle')} subtitle={t(modeData.servicesSubtitle)} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {modeData.services.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <div className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-line bg-body p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter/60 text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Icon name={service.icon} size={26} />
                </span>
                <h3 className="text-lg font-semibold text-title">{t(service.title)}</h3>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setActiveModal(service.id)
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-alt"
                >
                  {t('services.more')}{' '}
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {activeModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            playClickSound()
            setActiveModal(null)
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-card p-8 shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-xl font-semibold text-title">
                {t(modeData.services.find((s) => s.id === activeModal).title)}
              </h4>
              <button
                type="button"
                onClick={() => {
                  playClickSound()
                  setActiveModal(null)
                }}
                aria-label={t('services.close')}
                className="rounded-lg p-1 text-muted transition-all duration-300 hover:rotate-90 hover:scale-110 hover:bg-primary-lighter/40 hover:text-primary active:scale-90"
              >
                <Icon name="x" size={22} />
              </button>
            </div>
            <ul className="mt-6 grid gap-3">
              {modeData.services.find((s) => s.id === activeModal).points.map((point) => (
                <li key={point.id} className="flex items-start gap-2 text-sm text-text">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  {t(point)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
