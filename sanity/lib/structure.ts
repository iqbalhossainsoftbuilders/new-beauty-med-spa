import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('New Beauty Med Spa CMS')
    .items([
      S.documentTypeListItem('treatment').title('Treatments'),
      S.documentTypeListItem('package').title('Packages'),
      S.documentTypeListItem('beforeAfter').title('Before & After'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faqItem').title('FAQ Items'),
      S.divider(),
      S.documentTypeListItem('siteSettings').title('Site Settings'),
    ])
