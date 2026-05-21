# FEWOG Fellbach — Website

Unternehmenswebsite der **Fellbacher Wohnungsbau-Genossenschaft eG (FEWOG)** — einer 1948 gegründeten Wohnungsgenossenschaft mit 612 Wohnungen, 1.480 Mitgliedern und 27 Liegenschaften in Fellbach (Kern, Schmiden, Oeffingen).

## Tech-Stack

| Schicht | Technologie |
|---------|-------------|
| Framework | Next.js 15.x (App Router) |
| CMS | Sanity v5 (Studio eingebettet unter `/studio`) |
| CMS-Toolkit | next-sanity v11 — `defineLive` + `SanityLive` |
| Bilder | `@sanity/image-url` v2 + `next/image` |
| Rich Text | `@portabletext/react` v6 |
| Styling | Globales CSS-Design-System + Tailwind 4 (nur Struktur-Utilities) |
| Animationen | Framer Motion |
| Deployment | Vercel (Free Tier) |
| Sprache | TypeScript 5, strict mode |

## Projektstruktur

```
fewog-app/
├── src/
│   ├── app/                    # Next.js App Router — Seiten
│   │   ├── page.tsx            # Startseite (Server Component)
│   │   ├── home-client.tsx     # Startseite (Client Component)
│   │   ├── wohnen/             # Wohnungsbestand
│   │   ├── aktuelles/          # News + Artikel-Detail
│   │   ├── ueberuns/           # Über uns / Geschichte / Organe
│   │   ├── service/            # Downloads, Mietermagazin, Geschäftsbericht
│   │   ├── datenschutz/        # Datenschutzerklärung
│   │   ├── impressum/          # Impressum
│   │   └── studio/             # Eingebettetes Sanity Studio
│   ├── components/             # Shared Components (Nav, Footer, ...)
│   ├── sanity/                 # Sanity-Konfiguration
│   │   ├── schemaTypes/        # Inhaltstypen (Liegenschaft, Neuigkeit, ...)
│   │   ├── queries.ts          # GROQ-Queries + TypeScript-Typen
│   │   ├── client.ts           # Sanity-Client
│   │   ├── live.ts             # defineLive-Konfiguration
│   │   └── image.ts            # urlFor()-Helper
│   └── lib/
│       ├── data.ts             # Fallback-Daten (wird nach Datenmigration obsolet)
│       └── format.ts           # Shared Utilities (formatDate)
├── scripts/                    # Datenmigrations-Scripts (einmalig)
└── public/                     # Statische Assets
```

## Architektur

Jede Seite folgt einem **Server/Client-Split**:

```
page.tsx (Server Component)
  → sanityFetch(query)           # ISR mit Live-Updates via defineLive
  → <PageClient data={...} />   # Props an Client Component
  → <SanityLive />              # Echtzeit-Updates ohne Neuladen
```

Der Sanity-Client nutzt `defineLive` aus `next-sanity`, was automatische Revalidierung ohne manuelle ISR-Webhooks ermöglicht.

**Singletons** (einstellungen, datenschutz, impressum) werden über feste Document-IDs in `sanity.config.ts` verwaltet — verhindert mehrfache Dokumente im Studio.

## Lokale Entwicklung

### Voraussetzungen

- Node.js 20+
- npm
- Sanity-Projektzugang (Projekt-ID: `uat139ly`)

### Setup

```bash
cd fewog-app
npm install
cp .env.example .env.local
# .env.local mit echten Werten befüllen (siehe unten)
npm run dev
```

App läuft auf [http://localhost:3000](http://localhost:3000)  
Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### Umgebungsvariablen

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=uat139ly
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<Token aus sanity.io/manage → API → Tokens>
```

Den Read-Token unter [sanity.io/manage](https://sanity.io/manage) → Projekt → API → Tokens anlegen (Viewer-Berechtigung genügt).

## Deployment

Automatisches Deployment via **Vercel** bei jedem Push auf `main`.

Erforderliche Umgebungsvariablen im Vercel-Projekt:

| Variable | Beschreibung |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Projekt-ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | Sanity Read-Token (nur Server) |

## Sanity Content-Typen

| Schema | Beschreibung |
|--------|-------------|
| `einstellungen` | Singleton — Kontaktdaten, Startseiten-Content, Hero-Bild |
| `liegenschaft` | Einzelne Liegenschaft (Adresse, Wohneinheiten, Bild, ...) |
| `neuigkeit` | Nachricht / News-Artikel |
| `dokument` | Downloadbares PDF (Mietermagazin, Geschäftsbericht) |
| `datenschutz` | Singleton — Datenschutzerklärung (Portable Text) |
| `impressum` | Singleton — Impressum (Portable Text) |

## Bekannte Offene Punkte

Vor dem Go-Live zu erledigen (Priorität absteigend):

1. **Datenmigration**: 0 von 27 Liegenschaften sind in Sanity — `scripts/import-liegenschaften.mjs` ausführen
2. **Fehlerseiten**: `app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx` fehlen
3. **Sitemap**: `app/sitemap.ts` fehlt (in `robots.txt` referenziert)
4. **Nav-Links**: `<a onClick>` → `<Link href>` (Keyboard-Zugänglichkeit, SEO)
5. **Logo**: Derzeit von `www.fewog.de` CDN geladen → in `public/` committen
6. **`next/image`**: Alle `<img>` durch `<Image>` ersetzen (LCP, Bandbreite)
7. **Content-Security-Policy**: Fehlt in `next.config.ts`
8. **Sitemap**: Generieren via `app/sitemap.ts`
9. **OpenGraph-Metadaten**: Für Social-Media-Vorschauen ergänzen

Vollständige Aufstellung in `.planning/codebase/CONCERNS.md`.

## Technische Besonderheiten

### useEffectEvent-Polyfill

Next.js 15.5.x liefert React 19.2.0-canary, das `useEffectEvent` nicht exportiert. Sanity 5.x benötigt es. `next.config.ts` enthält einen Webpack-Loader (`src/lib/use-effect-event-loader.cjs`), der den fehlenden Export in das React-CJS-Bundle einfügt. Dieser Patch kann entfernt werden, sobald Next.js eine React-Version shipt, die `useEffectEvent` nativ exportiert.

### Spracheinstellung Studio

Das Sanity Studio ist auf Deutsch konfiguriert (`@sanity/locale-de-de`). Alle Schema-Felder haben deutsche Bezeichnungen — Voraussetzung des Kunden (nicht-technische Redakteure).

## Lizenz

Proprietär — Vizionists GmbH für FEWOG Fellbach eG. Alle Rechte vorbehalten.
