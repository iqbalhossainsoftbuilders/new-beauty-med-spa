import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export const BOOKING_URL =
  'https://api.leadconnectorhq.com/widget/group/ChfhJbuZKv0tpddfdb0E'

export function getBookingUrl(treatmentSlug?: string): string {
  if (!treatmentSlug) return BOOKING_URL
  return `${BOOKING_URL}?service=${encodeURIComponent(treatmentSlug)}`
}
