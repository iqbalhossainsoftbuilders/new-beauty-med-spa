import { defineType, defineField } from 'sanity'

export const beforeAfterSchema = defineType({
  name: 'beforeAfter',
  title: 'Before & After',
  type: 'document',
  fields: [
    defineField({ name: 'category', type: 'string', options: { list: ['face', 'skin', 'body'] }, validation: (R) => R.required() }),
    defineField({ name: 'treatmentName', type: 'string' }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'consentConfirmed', title: 'Patient Consent Confirmed', type: 'boolean', initialValue: false, validation: (R) => R.required() }),
  ],
})
