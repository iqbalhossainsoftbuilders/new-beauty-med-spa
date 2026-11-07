import { defineType, defineField } from 'sanity'

export const treatmentSchema = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Treatment Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Face', value: 'face' }, { title: 'Body', value: 'body' }] }, validation: (R) => R.required() }),
    defineField({ name: 'subcategory', title: 'Subcategory', type: 'string', options: { list: [
      { title: 'Facials', value: 'facials' },
      { title: 'Injectables & Rejuvenation', value: 'injectables' },
      { title: 'Skin Renewal & Advanced', value: 'skin-renewal' },
      { title: 'Other', value: 'other' },
      { title: 'Body', value: 'body' },
    ] } }),
    defineField({ name: 'intro', title: 'Short Introduction', type: 'text', rows: 3 }),
    defineField({ name: 'quickInfo', title: 'Quick Info Bar', type: 'object', fields: [
      defineField({ name: 'duration', type: 'string', title: 'Duration (e.g. 60 min)' }),
      defineField({ name: 'bestFor', type: 'string', title: 'Best For' }),
      defineField({ name: 'sessions', type: 'string', title: 'Recommended Sessions' }),
    ] }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'benefits', title: 'Key Benefits', type: 'array', of: [{ type: 'object', name: 'benefit', fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'description', type: 'string' }),
    ] }] }),
    defineField({ name: 'candidateDescription', title: 'Who is a Candidate?', type: 'text' }),
    defineField({ name: 'concernTags', title: 'Concerns Addressed', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'howItWorks', title: 'How It Works (3 Steps)', type: 'array', of: [{ type: 'object', name: 'step', fields: [
      defineField({ name: 'stepNumber', type: 'number' }),
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'description', type: 'string' }),
    ] }] }),
    defineField({ name: 'duration', title: 'Treatment Duration', type: 'string' }),
    defineField({ name: 'downtime', title: 'Downtime / Recovery', type: 'string' }),
    defineField({ name: 'aftercare', title: 'Aftercare Info', type: 'text' }),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'object', name: 'faq', fields: [
      defineField({ name: 'question', type: 'string' }),
      defineField({ name: 'answer', type: 'text' }),
    ] }] }),
    defineField({ name: 'relatedTreatments', title: 'Related Treatments', type: 'array', of: [{ type: 'reference', to: [{ type: 'treatment' }] }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
