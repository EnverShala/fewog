<!-- refreshed: 2026-05-21 -->
# Architecture

**Analysis Date:** 2026-05-21

## System Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                      Browser (User)                             │
│          React 19 + Framer Motion + @portabletext/react         │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│            Next.js 15 App Router (Vercel)                       │
│  Server Components (async page.tsx) fetch from Sanity           │
│  Client Components (*-client.tsx) handle UI + interactivity     │
│  `fewog-app/src/app/`                                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Sanity Live Layer  (`fewog-app/src/sanity/live.ts`)     │   │
│  │  defineLive → sanityFetch + SanityLive component         │   │
│  │  Real-time content updates pushed via GROQ Events        │   │
│  └──────────────────────────┬──────────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────────┘
                              │ GROQ API (next-sanity)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            Sanity Content Lake (Free Tier)                      │
│            Project ID: uat139ly · Dataset: production           │
│  Schemas: liegenschaft, neuigkeit, einstellungen,               │
│           dokument, datenschutz, impressum                      │
└─────────────────────────────────────────────────────────────────┘
                              │ embedded at /studio
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            Sanity Studio (embedded, German UI)                  │
│            `fewog-app/src/app/studio/[[...tool]]/page.tsx`      │
│            Accessed by staff at /studio                         │
└─────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `RootLayout` | HTML shell, font loading, global CSS | `fewog-app/src/app/layout.tsx` |
| `Home` (RSC) | Fetches `kontaktQuery` + `startseiteQuery`, mounts SanityLive | `fewog-app/src/app/page.tsx` |
| `HomeClient` | Landing page UI: hero (with Sanity image), service dock, contact strip | `fewog-app/src/app/home-client.tsx` |
| `WohnenPage` (RSC) | Fetches `liegenschaftenQuery` + `einstellungenQuery` (placeholder image) | `fewog-app/src/app/wohnen/page.tsx` |
| `WohnenClient` | Property A-Z list + animated slide-in detail panel | `fewog-app/src/app/wohnen/wohnen-client.tsx` |
| `ServicePage` (RSC) | Fetches latest Mietermagazin, Geschäftsbericht, service content | `fewog-app/src/app/service/page.tsx` |
| `ServiceClient` | Service offerings, Mietertreff, downloads, rich text sections | `fewog-app/src/app/service/service-client.tsx` |
| `UeberUnsPage` (RSC) | Fetches `organeQuery` + `ueberunsseiteQuery` | `fewog-app/src/app/ueberuns/page.tsx` |
| `UeberUnsClient` | History, governance (Vorstand/Aufsichtsrat), Satzung | `fewog-app/src/app/ueberuns/ueberuns-client.tsx` |
| `AktuellesPage` (RSC) | Fetches `neuigkeitenQuery` + `aktuellesInfoQuery` | `fewog-app/src/app/aktuelles/page.tsx` |
| `AktuellesClient` | News list with dates + static info blocks | `fewog-app/src/app/aktuelles/aktuelles-client.tsx` |
| `NeuigkeitPage` (RSC) | Fetches single article by slug, calls `notFound()` on miss | `fewog-app/src/app/aktuelles/[slug]/page.tsx` |
| `ArticleClient` | Article detail: hero image + PortableText body | `fewog-app/src/app/aktuelles/[slug]/article-client.tsx` |
| `MietermagazinArchivPage` (RSC) | Fetches all `dokument` records by category | `fewog-app/src/app/service/mietermagazin-archiv/page.tsx` |
| `GeschaeftsberichtArchivPage` (RSC) | Same pattern, geschaeftsbericht category | `fewog-app/src/app/service/geschaeftsbericht-archiv/page.tsx` |
| `ArchivClient` | Shared PDF archive list UI (reused by both archive pages) | `fewog-app/src/app/service/archiv-client.tsx` |
| `ImpressumPage` (RSC) | Fetches `impressumQuery` (singleton by fixed document ID) | `fewog-app/src/app/impressum/page.tsx` |
| `ImpressumClient` | Renders Impressum content via PortableText | `fewog-app/src/app/impressum/impressum-client.tsx` |
| `DatenschutzPage` (RSC) | Fetches `datenschutzQuery` (singleton by fixed document ID) | `fewog-app/src/app/datenschutz/page.tsx` |
| `DatenschutzClient` | Renders Datenschutzerklärung via PortableText | `fewog-app/src/app/datenschutz/datenschutz-client.tsx` |
| `StudioPage` | Embeds NextStudio; protected by `robots: noindex` layout | `fewog-app/src/app/studio/[[...tool]]/page.tsx` |
| `Nav` | Sticky top nav, desktop + mobile burger dropdown | `fewog-app/src/components/nav.tsx` |
| `Footer` | Copyright bar + Impressum/Datenschutz links | `fewog-app/src/components/footer.tsx` |
| `ContactStrip` | 3-column office hours / phone / address — accepts `KontaktData` prop | `fewog-app/src/components/contact-strip.tsx` |
| `ServiceTile` | Clickable card: icon + title + description | `fewog-app/src/components/service-tile.tsx` |
| `Icon` | Named inline SVG icon collection | `fewog-app/src/components/icons.tsx` |

