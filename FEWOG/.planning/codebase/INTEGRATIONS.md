# External Integrations

**Analysis Date:** 2026-05-18

## CMS / Content

**Sanity v3 — Planned, Not Yet Configured**

- `sanity` 5.25.0 and `next-sanity` 11.6.13 are installed in `fewog-app/package.json`
- `@sanity/locale-de-de` 1.1.31 is installed (German Studio UI locale)
- `@sanity/image-url` 2.1.1 and `@portabletext/react` 6.2.0 are installed
- No `sanity.config.ts`, `sanity.cli.ts`, or `schemaTypes/` directory exists in `fewog-app/`
- No embedded Studio route (`src/app/studio/`) exists
- No Sanity environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`) are referenced anywhere in source files
- No `defineLive` / `SanityLive` usage found in any source file
- All current content is **hardcoded** in `src/lib/data.ts` (50 properties, 3 districts, org metadata) and in static JSX in route pages

**Current content sources:**
- Property data: `src/lib/data.ts` — `FEWOG_DATA` constant with typed interfaces
- News/Aktuelles: static HTML in `src/app/aktuelles/page.tsx`
- Über Uns: static HTML in `src/app/ueberuns/page.tsx`
- Service: static HTML in `src/app/service/page.tsx`
- Images: hotlinked from `fewog.de` CDN (`https://www.fewog.de/fileadmin/_processed_/...`) and Unsplash (`https://images.unsplash.com/...`)

## Authentication

**Status: None**

- No authentication library installed or referenced
- No protected routes, session management, or user login flow
- Sanity Studio (when added) will use Sanity's built-in auth via sanity.io accounts

## Analytics / Monitoring

**Status: None**

- No analytics package installed (no Google Analytics, Plausible, Fathom, etc.)
- No error tracking (no Sentry, Datadog, etc.)
- No `<Script>` tags or third-party tracking snippets found in `src/app/layout.tsx`
- CLAUDE.md constraint: "Keine Analytics ohne Einwilligung" — any future analytics requires a cookie consent mechanism

## Deployment / Hosting

**Status: Not yet deployed (prototype only)**

- Target platform: **Vercel** (Free Tier) per CLAUDE.md
- No `vercel.json` configuration file found in the repo
- No CI/CD pipeline configured (no GitHub Actions workflows found)
- No custom domain configuration present
- Vercel Git-based auto-deployment is the intended workflow once connected

**Required environment variables for production (not yet set):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` (Viewer-level token for `defineLive` / SanityLive)

## Third-party APIs

**Unsplash (image hotlinking)**
- One Unsplash image hotlinked in `src/app/page.tsx`: hero section (`images.unsplash.com`)
- Not an API integration — direct `<img>` src URL, no API key, not going through `next/image`

**fewog.de CDN (legacy image hotlinking)**
- Property images in `src/lib/data.ts` are hotlinked from the live fewog.de site (`www.fewog.de/fileadmin/_processed_/...`)
- Many entries use a placeholder image (`csm_dummy_c2f4919c03.jpg`)
- This is a prototype dependency on the existing site's CDN — not a formal integration

**External PDF links**
- `src/app/service/page.tsx` and `src/app/ueberuns/page.tsx` link directly to PDFs hosted on `www.fewog.de/fileadmin/PDF/...`
- These are `<a href>` links to the legacy site, not API calls

**METRONA / Brunata**
- `src/app/aktuelles/page.tsx` links to `nutzerportal.brunata-muenchen.de` (third-party tenant utility portal)
- External link only — no API integration

**ImmobilienScout24**
- `src/app/aktuelles/page.tsx` links to `immoscout.de` for overflow housing listings
- External link only

## Integration Gaps (planned but not yet implemented)

Based on CLAUDE.md and installed-but-unconfigured packages:

1. **Sanity Studio setup** — `sanity.config.ts`, schema types for Liegenschaft / Neuigkeit / Teammitglied / Dokument / Seiteneinstellungen, embedded `/studio` route
2. **Sanity content fetching** — Replace `src/lib/data.ts` hardcoded data and static page content with `defineLive` queries + `<SanityLive />`
3. **Sanity image handling** — Replace hotlinked fewog.de and Unsplash images with `next-sanity/image` loader pointing to Sanity CDN
4. **sanity-plugin-media** — Media browser plugin not yet installed; needed for non-technical content editors
5. **DSGVO / Datenschutz page** — Required by CLAUDE.md; not yet created (`/datenschutz` route missing)
6. **Impressum page** — Standard German legal requirement; not yet created
7. **Damage report form (Mängelmelder)** — Referenced in homepage service tile and `aktuelles` page; no form implementation exists
8. **Sanity CORS configuration** — Must add `https://fewog.de` and local dev origins to Sanity project CORS settings before Studio is usable
9. **Vercel integration** — Production deployment not yet connected; Vercel official Sanity integration (optional) not configured

---

*Integration audit: 2026-05-18*
