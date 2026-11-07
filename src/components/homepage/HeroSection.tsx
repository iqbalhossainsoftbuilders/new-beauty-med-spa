import Image from 'next/image'
import { BOOKING_URL } from '@/lib/utils'
import { IMAGES } from '@/lib/images'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.heroFacial}
          alt="Luxury spa facial treatment"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          style={{ animation: 'kenburns 20s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-espresso/60 to-charcoal/70" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10" />
      <div className="absolute top-1/3 right-8 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="section-label text-gold mb-6">
          Luxury Medical Aesthetics · Encino, Los Angeles
        </p>
        <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-6">
          Redefine<br />
          <em className="italic text-champagne">Your Beauty</em>
        </h1>
        <span className="gold-line" />
        <p className="font-manrope text-base text-ivory/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Expert medical aesthetics in the heart of Encino.
          Advanced treatments, natural results, uncompromising care.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 text-sm"
          >
            Book Your Consultation
          </a>
          <a href="/face" className="btn-outline text-ivory border-ivory/40 px-10 py-4 text-sm hover:bg-ivory hover:text-espresso hover:border-ivory">
            Explore Treatments
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-manrope text-xs tracking-widest uppercase text-ivory/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-float" />
      </div>
    </section>
  )
}
