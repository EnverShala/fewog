# Codebase Structure

**Analysis Date:** 2026-05-21

## Directory Layout

```
FEWOG/                                    # Repo root
├── CLAUDE.md                             # Project instructions, tech stack spec, constraints
├── Design/                               # Original static prototype (not deployed — reference only)
│   ├── FEWOG Fellbach.html
│   ├── components.jsx
│   ├── data.js                           # Superseded by src/lib/data.ts
│   ├── styles.css
│   ├── tweaks-panel.jsx
│   ├── views.jsx
│   └── uploads/
├── fewog-app/                            # Next.js 15 application (production codebase)
│   ├── CLAUDE.md                         # Points to AGENTS.md
│   ├── AGENTS.md                         # Next.js version warning
│   ├── next.config.ts                    # Transpile packages, remotePatterns, security headers, useEffectEvent polyfill
│   ├── next-env.d.ts                     # Next.js TypeScript declarations (generated)
│   ├── tsconfig.json                     # TypeScript config; path alias @/* → src/*
│   ├── eslint.config.mjs                 # ESLint config
│   ├── postcss.config.mjs                # PostCSS config
│   ├── package.json                      # Dependencies
│   ├── sanity.config.ts                  # Sanity Studio config: plugins, schema, custom structure
│   ├── sanity.cli.ts                     # Sanity CLI config (project ID, dataset)
│   ├── scripts/                          # One-time data migration scripts (Node/ESM)
│   │   ├── seed-einstellungen.mjs        # Seed contact data into einstellungen singleton
│   │   ├── import-liegenschaften.mjs     # Bulk import property records
│   │   ├── import-dokumente.mjs          # Bulk import PDF document records
│   │   └── upload-images.mjs             # Upload property images to Sanity
│   ├── public/                           # Static files served at /
│   │   ├── robots.txt                    # Disallows /studio from crawlers
│   │   └── [Next.js default SVGs]        # file.svg, globe.svg, next.svg, vercel.svg, window.svg
│   └── src/
│       ├── app/                          # Next.js App Router pages and layouts
│       │   ├── layout.tsx                # Root layout — Geist fonts, globals.css, HTML shell
│       │   ├── globals.css               # Design system: CSS custom properties, typography, all component styles
│       │   ├── favicon.ico               # Favicon
│       │   ├── page.tsx                  # / — RSC: fetches kontakt + startseite
│       │   ├── home-client.tsx           # / — Client: hero, service dock, contact strip
│       │   ├── wohnen/
│       │   │   ├── page.tsx              # /wohnen — RSC: fetches liegenschaften + placeholder image
│       │   │   └── wohnen-client.tsx     # /wohnen — Client: property list A-Z + detail panel
│       │   ├── service/
│       │   │   ├── page.tsx              # /service — RSC: fetches Mietermagazin, Geschäftsbericht, serviceseite
│       │   │   ├── service-client.tsx    # /service — Client: service offerings, Mietertreff, download cards
│       │   │   ├── archiv-client.tsx     # Shared PDF archive list UI (used by both archive sub-pages)
│       │   │   ├── mietermagazin-archiv/
│       │   │   │   └── page.tsx          # /service/mietermagazin-archiv — RSC + ArchivClient
│       │   │   └── geschaeftsbericht-archiv/
│       │   │       └── page.tsx          # /service/geschaeftsbericht-archiv — RSC + ArchivClient
│       │   ├── ueberuns/
│       │   │   ├── page.tsx              # /ueberuns — RSC: fetches organe + ueberunsseite
│       │   │   └── ueberuns-client.tsx   # /ueberuns — Client: history, Vorstand/Aufsichtsrat, Satzung link
│       │   ├── aktuelles/
│       │   │   ├── page.tsx              # /aktuelles — RSC: fetches neuigkeiten + aktuellesInfoQuery
│       │   │   ├── aktuelles-client.tsx  # /aktuelles — Client: news list + info blocks
│       │   │   └── [slug]/
│       │   │       ├── page.tsx          # /aktuelles/[slug] — RSC: fetches article by slug, notFound() on miss
│       │   │       └── article-client.tsx # Article detail: hero image + PortableText body
│       │   ├── impressum/
│       │   │   ├── page.tsx              # /impressum — RSC: fetches impressum singleton
│       │   │   └── impressum-client.tsx  # Client: PortableText render with fallback
│       │   ├── datenschutz/
│       │   │   ├── page.tsx              # /datenschutz — RSC: fetches datenschutz singleton
│       │   │   └── datenschutz-client.tsx # Client: PortableText render with fallback
│       │   └── studio/
│       │       ├── layout.tsx            # Studio layout: noindex/nofollow metadata
│       │       └── [[...tool]]/
│       │           └── page.tsx          # /studio/** — NextStudio client component
│       ├── components/                   # Shared React components
│       │   ├── nav.tsx                   # Sticky nav bar (desktop links + mobile burger)
│       │   ├── footer.tsx                # Footer with Impressum/Datenschutz links
│       │   ├── contact-strip.tsx         # 3-column contact strip; accepts KontaktData prop
│       │   ├── service-tile.tsx          # Clickable service card (icon + title + desc)
│       │   └── icons.tsx                 # Named inline SVG icon collection
│       ├── lib/                          # Shared non-UI utilities
│       │   ├── data.ts                   # FEWOG_DATA constant + Property/District/FewogData interfaces
│       │   └── use-effect-event-loader.cjs # Webpack loader: polyfills useEffectEvent for Sanity 5 + Next 15.5
│       ├── sanity/                       # Sanity integration layer
│       │   ├── client.ts                 # createClient with stega:false (prevents meta tag pollution)
│       │   ├── env.ts                    # Exports projectId, dataset, apiVersion from env vars
│       │   ├── live.ts                   # defineLive → exports sanityFetch + SanityLive
│       │   ├── image.ts                  # urlFor() builder wrapping @sanity/image-url
│       │   ├── queries.ts                # All GROQ queries + co-located TypeScript return types
│       │   ├── empty.css                 # Empty CSS stub (Sanity Studio import requirement)
│       │   └── schemaTypes/              # Sanity document schemas
│       │       ├── index.ts              # Registers all schemas into schemaTypes array
│       │       ├── einstellungen.ts      # Singleton: contact, page content, hero image (8 field groups)
│       │       ├── liegenschaft.ts       # Property document (3 groups: grunddaten, wohnungen, medien)
│       │       ├── neuigkeit.ts          # News article with slug, date, titelbild, PortableText inhalt
│       │       ├── dokument.ts           # PDF document (Mietermagazin / Geschäftsbericht / Sonstige)
│       │       ├── datenschutz.ts        # Legal: Datenschutzerklärung singleton (PortableText only)
│       │       └── impressum.ts          # Legal: Impressum singleton (PortableText only)
│       └── types/                        # Shared TypeScript types directory (currently empty)
└── .planning/                            # GSD workflow planning artifacts
    ├── codebase/                         # Codebase map documents (this file lives here)
    ├── quick/                            # Quick task artifacts
    │   ├── 20260520-sanity-setup/
    │   ├── 20260521-frontend-to-sanity/
    │   └── 20260521-wohnen-sanity-connect/
    └── [phases]/                         # Phase plan artifacts (when created)
```

