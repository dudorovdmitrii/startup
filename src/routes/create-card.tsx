import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-card')({
  component: () => (
    <div className="p-2">
      <h3>Страница создания карточки</h3>
      <p>Здесь будет логика для создания карточек.</p>
    </div>
  ),
})
