import Link from 'next/link'
import Image from 'next/image'
import { IMAGES } from '@/lib/images'

const CATEGORIES = [
  {
    label: 'Face',
    href: '/face',
    description: 'Facials, injectables, skin renewal, and advanced rejuvenation treatments.',
    items: ['HydraFacial', 'Botox', 'HIFU', 'Microneedling RF', 'Dermal Fillers', 'Carbon Laser Peel'],
    image: IMAGES.heroFace,
    imageAlt: 'Luxury facial treatment',
  },
  {
    label: 'Body',
    href: '/body',
    description: 'Non-surgical body contouring, fat reduction, and skin tightening.',
    items: ['CoolSculpting', 'EMS Sculpting', 'Cryo Fat Freezing', 'Body Sculpting', 'Lipo Cavitation'],
    image: IMAGES.heroBody,
    imageAlt: 'Body contouring treatment',
  },
]

export function TreatmentDiscovery() {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">What We Offer</p>
          <h2 className="font-cormorant text-editorial text-espresso">Treatments Designed for You</h2>
          <span className="gold-line" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl border border-champagne hover:border-gold transition-all duration-500 card-3d min-h-[400px] flex flex-col justify-end"
            >
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.imageAlt}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
              {/* Content */}
              <div className="relative z-10 p-8">
                <p className="section-label text-gold mb-2">{cat.label} Treatments</p>
                <h3 className="font-cormorant text-3xl text-ivory mb-3">{cat.label}</h3>
                <p className="font-manrope text-sm text-ivory/70 leading-relaxed mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cat.items.map((item) => (
                    <span key={item} className="font-manrope text-xs bg-ivory/10 text-ivory px-3 py-1 rounded-full border border-ivory/20">
                      {item}
                    </span>
                  ))}
                </div>
                <span className="font-manrope text-xs tracking-widest uppercase text-gold flex items-center gap-2">
                  Explore {cat.label} <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
