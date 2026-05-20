import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { deDELocale } from '@sanity/locale-de-de'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'fewog-studio',
  title: 'FEWOG Studio',

  projectId: 'uat139ly',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem()
              .title('Liegenschaften')
              .child(S.documentTypeList('liegenschaft').title('Alle Liegenschaften')),
            S.listItem()
              .title('Neuigkeiten')
              .child(S.documentTypeList('neuigkeit').title('Alle Neuigkeiten')),
            S.divider(),
            // Singleton: Einstellungen hat nur ein Dokument
            S.listItem()
              .title('Seiteneinstellungen')
              .child(
                S.document()
                  .schemaType('einstellungen')
                  .documentId('seiteneinstellungen')
              ),
          ]),
    }),
    media(),
    visionTool(), // Hilfreich für GROQ-Abfragen während der Entwicklung
    deDELocale(),
  ],

  schema: {
    types: schemaTypes,
  },
})
