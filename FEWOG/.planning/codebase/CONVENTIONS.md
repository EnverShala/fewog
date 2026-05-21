# Coding Conventions

**Analysis Date:** 2026-05-21

## Naming Patterns

**Files:**
- Page server components: `page.tsx` (Next.js App Router convention)
- Page client components: `[route-segment]-client.tsx` — e.g., `home-client.tsx`, `wohnen-client.tsx`, `datenschutz-client.tsx`
- Shared components: `kebab-case.tsx` — e.g., `contact-strip.tsx`, `service-tile.tsx`
- Sanity schema files: `[schemaname].ts` lowercased — e.g., `einstellungen.ts`, `liegenschaft.ts`
- Sanity utility files: flat short names — `client.ts`, `live.ts`, `env.ts`, `image.ts`, `queries.ts`

**Exported component functions:**
- Named exports (PascalCase) for shared components: `export function Nav(...)`, `export function Footer(...)`, `export function ContactStrip(...)`
- Default exports for page-level client components: `export default function HomeClient(...)`, `export default function WohnenClient(...)`
- Default exports (async) for server page components: `export default async function WohnenPage()`

**Variables and constants:**
- `SCREAMING_SNAKE_CASE` for module-level constants: `ICON_MAP`, `NAV_LINKS`, `DEFAULT_TILES`, `FALLBACK`, `FEWOG_DATA`, `EASE`, `DUR`, `STADTTEIL_LABEL`
- `camelCase` for local variables, parameters, and state
- `PascalCase` for type and interface names: `KontaktData`, `StartseiteData`, `Liegenschaft`, `Neuigkeit`

**Sanity schema exports:**
- Named export per file: `export const [name]Schema = defineType(...)` — e.g., `export const einstellungenSchema`, `export const liegenschaftSchema`

**Sanity query exports:**
- Query string: `export const [name]Query = \`...\`` — e.g., `kontaktQuery`, `startseiteQuery`
- Matching TypeScript type: `export type [Name]Data = {...}` co-located with its query in `src/sanity/queries.ts`

## TypeScript Usage

**Strict mode:** `"strict": true` in `fewog-app/tsconfig.json`. Enables `strictNullChecks`, `noImplicitAny`, and all other strict checks. Target is `ES2017`, `moduleResolution` is `bundler`, `isolatedModules` is `true`.

**`import type`** for type-only imports (required by `"isolatedModules": true`):
```typescript
import type { KontaktData, StartseiteData } from '@/sanity/queries';
```

**Props typing — inline object type** for page-level components (default export pattern):
```typescript
// src/app/wohnen/wohnen-client.tsx
export default function WohnenClient({
  liegenschaften,
  fallbackImageUrl,
}: {
  liegenschaften: Liegenschaft[]
  fallbackImageUrl: string | null
}) {
```

**Props typing — named `interface`** for shared/reusable components:
```typescript
// src/components/nav.tsx
interface NavProps {
  page: string;
  setPage: (page: string) => void;
}
export function Nav({ page, setPage }: NavProps)

// src/components/service-tile.tsx
interface ServiceTileProps {
  icon: ReactNode;
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
}
```

Both patterns are in active use. Prefer `interface` for shared components; inline object type is acceptable for page-level client components.

**Nullable Sanity data pattern:** All Sanity query results are typed `T | null`. Server pages pass `data ?? null` or `data ?? []` as props. Client components always accept `null` and fall back to hardcoded defaults:
```typescript
const heroTitel = startseite?.heroTitel ?? 'Genossenschaftliches Wohnen.';
const tiles = startseite?.serviceTiles?.length ? startseite.serviceTiles : DEFAULT_TILES;
```

**`unknown[]` for Portable Text content:** All Portable Text fields are typed `unknown[] | null` in query types. This is intentional — the Portable Text block shape is a runtime concern of `@portabletext/react`. Cast at the call site:
```typescript
<PortableText value={inhalt as Parameters<typeof PortableText>[0]['value']} />
```

**Non-null assertion (`!`):** Used sparingly after an explicit null guard:
```typescript
// src/app/service/service-client.tsx
if (mmUrl) {
  return <a ...>{mietermagazin!.titel}</a>;
}
```

**Tuple casting** for animation constants:
```typescript
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
```

**Generic state typed explicitly** when not inferred:
```typescript
const [selected, setSelected] = useState<Liegenschaft | null>(null);
const panelRef = useRef<HTMLDivElement>(null);
const entryAnim = useRef<ReturnType<typeof animate> | null>(null);
```

**No `any` usage detected** in source files.

## Component Architecture Pattern

**Server/client split:** Every page follows a strict two-file pattern:
- `page.tsx` — async Server Component. Calls `sanityFetch(...)`, derives any URL transforms server-side, passes typed props, renders `<SanityLive />` for live updates.
- `[name]-client.tsx` — `'use client'` component. Receives typed props, manages all local UI state, renders the full page layout (Nav + content sections + Footer).

