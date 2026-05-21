import { defineType, defineField } from 'sanity'

export const einstellungenSchema = defineType({
  name: 'einstellungen',
  title: 'Seiteneinstellungen',
  type: 'document',
  groups: [
    { name: 'kontakt', title: 'Kontakt & Adresse', default: true },
    { name: 'oeffnungszeiten', title: 'Öffnungszeiten' },
    { name: 'social', title: 'Social Media & Links' },
    { name: 'bilder', title: 'Bilder' },
  ],
  fields: [
    defineField({
      name: 'strasse',
      title: 'Straße & Hausnummer',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'plzOrt',
      title: 'PLZ und Ort',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefonnummer',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      type: 'array',
      group: 'oeffnungszeiten',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tage', title: 'Tage (z.B. Mo–Fr)', type: 'string' }),
            defineField({ name: 'zeiten', title: 'Zeiten (z.B. 8:00–12:00)', type: 'string' }),
          ],
          preview: {
            select: { title: 'tage', subtitle: 'zeiten' },
          },
        },
      ],
    }),
    defineField({
      name: 'bankverbindung',
      title: 'Bankverbindung (IBAN)',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'platzhalterbild',
      title: 'Platzhalterbild für Liegenschaften',
      description: 'Wird automatisch angezeigt, wenn für eine Liegenschaft kein eigenes Bild hochgeladen wurde.',
      type: 'image',
      group: 'bilder',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Seiteneinstellungen' }
    },
  },
})
