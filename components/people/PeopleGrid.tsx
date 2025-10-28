import { Person } from 'contentlayer/generated'
import PeopleLuminaCard from './PeopleLuminaCard'
import PeopleCalCard from './PeopleCalCard'

const roleOrder: Record<string, number> = { PI: 0, Faculty: 1, PhD: 2, Master: 3, Undergrad: 4, Alumni: 5 }

const getSurnameKey = (person: Person) => {
  const english = person.name_en ?? person.name
  if (english) {
    const parts = english.split(/\s+/).filter(Boolean)
    if (parts.length) {
      return parts[parts.length - 1].toLowerCase()
    }
  }
  if (person.name_zh) {
    return person.name_zh.slice(0, 1)
  }
  return (person.name ?? '').toLowerCase()
}

const getFullNameKey = (person: Person) => {
  const english = person.name_en ?? person.name
  if (english) return english.toLowerCase()
  if (person.name_zh) return person.name_zh
  return person.name ?? ''
}

function chooseLayout(p: Person): 'lumina'|'cal' {
  if (p.layout === 'lumina') return 'lumina'
  if (p.layout === 'cal') return 'cal'
  if (p.cover || p.summary || (p.highlights && p.highlights.length > 0)) return 'lumina'
  return 'cal'
}

export default function PeopleGrid({ people, lang = 'zh' }: { people: Person[]; lang?: 'en'|'zh' }) {
  const sorted = [...people].sort((a,b) => {
    const orderDiff = (roleOrder[a.role] ?? 9) - (roleOrder[b.role] ?? 9)
    if (orderDiff !== 0) return orderDiff
    const surnameDiff = getSurnameKey(a).localeCompare(getSurnameKey(b))
    if (surnameDiff !== 0) return surnameDiff
    return getFullNameKey(a).localeCompare(getFullNameKey(b))
  })
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((person, index) => {
        const sharedProps = {
          p: person,
          lang,
          className: 'reveal-card h-full',
          style: { animationDelay: `${index * 80}ms` }
        }
        return chooseLayout(person) === 'lumina'
          ? <PeopleLuminaCard key={person.id} {...sharedProps} />
          : <PeopleCalCard key={person.id} {...sharedProps} />
      })}
    </div>
  )
}
