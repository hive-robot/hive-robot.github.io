'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBox({ placeholder = '搜索' }: { placeholder?: string }) {
  const router = useRouter()
  const sp = useSearchParams()
  const q = sp.get('q') || ''
  return (
    <input
      aria-label={placeholder}
      className="w-full md:w-64 rounded-2xl border border-line px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/60"
      placeholder={placeholder}
      defaultValue={q}
      onChange={e => {
        const url = new URL(window.location.href)
        const v = e.target.value
        if (v) url.searchParams.set('q', v); else url.searchParams.delete('q')
        router.replace(url.pathname + '?' + url.searchParams.toString())
      }}
    />
  )
}
