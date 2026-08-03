function parseScalar(v) {
  const value = v.trim()
  if (!value) return ''
  if (value === 'true') return true
  if (value === 'false') return false
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((s) => parseScalar(s))
      .filter((s) => s !== '')
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

// Parser YAML-subset untuk frontmatter artikel blog (dibuat oleh Decap CMS).
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const block = match[1]
  const content = match[2]
  const data = {}
  let currentKey = null

  for (const line of block.split(/\r?\n/)) {
    const listItem = line.match(/^\s*-\s+(.+)$/)
    const keyValue = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = []
      data[currentKey].push(parseScalar(listItem[1]))
    } else if (keyValue) {
      currentKey = keyValue[1]
      data[currentKey] = parseScalar(keyValue[2])
    }
  }

  return { data, content }
}
