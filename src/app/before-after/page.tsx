import type { Metadata } from 'next'
import { BOOKING_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Before & After Gallery | New Beauty Med Spa Encino',
  description: 'View real treatment results from our clients at New Beauty Med Spa, Encino CA. Individual results may vary.',
}

export default function BeforeAfterPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-gold mb-4">Real Results</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">
            Before & After
          </h1>
          <span className="gold-line mx-0 mb-6" />
          <p className="font-manrope text-sm text-ivory/60 max-w-xl">
            Authentic client results showcasing the transformative power of our treatments.
          </p>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-panel rounded-2xl p-12 mb-8">
            <p className="font-cormorant text-2xl text-espresso italic mb-4">
              "Our gallery showcases real client results, shared with their consent."
            </p>
            <p className="font-manrope text-sm text-taupe mb-8">
              Visit us in Encino to view our complete before & after portfolio in consultation.
              Our specialists will show you relevant results for your specific treatment of interest.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 text-sm"
            >
              Book a Consultation to View Gallery
            </a>
          </div>
          <p className="font-manrope text-xs text-taupe">
            Individual results may vary. All before & after photos are shared with client consent.
            Results are not guaranteed and depend on individual factors.
          </p>
        </div>
      </section>
    </>
  )
}
