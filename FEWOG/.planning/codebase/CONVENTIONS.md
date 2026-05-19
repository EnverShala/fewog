# Coding Conventions

**Analysis Date:** 2026-05-19

## TypeScript Usage

**Strict mode:** `"strict": true` in `fewog-app/tsconfig.json`. Enables `strictNullChecks`, `noImplicitAny`, and all other strict checks. Target is `ES2017`, `moduleResolution` is `bundler`, `isolatedModules` is `true`.

**Interfaces for object shapes.** Use `interface` for props and domain models — not `type` aliases:

```ts
// fewog-app/src/lib/data.ts
export interface Property {
  id: string;
  district: string;
  street: string;
  year: number;
  units: number;
  rooms: string;
  sanierung: number;
  imageUrl: string;
  pos?: [number, number];       // optional tuple
}
```

**`import type`** for type-only imports (required by `"isolatedModules": true`):
```ts
import type { Property } from '@/lib/data';
```

**Generic state typed explicitly** when not inferred:
```ts
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
const panelRef = useRef<HTMLDivElement>(null);
const entryAnim = useRef<ReturnType<typeof animate> | null>(null);
```

**Tuple casting** used for animation easing constants:
```ts
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
```

**Optional chaining** used consistently for nullable access: `selectedProperty?.id`, `districtById[id]?.name`.

**No `any` usage detected** in source files.

## Component Patterns

**All components are function components.** No class components exist anywhere.

**`'use client'` directive:** Every page and shared component carries `'use client'` at the top. The entire app is client-side rendered in the prototype. `src/app/layout.tsx` is the only file without it (Server Component by default in Next.js 15 App Router).

**Named exports for components, default exports for pages:**
```tsx
// Shared component — named export
export function ServiceTile({ icon, title, desc, href, onClick }: ServiceTileProps) { ... }

// Page file — default export
export default function WohnenPage() { ... }
```

**Props typing:** A named `interface` declared immediately above the component. Props destructured inline in the signature, never accessed via `props.x`:
```tsx
interface ServiceTileProps {
  icon: ReactNode;
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
}
export function ServiceTile({ icon, title, desc, href, onClick }: ServiceTileProps) { ... }
```

**Conditional class names** use string concatenation — no `clsx` or `cn` utility:
```tsx
className={'bestand-row' + (selectedProperty?.id === prop.id ? ' selected' : '')}
className={'nav-link' + (page === k ? ' active' : '')}
```

**Icon namespace pattern** in `fewog-app/src/components/icons.tsx` — inline SVGs collected under a single `Icon` object, each as an arrow function:
```tsx
export const Icon = {
  wrench: () => <svg ...>...</svg>,
  close:  () => <svg ...>...</svg>,
};
// Usage: <Icon.wrench />
```

**Navigation state pattern:** Every page component owns a `const [page, setPage] = useState('pagename')` and passes it to `<Nav>` for active-link highlighting. `Nav` receives `page` + `setPage` but routes via `useRouter()` internally:
```tsx
// wohnen/page.tsx
const [page, setPage] = useState('wohnen');
return <Nav page={page} setPage={setPage} />;
```

**Animation pattern** in `fewog-app/src/app/wohnen/page.tsx` — **imperative, not declarative**:
- `useMotionValue(0)` for real-time drag offset — never React state
- `animate(motionValue, target, options)` for programmatic transitions
- `<motion.div style={{ x }}>` — binds motion value; no `animate` prop on the element
- `useLayoutEffect` for entry slide-in immediately after mount (avoids frame flash)
- Non-passive `touchmove` listener registered via `useEffect` for swipe-to-close

## CSS / Styling Approach

**Hybrid: global design-system CSS classes + CSS custom properties + minimal Tailwind utilities.**

