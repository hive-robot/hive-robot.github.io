'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { useState, type KeyboardEvent } from 'react'
import { Person } from 'contentlayer/generated'
import { cn, getLocalizedName, initials } from '@/lib/utils'

type PeopleLuminaCardProps = {
  p: Person
  lang?: 'en' | 'zh'
  className?: string
  style?: CSSProperties
}

export default function PeopleLuminaCard({ p, lang = 'zh', className, style }: PeopleLuminaCardProps) {
  const name = getLocalizedName(p.name_en, p.name_zh, lang, p.name)
  const avatarName = p.name_en || p.name
  const tags = p.topics ?? p.areas ?? []
  const summary = (p.summary || '').trim()
  const [flipped, setFlipped] = useState(false)

  const renderAvatar = () => {
    if (p.photo) {
      return (
        <Image
          src={p.photo}
          alt={avatarName ?? '成员头像'}
          width={120}
          height={120}
          className="h-28 w-28 rounded-full object-cover"
        />
      )
    }
    return <span className="text-2xl font-semibold text-amber-700">{initials(avatarName)}</span>
  }

  const handleToggle = () => setFlipped((prev) => !prev)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  const stopPropagation = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
  }

  return (
    <article
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      style={style}
      aria-pressed={flipped}
      className={cn(
        'group relative h-full min-h-[360px] cursor-pointer rounded-3xl border border-amber-200/70 bg-gradient-to-b from-white via-amber-50/40 to-amber-100/60 text-center shadow-lg shadow-amber-100/60 transition duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-amber-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60',
        className
      )}
    >
      <div className="relative h-full w-full" style={{ perspective: '1200px' }}>
        <div
          className={cn(
            'relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]',
            flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
          )}
        >
          <div
            className="absolute inset-0 flex flex-col items-center gap-4 p-6 [backface-visibility:hidden]"
            style={{ transform: 'rotateY(0deg)' }}
          >
            <div className="relative flex h-32 w-32 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-amber-200/50 blur-2xl" aria-hidden />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/80 bg-white shadow-[0_4px_24px_rgba(252,211,77,0.35)]">
                {renderAvatar()}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-ink-900">{name}</h3>
            <div className="text-sm font-medium text-amber-700">{[p.title, p.org].filter(Boolean).join(' · ')}</div>

            {tags.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-amber-700">
              {p.links?.homepage || p.links?.github ? (
                <a
                  className="underline-offset-4 hover:underline"
                  href={(p.links?.homepage ?? p.links?.github) ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stopPropagation}
                >
                  访问主页
                </a>
              ) : null}
              {p.scholar ? (
                <a
                  className="underline-offset-4 hover:underline"
                  href={p.scholar}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stopPropagation}
                >
                  学术主页
                </a>
              ) : null}
              {p.website ? (
                <a
                  className="underline-offset-4 hover:underline"
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stopPropagation}
                >
                  个人网站
                </a>
              ) : null}
              {p.email ? (
                <a
                  className="underline-offset-4 hover:underline"
                  href={p.email.startsWith('mailto:') ? p.email : `mailto:${p.email}`}
                  onClick={stopPropagation}
                >
                  邮箱
                </a>
              ) : null}
            </div>

            <span className="text-xs text-ink-400">点击卡片查看简介</span>
          </div>

          <div
            className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-3xl bg-gradient-to-br from-amber-100 via-white to-amber-200/80 p-6 [backface-visibility:hidden]"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="text-left text-sm leading-6 text-ink-700">
              <h4 className="text-base font-semibold text-ink-900">简介</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-700">
                {summary || '暂无简介，欢迎与我们联系。'}
              </p>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setFlipped(false)
              }}
              className="self-end rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
