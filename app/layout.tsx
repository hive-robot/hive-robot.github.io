import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { orgSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'HIVE Group',
  description: '具身智能与交互研究的开放创研小组',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body className="antialiased bg-bgsoft text-ink-900">
        <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }} />
        <Navbar />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
