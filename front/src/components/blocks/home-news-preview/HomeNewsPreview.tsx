import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'

const IMG = {
  featured: '/assets/img/news/featured-infertility.png',
  quote: '/assets/img/news/expert-quote.png',
  interview: '/assets/img/news/expert-interview.png',
} as const

export function HomeNewsPreview() {
  const { locale, t } = useLanguage()

  return (
    <section
      lang={locale}
      className="bg-white px-5 py-12 sm:px-8 sm:py-14"
      aria-labelledby="home-news-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="home-news-heading"
          className="font-sans text-lg font-bold tracking-wide text-[#64C5CD] sm:text-xl"
        >
          {t('nav.news')}
        </h2>
        <div
          className="mt-3 border-b border-slate-200"
          aria-hidden="true"
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <article className="lg:col-span-7">
            <Link
              to="/news"
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C5CD] focus-visible:ring-offset-2"
            >
              <div className="overflow-hidden rounded-lg bg-slate-100 ring-1 ring-black/[0.06] transition group-hover:ring-[#64C5CD]/40">
                <img
                  src={IMG.featured}
                  alt=""
                  className="aspect-[16/10] w-full object-cover grayscale transition duration-300 group-hover:grayscale-0 sm:aspect-[5/3]"
                  decoding="async"
                />
              </div>
              <p className="mt-4 font-sans text-sm font-bold leading-snug text-neutral-900 transition group-hover:text-[#64C5CD] sm:text-base">
                {t('home.news.item1.title')}
              </p>
            </Link>
            <p className="sr-only">{t('home.news.item1.imageCaption')}</p>
          </article>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            <article>
              <Link
                to="/news"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C5CD] focus-visible:ring-offset-2"
              >
                <div className="overflow-hidden rounded-lg bg-slate-100 ring-1 ring-black/[0.06] transition group-hover:ring-[#64C5CD]/40">
                  <img
                    src={IMG.quote}
                    alt=""
                    className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:opacity-95 sm:aspect-[3/4] lg:aspect-[4/5]"
                    decoding="async"
                  />
                </div>
                <blockquote className="mt-4 border-l-[3px] border-[#64C5CD] pl-3">
                  <p className="font-sans text-sm font-bold leading-snug text-neutral-900">
                    {t('home.news.item2.quote')}
                  </p>
                  <cite className="mt-2 block font-sans text-xs font-semibold not-italic tracking-wide text-slate-600 sm:text-sm">
                    {t('home.news.item2.byline')}
                  </cite>
                </blockquote>
              </Link>
            </article>

            <article>
              <Link
                to="/news"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C5CD] focus-visible:ring-offset-2"
              >
                <div className="overflow-hidden rounded-lg bg-slate-100 ring-1 ring-black/[0.06] transition group-hover:ring-[#64C5CD]/40">
                  <img
                    src={IMG.interview}
                    alt=""
                    className="aspect-video w-full object-cover transition duration-300 group-hover:opacity-95"
                    decoding="async"
                  />
                </div>
                <p className="mt-4 font-sans text-sm font-bold leading-snug text-neutral-900 transition group-hover:text-[#64C5CD]">
                  {t('home.news.item3.title')}
                </p>
              </Link>
            </article>
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/news"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#64C5CD] bg-white px-6 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#64C5CD] transition hover:bg-[#64C5CD] hover:text-white active:opacity-90 sm:text-sm"
          >
            {t('home.news.allNews')}
          </Link>
        </div>
      </div>
    </section>
  )
}
