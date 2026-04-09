import { HomeHero } from '../components/blocks/home-hero/HomeHero'
import { HomeIntro } from '../components/blocks/home-intro/HomeIntro'
import { HomeServicesCarousel } from '../components/blocks/home-services-carousel/HomeServicesCarousel'
import { HomeCareMoment } from '../components/blocks/home-care-moment/HomeCareMoment'
import { HomeNewsPreview } from '../components/blocks/home-news-preview/HomeNewsPreview'

export function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeServicesCarousel />
      <HomeCareMoment />
      <HomeNewsPreview />
    </>
  )
}
