import { BOOKING_URL } from '@/lib/utils'

interface TreatmentCTAProps {
  treatmentName: string
  slug: string
  candidateDescription: string
}

export function TreatmentCTA({ treatmentName, slug, candidateDescription }: TreatmentCTAProps) {
  return (
    <section className="py-20 bg-charcoal text-ivory">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="section-label text-gold mb-6">Ready to Begin?</p>
        <h2 className="font-cormorant text-editorial text-champagne mb-4">
          Book Your {treatmentName} Consultation
        </h2>
        <span className="gold-line" />
        <p className="font-manrope text-sm text-ivory/60 leading-relaxed mb-8 max-w-lg mx-auto">
          {candidateDescription}
        </p>
        <a
          href={`${BOOKING_URL}?service=${encodeURIComponent(slug)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold px-10 py-4 text-sm"
        >
          Book Now
        </a>
        <p className="font-manrope text-xs text-ivory/30 mt-6">
          Individual results may vary. All treatments are subject to a consultation.
        </p>
      </div>
    </section>
  )
}
