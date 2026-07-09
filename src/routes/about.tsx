import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Checkbox } from '#/components/ui/checkbox'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const [checked, setChecked] = useState(false)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>

        <label className="mt-6 flex items-center gap-2 text-sm text-[var(--sea-ink)]">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} />
          Test checkbox — {checked ? 'on' : 'off'}
        </label>
      </section>
    </main>
  )
}
