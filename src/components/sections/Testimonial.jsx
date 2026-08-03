import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { TESTIMONIALS } from '../../data/content'

export default function Testimonial() {
  const [index, setIndex] = useState(0)
  const total = TESTIMONIALS.length
  const { t } = useI18n()

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 6000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section id="testimonial" className="section bg-card py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle title={t('testimonial.sectionTitle')} subtitle={t('testimonial.sectionSubtitle')} />

        <Reveal className="mt-12">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.name}
                  className="w-full shrink-0 rounded-2xl border border-line bg-body p-6 shadow-card sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-title">{item.name}</h3>
                        <span className="text-xs text-muted">{t(item.role)}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: item.stars }).map((_, i) => (
                        <Icon key={i} name="star" size={18} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-text">{t(item.text)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimoni ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 ${
                  i === index ? 'w-6 bg-primary' : 'w-2 bg-muted/50 hover:bg-primary'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
