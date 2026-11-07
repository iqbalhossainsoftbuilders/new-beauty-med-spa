import Link from 'next/link'
import Image from 'next/image'
import { BOOKING_URL } from '@/lib/utils'
import { IMAGES } from '@/lib/images'

export function AboutTeaser() {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">About New Beauty</p>
            <h2 className="font-cormorant text-editorial text-espresso mb-6">Where Science Meets Beauty</h2>
            <span className="gold-line mx-0 mb-6" />
            <p className="font-manrope text-sm text-taupe leading-relaxed mb-4">
              Located at 15622 Ventura Blvd in Encino, New Beauty Med Spa is a premier destination
              for advanced non-surgical aesthetic treatments. Our team of specialists combines
              medical expertise with an individualized approach to beauty.
            </p>
            <p className="font-manrope text-sm text-taupe leading-relaxed mb-8">
              We believe that every client deserves honest consultations, evidence-based treatments,
              and results that enhance their confidence without compromising their natural features.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '49+', label: 'Treatments Offered' },
                { value: '5★', label: 'Client Rating' },
                { value: '100%', label: 'Non-Surgical' },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-xl p-4 text-center">
                  <p className="font-cormorant text-3xl text-gold font-semibold mb-0.5">{stat.value}</p>
                  <p className="font-manrope text-xs text-espresso tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-outline text-espresso px-8 py-3 text-xs">Our Story</Link>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark px-8 py-3 text-xs"
              >
                Book Consultation
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={IMAGES.spaInterior}
              alt="New Beauty Med Spa interior"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
