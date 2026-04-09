import { useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'
import type { MessageKey } from '../../../i18n/types'

type SlideId = 'gynecology' | 'cardiology' | 'pediatrics'

const SLIDE_ORDER: SlideId[] = ['gynecology', 'cardiology', 'pediatrics']

const SLIDE_IMAGES: Record<SlideId, string> = {
  gynecology: '/assets/img/carousel/gynecology.jpg',
  cardiology: '/assets/img/carousel/cardiology.jpg',
  pediatrics: '/assets/img/carousel/pediatrics.jpg',
}

const SLIDE_TITLE_KEYS: Record<SlideId, MessageKey> = {
  gynecology: 'home.carousel.slide.gynecology',
  cardiology: 'home.carousel.slide.cardiology',
  pediatrics: 'home.carousel.slide.pediatrics',
}

export function HomeServicesCarousel() {
  const { locale, t } = useLanguage()
  const [index, setIndex] = useState(0)
  const len = SLIDE_ORDER.length

  const goPrev = () => {
    setIndex((i) => (i - 1 + len) % len)
  }

  const goNext = () => {
    setIndex((i) => (i + 1) % len)
  }

  return (
    <section
      lang={locale}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goPrev()
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          goNext()
        }
      }}
      className="relative z-0 w-full bg-neutral-900 pb-6 outline-none focus-visible:ring-2 focus-visible:ring-[#64C5CD] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:pb-8"
      aria-roledescription="carousel"
      aria-label={t('home.carousel.label')}
    >
      <div className="relative h-[min(72vw,36rem)] min-h-[17.5rem] w-full overflow-hidden sm:min-h-[22rem] md:h-[28rem] md:min-h-0 lg:h-[32rem]">
        {SLIDE_ORDER.map((id, i) => (
          <div
            key={id}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              i === index
                ? 'z-[1] opacity-100'
                : 'pointer-events-none z-0 opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <img
                src={SLIDE_IMAGES[id]}
                alt=""
                className="h-full w-full scale-110 object-cover blur-[3px] sm:blur-[2px]"
                decoding="async"
              />
            </div>
            <div
              className="absolute inset-0 bg-black/45"
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full items-center justify-center px-14 sm:px-20 md:px-24">
              <h2 className="text-center font-sans text-2xl font-bold uppercase tracking-[0.08em] text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {t(SLIDE_TITLE_KEYS[id])}
              </h2>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/55 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm transition hover:bg-slate-900/70 active:scale-[0.98] sm:left-4 sm:px-4 sm:py-3 sm:text-sm md:left-6"
          aria-label={t('home.carousel.prevAria')}
        >
          {t('home.carousel.prev')}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/35 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-sm backdrop-blur-sm transition hover:bg-white/45 active:scale-[0.98] sm:right-4 sm:px-4 sm:py-3 sm:text-sm md:right-6"
          aria-label={t('home.carousel.nextAria')}
        >
          {t('home.carousel.next')}
        </button>
      </div>
    </section>
  )
}
