import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'

export default function ContactPage() {
  return (
    <Container className="py-10">
      <SectionTitle title="联系我们" />
      <p className="prose">邮箱：contact@example.com • 地址：学术大道 123 号</p>
    </Container>
  )
}
