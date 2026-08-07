import { ADOBE_LOGOS, TECH_LOGOS } from '../../data/logos'
import { findLogo } from '../../utils/skillLogo'

export default function SkillLogo({ skill, mode, size = 20 }) {
  const logos = mode === 'creative' ? ADOBE_LOGOS : TECH_LOGOS
  const logo = findLogo(skill, logos)
  const fallback = String(skill).charAt(0).toUpperCase()

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-md text-white"
      style={{ width: size, height: size, backgroundColor: logo ? logo.bg : 'rgba(148, 163, 184, 0.2)' }}
      title={skill}
      aria-hidden="true"
    >
      {logo ? (
        logo.d ? (
          <svg viewBox="0 0 24 24" width={size * 0.7} height={size * 0.7} fill={logo.color} aria-hidden="true">
            <path d={logo.d} />
          </svg>
        ) : (
          <span className="font-bold leading-none" style={{ color: logo.color, fontSize: size * 0.4 }}>
            {logo.code}
          </span>
        )
      ) : (
        <span className="font-bold leading-none text-slate-400" style={{ fontSize: size * 0.4 }}>
          {fallback}
        </span>
      )}
    </span>
  )
}
