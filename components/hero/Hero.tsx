import Image from 'next/image'
import Container from '@/components/layout/Container'
import logo from '@/public/logo.png'

export default function Hero({ slogan = 'HIVE GROUP' }: { slogan?: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-200 via-brand-100 to-brand-50">
      <Container className="flex flex-col items-start gap-10 py-16 md:flex-row md:items-center md:justify-between md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {slogan}
          </h1>
          <p className="mt-4 max-w-2xl text-ink-700">我们是一群喜欢折腾具身智能的爱好者。
做项目、搞实验、拍Demo、写代码，也聊理想。
如果你对机器人、交互感知、3D视觉这些方向有兴趣，
想和志同道合的伙伴一起动手做点“真东西”，
欢迎加入我们的兴趣小组，一起探索智能世界的边界。</p>
        </div>
        <div className="flex w-full max-w-[220px] justify-center md:max-w-[260px]">
          <Image src={logo} alt="HIVE Group logo" priority className="h-auto w-full max-w-[220px] md:max-w-[260px]" />
        </div>
      </Container>
    </div>
  )
}
