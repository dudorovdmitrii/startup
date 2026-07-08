import { createFileRoute } from '@tanstack/react-router'
import { Upload, Palette, Type, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({ component: App })

const howItWorksSteps = [
  {
    title: 'Загрузите фото товара',
    description: 'Начните с загрузки вашего фото товара. Мы покажем, как оно будет выглядеть сгенерированной карточке.',
    component: (selectedConceptId: string | null, concepts: any[], selectedImageIndex: number) => (
      <div className="flex flex-col items-center justify-center space-y-4">
        <img src="/shirts.webp" alt="Шаг 1: Загрузка фото" className="h-48 w-48 object-contain rounded-lg shadow-md" />
        <p className="text-sm text-center text-[var(--sea-ink-soft)]">
          Представьте, что это ваше загруженное фото.
        </p>
      </div>
    ),
  },
  {
    title: 'Выберите концепцию',
    description: 'Выберите одну из представленных концепций. Каждая концепция предлагает уникальный стиль оформления.',
    component: (selectedConceptId: string | null, concepts: any[], selectedImageIndex: number, setSelectedConceptId: (id: string) => void, setSelectedImageIndex: (index: number) => void) => (
      <div className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${selectedConceptId === concept.id
                ? 'border-[var(--lagoon-deep)] shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => { setSelectedConceptId(concept.id); setSelectedImageIndex(0); }}
            >
              <img
                src={concept.images[0]}
                alt={concept.name}
                className="mb-2 h-32 w-full object-cover rounded-md"
              />
              <p className="text-center text-sm font-semibold text-[var(--sea-ink)]">
                {concept.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Отредактируйте текст',
    description: 'Выберите один из трех вариантов дизайна вашей карточки с уже измененным текстом.',
    component: (selectedConceptId: string | null, concepts: any[], selectedImageIndex: number, setSelectedConceptId: (id: string) => void, setSelectedImageIndex: (index: number) => void) => {
      const selectedConcept = concepts.find(c => c.id === selectedConceptId);
      if (!selectedConcept) {
        return <p className="text-center text-[var(--sea-ink-soft)]">Выберите концепцию на шаге 2.</p>;
      }
      return (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={selectedConcept.images[selectedImageIndex]}
            alt="Сгенерированная карточка"
            className="h-64 w-64 object-contain rounded-lg shadow-md"
          />
          <div className="flex space-x-2 p-2 bg-gray-100 border border-gray-300 rounded-md">
            {selectedConcept.images.map((image: string, index: number) => (
              <img
                key={image}
                src={image}
                alt={`Вариант ${index + 1}`}
                className={`cursor-pointer h-20 w-20 object-cover rounded-md border-2 ${selectedImageIndex === index ? 'border-[var(--lagoon-deep)]' : 'border-gray-200'
                  }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
      );
    },
  },
] as const

const features = [
  {
    icon: Sparkles,
    title: 'Готово за минуты',
    description: 'Не нужен дизайнер или Photoshop — ИИ создаст карточку автоматически.',
  },
  {
    icon: ShoppingBag,
    title: 'Под любой маркетплейс',
    description: 'Шаблоны под требования Ozon, Wildberries и других площадок.',
  },
  {
    icon: Type,
    title: 'Полный контроль текста',
    description: 'Редактируйте каждую надпись на изображении прямо в браузере.',
  },
] as const

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Concept options with their details
  const concepts = [
    { id: 'studio', name: 'Студийная съёмка', images: ['/shirts.webp', '/shirts_2.webp', '/shirts_3.webp'], description: 'Чистый фон, идеальное освещение' },
    { id: 'model', name: 'На модели', images: ['/concept_1.webp', '/concept_1_2.webp', '/concept_1_3.webp'], description: 'Показываем товар в использовании' },
    { id: 'lifestyle', name: 'Лайфстайл', images: ['/concept_2.webp', '/concept_2_2.webp', '/concept_2_3.webp'], description: 'Товар в реальной обстановке' },
  ]

  useEffect(() => {
    if (selectedConceptId) {
      setSelectedImageIndex(0);
    }
  }, [selectedConceptId]);
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      {/* Hero */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Генератор карточек для маркетплейсов</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Продающие карточки за&nbsp;минуты
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Загрузите фото товара, выберите стиль оформления и отредактируйте текст
          на&nbsp;карточке. Никакого дизайна с нуля — готовые шаблоны для Ozon
          и&nbsp;Wildberries.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Создать карточку
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            Как это работает
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-14">
        <p className="island-kicker mb-2 text-center">Примеры использования</p>
        <h2 className="display-title mb-8 text-center text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          Как это работает
        </h2>

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Step Navigation */}
          <div className="flex space-x-4">
            {howItWorksSteps.map((step, index) => (
              <button
                key={step.title}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${currentStep === index
                  ? 'bg-[rgba(79,184,178,0.24)] text-[var(--lagoon-deep)]'
                  : 'bg-gray-100 text-[var(--sea-ink-soft)] hover:bg-gray-200'
                  }`}
                onClick={() => setCurrentStep(index)}
              >
                Шаг {index + 1}
              </button>
            ))}
          </div>

          {/* Step Content */}
          <div className="island-shell feature-card rise-in rounded-2xl p-6 w-full max-w-3xl min-h-[300px] flex flex-col items-center justify-center">
            <h3 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {howItWorksSteps[currentStep].title}
            </h3>
            <p className="m-0 mb-4 text-sm leading-relaxed text-[var(--sea-ink-soft)] text-center">
              {howItWorksSteps[currentStep].description}
            </p>
            <div className="mt-4">
              {howItWorksSteps[currentStep].component(
                selectedConceptId,
                concepts,
                selectedImageIndex,
                setSelectedConceptId,
                setSelectedImageIndex
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            {currentStep > 0 && (
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Предыдущий шаг
              </button>
            )}
            {currentStep < howItWorksSteps.length - 1 && (
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Следующий шаг
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-14">
        <p className="island-kicker mb-2 text-center">Преимущества</p>
        <h2 className="display-title mb-8 text-center text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          Почему CardFlow
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="island-shell feature-card rise-in rounded-2xl p-5"
              style={{ animationDelay: `${index * 100 + 80}ms` }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(47,106,74,0.1)] text-[var(--palm)]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-[var(--sea-ink)]">
                {feature.title}
              </h3>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section id="cta" className="island-shell mt-14 rounded-[2rem] p-8 text-center sm:p-12">
        <h2 className="display-title mb-4 text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          Готовы создать первую карточку?
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-base text-[var(--sea-ink-soft)]">
          Загрузите фото товара и получите готовую карточку для маркетплейса
          за&nbsp;пару минут.
        </p>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-6 py-3 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
        >
          Начать бесплатно
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
