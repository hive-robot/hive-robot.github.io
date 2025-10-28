'use client'
import { usePathname, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function LangSwitcher({ current }: { current: 'en' | 'zh' }) {
  const pathname = usePathname()
  const router = useRouter()
  const to = current === 'en' ? 'zh' : 'en'
  const nextPath = (() => {
    if (!pathname) return `/${to}`
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length === 0) return `/${to}`
    parts[0] = to
    return '/' + parts.join('/')
  })()
  const buttonLabel = to === 'zh' ? '切换至中文' : '切换至英文'
  return (
    <Button variant="secondary" onClick={() => router.push(nextPath)} aria-label="切换界面语言">
      {buttonLabel}
    </Button>
  )
}
