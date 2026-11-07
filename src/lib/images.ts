export const IMAGES = {
  // Hero
  heroFacial: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85&fit=crop&auto=format',
  heroFace: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85&fit=crop&auto=format',
  heroBody: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=1600&q=85&fit=crop&auto=format',
  heroAbout: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=85&fit=crop&auto=format',

  // Treatments
  hydrafacial: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&fit=crop&auto=format',
  hifu: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80&fit=crop&auto=format',
  microneedling: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80&fit=crop&auto=format',
  coolsculpting: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80&fit=crop&auto=format',

  // Sections
  brandStatement: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1600&q=85&fit=crop&auto=format',
  spaInterior: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80&fit=crop&auto=format',
  skincare1: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80&fit=crop&auto=format',
  skincare2: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80&fit=crop&auto=format',
  skincare3: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=80&fit=crop&auto=format',
  skincare4: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&fit=crop&auto=format',
  skincare5: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80&fit=crop&auto=format',
  wellness: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80&fit=crop&auto=format',
  beautyProducts: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&fit=crop&auto=format',
  beautyTreatment: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&fit=crop&auto=format',
  facial2: 'https://images.unsplash.com/photo-1611403119860-57c4937ef987?w=800&q=80&fit=crop&auto=format',
  facial3: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&q=80&fit=crop&auto=format',
  face2: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80&fit=crop&auto=format',
  face3: 'https://images.unsplash.com/photo-1507120410856-1f35574c3b45?w=800&q=80&fit=crop&auto=format',
} as const

export type ImageKey = keyof typeof IMAGES

// Map treatment slugs to images
export const TREATMENT_IMAGES: Record<string, string> = {
  hydrafacial: IMAGES.hydrafacial,
  hifu: IMAGES.hifu,
  botox: IMAGES.facial2,
  'microneedling-radio-frequency': IMAGES.microneedling,
  'dermal-fillers': IMAGES.skincare3,
  'carbon-laser-peel': IMAGES.skincare4,
  coolsculpting: IMAGES.coolsculpting,
  'ems-sculpting': IMAGES.spaInterior,
  'cryo-fat-freezing': IMAGES.skincare5,
  'body-sculpting': IMAGES.heroBody,
}

export function getTreatmentImage(slug: string, category: 'face' | 'body'): string {
  return TREATMENT_IMAGES[slug] ?? (category === 'face' ? IMAGES.heroFace : IMAGES.heroBody)
}
