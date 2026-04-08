import type { NavigateFunction } from 'react-router-dom'

export function navigateToHome(navigate: NavigateFunction, pathname: string) {
  if (pathname === '/' || pathname === '') {
    navigate('/', { replace: true, state: { splashAt: Date.now() } })
    return
  }
  navigate('/')
}
