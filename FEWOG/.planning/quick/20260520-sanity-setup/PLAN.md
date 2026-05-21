# Sanity CMS Grundeinrichtung

**Datum:** 2026-05-20
**Verzeichnis:** `fewog-app/`
**Ziel:** Sanity Studio einbetten, Schemas definieren, Infrastruktur (Client, Live, Env) aufbauen — ohne bestehende Frontend-Seiten anzufassen.

---

## Kontext

- Project ID: `uat139ly`, Dataset: `production`
- Pakete bereits installiert: `sanity ^5.25.0`, `next-sanity ^11.6.13`, `@sanity/image-url ^2.1.1`, `@portabletext/react ^6.2.0`, `@sanity/locale-de-de ^1.1.31`
- Noch NICHT installiert: `sanity-plugin-media`
- `.env*` ist in `.gitignore` — `.env.local` wird nicht committed

---

## Aufgaben (sequenziell ausführen)

---

### Task 1 — `sanity-plugin-media` installieren

**Verzeichnis:** `fewog-app/`

```bash
cd fewog-app && npm install sanity-plugin-media
```

**Verify:** `fewog-app/package.json` enthält `"sanity-plugin-media"` unter `dependencies`.

---

### Task 2 — `.env.local` und `.env.example` anlegen

Beide Dateien in `fewog-app/` anlegen.

**Datei: `fewog-app/.env.local`**
(wird durch `.gitignore` nicht committed — enthält echte Werte)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=uat139ly
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

`SANITY_API_READ_TOKEN` bleibt vorerst leer — wird benötigt sobald Draft-Vorschau / Live-Preview aktiviert wird.

**Datei: `fewog-app/.env.example`**
(wird committed — zeigt welche Vars benötigt werden)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token-from-sanity-manage
```

**Verify:** `ls fewog-app/.env.local` und `ls fewog-app/.env.example` existieren. `git status` zeigt `.env.local` NICHT unter untracked files (durch `.gitignore` ausgeblendet).

---

### Task 3 — `fewog-app/sanity.cli.ts` anlegen

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uat139ly',
    dataset: 'production',
  },
})
```

**Verify:** Datei existiert. `npx sanity diagnose` (aus `fewog-app/`) erkennt die CLI-Konfiguration.

---

### Task 4 — Sanity-Infrastruktur anlegen (env, client, live)

Drei Dateien unter `fewog-app/src/sanity/`.

**Datei: `fewog-app/src/sanity/env.ts`**

```typescript
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = '2024-01-01'
```

Erklärung: `apiVersion` als ISO-Datum fixiert — Sanity API verhält sich stabil, solange dieser Wert nicht erhöht wird.

---

**Datei: `fewog-app/src/sanity/client.ts`**

```typescript
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // stega deaktiviert für statische Metadaten (verhindert unsichtbare Zeichen in meta tags)
  stega: false,
})
```

---

**Datei: `fewog-app/src/sanity/live.ts`**

```typescript
import { defineLive } from 'next-sanity'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
```

Erklärung: `defineLive` ist der aktuelle Best-Practice-Ansatz laut CLAUDE.md — kein manuelles ISR / `revalidateTag` nötig.

**Verify:** TypeScript-Compilation aus `fewog-app/`: `npx tsc --noEmit` ohne Fehler in diesen drei Dateien.

---

### Task 5 — Schema-Typen anlegen

Alle Dateien unter `fewog-app/src/sanity/schemaTypes/`.

---

**Datei: `fewog-app/src/sanity/schemaTypes/liegenschaft.ts`**

```typescript
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
```

---

**Datei: `fewog-app/src/sanity/schemaTypes/neuigkeit.ts`**

```typescript
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
```

---

