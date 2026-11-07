import type { Metadata } from 'next'
import { BOOKING_URL } from '@/lib/utils'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Book Now | New Beauty Med Spa Encino',
}

export default function BookPage() {
  redirect(BOOKING_URL)
}
