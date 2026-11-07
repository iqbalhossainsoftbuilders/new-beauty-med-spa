import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { localTreatments } from '@/data/treatments'
import { BOOKING_URL } from '@/lib/utils'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Face Treatments | New Beauty Med Spa Encino',
  description: 'Advanced facial treatments including HydraFacial, HIFU, Botox, Microneedling RF, Dermal Fillers, and more at New Beauty Med Spa, Encino CA.',
}

const SUBCATEGORY_LABELS: Record<string, string> = {
  facials: 'Facials',
  injectables: 'Injectables & Fillers',
  'skin-renewal': 'Skin Renewal',
  other: 'Advanced Treatments',
}

export default function FacePage() {
  const faceTreatments = localTreatments.filter((t) => t.category === 'face')

  const grouped = faceTreatments.reduce<Record<string, typeof faceTreatments>>(
    (acc, t) => {
      const sub = t.subcategory as string
      if (!acc[sub]) acc[sub] = []
      acc[sub].push(t)
      return acc
    },
    {}
  )

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-charcoal text-ivory min-h-[50vh] flex items-end">
        <Image
          src={IMAGES.heroFace}
          alt="Face treatments"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="section-label text-gold mb-4">Medical Aesthetics</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">
            Face Treatments
          </h1>
          <span className="gold-line mx-0 mb-6" />
          <p className="font-manrope text-sm text-ivory/60 max-w-xl">
            From signature facials to advanced non-surgical lifting — explore our complete range of expert face treatments.
          </p>
        </div>
      </section>

      {/* Treatment groups */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {Object.entries(grouped).map(([subcategory, treatments]) => (
            <div key={subcategory}>
              <h2 className="font-cormorant text-2xl text-espresso mb-2">
                {SUBCATEGORY_LABELS[subcategory] ?? subcategory}
              </h2>
              <span className="block w-12 h-px bg-gold mb-8" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {treatments.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/face/${t.slug}`}
                    className="group bg-white border border-champagne rounded-2xl p-6 hover:border-gold hover:shadow-card-hover transition-all duration-300"
                  >
                    <h3 className="font-playfair text-lg text-espresso mb-2 group-hover:text-gold transition-colors">
                      {t.name}
                    </h3>
                    <p className="font-manrope text-xs text-taupe leading-relaxed mb-4 line-clamp-2">
                      {t.intro}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {t.concernTags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-manrope text-xs bg-champagne/40 text-espresso px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-manrope text-xs text-gold mt-4">{t.quickInfo.duration}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-espresso text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl text-ivory mb-4">Not Sure Where to Start?</h2>
          <p className="font-manrope text-sm text-ivory/60 mb-8">Book a consultation and our specialists will create a personalized treatment plan for you.</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 text-sm">
            Book a Free Consultation
          </a>
        </div>
      </section>
    </>
  )
}
