import { BOOKING_URL } from '@/lib/utils'

interface TreatmentHeroProps {
  name: string
  category: 'face' | 'body'
  subcategory: string
  intro: string
  slug: string
}

export function TreatmentHero({ name, category, intro, subcategory, slug }: TreatmentHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end bg-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-espresso/80 to-charcoal" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <p className="section-label text-gold mb-4 capitalize">{category} · {subcategory.replace(/-/g, ' ')}</p>
        <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-6 max-w-3xl">
          {name}
        </h1>
        <span className="gold-line mx-0 mb-6" />
        <p className="font-manrope text-sm text-ivory/70 max-w-xl leading-relaxed mb-8">
          {intro}
        </p>
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
