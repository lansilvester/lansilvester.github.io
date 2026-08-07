import Reveal from './Reveal'

export default function SectionTitle({ title, subtitle, className = '', subtitleClassName = '' }) {
  return (
    <div className="text-center">
      <Reveal>
        <h2 className={`text-2xl font-semibold text-title sm:text-3xl ${className}`.trim()}>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <span className={`mt-2 block text-sm text-muted ${subtitleClassName}`.trim()}>
          {subtitle}
        </span>
      </Reveal>
    </div>
  )
}
