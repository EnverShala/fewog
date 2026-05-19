<!-- refreshed: 2026-05-19 -->
# Architecture

**Analysis Date:** 2026-05-19

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser (User)                            │
│              React 19 + Framer Motion + CSS                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js 15 App Router (Vercel)                  │
│         `fewog-app/src/app/`  — all pages 'use client'       │
│  layout.tsx → page.tsx (per route) → shared components       │
└──────────┬───────────────────────────────────────────────────┘
           │ Static data import (no CMS yet)
           ▼
┌─────────────────────────────────────────────────────────────┐
│           Local Data Layer                                   │
│           `fewog-app/src/lib/data.ts`                        │
│           Hardcoded TypeScript objects (FEWOG_DATA)          │
└─────────────────────────────────────────────────────────────┘

Future (planned, packages installed but not wired up):
┌─────────────────────────────────────────────────────────────┐
│           Sanity Studio (not yet integrated)                 │
│           sanity, next-sanity, @sanity/image-url installed   │
│           No schemas, no sanity.config.ts, no /studio route  │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `RootLayout` | HTML shell, font loading, global CSS | `fewog-app/src/app/layout.tsx` |
| `Home` | Landing page: hero, service dock, contact strip | `fewog-app/src/app/page.tsx` |
| `WohnenPage` | Property A-Z list + animated detail panel | `fewog-app/src/app/wohnen/page.tsx` |
| `ServicePage` | Static content: Mietertreff, publications, rentals | `fewog-app/src/app/service/page.tsx` |
| `UeberUnsPage` | Static content: history, governance, Satzung | `fewog-app/src/app/ueberuns/page.tsx` |
| `AktuellesPage` | Static content: notices, waiting list, METRONA | `fewog-app/src/app/aktuelles/page.tsx` |
| `MietermagazinArchivPage` | Archive list of annual tenant magazines as PDFs | `fewog-app/src/app/service/mietermagazin-archiv/page.tsx` |
| `GeschaeftsberichtArchivPage` | Archive list of annual reports as PDFs | `fewog-app/src/app/service/geschaeftsbericht-archiv/page.tsx` |
| `ImpressumPage` | Legal imprint (§5 TMG) | `fewog-app/src/app/impressum/page.tsx` |
| `DatenschutzPage` | DSGVO privacy statement | `fewog-app/src/app/datenschutz/page.tsx` |
| `Nav` | Sticky top nav, desktop links + mobile burger dropdown | `fewog-app/src/components/nav.tsx` |
| `Footer` | Copyright bar + Impressum/Datenschutz links | `fewog-app/src/components/footer.tsx` |
| `ContactStrip` | 3-column office hours / phone / address strip | `fewog-app/src/components/contact-strip.tsx` |
| `ServiceTile` | Clickable card: icon + title + description | `fewog-app/src/components/service-tile.tsx` |
| `Icon` | Named SVG icon collection (no external icon lib) | `fewog-app/src/components/icons.tsx` |
| `FEWOG_DATA` | All property, district, and meta data (static TS) | `fewog-app/src/lib/data.ts` |

## Pattern Overview

**Overall:** Multi-page client-rendered React app inside Next.js App Router shell. All pages are marked `'use client'` and rendered entirely in the browser. There is no server-side data fetching and no Sanity CMS integration yet despite packages being installed.

**Key Characteristics:**
- Every `page.tsx` file uses `'use client'` at the top — no RSC (React Server Components) in use
- All content is hardcoded: either in `FEWOG_DATA` (property data) or directly as JSX strings in page files
- Navigation active state is managed via local `useState('page-name')` in each page — not derived from the URL router
- Framer Motion used for animation on two specific interactions: mobile nav dropdown and property detail panel slide-in/swipe

## Layers

**App Layer (Pages):**
- Purpose: Route-level UI composition. Each page owns its full layout including Nav and Footer.
- Location: `fewog-app/src/app/`
- Contains: `page.tsx` per route, root `layout.tsx`, `globals.css`
- Depends on: components, lib/data
- Used by: Next.js router

**Component Layer:**
- Purpose: Reusable UI building blocks shared across pages
- Location: `fewog-app/src/components/`
- Contains: Nav, Footer, ContactStrip, ServiceTile, Icon
- Depends on: lib/data (Nav indirectly via router)
- Used by: all page files

**Data Layer:**
- Purpose: Single source of truth for all property data, district definitions, and org meta stats
- Location: `fewog-app/src/lib/data.ts`
- Contains: TypeScript interfaces (`Property`, `District`, `FewogData`) + `FEWOG_DATA` constant
- Depends on: nothing
- Used by: `fewog-app/src/app/page.tsx` (home), `fewog-app/src/app/wohnen/page.tsx`

## Data Flow

### Primary Request Path (All Routes)

1. Next.js serves pre-rendered HTML from Vercel edge (`fewog-app/src/app/[route]/page.tsx`)
2. React hydrates client-side (`'use client'` directive on every page)
3. Property data imported directly from `fewog-app/src/lib/data.ts` — no fetch, no API call
4. UI rendered from static data constant

### Property Detail Flow (Wohnen page)

1. User lands on `/wohnen` — `WohnenPage` renders full property list from `FEWOG_DATA.properties`
2. Properties sorted alphabetically via `useMemo` + `Array.sort` with German locale (`'de'`)
3. Properties grouped by first letter of street name via second `useMemo`
4. User clicks a row → `setSelectedProperty(prop)` triggers detail panel mount
5. `useLayoutEffect` fires: `framer-motion/animate` slides panel in from off-screen right (x: offscreen → 0, 320ms)
6. On mobile: `useEffect` attaches non-passive `touchmove` listener to detect horizontal swipe direction
7. Swipe right > 80px triggers panel close with slide-out animation; smaller swipe springs back to 0

