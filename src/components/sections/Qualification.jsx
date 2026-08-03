import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import SectionTitle from '../ui/SectionTitle'
import playClickSound from '../../utils/playClickSound'
import { QUALIFICATIONS } from '../../data/content'

function TimelineItem({ item }) {
  const isRight = item.side === 'right'
  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-4 pb-10 last:pb-0">
      <div className={isRight ? 'text-right' : 'text-left'}>
        {!isRight && (
          <div>
            <h3 className="text-sm font-semibold text-title sm:text-base">{item.title}</h3>
            <span className="mt-1 block text-xs text-muted">{item.place}</span>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
              <Icon name="calendar" size={12} />
              {item.period}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <span className="h-4 w-4 rounded-full border-2 border-primary bg-body" />
        <span className="w-px flex-1 bg-line" />
      </div>

      <div className={isRight ? 'text-left' : 'text-right'}>
        {isRight && (
          <div>
            <h3 className="text-sm font-semibold text-title sm:text-base">{item.title}</h3>
            <span className="mt-1 block text-xs text-muted">{item.place}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
              <Icon name="calendar" size={12} />
              {item.period}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Qualification() {
  const [tab, setTab] = useState('education')
  const items = QUALIFICATIONS[tab]

  return (
    <section id="qualification" className="section py-24 sm:py-28">
 
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle title="Kualifikasi" subtitle="Tipe petualangan" />

        <Reveal>
          <div className="mt-10 flex justify-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => {
                playClickSound()
                setTab('education')
              }}
              className={`group tab-link inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                tab === 'education' ? 'active text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              <Icon
                name="graduation"
                size={20}
                className="transition-transform group-hover:animate-[wiggle_0.45s_ease-in-out]"
              />{' '}
              Pendidikan
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound()
                setTab('work')
              }}
              className={`group tab-link inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                tab === 'work' ? 'active text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              <Icon
                name="briefcase"
                size={20}
                className="transition-transform group-hover:animate-[wiggle_0.45s_ease-in-out]"
              />{' '}
              Pengalaman
            </button>
          </div>
        </Reveal>

        <Reveal direction="zoom" className="mt-10">
          <div className="mx-auto max-w-2xl">
            {items.map((item, index) => (
              <TimelineItem key={`${item.title}-${index}`} item={item} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
