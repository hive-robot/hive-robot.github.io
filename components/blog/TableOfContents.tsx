'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const sanitizedHeadings = useMemo(() => headings.filter((heading) => heading.id), [headings])
  const pathname = usePathname()
  const [activeId, setActiveId] = useState<string>(() => sanitizedHeadings[0]?.id ?? '')
  const activeIdRef = useRef(activeId)
  activeIdRef.current = activeId

  useEffect(() => {
    setActiveId(sanitizedHeadings[0]?.id ?? '')
  }, [pathname, sanitizedHeadings])

  useEffect(() => {
    if (!sanitizedHeadings.length) return

    const OFFSET = 120
    const rafRef = { current: 0 }

    const updateActiveHeading = () => {
      const scrollPosition = window.scrollY + OFFSET
      const scrollBottom = window.innerHeight + window.scrollY
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      )

      if (Math.abs(documentHeight - scrollBottom) < 2) {
        const lastId = sanitizedHeadings[sanitizedHeadings.length - 1]?.id
        if (lastId && activeIdRef.current !== lastId) setActiveId(lastId)
        return
      }

      let currentId = sanitizedHeadings[0]?.id ?? ''

      for (const heading of sanitizedHeadings) {
        const element = document.getElementById(heading.id)
        if (!element) continue

        const top = element.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= top) {
          currentId = heading.id
        } else {
          break
        }
      }

      if (currentId && activeIdRef.current !== currentId) {
        setActiveId(currentId)
      }
    }

    const scheduleUpdate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateActiveHeading)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [sanitizedHeadings])

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const element = document.getElementById(id)
    if (!element) return

    const OFFSET = 100
    const top = element.getBoundingClientRect().top + window.scrollY - OFFSET

    window.history.replaceState(null, '', `#${id}`)
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
    setActiveId(id)
  }, [])

  if (!sanitizedHeadings.length) return null

  return (
    <aside className="sticky top-24 hidden h-full w-64 flex-shrink-0 lg:block">
      <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-ink-900">目录</h2>
        <nav className="mt-3 space-y-2 text-xs leading-5 text-ink-600">
          {sanitizedHeadings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(event) => handleClick(event, heading.id)}
              className={cn(
                'block rounded-md px-2 py-1 transition hover:text-ink-900 hover:bg-amber-50',
                activeId === heading.id && 'bg-amber-100/80 text-ink-900 font-semibold'
              )}
              style={{ paddingLeft: heading.level === 3 ? '1.5rem' : '0.75rem' }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
