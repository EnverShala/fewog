# Testing Patterns

**Analysis Date:** 2026-05-21

## Test Framework

**Installed:** None.

No test framework is present in `fewog-app/package.json` — neither in `dependencies` nor `devDependencies`. The following are all absent:

- `jest`, `@jest/globals`, `ts-jest`, `babel-jest`
- `vitest`, `@vitest/ui`, `@vitest/coverage-v8`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `playwright`, `@playwright/test`
- `cypress`

The only automated quality gate is ESLint (static analysis), run via:

```bash
npm run lint     # ESLint — the sole automated check currently available
# npm test       # Not defined — fails with "Missing script: test"
```

## Test Files Found

**Zero test files exist in the project source.** A search for `*.test.*` and `*.spec.*` under `fewog-app/src/` returned no matches. There are no `__tests__/` directories anywhere under `src/`.

(`*.spec.*` files found in the repo all belong to `node_modules/` — third-party packages only.)

## Test Coverage

**Zero.** No source file has any automated test coverage.

## What Exists in Place of Tests

### TypeScript Strict Mode as a Partial Substitute
`"strict": true` in `fewog-app/tsconfig.json` catches type errors at compile time. All Sanity query result types are manually declared in `src/sanity/queries.ts`. TypeScript cannot be built with type errors — this provides some confidence that data shapes are correct.

### ESLint as the Only Runtime Check
`fewog-app/eslint.config.mjs` extends `next/core-web-vitals` and `next/typescript`. This catches React hook violations (e.g., missing exhaustive-deps) and a subset of correctness issues. Two intentional suppressions exist in `src/app/wohnen/wohnen-client.tsx`.

### Fallback Constants as Implicit Smoke Testing
Every page component defines `DEFAULT_*` constants matching the Sanity query type shape. These constants serve as live fallback content and implicitly verify that the default content renders without crashing — but only when the page is manually opened in a browser.

## Coverage Gaps

### High Priority: Pure Logic (No DOM Required)

**`src/lib/data.ts` — `FEWOG_DATA` integrity:**
- All 50 property entries have required fields (`id`, `district`, `street`, `year`, `units`, `rooms`, `sanierung`, `imageUrl`)
- Every `district` value references a valid `id` in `FEWOG_DATA.districts` (`kern`, `schmiden`, `oeffingen`)
- No duplicate `id` values
- `FEWOG_DATA.meta.properties` count (50) matches actual `properties` array length

**`src/app/wohnen/wohnen-client.tsx` — `grouped` memo:**
- Groups `Liegenschaft[]` by first letter of `bezeichnung` alphabetically
- Returns sorted array of `{ letter, items }` objects

**`src/sanity/queries.ts` — type correctness:**
- TypeScript compilation covers this; no additional runtime checks needed

### High Priority: Component Logic

**`src/components/nav.tsx` — `go()` routing:**
- `go('start')` calls `router.push('/')`
- `go('wohnen')`, `go('ueberuns')`, `go('aktuelles')`, `go('service')` call matching `router.push()`
- Active link class applied when `page` prop matches nav key
- Mobile menu toggles on burger click; closes on item selection

**`src/app/wohnen/wohnen-client.tsx` — detail panel:**
- Clicking a `bestand-row` sets `selected` to that `Liegenschaft`
- Clicking the same row again clears `selected` (toggle)
- Close button calls `closePanel()` and clears `selected`
- Swipe with `dragDelta > 80` triggers `closePanel()`
- Swipe with `dragDelta <= 80` springs back to `x = 0`
- `selected` CSS class applied to active row

**`src/app/home-client.tsx` — navigation `useEffect`:**
- When `page === 'wohnen'`, fires `window.location.href = '/wohnen'`
- Other page values reset `page` to `'start'`

**`src/components/contact-strip.tsx` — fallback logic:**
- When `data` is null, renders `FALLBACK` contact data
- When `data` has partial nulls (e.g., `data.telefon = null`), individual fields fall back to `FALLBACK`

### Medium Priority: Component Render Smoke Tests

Each component should render without throwing given valid props:

