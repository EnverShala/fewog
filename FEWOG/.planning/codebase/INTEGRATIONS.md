# External Integrations

**Analysis Date:** 2026-05-21

## APIs & External Services

### Sanity CMS (Active — Fully Configured)

The CMS integration is complete and live.

- **SDK:** `sanity` `^5.25.0` + `next-sanity` `^11.6.13`
- **Project ID:** `uat139ly` (hardcoded in `fewog-app/sanity.config.ts`)
- **Dataset:** `production`
- **API Version:** `2024-01-01` (set in `fewog-app/src/sanity/env.ts`)
- **Auth:** `SANITY_API_READ_TOKEN` env var — Viewer-level token used by `defineLive`

**Client setup:** `fewog-app/src/sanity/client.ts`
```typescript
createClient({ projectId, dataset, apiVersion, useCdn: true, stega: false })
```
`stega` is disabled globally to prevent invisible encoding characters appearing in `<meta>` tags and static content.

**Live content:** `fewog-app/src/sanity/live.ts`
```typescript
export const { sanityFetch, SanityLive } = defineLive({ client, serverToken: token, browserToken: token })
```
`sanityFetch` is used in every page Server Component. `<SanityLive />` is rendered alongside page content to enable real-time updates without page reload.

**Studio embed:** `fewog-app/src/app/studio/[[...tool]]/page.tsx`
- Renders `<NextStudio config={config} />` — full Studio UI at `/studio`
- Studio layout at `fewog-app/src/app/studio/layout.tsx` sets `robots: noindex`
- Security headers are excluded from `/studio` route (Studio requires iframes for live preview)

**Studio configuration:** `fewog-app/sanity.config.ts`
- German locale via `deDELocale()` — all Studio UI in German
- Media browser plugin (`media()`) — asset management
- Vision tool (`visionTool()`) — GROQ explorer, development only (`NODE_ENV !== 'production'`)
- Custom structure: German menu labels (Liegenschaften, Neuigkeiten, Dokumente, Seiteneinstellungen, Datenschutzerklärung, Impressum)

**Schema registry:** `fewog-app/src/sanity/schemaTypes/index.ts`

| Schema | Type | Document ID |
|--------|------|-------------|
| `liegenschaftSchema` | document | auto (multiple) |
| `neuigkeitSchema` | document | auto (multiple) |
| `dokumentSchema` | document | auto (multiple) |
| `einstellungenSchema` | singleton document | `seiteneinstellungen` |
| `datenschutzSchema` | singleton document | `datenschutzerklaerung` |
| `impressumSchema` | singleton document | `impressum` |

**GROQ queries:** All queries centralised in `fewog-app/src/sanity/queries.ts`
- `einstellungenQuery` — placeholder image for Liegenschaften
- `kontaktQuery` — contact details (address, phone, email, office hours)
- `organeQuery` — Vorstand and Aufsichtsrat members
- `startseiteQuery` — homepage hero (image, title, subtitle, lead, CTA, stats, service tiles)
- `serviceseiteQuery` — Mietertreff, Ferienwohnungen, Veranstaltungsraum content
- `ueberunsseiteQuery` — Historie and Entwicklung Portable Text
- `aktuellesInfoQuery` — info blocks on Aktuelles page
- `neuigkeitenQuery` / `neuigkeitBySlugQuery` — news list and detail
- `liegenschaftenQuery` — full property listing
- `aktuellMietermagazinQuery` / `aktuellGeschaeftsberichtQuery` — latest documents by category
- `dokumenteByKategorieQuery` — documents filtered by category
- `datenschutzQuery` / `impressumQuery` — legal page Portable Text

## Data Storage

**Sanity Cloud (managed):**
- All structured content stored in Sanity's hosted dataset `production`
- Connection: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- No local database (no PostgreSQL, SQLite, Prisma, etc.)

**File Storage:**
- PDF documents uploaded to Sanity assets (accessible via `datei.asset->url` in GROQ)
- Images stored on Sanity CDN — accessed via `cdn.sanity.io`
- Documents can also reference external URLs via `dateiUrl` field (fallback)

