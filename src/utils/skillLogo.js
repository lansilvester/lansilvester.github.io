export function normalizeKeyword(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function matches(key, logo) {
  return (
    normalizeKeyword(logo.name) === key ||
    (logo.aliases && logo.aliases.some((alias) => normalizeKeyword(alias) === key)) ||
    (logo.code && normalizeKeyword(logo.code) === key)
  )
}

export function findLogo(keyword, logos) {
  const key = normalizeKeyword(keyword)
  if (!key) return null

  const direct = logos.find((logo) => matches(key, logo))
  if (direct) return direct

  const withoutParens = normalizeKeyword(String(keyword).replace(/\([^)]*\)/g, ''))
  if (withoutParens && withoutParens !== key) {
    const stripped = logos.find((logo) => matches(withoutParens, logo))
    if (stripped) return stripped
  }

  return null
}
