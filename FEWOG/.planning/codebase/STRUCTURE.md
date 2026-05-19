# Codebase Structure

**Analysis Date:** 2026-05-19

## Directory Layout

```
FEWOG/                              # Repo root
├── CLAUDE.md                       # Project instructions and tech stack spec
├── Design/                         # Original prototype files (not deployed)
│   ├── FEWOG Fellbach.html         # Static HTML prototype
│   ├── components.jsx              # Prototype React components
│   ├── data.js                     # Prototype data (superseded by lib/data.ts)
│   ├── styles.css                  # Prototype styles
│   ├── tweaks-panel.jsx            # Prototype tweaks UI
│   ├── views.jsx                   # Prototype page views
│   └── uploads/                    # Design asset uploads
├── fewog-app/                      # Next.js application (the production codebase)
│   ├── CLAUDE.md                   # Points to AGENTS.md
│   ├── AGENTS.md                   # Warning about Next.js version differences
│   ├── next.config.ts              # Minimal Next.js config (empty options)
│   ├── next-env.d.ts               # Next.js TypeScript declarations
│   ├── tsconfig.json               # TypeScript config; path alias @/* → src/*
│   ├── eslint.config.mjs           # ESLint config
│   ├── postcss.config.mjs          # PostCSS config for Tailwind 4
│   ├── package.json                # Dependencies
│   ├── public/                     # Static assets (only default Next.js SVGs)
│   └── src/
│       ├── app/                    # Next.js App Router pages and layouts
│       │   ├── layout.tsx          # Root layout — fonts, global CSS, HTML shell
│       │   ├── globals.css         # All CSS: design system + component styles + responsive
│       │   ├── favicon.ico         # Favicon
│       │   ├── page.tsx            # / — Home page
│       │   ├── wohnen/
│       │   │   └── page.tsx        # /wohnen — Property list A-Z + detail panel
│       │   ├── service/
│       │   │   ├── page.tsx        # /service — Service offerings
│       │   │   ├── mietermagazin-archiv/
│       │   │   │   └── page.tsx    # /service/mietermagazin-archiv — PDF archive
│       │   │   └── geschaeftsbericht-archiv/
│       │   │       └── page.tsx    # /service/geschaeftsbericht-archiv — PDF archive
│       │   ├── ueberuns/
│       │   │   └── page.tsx        # /ueberuns — About: history, governance
│       │   ├── aktuelles/
│       │   │   └── page.tsx        # /aktuelles — News and notices
│       │   ├── impressum/
│       │   │   └── page.tsx        # /impressum — Legal imprint
│       │   └── datenschutz/
│       │       └── page.tsx        # /datenschutz — Privacy policy
│       ├── components/             # Shared React components
│       │   ├── nav.tsx             # Top navigation bar
│       │   ├── footer.tsx          # Site footer
│       │   ├── contact-strip.tsx   # 3-column contact info strip
│       │   ├── service-tile.tsx    # Clickable service card
│       │   └── icons.tsx           # Named inline SVG icon collection
│       ├── lib/                    # Shared utilities and data
│       │   └── data.ts             # FEWOG_DATA constant + TypeScript interfaces
│       └── types/                  # (directory exists, currently empty)
└── .planning/                      # GSD planning artifacts
    ├── codebase/                   # Codebase map documents
    └── quick/                      # Quick task planning artifacts
```

## Directory Purposes

**`fewog-app/src/app/`:**
- Purpose: All Next.js App Router routes. Each subdirectory = one URL segment.
- Contains: One `page.tsx` per route, shared `layout.tsx`, single `globals.css`
- Key files: `layout.tsx` (root shell), `page.tsx` (home), `wohnen/page.tsx` (most complex page)

**`fewog-app/src/components/`:**
- Purpose: Reusable UI components shared across two or more pages
- Contains: Five components — Nav, Footer, ContactStrip, ServiceTile, Icon
- Key files: `nav.tsx` (global navigation), `icons.tsx` (all SVG icons)

**`fewog-app/src/lib/`:**
- Purpose: Shared non-UI code: data, utilities, API clients
- Contains: Currently only `data.ts` (the full property dataset)
- Key files: `data.ts` — exports `FEWOG_DATA` and TypeScript interfaces

**`fewog-app/src/types/`:**
- Purpose: Shared TypeScript type definitions
- Contains: Empty. Types currently live co-located in `lib/data.ts`
- Generated: No
- Committed: Yes (empty directory)

**`Design/`:**
- Purpose: Original static prototype built before the Next.js app. Reference only.
- Contains: HTML, JSX, CSS prototype files
- Generated: No
- Committed: Yes
- Note: Not part of the deployed application. `data.js` here was superseded by `src/lib/data.ts`.

**`fewog-app/public/`:**
- Purpose: Static files served at `/` — only default Next.js scaffold SVGs remain
- Contains: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
- Note: No FEWOG-specific public assets. Logo loaded from `https://www.fewog.de/fileadmin/pics/logo_fewog.png` in `nav.tsx`.

## Key File Locations

**Entry Points:**
- `fewog-app/src/app/layout.tsx`: Root HTML shell, fonts, global CSS import
- `fewog-app/src/app/page.tsx`: Home page `/`

