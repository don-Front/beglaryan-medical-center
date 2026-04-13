import { PageTitleBanner } from '../components/blocks/page-title-banner/PageTitleBanner'
import { useLanguage } from '../i18n/LanguageContext'
import type { MessageKey } from '../i18n/types'

const HERO_SRC = '/assets/img/about/operating-room.png'
const HERITAGE_SRC = '/assets/img/about/heritage-portrait.png'

const WHY_CHOOSE_ITEMS: { title: MessageKey; body: MessageKey }[] = [
  { title: 'about.whyChoose.item1.title', body: 'about.whyChoose.item1.body' },
  { title: 'about.whyChoose.item2.title', body: 'about.whyChoose.item2.body' },
  { title: 'about.whyChoose.item3.title', body: 'about.whyChoose.item3.body' },
  { title: 'about.whyChoose.item4.title', body: 'about.whyChoose.item4.body' },
  { title: 'about.whyChoose.item5.title', body: 'about.whyChoose.item5.body' },
]

function WhyChooseCheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 7L5.5 10L11.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#333] sm:text-base">
            {t('about.intro.p3')}
          </p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#333] sm:text-base">
            {t('about.intro.p4')}
          </p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#333] sm:text-base">
            {t('about.intro.p5')}
          </p>
        </section>
      </div>

      <div className="mx-auto mt-12 w-full max-w-6xl px-5 sm:mt-16 sm:px-8">
        <figure className="m-0 overflow-hidden rounded-xl bg-neutral-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]">
          <img
            src={HERITAGE_SRC}
            alt={t('about.heritage.alt')}
            className="mx-auto block max-h-[min(28rem,65vh)] w-full object-contain sm:max-h-[min(32rem,70vh)]"
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <section
          lang={locale}
          className="mt-10 text-left sm:mt-12"
          aria-labelledby="about-heritage-heading"
        >
          <h2
            id="about-heritage-heading"
            className="font-sans text-base font-bold uppercase leading-snug tracking-wide text-[#58A6C1] sm:text-lg"
          >
            <span className="block">{t('about.heritage.headingLine1')}</span>
            <span className="block">{t('about.heritage.headingLine2')}</span>
          </h2>
          <div
            className="mt-4 border-b border-neutral-400"
            aria-hidden="true"
          />
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-[#333] sm:text-base">
            {t('about.missionDetail.p1')}
          </p>
        </section>
      </div>

      <div className="mx-auto mt-12 w-full max-w-6xl px-5 sm:mt-16 sm:px-8">
        <section
          lang={locale}
          className="text-left"
          aria-labelledby="about-why-choose-heading"
        >
          <h2
            id="about-why-choose-heading"
            className="font-sans text-base font-bold uppercase leading-snug tracking-wide text-[#58A6C1] sm:text-lg"
          >
            <span className="block">{t('about.whyChoose.headingLine1')}</span>
          </h2>
          <div
            className="mt-4 border-b border-neutral-400"
            aria-hidden="true"
          />

          <ul
            className="mt-8 list-none space-y-9 p-0 sm:mt-10 sm:space-y-10"
            role="list"
          >
            {WHY_CHOOSE_ITEMS.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-y-2 sm:gap-y-2"
              >
                <div className="flex gap-3 sm:gap-4">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center self-start rounded-full bg-[#58A6C1] text-white shadow-sm"
                    aria-hidden
                  >
                    <WhyChooseCheckIcon />
                  </span>
                  <h3 className="min-w-0 flex-1 text-base font-bold text-slate-900 sm:text-[1.0625rem]">
                    {t(item.title)}
                  </h3>
                </div>
                <p className="min-w-0 text-[0.9375rem] leading-relaxed text-[#555] sm:text-base">
                  {t(item.body)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
