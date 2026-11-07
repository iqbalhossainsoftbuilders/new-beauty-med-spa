import Link from 'next/link'

const CATEGORIES = [
  {
    label: 'Face',
    href: '/face',
    description: 'Facials, injectables, skin renewal, and advanced rejuvenation treatments.',
    items: ['HydraFacial', 'Botox', 'HIFU', 'Microneedling RF', 'Dermal Fillers', 'Carbon Laser Peel'],
  },
  {
    label: 'Body',
    href: '/body',
    description: 'Non-surgical body contouring, fat reduction, and skin tightening.',
    items: ['CoolSculpting', 'EMS Sculpting', 'Cryo Fat Freezing', 'Body Sculpting', 'Lipo Cavitation'],
  },
]

export function TreatmentDiscovery() {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">What We Offer</p>
          <h2 className="font-cormorant text-editorial text-espresso">
            Treatments Designed for You
          </h2>
          <span className="gold-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl bg-champagne/30 border border-champagne hover:border-gold transition-all duration-500 p-10 card-3d"
            >
              <p className="section-label mb-3">{cat.label} Treatments</p>
              <h3 className="font-cormorant text-3xl text-espresso mb-4 group-hover:text-gold transition-colors duration-300">
                {cat.label}
              </h3>
              <p className="font-manrope text-sm text-taupe leading-relaxed mb-6">
                {cat.description}
              </p>
              <ul className="flex flex-wrap gap-2 mb-8">
                {cat.items.map((item) => (
                  <li key={item} className="font-manrope text-xs bg-ivory text-espresso px-3 py-1 rounded-full border border-champagne">
                    {item}
                  </li>
                ))}
              </ul>
              <span className="font-manrope text-xs tracking-wide-xl uppercase text-gold group-hover:gap-3 flex items-center gap-2 transition-all duration-300">
                Explore {cat.label} <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
