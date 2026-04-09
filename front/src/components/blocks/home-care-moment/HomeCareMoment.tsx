import { useLanguage } from '../../../i18n/LanguageContext'

const CARE_IMAGE_URL = '/assets/img/home/care-moment.jpg'

export function HomeCareMoment() {
  const { locale, t } = useLanguage()

  return (
    <section
      lang={locale}
      className="relative z-10 -mt-6 bg-slate-50 pb-12 pt-2 sm:-mt-8 sm:pb-16"
      aria-labelledby="home-care-moment-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06]">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-stretch">
            <div className="order-2 flex flex-col justify-center gap-4 p-6 sm:p-8 md:order-1 md:p-10 lg:p-12">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#64C5CD]">
                {t('home.careMoment.kicker')}
              </p>
              <h2
                id="home-care-moment-heading"
                className="font-sans text-xl font-bold leading-snug tracking-wide text-neutral-900 sm:text-2xl lg:text-[1.65rem]"
              >
                {t('home.careMoment.title')}
              </h2>
              <p className="max-w-md font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
                {t('home.careMoment.body')}
              </p>
              <div
                className="mt-1 h-0.5 w-12 rounded-full bg-[#64C5CD]"
                aria-hidden="true"
              />
            </div>
            <figure className="order-1 min-h-[200px] md:order-2 md:min-h-full">
              <img
                src={CARE_IMAGE_URL}
                alt=""
                className="h-full w-full object-cover grayscale contrast-[1.03] md:min-h-[320px]"
                decoding="async"
              />
              <figcaption className="sr-only">
                {t('home.careMoment.imageCaption')}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
