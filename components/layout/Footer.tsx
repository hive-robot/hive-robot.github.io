const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-bgsoft">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-ink-500 sm:px-6">
        © {currentYear} HIVE Group. 版权所有。
      </div>
    </footer>
  )
}
