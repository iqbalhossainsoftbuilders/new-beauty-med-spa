import Image from 'next/image'
import { BOOKING_URL } from '@/lib/utils'
import { getTreatmentImage } from '@/lib/images'

interface TreatmentHeroProps {
  name: string
  category: 'face' | 'body'
  subcategory: string
  intro: string
  slug: string
}

export function TreatmentHero({ name, category, intro, subcategory, slug }: TreatmentHeroProps) {
  const imageUrl = getTreatmentImage(slug, category)

  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-charcoal">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <p className="section-label text-gold mb-4 capitalize">{category} · {subcategory.replace(/-/g, ' ')}</p>
        <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-6 max-w-3xl">
          {name}
        </h1>
        <span className="gold-line mx-0 mb-6" />
        <p className="font-manrope text-sm text-ivory/70 max-w-xl leading-relaxed mb-8">{intro}</p>
        <a
          href={`${BOOKING_URL}?service=${encodeURIComponent(slug)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold px-10 py-4 text-sm"
        >
          Book This Treatment
        </a>
      </div>
    </section>
  )
}
