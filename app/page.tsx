import Hero from '@/components/hero/Hero'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import PublicationCard from '@/components/cards/PublicationCard'
import { allPosts, allPublications } from 'contentlayer/generated'

export default function Home() {
  const latestNews = allPosts
    .filter((p) => p.category === 'News')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1)
  const selectedPubs = allPublications.slice(0,6)
  const joinContent = {
    title: '加入团队',
    heading: '与我们一起探索具身智能研究。',
    points: [
      '我们是一群对「具身智能」充满好奇的人。',
      '不分年级、不限背景，只要你想做点有趣的事。',
      '随时欢迎聊聊想法、加入活动或参与协作项目。'
    ],
    linkLabel: '联系团队',
    timelineTitle: '加入方式',
    timelineDescription: '全年开放报名，按兴趣参与组会、共创项目。',
    timeline: [
      { label: '全年开放', value: '随时欢迎加入' },
      { label: '参与形式', value: '组会 · 协作项目' }
    ]
  }

  const fundingContent = {
    title: '合作与支持',
    heading: 'HIVE Group 是一个专注于具身智能相关方向的学生兴趣小组。',
    description: '我们相信科研的意义在于传承与共进——从带学弟学妹入门，到一起复现论文、讨论想法、做出原型。',
    body: [
      '目前团队仍处在自发探索阶段，一切研究与开发都由成员独立完成。',
      '感谢目前支持我们的合作方：深圳大学、香港科技大学（广州）、比亚迪（奖学金项目）等，他们的信任让我们更有勇气探索未来。',
      '如果你也想参与——无论是科研合作、资源支持、技术交流，还是一次分享与指导——都欢迎随时联系我们，共同推动具身智能走得更远。'
    ],
    contact: 'kola337599@gmail.com'
  }

  const researchThemes = [
    {
      title: '机器人',
      description: '聚焦人机协作与具身操作的感知-控制一体化研究，打造面向真实场景的灵巧机器人能力。'
    },
    {
      title: '世界模型',
      description: '构建多模态世界模型，学习对环境的长期记忆与可泛化表征，支撑推理与规划。'
    },
    {
      title: '三维视觉',
      description: '研究 3D 感知、重建与场景理解，探索多视角融合与精准定位的视觉算法。'
    },
    {
      title: '视频理解与生成',
      description: '面向复杂动态场景进行视频理解与生成，推动行为预测与内容创作的协同发展。'
    }
  ]

  return (
    <div>
      <Hero />

      <Container className="py-10">
        <section>
          <SectionTitle title="最新动态" />
          {latestNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((n, index) => (
              <a
                key={n.slug}
                href={`/news/${n.slug}`}
                className="reveal-card rounded-2xl border border-line p-4 transition hover:shadow-lg"
                style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="text-sm text-ink-500">{new Date(n.date).toLocaleDateString()}</div>
                  <div className="mt-1 font-semibold">{n.title}</div>
                  <div className="mt-1 text-xs">{n.category}</div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-500">暂时没有新闻，敬请期待！</p>
          )}
        </section>

        <section className="mt-12">
          <SectionTitle title="代表论文" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedPubs.map((p, index) => (
              <PublicationCard
                key={p.id}
                p={p}
                className="reveal-card h-full"
                style={{ animationDelay: `${index * 80}ms` }}
              />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle title="研究主题" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {researchThemes.map((theme, index) => (
              <div
                key={theme.title}
                className="reveal-card rounded-2xl border border-line bg-white p-4"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="font-semibold">{theme.title}</div>
                <p className="text-sm text-ink-500 mt-1">{theme.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle title={joinContent.title} />
          <div className="grid gap-6 rounded-2xl border border-line bg-white p-6 md:grid-cols-[1.8fr,1.2fr]">
            <div className="reveal-card space-y-4" style={{ animationDelay: '40ms' }}>
              <h3 className="text-xl font-semibold text-ink-900">{joinContent.heading}</h3>
              {joinContent.description ? (
                <p className="text-sm text-ink-600 leading-6">{joinContent.description}</p>
              ) : null}
              {joinContent.points.length ? (
                <ul className="space-y-3 text-sm leading-7 text-ink-700">
                  {joinContent.points.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <a className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 underline-offset-4 hover:underline" href="/join">
                {joinContent.linkLabel}
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="reveal-card rounded-2xl border border-dashed border-line/70 bg-brand-50/40 p-5 text-sm text-ink-700" style={{ animationDelay: '80ms' }}>
              <h4 className="text-base font-semibold text-ink-900">{joinContent.timelineTitle}</h4>
              <p className="mt-2 text-ink-600">{joinContent.timelineDescription}</p>
              <div className="mt-4 space-y-2">
                {joinContent.timeline.map((item) => (
                  <div key={item.label} className="rounded-xl border border-line/80 bg-white px-4 py-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-400">{item.label}</div>
                    <div className="mt-1 text-sm font-medium text-ink-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle title={fundingContent.title} />
          <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
            <h3 className="text-lg font-semibold text-ink-900">{fundingContent.heading}</h3>
            <p className="text-sm leading-7 text-ink-600">{fundingContent.description}</p>
            <div className="space-y-3 text-sm leading-7 text-ink-700">
              {fundingContent.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 border-t border-line pt-4 text-sm leading-7 text-ink-700">
              <h4 className="text-base font-semibold text-ink-900">支持我们</h4>
              <p className="mt-2 text-sm leading-7 text-ink-700">请将意向或合作想法发送至：</p>
              <a href={`mailto:${fundingContent.contact}`} className="inline-flex items-center text-brand-700 font-medium underline-offset-4 hover:underline">
                📮 {fundingContent.contact}
              </a>
              <p className="mt-2 text-xs text-ink-500">每一次交流，都是我们成长的一部分。</p>
            </div>
          </div>
        </section>

      </Container>
    </div>
  )
}
