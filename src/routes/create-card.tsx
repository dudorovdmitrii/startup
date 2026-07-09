import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/create-card')({
  component: CreateCardPage,
})

const concepts = [
  { id: 'studio', name: 'Студийная съёмка', images: ['/shirts.webp', '/shirts_2.webp', '/shirts_3.webp'], description: 'Чистый фон, идеальное освещение' },
  { id: 'model', name: 'На модели', images: ['/concept_1.webp', '/concept_1_2.webp', '/concept_1_3.webp'], description: 'Показываем товар в использовании' },
  { id: 'lifestyle', name: 'Лайфстайл', images: ['/concept_2.webp', '/concept_2_2.webp', '/concept_2_3.webp'], description: 'Товар в реальной обстановке' },
]

function CreateCardPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Placeholder for image generation
  const generateCard = async () => {
    // Simulate API call
    return new Promise<string>(resolve => {
      setTimeout(() => {
        // Return a static image for now, as requested
        resolve('/placeholder.jpg'); // Assuming placeholder.jpg exists in public/
      }, 1000);
    });
  }

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <h3 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
        Создать карточку
      </h3>
      <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
        Загрузите фото товара, выберите концепцию и сгенерируйте карточку для маркетплейса.
      </p>

      {/* Step 1: Upload Image */}
      <section className="island-shell rise-in rounded-2xl p-6 mb-8">
        <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">1. Загрузите фото товара</h4>
        <div className="flex items-center space-x-4">
          <label htmlFor="file-upload" className="inline-flex items-center justify-center rounded-full border-0 py-2 px-4 text-sm font-semibold cursor-pointer bg-[color-mix(in_oklab,var(--lagoon),transparent_90%)] text-[var(--lagoon-deep)] hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_80%)]">
            Выберите файл
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setUploadedImage(URL.createObjectURL(e.target.files[0]));
                setFileName(e.target.files[0].name);
              } else {
                setFileName('');
              }
            }}
            className="sr-only"
          />
          <span className="text-sm text-gray-500">{fileName || 'Файл не выбран'}</span>
        </div>
        {uploadedImage && (
          <div className="mt-4">
            <p className="text-sm text-[var(--sea-ink-soft)]">Загруженное изображение:</p>
            <img src={uploadedImage} alt="Uploaded product" className="mt-2 h-48 w-48 object-contain rounded-lg shadow-md" />
          </div>
        )}
      </section>

      {/* Step 2: Select Concept */}
      <section className="island-shell rise-in rounded-2xl p-6 mb-8">
        <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">2. Выберите концепцию</h4>
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
        <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">3. Сгенерировать карточку</h4>
        <button
          onClick={async () => {
            if (!uploadedImage) {
              alert('Пожалуйста, загрузите изображение товара.');
              return;
            }
            if (!selectedConceptId) {
              alert('Пожалуйста, выберите концепцию.');
              return;
            }
            setIsLoading(true);
            try {
              const url = await generateCard();
              setGeneratedImageUrl(url);
            } finally {
              setIsLoading(false);
            }
          }}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold no-underline transition
            ${isLoading || !uploadedImage || !selectedConceptId
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600'
              : 'border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] text-[var(--lagoon-deep)] hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer'
            }`}disabled={isLoading || !uploadedImage || !selectedConceptId}
        >
          {isLoading ? 'Генерация...' : 'Сгенерировать'}
          {isLoading && (
            <svg className="animate-spin h-5 w-5 text-[var(--lagoon-deep)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </button>
        {!uploadedImage && !isLoading && <span className="ml-4 text-sm text-red-500">Пожалуйста, загрузите фото товара.</span>}
        {uploadedImage && !selectedConceptId && !isLoading && <span className="ml-4 text-sm text-red-500">Пожалуйста, выберите концепцию.</span>}

        {generatedImageUrl && (
          <div className="mt-8">
            <h4 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">Сгенерированная карточка</h4>
            <img src={generatedImageUrl} alt="Generated Card" className="h-96 w-96 object-contain rounded-lg shadow-md" />
            {/* Download button or further editing options can go here */}
          </div>
        )}
      </section>
    </div>
  )
}
