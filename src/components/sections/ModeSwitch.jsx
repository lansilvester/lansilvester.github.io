import { useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import ParticleField from '../effects/ParticleField'
import LogoMarquee from '../effects/LogoMarquee'
import { useI18n } from '../../useI18n'
import { MODES } from '../../data/content'

const NAVBAR_HEIGHT = 64
const FLOAT_OFFSET = 15

export default function ModeSwitch({ mode, onChange }) {
  const keys = ['developer', 'creative']
  const sectionRef = useRef(null)
  const [floating, setFloating] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let ticking = false
    const update = () => {
      const rect = el.getBoundingClientRect()
      setFloating(rect.bottom < 0)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} className="section pb-0 pt-6 sm:pt-10">
        <div className="mx-auto max-w-6xl px-2 sm:px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 text-center shadow-card sm:p-10 mb-16 sm:mb-24">
              <ParticleField density={22000} />
              <div className="relative z-10">
                <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-primary">
                  {t('modeswitch.badge')}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-title sm:text-3xl">
                  {t('modeswitch.title')}
                </h2>

                <div
                  className="relative mx-auto mt-8 grid max-w-3xl grid-cols-2 rounded-[3rem] border border-line bg-body p-2 shadow-card"
                  role="group"
                  aria-label="Pilih mode personal branding"
                >
                <span
                  className="absolute bottom-2 top-2 rounded-[3rem] bg-primary shadow-card transition-all duration-500 ease-out"
                  style={{ left: mode === 'developer' ? '8px' : '50%', width: 'calc(50% - 8px)' }}
                />

                {keys.map((key) => {
                  const data = MODES[key]
                  const isActive = mode === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onChange(key)}
                      aria-pressed={isActive}
                      className={`group relative z-10 flex flex-col items-center justify-center gap-2 rounded-[3rem] px-4 py-6 transition-all duration-300 hover:scale-[1.03] active:scale-95 sm:gap-3 ${
                        isActive ? 'text-white' : 'text-title hover:text-primary'
                      }`}
                    >
                      <Icon
                        name={data.icon}
                        size={44}
                        className={`transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${
                          isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                        }`}
                      />
                      <span
                        className={`text-lg font-bold sm:text-2xl ${
                          key === 'developer' ? 'font-bitcount' : ''
                        }`}
                      >
                        {t(data.shortLabel)}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="mt-6 text-sm text-muted">
                {t('modeswitch.hint')}
              </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mt-14">
        <LogoMarquee mode={mode} />
      </div>

      <div
        className={`fixed inset-x-0 z-30 flex justify-center px-4 transition-all duration-300 ${
          floating
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
        style={{ top: NAVBAR_HEIGHT + FLOAT_OFFSET }}
        aria-hidden={!floating}
      >
        <div className="flex items-center gap-1 rounded-full border border-line bg-card/95 p-1 shadow-card backdrop-blur-md">
          {keys.map((key) => {
            const data = MODES[key]
            const isActive = mode === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 sm:px-4 ${
                  isActive ? 'bg-primary text-white shadow-card' : 'text-title hover:text-primary'
                }`}
              >
                <Icon name={data.icon} size={20} />
                <span className={key === 'developer' ? 'font-bitcount' : ''}>
                  {t(data.shortLabel)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
