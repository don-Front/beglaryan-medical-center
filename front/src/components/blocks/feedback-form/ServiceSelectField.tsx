import { useEffect, useId, useRef, useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'
import type { MessageKey } from '../../../i18n/types'

export type ServiceOption = { value: string; labelKey: MessageKey }

type ServiceSelectFieldProps = {
  name: string
  options: ServiceOption[]
  placeholderKey: MessageKey
  /** Соответствует классу полей формы */
  triggerClassName: string
}

export function ServiceSelectField({
  name,
  options,
  placeholderKey,
  triggerClassName,
}: ServiceSelectFieldProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const buttonId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const selected = options.find((o) => o.value === value)
  const triggerLabel = selected ? t(selected.labelKey) : t(placeholderKey)

  const itemClass =
    'flex w-full items-start gap-3 px-4 py-3 text-left font-sans text-xs leading-snug tracking-wide text-neutral-900 uppercase sm:text-sm'

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={buttonId}
        type="button"
        className={`${triggerClassName} flex w-full items-center justify-between text-left`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={t(placeholderKey)}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="min-w-0 flex-1 truncate uppercase tracking-wide">
          {triggerLabel}
        </span>
        <span className="pointer-events-none shrink-0 text-slate-500" aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          className="absolute left-0 right-0 z-50 mt-1.5 max-h-[min(70vh,22rem)] overflow-y-auto overscroll-contain rounded-3xl bg-slate-100 py-2 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06]"
        >
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === ''}
              className={itemClass}
              onClick={() => {
                setValue('')
                setOpen(false)
              }}
            >
              <span className="inline-flex w-5 shrink-0 justify-center font-medium text-[#46a1b8]">
                {value === '' ? '✓' : ''}
              </span>
              <span className="min-w-0 flex-1 whitespace-normal">
                {t(placeholderKey)}
              </span>
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                className={itemClass}
                onClick={() => {
                  setValue(o.value)
                  setOpen(false)
                }}
              >
                <span className="inline-flex w-5 shrink-0 justify-center font-medium text-[#46a1b8]">
                  {value === o.value ? '✓' : ''}
                </span>
                <span className="min-w-0 flex-1 whitespace-normal">
                  {t(o.labelKey)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
