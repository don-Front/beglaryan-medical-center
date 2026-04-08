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
    'inline-flex whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium transition-colors xl:px-2.5 xl:text-sm',
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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 lg:gap-3 lg:px-6">

        <div className="flex min-w-0 flex-1 justify-start lg:flex-1">
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
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-0.5 gap-y-1 lg:flex xl:gap-1"
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

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-1">
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
