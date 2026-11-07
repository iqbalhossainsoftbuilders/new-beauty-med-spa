import type { Metadata } from 'next'
import { localPackages } from '@/data/packages'
import { BOOKING_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Treatment Packages | New Beauty Med Spa Encino',
  description: 'Curated treatment packages for face and body at exceptional value. Book a package at New Beauty Med Spa, Encino CA.',
}

export default function PackagesPage() {
  const facePackages = localPackages.filter((p) => p.category === 'face')
  const bodyPackages = localPackages.filter((p) => p.category === 'body')

  return (
    <>
      <section className="pt-32 pb-16 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-gold mb-4">Bundle & Save</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">
            Treatment Packages
          </h1>
          <span className="gold-line mx-0 mb-6" />
          <p className="font-manrope text-sm text-ivory/60 max-w-xl">
            Comprehensive combinations of our most effective treatments at exceptional value.
          </p>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Face packages */}
          <div>
            <h2 className="font-cormorant text-2xl text-espresso mb-2">Face Packages</h2>
            <span className="block w-12 h-px bg-gold mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facePackages.map((pkg) => (
                <div key={pkg.slug} className={`glass-panel rounded-2xl p-8 flex flex-col ${pkg.featured ? 'border-gold ring-1 ring-gold' : ''}`}>
                  {pkg.featured && (
                    <span className="font-manrope text-xs text-gold uppercase tracking-wide mb-2">Featured</span>
                  )}
                  <p className="section-label mb-2">{pkg.area}</p>
                  <h3 className="font-cormorant text-2xl text-espresso mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-cormorant text-3xl text-gold font-semibold">{pkg.priceDisplay}</span>
                    <span className="font-manrope text-xs text-taupe line-through">{pkg.valueDisplay} value</span>
                  </div>
                  <ul className="space-y-1 mb-6 flex-1">
                    {pkg.included.map((item) => (
                      <li key={item} className="font-manrope text-xs text-espresso flex items-start gap-2">
                        <span className="text-gold mt-0.5">✓</span>{item}
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
          </div>

          {/* Body packages */}
          <div>
            <h2 className="font-cormorant text-2xl text-espresso mb-2">Body Packages</h2>
            <span className="block w-12 h-px bg-gold mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bodyPackages.map((pkg) => (
                <div key={pkg.slug} className={`glass-panel rounded-2xl p-8 flex flex-col ${pkg.featured ? 'border-gold ring-1 ring-gold' : ''}`}>
                  {pkg.featured && (
                    <span className="font-manrope text-xs text-gold uppercase tracking-wide mb-2">Featured</span>
                  )}
                  <p className="section-label mb-2">{pkg.area}</p>
                  <h3 className="font-cormorant text-2xl text-espresso mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-cormorant text-3xl text-gold font-semibold">{pkg.priceDisplay}</span>
                    <span className="font-manrope text-xs text-taupe line-through">{pkg.valueDisplay} value</span>
                  </div>
                  <ul className="space-y-1 mb-6 flex-1">
                    {pkg.included.map((item) => (
                      <li key={item} className="font-manrope text-xs text-espresso flex items-start gap-2">
                        <span className="text-gold mt-0.5">✓</span>{item}
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
          </div>
        </div>
      </section>
    </>
  )
}
