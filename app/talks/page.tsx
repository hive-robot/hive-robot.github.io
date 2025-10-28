import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import EventCard from '@/components/cards/EventCard'
import { allEvents } from 'contentlayer/generated'
import { isUpcoming } from '@/lib/utils'
import Script from 'next/script'
import { eventSchema } from '@/lib/schema'

export default function TalksPage() {
  const talks = allEvents.filter(e => e.kind === 'Talk')
  const upcoming = talks.filter(e => isUpcoming(e.date))
  const past = talks.filter(e => !isUpcoming(e.date))
  return (
    <Container className="py-10">
      <SectionTitle title="学术报告" />
      <Script id="ld-talks" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(talks.slice(0,10).map(eventSchema)) }} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((e, index) => (
          <EventCard key={e.id} e={e} className="reveal-card h-full" style={{ animationDelay: `${index * 60}ms` }} />
        ))}
      </div>
      <SectionTitle title="往期回顾" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {past.map((e, index) => (
          <EventCard key={e.id} e={e} className="reveal-card h-full" style={{ animationDelay: `${index * 60}ms` }} />
        ))}
      </div>
    </Container>
  )
}