```typescript
// page.tsx (server)
export default async function WohnenPage() {
  const [{ data: liegenschaften }, { data: einstellungen }] = await Promise.all([
    sanityFetch({ query: liegenschaftenQuery }),
    sanityFetch({ query: einstellungenQuery }),
  ]);
  return (
    <>
      <WohnenClient liegenschaften={liegenschaften ?? []} fallbackImageUrl={fallbackImageUrl} />
      <SanityLive />
    </>
  );
}
```

**Nav state pattern:** Every client page component owns `const [page, setPage] = useState('[route-name]')` and passes both to `<Nav page={page} setPage={setPage} />`. Navigation is handled inside `Nav` via `useRouter().push(...)`.

**Sanity fallback pattern:** Every CMS-driven section defines a module-level `DEFAULT_*` constant that mirrors the Sanity query type exactly (including `_key` fields for arrays). Used as fallback when CMS returns null or empty:
```typescript
// src/app/home-client.tsx
const DEFAULT_TILES = [
  { _key: 'schaden', icon: 'wrench', titel: 'Schaden melden', beschreibung: '...', link: 'mailto:...' },
]
const tiles = startseite?.serviceTiles?.length ? startseite.serviceTiles : DEFAULT_TILES;
```

**All components are function components.** No class components exist anywhere.

**Conditional class names** use string concatenation — no `clsx` or `cn` utility:
```typescript
className={'bestand-row' + (selected?._id === prop._id ? ' selected' : '')}
className={'nav-link' + (page === k ? ' active' : '')}
```

**Icon namespace pattern** in `src/components/icons.tsx` — inline SVGs under a single `Icon` object:
```typescript
export const Icon = {
  wrench: () => <svg ...>...</svg>,
  burger: () => <svg ...>...</svg>,
};
// Usage: <Icon.wrench />
```

**Animation pattern** in `src/app/wohnen/wohnen-client.tsx` — imperative, not declarative:
- `useMotionValue(0)` for real-time drag offset — never React state
- `animate(motionValue, target, options)` for programmatic transitions
- `<motion.div style={{ x }}>` binds motion value; no `animate` prop on the element
- `useLayoutEffect` for entry slide-in to avoid frame flash
- Non-passive `touchmove` listener registered via `useEffect` for swipe-to-close gesture

## Code Style

**Formatting:**
- No Prettier config file present — code formatting is not enforced by tooling
- Observed: 2-space indentation, single quotes for strings in `.ts`/`.tsx`
- Semicolons: newer files (Sanity schemas) omit trailing semicolons on export statements; component files include them. No tooling enforcement.

**Linting:**
- ESLint 9 with flat config at `fewog-app/eslint.config.mjs`
- Extends `next/core-web-vitals` and `next/typescript` via `FlatCompat`
- No custom rules beyond Next.js defaults
- Two `// eslint-disable-line react-hooks/exhaustive-deps` suppressions in `src/app/wohnen/wohnen-client.tsx` are intentional (animation-keyed effects)

## Import Organization

**Path aliases:** `@/` maps to `./src/` (defined in `fewog-app/tsconfig.json`).
- Cross-directory: `import { Nav } from '@/components/nav'`
- Same-directory: `import { Icon } from './icons'`

