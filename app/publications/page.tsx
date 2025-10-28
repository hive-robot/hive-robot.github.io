import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import { allPublications } from 'contentlayer/generated'
import PublicationsClient from './PublicationsClient'

// 静态页面，不在服务端读取 searchParams，避免动态渲染限制
export const dynamic = 'error'

export default function PublicationsPage() {
  return (
    <Container className="py-10">
      <SectionTitle title="论文成果" />
      <PublicationsClient publications={allPublications as any} />
    </Container>
  )
}
