import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="page page--not-found" aria-label="Страница не найдена">
      <h1>404</h1>
      <p>Страница не найдена.</p>
      <Link to="/">На главную</Link>
    </main>
  )
}
