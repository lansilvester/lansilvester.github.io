import Reveal from './Reveal'

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <Reveal>
        <h2 className="text-2xl font-semibold text-title sm:text-3xl">{title}</h2>
      </Reveal>
      <Reveal delay={100}>
        <span className="mt-2 block text-sm text-muted">{subtitle}</span>
      </Reveal>
    </div>
  )
}
