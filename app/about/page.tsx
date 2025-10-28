import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'

export default function AboutPage() {
  return (
    <Container className="py-10">
      <SectionTitle title="关于我们" />
      <p className="prose">我们是一支兼顾美学与实用性的研究团队，此处为关于页面的占位内容，后续将补充详细介绍。</p>
    </Container>
  )
}
