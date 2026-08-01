import { createFileRoute, Link } from '@tanstack/react-router'
import { Upload, Palette, Type, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({ component: App })

const pricingPlans = [
  {
    name: 'Базовый',
    description: 'Идеально для начинающих продавцов.',
    price: '0₽',
    features: [
      '5 генераций в месяц',
      'Стандартные шаблоны',
      'Базовая поддержка',
    ],
  },
  {
    name: 'Профи',
    description: 'Для активных продавцов на маркетплейсах.',
    price: '990₽',
    features: [
      '50 генераций в месяц',
      'Расширенные шаблоны',
      'Приоритетная поддержка',
      'История генераций',
    ],
  },
  {
    name: 'Бизнес',
    description: 'Для крупных брендов и больших объемов.',
    price: '2990₽',
    features: [
      'Неограниченные генерации',
      'Все шаблоны',
      'Премиум поддержка 24/7',
      'Командный доступ',
      'Индивидуальные интеграции',
    ],
  },
]

const howItWorksSteps = [
  {
    title: 'Загрузите фото товара',
    description: 'Начните с загрузки вашего фото товара. Мы покажем, как будет выглядеть сгенерированная карточка.',
    component: (selectedConceptId: string | null, concepts: any[], selectedImageIndex: number) => (
      <div className="flex flex-col items-center justify-between space-y-4 h-full">
        <img src="/shirts.webp" alt="Шаг 1: Загрузка фото" className="h-71 object-contain rounded-lg" />
      </div>
    ),
  },
  {
    title: 'Выберите концепцию',
    description: 'Выберите одну из представленных концепций. Каждая концепция предлагает уникальный стиль оформления.',
    component: (selectedConceptId: string | null, concepts: any[], selectedImageIndex: number, setSelectedConceptId: (id: string) => void, setSelectedImageIndex: (index: number) => void) => (
      <div className="flex flex-col space-y-2 h-full w-full p-1">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            className={`cursor-pointer rounded-lg p-1 transition-all duration-200 flex items-center w-full ${selectedConceptId === concept.id
              ? 'outline-2 outline-[var(--lagoon-deep)]' : ''}`}
            onClick={() => { setSelectedConceptId(concept.id); setSelectedImageIndex(0); }}>
            <img
              src={concept.images[0]}
              alt={concept.name}
              className="h-20 w-16 object-cover rounded-md mr-2"
            />
            <p className="text-sm font-semibold text-[var(--sea-ink)]">
              {concept.name}
            </p>
          </div>
        ))}
      </div>
    )
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
        <div className="flex flex-row space-x-2 h-full w-full">
          {/* Vertical list of small photos */}
          <div className="flex flex-col space-y-2 h-full justify-center p-1">
            {selectedConcept.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-200 p-1 rounded-md
                  ${selectedImageIndex === index ? 'outline-2 outline-[var(--lagoon-deep)]' : ''}
                `}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Вариант ${index + 1}`}
                  className="h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Large selected photo */}
          <div className="flex flex-grow">
            <img
              src={selectedConcept.images[selectedImageIndex]}
              alt="Сгенерированная карточка"
              className="h-71 object-contain rounded-lg"
            />
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
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>('studio')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Concept options with their details
  const concepts = [
    { id: 'studio', name: 'Студийная съёмка', images: ['/shirts.webp', '/shirts_2.webp', '/shirts_3.webp'], description: 'Чистый фон, идеальное освещение' },
    { id: 'model', name: 'На модели', images: ['/concept_1.webp', '/concept_1_2.webp', '/concept_1_3.webp'], description: 'Показываем товар в использовании' },
    { id: 'lifestyle', name: 'Лайфстайл', images: ['/concept_2.webp', '/concept_2_2.webp', '/concept_2_3.webp'], description: 'Товар в реальной обстановке' },
  ]

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      {/* Hero */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-16">
        <p className="island-kicker mb-3">Генератор карточек для маркетплейсов</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Продающие карточки за&nbsp;минуты
        </h1>
        <p className="mb-8 max-w-3xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Загрузите фото товара, выберите стиль оформления и отредактируйте текст
          на&nbsp;карточке. Никакого дизайна с нуля — <span className="whitespace-nowrap">готовые шаблоны для <span>Ozon</span>&nbsp;и&nbsp;<span>Wildberries</span>.</span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/create-card"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer"
          >
            Создать карточку
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="rounded-full border border-[var(--line)] bg-[var(--foam)] px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--sea-ink-soft)] cursor-pointer"
            onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Как это работает
          </button>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-14">
        <h2 className="display-title mb-8 text-center text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          Как это работает
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className=" rise-in rounded-2xl p-2 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-[var(--sea-ink)]">
                {step.title}
              </h3>
              <p className="h-[100px] m-0 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
                {step.description}
              </p>
              <div className="mt-4 w-full overflow-hidden flex items-center justify-center">
                {step.component(
                  selectedConceptId,
                  concepts,
                  selectedImageIndex,
                  setSelectedConceptId,
                  setSelectedImageIndex
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-14">
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
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--lagoon),transparent_90%)] text-[var(--lagoon-deep)]">
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


      {/* Pricing */}
      <section id="pricing" className="mt-14">
        <h2 className="display-title mb-8 text-center text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          Выберите свой план
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.name}
              className="island-shell feature-card rise-in flex flex-col rounded-2xl p-6"
              style={{ animationDelay: `${index * 100 + 80}ms` }}
            >
              <h3 className="mb-2 text-xl font-semibold text-[var(--sea-ink)]">{plan.name}</h3>
              <p className="mb-4 text-sm text-[var(--sea-ink-soft)]">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--sea-ink)]">{plan.price}</span>
                <span className="text-lg text-[var(--sea-ink-soft)]">/месяц</span>
              </div>
              <ul className="mb-6 flex-grow space-y-2 text-sm text-[var(--sea-ink-soft)]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-[var(--lagoon-deep)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/create-card"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] px-6 py-3 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer mt-auto"
              >
                Начать с {plan.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
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
        <Link
          to="/create-card"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--lagoon)] bg-[color-mix(in_oklab,var(--lagoon),transparent_86%)] px-6 py-3 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--lagoon),transparent_76%)] cursor-pointer"
        >
          Начать бесплатно
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
