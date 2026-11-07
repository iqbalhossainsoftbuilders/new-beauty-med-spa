import { defineType, defineField } from 'sanity'

export const packageSchema = defineType({
  name: 'package',
  title: 'Treatment Package',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'area', title: 'Target Area', type: 'string' }),
    defineField({ name: 'category', type: 'string', options: { list: [{ title: 'Face', value: 'face' }, { title: 'Body', value: 'body' }] } }),
    defineField({ name: 'price', title: 'Price (USD)', type: 'number' }),
    defineField({ name: 'statedValue', title: 'Stated Value (USD)', type: 'number' }),
    defineField({ name: 'included', title: 'Included Treatments', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'benefits', title: 'Benefits Summary', type: 'text' }),
    defineField({ name: 'featured', title: 'Featured Package', type: 'boolean', initialValue: false }),
  ],
})
