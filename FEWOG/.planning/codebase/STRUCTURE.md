# File & Directory Structure

**Analysis Date:** 2026-05-18

## Directory Tree (source files only, no node_modules)

```
fewog-app/
├── next.config.ts          # Next.js config (currently empty placeholder)
├── tsconfig.json           # TypeScript config; path alias @/* → ./src/*
├── postcss.config.mjs      # PostCSS config (for Tailwind CSS v4)
├── eslint.config.mjs       # ESLint flat config
├── public/                 # Static assets (SVG placeholders only)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    ├── app/                # Next.js App Router pages
    │   ├── layout.tsx      # Root layout — only server component; fonts + global CSS
    │   ├── page.tsx        # Home page (/)
    │   ├── globals.css     # Global styles + FEWOG design tokens + Tailwind import
    │   ├── favicon.ico
    │   ├── aktuelles/
    │   │   └── page.tsx    # /aktuelles — static news content
    │   ├── service/
    │   │   └── page.tsx    # /service — service offerings content
    │   ├── ueberuns/
    │   │   └── page.tsx    # /ueberuns — about / history / governance
    │   └── wohnen/
    │       └── page.tsx    # /wohnen — A-Z property listing with detail panel
    ├── components/         # Shared UI components (all client components)
    │   ├── contact-strip.tsx   # Office hours / phone / address bar
    │   ├── footer.tsx          # Site footer with nav links
    │   ├── icons.tsx           # Inline SVG icon namespace (Icon.*)
    │   ├── nav.tsx             # Site navigation with mobile menu
    │   └── service-tile.tsx    # Icon + title + desc card primitive
    ├── lib/                # Utilities and data
    │   └── data.ts         # FEWOG_DATA constant + Property/District/FewogData types
    └── types/              # (directory exists, currently empty)
```

## Page Inventory

| Route | File | Rendering | Notes |
|-------|------|-----------|-------|
| `/` | `src/app/page.tsx` | CSR (`'use client'`) | Hero, service dock, contact strip; reads FEWOG_DATA meta stats |
| `/wohnen` | `src/app/wohnen/page.tsx` | CSR (`'use client'`) | A-Z list of 50 properties; click-to-expand detail panel; reads full FEWOG_DATA.properties |
| `/aktuelles` | `src/app/aktuelles/page.tsx` | CSR (`'use client'`) | Hardcoded news items: Mängelmeldung, Wohnungssuchende, METRONA, Mietertreff |
| `/service` | `src/app/service/page.tsx` | CSR (`'use client'`) | Hardcoded services: Mietertreff, Mietermagazin, Geschäftsbericht, Ferienwohnungen, Veranstaltungsraum |
| `/ueberuns` | `src/app/ueberuns/page.tsx` | CSR (`'use client'`) | Hardcoded: Historie, Entwicklung, Organe (board members), Satzung download |

**Root layout:** `src/app/layout.tsx` — Server Component; wraps all routes with Geist fonts and `globals.css`.

## Component Inventory

| Component | File | Type | Used By |
|-----------|------|------|---------|
| `Nav` | `src/components/nav.tsx` | Client | All 5 page files |
| `Footer` | `src/components/footer.tsx` | Client | All 5 page files |
| `ContactStrip` | `src/components/contact-strip.tsx` | Client | `src/app/page.tsx` (homepage only) |
| `ServiceTile` | `src/components/service-tile.tsx` | Client | `src/app/page.tsx` (service dock section) |
| `Icon` | `src/components/icons.tsx` | Client | `src/components/nav.tsx`, `src/components/contact-strip.tsx`, `src/app/page.tsx` |

**Icon exports:** `Icon.arrow`, `Icon.search`, `Icon.close`, `Icon.burger`, `Icon.phone`, `Icon.mail`, `Icon.clock`, `Icon.wrench`, `Icon.community`, `Icon.doc`, `Icon.leaf`, `Icon.home`, `Icon.pin`

## Data Layer

**`src/lib/data.ts`:**

- Exports: `FEWOG_DATA` (const), `Property` (interface), `District` (interface), `FewogData` (interface)
- All data is hardcoded at compile time — no runtime fetching
- `FEWOG_DATA.meta`: `{ founded: 1949, units: 612, members: 1480, properties: 50, city: "Fellbach" }`
- `FEWOG_DATA.districts`: 3 entries (kern, schmiden, oeffingen) with SVG path data for a stylized map
- `FEWOG_DATA.properties`: 50 entries; each has `id`, `district`, `street`, `year`, `units`, `rooms`, `sanierung`, `imageUrl`, `pos` (optional SVG coordinates)
- Property images link directly to `fewog.de` CDN (`https://www.fewog.de/fileadmin/_processed_/...`)
- `src/types/` directory exists but contains no files

## Naming Conventions

**Files:**
- Pages: `page.tsx` (Next.js App Router convention)
- Components: `kebab-case.tsx` (e.g., `contact-strip.tsx`, `service-tile.tsx`)
- Data/lib: `kebab-case.ts` (e.g., `data.ts`)

**Directories:**
- Route segments: lowercase German slugs (e.g., `wohnen`, `ueberuns`, `aktuelles`, `service`)
- Component directory: `components/` (flat, no subdirectories)

**Exports:**
- Components: Named exports with PascalCase (`export function Nav`, `export function Footer`)
- Data: Named constant export (`export const FEWOG_DATA`)
- Interfaces: Named TypeScript interfaces (`export interface Property`)

## Where to Add New Code

**New page/route:**
- Create `src/app/<route-slug>/page.tsx`
- Follow pattern: `'use client'` directive, import `Nav` and `Footer`, local `useState('route-key')`
- Note: Once the shared layout anti-pattern is resolved, omit Nav/Footer and use the shared layout instead

**New shared UI component:**
- Add to `src/components/<name>.tsx` as a named export
- Add `'use client'` if it uses hooks or browser APIs

**New icon:**
- Add to the `Icon` object in `src/components/icons.tsx`

**New data type or content:**
- Add interface to `src/lib/data.ts`
- Add data to `FEWOG_DATA` constant
- When Sanity is integrated, this file will be replaced by CMS-fetched data using `defineLive`

**Static assets:**
- Place in `public/` — accessible at `/<filename>`

**Path alias:**
- Use `@/` prefix for all `src/` imports (e.g., `import { Nav } from '@/components/nav'`)

## Special Directories

**`public/`:**
- Purpose: Static file serving — accessible directly at root URL path
- Generated: No
- Committed: Yes
- Current contents: Only default Next.js placeholder SVGs; no FEWOG-specific assets yet

**`src/types/`:**
- Purpose: Intended for shared TypeScript type definitions
- Generated: No
- Committed: Yes (empty)
- Note: Currently unused; types are co-located in `src/lib/data.ts`

**`.next/`:**
- Purpose: Next.js build output and dev cache
- Generated: Yes
- Committed: No (in `.gitignore`)

---

*Structure analysis: 2026-05-18*
