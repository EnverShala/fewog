# Testing

**Analysis Date:** 2026-05-19

## Test Framework

**Installed:** None.

No test framework appears in `fewog-app/package.json` — neither in `dependencies` nor `devDependencies`. The following are all absent:

- `jest`, `@jest/globals`, `ts-jest`, `babel-jest`
- `vitest`, `@vitest/ui`, `@vitest/coverage-v8`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `playwright`, `@playwright/test`
- `cypress`

The only test-adjacent tooling present is ESLint (static analysis), run via `npm run lint`.

## Test Files Found

**Zero test files exist in the codebase.**

A full search for `*.test.*`, `*.spec.*`, and `__tests__/` directories across `fewog-app/src/` returned no results.

## Test Commands

```bash
npm run lint    # ESLint only — the sole automated quality check available
```

No `test` script is defined in `fewog-app/package.json`. `npm test` will fail.

## What Is Tested

Nothing. There is no automated test coverage at this stage.

## What Is Not Tested (Gaps)

The entire application is untested. Priority areas once a test framework is added:

**High priority — pure logic, no DOM setup required:**
- `src/lib/data.ts` — `FEWOG_DATA` constant integrity: 50 property entries, required fields present on each, valid `district` IDs referencing entries in `FEWOG_DATA.districts`, no duplicate `id` values.

**High priority — component logic:**
- `src/components/nav.tsx` — `go()` function routes to correct paths for each nav key; active link class reflects current `page` prop; mobile menu toggle (`open` state).
- `src/app/wohnen/page.tsx` — `grouped` memo groups properties by first letter of street name and sorts alphabetically; `filtered` memo sorts by German locale; detail panel opens on row click and closes via `closeDetail()`; touch swipe gesture triggers `closeDetail()` when delta > 80px.
- `src/app/page.tsx` — `useEffect` navigates to `/wohnen` when `page === 'wohnen'`; other page values reset state.

**Medium priority — smoke tests (render without crash):**
- `src/components/footer.tsx` — renders with no props
- `src/components/contact-strip.tsx` — renders with no props
- `src/components/service-tile.tsx` — renders with `href` prop (anchor variant) and with `onClick` prop (div variant)
- `src/components/icons.tsx` — each icon in the `Icon` namespace renders without throwing

**Accessibility gaps (required per CLAUDE.md — WCAG 2.1 AA for public institution):**
- No automated accessibility checks (e.g., `axe-core` / `@axe-core/react`) are present
- `<img>` tags in `src/app/wohnen/page.tsx` and `src/app/page.tsx` have `alt` attributes, but no automated check enforces this
- `<a>` tags in `src/components/nav.tsx` have no `href` attribute (they rely on `onClick` only) — not tested

**End-to-end navigation gaps:**
- No e2e tests for the five routes: `/`, `/wohnen`, `/ueberuns`, `/aktuelles`, `/service`

## Recommended Setup (for when testing is introduced)

**Unit and component tests — Vitest + Testing Library:**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

Config file: `fewog-app/vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

Test file locations: co-located with source, e.g.:
- `src/lib/data.test.ts`
- `src/components/nav.test.tsx`
- `src/components/service-tile.test.tsx`

**End-to-end tests — Playwright:**

```bash
npm install -D @playwright/test
npx playwright install
```

Config file: `fewog-app/playwright.config.ts`
Test files: `src/e2e/*.spec.ts`

**Run commands (once set up):**

```bash
npx vitest            # Unit tests in watch mode
npx vitest run        # Unit tests single run
npx vitest --coverage # With coverage report
npx playwright test   # E2e tests
npm run lint          # ESLint (currently the only check)
```

**Priority order for adding tests:**
1. `src/lib/data.ts` — pure data validation, no DOM or mocking needed
2. `src/components/service-tile.tsx` — small, deterministic, props-only component
3. `src/components/contact-strip.tsx` — no props, fully static render
4. `src/components/nav.tsx` — routing logic and active state
5. `src/app/wohnen/page.tsx` — grouping/filtering memos and detail panel state
6. E2e: five-page navigation smoke test

---

*Testing analysis: 2026-05-19*
