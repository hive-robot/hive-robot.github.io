export type PeopleFilters = { role?: string; topic?: string; year?: number; q?: string }
export type PubFilters = { year?: number; venue?: string; topic?: string; first?: string; q?: string }
export type EventFilters = { type?: string; q?: string }

export function parseNumber(v?: string | null) {
  if (!v) return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

export function toSearchParams(obj: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(obj)) if (v !== undefined && v !== '') sp.set(k, String(v))
  return sp
}

