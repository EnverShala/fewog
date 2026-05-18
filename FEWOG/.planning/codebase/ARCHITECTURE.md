<!-- refreshed: 2026-05-18 -->
# Architecture

**Analysis Date:** 2026-05-18

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Client Side                     │
├──────────────────┬──────────────────┬───────────────────────┤
│  Home (`/`)      │  Wohnen          │  Static Info Pages    │
│ `src/app/page.tsx`│ `src/app/wohnen/`│ `aktuelles/`         │
│                  │                  │ `service/`            │
│                  │                  │ `ueberuns/`           │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Shared Components                         │
│  `src/components/nav.tsx`  `src/components/footer.tsx`      │
│  `src/components/contact-strip.tsx`                         │
│  `src/components/service-tile.tsx`  `src/components/icons.tsx`│
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│             Hardcoded Data Layer                             │
│             `src/lib/data.ts`                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| RootLayout | HTML shell, font loading, global CSS | `src/app/layout.tsx` |
| Home | Landing page: hero, service dock, contact strip | `src/app/page.tsx` |
| WohnenPage | A-Z property listing with expandable detail panel | `src/app/wohnen/page.tsx` |
| AktuellesPage | Static news/updates content | `src/app/aktuelles/page.tsx` |
| ServicePage | Static service offering content | `src/app/service/page.tsx` |
| UeberUnsPage | Static about/history/governance content | `src/app/ueberuns/page.tsx` |
| Nav | Site-wide navigation, mobile menu, route dispatch | `src/components/nav.tsx` |
| Footer | Footer links, legal nav | `src/components/footer.tsx` |
| ContactStrip | Office hours, phone, address bar | `src/components/contact-strip.tsx` |
| ServiceTile | Icon + title + description card primitive | `src/components/service-tile.tsx` |
| Icon | Inline SVG icon namespace (`Icon.wrench`, `Icon.phone`, etc.) | `src/components/icons.tsx` |
| FEWOG_DATA | Typed static data for properties, districts, site meta | `src/lib/data.ts` |

## Pattern Overview

**Overall:** Client-only SPA running inside the Next.js App Router shell.

**Key Characteristics:**
- Every page file declares `'use client'` — no server components are used in the current implementation
- Navigation is handled via a hybrid: `router.push()` in `Nav` for real URL changes; a `page` state string is passed down as prop to highlight the active nav item
- `RootLayout` (`src/app/layout.tsx`) is the only file without `'use client'` and therefore the only true server component; it wraps all pages with fonts and global CSS
- Data is fully hardcoded in `src/lib/data.ts` — no fetching, no CMS integration yet
- No shared layout wraps individual page segments — each page independently instantiates `<Nav>` and `<Footer>`

## Layers

**Root Layout (Server Component):**
- Purpose: HTML `<html>` shell with Geist font variables, antialiasing, global CSS import
- Location: `src/app/layout.tsx`
- Contains: `<html>`, `<body>`, font declarations, Metadata export
- Depends on: `src/app/globals.css`
- Used by: All pages (Next.js App Router convention)

**Page Layer (Client Components):**
- Purpose: Route-specific page composition and local UI state
- Location: `src/app/page.tsx`, `src/app/wohnen/page.tsx`, `src/app/aktuelles/page.tsx`, `src/app/service/page.tsx`, `src/app/ueberuns/page.tsx`
- Contains: Layout composition, local `useState`, `useMemo`, `useEffect`, `useRef`
- Depends on: `src/components/`, `src/lib/data.ts`
- Used by: Next.js router (file-system routing)

**Component Layer (Client Components):**
- Purpose: Reusable presentational and interactive UI primitives
- Location: `src/components/`
- Contains: `Nav`, `Footer`, `ContactStrip`, `ServiceTile`, `Icon`
- Depends on: `src/lib/data.ts` (indirectly via pages), `src/components/icons.tsx`
- Used by: All page files

**Data Layer (Static Module):**
- Purpose: Single source of truth for all FEWOG content
- Location: `src/lib/data.ts`
- Contains: TypeScript interfaces (`Property`, `District`, `FewogData`), `FEWOG_DATA` constant (50 properties, 3 districts, site meta)
- Depends on: Nothing
- Used by: `src/app/page.tsx`, `src/app/wohnen/page.tsx`

## Data Flow

### Primary Request Path (Static Pages: Aktuelles, Service, Über uns)

1. Next.js App Router serves the client bundle — no server-side data fetch
2. Page component mounts in browser (`src/app/aktuelles/page.tsx`, etc.)
3. JSX renders hardcoded HTML content directly

### Property Listing (Wohnen)

1. `WohnenPage` mounts (`src/app/wohnen/page.tsx`)
2. `FEWOG_DATA.properties` imported from `src/lib/data.ts` (50 entries, compile-time constant)
3. `useMemo` sorts and groups properties alphabetically by street name
4. User clicks a property row → `setSelectedProperty(prop)` triggers detail panel render
5. `useEffect` fires scroll-to on `detailPanelRef` after selection

### Homepage Hero Data

1. `Home` component imports `FEWOG_DATA` (`src/app/page.tsx:9`)
2. Meta values (`units`, `members`, `properties`, `founded`) rendered inline in hero stats and lead text

**State Management:**
- No global state store (no Redux, Zustand, or Context)
- All state is local `useState` per page component
- `page` string (active nav key) is passed as prop from each page to `Nav` and `Footer`
- Property selection state in `WohnenPage` is managed by `selectedProperty: Property | null`

## Key Abstractions

