export type Locale = 'hy' | 'ru' | 'en'

export const LOCALES: Locale[] = ['hy', 'ru', 'en']

export const DEFAULT_LOCALE: Locale = 'hy'

export const LOCALE_STORAGE_KEY = 'bmc-locale'

export type MessageKey =
  | 'nav.home'
  | 'nav.about'
  | 'nav.departments'
  | 'nav.team'
  | 'nav.gallery'
  | 'nav.news'
  | 'nav.contacts'
  | 'nav.aria'
  | 'nav.menu'
  | 'nav.close'
  | 'nav.drawerAria'
  | 'hero.line1'
  | 'hero.line2'
  | 'hero.line3'
  | 'hero.readMore'
  | 'home.intro.title'
  | 'home.intro.body'
  | 'notFound.message'
  | 'notFound.home'
  | 'stub.message'
  | 'lang.hy'
  | 'lang.ru'
  | 'lang.en'
  | 'lang.menuAria'
