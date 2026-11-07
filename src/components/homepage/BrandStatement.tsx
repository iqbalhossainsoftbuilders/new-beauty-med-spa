import Image from 'next/image'
import { IMAGES } from '@/lib/images'

export function BrandStatement() {
  return (
    <section className="relative py-32 overflow-hidden">
      <Image
        src={IMAGES.brandStatement}
        alt="Serene spa environment"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-espresso/85" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="section-label text-gold mb-8">Our Philosophy</p>
        <blockquote className="font-cormorant text-hero font-light italic leading-tight text-champagne mb-8">
          "Beauty is not about perfection. It is about confidence, wellbeing, and feeling like yourself again."
        </blockquote>
        <span className="gold-line" />
        <p className="font-manrope text-sm text-ivory/60 max-w-lg mx-auto leading-relaxed">
          At New Beauty Med Spa, we combine medical expertise with a personalized approach —
          delivering advanced aesthetic treatments that honor your natural beauty.
        </p>
      </div>
    </section>
  )
}
