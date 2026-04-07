import { Link, NavLink } from 'react-router-dom'
import logoDark from '../../../assets/logo-dark.png'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'inline-flex whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')
}

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-6">

        {/* Блок 1 — лого */}
        <div className="flex flex-1 items-center justify-start">
          <Link
            to="/"
            className="flex min-w-0 max-w-full items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <img
              src={logoDark}
              alt="Beglaryan Medical Center — Բեգլարյան բժշկական կենտրոն"
              className="h-9 w-auto max-h-10 max-w-full object-contain object-left sm:h-10"
            />
          </Link>
        </div>

        {/* Блок 2 — навигация по центру */}
        <nav className="flex shrink-0 items-center gap-1" aria-label="Основная навигация">
          <NavLink to="/" end className={navLinkClass}>Главная</NavLink>
          <NavLink to="/services" className={navLinkClass}>Услуги</NavLink>
          <NavLink to="/doctors" className={navLinkClass}>Врачи</NavLink>
          <NavLink to="/contacts" className={navLinkClass}>Контакты</NavLink>
        </nav>

        {/* Блок 3 — декоративные фигуры справа */}
        <div className="flex flex-1 items-center justify-end gap-2" aria-hidden="true">
          <div className="h-7 w-2.5 rounded-full bg-sky-400" />
          <div className="h-9 w-9 rounded-lg bg-violet-500" />
          <div className="h-5 w-12 rounded bg-amber-400" />
          <div className="h-10 w-3 rounded-full bg-emerald-500" />
        </div>

      </div>
    </header>
  )
}
