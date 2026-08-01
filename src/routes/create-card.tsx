import { userStore } from '#/store/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export const Route = createFileRoute('/create-card')({
  component: CreateCardPage,
})

const concepts = [
  {
    id: 'studio',
    name: 'Студийная съёмка',
    images: ['/shirts.webp', '/shirts_2.webp', '/shirts_3.webp'],
    description: 'Чистый фон, идеальное освещение',
  },
  {
    id: 'model',
    name: 'На модели',
    images: ['/concept_1.webp', '/concept_1_2.webp', '/concept_1_3.webp'],
    description: 'Показываем товар в использовании',
  },
  {
    id: 'lifestyle',
    name: 'Лайфстайл',
    images: ['/concept_2.webp', '/concept_2_2.webp', '/concept_2_3.webp'],
    description: 'Товар в реальной обстановке',
  },
]

function CreateCardPage() {
  const isLoggedin = useSelector(userStore, (state) => state.isLoggedIn)
  const navigate = useNavigate()

  // Если уже залогинены — сразу на /create-card
  useEffect(() => {
    if (!isLoggedin) {
      navigate({ to: '/login', replace: true })
    }
  }, [navigate, isLoggedin])

  return isLoggedin ? <_CreateCardPage /> : null
}

function _CreateCardPage() {
  const [images, setImages] = useState<{ url: string; file: File }[]>([])
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(
    null,
  )
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(false)
  const isLoggedin = useSelector(userStore, (state) => state.isLoggedIn)
  const navigate = useNavigate()

  // Если уже залогинены — сразу на /create-card
  useEffect(() => {
    if (!isLoggedin) {
      navigate({ to: '/login', replace: true })
    }
  }, [navigate, isLoggedin])

  // Placeholder for image generation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 4 - images.length)
      const newImages = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const generateCard = async () => {
    // Simulate API call
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        // Return a static image for now, as requested
        resolve('/placeholder.jpg') // Assuming placeholder.jpg exists in public/
      }, 1000)
    })
  }

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <h3 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
        Создать карточку
      </h3>
      <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
        Загрузите фото товара, выберите концепцию и сгенерируйте карточку для
        маркетплейса.
      </p>

      {/* Step 1: Upload Image */}
      <section className="island-shell rise-in rounded-2xl p-6 mb-8">
        <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">
          1. Загрузите фото товара (до 4 шт.)
        </h4>
        <div className="flex items-center space-x-4">
          {images.length < 4 && (
            <>
              <label
                htmlFor="file-upload"
                className="inline-flex items-center justify-center rounded-full border-0 py-2 px-4 text-sm font-semibold cursor-pointer bg-[color-mix(in_oklab,var(--lagoon),transparent_90%)] text-[var(--lagoon-deep)] hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_80%)]"
              >
                Выберите файлы
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="sr-only"
              />
            </>
          )}
          <span className="text-sm text-[var(--sea-ink-soft)]">
            Загружено: {images.length} / 4
          </span>
        </div>
        {images.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-[var(--sea-ink-soft)] mb-3">
              Загруженные изображения:
            </p>
            <div className="flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={`Uploaded ${index + 1}`}
                    className="h-32 w-32 object-cover rounded-lg shadow-md border border-[var(--line)]"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-[var(--destructive)] text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                    title="Удалить"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Step 2: Select Concept */}
      <section className="island-shell rise-in rounded-2xl p-6 mb-8">
        <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">
          2. Выберите концепцию
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${selectedConceptId === concept.id
                  ? 'border-[var(--lagoon-deep)] shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setSelectedConceptId(concept.id)}
            >
              <img
                src={concept.images[0]}
                alt={concept.name}
                className="mb-2 h-48 w-full object-cover rounded-md"
              />
              <p className="text-center text-sm font-semibold text-[var(--sea-ink)]">
                {concept.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3: Generate Card */}
      <section className="island-shell rise-in rounded-2xl p-6 mb-8">
        <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">
          3. Сгенерировать карточку
        </h4>
        <button
          onClick={async () => {
            if (images.length === 0) {
              alert('Пожалуйста, загрузите изображение товара.')
              return
            }
            if (!selectedConceptId) {
              alert('Пожалуйста, выберите концепцию.')
              return
            }
            setIsLoading(true)
            try {
              const url = await generateCard()
              setGeneratedImageUrl(url)
            } finally {
              setIsLoading(false)
            }
          }}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold no-underline transition
            ${isLoading || images.length === 0 || !selectedConceptId
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600'
              : 'border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] text-[var(--lagoon-deep)] hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer'
            }`}
          disabled={isLoading || images.length === 0 || !selectedConceptId}
        >
          {isLoading ? 'Генерация...' : 'Сгенерировать'}
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-[var(--lagoon-deep)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
        {images.length === 0 && !isLoading && (
          <span className="ml-4 text-sm text-red-500">
            Пожалуйста, загрузите фото товара.
          </span>
        )}
        {images.length > 0 && !selectedConceptId && !isLoading && (
          <span className="ml-4 text-sm text-red-500">
            Пожалуйста, выберите концепцию.
          </span>
        )}

        {generatedImageUrl && (
          <div className="mt-8">
            <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">
              Сгенерированная карточка
            </h4>
            <img
              src={generatedImageUrl}
              alt="Generated Card"
              className="h-96 w-96 object-contain rounded-lg shadow-md"
            />
            {/* Download button or further editing options can go here */}
          </div>
        )}
      </section>
    </div>
  )
}