### Mobile Navigation Flow

1. Burger button click → `setOpen(true)` in `Nav` component (`fewog-app/src/components/nav.tsx`)
2. `AnimatePresence` + `motion.div` animates dropdown: `height: 0 → 'auto'`, `opacity: 0 → 1`, 220ms
3. Nav link click → `router.push('/route')` from `next/navigation`

**State Management:**
- No global state. Each page holds its own `useState` for active nav key and selected property.
- Nav active state is manually initialized per page: `useState('wohnen')` in WohnenPage, `useState('service')` in ServicePage, etc.
- No context, no Zustand, no Redux.

## Key Abstractions

**FEWOG_DATA:**
- Purpose: Central data store for all 50 properties, 3 districts, and org statistics
- Location: `fewog-app/src/lib/data.ts`
- Pattern: Single exported constant of type `FewogData`; TypeScript interfaces `Property`, `District`, `FewogData` define the shape

**Icon object:**
- Purpose: Named SVG icon components — avoids external icon library dependency
- Location: `fewog-app/src/components/icons.tsx`
- Pattern: `Icon.wrench`, `Icon.doc`, `Icon.burger`, etc. — all are arrow functions returning inline SVGs

**Content blocks:**
- Purpose: Standardized card container for content-heavy pages (Service, Über uns, Aktuelles)
- Location: CSS class `.content-block` in `fewog-app/src/app/globals.css`
- Pattern: `<div className="content-block">` with `h2`, `h3`, `p`, `a.btn` children — used consistently across all static pages

## Entry Points

**Root Layout:**
- Location: `fewog-app/src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Loads Geist fonts via `next/font/google`, applies `globals.css`, sets HTML shell

**Home Page:**
- Location: `fewog-app/src/app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Hero section, service dock, contact strip, footer composition

**Wohnen Page:**
- Location: `fewog-app/src/app/wohnen/page.tsx`
- Triggers: Route `/wohnen`
- Responsibilities: Property list with alphabetical grouping and animated detail panel — most complex page in the codebase (~208 lines)

## Architectural Constraints

- **Rendering model:** All pages are client-side rendered (`'use client'`). Next.js App Router SSR/RSC features are not used. No `generateMetadata`, no streaming, no server actions.
- **No CMS integration:** Sanity packages (`sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`, `@sanity/locale-de-de`) are installed in `package.json` but no `sanity.config.ts`, no schema files, no `/studio` route, and no `SanityLive` or `defineLive` usage exists anywhere in the codebase.
- **Global state:** None. State is local to each page component.
- **Circular imports:** None detected.
- **Threading:** Single-threaded browser JS. No web workers.
- **Fonts:** Geist and Geist Mono loaded via `next/font/google` in `layout.tsx`. Additional fonts referenced in CSS design system (`Fraunces`, `Montserrat`, `Inter`, `JetBrains Mono`) at lines 21–24 of `globals.css` are NOT loaded via `next/font` — they fall through to system font fallbacks at runtime.
- **Images:** All images use plain `<img>` tags with absolute external URLs (Unsplash placeholder on home page, fewog.de CDN for properties). `next/image` is not used. No `remotePatterns` configured in `next.config.ts`.

## Anti-Patterns

### Active nav state via per-page useState

**What happens:** Each page initializes `const [page, setPage] = useState('pageName')` and passes it to `<Nav page={page} setPage={setPage} />`.
**Why it's wrong:** Active state is redundant — `usePathname()` from `next/navigation` already exposes the current route. The pattern duplicates routing knowledge into component props and causes inconsistency (datenschutz/impressum use `useState('')`).
**Do this instead:** Derive active nav key from `usePathname()` inside `Nav` itself. Remove the `page`/`setPage` props from all page files.

### Hardcoded content in JSX

**What happens:** All page content (history text, office hours, PDF links, contact details, archive lists) is written directly as JSX strings in page files such as `fewog-app/src/app/service/page.tsx` and `fewog-app/src/app/ueberuns/page.tsx`.
**Why it's wrong:** Content cannot be updated without a code deploy. This contradicts the project's core value: "Genossenschaftsvorstand kann alle Inhalte selbstständig und ohne Programmierkenntnisse pflegen."
**Do this instead:** Migrate content to Sanity CMS using the planned `defineLive` + `SanityLive` integration. Create schemas for page content, documents/downloads, and news.

### lang="en" on German-language site

**What happens:** `<html lang="en">` is set in `fewog-app/src/app/layout.tsx` line 26.
**Why it's wrong:** Screen readers and browser translation features announce the page as English. Violates WCAG 2.1 AA Success Criterion 3.1.1.
**Do this instead:** Change to `<html lang="de">` in `fewog-app/src/app/layout.tsx`.

### Missing next/image

**What happens:** All images use plain `<img>` tags with absolute external URLs in `fewog-app/src/app/page.tsx` and `fewog-app/src/app/wohnen/page.tsx`.
**Why it's wrong:** No optimization (no WebP conversion, no lazy loading, no layout shift prevention, no responsive `srcset`). The fewog.de CDN URLs become obsolete once images migrate to Sanity.
**Do this instead:** Use `next/image` with `remotePatterns` in `next.config.ts`, or use the `next-sanity/image` loader once Sanity is integrated.

## Error Handling

**Strategy:** None. There is no error handling in the application.

**Patterns:**
- No `try/catch` blocks (no async operations exist)
- No `error.tsx` boundary route defined
- No `not-found.tsx` route defined
- No loading states

## Cross-Cutting Concerns

**Logging:** None.
**Validation:** None. No forms exist yet.
**Authentication:** None. The site is entirely public.

---

*Architecture analysis: 2026-05-19*
