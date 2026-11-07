import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { localTreatments } from '@/data/treatments'
import { BOOKING_URL } from '@/lib/utils'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Body Treatments | New Beauty Med Spa Encino',
  description: 'Non-surgical body contouring, fat reduction, and skin tightening at New Beauty Med Spa, Encino CA. CoolSculpting, EMS Sculpting, and more.',
}

export default function BodyPage() {
  const bodyTreatments = localTreatments.filter((t) => t.category === 'body')

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-charcoal text-ivory min-h-[50vh] flex items-end">
        <Image
          src={IMAGES.heroBody}
          alt="Body treatments"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="section-label text-gold mb-4">Body Contouring</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">
            Body Treatments
          </h1>
          <span className="gold-line mx-0 mb-6" />
          <p className="font-manrope text-sm text-ivory/60 max-w-xl">
            Non-surgical body sculpting, fat reduction, and skin tightening — advanced treatments with no downtime.
          </p>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodyTreatments.map((t) => (
              <Link
                key={t.slug}
                href={`/body/${t.slug}`}
                className="group bg-white border border-champagne rounded-2xl p-6 hover:border-gold hover:shadow-card-hover transition-all duration-300"
              >
                <h3 className="font-playfair text-lg text-espresso mb-2 group-hover:text-gold transition-colors">
                  {t.name}
                </h3>
                <p className="font-manrope text-xs text-taupe leading-relaxed mb-4">
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
      </section>

      {/* CTA */}
      <section className="py-16 bg-espresso text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-cormorant text-3xl text-ivory mb-4">Your Body Transformation Starts Here</h2>
          <p className="font-manrope text-sm text-ivory/60 mb-8">Our specialists will design a customized body contouring plan to achieve your goals.</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 text-sm">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  )
}
