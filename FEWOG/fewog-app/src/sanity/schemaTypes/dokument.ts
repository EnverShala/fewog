import { defineType, defineField } from 'sanity'

export const dokumentSchema = defineType({
  name: 'dokument',
  title: 'Dokument',
  type: 'document',
  fields: [
    defineField({
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
      description: 'z.B. „Mietermagazin 2025" oder „Geschäftsbericht 2024"',
    }),
    defineField({
      name: 'kategorie',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Mietermagazin', value: 'mietermagazin' },
          { title: 'Geschäftsbericht', value: 'geschaeftsbericht' },
          { title: 'Sonstige', value: 'sonstige' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jahr',
      title: 'Jahr',
      type: 'number',
      validation: (r) => r.required().min(1990).max(2100),
    }),
    defineField({
      name: 'datei',
      title: 'PDF hochladen',
      type: 'file',
      description: 'PDF direkt hier hochladen (empfohlen für neue Dokumente)',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'dateiUrl',
      title: 'PDF-Link (externer URL)',
      type: 'url',
      description: 'Alternativ: URL zu einer bereits vorhandenen PDF-Datei',
    }),
  ],
  preview: {
    select: { title: 'titel', subtitle: 'kategorie', jahr: 'jahr' },
    prepare({ title, subtitle, jahr }) {
      const kat: Record<string, string> = {
        mietermagazin: 'Mietermagazin',
        geschaeftsbericht: 'Geschäftsbericht',
        sonstige: 'Sonstige',
      }
      return { title, subtitle: `${kat[subtitle] ?? subtitle} · ${jahr}` }
    },
  },
  orderings: [
    {
      title: 'Jahr (neueste zuerst)',
      name: 'jahrDesc',
      by: [{ field: 'jahr', direction: 'desc' }],
    },
  ],
})
