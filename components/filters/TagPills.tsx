export default function TagPills({ tags = [] }: { tags?: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(t => (
        <span key={t} className="rounded-full bg-brand-50 text-ink-700 border border-brand-200 px-2 py-1 text-xs">{t}</span>
      ))}
    </div>
  )
}