**Import order (observed, not enforced):**
1. `'use client'` directive (first line when needed)
2. React hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useLayoutEffect`
3. Third-party: `framer-motion`, `next/navigation`, `next/link`
4. Internal components via `@/components/...`
5. Internal lib/sanity via `@/sanity/...` and `@/lib/...`
6. Type-only imports last: `import type { ... } from '@/sanity/queries'`

**No barrel files.** Components are imported directly by file path — no `src/components/index.ts`.

## CSS / Styling Approach

**Hybrid: global design-system CSS classes + CSS custom properties + minimal Tailwind utilities.**

**Global CSS classes** in `src/app/globals.css` handle all component-level styling. Do not recreate these in Tailwind or inline styles:
```
Layout:    .wrap, .hero, .hero-grid, .bestand-layout
Nav:       .nav, .nav-inner, .nav-links, .nav-link, .nav-burger, .nav-mobile-dropdown
Pages:     .page-head, .page-head-simple, .content-section, .content-block
Service:   .service-dock, .service-grid, .service-tile
Contact:   .contact-strip, .contact-cell, .lbl, .val
Bestand:   .bestand, .bestand-list, .bestand-row, .bestand-letter, .property-detail-panel
Footer:    .footer, .footer-bottom
```

**Design tokens as CSS custom properties** in `:root`:
```css
--c-primary:   #8B1D28;   /* Kappelberg-Rot */
--c-secondary: #4A5D4E;   /* Weinlaub-Grün */
--c-bg:        #FDF8F7;
--c-ink:       #2D2D2D;
--f-display:   "Fraunces", Georgia, serif;
--f-body:      "Inter", system-ui, sans-serif;
```

**Rule:** Always use CSS custom properties for brand values. Never hardcode hex colors in `.tsx` files.

**Tailwind 4** is used only for coarse structural utilities on outermost wrappers: `min-h-screen`, `flex`, `flex-col`, `min-h-full`, `h-full`, `antialiased`. Not used for colors, typography, or component-level spacing.

**Inline `style` prop** used sparingly for one-off numeric adjustments (`scrollMarginTop: 80`, `marginTop: 14`). Minimize new use.

**Hover pattern for links** (established): `transition: color .15s` with `var(--c-secondary)` as hover color.

**Responsive breakpoints** in `globals.css`:
- Tablet: `@media (max-width: 960px)`
- Mobile: `@media (max-width: 768px)`
- Small mobile: `@media (max-width: 600px)`

## Sanity Schema Conventions

**All schemas use `defineType` and `defineField`** from `'sanity'` — never plain objects.

**German field titles:** Every `title` and `description` in schema definitions is in German. Non-negotiable for client usability.

**Field groups:** All schemas with multiple fields use `groups: [...]` to organize the Studio UI. New fields must be assigned to an appropriate `group`.

**Validation parameter name:** Both `rule` and `r` appear — use `r` as it is the newer convention in recent schemas:
```typescript
validation: (r) => r.required()
validation: (r) => r.required().min(1990).max(2100)
```

**Preview blocks:** Every schema defines `preview` with `select` and `prepare()`. Singleton-style schemas (datenschutz, impressum) use `prepare() { return { title: '...' } }`.

**Image fields:** Always include `options: { hotspot: true }`.

**Singleton documents** (einstellungen, datenschutz, impressum): Fixed document IDs configured in `sanity.config.ts` via `S.document().schemaType(...).documentId(...)` — prevents duplicate document creation in Studio.

## Where to Add New Code

**New page:**
1. Create `src/app/<slug>/page.tsx` — async server component, `sanityFetch`, pass props, render `<SanityLive />`
2. Create `src/app/<slug>/[slug]-client.tsx` — `'use client'`, receive props, own nav state, render layout

**New shared component:** `src/components/<kebab-name>.tsx` with named export.

**New Sanity schema:** `src/sanity/schemaTypes/<name>.ts`, export as `[name]Schema`, register in `src/sanity/schemaTypes/index.ts`.

**New Sanity query + type:** Append to `src/sanity/queries.ts` — query string constant + co-located TypeScript type.

**New global styles:** Append to `src/app/globals.css` with a section comment header.

**New static data / interfaces:** Append to `src/lib/data.ts`.

## Naming Summary

| Category | Convention | Examples |
|----------|-----------|---------|
| React components (shared) | PascalCase named export | `Nav`, `Footer`, `ServiceTile`, `ContactStrip` |
| Page server components | PascalCase default export + `Page` suffix | `WohnenPage`, `DatenschutzPage` |
| Page client components | PascalCase default export + `Client` suffix | `WohnenClient`, `HomeClient`, `DatenschutzClient` |
| Prop interfaces | PascalCase + `Props` suffix | `NavProps`, `ServiceTileProps` |
| Sanity schema exports | camelCase + `Schema` suffix | `liegenschaftSchema`, `einstellungenSchema` |
| Query type exports | PascalCase + `Data` suffix | `KontaktData`, `StartseiteData`, `ServiceseiteData` |
| Module-level constants | SCREAMING_SNAKE_CASE | `FEWOG_DATA`, `NAV_LINKS`, `DEFAULT_TILES`, `EASE` |
| Local variables / state | camelCase | `selected`, `grouped`, `fallbackImageUrl` |
| File names | lowercase kebab-case | `service-tile.tsx`, `contact-strip.tsx` |
| CSS classes | lowercase kebab-case | `.bestand-row`, `.nav-link`, `.hero-lead` |
| Route segments | lowercase German slugs | `/wohnen`, `/ueberuns`, `/aktuelles` |

## Comments

**Section dividers in long files** use em-dash pattern:
```typescript
// ── Kontakt ──────────────────────────────────────────────────────────────
// ── Startseite ───────────────────────────────────────────────────────────
```
This appears in `src/sanity/schemaTypes/einstellungen.ts` and `src/sanity/queries.ts`.

**Inline technical notes** explain non-obvious decisions:
```typescript
// stega deaktiviert für statische Metadaten (verhindert unsichtbare Zeichen in meta tags)
// eslint-disable-line react-hooks/exhaustive-deps
```

**JSX section dividers** mark major layout blocks: `{/* Property List */}`, `{/* Detail Panel */}`.

No JSDoc or TSDoc annotations are used anywhere.

## Error Handling

**No error boundaries.** No `error.tsx` or `not-found.tsx` files in `src/app/`. Server errors propagate to Next.js default behavior and Vercel logs.

**Data null-safety:** All Sanity data is defensively nullable via `?? fallback` pattern. Arrays default to `[]` via `data ?? []` in server components.

## Logging

No logging framework. No `console.log` calls in source files. Server-side diagnostics rely on Vercel function logs.

## Known Inconsistencies

- `layout.tsx` still has placeholder metadata: `title: "Create Next App"` and `lang="en"` — both need updating before production
- `layout.tsx` uses double quotes (Next.js scaffold default); all other files use single quotes
- Both `router.push()` and `window.location.href` assignment appear in navigation code — `router.push()` is preferred; `window.location.href` should be phased out

---

*Convention analysis: 2026-05-21*
