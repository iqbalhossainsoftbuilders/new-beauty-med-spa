import type { Treatment } from '@/types'
import { TreatmentHero } from './TreatmentHero'
import { TreatmentOverview } from './TreatmentOverview'
import { TreatmentBenefits } from './TreatmentBenefits'
import { TreatmentProcess } from './TreatmentProcess'
import { TreatmentFAQ } from './TreatmentFAQ'
import { TreatmentCTA } from './TreatmentCTA'
import { RelatedTreatments } from './RelatedTreatments'

export function TreatmentLayout({ treatment }: { treatment: Treatment }) {
  return (
    <>
      <TreatmentHero
        name={treatment.name}
        category={treatment.category}
        subcategory={treatment.subcategory}
        intro={treatment.intro}
        slug={treatment.slug}
      />
      <TreatmentOverview
        intro={treatment.intro}
        quickInfo={treatment.quickInfo}
        duration={treatment.duration}
        downtime={treatment.downtime}
        aftercare={treatment.aftercare}
      />
      <TreatmentBenefits
        benefits={treatment.benefits}
        concernTags={treatment.concernTags}
      />
      <TreatmentProcess steps={treatment.howItWorks} />
      <TreatmentFAQ faqs={treatment.faqs} />
      <TreatmentCTA
        treatmentName={treatment.name}
        slug={treatment.slug}
        candidateDescription={treatment.candidateDescription}
      />
      <RelatedTreatments
        relatedSlugs={treatment.relatedSlugs}
        currentCategory={treatment.category}
      />
    </>
  )
}
