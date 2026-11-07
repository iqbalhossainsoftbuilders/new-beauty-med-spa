import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { localTreatments } from '@/data/treatments'
import { TreatmentLayout } from '@/components/treatments'

export async function generateStaticParams() {
  return localTreatments
    .filter((t) => t.category === 'body')
    .map((t) => ({ slug: t.slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const treatment = localTreatments.find(
    (t) => t.slug === params.slug && t.category === 'body'
  )
  if (!treatment) return { title: 'Treatment Not Found' }
  return {
    title: treatment.seoTitle,
    description: treatment.seoDescription,
  }
}

export default function BodyTreatmentPage({ params }: { params: { slug: string } }) {
  const treatment = localTreatments.find(
    (t) => t.slug === params.slug && t.category === 'body'
  )
  if (!treatment) notFound()
  return <TreatmentLayout treatment={treatment} />
}
