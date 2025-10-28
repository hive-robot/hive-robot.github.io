import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'quiet'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export default function Button({ className, variant = 'primary', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/60'
  const styles: Record<Variant, string> = {
    primary: 'bg-brand-500 text-ink-900 hover:bg-brand-600 active:bg-brand-600',
    secondary: 'border border-brand-500 text-ink-900 hover:bg-brand-50',
    quiet: 'underline text-ink-900/80 hover:text-ink-900'
  }
  return <button className={cn(base, styles[variant], className)} {...props} />
}

