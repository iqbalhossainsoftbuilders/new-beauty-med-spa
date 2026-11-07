'use client'
import { BOOKING_URL } from '@/lib/utils'
import { trackBookingClick } from '@/lib/analytics'

export function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-espresso border-t border-gold/30 py-3 px-6">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackBookingClick({ location: 'mobile-sticky-bar' })}
        className="flex items-center justify-center gap-2 text-ivory font-manrope text-xs tracking-wide-xl uppercase font-semibold"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        Book Your Consultation
      </a>
    </div>
  )
}
