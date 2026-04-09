import type { MessageKey } from '../../../i18n/types'

export type NavItem = {
  to: string
  end?: boolean
  labelKey: MessageKey
}

/** Единый список пунктов: десктоп и мобильное меню */
export const MAIN_NAV: NavItem[] = [
  { to: '/', end: true, labelKey: 'nav.home' },
  { to: '/about-us', labelKey: 'nav.about' },
  { to: '/departments', labelKey: 'nav.departments' },
  { to: '/team', labelKey: 'nav.team' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/news', labelKey: 'nav.news' },
  { to: '/feedback', labelKey: 'nav.contacts' },
]
