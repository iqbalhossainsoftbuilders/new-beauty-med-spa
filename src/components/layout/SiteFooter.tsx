import Link from 'next/link'
import { BOOKING_URL } from '@/lib/utils'

const FACE_LINKS = [
  { label: 'HydraFacial', href: '/face/hydrafacial' },
  { label: 'HIFU', href: '/face/hifu' },
  { label: 'Botox', href: '/face/botox' },
  { label: 'Microneedling RF', href: '/face/microneedling-radio-frequency' },
  { label: 'Dermal Fillers', href: '/face/dermal-fillers' },
  { label: 'Carbon Laser Peel', href: '/face/carbon-laser-peel' },
]

const BODY_LINKS = [
  { label: 'CoolSculpting', href: '/body/coolsculpting' },
  { label: 'EMS Sculpting', href: '/body/ems-sculpting' },
  { label: 'Cryo Fat Freezing', href: '/body/cryo-fat-freezing' },
  { label: 'Body Sculpting', href: '/body/body-sculpting' },
  { label: 'Laser Hair Removal', href: '/body/hair-removal' },
]

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-cormorant text-2xl font-semibold text-ivory uppercase tracking-wide-xl mb-2">
            New Beauty
          </p>
          <p className="font-manrope text-xs tracking-wide-2xl text-gold uppercase mb-6">Med Spa</p>
          <address className="not-italic font-manrope text-sm text-ivory/60 leading-relaxed">
            15622 Ventura Blvd<br />
            Encino, CA 91436<br />
            <a href="tel:+12132237963" className="hover:text-gold transition-colors">(213) 223-7963</a><br />
            <a href="mailto:Newmedspa1@gmail.com" className="hover:text-gold transition-colors">Newmedspa1@gmail.com</a>
          </address>
        </div>

        {/* Face */}
        <div>
          <h3 className="section-label text-champagne/60 mb-4">Face Treatments</h3>
          <ul className="space-y-2">
            {FACE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-manrope text-sm text-ivory/60 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/face" className="font-manrope text-sm text-gold/80 hover:text-gold transition-colors">
                View All Face →
              </Link>
            </li>
          </ul>
        </div>

        {/* Body */}
        <div>
          <h3 className="section-label text-champagne/60 mb-4">Body Treatments</h3>
          <ul className="space-y-2">
            {BODY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-manrope text-sm text-ivory/60 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/body" className="font-manrope text-sm text-gold/80 hover:text-gold transition-colors">
                View All Body →
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="section-label text-champagne/60 mb-4">Quick Links</h3>
          <ul className="space-y-2 mb-8">
            {[
              { label: 'Packages', href: '/packages' },
              { label: 'Before & After', href: '/before-after' },
              { label: 'About Us', href: '/about' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy Policy', href: '/privacy-policy' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-manrope text-sm text-ivory/60 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs px-5 py-3 inline-flex"
          >
            Book Now
          </a>
        </div>
      </div>

      <div className="border-t border-ivory/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-center">
          <p className="font-manrope text-xs text-ivory/40">
            © {new Date().getFullYear()} New Beauty Med Spa. All rights reserved.
          </p>
          <p className="font-manrope text-xs text-ivory/40">
            Individual results may vary. Consult with our specialists for personalized advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
