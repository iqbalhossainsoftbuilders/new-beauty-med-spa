import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url', initialValue: 'https://api.leadconnectorhq.com/widget/group/ChfhJbuZKv0tpddfdb0E' }),
    defineField({ name: 'phone', type: 'string', initialValue: '(213) 223-7963' }),
    defineField({ name: 'email', type: 'string', initialValue: 'Newmedspa1@gmail.com' }),
    defineField({ name: 'address', type: 'string', initialValue: '15622 Ventura Blvd, Encino, CA 91436' }),
    defineField({ name: 'businessHours', type: 'array', of: [{ type: 'object', name: 'hours', fields: [
      defineField({ name: 'days', type: 'string' }),
      defineField({ name: 'hours', type: 'string' }),
    ] }] }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'facebookUrl', type: 'url' }),
    defineField({ name: 'tiktokUrl', type: 'url' }),
  ],
})
