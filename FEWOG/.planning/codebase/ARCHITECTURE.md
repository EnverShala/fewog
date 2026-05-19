<!-- refreshed: 2026-05-19 -->
# Architecture

**Analysis Date:** 2026-05-19

## Application Type

Static-first corporate website for FEWOG (Fellbacher Wohnungsbau-Genossenschaft eG). Built with Next.js 15 App Router. The current implementation is a **prototype/MVP with hardcoded data** — Sanity CMS packages are installed (`sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`) but not yet wired up. All content is served from a static TypeScript module (`src/lib/data.ts`).

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                          │
│  All page components use 'use client' — CSR only            │
└────────────────────────┬────────────────────────────────────┘
                         │ Next.js App Router
┌────────────────────────▼────────────────────────────────────┐
│                   Page Components                            │
│  /           → src/app/page.tsx         (Home)              │
│  /wohnen     → src/app/wohnen/page.tsx  (Property A–Z list) │
│  /service    → src/app/service/page.tsx (Services)          │
│  /ueberuns   → src/app/ueberuns/page.tsx (About)            │
│  /aktuelles  → src/app/aktuelles/page.tsx (News)            │
└────────────┬──────────────────────────────┬─────────────────┘
             │                              │
             ▼                              ▼
┌────────────────────────┐  ┌──────────────────────────────────┐
│   Shared Components    │  │   Static Data Layer              │
│  src/components/       │  │  src/lib/data.ts                 │
│  - nav.tsx             │  │  - FEWOG_DATA typed constant     │
│  - footer.tsx          │  │  - Property[], District[], meta  │
│  - contact-strip.tsx   │  └──────────────────────────────────┘
│  - service-tile.tsx    │
│  - icons.tsx           │
└────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `RootLayout` | HTML shell, Google Fonts (Geist), global CSS import | `src/app/layout.tsx` |
| `Home` | Landing page: hero, service dock, contact strip | `src/app/page.tsx` |
| `WohnenPage` | A–Z property list with slide-in detail panel, touch swipe-to-close | `src/app/wohnen/page.tsx` |
| `ServicePage` | Mietertreff, Mietermagazin, Geschäftsbericht, Ferienwohnungen, Veranstaltungsraum | `src/app/service/page.tsx` |
| `UeberUnsPage` | History, governance (Vorstand, Aufsichtsrat), Satzung PDF download | `src/app/ueberuns/page.tsx` |
| `AktuellesPage` | Static announcements: Mängelmeldung, METRONA portal, Mietertreff | `src/app/aktuelles/page.tsx` |
| `Nav` | Sticky nav bar with active-link highlighting and mobile hamburger menu | `src/components/nav.tsx` |
| `Footer` | Brand mark, copyright line, Impressum/Datenschutz/AGB links (placeholder hrefs) | `src/components/footer.tsx` |
| `ContactStrip` | Three-column office hours / phone / address block | `src/components/contact-strip.tsx` |
| `ServiceTile` | Icon + title + description card; renders as `<a>` or `<div>` based on `href` prop | `src/components/service-tile.tsx` |
| `Icon` | Named inline SVG icon map accessed as `Icon.wrench`, `Icon.phone`, etc. | `src/components/icons.tsx` |
| `FEWOG_DATA` | Typed constant: meta stats, 3 districts with SVG paths, 50 properties with images | `src/lib/data.ts` |

## Pattern Overview

**Overall:** Client-only SPA running inside the Next.js App Router shell.

**Key Characteristics:**
- Every page file declares `'use client'` — no React Server Components in page layer
- Navigation is driven by `useRouter().push()` inside `Nav`, but each page also maintains a `page: string` state that is threaded down to `Nav` as a prop for active-link styling
- `RootLayout` (`src/app/layout.tsx`) is the only file without `'use client'` — the only true server component; wraps all pages with fonts and global CSS
- Data is fully hardcoded in `src/lib/data.ts` — no fetching, no Sanity CMS integration yet
- No shared layout wraps individual page segments — each page independently instantiates `<Nav>` and `<Footer>`

## Layers

