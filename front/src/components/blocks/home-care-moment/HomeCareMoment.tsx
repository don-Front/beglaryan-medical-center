import { useLanguage } from '../../../i18n/LanguageContext'

const CARE_IMAGE_URL = '/assets/img/home/care-moment.png'

export function HomeCareMoment() {
  const { locale, t } = useLanguage()

  return (
    <section
      lang={locale}
      className="relative z-10 -mt-6 bg-slate-50 pb-12 pt-2 sm:-mt-8 sm:pb-16"
      aria-label={t('home.careMoment.imageCaption')}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06]">
          <img
            src={CARE_IMAGE_URL}
            alt={t('home.careMoment.imageCaption')}
            className="block h-auto w-full"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
