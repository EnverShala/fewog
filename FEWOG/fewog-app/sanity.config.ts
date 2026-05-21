import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { deDELocale } from '@sanity/locale-de-de'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'fewog-studio',
  title: 'FEWOG Studio',
  basePath: '/studio',

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
            S.listItem()
              .title('Dokumente')
              .child(S.documentTypeList('dokument').title('Alle Dokumente')),
            S.divider(),
            S.listItem()
              .title('Seiteneinstellungen')
              .child(
                S.document()
                  .schemaType('einstellungen')
                  .documentId('seiteneinstellungen')
              ),
            S.listItem()
              .title('Datenschutzerklärung')
              .child(
                S.document()
                  .schemaType('datenschutz')
                  .documentId('datenschutzerklaerung')
              ),
            S.listItem()
              .title('Impressum')
              .child(
                S.document()
                  .schemaType('impressum')
                  .documentId('impressum')
              ),
          ]),
    }),
    media(),
    visionTool(),
    deDELocale(),
  ],

  schema: {
    types: schemaTypes,
  },
})
