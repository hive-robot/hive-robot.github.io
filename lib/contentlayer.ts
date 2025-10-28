import { allPeople, allPublications, allPosts, allEvents } from 'contentlayer/generated'

export const people = allPeople
export const publications = allPublications
export const posts = allPosts
export const events = allEvents

export type SearchableDocument =
  | (typeof publications)[number]
  | (typeof people)[number]
  | (typeof posts)[number]
  | (typeof events)[number]

export const getAllDocuments = (): SearchableDocument[] => {
  return [...publications, ...people, ...posts, ...events]
}

export const collectTags = () => {
  const tagSet = new Set<string>()
  for (const doc of getAllDocuments()) {
    const tags = (doc as any).tags as string[] | undefined
    if (!tags) continue
    for (const tag of tags) tagSet.add(tag)
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
}

export const collectYears = () => {
  const years = new Set<number>()
  for (const pub of publications) {
    if (pub.year) years.add(pub.year)
  }
  return Array.from(years).sort((a, b) => b - a)
}
