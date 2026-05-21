---
slug: wohnen-sanity-connect
status: complete
date: 2026-05-21
---

# /wohnen Sanity-Anbindung — Abgeschlossen

## Was gemacht wurde

- `src/sanity/image.ts` — `createImageUrlBuilder` Helper für Sanity CDN-Bilder
- `src/sanity/queries.ts` — GROQ-Query + TypeScript-Typ `Liegenschaft`
- `src/app/wohnen/wohnen-client.tsx` — Client Component mit Swipe-Panel, Zustand, Framer Motion
- `src/app/wohnen/page.tsx` — Server Component: `sanityFetch` + `<SanityLive />`

## Ergebnis

Die /wohnen-Seite liest alle Liegenschaften live aus Sanity.
Beim Bearbeiten im Studio aktualisiert sich die Website automatisch — kein Code-Deploy nötig.
Titelbilder werden via Sanity CDN geladen; Fallback für Einträge ohne Bild.

## Commit

`6e7b12d` — Connect /wohnen to Sanity via defineLive + GROQ query
