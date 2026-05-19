# Codebase Structure

**Analysis Date:** 2026-05-19

## Directory Layout

```
FEWOG/                          # Repo root
├── CLAUDE.md                   # Project instructions and tech stack reference
├── Design/                     # Original HTML/JSX prototype (reference only)
│   ├── FEWOG Fellbach.html     # Single-file HTML prototype
│   ├── components.jsx          # React prototype components
│   ├── views.jsx               # React prototype page views
│   ├── data.js                 # Prototype data (superseded by src/lib/data.ts)
│   ├── styles.css              # Prototype styles (reference for globals.css)
│   ├── tweaks-panel.jsx        # Design tweaks panel UI
│   └── uploads/                # Design reference images
├── fewog-app/                  # Next.js application (primary working directory)
│   ├── next.config.ts          # Next.js config (currently empty placeholder)
│   ├── tsconfig.json           # TypeScript config; path alias @/* → ./src/*
│   ├── package.json            # Dependencies and scripts
│   ├── public/                 # Static assets (default Next.js SVG placeholders only)
│   └── src/
│       ├── app/                # Next.js App Router — pages and global styles
│       │   ├── layout.tsx      # Root layout — only true server component
│       │   ├── page.tsx        # Home page (/)
│       │   ├── globals.css     # Global CSS: FEWOG design tokens + component styles + Tailwind
│       │   ├── favicon.ico
│       │   ├── aktuelles/
│       │   │   └── page.tsx    # /aktuelles — news and announcements
│       │   ├── datenschutz/
│       │   │   └── page.tsx    # /datenschutz — DSGVO Datenschutzerklärung
│       │   ├── impressum/
│       │   │   └── page.tsx    # /impressum — German legal Impressum
│       │   ├── service/
│       │   │   └── page.tsx    # /service — services, downloads, room rentals
│       │   ├── ueberuns/
│       │   │   └── page.tsx    # /ueberuns — history, governance, Satzung
│       │   └── wohnen/
│       │       └── page.tsx    # /wohnen — A–Z property listing with detail panel
│       ├── components/         # Shared UI components (all 'use client')
│       │   ├── contact-strip.tsx
│       │   ├── footer.tsx
│       │   ├── icons.tsx
│       │   ├── nav.tsx
│       │   └── service-tile.tsx
│       ├── lib/                # Data and utilities
│       │   └── data.ts         # FEWOG_DATA constant + TypeScript interfaces
│       └── types/              # (directory exists, currently empty)
└── .planning/                  # GSD planning artifacts
    └── codebase/               # Codebase map documents
```

## Directory Purposes

**`Design/`:**
- Purpose: Original prototype files used to build the current app — reference material only
- Contains: JSX components, JS data, HTML prototype, CSS prototype
- Key files: `components.jsx` (prototype UI), `data.js` (original data structure), `styles.css` (design reference)
- Status: Not imported by the Next.js app — do not modify

**`fewog-app/src/app/`:**
- Purpose: Next.js App Router pages and global styles
- Contains: `layout.tsx` (root), one `page.tsx` per route, `globals.css`
- Key files: `layout.tsx` (server component shell), `wohnen/page.tsx` (most complex page)

**`fewog-app/src/components/`:**
- Purpose: Reusable UI components shared across pages
- Contains: `nav.tsx`, `footer.tsx`, `contact-strip.tsx`, `service-tile.tsx`, `icons.tsx`
- Structure: Flat — no subdirectories

**`fewog-app/src/lib/`:**
- Purpose: Data layer and shared utilities
- Contains: `data.ts` — the entire data layer (50 properties, 3 districts, site meta)
- Future: Will be replaced/supplemented by Sanity queries when CMS is integrated

**`fewog-app/src/types/`:**
- Purpose: Intended for shared TypeScript type definitions
- Current state: Directory exists but is empty — types are co-located in `src/lib/data.ts`

**`fewog-app/public/`:**
- Purpose: Static files served at root URL (`/filename`)
- Current contents: Default Next.js placeholder SVGs only — no FEWOG-specific assets

## Key File Locations

**Entry Points:**
- `fewog-app/src/app/layout.tsx` — Root HTML shell (server component)
- `fewog-app/src/app/page.tsx` — Home page (`/`)
- `fewog-app/src/app/wohnen/page.tsx` — Property listing page (`/wohnen`)

**Global Styles:**
- `fewog-app/src/app/globals.css` — All CSS: design tokens, layout primitives, component styles, responsive breakpoints (~780 lines)

**Data:**
- `fewog-app/src/lib/data.ts` — `FEWOG_DATA` constant + `Property`, `District`, `FewogData` interfaces

**Navigation:**
- `fewog-app/src/components/nav.tsx` — Sticky nav, mobile hamburger, `useRouter()` navigation

**Icons:**
- `fewog-app/src/components/icons.tsx` — All SVG icons as `Icon.*` named exports

**Configuration:**
- `fewog-app/next.config.ts` — Empty Next.js config (needs `remotePatterns` when `next/image` is adopted)
- `fewog-app/tsconfig.json` — TypeScript; `@/*` alias maps to `./src/*`
- `fewog-app/package.json` — Dependencies: Next.js 15.5.18, React 19.2.4, Sanity 5.x, Tailwind 4.x

## Page Inventory

