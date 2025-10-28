'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import NavLink from '@/components/nav/NavLink'
import { defaultMenu, isActivePath, normalizePath } from '@/lib/route'
import type { MenuItem } from '@/lib/route'

export type NavBarProps = {
  lang?: 'zh'
  sticky?: boolean
  className?: string
  menu?: MenuItem[]
}

export default function Navbar({ lang = 'zh', sticky = true, className, menu }: NavBarProps) {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const items = useMemo(() => menu ?? defaultMenu, [menu])

  useEffect(() => {
    if (!sticky) return
    const handler = () => setScrolled(window.scrollY > 8)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [sticky])

  const containerClasses = cn(
    sticky && 'sticky top-0 z-50',
    'w-full bg-white/95 backdrop-blur-sm shadow-[inset_0_-1px_0_var(--line)] transition-shadow',
    scrolled && 'shadow-sm',
    className
  )

  const currentPath = normalizePath(pathname)

  useEffect(() => {
    setSheetOpen(false)
  }, [currentPath])

  return (
    <header className={containerClasses}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="返回首页">
          <Image src="/logo.svg" alt="HIVE Group 标志" width={32} height={32} className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-wide text-ink-900">HIVE Group</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.labelZh}
              active={isActivePath(currentPath, normalizePath(item.href))}
            />
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-700 md:hidden"
          aria-label="展开或折叠菜单"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      {sheetOpen ? (
        <div className="md:hidden border-t border-line bg-white shadow-sm">
          <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.labelZh}
                    active={isActivePath(currentPath, normalizePath(item.href))}
                    onClick={() => setSheetOpen(false)}
                    className="w-full rounded-lg px-3 py-2 text-base hover:bg-amber-50"
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
