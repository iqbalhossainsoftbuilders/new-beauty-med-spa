const TESTIMONIALS = [
  {
    quote: "The team at New Beauty is absolutely incredible. After my HIFU treatment, I look 10 years younger — and everyone notices!",
    author: "Sarah M.",
    treatment: "HIFU Treatment",
    rating: 5,
  },
  {
    quote: "I've tried other spas but nothing compares to the expertise and care I receive here. My HydraFacial leaves my skin glowing for weeks.",
    author: "Jennifer K.",
    treatment: "HydraFacial",
    rating: 5,
  },
  {
    quote: "The CoolSculpting results exceeded my expectations. After just two sessions, the stubborn fat I had for years is finally gone.",
    author: "Michelle T.",
    treatment: "CoolSculpting",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-espresso">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label text-gold mb-4">Client Stories</p>
          <h2 className="font-cormorant text-editorial text-ivory">
            Real Results, Real People
          </h2>
          <span className="gold-line" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="glass-panel rounded-2xl p-8 border-champagne/10">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              <blockquote className="font-cormorant text-lg italic text-ivory leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-manrope text-sm font-semibold text-champagne">{t.author}</p>
                <p className="font-manrope text-xs text-gold/70">{t.treatment}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-manrope text-xs text-ivory/40 mt-8">
          Individual results may vary. These are representative client experiences.
        </p>
      </div>
    </section>
  )
}