## Directory Purposes

**`fewog-app/src/app/`:**
- Purpose: All Next.js App Router routes. Each subdirectory = one URL segment.
- Pattern: Every route has a `page.tsx` (RSC, fetches data) and a co-located `*-client.tsx` (`'use client'`, renders UI)
- Key files: `layout.tsx` (root shell), `page.tsx` + `home-client.tsx` (home), `globals.css` (entire design system)

**`fewog-app/src/app/studio/`:**
- Purpose: Embedded Sanity Studio. Catch-all `[[...tool]]` handles all Studio sub-routes.
- Access: `/studio` in production — staff-only, not linked from public site
- Key constraint: Security headers intentionally exclude this path (X-Frame-Options not applied)

**`fewog-app/src/components/`:**
- Purpose: Reusable UI components shared across two or more page client components
- Contains: Nav, Footer, ContactStrip, ServiceTile, Icon (5 components total)
- Key files: `nav.tsx` (used by every client component), `contact-strip.tsx` (accepts `KontaktData` from Sanity)

**`fewog-app/src/sanity/`:**
- Purpose: Complete Sanity integration layer — client, fetching, images, queries, schemas
- Key files: `live.ts` (the `sanityFetch`/`SanityLive` exports used everywhere), `queries.ts` (all GROQ + types), `image.ts` (`urlFor`)
- Note: `empty.css` is a required stub for Sanity Studio's CSS import resolution

**`fewog-app/src/sanity/schemaTypes/`:**
- Purpose: Sanity document type definitions — these define the CMS editing interface
- All schemas use German `title` values (non-technical German-speaking staff requirement)
- Field groups used throughout for Studio UX clarity

**`fewog-app/src/lib/`:**
- Purpose: Shared non-UI utilities
- `data.ts`: Legacy FEWOG_DATA constant used for stat fallbacks on home page; `Property`/`District` interfaces partially superseded by Sanity `Liegenschaft` type
- `use-effect-event-loader.cjs`: Webpack polyfill for React 19.2.0-canary `useEffectEvent` compatibility

