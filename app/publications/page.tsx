import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import { allPublications } from 'contentlayer/generated'
import PublicationsClient from './PublicationsClient'

// 强制静态化，客户端组件中处理筛选/搜索
export const dynamic = 'force-static'

export default function PublicationsPage() {
  return (
    <Container className="py-10">
      <SectionTitle title="论文成果" />
      <PublicationsClient publications={allPublications as any} />
    </Container>
  )
}
