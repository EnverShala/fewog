---
slug: nextjs-downgrade-v15
status: in-progress
---

# Downgrade Next.js 16 → 15.5.18

Downgrade `next` and `eslint-config-next` from 16.2.6 to 15.5.18 (latest stable 15.x).

## Why
Next.js 16 is incompatible with SanityLive (causes 4-10x API request spike).
CLAUDE.md explicitly requires staying on 15.x.

## Changes
1. `package.json`: next 16.2.6 → 15.5.18
2. `package.json`: eslint-config-next 16.2.6 → 15.5.18
3. Run `npm install` to update package-lock.json
4. Verify dev server starts on Next.js 15
