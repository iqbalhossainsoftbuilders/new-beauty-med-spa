'use client'
import { useState } from 'react'

interface FaqEntry {
  question: string
  answer: string
}

export function TreatmentFAQ({ faqs }: { faqs: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-4">Common Questions</p>
          <h2 className="font-cormorant text-editorial text-espresso">FAQ</h2>
          <span className="gold-line" />
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-champagne rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-champagne/20 transition-colors"
              >
                <span className="font-manrope text-sm font-medium text-espresso pr-4">{faq.question}</span>
                <span className="font-cormorant text-gold text-xl flex-shrink-0">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="font-manrope text-sm text-taupe leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
