import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'quote', type: 'text', validation: (R) => R.required() }),
    defineField({ name: 'rating', type: 'number', validation: (R) => R.required().min(1).max(5) }),
    defineField({ name: 'treatmentName', type: 'string' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
})
