import { defineType, defineField } from 'sanity'

export const neuigkeitSchema = defineType({
  name: 'neuigkeit',
  title: 'Neuigkeit',
  type: 'document',
  groups: [
    { name: 'inhalt', title: 'Inhalt', default: true },
    { name: 'meta', title: 'Einstellungen' },
  ],
  fields: [
    defineField({
      name: 'titel',
      title: 'Titel',
      type: 'string',
      group: 'inhalt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Pfad',
      type: 'slug',
      group: 'meta',
      options: { source: 'titel' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'datum',
      title: 'Datum',
      type: 'date',
      group: 'meta',
      options: { dateFormat: 'DD.MM.YYYY' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titelbild',
      title: 'Titelbild',
      type: 'image',
      group: 'inhalt',
      options: { hotspot: true },
    }),
    defineField({
      name: 'zusammenfassung',
      title: 'Kurze Zusammenfassung',
      type: 'text',
      rows: 3,
      group: 'inhalt',
      description: 'Wird in der Vorschau und bei Google angezeigt',
    }),
    defineField({
      name: 'inhalt',
      title: 'Inhalt',
      type: 'array',
      group: 'inhalt',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Bildbeschreibung (Barrierefreiheit)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'veroeffentlicht',
      title: 'Veröffentlicht?',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'titel',
      subtitle: 'datum',
      media: 'titelbild',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? 'Kein Datum',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Datum (neueste zuerst)',
      name: 'datumDesc',
      by: [{ field: 'datum', direction: 'desc' }],
    },
  ],
})
