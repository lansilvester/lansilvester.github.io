import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import playClickSound from '../../utils/playClickSound'
import { MODES } from '../../data/content'

export default function Portfolio({ mode }) {
  const modeData = MODES[mode]
  const [index, setIndex] = useState(0)
  const total = modeData.portfolio.length

  const go = (next) => {
    playClickSound()
    setIndex(((next % total) + total) % total)
  }

  return (
    <section id="portfolio" className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title="Portfolio" subtitle={modeData.portfolioSubtitle} />

        <Reveal direction="zoom" className="mt-12">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {modeData.portfolio.map((item) => (
                  <div
                    key={item.title}
                    className="grid w-full shrink-0 gap-6 bg-card p-6 sm:grid-cols-2 sm:items-center sm:p-8"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-48 w-full rounded-xl object-cover sm:h-56"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-title">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                      <a
                        href={item.demo}
                        className="group btn-shine mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Demo{' '}
                        <Icon
                          name="arrowRight"
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Sebelumnya"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-title shadow-card transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary hover:shadow-lg active:scale-95"
              >
                <Icon
                  name="arrowLeft"
                  size={20}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </button>

              <div className="flex gap-2">
                {modeData.portfolio.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => {
                      playClickSound()
                      setIndex(i)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 ${
                      i === index ? 'w-6 bg-primary' : 'w-2 bg-muted/50 hover:bg-primary'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Berikutnya"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-title shadow-card transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary hover:shadow-lg active:scale-95"
              >
                <Icon
                  name="arrowRight"
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
