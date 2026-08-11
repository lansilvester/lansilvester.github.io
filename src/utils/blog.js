export function formatPostDate(date, locale = 'id-ID') {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}
