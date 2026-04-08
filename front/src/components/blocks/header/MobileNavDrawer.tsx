import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoDark from '../../../assets/logo-dark.png'
import { useLanguage } from '../../../i18n/LanguageContext'
import { navigateToHome } from '../../../utils/navigateToHome'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MAIN_NAV } from './navConfig'

type Props = {
  open: boolean
  onClose: () => void
}

const easeDrawer = 'ease-[cubic-bezier(0.22,1,0.36,1)]'
const easeNavSlide = 'ease-[cubic-bezier(0.25,1,0.55,1)]'
const headerMotion = `transition-transform duration-500 ${easeDrawer} motion-reduce:transition-none`
const navMotion = `transition-transform duration-[1050ms] ${easeNavSlide} delay-220 motion-reduce:transition-none motion-reduce:delay-0`

export function MobileNavDrawer({ open, onClose }: Props) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const prevPathRef = useRef<string | null>(null)
  const [drawerEntered, setDrawerEntered] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = location.pathname
      return
    }
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname
      onCloseRef.current()
    }
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setDrawerEntered(false)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawerEntered(true)
      return
    }

    setDrawerEntered(false)
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawerEntered(true))
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  if (!open) return null

  const drawer = (
    <div
      id="mobile-nav-drawer"
      className="fixed inset-0 z-[200] flex flex-col overflow-x-hidden bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.drawerAria')}
    >
      <div
        className={`mt-[20px] flex h-16 shrink-0 items-center justify-between bg-white px-4 ${headerMotion} ${
          drawerEntered
            ? 'translate-y-0 motion-reduce:translate-y-0'
            : '-translate-y-full motion-reduce:translate-y-0'
        }`}
      >
        <Link
          to="/"
          className="flex min-w-0 cursor-pointer items-center"
          onClick={(e) => {
            onClose()
            if (
              e.button !== 0 ||
              e.metaKey ||
              e.ctrlKey ||
              e.shiftKey ||
              e.altKey
            ) {
              return
            }
            e.preventDefault()
            navigateToHome(navigate, location.pathname)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img
            src={logoDark}
            alt="Beglaryan Medical Center"
            className="h-9 w-auto max-w-[min(100%,220px)] object-contain object-left"
          />
        </Link>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-slate-900"
          onClick={onClose}
        >
          <span className="text-lg leading-none" aria-hidden="true">
            −
          </span>
          {t('nav.close')}
        </button>
      </div>

      <nav
        className={`flex min-h-0 flex-1 flex-col overflow-y-auto bg-white ${navMotion} ${
          drawerEntered
            ? 'translate-x-0 motion-reduce:translate-x-0'
            : 'translate-x-full motion-reduce:translate-x-0'
        }`}
        aria-label={t('nav.aria')}
      >
        <div className="my-auto flex w-full flex-col px-[10px]">
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.to + (item.end ? '-index' : '')}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className="flex w-full justify-center border-b-2 border-[#64C5CD] py-4 text-center text-base font-bold tracking-wide text-black"
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
          <div className="shrink-0 py-4">
            <LanguageSwitcher align="center" />
          </div>
        </div>
      </nav>
    </div>
  )

  return createPortal(drawer, document.body)
}
