import { Outlet } from 'react-router-dom'
import { RouteLogoSplash } from '../components/blocks/route-splash/RouteLogoSplash'

export function RootLayout() {
  return (
    <div className="app-root min-h-dvh">
      <Outlet />
      <RouteLogoSplash />
    </div>
  )
}