| Component | File | Test scope |
|-----------|------|------------|
| `Footer` | `src/components/footer.tsx` | Static render, no props |
| `ContactStrip` (no data) | `src/components/contact-strip.tsx` | `data={null}` — renders fallback |
| `ContactStrip` (with data) | `src/components/contact-strip.tsx` | Full `KontaktData` object |
| `ServiceTile` (href) | `src/components/service-tile.tsx` | `{ icon, title, desc, href }` — renders `<a>` |
| `ServiceTile` (onClick) | `src/components/service-tile.tsx` | `{ icon, title, desc, onClick }` — renders `<div>` |
| `Icon.*` | `src/components/icons.tsx` | Each of the icon arrow functions renders an SVG |

### Medium Priority: Sanity Query Type Alignment

All types in `src/sanity/queries.ts` are manually written against the GROQ query projections. There is no TypeGen integration to validate them automatically. Type drift is a real risk as schemas evolve. Currently untested:

- `KontaktData` field names match the GROQ projection in `kontaktQuery`
- `StartseiteData` matches `startseiteQuery`
- `Liegenschaft` matches `liegenschaftenQuery`
- `RechtsseiteData` matches `datenschutzQuery` and `impressumQuery`

### Accessibility Gaps (WCAG 2.1 AA Required)

No automated accessibility testing exists despite WCAG 2.1 AA being a stated project requirement:

- `<a>` elements in `src/components/nav.tsx` have no `href` attribute — navigation is click-only, breaking keyboard navigation and screen readers
- No `axe-core` / `@axe-core/react` integration
- `layout.tsx` has `lang="en"` — should be `lang="de"` for German content
- No automated `alt` text validation on `<img>` tags

### End-to-End Gaps

No e2e tests for any live route:

| Route | Key interactions untested |
|-------|--------------------------|
| `/` | Hero CTA click navigates to `/wohnen` |
| `/wohnen` | Property list loads, detail panel opens/closes, swipe gesture |
| `/ueberuns` | Organe table renders, Portable Text renders |
| `/aktuelles` | News cards render, article deep-link works |
| `/aktuelles/[slug]` | Article page loads and renders Portable Text body |
| `/service` | Document download links resolve, `PortableText` sections render |
| `/service/mietermagazin-archiv` | Archive list renders |
| `/service/geschaeftsbericht-archiv` | Archive list renders |
| `/datenschutz` | Portable Text fallback renders when CMS empty |
| `/impressum` | Portable Text fallback renders when CMS empty |
| `/studio` | Sanity Studio loads (embedded) |

### Security Header Validation

`next.config.ts` configures security headers for all non-`/studio` routes. No automated test verifies these headers are actually applied in the response:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

## Recommended Setup

### Unit and Component Tests — Vitest + Testing Library

Preferred over Jest for Next.js 15 / ESM projects.

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

`fewog-app/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

`fewog-app/src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

**Run commands (once set up):**
```bash
npx vitest            # Watch mode
npx vitest run        # Single run (CI)
npx vitest --coverage # Coverage report
```

### Test File Co-location

Place test files next to source files:
- `src/lib/data.test.ts` — pure data assertions, zero setup
- `src/components/service-tile.test.tsx`
- `src/components/contact-strip.test.tsx`
- `src/components/nav.test.tsx` — mock `useRouter`
- `src/app/wohnen/wohnen-client.test.tsx` — `grouped` memo and panel state

### End-to-End Tests — Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

`fewog-app/playwright.config.ts` — target `http://localhost:3000`.
Test files: `fewog-app/src/e2e/*.spec.ts`

```bash
npx playwright test        # Run all e2e
npx playwright test --ui   # Interactive mode
```

### Priority Order for Introducing Tests

1. `src/lib/data.ts` — pure data assertions, zero DOM or mock setup
2. `src/components/service-tile.tsx` — deterministic, props-only render
3. `src/components/contact-strip.tsx` — fallback logic and null handling
4. `src/components/nav.tsx` — active state, mock `useRouter`
5. `src/app/wohnen/wohnen-client.tsx` — `grouped` memo logic and panel state
6. Header integration test (Playwright or `next-test-api-route-handler`) for security headers
7. E2e: five-route navigation smoke test with Playwright
8. Accessibility: `axe-playwright` or `@axe-core/react` integration

## CI Integration

**None.** No CI pipeline configuration found (no `.github/workflows/`, no `vercel.json` with test steps). When tests are added, wire them into a GitHub Actions workflow that runs `npm run lint && npx vitest run` on every PR and `npx playwright test` on staging previews.

---

*Testing analysis: 2026-05-21*
