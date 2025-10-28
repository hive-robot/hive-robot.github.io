import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import { allPosts } from 'contentlayer/generated'

export default function BlogPage() {
  const posts = allPosts.filter((post) => post.category !== 'News')
  return (
    <Container className="py-10">
      <SectionTitle title="博客与指南" />
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, index) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="reveal-card rounded-2xl border border-line p-4 transition hover:shadow-lg"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="text-sm text-ink-500">{new Date(p.date).toLocaleDateString()}</div>
            <div className="mt-1 font-semibold">{p.title}</div>
            <div className="mt-1 text-xs">{p.category}</div>
          </a>
        ))}
      </div>
    </div>
    </Container>
  )
}
