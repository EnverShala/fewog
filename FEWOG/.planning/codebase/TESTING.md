# Testing

**Analysis Date:** 2026-05-19

## Test Framework

**Installed:** None.

No test framework is present in `fewog-app/package.json` — neither in `dependencies` nor `devDependencies`. All of the following are absent:

- `jest`, `@jest/globals`, `ts-jest`, `babel-jest`
- `vitest`, `@vitest/ui`, `@vitest/coverage-v8`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `playwright`, `@playwright/test`
- `cypress`

The only automated quality gate is ESLint (static analysis), run via `npm run lint` (calls `eslint` with no extra arguments, using `fewog-app/eslint.config.mjs`).

## Test Files Found

**Zero test files exist in the project source.** A search for `*.test.*` and `*.spec.*` under `fewog-app/src/` returned no matches. There are no `__tests__/` directories.

(`*.spec.*` files found elsewhere all belong to `node_modules/` — third-party packages only.)

## Run Commands

```bash
npm run lint     # ESLint — the sole automated check available
# npm test       # Not defined — will fail with "Missing script: test"
```

## Test Coverage

**Zero.** No source file has automated test coverage.

## Gaps — Full Coverage Picture

### High Priority: Pure Logic (No DOM Required)

**`fewog-app/src/lib/data.ts` — `FEWOG_DATA` integrity:**
- 50 property entries present
- All required fields (`id`, `district`, `street`, `year`, `units`, `rooms`, `sanierung`, `imageUrl`) populated on each entry
- Every `district` value references a valid `id` in `FEWOG_DATA.districts`
- No duplicate `id` values
- `FEWOG_DATA.meta.properties` count matches actual `properties` array length

**`fewog-app/src/app/wohnen/page.tsx` — memos:**
- `filtered` memo: sorts properties alphabetically by `street` using German locale (`'de'`)
- `grouped` memo: groups by first letter of street name, returns sorted array of `{ letter, items }` objects

### High Priority: Component Logic

**`fewog-app/src/components/nav.tsx` — `go()` routing:**
- `go('start')` calls `router.push('/')`
- `go('wohnen')` calls `router.push('/wohnen')`
- `go('ueberuns')` calls `router.push('/ueberuns')`
- `go('aktuelles')` calls `router.push('/aktuelles')`
- `go('service')` calls `router.push('/service')`
- Active link class applied when `page` prop matches nav key
- Mobile menu toggles `open` state on burger click

**`fewog-app/src/app/wohnen/page.tsx` — detail panel:**
- Clicking a `bestand-row` sets `selectedProperty`
- Clicking the same row again clears `selectedProperty` (toggle behavior)
- Close button calls `closePanel()` and clears `selectedProperty`
- Swipe gesture with `dragDelta > 80` triggers `closePanel()`
- Swipe gesture with `dragDelta <= 80` springs back to `x = 0`
- `selected` CSS class applied to the currently active row

**`fewog-app/src/app/page.tsx` — navigation effect:**
- `useEffect` fires `window.location.href = '/wohnen'` when `page === 'wohnen'`
- Other page values (`'service'`, `'ueberuns'`, `'aktuelles'`) reset `page` to `'start'`

### Medium Priority: Render Smoke Tests

Each component should render without throwing given valid props:

| Component | File | Props to test |
|-----------|------|---------------|
| `Footer` | `fewog-app/src/components/footer.tsx` | None (static) |
| `ContactStrip` | `fewog-app/src/components/contact-strip.tsx` | None (static) |
| `ServiceTile` (href variant) | `fewog-app/src/components/service-tile.tsx` | `{ icon, title, desc, href }` |
| `ServiceTile` (onClick variant) | `fewog-app/src/components/service-tile.tsx` | `{ icon, title, desc, onClick }` |
| Each `Icon.*` | `fewog-app/src/components/icons.tsx` | No props — 13 icons to cover |

### Accessibility Gaps

WCAG 2.1 AA compliance is required (per project constraints). No automated accessibility checks are in place:

- `<a>` tags in `fewog-app/src/components/nav.tsx` have no `href` attribute — navigation is click-only, which breaks keyboard navigation and screen readers
- No `axe-core` / `@axe-core/react` integration
- No automated `alt` attribute validation on `<img>` tags (currently present manually in `wohnen/page.tsx` and `page.tsx`, but not enforced)

### End-to-End Gaps

No e2e tests exist for any of the five live routes:
- `/` — homepage
- `/wohnen` — property list
- `/ueberuns` — about
- `/aktuelles` — news
- `/service` — services (includes `/service/mietermagazin-archiv` and `/service/geschaeftsbericht-archiv`)

## CI Integration

**None.** No CI pipeline configuration was found (no `.github/workflows/`, no `vercel.json` with test steps). Tests would need to be wired into Vercel's deploy hooks or a GitHub Actions workflow once added.

## Recommended Setup

**Unit and component tests — Vitest + Testing Library** (preferred over Jest for Next.js 15 / ESM projects):

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

`fewog-app/vitest.config.ts`:
```ts
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
```ts
import '@testing-library/jest-dom';
```

**Test file co-location** — place tests next to source files:
- `fewog-app/src/lib/data.test.ts`
- `fewog-app/src/components/service-tile.test.tsx`
- `fewog-app/src/components/nav.test.tsx`
- `fewog-app/src/app/wohnen/page.test.tsx`

**End-to-end tests — Playwright:**

```bash
npm install -D @playwright/test
npx playwright install
```

`fewog-app/playwright.config.ts` — target `http://localhost:3000`.
Test files: `fewog-app/src/e2e/*.spec.ts`

**Run commands (once set up):**

```bash
npx vitest            # Watch mode
npx vitest run        # Single run
npx vitest --coverage # Coverage report
npx playwright test   # E2e
npm run lint          # ESLint (currently the only check)
```

**Priority order for introducing tests:**
1. `src/lib/data.ts` — pure data assertions, zero setup
2. `src/components/service-tile.tsx` — deterministic props-only render
3. `src/components/contact-strip.tsx` and `src/components/footer.tsx` — static renders
4. `src/components/nav.tsx` — router mock + active state
5. `src/app/wohnen/page.tsx` — memo logic and panel state
6. E2e: five-route navigation smoke test with Playwright

---

*Testing analysis: 2026-05-19*
