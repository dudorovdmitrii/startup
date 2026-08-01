import { userStore } from '#/store/store'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { ArrowLeft, Image as ImageIcon, Download } from 'lucide-react'
import { useEffect } from 'react'

// Мокированные детали проекта (ProjectDetail)
const mockProjectDetails: Record<string, any> = {
  proj_123: {
    id: 'proj_123',
    title: 'Летнее платье',
    output_type: 'photo',
    category_id: 'cat_clothing',
    category_path: ['Одежда', 'Женская одежда', 'Платья'],
    images: [{ id: 'img_1', url: '/shirts.webp' }],
    results: [
      {
        id: 'res_1',
        output_type: 'photo',
        result_url: '/shirts.webp',
        thumb_url: '/shirts.webp',
      },
      {
        id: 'res_2',
        output_type: 'photo',
        result_url: '/shirts_2.webp',
        thumb_url: '/shirts_2.webp',
      },
      {
        id: 'res_3',
        output_type: 'photo',
        result_url: '/shirts_3.webp',
        thumb_url: '/shirts_3.webp',
      },
    ],
    thumb_url: '/shirts.webp',
  },
  proj_124: {
    id: 'proj_124',
    title: 'Кроссовки',
    output_type: 'card',
    category_id: 'cat_shoes',
    category_path: ['Обувь', 'Мужская обувь', 'Кроссовки'],
    images: [{ id: 'img_11', url: '/concept_1.webp' }],
    results: [
      {
        id: 'res_11',
        output_type: 'card',
        result_url: '/concept_1.webp',
        thumb_url: '/concept_1.webp',
      },
      {
        id: 'res_12',
        output_type: 'card',
        result_url: '/concept_1_2.webp',
        thumb_url: '/concept_1_2.webp',
      },
    ],
    thumb_url: '/concept_1.webp',
  },
}

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const isLoggedin = useSelector(userStore, (state) => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedin) {
      navigate({ to: '/login', replace: true })
    }
  }, [navigate, isLoggedin])

  return isLoggedin ? <_ProjectDetailPage /> : null
}

function _ProjectDetailPage() {
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename || 'download.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed', error)
      // Fallback
      const link = document.createElement('a')
      link.href = url
      link.download = filename || 'download.png'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const { projectId } = Route.useParams()
  const project = mockProjectDetails[projectId]

  if (!project) {
    return (
      <div className="page-wrap px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-[var(--sea-ink)]">
          Проект не найден
        </h2>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--lagoon-deep)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться к списку проектов
        </Link>
      </div>
    )
  }

  return (
    <div className="page-wrap px-4 pb-12 pt-8 rise-in">
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />К списку проектов
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--sea-ink)] mb-2">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--sea-ink-soft)]">
            <span className="rounded-full bg-[color-mix(in_oklab,var(--lagoon),transparent_90%)] px-2.5 py-0.5 font-medium text-[var(--lagoon-deep)] uppercase tracking-wider text-xs">
              {project.output_type === 'card'
                ? 'Карточка'
                : project.output_type === 'photo'
                  ? 'Фото'
                  : project.output_type}
            </span>
            {project.category_path?.length > 0 && (
              <span>Категория: {project.category_path.join(' / ')}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/create-card"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer"
          >
            Сгенерировать еще
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Исходники */}
        <div className="lg:col-span-1 space-y-6">
          <div className="island-shell rounded-2xl border border-[var(--line)] p-5">
            <h2 className="text-lg font-semibold text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[var(--sea-ink-soft)]" />
              Исходные фото
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {project.images.map((img: any, i: number) => (
                <div
                  key={img.id || i}
                  className="aspect-square rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--sand)]"
                >
                  <img
                    src={img.url}
                    alt={`Исходник ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Результаты генераций */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--sea-ink)] mb-4">
              Результаты генераций ({project.results.length})
            </h2>

            {project.results.length === 0 ? (
              <div className="island-shell flex flex-col items-center justify-center rounded-2xl border border-[var(--line)] border-dashed p-10 text-center">
                <p className="text-[var(--sea-ink-soft)] mb-4">
                  Здесь пока нет результатов. Запустите генерацию, чтобы
                  получить первые варианты.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.results.map((res: any) => (
                  <div
                    key={res.id}
                    className="island-shell group overflow-hidden rounded-xl border border-[var(--line)] transition-all hover:shadow-md"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--sand)] relative">
                      <img
                        src={res.result_url}
                        alt="Результат"
                        className="h-full w-full object-cover"
                      />

                      {/* Оверлей при наведении */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                        <button
                          onClick={() =>
                            handleDownload(
                              res.result_url,
                              `result-${res.id}.webp`,
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                          title="Скачать"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
