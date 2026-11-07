import Link from 'next/link'
import Image from 'next/image'
import { IMAGES } from '@/lib/images'

const FEATURED = [
  {
    name: 'HydraFacial',
    slug: '/face/hydrafacial',
    category: 'Face',
    description: 'The award-winning multi-step facial that cleanses, hydrates, and infuses antioxidants in one session.',
    tags: ['No Downtime', 'All Skin Types', 'Instant Results'],
    image: IMAGES.hydrafacial,
  },
  {
    name: 'HIFU',
    slug: '/face/hifu',
    category: 'Face',
    description: 'High-Intensity Focused Ultrasound — a non-surgical lift that targets the SMAS layer for lasting results.',
    tags: ['Non-Surgical Lift', 'No Downtime', 'Long-Lasting'],
    image: IMAGES.hifu,
  },
  {
    name: 'Morpheus8 / RF Microneedling',
    slug: '/face/microneedling-radio-frequency',
    category: 'Face',
    description: 'Combines microneedling with radiofrequency energy to remodel collagen deep in the dermis.',
    tags: ['Collagen Boost', 'Scar Reduction', 'Skin Tightening'],
    image: IMAGES.microneedling,
  },
  {
    name: 'CoolSculpting',
    slug: '/body/coolsculpting',
    category: 'Body',
    description: "FDA-cleared cryolipolysis that permanently eliminates stubborn fat cells — no surgery, no needles.",
    tags: ['FDA Cleared', 'Permanent Fat Loss', 'No Surgery'],
    image: IMAGES.coolsculpting,
  },
]

export function FeaturedTreatments() {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Most Popular</p>
          <h2 className="font-cormorant text-editorial text-espresso">Signature Treatments</h2>
          <span className="gold-line" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((t) => (
            <Link
              key={t.slug}
              href={t.slug}
              className="group bg-white border border-champagne rounded-2xl overflow-hidden hover:border-gold hover:shadow-card-hover transition-all duration-500 card-3d flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
                <span className="absolute top-3 left-3 font-manrope text-xs bg-gold/90 text-white px-2 py-0.5 rounded-full">
                  {t.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-playfair text-lg text-espresso mb-2 group-hover:text-gold transition-colors duration-300">
                  {t.name}
                </h3>
                <p className="font-manrope text-xs text-taupe leading-relaxed mb-4 flex-1">{t.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {t.tags.map((tag) => (
                    <span key={tag} className="font-manrope text-xs bg-champagne/40 text-espresso px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/face" className="btn-outline text-espresso px-8 py-3 text-xs mr-4">All Face Treatments</Link>
          <Link href="/body" className="btn-outline text-espresso px-8 py-3 text-xs">All Body Treatments</Link>
        </div>
      </div>
    </section>
  )
}
