import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'

const HERO_BG_URL = '/assets/img/hero/hero-bg.png'

export function HomeHero() {
  const { locale, t } = useLanguage()

  return (
    <section
      lang={locale}
      className="relative flex min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center bg-neutral-900 bg-cover bg-center px-5 py-10 sm:px-8"
      style={{
        backgroundImage: `url(${HERO_BG_URL})`,
        fontFamily: "'Roboto', system-ui, sans-serif",
      }}
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-black/50"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <h1
          id="home-hero-heading"
          className="font-sans text-[1.05rem] font-bold leading-[1.45] tracking-wide text-white sm:text-lg md:text-xl"
        >
          <span className="block">{t('hero.line1')}</span>
          <span className="block">{t('hero.line2')}</span>
          <span className="block">{t('hero.line3')}</span>
        </h1>

        <Link
          to="/about-us"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#64C5CD] px-8 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 active:opacity-80 sm:mt-10 sm:px-10 sm:text-sm"
        >
          {t('hero.readMore')}
        </Link>
      </div>
    </section>
  )
}
