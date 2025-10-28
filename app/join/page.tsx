import Container from '@/components/layout/Container'
import SectionTitle from '@/components/ui/SectionTitle'

export default function JoinPage() {
  return (
    <Container className="py-10">
      <SectionTitle title="加入我们" />
      <div className="space-y-10 text-sm leading-7 text-ink-700">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink-900">团队简介</h2>
          <p>
            我们是一支由 22–23 届机电与 AI 方向同学组成的研究兴趣小组，秉持「在做中学、在研中长」的理念。
            团队氛围轻松、开放，没有门槛，注重成长。
          </p>
          <p>
            目前正在开展具身智能、三维视觉和机器人方向的研究实践，
            并计划在未来半年内向多个学术会议投稿。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink-900">你将获得</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>系统化的科研入门指导（阅读、复现、写作、投稿）</li>
            <li>理论与实践结合的研究训练路径</li>
            <li>从协作到独立研究的成长机会</li>
            <li>共同完成高质量研究成果与论文发表</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-ink-900">我们希望你</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-ink-800">基本条件</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>对机器人与具身智能（Robotics &amp; Embodied AI）方向感兴趣</li>
                <li>具备一定的深度学习基础（Python / PyTorch）</li>
                <li>有持续学习与探索的热情</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-ink-800">加分项</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>了解机器人控制或 ROS 系统</li>
                <li>熟悉 NumPy、矩阵与张量计算</li>
                <li>了解 Transformer 或 Diffusion 等主流架构</li>
                <li>具备良好的 Python 代码与调试能力</li>
                <li>愿意交流、分享想法、协作解决问题</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink-900">加入方式</h2>
          <p>
            请准备一份简短的个人简历（无需复杂排版），
            介绍你的学习背景与研究兴趣，并发送至邮箱：
          </p>
          <a
            href="mailto:kola337599@gmail.com"
            className="inline-flex items-center text-brand-700 font-medium underline-offset-4 hover:underline"
          >
            kola337599@gmail.com
          </a>
          <p>
            我们全年开放申请，欢迎对具身智能、数字人和机器人方向感兴趣的同学加入，
            一起探索研究与实践的更多可能。
          </p>
        </section>
      </div>
    </Container>
  )
}
