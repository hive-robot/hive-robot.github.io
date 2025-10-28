'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import NavLink from '@/components/nav/NavLink'
import type { MenuItem } from '@/lib/route'
import { isActivePath, normalizePath } from '@/lib/route'
import { usePathname } from 'next/navigation'

export type MobileSheetProps = {
  open: boolean
  onClose: () => void
  menu: MenuItem[]
}

export default function MobileSheet({ open, onClose, menu }: MobileSheetProps) {
  const pathname = usePathname()
  const current = normalizePath(pathname ?? '/')

  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink-900/40" aria-hidden onClick={onClose} />
      <div className={cn('ml-auto flex h-full w-full max-w-xs flex-col gap-6 bg-white/98 p-6 backdrop-blur-sm shadow-xl')}
        role="dialog"
        aria-modal
      >
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-ink-900">导航菜单</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-700"
            aria-label="关闭菜单"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.labelZh}
                  active={isActivePath(current, normalizePath(item.href))}
                  onClick={onClose}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
