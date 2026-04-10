import { PageTitleBanner } from '../components/blocks/page-title-banner/PageTitleBanner'
import { useLanguage } from '../i18n/LanguageContext'

const HERO_SRC = '/assets/img/about/operating-room.png'
const MISSION_SRC = '/assets/img/about/mission.png'

export function AboutUsPage() {
  const { locale, t } = useLanguage()

  return (
    <main className="flex w-full flex-1 flex-col bg-white pb-10 sm:pb-12">
      <PageTitleBanner title={t('nav.about')} locale={locale} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <figure className="m-0 overflow-hidden rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]">
          <img
            src={HERO_SRC}
            alt={t('about.hero.alt')}
            className="block aspect-[4/3] w-full object-cover sm:aspect-[16/9] sm:max-h-[min(32rem,70vh)]"
            width={1600}
            height={900}
            loading="eager"
            decoding="async"
          />
        </figure>

        <section
          lang={locale}
          className="mt-10 text-left sm:mt-12"
          aria-labelledby="about-intro-heading"
        >
          <h2
            id="about-intro-heading"
            className="font-sans text-base font-bold uppercase leading-snug tracking-wide text-[#58A6C1] sm:text-lg"
          >
            <span className="block">{t('about.intro.headingLine1')}</span>
            <span className="block">{t('about.intro.headingLine2')}</span>
            <span className="block">{t('about.intro.headingLine3')}</span>
          </h2>
          <div
            className="mt-4 border-b border-neutral-400"
            aria-hidden="true"
          />
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-[#333] sm:text-base">
            {t('about.intro.p1')}
          </p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#333] sm:text-base">
            {t('about.intro.p2')}
          </p>
        </section>
      </div>

      <section
        lang={locale}
        className="mt-10 bg-[#F9F9F9] py-10 sm:mt-12 sm:py-14"
        aria-labelledby="about-mission-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-5 text-left sm:px-8">
          <h2
            id="about-mission-heading"
            className="font-sans text-base font-bold uppercase leading-snug tracking-wide text-[#58A6C1] sm:text-lg"
          >
            <span className="block">{t('about.mission.headingLine1')}</span>
            <span className="block">{t('about.mission.headingLine2')}</span>
          </h2>
          <div
            className="mt-4 border-b border-neutral-400"
            aria-hidden="true"
          />
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-[#4A4A4A] sm:text-base">
            {t('about.mission.body')}
          </p>

          <figure className="m-0 mt-10 overflow-hidden rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] sm:mt-12">
            <img
              src={MISSION_SRC}
              alt={t('about.mission.alt')}
              className="block aspect-[4/3] w-full object-cover sm:aspect-[16/9] sm:max-h-[min(32rem,70vh)]"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="mt-10 space-y-8 sm:mt-12">
            <p className="text-[0.9375rem] leading-relaxed text-[#4A4A4A] sm:text-base">
              {t('about.history.p1')}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-[#4A4A4A] sm:text-base">
              {t('about.history.p2')}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-[#4A4A4A] sm:text-base">
              {t('about.education.p1')}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-[#4A4A4A] sm:text-base">
              {t('about.education.p2')}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
