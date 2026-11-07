'use client'
import { useEffect } from 'react'
import { BOOKING_URL } from '@/lib/utils'

export default function BookPage() {
  useEffect(() => {
    window.location.href = BOOKING_URL
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center px-6">
        <p className="font-manrope text-sm text-taupe mb-4">Redirecting to our booking system...</p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-manrope text-xs text-gold hover:underline"
        >
          Click here if not redirected
        </a>
      </div>
    </section>
  )
}
