import { useCallback, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoDark from '../../../assets/logo-dark.png'
import { navigateToHome } from '../../../utils/navigateToHome'
import { useLanguage } from '../../../i18n/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNavDrawer } from './MobileNavDrawer'
import { MAIN_NAV } from './navConfig'

function navLinkDesktopClass({ isActive }: { isActive: boolean }) {
  return [
    'inline-flex whitespace-nowrap rounded-md px-1.5 py-1.5 text-[0.6875rem] font-medium leading-none tracking-tight transition-colors xl:px-2 xl:text-xs 2xl:px-2.5 2xl:text-sm',
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')
}

export function Header() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }
    e.preventDefault()
    navigateToHome(navigate, pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 lg:justify-start lg:gap-3 lg:px-6">

        <div className="flex shrink-0 justify-start">
          <Link
            to="/"
            className="flex min-w-0 max-w-full cursor-pointer items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            onClick={onLogoClick}
          >
            <img
              src={logoDark}
              alt="Beglaryan Medical Center — Բեգլարյան բժշկական կենտրոն"
              className="h-9 w-auto max-h-10 max-w-full object-contain object-left sm:h-10"
            />
          </Link>
        </div>

        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-0 lg:flex xl:gap-x-0.5"
          aria-label={t('nav.aria')}
        >
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.to + (item.end ? '-root' : '')}
              to={item.to}
              end={item.end}
              className={navLinkDesktopClass}
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            className="cursor-pointer font-semibold text-slate-800 hover:text-slate-600 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen(true)}
          >
            {t('nav.menu')}
          </button>
        </div>
      </div>

      <MobileNavDrawer open={mobileOpen} onClose={closeMobile} />
    </header>
  )
}
