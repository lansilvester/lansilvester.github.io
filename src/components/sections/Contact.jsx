import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import { useI18n } from '../../useI18n'
import { CONTACT_INFO, CONTACT_FORM, HERO } from '../../data/content'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_ENDPOINT = 'https://api.web3forms.com/submit'

// Hanya izinkan endpoint https milik web3forms; selain itu pakai default
// agar data form tidak bisa dikirim ke server lain.
function resolveEndpoint(custom) {
  if (typeof custom === 'string' && custom.trim()) {
    try {
      const u = new URL(custom)
      if (u.protocol === 'https:' && u.hostname === 'api.web3forms.com') return u.toString()
    } catch {
      return DEFAULT_ENDPOINT
    }
  }
  return DEFAULT_ENDPOINT
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '', company: '' })
  const [status, setStatus] = useState('idle')
  const { t } = useI18n()

  const usingEndpoint = Boolean(CONTACT_FORM.accessKey)
  const endpoint = resolveEndpoint(CONTACT_FORM.endpoint)

  const update = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const buildBody = () =>
    `Nama: ${form.name.trim()}\nEmail: ${form.email.trim()}\nProyek: ${form.project.trim()}\n\n${form.message.trim()}`

  const resetForm = () =>
    setForm({ name: '', email: '', project: '', message: '', company: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    const { name, email, message, company } = form
    if (!name.trim() || !email.trim() || !message.trim() || !EMAIL_RE.test(email.trim())) {
      setStatus('validation')
      return
    }
    if (company) {
      setStatus('success')
      return
    }

    if (!usingEndpoint) {
      const text = encodeURIComponent(buildBody())
      window.open(`${HERO.whatsapp}?text=${text}`, '_blank', 'noopener')
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      const data = new FormData()
      data.append('access_key', CONTACT_FORM.accessKey)
      data.append('name', name.trim())
      data.append('email', email.trim())
      data.append('message', buildBody())
      data.append('from_name', name.trim())
      data.append('subject', `Pesan dari ${name.trim() || 'website'}`)
      data.append('_subject', `Pesan dari ${name.trim() || 'website'}`)
      data.append('_replyto', email.trim())
      data.append('_honey', company)

      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success !== false) {
        setStatus('success')
        resetForm()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const onSubmitEmail = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Pesan dari ${form.name.trim() || 'website'}`)
    const body = encodeURIComponent(buildBody())
    window.open(
      `mailto:${HERO.email}?subject=${subject}&body=${body}`,
      '_blank',
      'noopener'
    )
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-body px-4 py-3 text-sm text-title placeholder:text-muted outline-none transition-colors hover:border-primary/50 focus:border-primary'

  const statusMsg = {
    validation: t('contact.errorValidation'),
    success: t('contact.success'),
    error: t('contact.errorGeneric'),
  }[status]

  return (
    <section id="contact" className="section py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <SectionTitle title={t('contact.sectionTitle')} subtitle={t('contact.sectionSubtitle')} />

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal direction="left" className="space-y-6">
            {CONTACT_INFO.map((info) => (
              <div key={info.label.id} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-lighter/60 text-primary">
                  <Icon name={info.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-sm font-medium text-title">{t(info.label)}</h3>
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
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-title">
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update}
                    className={inputClass}
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-title">
                    {t('contact.emailField')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    className={inputClass}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="mb-1.5 block text-sm font-medium text-title">
                  {t('contact.project')}
                </label>
                <input
                  id="project"
                  name="project"
                  type="text"
                  value={form.project}
                  onChange={update}
                  className={inputClass}
                  placeholder={t('contact.projectPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-title">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={update}
                  className={`${inputClass} resize-none`}
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={update}
                />
              </div>

              <p className="text-xs leading-relaxed text-muted">{t('contact.whatsappNote')}</p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-alt hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Icon
                    name={usingEndpoint ? 'mail' : 'whatsapp'}
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                  />
                  {status === 'submitting' ? t('contact.sending') : usingEndpoint ? t('contact.submit') : t('contact.submitWhatsApp')}
                </button>
                <button
                  type="button"
                  onClick={onSubmitEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-title transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
                >
                  <Icon name="mail" size={18} />
                  {t('contact.submitEmail')}
                </button>
              </div>

              <div aria-live="polite">
                {statusMsg && (
                  <p
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      status === 'success'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : status === 'error' || status === 'validation'
                          ? 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
                          : ''
                    }`}
                  >
                    {statusMsg}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
