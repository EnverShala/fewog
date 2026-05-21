import { defineType, defineField } from 'sanity'

export const impressumSchema = defineType({
  name: 'impressum',
  title: 'Impressum',
  type: 'document',
  fields: [
    defineField({
      name: 'inhalt',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Vollständiger Text des Impressums',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Impressum' }
    },
  },
})
