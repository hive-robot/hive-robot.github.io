import type { CSSProperties } from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import TagPills from '@/components/filters/TagPills'
import { Publication } from 'contentlayer/generated'
import { cn } from '@/lib/utils'

type PublicationCardProps = {
  p: Publication
  className?: string
  style?: CSSProperties
}

export default function PublicationCard({ p, className, style }: PublicationCardProps) {
  return (
    <article
      style={style}
      className={cn('rounded-2xl border border-line overflow-hidden bg-white transition shadow-sm hover:shadow-lg', className)}
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-brand-200 to-brand-50">
        {p.thumbnail && (
          <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-200 hover:scale-105" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {p.venue && <Badge>{p.venue}</Badge>}
          {p.year && <Badge>{p.year}</Badge>}
          {p.award && <Badge className="bg-brand-300">{p.award}</Badge>}
        </div>
        <h3 className="font-semibold leading-snug">{p.title}</h3>
        <div className="text-sm text-ink-500 mt-1">{p.authors.join(', ')}</div>
        <div className="flex flex-wrap gap-2 mt-3 text-xs font-medium text-amber-700">
          {p.paper ? (
            <a className="underline-offset-4 hover:underline" href={p.paper} target="_blank" rel="noreferrer">
              论文链接
            </a>
          ) : null}
          {p.code ? (
            <a className="underline-offset-4 hover:underline" href={p.code} target="_blank" rel="noreferrer">
              代码仓库
            </a>
          ) : null}
          {p.page ? (
            <a className="underline-offset-4 hover:underline" href={p.page} target="_blank" rel="noreferrer">
              项目页面
            </a>
          ) : null}
        </div>
        {p.tags && p.tags.length > 0 && <div className="mt-3"><TagPills tags={p.tags} /></div>}
      </div>
    </article>
  )
}
