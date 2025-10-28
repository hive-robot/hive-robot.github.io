export type MenuItem = {
  labelZh: string
  labelEn: string
  href: string
  external?: boolean
}

export const defaultMenu: MenuItem[] = [
  { labelZh: '首页', labelEn: '首页', href: '/' },
  { labelZh: '新闻动态', labelEn: '新闻动态', href: '/news' },
  { labelZh: '论文成果', labelEn: '论文成果', href: '/publications' },
  { labelZh: '团队成员', labelEn: '团队成员', href: '/people' },
  { labelZh: '博客文章', labelEn: '博客文章', href: '/blog' },
  { labelZh: '加入我们', labelEn: '加入我们', href: '/join' },
]

export const normalizePath = (value: string | undefined | null): string => {
  if (!value) return '/'
  if (value === '/') return '/'
  return value.replace(/\/+$/, '') || '/'
}

export const isActivePath = (pathname: string, href: string): boolean => {
  const current = normalizePath(pathname)
  const target = normalizePath(href)

  if (target === '/') {
    return current === '/' || current === '/en' || current === '/zh'
  }

  return current === target || current.startsWith(`${target}/`)
}

export const withLocale = (lang: 'zh' | 'en', path: string) => {
  if (path.startsWith('/zh') || path.startsWith('/en')) return path
  if (path === '/') return lang === 'zh' ? '/zh' : '/en'
  return lang === 'zh' ? `/zh${path}` : `/en${path}`
}
