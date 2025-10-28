import Button from './Button'

export default function EmptyState({ title = 'No results', cta }: { title?: string; cta?: { label: string; onClick?: () => void; href?: string } }) {
  return (
    <div className="text-center border border-dashed border-line rounded-2xl p-8">
      <div className="text-lg font-medium mb-2">{title}</div>
      {cta && (cta.href ? <a href={cta.href}><Button variant="secondary">{cta.label}</Button></a> : <Button variant="secondary" onClick={cta.onClick}>{cta.label}</Button>)}
    </div>
  )
}

