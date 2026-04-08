import type { Locale } from '../../i18n/types'

const flagClass =
  'h-4 w-[1.375rem] shrink-0 overflow-hidden rounded-sm border border-black/15 shadow-sm'

/** Компактные SVG-флаги (не эмодзи), слева от подписи языка */
export function LocaleFlag({ locale }: { locale: Locale }) {
  switch (locale) {
    case 'hy':
      return (
        <svg
          className={flagClass}
          viewBox="0 0 22 16"
          aria-hidden="true"
        >
          <rect width="22" height="5.33" fill="#D90012" />
          <rect y="5.33" width="22" height="5.33" fill="#0033A0" />
          <rect y="10.66" width="22" height="5.34" fill="#F2A800" />
        </svg>
      )
    case 'ru':
      return (
        <svg
          className={flagClass}
          viewBox="0 0 22 16"
          aria-hidden="true"
        >
          <rect width="22" height="5.33" fill="#fff" />
          <rect y="5.33" width="22" height="5.33" fill="#0039A6" />
          <rect y="10.66" width="22" height="5.34" fill="#D52B1E" />
        </svg>
      )
    case 'en': {
      const sh = 16 / 13
      const cantonH = 7 * sh
      const cantonW = (22 * 2) / 5
      const stars = [
        [1.6, 1.8],
        [3.6, 1.8],
        [5.6, 1.8],
        [7.4, 1.8],
        [2.6, 3.4],
        [4.6, 3.4],
        [6.4, 3.4],
        [1.6, 5],
        [3.6, 5],
        [5.6, 5],
        [7.4, 5],
      ] as const
      return (
        <svg
          className={flagClass}
          viewBox="0 0 22 16"
          aria-hidden="true"
        >
          {Array.from({ length: 13 }, (_, i) => (
            <rect
              key={i}
              x={0}
              y={i * sh}
              width={22}
              height={sh + 0.02}
              fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
            />
          ))}
          <rect x={0} y={0} width={cantonW} height={cantonH} fill="#002868" />
          {stars.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={0.38} fill="#FFFFFF" />
          ))}
        </svg>
      )
    }
    default:
      return null
  }
}
