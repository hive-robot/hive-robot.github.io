'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export type NavLinkProps = {
  href: string
  label: string
  active?: boolean
  external?: boolean
  onClick?: () => void
  className?: string
}

export default function NavLink({ href, label, active = false, external, onClick, className }: NavLinkProps) {
  const baseClasses = cn(
    'relative inline-flex items-center px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900',
    className
  )
  const indicatorClasses = cn(
    'absolute bottom-0 left-0 right-0 origin-center scale-x-0 rounded-full bg-brand-500 transition-transform duration-200 h-[2px]',
    active && 'scale-x-100'
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cn(baseClasses, active && 'text-ink-900')} onClick={onClick}>
        {label}
        <span className={indicatorClasses} aria-hidden />
      </a>
    )
  }

  return (
    <Link href={href} className={cn(baseClasses, active && 'text-ink-900')} onClick={onClick}>
      {label}
      <span className={indicatorClasses} aria-hidden />
    </Link>
  )
}
