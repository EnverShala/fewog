---
slug: wohnen-sanity-connect
date: 2026-05-21
status: in-progress
---

# /wohnen Frontend-Anbindung an Sanity

Ersetze hardcoded `FEWOG_DATA` auf der `/wohnen`-Seite durch Live-Daten aus Sanity via `sanityFetch` + `SanityLive`.

## Ziel

Die `/wohnen`-Seite liest Liegenschaften aus Sanity (GROQ), zeigt Titelbilder via `@sanity/image-url` und bleibt durch `SanityLive` automatisch aktuell — ohne Code-Deploy bei Datenänderungen.

## Aufgaben

### 1. `src/sanity/image.ts` erstellen
- `imageUrlBuilder` mit `client` initialisieren
- `urlFor(source)` Helper exportieren

### 2. `src/sanity/queries.ts` erstellen
- GROQ-Query `liegenschaftenQuery` für alle Liegenschaften
- Felder: `_id`, `bezeichnung`, `stadtteil`, `baujahr`, `anzahlWohnungen`, `zimmer`, `sanierungsjahr`, `verfuegbar`, `titelbild`
- Sortierung: `| order(bezeichnung asc)`
- TypeScript-Typ `Liegenschaft` exportieren

### 3. `src/app/wohnen/wohnen-client.tsx` erstellen
- `'use client'` — alle interaktiven States + Framer Motion bleiben hier
- Prop: `liegenschaften: Liegenschaft[]`
- Feldmapping: `bezeichnung`→Straße, `baujahr`→Jahr, `anzahlWohnungen`→Einheiten, `zimmer`→Zimmer, `sanierungsjahr`→Sanierung, `stadtteil`→Stadtteil, `titelbild`→Bild
- Fallback für fehlendes Titelbild: Placeholder-Box
- `selectedProperty` nutzt `_id` statt `id`

### 4. `src/app/wohnen/page.tsx` umschreiben
- Server Component (kein `'use client'`)
- `sanityFetch({ query: liegenschaftenQuery })` für Datenabruf
- `<WohnenClient liegenschaften={data} />` + `<SanityLive />` rendern

## Datei-Mapping (Alt → Neu)

| Alt (FEWOG_DATA) | Neu (Sanity) |
|---|---|
| `prop.id` | `prop._id` |
| `prop.street` | `prop.bezeichnung` |
| `prop.district` | `prop.stadtteil` |
| `prop.year` | `prop.baujahr` |
| `prop.units` | `prop.anzahlWohnungen` |
| `prop.rooms` | `prop.zimmer` |
| `prop.sanierung` | `prop.sanierungsjahr ?? prop.baujahr` |
| `prop.imageUrl` | `urlFor(prop.titelbild).width(600).url()` |
