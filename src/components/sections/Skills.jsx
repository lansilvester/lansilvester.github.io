import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SkillLogo from '../ui/SkillLogo'
import SectionTitle from '../ui/SectionTitle'
import LongShadowBackground from '../effects/LongShadowBackground'
import { useI18n } from '../../useI18n'
import { MODES } from '../../data/content'

export default function Skills({ mode }) {
  const modeData = MODES[mode]
  const { t } = useI18n()

  return (
    <section id="skills" className="section relative overflow-hidden bg-card py-24 sm:py-28">
      <LongShadowBackground mode={mode} />
      <div className="relative z-10 mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle title={t('skills.sectionTitle')} subtitle={t(modeData.skillsSubtitle)} />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {modeData.skills?.map((group, index) => (
            <Reveal key={group.id} delay={index * 80}>
              <div className="rounded-2xl border border-line bg-body p-5 shadow-card sm:p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-lighter/60 text-primary">
                    <Icon name={group.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-title sm:text-lg">
                      {t(group.title)}
                    </h3>
                    <p className="text-xs text-muted">{t(group.subtitle)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pl-1.5 pr-3 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-primary-lighter/20"
                    >
                      <SkillLogo skill={skill} mode={mode} size={22} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
