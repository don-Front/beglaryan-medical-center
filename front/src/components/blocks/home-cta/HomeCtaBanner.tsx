import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'

export function HomeCtaBanner() {
  const { locale, t } = useLanguage()

  return (
    <section
      lang={locale}
      className="bg-[#f0f0f0] px-5 py-14 sm:px-8 sm:py-16"
      aria-labelledby="home-cta-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
        <h2
          id="home-cta-heading"
          className="font-sans text-base font-medium text-neutral-900 sm:text-lg"
        >
          {t('home.cta.title')}
        </h2>
        <Link
          to="/feedback"
          className="inline-flex min-h-11 min-w-[12rem] items-center justify-center rounded-sm bg-[#5CB8CC] px-8 py-2.5 text-center text-sm font-semibold text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#5CB8CC] focus-visible:ring-offset-2 active:opacity-80"
        >
          {t('home.cta.button')}
        </Link>
      </div>
    </section>
  )
}
