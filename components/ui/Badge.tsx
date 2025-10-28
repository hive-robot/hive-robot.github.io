import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full bg-brand-100 text-ink-900 px-2 py-0.5 text-xs', className)}>
      {children}
    </span>
  )
}

