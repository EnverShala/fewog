# Coding Conventions

**Analysis Date:** 2026-05-19

## File & Directory Naming

**Pages:**
- Route pages use lowercase route-slug directory names matching German site navigation: `src/app/aktuelles/page.tsx`, `src/app/ueberuns/page.tsx`, `src/app/service/page.tsx`, `src/app/wohnen/page.tsx`
- Each route segment is a directory with a single `page.tsx` file (Next.js App Router convention)

**Components:**
- All component files use lowercase kebab-case: `src/components/nav.tsx`, `src/components/footer.tsx`, `src/components/service-tile.tsx`, `src/components/contact-strip.tsx`, `src/components/icons.tsx`
- No barrel `index.ts` files — components are imported directly by filename

**Data / Library files:**
- Utility and data files live in `src/lib/` using lowercase kebab-case: `src/lib/data.ts`

## Component Patterns

**Function declarations** are used for all components (both page defaults and named exports):

```tsx
// fewog-app/src/app/wohnen/page.tsx
export default function WohnenPage() { ... }

// fewog-app/src/components/nav.tsx
export function Nav({ page, setPage }: NavProps) { ... }

// fewog-app/src/components/service-tile.tsx
export function ServiceTile({ icon, title, desc, href, onClick }: ServiceTileProps) { ... }
```

The one exception is `src/components/icons.tsx`, which uses arrow functions as object property values on the `Icon` namespace object — this is intentional for the namespace pattern, not a convention for components:

```tsx
export const Icon = {
  arrow: () => (<svg .../>),
  phone: () => (<svg .../>),
};
// Usage: <Icon.phone />
```

**Props typing:** A named `interface` declared immediately above the component. Props are destructured inline in the function signature, never accessed via `props.x`. Optional props use `?:` syntax:

```tsx
// fewog-app/src/components/service-tile.tsx
interface ServiceTileProps {
  icon: ReactNode;
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
}
export function ServiceTile({ icon, title, desc, href, onClick }: ServiceTileProps) { ... }
```

**Default vs named exports:**
- Page files (`page.tsx`) use `export default function`
- All shared components use named exports (`export function`)
- Data constants and model interfaces use named exports: `export const FEWOG_DATA`, `export interface Property`

**`'use client'` directive:** Every page and every component file begins with `'use client'`. The entire prototype is client-side rendered. `src/app/layout.tsx` is the only file without the directive (it is a Server Component by default, per Next.js 15 App Router rules).

**Conditional class names** use string concatenation — no `clsx` or `cn` utility is present:

```tsx
className={"nav " + (open ? "nav-mobile-open" : "")}
className={"bestand-row" + (selectedProperty?.id === prop.id ? " selected" : "")}
```

**Inline `style` props** appear alongside CSS class names for one-off values that do not warrant a dedicated class. This is used in `src/components/footer.tsx`, `src/app/page.tsx`, and `src/app/service/page.tsx`. Inline styles should be minimized; prefer CSS custom properties referenced via class names.

## Import Conventions

**Path aliases:**
- `@/` maps to `./src/` (defined in `fewog-app/tsconfig.json`)
- Pages import components and data using the alias: `import { Nav } from '@/components/nav'`
- Components import siblings using relative paths: `import { Icon } from './icons'`
- Rule: use `@/` for cross-directory imports; use `./` for same-directory imports

**Import ordering pattern (observed — not tooling-enforced):**
1. React built-in hooks: `import { useState, useMemo, useRef } from 'react'`
2. Next.js modules: `import { useRouter } from 'next/navigation'`
3. Internal components via `@/` alias
4. Internal lib/data via `@/` alias
5. Type-only imports last, using `import type`: `import type { Property } from '@/lib/data'`

**Quote style:** Single quotes for all imports in component and page files. `src/app/layout.tsx` uses double quotes (Next.js scaffold default) — single quotes are the project standard.

## CSS / Styling Approach

**Hybrid approach: CSS custom property design tokens + Tailwind v4 utilities + semantic class names.**

**Tailwind v4** is imported via `@import "tailwindcss"` at the top of `src/app/globals.css`. Tailwind utilities are used only for structural layout on top-level wrappers: `min-h-screen`, `min-h-full`, `flex`, `flex-col`, `antialiased`.

**Semantic CSS classes** defined in `src/app/globals.css` are used for all design-system components. These follow a flat BEM-adjacent naming pattern:

```
.wrap               — max-width content container
.nav, .nav-inner, .nav-links, .nav-link, .nav-burger, .nav-mobile-open
.hero, .hero-grid, .hero-title, .hero-lead, .hero-ctas, .hero-stats, .hero-image
.service-dock, .service-grid, .service-tile
.bestand, .bestand-list, .bestand-row, .bestand-detail-col, .bestand-letter
.footer, .footer-bottom
.contact-strip, .contact-cell
.content-section, .content-block
.page-head, .page-head-simple
.btn, .btn-primary, .btn-ghost, .btn-arrow
.eyebrow, .serif, .mono, .muted
```

