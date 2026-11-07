import { defineType, defineField } from 'sanity'

export const faqItemSchema = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'answer', type: 'text', validation: (R) => R.required() }),
    defineField({ name: 'category', type: 'string', options: { list: ['treatments', 'booking', 'pricing', 'aftercare', 'general'] } }),
    defineField({ name: 'sortOrder', type: 'number' }),
  ],
})
