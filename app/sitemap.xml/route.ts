import { allPosts } from 'contentlayer/generated'

export function GET() {
  const base = 'https://example.local'
  const urls = [
    `${base}/en`, `${base}/zh`,
    `${base}/en/people`, `${base}/zh/people`,
    `${base}/en/publications`, `${base}/zh/publications`,
    `${base}/en/blog`, `${base}/zh/blog`,
    ...allPosts.flatMap(p => [`${base}/en/blog/${p.slug}`, `${base}/zh/blog/${p.slug}`])
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map(u => `\n  <url><loc>${u}</loc></url>`).join('') +
    `\n</urlset>`
  return new Response(xml, { headers: { 'content-type': 'application/xml' } })
}