## Pattern Overview

**Overall:** RSC + Client Component split pattern. All `page.tsx` files are async React Server Components that fetch from Sanity using `sanityFetch`. They hand data down as props to co-located `*-client.tsx` files which are `'use client'` components handling interactivity and UI rendering. `<SanityLive />` is mounted in every page's RSC return to enable real-time content updates.

**Key Characteristics:**
- RSC pages are the data-fetching layer; client components are the render layer
- `sanityFetch` (from `defineLive`) is used on every page — no manual `fetch()` calls, no ISR tags
- `<SanityLive />` is mounted at the RSC level (outside the client component) on every route
- Fallback values are defined in each client component (hardcoded defaults) when Sanity data is null
- Images use `urlFor()` from `fewog-app/src/sanity/image.ts` building Sanity CDN URLs; rendered as plain `<img>` tags (not `next/image`)
- Portable Text rendered via `<PortableText>` from `@portabletext/react` in client components
- Security headers applied to all routes except `/studio` via `next.config.ts`

## Layers

**RSC Page Layer:**
- Purpose: Server-side data fetching from Sanity + mounting SanityLive for live updates
- Location: `fewog-app/src/app/*/page.tsx`
- Contains: `async function` components, `sanityFetch` calls (often parallel via `Promise.all`), `<SanityLive />` mount
- Depends on: `fewog-app/src/sanity/live.ts`, `fewog-app/src/sanity/queries.ts`
- Used by: Next.js App Router

**Client Component Layer:**
- Purpose: UI composition, interactivity, state management
- Location: `fewog-app/src/app/*-client.tsx` and `fewog-app/src/app/*/[slug]/*-client.tsx`
- Contains: `'use client'` components receiving typed props from RSC pages, PortableText rendering, fallback content
- Depends on: `fewog-app/src/components/`, `fewog-app/src/sanity/image.ts`, `@portabletext/react`
- Used by: RSC page files

**Shared Component Layer:**
- Purpose: Reusable UI building blocks shared across multiple pages
- Location: `fewog-app/src/components/`
- Contains: Nav, Footer, ContactStrip, ServiceTile, Icon
- Depends on: `fewog-app/src/sanity/queries.ts` (ContactStrip uses `KontaktData` type)
- Used by: all client component files

**Sanity Integration Layer:**
- Purpose: Abstracts all Sanity SDK setup — client creation, live fetching, image URL building, GROQ queries, TypeScript types
- Location: `fewog-app/src/sanity/`
- Contains: `client.ts`, `env.ts`, `live.ts`, `image.ts`, `queries.ts`, `schemaTypes/`
- Depends on: `next-sanity`, `@sanity/image-url`, environment variables
- Used by: RSC pages (queries, live), client components (image URLs, types)

**CMS Schema Layer:**
- Purpose: Defines the Sanity document types and Studio configuration
- Location: `fewog-app/src/sanity/schemaTypes/`, `fewog-app/sanity.config.ts`
- Contains: 6 schemas (liegenschaft, neuigkeit, einstellungen, dokument, datenschutz, impressum)
- Depends on: `sanity` SDK
- Used by: Sanity Studio at runtime via `fewog-app/sanity.config.ts`

**Static Data Layer:**
- Purpose: Fallback/seed property data and TypeScript interfaces
- Location: `fewog-app/src/lib/data.ts`
- Contains: `FEWOG_DATA` constant (50 properties, 3 districts, org stats), `Property`/`District`/`FewogData` interfaces
- Depends on: nothing
- Used by: `home-client.tsx` (stats fallback), `wohnen-client.tsx` (partially superseded by Sanity)

## Data Flow

### Primary Request Path (Content Pages)

1. Browser requests a route (e.g., `/wohnen`)
2. Next.js App Router invokes the RSC `page.tsx` on the server (`fewog-app/src/app/wohnen/page.tsx`)
3. `sanityFetch({ query: liegenschaftenQuery })` calls Sanity Content Lake via `next-sanity` (GROQ API)
4. Data returned as typed objects; RSC renders `<WohnenClient liegenschaften={...} />` + `<SanityLive />`
5. HTML streamed to browser; React hydrates the client component
6. `<SanityLive />` establishes a live connection — future Sanity publishes push updates without page reload

