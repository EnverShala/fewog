# Technology Stack

**Analysis Date:** 2026-05-21

## Languages

**Primary:**
- TypeScript 5.x — all source files in `fewog-app/src/` (`.ts` / `.tsx`)

**Secondary:**
- CSS — global design tokens and component styles in `fewog-app/src/app/globals.css`
- CommonJS (`.cjs`) — one webpack loader shim at `fewog-app/src/lib/use-effect-event-loader.cjs`

## Runtime

**Environment:**
- Node.js v26.1.0 (current dev environment; no `.nvmrc` / `.node-version` — version not pinned in repo)

**Package Manager:**
- npm
- Lockfile: `fewog-app/package-lock.json` (lockfileVersion 3) — present and committed

## Frameworks

**Core:**
- Next.js **15.5.18** (exact pin, App Router) — `fewog-app/next.config.ts`
  - **CRITICAL: DO NOT upgrade to Next.js 16.** `SanityLive` / `defineLive` is incompatible with Next.js 16 (4–10x API request spike). See `CLAUDE.md`.
- React 19.2.4 (exact pin) — `fewog-app/package.json`

**Styling:**
- Tailwind CSS `^4` (v4, CSS-first config — no `tailwind.config.*` file)
- `@tailwindcss/postcss` `^4` — PostCSS integration via `fewog-app/postcss.config.mjs`
- Global CSS entry: `fewog-app/src/app/globals.css` — imports Tailwind, defines FEWOG design tokens as CSS custom properties (`--c-primary`, `--c-secondary`, etc.), bridges tokens into Tailwind via `@theme inline`

**Animation:**
- framer-motion `^12.39.0` — used for swipe/slide animations on property panels

**Testing:**
- Not configured (no jest, vitest, or playwright config found)

**Build/Dev:**
- ESLint `^9` (flat config) — `fewog-app/eslint.config.mjs`, extends `next/core-web-vitals` and `next/typescript`
- No Prettier or Biome config present

## Key Dependencies

**Critical — CMS Integration:**
- `sanity` `^5.25.0` — Sanity Studio v3 runtime + GROQ client
- `next-sanity` `^11.6.13` — Next.js/Sanity toolkit: `defineLive`, `SanityLive`, `NextStudio` embed, `createClient`
  - **Pin at v11.x.** v12 not yet stable for production (May 2026).
- `@sanity/image-url` `^2.1.1` — Sanity CDN image URL builder (`urlFor()` in `fewog-app/src/sanity/image.ts`)
- `@portabletext/react` `^6.2.0` — Renders Sanity Portable Text / rich text blocks

**Sanity Studio Plugins:**
- `sanity-plugin-media` `^4.3.0` — Media browser / asset management UI in Studio
- `@sanity/locale-de-de` `^1.1.31` — German locale for Sanity Studio UI (`deDELocale()`)
- `@sanity/vision` `^5.26.0` — GROQ query explorer (enabled in dev only)

**Infrastructure:**
- `typescript` `^5` — Static typing, strict mode
- `@types/node` `^20`, `@types/react` `^19`, `@types/react-dom` `^19` — Type definitions
- `eslint-config-next` `15.5.18` — Next.js ESLint ruleset (pinned to match Next.js version)

## TypeScript Configuration

**File:** `fewog-app/tsconfig.json`

- `"target": "ES2017"`
- `"strict": true` — strict mode enabled
- `"moduleResolution": "bundler"` — Next.js 15 bundler resolution
- `"jsx": "preserve"` — Next.js handles JSX transform
- Path alias: `@/*` → `./src/*`
- `"incremental": true` — faster subsequent builds

## Webpack Shim (Known Compatibility Fix)

**File:** `fewog-app/src/lib/use-effect-event-loader.cjs`
**Registered in:** `fewog-app/next.config.ts` (webpack rules)

Next.js 15.5.x ships React 19.2.0-canary which omits `useEffectEvent`. Sanity 5.x requires it. The shim polyfills `useEffectEvent` in both the Next.js compiled React bundle and the real `node_modules/react` ESM chunks. **Do not remove this shim** until the underlying React/Next.js version issue is resolved.

## Build Commands

```bash
npm run dev      # next dev — development server
npm run build    # next build — production build
npm run start    # next start — production server
npm run lint     # eslint
```
(All commands run from `fewog-app/` directory)

## Configuration Files

| File | Purpose |
|------|---------|
| `fewog-app/next.config.ts` | Next.js config: image CDN allowlist, security headers, Sanity transpilePackages, webpack shim |
| `fewog-app/sanity.config.ts` | Sanity Studio config: project ID, dataset, plugins, schema registry, Studio structure |
| `fewog-app/tsconfig.json` | TypeScript compiler options |
| `fewog-app/postcss.config.mjs` | PostCSS: Tailwind v4 plugin |
| `fewog-app/eslint.config.mjs` | ESLint flat config extending Next.js rules |
| `fewog-app/.env.example` | Template for required environment variables |
| `fewog-app/public/robots.txt` | Crawler rules: allow all except `/studio/` |

## Security Headers

Defined in `fewog-app/next.config.ts`, applied to all routes **except** `/studio` (Studio requires iframes for preview):

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `X-DNS-Prefetch-Control` | `on` |

## Platform Requirements

**Development:**
- Node.js (v20+ recommended; v26.1.0 confirmed working)
- npm
- Environment variables in `fewog-app/.env.local` (see INTEGRATIONS.md)

**Production:**
- Vercel (Free Tier) — target deployment platform
- Environment variables set in Vercel dashboard

---

*Stack analysis: 2026-05-21*
