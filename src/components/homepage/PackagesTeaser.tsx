import Link from 'next/link'
import { BOOKING_URL } from '@/lib/utils'

const FEATURED_PACKAGES = [
  {
    name: 'Gold Package',
    area: 'Full Face & Neck',
    price: '$8,000',
    value: '$10,700',
    treatments: ['8 Morpheus8 Treatments', '8 HIFU Face & Neck', '8 Full Face Skin Tightening', '3 Laser PRX Sessions'],
  },
  {
    name: 'Full Face',
    area: 'Face · Eyes · Neck',
    price: '$6,480',
    value: '$10,070',
    treatments: ['Lower Face Lifting', 'Neck Rejuvenation', 'Eye Area Renewal', 'Skincare Products'],
  },
  {
    name: 'Full Body',
    area: 'Complete Body',
    price: '$11,700',
    value: '$17,220',
    treatments: ['Abdomen Contouring', 'Thigh Sculpting', 'Buttocks Lifting', 'Arm Tightening'],
  },
]

export function PackagesTeaser() {
  return (
    <section className="py-24 bg-champagne/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Bundle & Save</p>
          <h2 className="font-cormorant text-editorial text-espresso">
            Treatment Packages
          </h2>
          <span className="gold-line" />
          <p className="font-manrope text-sm text-taupe max-w-xl mx-auto mt-4">
            Curated combinations of our most effective treatments at exceptional value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {FEATURED_PACKAGES.map((pkg) => (
            <div key={pkg.name} className="glass-panel rounded-2xl p-8 flex flex-col">
              <p className="section-label mb-2">{pkg.area}</p>
              <h3 className="font-cormorant text-2xl text-espresso mb-1">{pkg.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-cormorant text-3xl text-gold font-semibold">{pkg.price}</span>
                <span className="font-manrope text-xs text-taupe line-through">{pkg.value} value</span>
              </div>
              <ul className="space-y-1 mb-6 flex-1">
                {pkg.treatments.map((t) => (
                  <li key={t} className="font-manrope text-xs text-espresso flex items-start gap-2">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs py-3 text-center w-full"
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/packages" className="btn-outline text-espresso px-8 py-3 text-xs">
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  )
}
