import { describe, it, expect } from 'vitest'
import { slugify, formatPrice, getBookingUrl, BOOKING_URL } from '@/lib/utils'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('HydraFacial Treatment')).toBe('hydrafacial-treatment')
  })
  it('removes special characters', () => {
    expect(slugify('Microneedling (RF)')).toBe('microneedling-rf')
  })
  it('collapses multiple hyphens', () => {
    expect(slugify('24K  Gold  Facial')).toBe('24k-gold-facial')
  })
})

describe('formatPrice', () => {
  it('formats integer as USD', () => {
    expect(formatPrice(5250)).toBe('$5,250')
  })
})

describe('getBookingUrl', () => {
  it('returns base URL when no slug', () => {
    expect(getBookingUrl()).toBe(BOOKING_URL)
  })
  it('appends service param when slug provided', () => {
    const url = getBookingUrl('hydrafacial')
    expect(url).toContain('service=hydrafacial')
    expect(url).toContain(BOOKING_URL)
  })
})
