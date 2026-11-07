import type { Metadata } from 'next'
import { BOOKING_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About New Beauty Med Spa | Encino CA',
  description: 'Learn about New Beauty Med Spa — a premier luxury medical aesthetics spa in Encino, Los Angeles. Expert team, advanced treatments, personalized care.',
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-gold mb-4">Our Story</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">
            About New Beauty
          </h1>
          <span className="gold-line mx-0" />
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-cormorant text-3xl text-espresso italic font-light mb-8 leading-snug">
            "We believe every client deserves honest consultations, evidence-based treatments, and results that enhance their natural beauty."
          </p>
          <span className="gold-line mx-0 mb-8" />
          <div className="font-manrope text-sm text-taupe leading-relaxed space-y-4">
            <p>
              New Beauty Med Spa is a premier destination for advanced non-surgical aesthetic treatments,
              located at 15622 Ventura Blvd in the heart of Encino, Los Angeles.
            </p>
            <p>
              Our team of experienced specialists combines deep medical expertise with an individualized
              approach to beauty. We stay at the forefront of aesthetic medicine, offering the most
              effective and safe non-surgical treatments available.
            </p>
            <p>
              From signature HydraFacials to advanced HIFU lifting, body contouring, and injectables —
              every treatment is performed with precision, care, and a commitment to natural-looking results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-champagne/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Years of Excellence' },
              { value: '49+', label: 'Treatments Offered' },
              { value: '5★', label: 'Client Rating' },
              { value: '100%', label: 'Non-Surgical Focus' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-6 text-center">
                <p className="font-cormorant text-4xl text-gold font-semibold mb-1">{stat.value}</p>
                <p className="font-manrope text-xs text-espresso tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-espresso text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl text-ivory mb-4">Visit Us in Encino</h2>
          <address className="not-italic font-manrope text-sm text-ivory/60 mb-8 leading-relaxed">
            15622 Ventura Blvd, Encino, CA 91436<br />
            <a href="tel:+12132237963" className="hover:text-gold transition-colors">(213) 223-7963</a>
          </address>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 text-sm">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
