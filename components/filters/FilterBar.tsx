'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { parseNumber } from '@/lib/filters'

type Option = { label: string; value: string | number }

export default function FilterBar({
  roleOptions = [], topicOptions = [], venueOptions = [], yearOptions = [], firstAuthor = false
}: {
  roleOptions?: Option[]; topicOptions?: Option[]; venueOptions?: Option[]; yearOptions?: Option[]; firstAuthor?: boolean
}) {
  const router = useRouter()
  const sp = useSearchParams()

  const onChange = (key: string, v?: string) => {
    const url = new URL(window.location.href)
    if (v && v !== 'all') url.searchParams.set(key, v)
    else url.searchParams.delete(key)
    router.replace(url.pathname + '?' + url.searchParams.toString())
  }

  const role = sp.get('role') || 'all'
  const topic = sp.get('topic') || 'all'
  const venue = sp.get('venue') || 'all'
  const year = sp.get('year') || 'all'
  const first = sp.get('first') || ''

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {roleOptions.length > 0 && (
        <select className="rounded-2xl border border-line px-3 py-2" value={role} onChange={e => onChange('role', e.target.value)}>
          <option value="all">全部身份</option>
          {roleOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )}
      {venueOptions.length > 0 && (
        <select className="rounded-2xl border border-line px-3 py-2" value={venue} onChange={e => onChange('venue', e.target.value)}>
          <option value="all">全部会议</option>
          {venueOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )}
      {topicOptions.length > 0 && (
        <select className="rounded-2xl border border-line px-3 py-2" value={topic} onChange={e => onChange('topic', e.target.value)}>
          <option value="all">全部主题</option>
          {topicOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )}
      {yearOptions.length > 0 && (
        <select className="rounded-2xl border border-line px-3 py-2" value={year} onChange={e => onChange('year', e.target.value)}>
          <option value="all">全部年份</option>
          {yearOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )}
      {firstAuthor && (
        <input
          className="rounded-2xl border border-line px-3 py-2"
          placeholder="第一作者姓名"
          defaultValue={first}
          onChange={e => onChange('first', e.target.value || undefined)}
        />
      )}
    </div>
  )
}
