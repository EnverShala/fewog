import { defineType, defineField } from 'sanity'

export const datenschutzSchema = defineType({
  name: 'datenschutz',
  title: 'Datenschutzerklärung',
  type: 'document',
  fields: [
    defineField({
      name: 'inhalt',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Vollständiger Text der Datenschutzerklärung',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Datenschutzerklärung' }
    },
  },
})
