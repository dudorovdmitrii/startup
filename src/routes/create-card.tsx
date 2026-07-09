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
          <label htmlFor="file-upload" className="inline-flex items-center justify-center rounded-full border-0 py-2 px-4 text-sm font-semibold cursor-pointer bg-violet-50 text-violet-700 hover:bg-violet-100">
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
            // Placeholder: Check if image and concept are selected
            if (!uploadedImage) {
              alert('Пожалуйста, загрузите изображение товара.');
              return;
            }
            if (!selectedConceptId) {
              alert('Пожалуйста, выберите концепцию.');
              return;
            }
            const url = await generateCard();
            setGeneratedImageUrl(url);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-6 py-3 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] cursor-pointer"
        >
          Сгенерировать
        </button>

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