| Route | File | Rendering | Key state | Content source |
|-------|------|-----------|-----------|----------------|
| `/` | `src/app/page.tsx` | CSR | `page: string` | `FEWOG_DATA.meta` + hardcoded |
| `/wohnen` | `src/app/wohnen/page.tsx` | CSR | `selectedProperty: Property \| null` | `FEWOG_DATA.properties` (50 items) |
| `/aktuelles` | `src/app/aktuelles/page.tsx` | CSR | `page: string` | Hardcoded JSX |
| `/service` | `src/app/service/page.tsx` | CSR | `page: string` | Hardcoded JSX |
| `/ueberuns` | `src/app/ueberuns/page.tsx` | CSR | `page: string` | Hardcoded JSX |
| `/impressum` | `src/app/impressum/page.tsx` | CSR | `page: string` | Hardcoded JSX |
| `/datenschutz` | `src/app/datenschutz/page.tsx` | CSR | `page: string` | Hardcoded JSX |

## Component Inventory

| Component | File | Props | Used By |
|-----------|------|-------|---------|
| `Nav` | `src/components/nav.tsx` | `page: string`, `setPage: (p: string) => void` | All 5 page files |
| `Footer` | `src/components/footer.tsx` | none | All 5 page files |
| `ContactStrip` | `src/components/contact-strip.tsx` | none | `src/app/page.tsx` only |
| `ServiceTile` | `src/components/service-tile.tsx` | `icon`, `title`, `desc`, `href?`, `onClick?` | `src/app/page.tsx` only |
| `Icon` | `src/components/icons.tsx` | (namespace object, not a component) | `nav.tsx`, `contact-strip.tsx`, `src/app/page.tsx` |

**Available Icon keys:** `arrow`, `search`, `close`, `burger`, `phone`, `mail`, `clock`, `wrench`, `community`, `doc`, `leaf`, `home`, `pin`

## Naming Conventions

**Files:**
- Pages: `page.tsx` (Next.js App Router convention — never deviate)
- Components: `kebab-case.tsx` (e.g., `contact-strip.tsx`, `service-tile.tsx`)
- Data/lib modules: `kebab-case.ts` (e.g., `data.ts`)
- Layouts: `layout.tsx` (App Router convention)

**Directories:**
- Route segments: lowercase German slugs (e.g., `wohnen`, `ueberuns`, `aktuelles`, `service`)
- Component directory: `components/` (flat — no subdirectories currently)

**Exports:**
- Components: Named exports with PascalCase (`export function Nav`, `export function Footer`)
- Data constants: Named uppercase constant (`export const FEWOG_DATA`)
- TypeScript interfaces: Named PascalCase interfaces (`export interface Property`, `export interface District`)

**CSS classes:** Semantic BEM-inspired names matching component roles (`.nav`, `.nav-inner`, `.nav-link`, `.hero`, `.hero-grid`, `.bestand-row`, `.service-tile`) — all defined in `globals.css`.

**Import paths:** Always use the `@/` alias for `src/` imports (e.g., `import { Nav } from '@/components/nav'`, `import { FEWOG_DATA } from '@/lib/data'`).

## Where to Add New Code

**New route/page:**
1. Create `fewog-app/src/app/<route-slug>/page.tsx`
2. Add `'use client'` directive (current convention — all pages are client components)
3. Import `Nav` and `Footer` from `@/components/`
4. Add `const [page, setPage] = useState('<route-slug>')` for nav active state
5. Pass `page` and `setPage` to `<Nav>`
6. Register the route key in `Nav`'s `go()` function in `src/components/nav.tsx` if it's a new slug

**New shared UI component:**
- Add to `fewog-app/src/components/<component-name>.tsx` as a named export
- Add `'use client'` if it uses any React hooks or browser APIs
- Use CSS classes defined in `globals.css` or add new classes there

**New icon:**
- Add a new key to the `Icon` object in `fewog-app/src/components/icons.tsx`
- Use the same SVG style: `width/height` attribute, `fill="none"`, `stroke="currentColor"`, `strokeWidth="2"`

**New CSS component styles:**
- Add to `fewog-app/src/app/globals.css` — do not create per-component CSS files; the project uses a single global stylesheet

**New data type or static content:**
- Add interface to `fewog-app/src/lib/data.ts`
- Add data to the `FEWOG_DATA` constant
- When Sanity is integrated, this module will be replaced by CMS-fetched queries using `defineLive`

**Static assets (images, PDFs):**
- Place in `fewog-app/public/` — accessible at `/<filename>` with no path prefix
- Currently: no FEWOG assets in `public/`; property images are hotlinked from `fewog.de`

**Path alias:**
- Use `@/` for all `src/` imports: `import X from '@/components/x'` not `'../../components/x'`

## Special Directories

**`Design/`:**
- Purpose: Original HTML/JSX prototype — design reference
- Generated: No
- Committed: Yes
- Do not import from this directory in the Next.js app

**`fewog-app/public/`:**
- Purpose: Static file serving — files accessible at root URL
- Generated: No
- Committed: Yes
- Current contents: Default Next.js placeholder SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)

**`fewog-app/src/types/`:**
- Purpose: Shared TypeScript type definitions
- Generated: No
- Committed: Yes (empty)
- Current state: Unused — types live in `src/lib/data.ts`; Sanity TypeGen output will go here when integrated

**`fewog-app/.next/`:**
- Purpose: Next.js build output and dev server cache
- Generated: Yes
- Committed: No (`.gitignore`)

**`.planning/`:**
- Purpose: GSD workflow planning artifacts (phases, codebase maps, quick task logs)
- Generated: By GSD commands
- Committed: Yes

---

*Structure analysis: 2026-05-19*
