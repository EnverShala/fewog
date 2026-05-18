# Technology Stack

**Analysis Date:** 2026-05-18

## Runtime & Framework

- **Runtime:** Node.js (version not pinned; no `.nvmrc` or `.node-version` present)
- **Framework:** Next.js **16.2.6** (App Router) — `fewog-app/next.config.ts`
  - WARNING: CLAUDE.md specifies Next.js 15.x. Installed version is **16.2.6**, which conflicts with the documented SanityLive compatibility constraint. See CONCERNS.md when that doc is created.
- **React:** 19.2.4 (peer of Next.js 16)

## Languages & Typing

- **TypeScript:** 5.9.3 — strict mode enabled (`"strict": true` in `tsconfig.json`)
- **Target:** ES2017, module resolution `bundler`
- **Path alias:** `@/*` → `./src/*`
- **JSX transform:** `react-jsx` (no explicit React import needed)
- All source files in `src/` use `.tsx` / `.ts`

## Styling

- **Tailwind CSS:** 4.3.0 (v4 — new CSS-first configuration)
- **PostCSS integration:** `@tailwindcss/postcss` 4.3.0 via `postcss.config.mjs`
- **Global CSS entry:** `src/app/globals.css`
  - Imports Tailwind with `@import "tailwindcss"`
  - Defines FEWOG design system via CSS custom properties (`--c-primary`, `--c-secondary`, `--c-bg`, etc.)
  - Typography scale: Fraunces (display serif), Montserrat/Inter (headings), Inter/Lato (body)
  - Tailwind utility classes (`min-h-screen`, `flex`, `antialiased`, `flex-col`) used in layout and pages
  - Extensive custom class definitions (`.btn`, `.hero`, `.wrap`, `.nav`, `.footer`, etc.) written directly in globals.css rather than as Tailwind components
- **Fonts:** Google Fonts loaded via `next/font/google` — Geist (sans), Geist Mono; additional fonts (Fraunces, Montserrat, Inter) referenced in CSS variables but not loaded via `next/font`

## Build & Tooling

- **Package manager:** npm (lockfile: `package-lock.json` present)
- **Linting:** ESLint 9.39.4 — flat config (`eslint.config.mjs`), extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- **Build commands:**
  - `npm run dev` — `next dev`
  - `npm run build` — `next build`
  - `npm start` — `next start`
  - `npm run lint` — `eslint`
- **No test runner configured** (no jest/vitest/playwright config files found)
- **No Prettier or Biome config found**

## Key Dependencies

| Package | Resolved Version | Purpose |
|---------|-----------------|---------|
| `next` | 16.2.6 | App Router framework |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM renderer |
| `sanity` | 5.25.0 | Sanity Studio v3 runtime + client |
| `next-sanity` | 11.6.13 | Next.js/Sanity integration: `defineLive`, `SanityLive`, Studio embed |
| `@sanity/image-url` | 2.1.1 | Sanity CDN image URL builder |
| `@portabletext/react` | 6.2.0 | Render Portable Text (Sanity rich text) |
| `@sanity/locale-de-de` | 1.1.31 | German UI locale for Sanity Studio |
| `tailwindcss` | 4.3.0 | Utility-first CSS (v4) |
| `@tailwindcss/postcss` | 4.3.0 | PostCSS plugin for Tailwind v4 |
| `typescript` | 5.9.3 | Static typing |
| `eslint` | 9.39.4 | Linting |
| `eslint-config-next` | 16.2.6 | Next.js ESLint ruleset |
| `@types/node` | 20.x | Node.js types |
| `@types/react` | 19.x | React types |

## Notable Absences

Packages referenced in CLAUDE.md that are **NOT yet installed or configured**:

- `sanity-plugin-media` — media browser plugin mentioned in CLAUDE.md; not in `package.json`
- Sanity Studio route (`/studio`) — `next-sanity` is installed but no `src/app/studio/` route exists yet
- Sanity schema files — no `sanity.config.ts`, `schemaTypes/`, or `sanity.cli.ts` found; Sanity is installed but not yet configured
- `sanity-typegen` workflow — TypeGen not set up (no `sanity.config.ts` to generate from)
- Environment variables for Sanity — no `.env.local` or env var references found in source files
- `stega` configuration — not yet in use (no Visual Editing setup)
- No `sanity.config.ts` or `sanity.cli.ts` — Sanity SDK is installed as a dependency but the project is not yet a Sanity project
- Fonts Fraunces and Montserrat are referenced in CSS but not loaded through `next/font` (potential FOUC / layout shift risk)

---

*Stack analysis: 2026-05-18*
