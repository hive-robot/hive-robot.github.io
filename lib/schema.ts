import { allPublications, allEvents } from 'contentlayer/generated'

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lumina × Calgary Lab',
    url: 'https://example.local',
    sameAs: ['https://twitter.com/example'],
  }
}

export function publicationSchema(p: typeof allPublications[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: p.title,
    datePublished: p.year?.toString(),
    author: p.authors?.map(a => ({ '@type': 'Person', name: a })),
    url: `https://example.local/publications/${p.id}`,
  }
}

export function eventSchema(e: typeof allEvents[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    startDate: e.date,
    location: e.location,
    url: `https://example.local/events/${e.id}`,
  }
}

