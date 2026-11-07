'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BOOKING_URL } from '@/lib/utils'
import { trackBookingClick } from '@/lib/analytics'

const NAV_LINKS = [
  { label: 'Face Treatments', href: '/face' },
  { label: 'Body Treatments', href: '/body' },
  { label: 'Packages', href: '/packages' },
  { label: 'Before & After', href: '/before-after' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-ivory transition-transform duration-500 ease-luxury',
        open ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex justify-between items-center px-6 py-6 border-b border-champagne">
        <span className="font-cormorant text-xl font-semibold text-espresso uppercase tracking-wide-xl">
          New Beauty Med Spa
        </span>
        <button onClick={onClose} className="text-espresso text-2xl" aria-label="Close menu">
          ✕
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-6 py-8 flex-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-cormorant text-2xl text-espresso py-3 border-b border-champagne/50 hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="px-6 pb-8">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { trackBookingClick({ location: 'mobile-menu' }); onClose() }}
          className="btn-gold w-full text-center py-4"
        >
          Book Your Consultation
        </a>
      </div>
    </div>
  )
}
