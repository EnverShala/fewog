# Technology Stack

**Analysis Date:** 2026-05-19

## Runtime & Framework

- **Runtime:** Node.js (version not pinned; no `.nvmrc` or `.node-version` present)
- **Framework:** Next.js **15.5.18** (App Router) — `fewog-app/next.config.ts`
  - Config file is currently minimal (empty options object)
  - **Do NOT upgrade to Next.js 16** — `SanityLive` / `defineLive` is incompatible (4–10x API request spike per CLAUDE.md)
- **React:** 19.2.4

## Languages & Typing

- **TypeScript:** `^5` (devDependency) — strict mode enabled (`"strict": true` in `tsconfig.json`)
- **Target:** ES2017, module resolution `bundler`
- **Path alias:** `@/*` → `./src/*`
- **JSX:** `"jsx": "preserve"` — Next.js handles the JSX transform
- All source files in `src/` use `.tsx` / `.ts`

## Styling

- **Tailwind CSS:** `^4` (v4 — new CSS-first configuration, no `tailwind.config.*` file)
- **PostCSS integration:** `@tailwindcss/postcss` `^4` via `fewog-app/postcss.config.mjs`
- **Global CSS entry:** `fewog-app/src/app/globals.css`
  - Imports Tailwind with `@import "tailwindcss"`
  - Defines FEWOG design system via CSS custom properties (`--c-primary` #8B1D28, `--c-secondary` #4A5D4E, `--c-bg` #FDF8F7, etc.)
  - Typography scale: Fraunces (display serif), Montserrat/Inter (headings), Inter/Lato (body) — referenced in CSS vars
  - `@theme inline` block bridges CSS vars into Tailwind theme
  - Tailwind utility classes used in layout and pages alongside custom classes (`.btn`, `.hero`, `.wrap`, `.nav`, `.footer`)
- **Fonts:** Geist Sans and Geist Mono loaded via `next/font/google` in `fewog-app/src/app/layout.tsx`; Fraunces and Montserrat referenced in CSS vars but **not loaded via `next/font`** (FOUC risk)

## Build & Tooling

- **Package manager:** npm (`fewog-app/package.json`)
- **Linting:** ESLint `^9` — flat config (`fewog-app/eslint.config.mjs`), uses `FlatCompat` to extend `next/core-web-vitals` and `next/typescript`
- **No test runner configured** (no jest/vitest/playwright config files)
- **No Prettier or Biome config**

**Build commands** (from `fewog-app/package.json` scripts):
```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # eslint
```

## Key Dependencies

| Package | package.json version | Purpose |
|---------|---------------------|---------|
| `next` | `15.5.18` (exact) | App Router framework |
| `react` | `19.2.4` (exact) | UI library |
| `react-dom` | `19.2.4` (exact) | DOM renderer |
| `sanity` | `^5.25.0` | Sanity Studio v3 runtime + client |
| `next-sanity` | `^11.6.13` | Next.js/Sanity integration: `defineLive`, `SanityLive`, Studio embed |
| `@sanity/image-url` | `^2.1.1` | Sanity CDN image URL builder |
| `@portabletext/react` | `^6.2.0` | Render Portable Text (Sanity rich text) |
| `@sanity/locale-de-de` | `^1.1.31` | German UI locale for Sanity Studio |
| `framer-motion` | `^12.39.0` | Animation library — swipe panel, motion values |
| `tailwindcss` | `^4` | Utility-first CSS (v4) |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for Tailwind v4 |
| `typescript` | `^5` | Static typing |
| `eslint` | `^9` | Linting |
| `eslint-config-next` | `15.5.18` (exact) | Next.js ESLint ruleset |
| `@types/node` | `^20` | Node.js types |
| `@types/react` | `^19` | React types |
| `@types/react-dom` | `^19` | React DOM types |

## Source Structure

```
fewog-app/src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (fonts, body wrapper)
│   ├── page.tsx          # Homepage ('use client')
│   ├── globals.css       # Design system tokens + Tailwind import + global styles
│   ├── aktuelles/        # News/Aktuelles page
│   ├── datenschutz/      # DSGVO Datenschutzerklärung page
│   ├── impressum/        # Legal Impressum page
│   ├── service/          # Service page
│   ├── ueberuns/         # About/Über Uns page
│   └── wohnen/           # Property listing page (with detail slide-out panel)
├── components/           # Shared UI components
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── contact-strip.tsx
│   ├── service-tile.tsx
│   └── icons.tsx
├── lib/
│   └── data.ts           # Static FEWOG_DATA (50 properties, 3 districts, meta)
└── types/                # Present but empty
```

## Notable Absences (planned per CLAUDE.md, not yet installed/configured)

- `sanity-plugin-media` — not in `package.json`
- Sanity Studio route (`src/app/studio/`) — `next-sanity` installed but no studio route
- `sanity.config.ts`, `sanity.cli.ts`, `schemaTypes/` — Sanity SDK installed but project not initialized
- Sanity environment variable references — no `.env.local` or `NEXT_PUBLIC_SANITY_*` found in source
- `sanity-typegen` — TypeGen not set up

---

*Stack analysis: 2026-05-19*