### Sanity Singleton Pattern (Einstellungen)

The `einstellungen` document is a singleton referenced by fixed document ID `seiteneinstellungen` in the Studio structure. Multiple queries extract different slices of it:
- `kontaktQuery` → contact strip on home page
- `startseiteQuery` → hero image, hero text, service tiles on home page
- `organeQuery` → Vorstand/Aufsichtsrat on Über uns
- `serviceseiteQuery` → Mietertreff + rich text on Service page
- `ueberunsseiteQuery` → Historie/Entwicklung rich text on Über uns
- `aktuellesInfoQuery` → info blocks on Aktuelles page
- `einstellungenQuery` → placeholder image for Wohnen page

### Legal Page Pattern (Datenschutz + Impressum)

1. RSC fetches `datenschutzQuery` / `impressumQuery` — queries fixed document IDs (`datenschutzerklaerung`, `impressum`)
2. `data.inhalt` (Portable Text array) passed as prop to client component
3. Client renders `<PortableText value={inhalt} />` — or falls back to hardcoded `DEFAULT_INHALT` if Sanity data is null
4. `<SanityLive />` mounts for real-time updates

### News Article Flow (Dynamic Route)

1. Browser requests `/aktuelles/[slug]`
2. RSC `NeuigkeitPage` awaits `params` (Next.js 15 async params), calls `sanityFetch` with slug
3. If no article found: `notFound()` triggers Next.js 404 response
4. `ArticleClient` receives `NeuigkeitDetail`; renders header, `urlFor(titelbild)` image, PortableText body
5. In-body images in PortableText rendered via custom `ptComponents.types.image` handler using `urlFor`

### Hero Image Flow

1. `startseiteQuery` includes `heroBild` field from `einstellungen` singleton
2. `HomeClient` calls `urlFor(startseite.heroBild).width(1200).height(800).fit('crop').url()`
3. Result URL (Sanity CDN) used as `<img src>`. Falls back to Unsplash placeholder if no Sanity image set.

**State Management:**
- No global state. Each client component holds its own `useState`.
- Nav active key passed as prop from parent client components; still uses per-page `useState('pageName')` pattern (not derived from URL).
- No context, no Zustand, no Redux.

## Key Abstractions

**`sanityFetch` + `SanityLive` (defineLive):**
- Purpose: Unified data fetching that supports both initial SSR load and real-time updates
- Setup: `fewog-app/src/sanity/live.ts`
- Usage: `const { data } = await sanityFetch({ query, params? })` in RSC; `<SanityLive />` in JSX
- Note: `stega: false` on the base client prevents stega encoding leaking into meta tags

**`urlFor(source)`:**
- Purpose: Build Sanity CDN image URLs with transform parameters
- Setup: `fewog-app/src/sanity/image.ts` (wraps `@sanity/image-url`)
- Usage: `urlFor(imageField).width(N).height(N).fit('crop').url()`
- Used in: `home-client.tsx`, `wohnen-client.tsx`, `article-client.tsx`, `wohnen/page.tsx`

**GROQ Queries + TypeScript types (co-located):**
- Purpose: Single source of truth for what data each page needs and its shape
- Location: `fewog-app/src/sanity/queries.ts`
- Pattern: Each query string is exported alongside its result TypeScript type (e.g., `kontaktQuery` + `KontaktData`)

**Singleton documents (fixed document IDs):**
- `einstellungen` → document ID `seiteneinstellungen` (all site settings, contact, page content)
- `datenschutz` → document ID `datenschutzerklaerung`
- `impressum` → document ID `impressum`
- Studio structure enforces these via `S.document().schemaType(...).documentId(...)` in `sanity.config.ts`

**`ArchivClient` (shared archive UI):**
- Purpose: Reusable PDF list component used by both archive sub-pages
- Location: `fewog-app/src/app/service/archiv-client.tsx`
- Pattern: Accepts `titel`, `lead`, `rubriktitel`, `navPage`, `dokumente` props — same component, different data

**Fallback content pattern:**
- All client components define `DEFAULT_*` constants (or inline fallbacks) for when Sanity returns null
- Pattern: `const value = sanityData?.field ?? DEFAULT_VALUE`
- Ensures pages render meaningfully during Sanity outage or before content is authored

## Entry Points

**Root Layout:**
- Location: `fewog-app/src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Loads Geist fonts via `next/font/google`, applies `globals.css`, sets HTML shell
- Known issue: `lang="en"` should be `lang="de"` (WCAG 2.1 AA SC 3.1.1 violation)

**Home Page (RSC):**
- Location: `fewog-app/src/app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Parallel fetch of kontakt + startseite data; hands to HomeClient