**Configuration:**
- `fewog-app/next.config.ts`: Next.js config (currently empty — no customizations)
- `fewog-app/tsconfig.json`: TypeScript config; defines `@/*` path alias to `src/`
- `fewog-app/postcss.config.mjs`: PostCSS for Tailwind 4
- `fewog-app/package.json`: All dependencies including pre-installed Sanity packages

**Core Logic:**
- `fewog-app/src/lib/data.ts`: All property data and TypeScript interfaces
- `fewog-app/src/app/globals.css`: Entire design system (CSS custom properties, typography, layout, components, responsive breakpoints)

**Shared UI:**
- `fewog-app/src/components/nav.tsx`: Navigation — used by every page
- `fewog-app/src/components/footer.tsx`: Footer — used by every page
- `fewog-app/src/components/icons.tsx`: All icons used across the app

**Testing:**
- Not applicable — no test files exist.

## App Router Structure

All routes map directly to `fewog-app/src/app/` subdirectories:

| URL | File | Type |
|-----|------|------|
| `/` | `src/app/page.tsx` | Client component |
| `/wohnen` | `src/app/wohnen/page.tsx` | Client component |
| `/service` | `src/app/service/page.tsx` | Client component |
| `/service/mietermagazin-archiv` | `src/app/service/mietermagazin-archiv/page.tsx` | Client component |
| `/service/geschaeftsbericht-archiv` | `src/app/service/geschaeftsbericht-archiv/page.tsx` | Client component |
| `/ueberuns` | `src/app/ueberuns/page.tsx` | Client component |
| `/aktuelles` | `src/app/aktuelles/page.tsx` | Client component |
| `/impressum` | `src/app/impressum/page.tsx` | Client component |
| `/datenschutz` | `src/app/datenschutz/page.tsx` | Client component |

No route groups, no parallel routes, no intercepting routes, no `(group)` segments, no dynamic `[slug]` segments exist yet.

## Naming Conventions

**Files:**
- Page files: always `page.tsx` (Next.js App Router convention)
- Component files: kebab-case, e.g., `contact-strip.tsx`, `service-tile.tsx`
- Data/lib files: kebab-case, e.g., `data.ts`
- CSS: single `globals.css` at app root — no CSS modules or component-scoped CSS

**Components:**
- Named exports using PascalCase: `export function Nav(...)`, `export function Footer(...)`
- Default exports for pages: `export default function WohnenPage()`
- Page component names follow pattern: `[Route]Page` (e.g., `WohnenPage`, `ServicePage`, `UeberUnsPage`)

**Data constants:**
- SCREAMING_SNAKE_CASE for module-level data: `FEWOG_DATA`, `NAV_LINKS`, `ARCHIV`, `EASE`, `DUR`

**CSS classes:**
- BEM-adjacent kebab-case class names: `.bestand-row`, `.bestand-list-col`, `.contact-strip`, `.service-tile`
- Modifier pattern: `.btn-primary`, `.btn-ghost`, `.page-head-simple`, `.nav-link.active`
- No CSS modules — all classes live in `globals.css`

**TypeScript interfaces:**
- PascalCase: `Property`, `District`, `FewogData`, `NavProps`, `ServiceTileProps`

## Where to Add New Code

**New top-level page (e.g., /mitgliedschaft):**
- Create: `fewog-app/src/app/mitgliedschaft/page.tsx`
- Add `'use client'` at top, import `Nav` and `Footer` from `@/components/`
- Add nav entry to `NAV_LINKS` array in `fewog-app/src/components/nav.tsx`
- Add route handler to the `go()` function in `fewog-app/src/components/nav.tsx`

**New nested page (e.g., /service/neues-feature):**
- Create: `fewog-app/src/app/service/neues-feature/page.tsx`
- Link from parent page `fewog-app/src/app/service/page.tsx` using `<a href="/service/neues-feature">`

**New shared component:**
- Create: `fewog-app/src/components/[component-name].tsx` (kebab-case)
- Use named export: `export function ComponentName(...)`
- Add CSS for the component directly to `fewog-app/src/app/globals.css`

**New icon:**
- Add to the `Icon` object in `fewog-app/src/components/icons.tsx`
- Pattern: `iconName: () => (<svg .../>)`

**New data types / interfaces:**
- If specific to a page: define in that page file (current pattern for archive data)
- If shared: add to `fewog-app/src/lib/data.ts` or create `fewog-app/src/types/[name].ts`

**Sanity schema (when CMS integration begins):**
- Create: `fewog-app/src/sanity/schemas/[schema-name].ts` (directory does not exist yet — create it)
- Wire up: `fewog-app/sanity.config.ts` (does not exist yet — create at app root)
- Studio route: `fewog-app/src/app/studio/[[...tool]]/page.tsx` (does not exist yet)

**New CSS utilities or component styles:**
- Add to `fewog-app/src/app/globals.css`
- Follow existing naming: kebab-case class names, group related rules with a comment header
- Responsive rules go in the existing `@media (max-width: 768px)` and `@media (max-width: 960px)` blocks at the bottom of the file

## Special Directories

**`.planning/`:**
- Purpose: GSD workflow planning artifacts (codebase maps, phase plans, quick tasks)
- Generated: By GSD commands
- Committed: Yes

**`fewog-app/.next/`:**
- Purpose: Next.js build output and development cache
- Generated: Yes (by `next build` / `next dev`)
- Committed: No (in .gitignore)

**`Design/`:**
- Purpose: Original static prototype for reference — not part of the deployed app
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-05-19*
