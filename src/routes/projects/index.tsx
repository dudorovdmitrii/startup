import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, Image as ImageIcon } from 'lucide-react'

// Мокированные данные проектов (соответствуют ProjectListItem из openapi.yaml)
const mockProjects = [
  {
    id: 'proj_123',
    title: 'Летнее платье',
    output_type: 'photo',
    thumb_url: '/shirts.webp',
  },
  {
    id: 'proj_124',
    title: 'Кроссовки',
    output_type: 'card',
    thumb_url: '/concept_1.webp',
  },
]

export const Route = createFileRoute('/projects/')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <div className="page-wrap px-4 pb-8 pt-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="display-title text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          Мои проекты
        </h1>
        <Link
          to="/create-card"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Новый проект
        </Link>
      </div>

      {mockProjects.length === 0 ? (
        <div className="island-shell rise-in flex flex-col items-center justify-center rounded-2xl p-12 text-center border border-[var(--line)] border-dashed">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--lagoon),transparent_90%)] text-[var(--lagoon-deep)]">
            <ImageIcon className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-[var(--sea-ink)]">
            У вас пока нет проектов
          </h2>
          <p className="mb-6 max-w-md text-sm text-[var(--sea-ink-soft)]">
            Создайте свой первый проект, загрузив фото товара, и ИИ сгенерирует
            для вас продающие карточки.
          </p>
          <Link
            to="/create-card"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--lagoon-deep)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-90"
          >
            Создать проект
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProjects.map((project, i) => (
            <Link
              key={project.id}
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              className="island-shell rise-in group block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--sand)]">
                {project.thumb_url ? (
                  <img
                    src={project.thumb_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[var(--sea-ink-soft)]">
                    <ImageIcon className="h-10 w-10 opacity-30" />
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-[var(--line)]">
                <h3 className="mb-1 truncate text-base font-semibold text-[var(--sea-ink)] group-hover:text-[var(--lagoon-deep)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--sea-ink-soft)] uppercase tracking-wider">
                  {project.output_type === 'card'
                    ? 'Карточка'
                    : project.output_type === 'photo'
                      ? 'Фото'
                      : project.output_type || 'Черновик'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
