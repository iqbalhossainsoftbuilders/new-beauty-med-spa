import { HeroSection } from '@/components/homepage/HeroSection'
import { TreatmentDiscovery } from '@/components/homepage/TreatmentDiscovery'
import { BrandStatement } from '@/components/homepage/BrandStatement'
import { FeaturedTreatments } from '@/components/homepage/FeaturedTreatments'
import { PackagesTeaser } from '@/components/homepage/PackagesTeaser'
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection'
import { AboutTeaser } from '@/components/homepage/AboutTeaser'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TreatmentDiscovery />
      <BrandStatement />
      <FeaturedTreatments />
      <PackagesTeaser />
      <TestimonialsSection />
      <AboutTeaser />
    </>
  )
}