**Wohnen Page (RSC):**
- Location: `fewog-app/src/app/wohnen/page.tsx`
- Triggers: Route `/wohnen`
- Responsibilities: Parallel fetch of all liegenschaften + placeholder image from einstellungen

**Studio:**
- Location: `fewog-app/src/app/studio/[[...tool]]/page.tsx`
- Triggers: Route `/studio` (all sub-paths)
- Responsibilities: Renders full Sanity Studio UI via `NextStudio`; noindex/nofollow enforced in `fewog-app/src/app/studio/layout.tsx`

## Architectural Constraints

- **Rendering model:** RSC pages (`async function`) fetch data; client components (`'use client'`) render UI. `<SanityLive />` always mounted at RSC level, never inside client components.
- **Sanity packages transpiled:** `next.config.ts` includes `transpilePackages` for `sanity`, `@sanity/ui`, `@sanity/icons`, `@sanity/vision`, `next-sanity` — required for App Router compatibility.
- **useEffectEvent polyfill:** Custom webpack loader in `next.config.ts` patches React's `useEffectEvent` in both the Next.js compiled React bundle and `node_modules/react` to fix Sanity 5.x + Next.js 15.5.x incompatibility. See `fewog-app/src/lib/use-effect-event-loader.cjs`.
- **Security headers:** Applied to all routes except `/studio` (which needs frames for preview). Headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-DNS-Prefetch-Control`.
- **Images:** All Sanity images built with `urlFor()` and rendered as plain `<img>` tags. `remotePatterns` in `next.config.ts` allows `cdn.sanity.io`. `next/image` is not used.
- **No dynamic `[slug]` routes except:** `/aktuelles/[slug]` for individual news articles.
- **Global state:** None. Per-component `useState` only.
- **Circular imports:** None detected.
- **Threading:** Single-threaded browser JS. No web workers.
- **Studio security:** Studio route excluded from X-Frame-Options to allow Sanity preview iframe. Studio layout sets `robots: { index: false, follow: false }`.

## Anti-Patterns

### Active nav state via per-page useState

**What happens:** Each client component initializes `const [page, setPage] = useState('pageName')` and passes it to `<Nav page={page} setPage={setPage} />`.
**Why it's wrong:** Active state is redundant — `usePathname()` from `next/navigation` already exposes the current route. Creates inconsistency (datenschutz/impressum use `useState('')`).
**Do this instead:** Derive active nav key from `usePathname()` inside `Nav` itself. Remove the `page`/`setPage` props from all client component files.

### Plain `<img>` tags for all images

**What happens:** `urlFor(image).width(N).height(N).url()` strings fed into `<img src>` in `home-client.tsx`, `wohnen-client.tsx`, `article-client.tsx`.
**Why it's wrong:** No lazy loading, no WebP fallback, no responsive `srcset`, no layout shift prevention from Next.js image optimization.
**Do this instead:** Use `next/image` with `remotePatterns` already configured for `cdn.sanity.io` in `next.config.ts`. Or use the `next-sanity/image` loader.

### lang="en" on a German-language site

**What happens:** `<html lang="en">` in `fewog-app/src/app/layout.tsx` line 27.
**Why it's wrong:** Screen readers announce the page as English. Violates WCAG 2.1 AA SC 3.1.1.
**Do this instead:** Change to `<html lang="de">`.

### Hardcoded metadata in layout.tsx

**What happens:** `metadata.title = "Create Next App"` and `metadata.description = "Generated by create next app"` in `fewog-app/src/app/layout.tsx` lines 15–18.
**Why it's wrong:** Wrong title and description served to all pages, all crawlers, all social shares.
**Do this instead:** Replace with FEWOG-specific values; add per-page `generateMetadata` for `/aktuelles/[slug]` articles.

## Error Handling

**Strategy:** Minimal. `notFound()` is called in `fewog-app/src/app/aktuelles/[slug]/page.tsx` for missing articles. No other explicit error handling exists.

**Patterns:**
- `notFound()` from `next/navigation` on missing Sanity document (articles only)
- Null coalescing (`?? fallback`) for all Sanity data fields in client components
- No `error.tsx` boundary route defined
- No `loading.tsx` route defined
- No `try/catch` around `sanityFetch` calls

## Cross-Cutting Concerns

**Logging:** None.
**Validation:** None. No forms exist yet.
**Authentication:** None. The site is entirely public. Studio itself has no additional auth layer beyond Sanity's own identity system.
**Rich text rendering:** `@portabletext/react` `<PortableText>` used in `datenschutz-client.tsx`, `impressum-client.tsx`, `article-client.tsx`, and service/ueberuns/aktuelles clients for Sanity block content fields.

---

*Architecture analysis: 2026-05-21*
