import { cn } from '@/lib/utils'

type SectionTitleProps = {
  title: string
  subtitle?: string
  id?: string
  className?: string
  headingClassName?: string
}

export default function SectionTitle({ title, subtitle, id, className, headingClassName }: SectionTitleProps) {
  return (
    <div className={cn('mb-6', className)}>
      <h2 id={id} className={cn('text-2xl font-semibold tracking-tight', headingClassName)}>
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-ink-500">{subtitle}</p> : null}
    </div>
  )
}
