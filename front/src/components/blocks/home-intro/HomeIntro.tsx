import { useLanguage } from '../../../i18n/LanguageContext'

export function HomeIntro() {
  const { locale, t } = useLanguage()

  return (
    <section
      lang={locale}
      className="bg-white px-5 py-10 sm:px-8 sm:py-12"
      aria-labelledby="home-intro-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="home-intro-heading"
          className="font-sans text-lg font-bold leading-snug tracking-wide text-black sm:text-xl"
        >
          {t('home.intro.title')}
        </h2>
        <p className="mt-5 max-w-prose font-sans text-sm leading-relaxed text-slate-600 sm:mt-6 sm:text-base">
          {t('home.intro.body')}
        </p>
      </div>
    </section>
  )
}
