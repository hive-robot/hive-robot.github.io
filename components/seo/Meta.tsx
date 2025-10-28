import Head from 'next/head'

export default function Meta({ title, description, og }: { title?: string; description?: string; og?: string }) {
  const t = title ? `${title} – Lumina × Calgary` : 'Lumina × Calgary'
  const d = description || 'Academic lab website'
  const ogImg = og || '/og/default.png'
  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={ogImg} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

