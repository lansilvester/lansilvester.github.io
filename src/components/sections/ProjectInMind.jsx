import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import { PROJECT } from '../../data/content'

export default function ProjectInMind() {
  return (
    <section className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-alt px-6 py-14 sm:px-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div className="text-center text-white md:text-left">
                <h2 className="text-2xl font-bold sm:text-3xl">{PROJECT.title}</h2>
                <p className="mt-2 text-sm text-white/85">{PROJECT.description}</p>
                <a
                  href="#contact"
                  className="group btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-primary shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Hubungi{' '}
                  <Icon
                    name="mail"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
              <img
                src={PROJECT.image}
                alt="Proyek"
                className="mx-auto hidden w-56 rotate-3 rounded-2xl shadow-card transition-transform duration-500 hover:rotate-0 hover:scale-105 md:block"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
