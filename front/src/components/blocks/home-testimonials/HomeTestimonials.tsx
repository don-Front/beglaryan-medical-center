import { useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'
import type { MessageKey } from '../../../i18n/types'

const QUOTE_DECO_URL = '/assets/img/demo/32_img.png'

const SLIDES: { text: MessageKey; author: MessageKey }[] = [
  { text: 'home.testimonials.slide0.text', author: 'home.testimonials.slide0.author' },
  { text: 'home.testimonials.slide1.text', author: 'home.testimonials.slide1.author' },
  { text: 'home.testimonials.slide2.text', author: 'home.testimonials.slide2.author' },
  { text: 'home.testimonials.slide3.text', author: 'home.testimonials.slide3.author' },
  { text: 'home.testimonials.slide4.text', author: 'home.testimonials.slide4.author' },
  { text: 'home.testimonials.slide5.text', author: 'home.testimonials.slide5.author' },
  { text: 'home.testimonials.slide6.text', author: 'home.testimonials.slide6.author' },
]

export function HomeTestimonials() {
  const { locale, t } = useLanguage()
  const [index, setIndex] = useState(0)
  const len = SLIDES.length

  const goPrev = () => setIndex((i) => (i - 1 + len) % len)
  const goNext = () => setIndex((i) => (i + 1) % len)

  const { text, author } = SLIDES[index]

  return (
    <section
      lang={locale}
      className="border-t border-slate-200 bg-[#f5f5f5] px-5 py-12 sm:px-8 sm:py-14"
      aria-labelledby="home-testimonials-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="home-testimonials-heading"
          className="font-sans text-lg font-bold tracking-wide text-[#64C5CD] sm:text-xl"
        >
          {t('home.testimonials.title')}
        </h2>
        <div className="mt-3 border-b border-slate-200" aria-hidden="true" />

        <div className="relative mx-auto mt-10 max-w-3xl px-2 sm:mt-12 sm:px-4">
          <img
            src={QUOTE_DECO_URL}
            alt=""
            className="pointer-events-none absolute -left-1 top-0 w-[4.5rem] opacity-[0.35] sm:left-0 sm:w-[5.5rem]"
            decoding="async"
            aria-hidden="true"
          />

          <div className="relative min-h-[12rem] pt-6 sm:min-h-[10rem] sm:pl-4 sm:pt-8">
            <blockquote key={index}>
              <p className="font-sans text-sm leading-relaxed text-neutral-800 sm:text-base">
                {t(text)}
              </p>
              <footer className="mt-5 font-sans text-sm font-semibold text-neutral-900 sm:mt-6">
                {t(author)}
              </footer>
            </blockquote>
          </div>
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-3 text-slate-500 sm:mt-12"
          role="group"
          aria-label={t('home.testimonials.navAria')}
        >
          <span className="select-none text-lg font-light" aria-hidden="true">
            —
          </span>
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl leading-none transition hover:bg-slate-200/80 hover:text-slate-800"
            aria-label={t('home.testimonials.prevAria')}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl leading-none transition hover:bg-slate-200/80 hover:text-slate-800"
            aria-label={t('home.testimonials.nextAria')}
          >
            ›
          </button>
          <span className="select-none text-lg font-light" aria-hidden="true">
            —
          </span>
        </div>
      </div>
    </section>
  )
}
