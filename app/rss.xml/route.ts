import { allPosts } from 'contentlayer/generated'

export function GET() {
  const base = 'https://example.local'
  const items = allPosts.map(p => `\n  <item>\n    <title>${p.title}</title>\n    <link>${base}/en/blog/${p.slug}</link>\n    <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n    <guid>${base}/posts/${p.slug}</guid>\n  </item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Lumina × Calgary RSS</title>\n  <link>${base}</link>\n  <description>Updates from the lab</description>${items}\n</channel>\n</rss>`
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml' } })
}

