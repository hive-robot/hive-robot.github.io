'use client'

import Image from 'next/image'
import foundersData from '@/data/founders.json'
import { cn } from '@/lib/utils'

type Founder = {
  name: string
  chineseName?: string
  title?: string
  bio?: string
  image: string
  links?: {
    homepage?: string
    scholar?: string
    github?: string
    email?: string
  }
  tags?: string[]
  adSlot?: boolean
}

const foundersList = (foundersData as Founder[]).slice(0, 6)

function MemberCard({ founder, index }: { founder: Founder; index: number }) {
  const fullName = founder.chineseName ? `${founder.chineseName} · ${founder.name}` : founder.name

  if (founder.adSlot) {
    return (
      <article
        className="reveal-card relative flex h-full flex-col justify-between gap-4 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-amber-100/70 p-6 text-center shadow-lg transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-amber-100/80"
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-700">
            合作/招募
          </span>
          <h3 className="text-xl font-bold tracking-tight text-amber-900">广告位招租 🌟</h3>
          <p className="text-sm leading-6 text-amber-800/80">
            想与 HIVE Group 共同探索新的研究方向或合作项目？我们欢迎志同道合的伙伴一起交流想法、共享资源、携手共创。
          </p>
        </div>
        <div className="space-y-2 text-sm text-amber-700">
          <a
            href="mailto:kola337599@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400 px-4 py-2 font-medium hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            联系我们 →
          </a>
          <p className="text-xs text-amber-600/80">全年开放合作窗口</p>
        </div>
      </article>
    )
  }

  const homepage = founder.links?.homepage ?? founder.links?.github
  const emailLink = (() => {
    const value = founder.links?.email
    if (!value) return null
    return value.startsWith('mailto:') ? value : `mailto:${value}`
  })()

  return (
    <article
      className="founders-card reveal-card group relative flex transform flex-col gap-4 rounded-2xl border border-amber-200/60 bg-gradient-to-b from-white via-amber-50/70 to-amber-100/60 p-6 shadow-lg shadow-amber-100/60 transition duration-300 ease-out hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-100/80 md:flex-row md:gap-6"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className="founders-media reveal-media shrink-0 overflow-hidden rounded-2xl border border-amber-200/80 bg-amber-50"
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <Image
          src={founder.image}
          alt={`${fullName} 照片`}
          width={220}
          height={260}
          className="founders-avatar h-[220px] w-full object-cover md:h-[240px] md:w-[180px]"
        />
      </div>

      <div className="flex min-h-[200px] flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">{fullName}</h3>
            {founder.title ? <p className="text-sm text-slate-500">{founder.title}</p> : null}
          </div>
          {founder.bio ? <p className="text-base leading-relaxed text-slate-700">{founder.bio}</p> : null}
          {founder.tags && founder.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {founder.tags.map((tag) => (
                <li key={tag} className="founders-chip inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {homepage ? (
            <a
              href={homepage}
              target="_blank"
              rel="noreferrer"
              className="founders-btn inline-flex items-center gap-2 rounded-full border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
              aria-label={`打开 ${fullName} 的个人主页`}
            >
              访问主页
              <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </a>
          ) : null}
          {founder.links?.scholar ? (
            <a href={founder.links.scholar} target="_blank" rel="noreferrer" className="text-sm font-medium text-amber-700 underline-offset-4 transition hover:text-amber-600 hover:underline">
              Google 学术
          </a>
        ) : null}
          {emailLink ? (
            <a href={emailLink} className="text-sm font-medium text-amber-700 underline-offset-4 transition hover:text-amber-600 hover:underline">
              邮箱
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function FoundersSection({ className }: { className?: string }) {
  if (!foundersList.length) return null

  return (
    <section
      id="founders"
      className={cn(
        'founders-section relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 px-6 py-12 sm:px-8',
        className
      )}
      aria-labelledby="founders-title"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-600/80">FOUNDERS 主创</p>
          <h2 id="founders-title" className="text-3xl font-bold tracking-tight text-slate-900">
            主创团队
          </h2>
          <p className="max-w-2xl text-sm text-amber-800/80">
            主创成员共同设计 HIVE 的长期愿景与落地路线。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {foundersList.map((founder, index) => (
            <MemberCard key={founder.name} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