**Datei: `fewog-app/src/sanity/schemaTypes/einstellungen.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const einstellungenSchema = defineType({
  name: 'einstellungen',
  title: 'Seiteneinstellungen',
  type: 'document',
  // Singleton: Sanity zeigt immer nur dieses eine Dokument
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'kontakt', title: 'Kontakt & Adresse', default: true },
    { name: 'oeffnungszeiten', title: 'Öffnungszeiten' },
    { name: 'social', title: 'Social Media & Links' },
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
  ],
  preview: {
    prepare() {
      return { title: 'Seiteneinstellungen' }
    },
  },
})
```

---

**Datei: `fewog-app/src/sanity/schemaTypes/index.ts`**

```typescript
import { liegenschaftSchema } from './liegenschaft'
import { neuigkeitSchema } from './neuigkeit'
import { einstellungenSchema } from './einstellungen'

export const schemaTypes = [
  liegenschaftSchema,
  neuigkeitSchema,
  einstellungenSchema,
]
```

**Verify:** `npx tsc --noEmit` (aus `fewog-app/`) läuft fehlerfrei.

---

### Task 6 — `fewog-app/sanity.config.ts` anlegen

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { deDE } from '@sanity/locale-de-de'
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
    deDE(),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

Erklärung: Die `structure`-Konfiguration ist wichtig für das Singleton-Muster der Einstellungen — `S.document().documentId('seiteneinstellungen')` stellt sicher, dass immer dasselbe Dokument bearbeitet wird statt neue zu erstellen.

**Verify:** Datei existiert, TypeScript-Fehler: keine.

---

### Task 7 — Studio-Route in Next.js einbetten

**Datei: `fewog-app/src/app/studio/[[...tool]]/page.tsx`**

```typescript
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Erklärung:
- `[[...tool]]` (catch-all-Route) fängt alle Studio-internen Navigationspfade ab (z.B. `/studio/desk/liegenschaft`)
- `export { metadata, viewport }` re-exportiert die von `next-sanity` bereitgestellten Metadaten — das ist das offizielle Muster
- `dynamic = 'force-dynamic'` verhindert, dass Next.js die Studio-Route statisch rendert
- Der relative Import `../../../../sanity.config` zeigt von `src/app/studio/[[...tool]]/` auf `fewog-app/sanity.config.ts`

**Verify:** Entwicklungsserver starten (`npm run dev` in `fewog-app/`), dann `http://localhost:3000/studio` aufrufen — Sanity Studio lädt mit deutschsprachiger UI.

---

### Task 8 — `next.config.ts` für Sanity-Bildoptimierung erweitern

Die bestehende `fewog-app/next.config.ts` ist leer. Sie muss den Sanity Image CDN als `remotePattern` erlauben, damit `next/image` Sanity-Bilder optimieren kann.

**Datei: `fewog-app/next.config.ts`** — ersetzen mit:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

**Verify:** `npm run build` (aus `fewog-app/`) kompiliert ohne Fehler oder Warnungen bezüglich unbekannter Bild-Domains.

---

## Abschluss-Check

Nach allen Tasks:

1. `npm run dev` in `fewog-app/` starten
2. `http://localhost:3000/studio` öffnen — Studio erscheint auf Deutsch
3. Im Studio prüfen:
   - "Liegenschaften" ist in der Sidebar sichtbar
   - "Neuigkeiten" ist in der Sidebar sichtbar
   - "Seiteneinstellungen" ist als Singleton sichtbar (kein "+" zum Erstellen)
   - Medien-Plugin ist im Toolbar oben verfügbar
4. Eine Test-Liegenschaft anlegen und speichern — Sanity-API nimmt das Dokument an (kein Auth-Fehler)
5. `npx tsc --noEmit` (aus `fewog-app/`) — keine TypeScript-Fehler

---

## Was NICHT in diesem Plan steht (nächste Schritte)

- Frontend-Seiten auf Sanity-Daten umstellen — separater Plan
- `SANITY_API_READ_TOKEN` in Vercel setzen — bei Deployment
- Draft-Vorschau / Visual Editing aktivieren — separater Plan
- TypeGen (`sanity typegen generate`) — nach erstem Dateneintrag sinnvoll
