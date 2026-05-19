# External Integrations

**Analysis Date:** 2026-05-19

## CMS / Content

**Sanity v3 — Installed but Not Yet Configured**

- `sanity` `^5.25.0` and `next-sanity` `^11.6.13` are in `fewog-app/package.json`
- `@sanity/locale-de-de` `^1.1.31` installed (German Studio UI locale)
- `@sanity/image-url` `^2.1.1` and `@portabletext/react` `^6.2.0` installed
- No `sanity.config.ts`, `sanity.cli.ts`, or `schemaTypes/` directory exists
- No embedded Studio route (`src/app/studio/`) exists
- No Sanity environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`) referenced in any source file
- No `defineLive` / `SanityLive` usage in any source file

**Current content sources (all static/hardcoded):**
- Property data: `fewog-app/src/lib/data.ts` — `FEWOG_DATA` constant (50 properties, 3 districts, org meta) with TypeScript interfaces
- News/Aktuelles: static JSX in `fewog-app/src/app/aktuelles/page.tsx`
- Über Uns: static JSX in `fewog-app/src/app/ueberuns/page.tsx`
- Service: static JSX in `fewog-app/src/app/service/page.tsx`

## Image Handling

**Current approach — hotlinked external images (prototype only):**
- Property images in `fewog-app/src/lib/data.ts`: hotlinked from `https://www.fewog.de/fileadmin/_processed_/...`
  - Many entries use a placeholder (`csm_dummy_c2f4919c03.jpg`)
- Hero image in `fewog-app/src/app/page.tsx`: hotlinked from `https://images.unsplash.com/...`
- All rendered via plain `<img>` tags — **`next/image` is not used anywhere**

**Planned approach (per CLAUDE.md):**
- `next-sanity/image` loader pointing to Sanity CDN (`cdn.sanity.io`)
- `@sanity/image-url` for CDN transform URLs
- Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` env vars

## Authentication

**Status: None**

- No authentication library installed
- No protected routes, session management, or login flow
- Sanity Studio (when embedded) will use Sanity's built-in auth via sanity.io accounts

## Analytics / Monitoring

**Status: None**

- No analytics package installed (no Google Analytics, Plausible, Fathom, etc.)
- No error tracking (no Sentry, Datadog, etc.)
- No `<Script>` tags or third-party tracking in `fewog-app/src/app/layout.tsx`
- CLAUDE.md constraint: "Keine Analytics ohne Einwilligung" — any future analytics requires a cookie consent mechanism first

## Deployment / Hosting

**Status: Not yet deployed (local prototype only)**

- Target platform: **Vercel** (Free Tier) per CLAUDE.md
- No `vercel.json` configuration file in the repo
- No CI/CD pipeline configured (no GitHub Actions workflows)
- No custom domain configuration
- Intended workflow: Vercel Git-based auto-deployment once connected

**Required environment variables for production (not yet set):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` — Viewer-level token for `defineLive` / `SanityLive`

## External Link Dependencies (not API integrations)

**fewog.de legacy site:**
- Property images hotlinked from `www.fewog.de/fileadmin/_processed_/...` (`fewog-app/src/lib/data.ts`)
- PDF documents linked from `www.fewog.de/fileadmin/PDF/...` in service and about pages

**Unsplash:**
- One hero image hotlinked (`images.unsplash.com`) in `fewog-app/src/app/page.tsx` — no API key

**Brunata / METRONA tenant portal:**
- External link to `nutzerportal.brunata-muenchen.de` in `fewog-app/src/app/aktuelles/page.tsx` — no API integration

**ImmobilienScout24:**
- External link to `immoscout.de` in `fewog-app/src/app/aktuelles/page.tsx` — no API integration

## Integration Gaps (planned but not yet implemented)

Based on CLAUDE.md and installed-but-unconfigured packages:

1. **Sanity project initialization** — `sanity.config.ts`, `sanity.cli.ts`, schema types for Liegenschaft / Neuigkeit / Teammitglied / Dokument / Seiteneinstellungen
2. **Embedded Studio route** — `fewog-app/src/app/studio/[[...tool]]/page.tsx`
3. **Sanity content fetching** — Replace `src/lib/data.ts` and static pages with `defineLive` queries + `<SanityLive />`
4. **Sanity image migration** — Replace hotlinked images with Sanity CDN via `next-sanity/image` loader
5. **`sanity-plugin-media`** — Media browser plugin not yet installed
6. **Sanity CORS configuration** — Must add `https://fewog.de` and `http://localhost:3000` to Sanity project CORS settings
7. **Damage report form (Mängelmelder)** — Referenced in homepage service tile; no form implementation exists
8. **Vercel connection** — Production deployment not yet configured

---

*Integration audit: 2026-05-19*