**`fewog-app/scripts/`:**
- Purpose: One-time Node.js data migration scripts for seeding Sanity with existing FEWOG data
- Not part of the application runtime — run manually via `node scripts/*.mjs`
- Generated: No. Committed: Yes.

**`fewog-app/public/`:**
- Purpose: Static files served directly
- `robots.txt` disallows `/studio` from web crawlers
- No FEWOG-specific public assets (logo served from Sanity CDN or old fewog.de CDN via inline URL in `nav.tsx`)

**`Design/`:**
- Purpose: Original static prototype for design reference — not part of deployed application
- Generated: No. Committed: Yes.

## Key File Locations

**Entry Points:**
- `fewog-app/src/app/layout.tsx`: Root HTML shell, fonts, global CSS import
- `fewog-app/src/app/page.tsx`: Home page `/` (RSC)
- `fewog-app/src/app/studio/[[...tool]]/page.tsx`: Sanity Studio embed

**Configuration:**
- `fewog-app/next.config.ts`: Security headers, `transpilePackages`, `remotePatterns`, webpack polyfill
- `fewog-app/sanity.config.ts`: Studio plugins (structureTool, media, visionTool dev-only, deDELocale), custom structure, schema registration
- `fewog-app/tsconfig.json`: TypeScript config; defines `@/*` path alias to `src/`
- `fewog-app/src/sanity/env.ts`: Sanity project ID, dataset, API version from env vars

**Data Fetching:**
- `fewog-app/src/sanity/live.ts`: `sanityFetch` and `SanityLive` — imported by every `page.tsx`
- `fewog-app/src/sanity/queries.ts`: All GROQ queries and TypeScript return types
- `fewog-app/src/sanity/client.ts`: Base Sanity client (stega disabled)

**Core UI:**
- `fewog-app/src/app/globals.css`: Entire design system (CSS custom properties, typography, layout, component styles, responsive breakpoints)
- `fewog-app/src/components/nav.tsx`: Navigation — used by every client component
- `fewog-app/src/sanity/image.ts`: `urlFor()` — used wherever Sanity images are rendered

**CMS Schemas:**
- `fewog-app/src/sanity/schemaTypes/einstellungen.ts`: The largest schema — drives contact strip, hero, all page content (8 field groups, ~300 lines)
- `fewog-app/src/sanity/schemaTypes/index.ts`: Schema registry

## App Router Route Table

| URL | RSC Page | Client Component | Sanity Query/Queries |
|-----|----------|-----------------|----------------------|
| `/` | `src/app/page.tsx` | `src/app/home-client.tsx` | `kontaktQuery`, `startseiteQuery` |
| `/wohnen` | `src/app/wohnen/page.tsx` | `src/app/wohnen/wohnen-client.tsx` | `liegenschaftenQuery`, `einstellungenQuery` |
| `/service` | `src/app/service/page.tsx` | `src/app/service/service-client.tsx` | `aktuellMietermagazinQuery`, `aktuellGeschaeftsberichtQuery`, `serviceseiteQuery` |
| `/service/mietermagazin-archiv` | `src/app/service/mietermagazin-archiv/page.tsx` | `src/app/service/archiv-client.tsx` | `dokumenteByKategorieQuery` (kategorie=mietermagazin) |
| `/service/geschaeftsbericht-archiv` | `src/app/service/geschaeftsbericht-archiv/page.tsx` | `src/app/service/archiv-client.tsx` | `dokumenteByKategorieQuery` (kategorie=geschaeftsbericht) |
| `/ueberuns` | `src/app/ueberuns/page.tsx` | `src/app/ueberuns/ueberuns-client.tsx` | `organeQuery`, `ueberunsseiteQuery` |
| `/aktuelles` | `src/app/aktuelles/page.tsx` | `src/app/aktuelles/aktuelles-client.tsx` | `neuigkeitenQuery`, `aktuellesInfoQuery` |
| `/aktuelles/[slug]` | `src/app/aktuelles/[slug]/page.tsx` | `src/app/aktuelles/[slug]/article-client.tsx` | `neuigkeitBySlugQuery` |
| `/impressum` | `src/app/impressum/page.tsx` | `src/app/impressum/impressum-client.tsx` | `impressumQuery` |
| `/datenschutz` | `src/app/datenschutz/page.tsx` | `src/app/datenschutz/datenschutz-client.tsx` | `datenschutzQuery` |
| `/studio/**` | `src/app/studio/[[...tool]]/page.tsx` | (self — `'use client'`) | None |

## Naming Conventions

