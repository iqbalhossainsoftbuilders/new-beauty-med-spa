declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackBookingClick(params: {
  treatmentSlug?: string
  location: string
}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'book_now_click', {
    treatment: params.treatmentSlug ?? 'general',
    cta_location: params.location,
  })
}
