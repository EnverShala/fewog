<!-- GSD:project-start source:PROJECT.md -->
## Project

**FEWOG Fellbach — Website**

Corporate website for die Fellbacher Wohnungsbau-Genossenschaft eG (FEWOG), eine 1949 gegründete Wohnungsgenossenschaft mit 612 Wohnungen, 1.480 Mitgliedern und 27 Liegenschaften in den Fellbacher Stadtteilen Kern, Schmiden und Oeffingen. Die Website richtet sich an Mitglieder, Mieter, Wohnungssuchende und die allgemeine Öffentlichkeit.

**Core Value:** Mitglieder und Interessenten können das gesamte Wohnungsangebot der Genossenschaft einfach einsehen — und der Genossenschaftsvorstand kann alle Inhalte selbstständig und ohne Programmierkenntnisse pflegen.

### Constraints

- **CMS-Einfachheit**: Das CMS muss visuell und selbsterklärend sein — Hauptanforderung des Kunden
- **Budget**: Keine teuren Saas-Pläne; Sanity Free Tier (bis 3 User, 10 GB) ist ausreichend
- **Tech-Stack**: React/Next.js bleibt — Prototyp-Investment schützen
- **Hosting**: Vercel Free Tier als Start; bei Traffic-Bedarf upgraden
- **Barrierefreiheit**: Grundlegende WCAG 2.1 AA (öffentliche Institution)
- **DSGVO**: Keine Analytics ohne Einwilligung; Datenschutz-Seite Pflicht
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## 1. Core Packages and Versions
| Package | Version | Purpose | Source |
|---------|---------|---------|--------|
| `next` | **15.x** (stay on 15, NOT 16) | Frontend framework | Official; see Next.js 16 warning below |
| `sanity` | **5.x** | Sanity SDK + Studio runtime | Official Sanity docs |
| `next-sanity` | **11.x** (v12 not yet stable for production) | All-in-one toolkit: fetch, live preview, Studio embed | GitHub releases, May 2026 |
| `@sanity/image-url` | **2.x** | Sanity CDN image URL builder | Official docs |
| `@portabletext/react` | **6.x** | Render Sanity rich text / Portable Text | Official docs |
| `@sanity/locale-de-de` | latest | German UI locale for Sanity Studio | npmjs.com |
| `sanity-plugin-media` | latest | Media browser / asset management UI in Studio | sanity-io/sanity-plugin-media |
| `typescript` | 5.x | Type safety | Next.js default |
| `tailwindcss` | 3.x or 4.x | Utility CSS (if switching from prototype CSS vars) | — |
### Critical Version Warning: Next.js 15, NOT 16
## 2. Next.js App Router + Sanity v3 Integration
### The canonical integration architecture
### File structure
### Key setup files
### ISR vs SSR vs defineLive — when to use what
| Approach | Use case for FEWOG | Setup |
|----------|-------------------|-------|
| `defineLive` + `<SanityLive />` | Default for all content pages (news, Liegenschaften, team) | Already shown above |
| Manual ISR with `revalidateTag` | Not needed; defineLive handles it automatically | Skip |
| SSR (no-cache) | Only for truly dynamic user-specific data; not applicable here | N/A |
| Static with `stega: false` | `generateStaticParams` and metadata — prevent invisible stega chars in meta tags | Use `stega: false` option on those calls |
## 3. Sanity Studio Configuration for Non-Technical German-Speaking Users
### German locale
### Simplification principles for non-technical users
## 4. Schema Design for FEWOG Content Types
### 4a. Liegenschaft (Property / Real Estate Object)
### 4b. Neuigkeit / News (Blog Post)
### 4c. Teammitglied
### 4d. Dokument (Downloadable File)
### 4e. Seiteneinstellungen / Kontakt (Settings Singleton)
### Schema registry
## 5. Image Handling: next/image + Sanity
### Setup
### Usage with next/image
### Hotspot cropping
### Image CDN transforms (via @sanity/image-url)
## 6. Deployment: Vercel + Embedded Sanity Studio
### Architecture decision: embedded studio (recommended)
- Single repo, single Vercel deploy
- Shared environment variables — no duplication
- CORS is simpler (same origin)
- Client staff access Studio via `https://fewog.de/studio` — no separate URL to remember
### Vercel environment variables required
- `defineLive` / `SanityLive` to receive real-time updates
- Draft Mode / Visual Editing to read unpublished content
- Must be a Viewer-level token (or Editor if editors need live preview of their own drafts)
### Git-based auto-deployment
### CORS configuration (one-time setup)
### Vercel official Sanity integration (optional enhancement)
## 7. TypeScript Setup
### tsconfig.json recommendations
### Sanity TypeGen workflow
## 8. Sanity Free Tier Limits (Verified May 2026)
| Limit | Free Tier (2026) | FEWOG Needs | Assessment |
|-------|-----------------|-------------|------------|
| Users / Seats | **20** | 2–3 (Geschäftsstelle staff) | Comfortably within limits |
| Documents | **10,000** | ~50–100 (21 Liegenschaften + news + team) | Far under limit |
| Assets storage | **100 GB** | ~1–2 GB (property photos) | No concern |
| Bandwidth | **100 GB/month** | Low-traffic community site, ~1–5 GB/month | No concern |
| API CDN requests | **1M/month** | Plenty for small housing coop site | No concern |
| API requests | **250K/month** | Fine with defineLive + SanityLive | Monitor after launch |
| Datasets | **2** (public only) | 1 (production) | Sufficient; note: no private datasets |
| Draft history | **3 days** | Acceptable for v1 | Growth plan if needed later |
| Roles | Admin + Viewer only | Editors need Admin role | Acceptable for small team |
| Scheduled publishing | Not available | Nice-to-have, not required | Growth plan if needed |
## 9. Installation Commands
# Create Next.js project
# Sanity + Next.js toolkit
# Image handling
# Rich text rendering
# German locale
# Media browser plugin
# Dev tooling (in the sanity CLI)
## 10. Alternatives Considered and Rejected
| Category | Recommended | Alternative | Reason Rejected |
|----------|-------------|-------------|-----------------|
| Next.js version | 15.x | 16.x | SanityLive incompatibility, 4–10x API spike |
| next-sanity version | 11.x | 12.x | Not stable for new projects yet (May 2026) |
| Data fetching | `defineLive` | Manual ISR + webhooks | More setup, no advantage; defineLive is current best practice |
| Studio deployment | Embedded in Next.js | Separate `sanity.studio` subdomain | More complex, split env vars, CORS overhead |
| Image rendering | `next-sanity/image` loader | `remotePatterns` + standard next/image | Requires manual next.config.js setup; loader approach is simpler |
| Schema locale | German field titles | English field titles | Client staff are German-speaking non-techies; German UX is non-negotiable |
## Sources
- [Next.js 16 and SanityLive: avoiding request overages](https://www.sanity.io/docs/help/nextjs-16-sanitylive-status) — CRITICAL version warning
- [Visual Editing with Next.js App Router — official Sanity docs](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router) — Integration patterns
- [Embedding Sanity Studio in Next.js](https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs) — Studio route setup
- [next-sanity GitHub](https://github.com/sanity-io/next-sanity) — Package version verification (v11/v12 status)
- [Caching and revalidation in Next.js — Sanity Docs](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs) — defineLive vs ISR
- [Sanity Pricing — official pricing page](https://www.sanity.io/pricing) — Free tier limits verified
- [Sanity TypeGen docs](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen) — TypeGen workflow
- [Localizing Sanity Studio](https://www.sanity.io/docs/studio/localizing-studio-ui) — German locale
- [@sanity/locale-de-de on npm](https://www.npmjs.com/package/@sanity/locale-de-de) — Package name and install
- [Field Groups — Sanity Docs](https://www.sanity.io/docs/studio/field-groups) — Studio UX simplification
- [sanity-plugin-media](https://www.sanity.io/plugins/sanity-plugin-media) — Asset management plugin
- [next-sanity image component docs](https://www.sanity.io/docs/nextjs/next-sanity-image-component) — Image integration
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
