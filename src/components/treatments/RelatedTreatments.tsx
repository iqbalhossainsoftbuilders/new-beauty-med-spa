import Link from 'next/link'
import { localTreatments } from '@/data/treatments'

interface RelatedTreatmentsProps {
  relatedSlugs: string[]
  currentCategory: 'face' | 'body'
}

export function RelatedTreatments({ relatedSlugs, currentCategory }: RelatedTreatmentsProps) {
  const related = relatedSlugs
    .slice(0, 3)
    .map((slug) => localTreatments.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  if (related.length === 0) return null

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-4">You May Also Like</p>
          <h2 className="font-cormorant text-editorial text-espresso">Related Treatments</h2>
          <span className="gold-line" />
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.category}/${t.slug}`}
              className="group bg-white border border-champagne rounded-2xl p-6 hover:border-gold transition-all duration-300"
            >
              <p className="section-label mb-2 capitalize">{t.subcategory.replace(/-/g, ' ')}</p>
              <h3 className="font-playfair text-xl text-espresso mb-2 group-hover:text-gold transition-colors">
                {t.name}
              </h3>
              <p className="font-manrope text-xs text-taupe overflow-hidden">{t.intro}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
