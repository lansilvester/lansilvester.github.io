import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import LongShadowBackground from '../effects/LongShadowBackground'
import playClickSound from '../../utils/playClickSound'
import { useI18n } from '../../useI18n'
import { MODES } from '../../data/content'

export default function Skills({ mode }) {
  const modeData = MODES[mode]
  const [open, setOpen] = useState(modeData.skills[0].id)
  const { t } = useI18n()

  return (
    <section id="skills" className="section relative overflow-hidden bg-card py-24 sm:py-28">
      <LongShadowBackground mode={mode} />
      <div className="relative z-10 mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle title={t('skills.sectionTitle')} subtitle={t(modeData.skillsSubtitle)} />

        <div className="mx-auto mt-12 grid max-w-3xl gap-4">
          {modeData.skills.map((group, index) => {
            const isOpen = open === group.id
            return (
              <Reveal key={group.id} delay={index * 80}>
                <div className="overflow-hidden rounded-2xl border border-line bg-body shadow-card">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound()
                      setOpen(isOpen ? null : group.id)
                    }}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-primary-lighter/30 active:scale-[0.99]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-lighter/60 text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon name={group.icon} size={22} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-semibold text-title sm:text-lg">
                        {t(group.title)}
                      </span>
                      <span className="block text-xs text-muted">{t(group.subtitle)}</span>
                    </span>
                    <Icon
                      name="angleDown"
                      size={20}
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-x-4 gap-y-2 px-5 pb-5 pt-1 sm:grid-cols-2">
                        {group.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center justify-between rounded-xl bg-card px-4 py-3 text-sm font-medium text-text"
                          >
                            {skill}
                            <Icon name="check" size={18} className="text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>


    </section>
  )
}
