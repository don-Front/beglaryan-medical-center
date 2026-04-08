import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function StubPage() {
  const { t } = useLanguage()
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-center">
      <p className="text-slate-600">{t('stub.message')}</p>
      <Link
        to="/"
        className="mt-6 inline-block font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900"
      >
        {t('notFound.home')}
      </Link>
    </main>
  )
}
