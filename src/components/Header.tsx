import { Link, useRouterState } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { pathname } = useRouterState()
  const hideNavigation = pathname === '/create-card'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            CardFlow
          </Link>
        </h2>

        {!hideNavigation && (
          <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
            <a href="#how-it-works" className="nav-link">
              Как это работает
            </a>
            <a href="#pricing" className="nav-link">
              Тарифы
            </a>
          </div>
        )}

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <a
            href="#cta"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-1.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Попробовать
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
