interface Benefit {
  title: string
  description: string
}

export function TreatmentBenefits({ benefits, concernTags }: { benefits: Benefit[]; concernTags: string[] }) {
  return (
    <section className="py-20 bg-champagne/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-4">Key Benefits</p>
          <h2 className="font-cormorant text-editorial text-espresso">What You&apos;ll Experience</h2>
          <span className="gold-line" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((b) => (
            <div key={b.title} className="bg-ivory rounded-2xl p-6 border border-champagne">
              <h3 className="font-playfair text-lg text-espresso mb-2">{b.title}</h3>
              <p className="font-manrope text-xs text-taupe leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
        {concernTags.length > 0 && (
          <div className="text-center">
            <p className="font-manrope text-xs text-taupe uppercase tracking-wide mb-3">Addresses</p>
            <div className="flex flex-wrap justify-center gap-2">
              {concernTags.map((tag) => (
                <span key={tag} className="font-manrope text-xs bg-espresso text-champagne px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
