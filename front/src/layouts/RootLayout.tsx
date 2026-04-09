import { Outlet } from 'react-router-dom'
import { Header } from '../components/blocks/header/Header'
import { SiteFooter } from '../components/blocks/footer/SiteFooter'
import { RouteLogoSplash } from '../components/blocks/route-splash/RouteLogoSplash'

export function RootLayout() {
  return (
    <div className="app-root flex min-h-dvh flex-col">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
      <RouteLogoSplash />
    </div>
  )
}
