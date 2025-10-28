import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import PeopleGrid from '@/components/people/PeopleGrid'
import FoundersSection from '@/components/founders/FoundersSection'
import { allPeople } from 'contentlayer/generated'

export default function PeoplePage() {
  const people = allPeople

  return (
    <Container className="py-10 space-y-12">
      <FoundersSection className="mb-4" />
      <section aria-labelledby="people-title" className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ink-400">MEMBERS 成员</p>
          <SectionTitle title="团队成员" id="people-title" className="mb-0" />
          <p className="max-w-3xl text-sm text-ink-600">覆盖博士生、硕士生、本科生与合作伙伴；按姓氏排序展示。</p>
        </div>
        <PeopleGrid people={people} />
      </section>
    </Container>
  )
}