**Files:**
- Page files: always `page.tsx` (Next.js App Router convention)
- Client component files: kebab-case matching route name, suffixed `-client.tsx`: `home-client.tsx`, `wohnen-client.tsx`
- Shared client components: kebab-case without suffix: `contact-strip.tsx`, `service-tile.tsx`
- Sanity schema files: schema type name in kebab-case: `einstellungen.ts`, `liegenschaft.ts`
- GROQ query variables: camelCase with `Query` suffix: `kontaktQuery`, `liegenschaftenQuery`

**Components:**
- Named exports for shared components: `export function Nav(...)`, `export function Footer(...)`
- Default exports for page-level components (RSC pages and client components): `export default function WohnenClient()`
- RSC page names: `[Route]Page` (e.g., `WohnenPage`, `AktuellesPage`, `NeuigkeitPage`)
- Client component names: `[Route]Client` (e.g., `WohnenClient`, `HomeClient`, `ArticleClient`)

**Data constants:**
- SCREAMING_SNAKE_CASE for module-level constants: `FEWOG_DATA`, `NAV_LINKS`, `DEFAULT_TILES`, `DEFAULT_INHALT`, `EASE`, `DUR`

**CSS classes:**
- BEM-adjacent kebab-case: `.bestand-row`, `.contact-strip`, `.service-tile`, `.article-body`
- Modifier pattern: `.btn-primary`, `.btn-ghost`, `.page-head-simple`
- All CSS lives in `fewog-app/src/app/globals.css` — no CSS modules

**TypeScript interfaces / types:**
- PascalCase: `Property`, `District`, `FewogData`, `KontaktData`, `Liegenschaft`, `NeuigkeitDetail`
- Sanity query return types exported from `fewog-app/src/sanity/queries.ts` alongside their queries

## Where to Add New Code

**New top-level page (e.g., `/mitgliedschaft`):**
- RSC: `fewog-app/src/app/mitgliedschaft/page.tsx` — async, calls `sanityFetch`, mounts `<SanityLive />`
- Client: `fewog-app/src/app/mitgliedschaft/mitgliedschaft-client.tsx` — `'use client'`, receives data as props
- Schema: add fields to `einstellungen.ts` (if singleton content) or create a new schema in `fewog-app/src/sanity/schemaTypes/`
- Queries: add GROQ query + TypeScript type to `fewog-app/src/sanity/queries.ts`
- Nav: add entry to `NAV_LINKS` array in `fewog-app/src/components/nav.tsx`; add case to `go()` function

**New dynamic route with slug (e.g., `/liegenschaften/[slug]`):**
- Create: `fewog-app/src/app/liegenschaften/[slug]/page.tsx` (RSC with `params: Promise<{slug: string}>`)
- Create: `fewog-app/src/app/liegenschaften/[slug]/liegenschaft-client.tsx` (client component)
- Add query to `fewog-app/src/sanity/queries.ts` with slug parameter

**New shared component:**
- Create: `fewog-app/src/components/[component-name].tsx` (kebab-case)
- Use named export: `export function ComponentName(...)`
- Add CSS to `fewog-app/src/app/globals.css`

**New Sanity schema (new content type):**
- Create: `fewog-app/src/sanity/schemaTypes/[typename].ts`
- Register: add to `schemaTypes` array in `fewog-app/src/sanity/schemaTypes/index.ts`
- Add to Studio structure: add `S.listItem()` in `fewog-app/sanity.config.ts`

**New content fields on existing pages (via einstellungen singleton):**
- Add field(s) to `fewog-app/src/sanity/schemaTypes/einstellungen.ts` with appropriate `group`
- Add field name(s) to the relevant query in `fewog-app/src/sanity/queries.ts`
- Update the corresponding TypeScript type in `fewog-app/src/sanity/queries.ts`
- Consume the field in the client component with `?? defaultValue` fallback

**New GROQ query:**
- Add to `fewog-app/src/sanity/queries.ts`
- Export both the query string and its return type
- Import in the relevant `page.tsx` via `sanityFetch({ query: myQuery })`

**New icon:**
- Add to the `Icon` object in `fewog-app/src/components/icons.tsx`
- Pattern: `iconName: () => (<svg viewBox="..." .../>)`

## Special Directories

**`.planning/`:**
- Purpose: GSD workflow planning artifacts (codebase maps, phase plans, quick tasks)
- Generated: By GSD commands
- Committed: Yes

**`fewog-app/scripts/`:**
- Purpose: One-time data migration and seeding scripts
- Generated: No
- Committed: Yes
- Note: These are not imported by the app; run manually with `node scripts/*.mjs`

**`fewog-app/.next/`:**
- Purpose: Next.js build output and development cache
- Generated: Yes (by `next build` / `next dev`)
- Committed: No (in .gitignore)

**`fewog-app/node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No

**`Design/`:**
- Purpose: Original static prototype for design reference — not part of deployed app
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-05-21*
