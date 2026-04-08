import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { locale, t } = useLanguage()

  return (
    <main className="page page--not-found" lang={locale}>
      <h1>404</h1>
      <p>{t('notFound.message')}</p>
      <Link to="/">{t('notFound.home')}</Link>
    </main>
  )
}
