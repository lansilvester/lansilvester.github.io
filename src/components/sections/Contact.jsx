import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { CONTACT_INFO, HERO } from '../../data/content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })

  const update = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Pesan dari ${form.name || 'website'}`)
    const body = encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\nProyek: ${form.project}\n\n${form.message}`
    )
    window.open(
      `mailto:${HERO.email}?subject=${subject}&body=${body}`,
      '_blank',
      'noopener'
    )
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-body px-4 py-3 text-sm text-title placeholder:text-muted outline-none transition-colors hover:border-primary/50 focus:border-primary'

  return (
    <section id="contact" className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title="Kontak" subtitle="Hubungi" />

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal direction="left" className="space-y-6">
            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-lighter/60 text-primary">
                  <Icon name={info.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-sm font-medium text-title">{info.label}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="link-underline text-sm text-muted transition-colors hover:text-primary"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-sm text-muted">{info.value}</span>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal direction="right">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-title">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update}
                    className={inputClass}
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-title">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    className={inputClass}
                    placeholder="email@anda.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="mb-1.5 block text-sm font-medium text-title">
                  Projects
                </label>
                <input
                  id="project"
                  name="project"
                  type="text"
                  value={form.project}
                  onChange={update}
                  className={inputClass}
                  placeholder="Judul proyek"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-title">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={update}
                  className={`${inputClass} resize-none`}
                  placeholder="Tulis pesan Anda"
                />
              </div>

              <button
                type="submit"
                className="group btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:justify-self-start"
              >
                Kirim Pesan{' '}
                <Icon
                  name="mail"
                  size={18}
                  className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
