import type { Locale } from '../../../i18n/types'

type PageTitleBannerProps = {
  title: string
  locale: Locale
}

/** Верхний заголовок страницы — как на странице обратной связи */
export function PageTitleBanner({ title, locale }: PageTitleBannerProps) {
  return (
    <div className="flex justify-center px-[120px] py-[90px] sm:px-[192px]">
      <header
        lang={locale}
        className="w-fit bg-[#46a1b8] px-[120px] py-2 text-center sm:py-3"
      >
        <h1 className="whitespace-nowrap font-sans text-lg font-semibold uppercase tracking-[0.12em] text-white sm:text-xl">
          {title}
        </h1>
      </header>
    </div>
  )
}