**Global CSS classes** in `fewog-app/src/app/globals.css` provide all component-level styling:
```
Layout:      .wrap, .hero, .hero-grid, .bestand-layout, .bestand-list-col, .bestand-detail-col
Nav:         .nav, .nav-inner, .nav-links, .nav-link, .nav-cta, .nav-burger, .nav-mobile-dropdown
Typography:  .eyebrow, .serif, .mono, .muted
Buttons:     .btn, .btn-primary, .btn-ghost, .btn-arrow, .btn-download
Service:     .service-dock, .service-grid, .service-tile
Contact:     .contact-strip, .contact-cell, .lbl, .val
Bestand:     .bestand, .bestand-list, .bestand-row, .bestand-letter, .property-detail-panel
Detail:      .detail-hero, .detail-hero-overlay, .detail-body, .detail-grid, .detail-item, .detail-close
Pages:       .page-head, .page-head-simple, .content-section, .content-block
Archive:     .archiv-list, .archiv-row, .archiv-year, .archiv-title
Utility:     .info-box, .info-grid, .contact-info
Footer:      .footer, .footer-grid, .footer-bottom
```

**Design tokens** as CSS custom properties in `:root`:
```css
/* Brand colors */
--c-primary:        #8B1D28;   /* Kappelberg-Rot */
--c-secondary:      #4A5D4E;   /* Weinlaub-Grün */
--c-bg:             #FDF8F7;   /* Rosé-Weiß */
--c-bg-2:           #F5EFEC;
--c-bg-3:           #ECE6E2;
--c-ink:            #2D2D2D;   /* Schiefergrau */
--c-ink-soft:       #6B6663;
--c-ink-mute:       #9A9590;
--c-line:           #E2DAD4;
--c-line-soft:      #EDE6E1;
--c-card:           #FFFFFF;
--c-accent-tint:    #F4E4E5;
--c-secondary-tint: #E8EAE5;

/* Typography */
--f-display: "Fraunces", Georgia, serif;
--f-head:    "Montserrat", system-ui, sans-serif;
--f-body:    "Inter", system-ui, sans-serif;
--f-mono:    "JetBrains Mono", ui-monospace, monospace;

/* Spacing scale (4px base) */
--s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px;
--s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px;

/* Shape */
--radius: 6px; --radius-lg: 14px; --maxw: 1280px;
```

**Rule: Always use CSS custom properties for brand values. Never hardcode hex colors or spacing numbers inside component `.tsx` files.** Hardcoded values belong only in `globals.css`.

**Tailwind 4** is used only for coarse structural utilities on outermost wrappers: `min-h-screen`, `flex`, `flex-col`, `min-h-full`, `h-full`, `antialiased`. Not used for component-level colors, typography, or spacing.

**Inline `style` prop** used sparingly for one-off numeric values that don't warrant a class (e.g., `style={{ marginTop: 32 }}`, `style={{ scrollMarginTop: 80 }}`). Minimize use.

**Responsive breakpoints** in `globals.css`:
- Tablet: `@media (max-width: 960px)`
- Mobile: `@media (max-width: 768px)`
- Small mobile: `@media (max-width: 600px)`

Link hover interactions use `transition: color .15s` with `var(--c-secondary)` as hover color — established pattern for `.contact-strip a:hover` and `.content-block a:hover`.

## Import Organization

**Path aliases:** `@/` maps to `./src/` (defined in `fewog-app/tsconfig.json`).
- Cross-directory imports use `@/`: `import { Nav } from '@/components/nav'`
- Same-directory imports use `./`: `import { Icon } from './icons'`

**Import order pattern (observed, not enforced):**
1. React hooks: `import { useState, useEffect, useMemo, useRef } from 'react'`
2. Third-party libraries: `import { motion, animate } from 'framer-motion'`
3. Next.js: `import { useRouter } from 'next/navigation'`
4. Internal components via `@/`
5. Internal lib/data via `@/`
6. Type-only imports last with `import type`

**Quote style:** Single quotes for imports in component and page files. `layout.tsx` uses double quotes (Next.js scaffold default, inconsistency to fix).

## File Organization