**Design tokens** are CSS custom properties defined in `:root` in `src/app/globals.css`:

```css
/* Colors */
--c-primary:   #8B1D28;   /* Kappelberg-Rot */
--c-secondary: #4A5D4E;   /* Weinlaub-Grün */
--c-bg:        #FDF8F7;   /* Rosé-Weiß */
--c-ink:       #2D2D2D;   /* Schiefergrau */
--c-ink-soft:  #6B6663;
--c-line:      #E2DAD4;
--c-card:      #FFFFFF;

/* Typography */
--f-display: "Fraunces", Georgia, serif;
--f-head: "Montserrat", system-ui, sans-serif;
--f-body: "Inter", system-ui, sans-serif;

/* Spacing scale */
--s-1: 4px  through  --s-9: 96px;

/* Layout */
--radius: 6px; --radius-lg: 14px; --maxw: 1280px;
```

Rule: always reference CSS custom properties for brand colors (`var(--c-primary)`). Never hardcode hex values inside component files — only in `globals.css`.

## TypeScript Conventions

**Strict mode:** `"strict": true` in `fewog-app/tsconfig.json`. Enables `strictNullChecks`, `noImplicitAny`, etc.

**Interface for object shapes:** Use `interface` for all object and prop definitions, not `type` aliases:

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
  pos?: [number, number];
}
```

**`import type`** for type-only imports (required by `"isolatedModules": true`):

```ts
import type { Property } from '@/lib/data';
```

**Generic state and refs** typed explicitly when type is not inferred:

```ts
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
const detailRef = useRef<HTMLDivElement>(null);
```

**Optional chaining** used consistently for nullable access: `selectedProperty?.id`, `districtById[id]?.name`.

## Naming Patterns

| Category | Convention | Examples |
|----------|-----------|---------|
| React components | PascalCase | `Nav`, `Footer`, `ServiceTile`, `WohnenPage` |
| Page components | PascalCase + `Page` suffix (except home) | `WohnenPage`, `UeberUnsPage`, `AktuellesPage`, `ServicePage`, `Home` |
| Prop interfaces | PascalCase + `Props` suffix | `NavProps`, `ServiceTileProps` |
| Data model interfaces | PascalCase | `Property`, `District`, `FewogData` |
| Module-level constants | SCREAMING_SNAKE_CASE | `FEWOG_DATA` |
| Local variables and state | camelCase | `selectedProperty`, `districtById`, `grouped`, `filtered` |
| Event handlers | `handle` prefix | `handleTouchStart`, `handleTouchMove`, `handleTouchEnd` |
| Short internal helpers | Short camelCase | `go`, `closeDetail` |
| CSS class names | lowercase kebab-case | `.bestand-row`, `.nav-link`, `.hero-lead` |
| CSS modifier classes | space-separated suffix | `"bestand-row selected"`, `"nav nav-mobile-open"` |
| File names | lowercase kebab-case | `service-tile.tsx`, `contact-strip.tsx` |

## Comments

File-level comments identify the module purpose:

```ts
// FEWOG Fellbach — Icons
// Tiny icons (line, monoline, no slop)

// FEWOG Fellbach — Bestandsdaten (Aktuell, 50 Liegenschaften)
// Alle Adressen von https://www.fewog.de/verwaltung/wohnungsbestand.html
```

JSX section dividers mark major layout blocks within page components:

```tsx
{/* Hero Section */}
{/* Service Dock */}
{/* Detail Panel — slides in from right */}
{/* Page Header */}
```

No JSDoc annotations are used anywhere in the current codebase.

## Framer Motion Usage

Framer Motion is used exclusively in `src/app/wohnen/page.tsx` for the mobile detail panel. The pattern is **imperative, not declarative**:

- `useMotionValue(0)` tracks the panel's horizontal drag offset — not React state
- `animate(motionValue, target, options)` imperatively drives animations (slide-in on mount, spring-back or dismiss on swipe release)
- `<motion.div style={{ x: panelX }}>` binds the motion value to the DOM — no `animate` prop on the element
- Touch event handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`) update `panelX.set(delta)` directly for real-time feedback
- `useLayoutEffect` triggers the entry animation immediately after mount (avoids a frame flash)
- Direction lock: first-move gesture determines axis; once horizontal, vertical scroll is suppressed for that touch

**Do not** use Framer Motion declarative `animate={{ x: ... }}` props or `whileDrag` on new additions — the established pattern is imperative `useMotionValue` + `animate()` calls.

## Linting Configuration

ESLint 9 with flat config format at `fewog-app/eslint.config.mjs`. Uses `@eslint/eslintrc` `FlatCompat` to bridge legacy `next/core-web-vitals` and `next/typescript` rulesets into the flat config system. No custom rules are added beyond the Next.js defaults.

No Prettier config file is present — code formatting is not enforced by tooling.

---

*Convention analysis: 2026-05-19*
