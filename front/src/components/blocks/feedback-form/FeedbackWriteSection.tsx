import { type FormEvent, useId } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'
import type { MessageKey } from '../../../i18n/types'
import { ServiceSelectField } from './ServiceSelectField'

const inputClass =
  'w-full rounded-md border-0 bg-slate-100 px-3 py-2.5 font-sans text-sm text-neutral-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5CB8CC]/45'

const SERVICE_OPTIONS: { value: string; labelKey: MessageKey }[] = [
  { value: 'gynecology', labelKey: 'feedback.formService1' },
  { value: 'obstetrics', labelKey: 'feedback.formService2' },
  { value: 'pregnancy_pathology', labelKey: 'feedback.formService3' },
  { value: 'neonatal_unit', labelKey: 'feedback.formService4' },
  { value: 'newborn_care', labelKey: 'feedback.formService5' },
  { value: 'pediatric_gynecology', labelKey: 'feedback.formService6' },
  { value: 'anti_aging_gynecology', labelKey: 'feedback.formService7' },
  { value: 'vascular_surgery', labelKey: 'feedback.formService8' },
  { value: 'vascular_inpatient', labelKey: 'feedback.formService9' },
  { value: 'ent', labelKey: 'feedback.formService10' },
  { value: 'operating_room', labelKey: 'feedback.formService11' },
  { value: 'maxillofacial_plastic', labelKey: 'feedback.formService12' },
  { value: 'other', labelKey: 'feedback.formService13' },
]

type FeedbackWriteSectionProps = {
  locale: string
}

export function FeedbackWriteSection({ locale }: FeedbackWriteSectionProps) {
  const { t } = useLanguage()
  const formId = useId()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const service = String(fd.get('service') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    const to = t('feedback.emailValue')
    const subject = t('feedback.formMailSubject')
    const opt = SERVICE_OPTIONS.find((o) => o.value === service)
    const serviceLabel = opt ? t(opt.labelKey) : ''
    const body = [
      name && `${name}`,
      serviceLabel && `${t('feedback.formServicePlaceholder')}: ${serviceLabel}`,
      phone && `${t('feedback.formPhonePlaceholder')}: ${phone}`,
      email && `${t('feedback.formEmailPlaceholder')}: ${email}`,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  return (
    <section
      lang={locale}
      className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12"
      aria-labelledby={`${formId}-heading`}
    >
      <h2
        id={`${formId}-heading`}
        className="font-sans text-xl font-bold leading-snug text-neutral-900 sm:text-2xl"
      >
        {t('home.cta.title')}
      </h2>

      <div className="mt-8 grid gap-10 sm:gap-10 lg:mt-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
        <div className="space-y-8 sm:space-y-9">
          <div>
            <h3 className="font-sans text-sm font-semibold text-neutral-900 sm:text-base">
              {t('feedback.emailLabel')}
            </h3>
            <a
              href={`mailto:${t('feedback.emailValue')}`}
              className="mt-1.5 inline-block font-sans text-sm text-slate-600 underline decoration-slate-400/60 underline-offset-2 transition hover:text-slate-900 hover:decoration-slate-600 sm:text-base"
            >
              {t('feedback.emailValue')}
            </a>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold text-neutral-900 sm:text-base">
              {t('feedback.addressLabel')}
            </h3>
            <p className="mt-1.5 font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
              {t('feedback.addressValue')}
            </p>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold text-neutral-900 sm:text-base">
              {t('feedback.phonesLabel')}
            </h3>
            <ul className="mt-1.5 list-none space-y-1.5 font-sans text-sm text-slate-600 sm:text-base">
              <li>
                <a href="tel:+37441288810" className="transition hover:text-slate-900">
                  {t('feedback.phoneLine1')}
                </a>
              </li>
              <li>
                <a href="tel:+37455388810" className="transition hover:text-slate-900">
                  {t('feedback.phoneLine2')}
                </a>
              </li>
              <li>
                <a href="tel:+37410564519" className="transition hover:text-slate-900">
                  {t('feedback.phoneLine3')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form
          id={`${formId}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t('feedback.formNamePlaceholder')}
              className={inputClass}
              aria-label={t('feedback.formNamePlaceholder')}
            />
            <ServiceSelectField
              name="service"
              options={SERVICE_OPTIONS}
              placeholderKey="feedback.formServicePlaceholder"
              triggerClassName={`${inputClass} pr-9`}
            />
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder={t('feedback.formPhonePlaceholder')}
              className={inputClass}
              aria-label={t('feedback.formPhonePlaceholder')}
            />
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t('feedback.formEmailPlaceholder')}
              className={inputClass}
              aria-label={t('feedback.formEmailPlaceholder')}
            />
          </div>
          <textarea
            name="message"
            rows={5}
            placeholder={t('feedback.formMessagePlaceholder')}
            className={`${inputClass} mt-4 min-h-[8rem] resize-y`}
            aria-label={t('feedback.formMessagePlaceholder')}
          />
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#5CB8CC] px-8 py-2.5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB8CC] focus-visible:ring-offset-2 active:opacity-80"
            >
              {t('home.cta.button')}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