**Caching:**
- `defineLive` / `SanityLive` handles automatic cache invalidation on content publish
- No manual `revalidateTag` / ISR configuration needed
- `useCdn: true` on the client — Sanity CDN used for reads

## Image Handling

**Sanity Image CDN:** `cdn.sanity.io`
- Allowed via `remotePatterns` in `fewog-app/next.config.ts`
- URL builder: `fewog-app/src/sanity/image.ts` — `urlFor(source)` using `@sanity/image-url`
- Hotspot cropping enabled on all image fields (`options: { hotspot: true }`)

**Image fields in schemas:**
- `liegenschaft.titelbild` — property cover image + `galerie` array
- `einstellungen.platzhalterbild` — fallback when no property image uploaded
- `einstellungen.heroBild` — hero image for homepage (recently added)

**`next/image` usage:**
- `remotePatterns` configured for `cdn.sanity.io`
- Page components use `next/image` with Sanity CDN URLs from `urlFor()`

## Authentication & Identity

**Sanity Studio auth:**
- Handled by Sanity's built-in auth (sanity.io accounts)
- No custom auth layer — editors log in via `/studio` using their Sanity account
- Free tier allows up to 20 users

**Frontend auth:**
- None — website is fully public, no protected routes, no session management

## Fonts

**Google Fonts (via `next/font/google`):**
- Geist Sans — loaded in `fewog-app/src/app/layout.tsx`
- Geist Mono — loaded in `fewog-app/src/app/layout.tsx`
- Additional fonts (Fraunces, Montserrat) referenced in CSS custom properties in `globals.css` but not loaded via `next/font` — potential FOUC risk

## Monitoring & Observability

**Error Tracking:** None — no Sentry, Datadog, or similar installed

**Analytics:** None — no Google Analytics, Plausible, Fathom, etc.
- DSGVO constraint: "Keine Analytics ohne Einwilligung" — any future analytics requires a cookie consent mechanism first

**Logs:** Browser console / Vercel runtime logs only

## CI/CD & Deployment

**Hosting:**
- Target: Vercel Free Tier
- Intended: Git-based auto-deployment on push to main
- No `vercel.json` config file present
- No GitHub Actions workflows present

**CI Pipeline:** None configured

## Environment Variables

**Required (all must be set in `.env.local` for dev, Vercel dashboard for production):**

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public (browser + server) | Sanity project ID: `uat139ly` |
| `NEXT_PUBLIC_SANITY_DATASET` | Public (browser + server) | Sanity dataset: `production` |
| `SANITY_API_READ_TOKEN` | Server-only | Viewer-level token for `defineLive` / `SanityLive` real-time updates |

**Template:** `fewog-app/.env.example`
**Active local file:** `fewog-app/.env.local` (gitignored, never read or commit)

## Webhooks & Callbacks

**Incoming:** None — `defineLive` uses Sanity's EventSource / live content API directly; no webhook endpoint needed

**Outgoing:** None

## External Link Dependencies (non-API)

These are external links in page content, not API integrations:

- **Sanity CDN** (`cdn.sanity.io`) — all CMS images and file assets
- **Google Fonts** (`fonts.googleapis.com`) — Geist Sans/Mono via `next/font`
- **METRONA tenant portal** (`nutzerportal.brunata-muenchen.de`) — linked from Aktuelles/Service pages
- **ImmobilienScout24** (`immoscout.de`) — linked from Aktuelles page
- **Adobe Reader** (`get.adobe.com/de/reader/`) — PDF viewer instructions on Service page

## Sanity CORS Configuration

For the embedded Studio and `SanityLive` to work correctly:

- `http://localhost:3000` — must be in Sanity project CORS allowlist (development)
- `https://fewog.de` — must be in Sanity project CORS allowlist (production)
- Configure at: `manage.sanity.io` → Project `uat139ly` → API → CORS Origins

---

*Integration audit: 2026-05-21*
