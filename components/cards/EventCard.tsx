import type { CSSProperties } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Event } from 'contentlayer/generated'
import { cn, formatDate, isUpcoming } from '@/lib/utils'

type EventCardProps = {
  e: Event
  className?: string
  style?: CSSProperties
}

export default function EventCard({ e, className, style }: EventCardProps) {
  const upcoming = isUpcoming(e.date)
  const primaryHref = e.signup || e.replay || e.slides || ''
  const primaryLabel = e.signup ? '立即报名' : e.replay ? '观看回放' : '查看幻灯'
  return (
    <article
      style={style}
      className={cn('rounded-2xl border border-line overflow-hidden bg-white transition shadow-sm hover:shadow-lg', className)}
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-brand-200 to-brand-50">
        {e.cover && <Image src={e.cover} alt={e.title} fill className="object-cover" />}
        <div className="absolute top-2 left-2">
          <Badge className={upcoming ? '' : 'bg-brand-300'}>{upcoming ? '即将开始' : '往期回顾'}</Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {e.kind && <Badge>{e.kind}</Badge>}
          <span className="text-sm text-ink-500">{formatDate(e.date)}</span>
        </div>
        <h3 className="font-semibold leading-snug">{e.title}</h3>
        <div className="text-sm text-ink-500 mt-1">{[e.location, e.org].filter(Boolean).join(' • ')}</div>
        {primaryHref && <a href={primaryHref} className="inline-block mt-3"><Button variant="primary">{primaryLabel}</Button></a>}
      </div>
    </article>
  )
}
