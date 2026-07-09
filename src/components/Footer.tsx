export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} CardFlow. Все права защищены.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#how-it-works" className="nav-link">
            Как это работает
          </a>
          <a href="#pricing" className="nav-link">
            Тарифы
          </a>
        </div>
      </div>
    </footer>
  )
}