**FEWOG_DATA:**
- Purpose: Central typed constant holding all site content (properties, districts, meta)
- Examples: `src/lib/data.ts`
- Pattern: Single exported constant + TypeScript interfaces; no runtime fetching

**Icon namespace:**
- Purpose: Centralised inline SVG icons accessed as `Icon.wrench`, `Icon.phone`, etc.
- Examples: `src/components/icons.tsx`
- Pattern: Object of React functional components — no external icon library

**Nav prop threading:**
- Purpose: Tracks active route for nav highlighting
- Pattern: Each page holds `const [page, setPage] = useState('<route-key>')` and passes both down to `<Nav page={page} setPage={setPage}>` and `<Footer setPage={setPage}>`

## Entry Points

**Root layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render (Next.js App Router wraps all routes)
- Responsibilities: HTML document shell, fonts, global styles

**Home page:**
- Location: `src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Hero, service dock, contact strip, footer

**Wohnen:**
- Location: `src/app/wohnen/page.tsx`
- Triggers: GET `/wohnen`
- Responsibilities: A-Z property listing, filterable detail panel

## Rendering Strategy

| Route | Strategy | Notes |
|-------|----------|-------|
| `/` | Client-side (CSR) | `'use client'` — rendered in browser |
| `/wohnen` | Client-side (CSR) | `'use client'` — all 50 properties bundled at build time |
| `/aktuelles` | Client-side (CSR) | `'use client'` — static HTML content |
| `/service` | Client-side (CSR) | `'use client'` — static HTML content |
| `/ueberuns` | Client-side (CSR) | `'use client'` — static HTML content |
| `layout.tsx` | Server Component | Only server component — no `'use client'` directive |

No SSR, ISR, or `defineLive` is used. No Sanity integration is implemented yet.

## Architectural Constraints

- **No server components in pages:** All five page files use `'use client'`. Data fetching capabilities of Next.js App Router (RSC, server actions) are unused.
- **No shared page layout:** There is no `src/app/(routes)/layout.tsx` shared layout. Each page re-instantiates `<Nav>` and `<Footer>` independently, duplicating the page-to-nav prop-threading pattern.
- **Global state:** None — all state is component-local.
- **Circular imports:** None detected.
- **Image handling:** Raw `<img>` tags used throughout (homepage Unsplash URL, property images from `fewog.de` CDN). `next/image` is not used.
- **Metadata:** `layout.tsx` exports placeholder metadata (`"Create Next App"` title, default description). No per-page metadata is defined.
- **Font locale:** `layout.tsx` sets `lang="en"` — site content is German.

## Anti-Patterns

### Page-owned Nav/Footer instantiation

**What happens:** Each page file imports and renders `<Nav>` and `<Footer>` directly, passing `page` state as props.
**Why it's wrong:** Breaks the Next.js App Router layout composition model; any change to navigation requires editing every page file. Causes re-mounting of Nav and Footer on every route transition.
**Do this instead:** Move Nav and Footer into a shared route group layout at `src/app/(main)/layout.tsx` and use `usePathname()` in Nav instead of a prop.

### `'use client'` on static content pages

**What happens:** `aktuelles/page.tsx`, `service/page.tsx`, and `ueberuns/page.tsx` declare `'use client'` but only use `useState` to track the active nav key — no other client interaction.
**Why it's wrong:** Sends unnecessary JS to the browser for pages that are essentially static HTML. Prevents static generation and server rendering.
**Do this instead:** Once Nav is moved to a shared layout, these pages can be server components (remove `'use client'`), enabling SSG/static export.

### `window.location.href` navigation in Home

**What happens:** `src/app/page.tsx` uses `useEffect` + `window.location.href` to navigate to `/wohnen` when `page === 'wohnen'`.
**Why it's wrong:** Causes a full page reload instead of a client-side navigation; bypasses the Next.js router.
**Do this instead:** Use `router.push('/wohnen')` directly in the click handler, as `Nav` already does correctly at `src/components/nav.tsx:21`.

### Raw `<img>` instead of `next/image`

**What happens:** All images use standard `<img>` tags with external URLs (Unsplash, `fewog.de` CDN).
**Why it's wrong:** No lazy loading, no responsive srcsets, no WebP optimization, no LCP hints.
**Do this instead:** Use `<Image>` from `next/image` with `remotePatterns` config in `next.config.ts`.

## Error Handling

**Strategy:** None implemented.

**Patterns:**
- No error boundaries
- No try/catch in data access (not applicable — data is a static import)
- No 404 or error page defined (`src/app/not-found.tsx` and `src/app/error.tsx` do not exist)

## Cross-Cutting Concerns

**Logging:** None — no logging library or `console.*` calls in production code.
**Validation:** None — no form inputs or user-submitted data exist yet.
**Authentication:** None — no auth layer; all pages are public.

## Planned Architecture (CLAUDE.md) vs Current State

| Area | CLAUDE.md Target | Current State |
|------|-----------------|---------------|
| CMS | Sanity v5 + next-sanity v11 + `defineLive` | Not installed; all content is hardcoded in `src/lib/data.ts` |
| Data fetching | `defineLive` + `<SanityLive />` for live updates | No fetching; static TypeScript constant |
| Studio | Embedded at `/studio` route | No Sanity Studio route exists |
| Image handling | `next-sanity/image` loader or `next/image` + `remotePatterns` | Raw `<img>` tags; no `next/image` |
| Rendering | Server Components + ISR via `defineLive` | All pages are `'use client'` CSR |
| Metadata | Per-page German metadata | Placeholder English metadata only in root layout |
| Types | Sanity TypeGen-generated types | Hand-authored interfaces in `src/lib/data.ts` |

---

*Architecture analysis: 2026-05-18*
