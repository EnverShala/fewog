# Coding Conventions

**Analysis Date:** 2026-05-18

## File & Directory Naming

**Pages:**
- Route pages use lowercase kebab-case directory names: `src/app/aktuelles/page.tsx`, `src/app/ueberuns/page.tsx`, `src/app/service/page.tsx`, `src/app/wohnen/page.tsx`
- Each route segment is a directory with a single `page.tsx` file

**Components:**
- All component files use lowercase kebab-case: `src/components/nav.tsx`, `src/components/footer.tsx`, `src/components/service-tile.tsx`, `src/components/contact-strip.tsx`, `src/components/icons.tsx`
- No barrel `index.ts` files — components are imported directly by filename

**Data / Library files:**
- Utility/data files live in `src/lib/` using lowercase kebab-case: `src/lib/data.ts`

## Component Patterns

**Function declarations vs arrow functions:**
- Page components (default exports) use `function` declarations:
  ```tsx
  export default function WohnenPage() { ... }
  export default function Home() { ... }
  ```
- Named exported components also use `function` declarations:
  ```tsx
  export function Nav({ page, setPage }: NavProps) { ... }
  export function Footer({ setPage }: FooterProps) { ... }
  export function ServiceTile({ icon, title, desc, onClick }: ServiceTileProps) { ... }
  export function ContactStrip() { ... }
  ```
- The one exception is the `Icon` object in `src/components/icons.tsx`, which uses arrow functions as object property values:
  ```tsx
  export const Icon = {
    arrow: () => (<svg .../>),
    phone: () => (<svg .../>),
  };
  ```
- **Rule:** Use `function` declarations for all components. Arrow functions only for non-component helpers or object method values.

**Props typing approach:**
- Props are typed with an `interface` declared immediately above the component:
  ```tsx
  interface NavProps {
    page: string;
    setPage: (page: string) => void;
  }
  export function Nav({ page, setPage }: NavProps) { ... }
  ```
- Props are destructured inline in the function signature, never via `props.x`.
- Optional props use `?:` syntax: `onClick?: () => void`

**Default exports vs named exports:**
- Page files (`page.tsx`) use `export default function`
- All shared components use named exports (`export function`)
- Data constants and interfaces use named exports: `export const FEWOG_DATA`, `export interface Property`

## Import Conventions

**Path aliases:**
- The `@/*` alias is configured in `tsconfig.json` mapping to `./src/*`
- Pages import components using the alias: `import { Nav } from '@/components/nav'`
- Pages import data using the alias: `import { FEWOG_DATA } from '@/lib/data'`
- Components import sibling components using relative paths without the alias: `import { Icon } from './icons'`
  - **Rule:** Use `@/` for cross-directory imports; use `./` for same-directory imports.

**Import ordering pattern observed:**
1. React built-in hooks: `import { useState, useEffect } from 'react'`
2. Next.js modules: `import { useRouter } from 'next/navigation'`
3. Internal components via `@/` alias
4. Internal lib/data via `@/` alias
5. Type-only imports last: `import type { Property } from '@/lib/data'`

**Quote style:**
- Component files consistently use single quotes for imports: `import { useState } from 'react'`
- `src/app/layout.tsx` (generated scaffold) uses double quotes — treat single quotes as the project standard going forward.

## CSS / Styling Conventions

**Approach: CSS custom properties + Tailwind utility classes (hybrid)**

- Global design tokens are defined as CSS custom properties in `src/app/globals.css`:
  - Colors: `--c-primary`, `--c-secondary`, `--c-bg`, `--c-ink`, `--c-ink-soft`, etc.
  - Typography: `--f-display`, `--f-head`, `--f-body`
  - Spacing scale: `--s-1` through `--s-9`
  - Radii: `--radius`, `--radius-lg`
  - Max width: `--maxw: 1280px`
- Tailwind v4 is installed (`@import "tailwindcss"` in globals.css). Tailwind utility classes are used for layout and common spacing: `min-h-screen`, `flex`, `flex-col`, `antialiased`
- **Component-level layout uses semantic CSS class names** (not Tailwind utilities): `.nav`, `.nav-inner`, `.nav-links`, `.hero`, `.hero-grid`, `.wrap`, `.service-dock`, `.footer`, `.footer-grid`, `.bestand`, `.bestand-row`, etc.
- Inline styles appear in some places for one-off adjustments: `style={{ color: "rgba(253,248,247,0.6)" }}`, `style={{ marginTop: 14 }}`
  - Inline styles should be minimized; prefer CSS custom properties or Tailwind utilities.
- CSS class composition via string concatenation: `"nav " + (open ? "nav-mobile-open" : "")` and `"bestand-row" + (selected ? " selected" : "")`

**Color values:**
- Always reference CSS custom properties for brand colors: `var(--c-primary)`, `var(--c-ink-soft)`, etc.
- Never hardcode hex values in component files — only in `globals.css`.

## TypeScript Conventions

**Strict mode:**
- `"strict": true` is set in `tsconfig.json` — enables `strictNullChecks`, `noImplicitAny`, etc.
- `"isolatedModules": true` — each file is a standalone module.
- `"skipLibCheck": true` — third-party type errors are suppressed.
- Target: `ES2017`; module resolution: `bundler`.

**Type annotation patterns:**
- Component state with nullable types uses generics: `useState<Property | null>(null)`
- Refs use generics: `useRef<HTMLDivElement | null>(null)`
- Data shape types use `interface` (not `type`) for object shapes:
  ```ts
  export interface Property { id: string; district: string; ... }
  export interface FewogData { meta: { ... }; districts: District[]; properties: Property[]; }
  ```
- Inline object types appear inside component signatures for simple props: `Readonly<{ children: React.ReactNode }>`
- `type` keyword is used only for `import type` statements, not for defining shapes.

**Interface vs type:**
- Use `interface` for all object shapes and component prop definitions.
- Use `import type` for type-only imports to satisfy `isolatedModules`.

## Naming Patterns

**Component names:**
- PascalCase matching the exported function name: `Nav`, `Footer`, `ServiceTile`, `ContactStrip`
- Page component names include the route context: `WohnenPage`, `UeberUnsPage`, `AktuellesPage`, `ServicePage`
- Home page is simply named `Home`

**Variable and function names:**
- camelCase throughout: `selectedProperty`, `detailPanelRef`, `districtById`, `grouped`
- Short helper function names are acceptable inside components: `const go = (p: string) => { ... }`
- Constants in `src/lib/data.ts` use SCREAMING_SNAKE_CASE: `FEWOG_DATA`

**CSS class names:**
- Lowercase kebab-case for semantic layout classes: `hero-grid`, `nav-inner`, `service-dock`, `bestand-row`
- BEM-like modifier suffix with a space: `"bestand-row selected"`, `"nav nav-mobile-open"`

**File names:**
- All lowercase kebab-case — mirrors component names lowercased: `service-tile.tsx` for `ServiceTile`

## Client vs Server Components

- Every page and component file starts with `'use client'` directive — the entire prototype is client-side rendered.
- `src/app/layout.tsx` is the only file without `'use client'` (it is a Server Component by default).
- Future Sanity integration will introduce Server Components for data fetching. New data-fetching pages should be Server Components; interactive UI sub-components should be `'use client'`.

## Comments

- Section dividers use JSX comments above major JSX blocks: `{/* Hero Section */}`, `{/* Page Header */}`
- File-level comments identify the module: `// FEWOG Fellbach — Icons`, `// FEWOG Fellbach — Bestandsdaten`
- Inline code comments explain non-obvious logic: `// Scroll to the detail panel with offset for the header`
- No JSDoc annotations observed.
