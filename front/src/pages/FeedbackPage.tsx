import { FeedbackWriteSection } from '../components/blocks/feedback-form/FeedbackWriteSection'
import { PageTitleBanner } from '../components/blocks/page-title-banner/PageTitleBanner'
import { useLanguage } from '../i18n/LanguageContext'
import type { Locale } from '../i18n/types'

/** Координаты клиники (Ереван, ул. Абовяна, 56 — ориентир) */
const CLINIC_LAT = 40.181602
const CLINIC_LNG = 44.515938

const MAP_ZOOM = '17'

/** Виджет Яндекс.Карт: ll и pt — долгота,широта */
function yandexMapWidgetSrc(locale: Locale) {
  const ll = `${CLINIC_LNG},${CLINIC_LAT}`
  const pt = `${CLINIC_LNG},${CLINIC_LAT},pm2rdm`
  const lang = locale === 'en' ? 'en_US' : 'ru_RU'
  const q = new URLSearchParams({ ll, z: MAP_ZOOM, pt, lang })
  return `https://yandex.ru/map-widget/v1/?${q.toString()}`
}

export function FeedbackPage() {
  const { locale, t } = useLanguage()
  const mapSrc = yandexMapWidgetSrc(locale)

  return (
    <main className="flex w-full flex-1 flex-col bg-white pb-10 sm:pb-12">
      <PageTitleBanner title={t('nav.contacts')} locale={locale} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-xl bg-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]">
          <iframe
            title={t('feedback.mapTitle')}
            src={mapSrc}
            className="block h-[min(26rem,58vh)] w-full min-h-[280px] border-0 sm:h-[28rem] sm:min-h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <FeedbackWriteSection locale={locale} />
    </main>
  )
}