**Root Layout (Server Component):**
- Purpose: HTML `<html>` shell with Geist font CSS variables, antialiasing, global CSS import
- Location: `src/app/layout.tsx`
- Contains: `<html lang="en">`, `<body>`, Geist font declarations, `Metadata` export
- Depends on: `src/app/globals.css`
- Used by: All pages (Next.js App Router convention)

**Page Layer (Client Components):**
- Purpose: Route-specific page composition and local UI state
- Location: `src/app/page.tsx`, `src/app/wohnen/page.tsx`, `src/app/aktuelles/page.tsx`, `src/app/service/page.tsx`, `src/app/ueberuns/page.tsx`
- Contains: Layout composition, local `useState`, `useMemo`, `useEffect`, `useRef`
- Depends on: `src/components/`, `src/lib/data.ts`
- Used by: Next.js router via file-system routing

**Component Layer (Client Components):**
- Purpose: Reusable presentational and interactive UI primitives
- Location: `src/components/`
- Contains: `Nav`, `Footer`, `ContactStrip`, `ServiceTile`, `Icon`
- Depends on: `src/components/icons.tsx` (internal), nothing from `src/lib/`
- Used by: All page files

**Data Layer (Static Module):**
- Purpose: Single source of truth for all FEWOG content
- Location: `src/lib/data.ts`
- Contains: TypeScript interfaces (`Property`, `District`, `FewogData`) and `FEWOG_DATA` constant (50 properties, 3 districts, site meta)
- Depends on: Nothing
- Used by: `src/app/page.tsx`, `src/app/wohnen/page.tsx`

## Routing Strategy

**Framework:** Next.js 15 App Router (file-system routing under `src/app/`)

**Current routes:**

| URL | File | Notes |
|-----|------|-------|
| `/` | `src/app/page.tsx` | Hero + service dock |
| `/wohnen` | `src/app/wohnen/page.tsx` | Property list with detail panel |
| `/service` | `src/app/service/page.tsx` | Services + downloads |
| `/ueberuns` | `src/app/ueberuns/page.tsx` | About + governance |
| `/aktuelles` | `src/app/aktuelles/page.tsx` | Announcements |

**Navigation pattern (hybrid, partially incorrect):**

`Nav` uses `useRouter().push()` from `next/navigation` for real URL changes. However, every page also holds a `page: string` local state set to its own route key (e.g., `useState('wohnen')`) and passes it as prop to `Nav` for active-link highlighting. This is redundant — `Nav` could derive the active route from `usePathname()` instead.

The home page (`src/app/page.tsx`) additionally uses a `useEffect` watching `page` state to call `window.location.href = '/wohnen'` — a full-page reload anti-pattern that duplicates what `useRouter` already handles correctly in `Nav`.

**Hash-based anchor navigation:** The Service page uses `id` attributes on sections (`#mietertreff`, `#mietermagazin`) with `scrollMarginTop: 80` for anchor links from the Home page's `ServiceTile` `href` props.

## Data Flow

### Primary Request Path (Static content pages: Aktuelles, Service, Über uns)

1. Next.js App Router serves the client bundle — no server-side data fetch
2. Page component mounts in browser
3. JSX renders hardcoded HTML content directly

### Property Listing (Wohnen)

1. `WohnenPage` mounts (`src/app/wohnen/page.tsx`)
2. `FEWOG_DATA.properties` imported at module level from `src/lib/data.ts` (50 entries)
3. `useMemo` → `filtered`: sorts properties alphabetically by `street` (German locale via `localeCompare`)
4. `useMemo` → `grouped`: groups sorted properties by first letter of street name into `{ letter, items }` array
5. User clicks a `.bestand-row` → `setSelectedProperty(prop)` triggers conditional render of detail panel
6. Detail panel slides in via CSS keyframe animation `slideInRight`

### Mobile Swipe-to-Close (Wohnen detail panel)

1. `onTouchStart` on `.bestand-detail-col` captures `touchStartX.current`
2. `onTouchMove` applies `translateX(delta)` directly to `detailRef.current.style.transform` (bypasses React)
3. `onTouchEnd`: if `delta > 80px`, calls `closeDetail()`
4. `closeDetail()` sets CSS transition `translateX(100%)` on the ref, then `setTimeout(() => setSelectedProperty(null), 320)` to unmount after animation

