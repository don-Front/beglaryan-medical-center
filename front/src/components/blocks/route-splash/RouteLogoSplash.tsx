import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logoDark from '../../../assets/logo-dark.png'

/** Дождаться окончания CSS logo-in (1.15s), короткая пауза, затем уход оверлея */
const VISIBLE_MS = 1250
const EXIT_DURATION_MS = 700

type Phase = 'on' | 'exit' | 'off'

export function RouteLogoSplash() {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState<Phase>('on')

  useLayoutEffect(() => {
    setPhase('on')
  }, [pathname])

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('exit'), VISIBLE_MS)
    const t2 = window.setTimeout(
      () => setPhase('off'),
      VISIBLE_MS + EXIT_DURATION_MS,
    )
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname])

  if (phase === 'off') return null

  return (
    <div
      className={`route-splash fixed inset-0 z-[9999] flex items-center justify-center bg-white ${
        phase === 'exit' ? 'route-splash--exit' : ''
      }`}
      aria-hidden="true"
    >
      <img
        key={pathname}
        src={logoDark}
        alt=""
        className="route-splash__logo h-auto w-[min(88vw,160px)] max-w-full object-contain sm:w-[min(88vw,200px)] md:w-[min(88vw,260px)]"
      />
    </div>
  )
}
