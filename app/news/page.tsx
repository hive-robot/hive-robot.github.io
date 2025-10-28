import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import { allPosts } from 'contentlayer/generated'

export default function NewsPage() {
  const news = allPosts
    .filter((p) => p.category === 'News')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return (
    <Container className="py-10">
      <SectionTitle title="新闻动态" />
      {news.length > 0 ? (
        <div className="space-y-3 mx-auto max-w-3xl">
          {news.map((n, index) => (
            <a
              key={n.slug}
              href={`/news/${n.slug}`}
              className="reveal-card block rounded-2xl border border-line p-4 transition hover:shadow-lg"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="text-sm text-ink-500">{new Date(n.date).toLocaleDateString()}</div>
              <div className="mt-1 font-semibold">{n.title}</div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-500">暂未发布新闻，敬请期待。</p>
      )}
    </Container>
  )
}
