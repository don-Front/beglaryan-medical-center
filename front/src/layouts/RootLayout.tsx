import { Outlet } from 'react-router-dom'
import { Header } from '../components/blocks/header/Header'
import { RouteLogoSplash } from '../components/blocks/route-splash/RouteLogoSplash'

export function RootLayout() {
  return (
    <div className="app-root min-h-dvh">
      <Header />
      <Outlet />
      <RouteLogoSplash />
    </div>
  )
}