```
fewog-app/src/
├── app/
│   ├── globals.css              # Entire design system — tokens, classes, responsive
│   ├── layout.tsx               # Root layout: font loading, html/body setup
│   ├── page.tsx                 # Homepage — 'use client', hero + service dock
│   ├── wohnen/page.tsx          # Property A-Z list with detail panel
│   ├── ueberuns/page.tsx        # About page — content-block sections
│   ├── aktuelles/page.tsx       # News/updates page
│   ├── impressum/page.tsx       # Legal notice
│   ├── datenschutz/page.tsx     # Privacy policy
│   └── service/
│       ├── page.tsx             # Services overview
│       ├── mietermagazin-archiv/page.tsx
│       └── geschaeftsbericht-archiv/page.tsx
├── components/                  # Shared UI — all 'use client'
│   ├── contact-strip.tsx
│   ├── footer.tsx
│   ├── icons.tsx                # Icon namespace object
│   ├── nav.tsx                  # Navigation with mobile dropdown
│   └── service-tile.tsx
└── lib/
    └── data.ts                  # FEWOG_DATA static dataset + TypeScript interfaces
```

**No barrel exports.** Components imported directly by file path.

**Page-scoped static data** (archive lists) defined as module-level `const ARCHIV = [...]` at the top of the page file that uses it — not in `lib/`.

**Where to add new code:**
- New page: `src/app/<slug>/page.tsx` with `'use client'` and the nav state pattern
- New shared component: `src/components/<kebab-name>.tsx`
- New data types or static data: `src/lib/data.ts`
- New global styles: append to `src/app/globals.css` with a section comment

## Naming

| Category | Convention | Examples |
|----------|-----------|---------|
| React components (shared) | PascalCase | `Nav`, `Footer`, `ServiceTile`, `ContactStrip` |
| Page default exports | PascalCase + `Page` suffix | `WohnenPage`, `UeberUnsPage`, `ServicePage` (homepage exception: `Home`) |
| Prop interfaces | PascalCase + `Props` suffix | `NavProps`, `ServiceTileProps` |
| Domain model interfaces | PascalCase | `Property`, `District`, `FewogData` |
| Module-level constants | SCREAMING_SNAKE_CASE | `FEWOG_DATA`, `NAV_LINKS`, `ARCHIV`, `EASE`, `DUR` |
| Local variables / state | camelCase | `selectedProperty`, `districtById`, `grouped`, `filtered` |
| File names | lowercase kebab-case | `service-tile.tsx`, `contact-strip.tsx` |
| CSS classes | lowercase kebab-case | `.bestand-row`, `.nav-link`, `.hero-lead` |
| Route segments | lowercase German slugs | `/wohnen`, `/ueberuns`, `/aktuelles` |

## Comments

File-level header comments identify the module:
```ts
// FEWOG Fellbach — Icons
// Tiny icons (line, monoline, no slop)
```

JSX section dividers mark major layout blocks:
```tsx
{/* Hero Section */}
{/* Service Dock */}
{/* Detail Panel */}
```

No JSDoc annotations are used.

## Linting

ESLint 9 with flat config at `fewog-app/eslint.config.mjs`. Uses `FlatCompat` to bridge legacy `next/core-web-vitals` and `next/typescript` presets. No custom rules added. Run with `npm run lint` (calls `eslint` with no arguments, so it uses the config's defaults).

No Prettier config file detected — code formatting is not enforced by tooling.

## Notes

- **Mixed navigation approaches:** Both `router.push()` and `window.location.href` assignments appear in `nav.tsx` and `page.tsx`. Standardize on `router.push()`.
- **No Sanity wired yet:** `next-sanity`, `sanity`, `@portabletext/react`, and `@sanity/image-url` are installed but no client/schema/studio exists in `src/`. All content is static data.
- **Placeholder metadata:** `layout.tsx` still has `title: "Create Next App"` — update before production.
- **Unsplash placeholder image** in homepage hero — will be replaced by Sanity CDN asset.
- **`framer-motion` v12** installed. Used only in `nav.tsx` (mobile dropdown) and `wohnen/page.tsx` (detail panel). Do not use declarative `animate` props — imperative `useMotionValue` + `animate()` is the established pattern.

---

*Convention analysis: 2026-05-19*
