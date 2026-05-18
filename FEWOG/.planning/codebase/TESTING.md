# Testing

**Analysis Date:** 2026-05-18

## Test Framework

**Installed:** None

No test framework is listed in `package.json` (neither in `dependencies` nor `devDependencies`). The following are absent:
- `jest` / `@jest/globals` / `ts-jest` / `babel-jest`
- `vitest` / `@vitest/ui`
- `@testing-library/react` / `@testing-library/jest-dom`
- `playwright` / `@playwright/test`
- `cypress`

The only test-adjacent tool present is `eslint` (for static analysis / linting), run via `npm run lint`.

## Test Coverage

**Existing test files:** None found.

A full search for `*.test.*`, `*.spec.*`, and `__tests__/` directories across `fewog-app/` returned no results. There are zero automated tests in the codebase at this stage.

## Testing Gaps

The entire application is untested. High-priority gaps once testing is added:

**Critical paths with no tests:**

- `src/lib/data.ts` — `FEWOG_DATA` constant structure: property list integrity (50 entries, required fields, valid district IDs). This is pure data — easiest to test first.
- `src/components/nav.tsx` — Navigation routing logic (`go()` function dispatches to correct routes; active link state reflects current page).
- `src/app/wohnen/page.tsx` — Property list grouping logic (`grouped` memo groups by first letter, sorts alphabetically); detail panel open/close state; scroll-to-detail side effect.
- `src/app/page.tsx` — `useEffect` navigation side effect (navigates to `/wohnen` when `page === 'wohnen'`).
- All components: basic render smoke tests (no crashes with required props).

**Accessibility / integration gaps:**
- No WCAG 2.1 AA accessibility checks (required for public institution — see CLAUDE.md constraints).
- No end-to-end navigation tests across the five route pages.

## Testing Approach (observed vs planned)

**Observed:** No testing infrastructure or conventions are established.

**Recommended approach for this stack (Next.js 15/16 + React 19 + TypeScript 5):**

**Unit / component tests — Vitest + Testing Library:**
```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```
- Config file: `vitest.config.ts` at project root
- Test files: co-located with source, named `*.test.tsx` / `*.test.ts`
- Example location: `src/lib/data.test.ts`, `src/components/nav.test.tsx`

**End-to-end tests — Playwright:**
```bash
npm install -D @playwright/test
npx playwright install
```
- Config file: `playwright.config.ts` at project root
- Test files: `src/e2e/` directory, named `*.spec.ts`

**Run commands (once set up):**
```bash
npx vitest            # Run unit tests (watch mode)
npx vitest run        # Run unit tests once
npx vitest --coverage # With coverage report
npx playwright test   # Run e2e tests
```

**Priority order for adding tests:**
1. `src/lib/data.ts` — pure data validation (no DOM, no setup needed)
2. `src/components/service-tile.tsx` — small, props-only component (easy smoke test)
3. `src/components/contact-strip.tsx` — no props, static render
4. `src/components/nav.tsx` — routing and active state logic
5. `src/app/wohnen/page.tsx` — grouping logic and detail panel state
6. E2E: page navigation flow across all five routes
