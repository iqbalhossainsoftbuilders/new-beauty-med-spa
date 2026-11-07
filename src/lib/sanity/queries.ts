import { sanityClient } from './client'
import type { Treatment, SpaPackage } from '@/types'
import { localPackages } from '@/data/packages'

const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

async function getLocalTreatments(): Promise<Treatment[]> {
  try {
    const { localTreatments } = await import('@/data/treatments')
    return localTreatments
  } catch {
    return []
  }
}

export async function getAllTreatments(): Promise<Treatment[]> {
  if (!hasSanity) return getLocalTreatments()
  try {
    const data = await sanityClient.fetch(`*[_type == "treatment"] | order(name asc)`)
    if (data.length > 0) return data
    return getLocalTreatments()
  } catch {
    return getLocalTreatments()
  }
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  if (!hasSanity) {
    const treatments = await getLocalTreatments()
    return treatments.find(t => t.slug === slug) ?? null
  }
  try {
    const data = await sanityClient.fetch(
      `*[_type == "treatment" && slug.current == $slug][0]`,
      { slug }
    )
    if (data) return data
    const treatments = await getLocalTreatments()
    return treatments.find(t => t.slug === slug) ?? null
  } catch {
    const treatments = await getLocalTreatments()
    return treatments.find(t => t.slug === slug) ?? null
  }
}

export async function getTreatmentsByCategory(category: 'face' | 'body'): Promise<Treatment[]> {
  const all = await getAllTreatments()
  return all.filter(t => t.category === category)
}

export async function getPackages(): Promise<SpaPackage[]> {
  if (!hasSanity) return localPackages
  try {
    const data = await sanityClient.fetch(`*[_type == "package"] | order(category asc, price asc)`)
    return data.length > 0 ? data : localPackages
  } catch {
    return localPackages
  }
}