### Home → Wohnen Navigation (anti-pattern)

1. User clicks "Wohnungsbestand ansehen" → `onClick={() => setPage("wohnen")}`
2. `useEffect` in `src/app/page.tsx` watches `page`, detects `"wohnen"`, calls `window.location.href = '/wohnen'`
3. Causes full page reload instead of client-side navigation

**State Management:**
- No global store (no Redux, Zustand, Context)
- All state is local `useState` per page component
- `selectedProperty: Property | null` in `WohnenPage` controls detail panel
- `open: boolean` in `Nav` controls mobile hamburger

## Key Abstractions

**FEWOG_DATA:**
- Purpose: Central typed constant holding all site content (properties, districts, meta stats)
- File: `src/lib/data.ts`
- Pattern: Single exported constant + TypeScript interfaces; no runtime fetching

**Icon namespace:**
- Purpose: Centralised inline SVG icons, no external icon library dependency
- File: `src/components/icons.tsx`
- Pattern: Object of React functional components — `Icon.wrench`, `Icon.phone`, `Icon.burger`, etc.
- Available icons: `arrow`, `search`, `close`, `burger`, `phone`, `mail`, `clock`, `wrench`, `community`, `doc`, `leaf`, `home`, `pin`

**ServiceTile dual-mode rendering:**
- File: `src/components/service-tile.tsx`
- Pattern: Accepts optional `href` and `onClick` props; renders as `<a>` if `href` is provided, `<div>` otherwise

## Entry Points

**Root layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render (App Router convention)
- Responsibilities: HTML document shell, Geist fonts, `globals.css` import

**Home page:**
- Location: `src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Hero section with FEWOG stats, service dock with 3 `ServiceTile` cards, `ContactStrip`, `Footer`

**Wohnen:**
- Location: `src/app/wohnen/page.tsx`
- Triggers: GET `/wohnen`
- Responsibilities: A–Z property list grouped by letter, slide-in detail panel, mobile swipe gesture

## Rendering Strategy

| Route | Strategy | Notes |
|-------|----------|-------|
| `/` | CSR (`'use client'`) | Rendered in browser; FEWOG_DATA stats bundled at build time |
| `/wohnen` | CSR (`'use client'`) | All 50 properties bundled at build time; detail panel via local state |
| `/aktuelles` | CSR (`'use client'`) | Static HTML content; `'use client'` only needed for Nav active state |
| `/service` | CSR (`'use client'`) | Static HTML content; same redundant `'use client'` usage |
| `/ueberuns` | CSR (`'use client'`) | Static HTML content; same redundant `'use client'` usage |
| `layout.tsx` | Server Component | Only server component — no `'use client'` directive |

No SSR, ISR, `generateStaticParams`, or `defineLive` / `<SanityLive />` is used. No Sanity integration is implemented yet.

## Architectural Constraints

- **All pages are client components:** Every page file starts with `'use client'`. RSC streaming, server-side fetching, and bundle-splitting benefits are unused.
- **No shared page layout:** There is no `src/app/(main)/layout.tsx` or any nested layout. Each page re-instantiates `<Nav>` and `<Footer>` independently.
- **Global state:** None. Navigation state (`page`) is duplicated across every page component.
- **Direct DOM manipulation:** `src/app/wohnen/page.tsx` directly writes to `detailRef.current.style.transform` and `.style.transition` for swipe animation — bypassing React's rendering cycle.
- **No Sanity integration yet:** Packages installed (`sanity@^5.25.0`, `next-sanity@^11.6.13`, `@sanity/image-url@^2.1.1`, `@portabletext/react@^6.2.0`) but no `src/sanity/` directory, no schemas, no queries, no Sanity client.
- **External images via raw `<img>`:** Property images reference `https://www.fewog.de/fileadmin/_processed_/...` and homepage hero uses Unsplash. `next/image` is not used; `next.config.ts` has no `remotePatterns`.
- **`lang="en"` on German site:** `src/app/layout.tsx` sets `<html lang="en">` — should be `"de"`.
- **Placeholder metadata:** Root layout exports `title: "Create Next App"` — no FEWOG-specific metadata defined.

## Anti-Patterns

### Page-owned Nav/Footer instantiation

