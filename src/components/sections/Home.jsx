import { TypeAnimation } from 'react-type-animation'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import ParticleField from '../effects/ParticleField'
import { useI18n } from '../../useI18n'
import { HERO, MODES, SOCIALS } from '../../data/content'

function BlobPhoto() {
  return (
    <div className="relative mx-auto w-56 sm:w-72 lg:w-80">
      <div className="animate-float">
        <svg
          viewBox="0 0 200 187"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="h-auto w-full"
          role="img"
          aria-label="Foto profil"
        >
          <mask id="blob-mask" mask-type="alpha">
            <path
              d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547
              130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775
              97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666
              0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
            />
          </mask>
          <g mask="url(#blob-mask)">
            <path
              d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346
              165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403
              129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028
              -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
              fill="url(#blob-gradient)"
            />
            <image
              href={HERO.photo}
              x="5"
              y="10"
              width="190"
              height="190"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
          <defs>
            <linearGradient id="blob-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-alt)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default function Home({ mode }) {
  const modeData = MODES[mode]
  const { t } = useI18n()
  const primaryCta = modeData.cta?.primary || { label: { id: t('hero.viewWork'), en: t('hero.viewWork') }, href: '#portfolio' }
  const secondaryCta = modeData.cta?.secondary || { label: { id: t('hero.contact'), en: t('hero.contact') }, href: '#contact' }

  return (
    <section id="home" className="section relative overflow-hidden pt-28 sm:pt-32">
      <ParticleField />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pb-6 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="order-2 grid grid-cols-[auto_1fr] items-center gap-4 lg:order-1">
            <Reveal direction="left">
              <div className="flex flex-col gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="text-xl text-muted transition-all duration-300 hover:-translate-y-1 hover:scale-125 hover:text-primary"
                  >
                    <Icon name={social.icon} size={24} />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className="text-center lg:text-left">
              <TypeAnimation
                sequence={[
                  t('hero.greeting1'),
                  2200,
                  t('hero.greeting2'),
                  1800,
                  t('hero.greeting3'),
                  1800,
                ]}
                wrapper="h1"
                speed={55}
                deletionSpeed={35}
                repeat={Infinity}
                className="text-3xl font-bold text-title sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
              />
              <h3 className="mt-2 text-lg font-medium text-text sm:text-xl">
                {t(modeData.homeSubtitle)}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted lg:mx-0">
                {t('hero.description')}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href={primaryCta.href}
                  className="btn-fill inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t(primaryCta.label)} <Icon name="layout" size={18} />
                </a>
                <a
                  href={secondaryCta.href}
                  className="group btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t(secondaryCta.label)}{' '}
                  <Icon
                    name="mail"
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" className="order-1 lg:order-2">
            <BlobPhoto />
          </Reveal>
        </div>

        <div className="flex justify-center lg:justify-start">
          <a
            href="#about"
            className="group inline-flex flex-col items-center gap-1 text-muted transition-colors hover:text-primary sm:flex-row"
          >
            <Icon
              name="mouse"
              size={26}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="text-xs font-medium">{t('hero.scroll')}</span>
            <Icon
              name="arrowDown"
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
