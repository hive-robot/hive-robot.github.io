import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import FilterBar from '@/components/filters/FilterBar'
import SearchBox from '@/components/filters/SearchBox'
import PublicationCard from '@/components/cards/PublicationCard'
import { allPublications } from 'contentlayer/generated'
import Script from 'next/script'
import { publicationSchema } from '@/lib/schema'

export default function PublicationsPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const q = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : ''
  const year = typeof searchParams.year === 'string' ? Number(searchParams.year) : undefined
  const venue = typeof searchParams.venue === 'string' ? searchParams.venue : undefined
  const topic = typeof searchParams.topic === 'string' ? searchParams.topic : undefined
  const first = typeof searchParams.first === 'string' ? searchParams.first.toLowerCase() : undefined

  let pubs = [...allPublications]
  if (year) pubs = pubs.filter(p => p.year === year)
  if (venue) pubs = pubs.filter(p => p.venue === venue)
  if (topic) pubs = pubs.filter(p => p.tags?.includes(topic))
  if (first) pubs = pubs.filter(p => (p.authors?.[0] || '').toLowerCase().includes(first))
  if (q) pubs = pubs.filter(p => [p.title, p.venue, ...(p.tags||[]), ...p.authors].join(' ').toLowerCase().includes(q))

  const venues = Array.from(new Set(allPublications.map(p => p.venue).filter(Boolean))) as string[]
  const years = Array.from(new Set(allPublications.map(p => p.year).filter(Boolean))) as number[]
  const topics = Array.from(new Set(allPublications.flatMap(p => p.tags || [])))

  return (
    <Container className="py-10">
      <SectionTitle title="论文成果" />
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
            p={p}
            className="reveal-card h-full"
            style={{ animationDelay: `${index * 60}ms` }}
          />
        ))}
      </div>
    </Container>
  )
}
