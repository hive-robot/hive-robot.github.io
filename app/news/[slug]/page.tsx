import Container from '@/components/layout/Container'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = allPosts.find((post) => post.slug === params.slug && post.category === 'News')

  if (!article) {
    return notFound()
  }

  const MDX = useMDXComponent(article.body.code)

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold text-ink-900">{article.title}</h1>
      <div className="text-sm text-ink-500 mt-1">{new Date(article.date).toLocaleDateString()}</div>
      <article className="prose mt-6">
        <MDX />
      </article>
    </Container>
  )
}
