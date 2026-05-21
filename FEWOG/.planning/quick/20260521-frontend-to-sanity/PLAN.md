---
slug: frontend-to-sanity
title: Alle hardcoded Frontend-Inhalte in Sanity einstellungen migrieren
status: in_progress
created: 2026-05-21
---

# Alle hardcoded Frontend-Inhalte in Sanity migrieren

## Ziel
Alle pflegbaren Texte aus dem Frontend in den Sanity `einstellungen`-Singleton übertragen, sodass der Kunde alle Inhalte ohne Code-Deploy ändern kann.

## Tasks

- [ ] 1. `einstellungen.ts` Schema um 4 neue Gruppen + Felder erweitern
- [ ] 2. `queries.ts` um neue Queries + TypeScript-Typen erweitern
- [ ] 3. `app/page.tsx` — startseiteQuery hinzufügen
- [ ] 4. `app/service/page.tsx` — serviceseiteQuery hinzufügen
- [ ] 5. `app/ueberuns/page.tsx` — ueberunsseiteQuery hinzufügen
- [ ] 6. `app/aktuelles/page.tsx` — aktuellesInfoQuery hinzufügen
- [ ] 7. `home-client.tsx` — Sanity-Daten nutzen, FEWOG_DATA als Fallback
- [ ] 8. `service-client.tsx` — Sanity-Daten für Mietertreff/Ferien/Veranstaltungsraum
- [ ] 9. `ueberuns-client.tsx` — Sanity-Daten für Geschichte/Entwicklung
- [ ] 10. `aktuelles-client.tsx` — Sanity-Daten für statische Info-Blöcke
- [ ] 11. Git-Commit

## Schema-Erweiterungen

### Neue Gruppen
- `startseite` — Hero, Stats, Service-Dock
- `serviceseite` — Mietertreff, Ferienwohnungen, Veranstaltungsraum
- `ueberunsseite` — Historie, Entwicklung
- `aktuellesseite` — Info-Blöcke

### Neue Felder (Startseite)
- heroTitel, heroUntertitel, heroLead, heroCtaText
- statsWohneinheiten, statsMitglieder
- serviceDockEyebrow, serviceDockTitel, serviceDockLead
- serviceTiles (array: titel, beschreibung, link)

### Neue Felder (Service-Seite)
- mietertreffBeschreibung, mietertreffOrte (array)
- ferienwohnungenInhalt (PortableText)
- veranstaltungsraumInhalt (PortableText)

### Neue Felder (Über uns)
- historieInhalt, entwicklungInhalt (PortableText)

### Neue Felder (Aktuelles)
- aktuellesInfoBloecke (array: titel + inhalt PortableText)
