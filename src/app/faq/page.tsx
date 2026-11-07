'use client'
import { useState } from 'react'
import { BOOKING_URL } from '@/lib/utils'

const FAQS = [
  {
    question: 'What treatments do you offer?',
    answer: 'We offer over 49 non-surgical aesthetic treatments including HydraFacial, HIFU, Botox, Dermal Fillers, Microneedling RF, CoolSculpting, EMS Sculpting, and many more. Browse our Face and Body treatment pages for the complete list.',
  },
  {
    question: 'Are your treatments safe?',
    answer: 'Yes. All our treatments are non-surgical, FDA-cleared or clinically validated procedures performed by trained specialists. We prioritize client safety and always conduct a thorough consultation before any treatment.',
  },
  {
    question: 'How do I book an appointment?',
    answer: 'You can book online 24/7 through our secure booking system by clicking any "Book Now" button on our website. You can also call us at (213) 223-7963 or email Newmedspa1@gmail.com.',
  },
  {
    question: 'Where are you located?',
    answer: 'We are located at 15622 Ventura Blvd, Encino, CA 91436 — in the heart of the San Fernando Valley.',
  },
  {
    question: 'What should I expect during my first visit?',
    answer: 'Your first visit begins with a consultation where our specialist assesses your skin and goals, explains treatment options, and creates a personalized plan. Treatment can often begin the same day.',
  },
  {
    question: 'Do treatments hurt?',
    answer: 'Most of our treatments are comfortable and well-tolerated. Some treatments involve mild sensations such as warmth or slight pressure. We discuss what to expect during your consultation.',
  },
  {
    question: 'What is the downtime for most treatments?',
    answer: 'Many of our treatments have minimal to no downtime, allowing you to return to normal activities immediately. Some treatments may involve temporary redness or swelling. Downtime varies by treatment — check individual treatment pages for specifics.',
  },
  {
    question: 'Do you offer packages?',
    answer: 'Yes! We offer curated treatment packages that combine our most effective treatments at exceptional value. Visit our Packages page to explore options for face and body.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <section className="pt-32 pb-16 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-gold mb-4">Common Questions</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">FAQ</h1>
          <span className="gold-line mx-0" />
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-champagne rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-champagne/20 transition-colors"
                >
                  <span className="font-manrope text-sm font-medium text-espresso pr-4">{faq.question}</span>
                  <span className="font-cormorant text-gold text-xl flex-shrink-0">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-4">
                    <p className="font-manrope text-sm text-taupe leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center glass-panel rounded-2xl p-8">
            <p className="font-cormorant text-2xl text-espresso mb-4">Still Have Questions?</p>
            <p className="font-manrope text-sm text-taupe mb-6">Our specialists are happy to answer any questions during a complimentary consultation.</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 text-sm">
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
