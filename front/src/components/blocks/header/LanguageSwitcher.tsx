import { useEffect, useId, useRef, useState } from 'react'
import { LocaleFlag } from '../../ui/LocaleFlag'
import { useLanguage } from '../../../i18n/LanguageContext'
import type { Locale } from '../../../i18n/types'

const OPTIONS: { value: Locale; labelKey: `lang.${Locale}` }[] = [
  { value: 'hy', labelKey: 'lang.hy' },
  { value: 'ru', labelKey: 'lang.ru' },
  { value: 'en', labelKey: 'lang.en' },
]

type LanguageSwitcherProps = {
  /** В мобильном drawer: кнопка и выпадающий список по центру */
  align?: 'end' | 'center'
}

export function LanguageSwitcher({ align = 'end' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const current = OPTIONS.find((o) => o.value === locale) ?? OPTIONS[0]

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={`relative flex ${align === 'center' ? 'justify-center' : 'justify-end'}`}
    >
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 text-sm text-slate-800 hover:bg-slate-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <LocaleFlag locale={current.value} />
        <span className="max-w-[5.5rem] truncate font-medium">
          {t(current.labelKey)}
        </span>
        <span className="text-slate-400" aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('lang.menuAria')}
          className={`absolute top-full z-[100] mt-1 min-w-[11rem] rounded-md bg-white py-1 shadow-lg ${
            align === 'center'
              ? 'left-1/2 -translate-x-1/2'
              : 'right-0'
          }`}
        >
          {OPTIONS.map((opt) => (
            <li key={opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={locale === opt.value}
                className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm text-slate-800 hover:bg-slate-100 ${
                  locale === opt.value ? 'bg-slate-100' : ''
                }`}
                onClick={() => {
                  setLocale(opt.value)
                  setOpen(false)
                }}
              >
                <LocaleFlag locale={opt.value} />
                <span className="font-medium">{t(opt.labelKey)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
