import { Link, useRouterState } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { useSelector } from '@tanstack/react-store'
import { userStore } from '#/store/store'

export default function Header() {
  const { location } = useRouterState()
  const hideNavigation = location.pathname !== '/'
  const isLoggedIn = useSelector(userStore, (state) => state.isLoggedIn)

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scroll down
        setIsVisible(false)
      } else {
        // Scroll up
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--lagoon)]" />
            CardFlow
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          {!hideNavigation && (
            <>
              <a href="#how-it-works" className="nav-link">
                Как это работает
              </a>
              <a href="#pricing" className="nav-link">
                Пакеты
              </a>
            </>
          )}
          {isLoggedIn && (
            <Link to="/projects" className="nav-link [&.active]:is-active">
              Мои проекты
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {!hideNavigation && (
            <Link
              to={isLoggedIn ? "/create-card" : "/login"}
              className="rounded-full border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] px-4 py-1.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)]"
            >
              Попробовать
            </Link>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
