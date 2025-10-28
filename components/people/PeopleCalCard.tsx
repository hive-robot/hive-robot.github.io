import type { CSSProperties } from 'react'
import { Person } from 'contentlayer/generated'
import PeopleLuminaCard from './PeopleLuminaCard'

type PeopleCalCardProps = {
  p: Person
  lang?: 'en' | 'zh'
  className?: string
  style?: CSSProperties
}

export default function PeopleCalCard({ p, lang = 'zh', className, style }: PeopleCalCardProps) {
  const merged = {
    ...p,
    topics: p.topics ?? p.areas ?? []
  }
  return <PeopleLuminaCard p={merged} lang={lang} className={className} style={style} />
}
