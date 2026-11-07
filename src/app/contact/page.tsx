import type { Metadata } from 'next'
import { BOOKING_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact Us | New Beauty Med Spa Encino',
  description: 'Contact New Beauty Med Spa in Encino, CA. Book your appointment or reach our team at (213) 223-7963.',
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-gold mb-4">Get in Touch</p>
          <h1 className="font-cormorant text-display text-ivory font-light leading-none mb-4">Contact Us</h1>
          <span className="gold-line mx-0" />
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-cormorant text-2xl text-espresso mb-6">Visit Our Spa</h2>
            <div className="space-y-6 font-manrope text-sm text-taupe">
              <div>
                <p className="font-semibold text-espresso mb-1">Address</p>
                <address className="not-italic leading-relaxed">
                  15622 Ventura Blvd<br />Encino, CA 91436
                </address>
              </div>
              <div>
                <p className="font-semibold text-espresso mb-1">Phone</p>
                <a href="tel:+12132237963" className="hover:text-gold transition-colors">(213) 223-7963</a>
              </div>
              <div>
                <p className="font-semibold text-espresso mb-1">Email</p>
                <a href="mailto:Newmedspa1@gmail.com" className="hover:text-gold transition-colors">Newmedspa1@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 text-center">
            <h2 className="font-cormorant text-2xl text-espresso mb-4">Book Your Appointment</h2>
            <p className="font-manrope text-sm text-taupe mb-8 leading-relaxed">
              Ready to begin your aesthetic journey? Book online 24/7 through our secure booking system.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 text-sm w-full inline-flex justify-center"
            >
              Book Online Now
            </a>
            <p className="font-manrope text-xs text-taupe mt-4">Or call us at (213) 223-7963</p>
          </div>
        </div>
      </section>
    </>
  )
}
