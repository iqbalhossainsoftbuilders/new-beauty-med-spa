export type TreatmentCategory = 'face' | 'body'

export type FaceSubcategory =
  | 'facials'
  | 'injectables'
  | 'skin-renewal'
  | 'other'

export type BodySubcategory = 'body'

export interface QuickInfo {
  duration: string
  bestFor: string
  sessions: string
}

export interface Benefit {
  title: string
  description: string
  icon?: string
}

export interface ProcessStep {
  stepNumber: number
  title: string
  description: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface Treatment {
  name: string
  slug: string
  category: TreatmentCategory
  subcategory: FaceSubcategory | BodySubcategory
  intro: string
  quickInfo: QuickInfo
  benefits: Benefit[]
  candidateDescription: string
  concernTags: string[]
  howItWorks: ProcessStep[]
  duration: string
  downtime: string
  aftercare: string
  faqs: FaqEntry[]
  relatedSlugs: string[]
  seoTitle: string
  seoDescription: string
  heroImageQuery: string
}

export interface SpaPackage {
  name: string
  slug: string
  area: string
  category: TreatmentCategory
  price: number
  statedValue: number
  priceDisplay: string
  valueDisplay: string
  included: string[]
  benefits: string
  featured: boolean
  heroImageQuery: string
}

export interface BeforeAfter {
  id: string
  category: TreatmentCategory | 'skin'
  treatmentName: string
  treatmentSlug: string
  caption?: string
}

export interface Testimonial {
  clientName: string
  quote: string
  rating: number
  treatmentName: string
  featured: boolean
}

export interface FaqItem {
  question: string
  answer: string
  category: 'treatments' | 'booking' | 'pricing' | 'aftercare' | 'general'
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  treatmentInterest: string
  message: string
}
