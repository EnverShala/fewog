---
slug: frontend-to-sanity
status: complete
completed: 2026-05-21
---

# Ergebnis: Alle hardcoded Frontend-Inhalte → Sanity

Alle pflegbaren Texte aus dem Frontend sind jetzt im `einstellungen`-Singleton in Sanity verwaltbar.

## Was wurde gemacht

**Schema** (`einstellungen.ts`): 4 neue Gruppen + ~25 neue Felder:
- **Startseite**: Hero-Titel, -Untertitel, -Lead, CTA-Text, Stats (Wohneinheiten, Mitglieder), Service-Dock-Texte, 3 Service-Kacheln (Titel, Beschreibung, Link)
- **Service-Seite**: Mietertreff-Beschreibung + Veranstaltungsorte-Array, Ferienwohnungen (PortableText), Veranstaltungsraum (PortableText)
- **Über uns**: Historie (PortableText), Entwicklung (PortableText)
- **Aktuelles-Seite**: Info-Blöcke-Array (Titel + PortableText-Inhalt)

**Queries** (`queries.ts`): 4 neue GROQ-Queries + TypeScript-Typen: `startseiteQuery`, `serviceseiteQuery`, `ueberunsseiteQuery`, `aktuellesInfoQuery`

**Pages** (4 server components): Neue Query-Aufrufe, Daten als Props weitergegeben

**Client-Komponenten** (4 Dateien): Sanity-Daten genutzt, vollständige hardcoded Fallbacks erhalten

## Verhalten
- Solange die Felder in Sanity Studio leer sind → identische Darstellung wie bisher (Fallback-Texte)
- Sobald der Kunde Inhalte einträgt → sofortige Aktualisierung via SanityLive