**What happens:** Each page file imports and renders `<Nav page={page} setPage={setPage}>` and `<Footer>` directly.
**Why it's wrong:** Breaks App Router layout composition; causes Nav and Footer to re-mount on every route transition; any nav change requires editing all five page files.
**Do this instead:** Move `Nav` and `Footer` into `src/app/(main)/layout.tsx` and use `usePathname()` in `Nav` to derive the active link — eliminating the `page`/`setPage` prop pattern.

### `'use client'` on static content pages

**What happens:** `src/app/aktuelles/page.tsx`, `src/app/service/page.tsx`, and `src/app/ueberuns/page.tsx` declare `'use client'` but only use `useState` for the Nav active-key prop.
**Why it's wrong:** Sends unnecessary JS to the browser for pages that are entirely static HTML. Prevents SSG and server rendering.
**Do this instead:** After moving Nav to a shared layout (above), remove `'use client'` from these pages — enabling static generation.

### `window.location.href` navigation in Home

**What happens:** `src/app/page.tsx` uses `useEffect` watching a `page` state string, then calls `window.location.href = '/wohnen'` when it becomes `"wohnen"`.
**Why it's wrong:** Causes a full page reload instead of a client-side transition; bypasses Next.js router prefetching.
**Do this instead:** Call `router.push('/wohnen')` directly in the button's `onClick` handler, same as `Nav` does in `src/components/nav.tsx:21`.

### Raw `<img>` instead of `next/image`

**What happens:** All images (property photos, hero image) use standard HTML `<img>` tags with absolute external URLs.
**Why it's wrong:** No lazy loading, no responsive `srcset`, no WebP conversion, no LCP optimization.
**Do this instead:** Use `<Image>` from `next/image` with `remotePatterns` in `next.config.ts` for `www.fewog.de` and `images.unsplash.com`.

## Error Handling

**Strategy:** None implemented.

**Patterns:**
- No error boundaries
- No `src/app/error.tsx` or `src/app/not-found.tsx`
- No try/catch (not applicable while data is a static import)

## Cross-Cutting Concerns

**Styling:** Single global CSS file `src/app/globals.css` (~780 lines). Uses CSS custom properties (design tokens) + Tailwind v4 (`@import "tailwindcss"`). Tailwind utilities are used only in `src/app/layout.tsx` for body flex setup. All component-level styles use semantic class names defined in `globals.css` (`.nav`, `.hero`, `.bestand-row`, `.service-tile`, etc.).

**Fonts:** Geist Sans + Geist Mono loaded via `next/font/google` in `src/app/layout.tsx`. FEWOG design system additionally references Fraunces (display), Montserrat (heading), Inter (body) as CSS `--f-*` variables — these are not loaded via `next/font` and will not be available unless added via a CDN link or font import.

**Responsive design:** Two CSS breakpoints in `globals.css`: tablet (`max-width: 960px`) and mobile (`max-width: 768px`). On mobile, the detail panel switches from a sticky sidebar to a `position: fixed` full-screen overlay with `slideInFromRight` animation.

**Logging:** None.
**Validation:** None.
**Authentication:** None (fully public website).
**Accessibility:** `aria-label` on nav burger and detail-panel close button. Missing: `lang="de"` on `<html>`, skip-to-content link, focus management when detail panel opens.

## Planned Architecture (CLAUDE.md) vs Current State

| Area | CLAUDE.md Target | Current State |
|------|-----------------|---------------|
| CMS | Sanity v5 + next-sanity v11 + `defineLive` | Packages installed, not wired up |
| Data fetching | `defineLive` + `<SanityLive />` for live updates | Static TypeScript constant in `src/lib/data.ts` |
| Studio | Embedded at `/studio` route | No studio route exists |
| Image handling | `next-sanity/image` loader or `next/image` + `remotePatterns` | Raw `<img>` tags, no optimization |
| Rendering | Server Components + ISR via `defineLive` | All pages are `'use client'` CSR |
| Metadata | Per-page German metadata | Placeholder English metadata in root layout only |
| Types | Sanity TypeGen-generated types | Hand-authored interfaces in `src/lib/data.ts` |

---

*Architecture analysis: 2026-05-19*
