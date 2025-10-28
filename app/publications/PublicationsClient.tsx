'use client'
import Script from 'next/script'
import FilterBar from '@/components/filters/FilterBar'
import SearchBox from '@/components/filters/SearchBox'
import PublicationCard from '@/components/cards/PublicationCard'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { publicationSchema } from '@/lib/schema'

type Pub = {
  id: string
  title: string
  year?: number
  venue?: string
  tags?: string[]
  authors: string[]
}

export default function PublicationsClient({ publications }: { publications: Pub[] }) {
  const sp = useSearchParams()
  const q = (sp.get('q') || '').toLowerCase()
  const year = sp.get('year') ? Number(sp.get('year')) : undefined
  const venue = sp.get('venue') || undefined
  const topic = sp.get('topic') || undefined
  const first = (sp.get('first') || '').toLowerCase() || undefined

  const { pubs, venues, years, topics } = useMemo(() => {
    let list = [...publications]
    if (year) list = list.filter(p => p.year === year)
    if (venue) list = list.filter(p => p.venue === venue)
    if (topic) list = list.filter(p => p.tags?.includes(topic))
    if (first) list = list.filter(p => (p.authors?.[0] || '').toLowerCase().includes(first))
    if (q) list = list.filter(p => [p.title, p.venue, ...(p.tags||[]), ...p.authors].join(' ').toLowerCase().includes(q))

    const venues = Array.from(new Set(publications.map(p => p.venue).filter(Boolean))) as string[]
    const years = Array.from(new Set(publications.map(p => p.year).filter(Boolean))) as number[]
    const topics = Array.from(new Set(publications.flatMap(p => p.tags || [])))

    return { pubs: list, venues, years, topics }
  }, [publications, q, year, venue, topic, first])

  return (
    <>
      <Script id="ld-pubs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pubs.slice(0,10).map(publicationSchema)) }} />
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <FilterBar venueOptions={venues.map(v => ({ label: v, value: v }))} yearOptions={[...years].sort((a,b)=>b-a).map(y => ({ label: String(y), value: y }))} topicOptions={topics.map(t => ({ label: t, value: t }))} firstAuthor />
        <div className="ml-auto" />
        <SearchBox placeholder="搜索论文" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pubs.map((p, index) => (
          <PublicationCard
            key={p.id}
            p={p as any}
            className="reveal-card h-full"
            style={{ animationDelay: `${index * 60}ms` }}
          />
        ))}
      </div>
    </>
  )
}

