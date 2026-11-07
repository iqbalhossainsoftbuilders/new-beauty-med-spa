'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BOOKING_URL } from '@/lib/utils'
import { trackBookingClick } from '@/lib/analytics'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { label: 'Face', href: '/face' },
  { label: 'Body', href: '/body' },
  { label: 'Packages', href: '/packages' },
  { label: 'Before & After', href: '/before-after' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-ivory/95 backdrop-blur-glass shadow-card py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-cormorant text-xl font-semibold tracking-wide-xl text-espresso uppercase"
          >
            New Beauty
            <span className="block text-xs font-manrope tracking-wide-2xl text-gold font-normal">
              Med Spa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-manrope text-xs tracking-wide-xl uppercase text-espresso hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookingClick({ location: 'header' })}
              className="hidden lg:inline-flex btn-gold text-sm px-6 py-3"
            >
              Book Now
            </a>
            <button
              className="lg:hidden p-2 text-espresso"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-px bg-current mb-1.5" />
              <span className="block w-4 h-px bg-current mb-1.5" />
              <span className="block w-6 h-px bg-current" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
