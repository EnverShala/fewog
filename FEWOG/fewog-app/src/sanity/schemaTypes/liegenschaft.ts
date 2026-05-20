import { defineType, defineField } from 'sanity'

export const liegenschaftSchema = defineType({
  name: 'liegenschaft',
  title: 'Liegenschaft',
  type: 'document',
  groups: [
    { name: 'grunddaten', title: 'Grunddaten', default: true },
    { name: 'wohnungen', title: 'Wohnungen' },
    { name: 'medien', title: 'Bilder & Medien' },
  ],
  fields: [
    defineField({
      name: 'bezeichnung',
      title: 'Bezeichnung (z.B. Mozartstraße 12)',
      type: 'string',
      group: 'grunddaten',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Pfad',
      type: 'slug',
      group: 'grunddaten',
      options: { source: 'bezeichnung' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stadtteil',
      title: 'Stadtteil',
      type: 'string',
      group: 'grunddaten',
      options: {
        list: [
          { title: 'Kern', value: 'kern' },
          { title: 'Schmiden', value: 'schmiden' },
          { title: 'Oeffingen', value: 'oeffingen' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'string',
      group: 'grunddaten',
    }),
    defineField({
      name: 'baujahr',
      title: 'Baujahr',
      type: 'number',
      group: 'grunddaten',
    }),
    defineField({
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
      rows: 4,
      group: 'grunddaten',
    }),
    defineField({
      name: 'anzahlWohnungen',
      title: 'Anzahl Wohnungen',
      type: 'number',
      group: 'wohnungen',
    }),
    defineField({
      name: 'zimmer',
      title: 'Zimmergröße (z.B. 2–3 Zi.)',
      type: 'string',
      group: 'wohnungen',
    }),
    defineField({
      name: 'sanierungsjahr',
      title: 'Sanierungsjahr',
      type: 'number',
      group: 'grunddaten',
    }),
    defineField({
      name: 'verfuegbar',
      title: 'Wohnungen verfügbar?',
      type: 'boolean',
      group: 'wohnungen',
      initialValue: false,
    }),
    defineField({
      name: 'titelbild',
      title: 'Titelbild',
      type: 'image',
      group: 'medien',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galerie',
      title: 'Bildergalerie',
      type: 'array',
      group: 'medien',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'bezeichnung',
      subtitle: 'stadtteil',
      media: 'titelbild',
    },
    prepare({ title, subtitle, media }) {
      const stadtteile: Record<string, string> = {
        kern: 'Kern',
        schmiden: 'Schmiden',
        oeffingen: 'Oeffingen',
      }
      return {
        title,
        subtitle: subtitle ? stadtteile[subtitle] : '',
        media,
      }
    },
  },
})
