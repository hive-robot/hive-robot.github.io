export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function isUpcoming(iso: string) {
  const today = new Date()
  today.setHours(0,0,0,0)
  return new Date(iso) >= today
}

export function getYear(iso?: string | number) {
  if (!iso) return undefined
  if (typeof iso === 'number') return iso
  return new Date(iso).getFullYear()
}

export function initials(name?: string | null) {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  return parts
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function getLocalizedName(nameEn?: string | null, nameZh?: string | null, lang: string = 'en', fallback?: string) {
  if (lang === 'zh' && nameZh) {
    return nameEn ? `${nameZh} (${nameEn})` : nameZh
  }
  return nameEn || fallback || nameZh || ''
}

