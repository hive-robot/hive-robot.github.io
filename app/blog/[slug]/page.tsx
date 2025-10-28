import Image from 'next/image'
import { useMemo } from 'react'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Container from '@/components/layout/Container'
import TableOfContents from '@/components/blog/TableOfContents'
import { allPosts } from 'contentlayer/generated'
import { cn } from '@/lib/utils'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const toPlainText = (children: any): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(toPlainText).join('')
  if (children?.props?.children) return toPlainText(children.props.children)
  return ''
}

const extractHeadings = (source: string) => {
  const regex = /^#{2,3}\s+(.+)$/gm
  const seen = new Map<string, number>()
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = regex.exec(source))) {
    const [full, rawText] = match
    const level = full.startsWith('###') ? 3 : 2
    const baseText = rawText.replace(/[`*_~<>\[\]]/g, '').trim()
    if (!baseText) continue
    const baseSlug = slugify(baseText) || 'section'
    const count = seen.get(baseSlug) ?? 0
    seen.set(baseSlug, count + 1)
    const id = count ? `${baseSlug}-${count}` : baseSlug
    headings.push({ id, text: baseText, level })
  }
  return headings
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((entry) => entry.slug === params.slug)
  if (!post) return notFound()

  const headings = useMemo(() => extractHeadings(post.body.raw ?? ''), [post.body.raw])

  const idsByText = useMemo(() => {
    const map = new Map<string, string[]>()
    headings.forEach((heading) => {
      const list = map.get(heading.text) ?? []
      list.push(heading.id)
      map.set(heading.text, list)
    })
    return map
  }, [headings])

  const mdxComponents = useMemo(() => {
    const usage = new Map<string, number>()
    return {
      h2: (props: any) => {
        const text = toPlainText(props.children)
        const list = idsByText.get(text) ?? []
        const index = usage.get(text) ?? 0
        usage.set(text, index + 1)
        const id = list[index] ?? slugify(text || 'section')
        return (
          <h2 id={id} {...props} className={cn('mt-12 text-2xl font-semibold text-ink-900', props.className)}>
            {props.children}
          </h2>
        )
      },
      h3: (props: any) => {
        const text = toPlainText(props.children)
        const list = idsByText.get(text) ?? []
        const index = usage.get(text) ?? 0
        usage.set(text, index + 1)
        const id = list[index] ?? slugify(text || 'section')
        return (
          <h3 id={id} {...props} className={cn('mt-8 text-xl font-semibold text-ink-900', props.className)}>
            {props.children}
          </h3>
        )
      },
    }
  }, [headings, idsByText])

  const MDX = useMDXComponent(post.body.code)

  return (
    <Container className="py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
        <div className="flex-1">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-ink-900">{post.title}</h1>
            <div className="mt-1 text-sm text-ink-500">{new Date(post.date).toLocaleDateString()} • {post.category}</div>
          </div>
          {post.cover ? (
            <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-line">
              <Image
                src={post.cover}
                alt={post.title}
                width={1200}
                height={630}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}
          <article className="prose prose-ink mt-6 mx-auto max-w-3xl">
            <MDX components={mdxComponents} />
          </article>
        </div>
        <TableOfContents headings={headings} />
      </div>
    </Container>
  )
}
