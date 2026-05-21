# IT-Sicherheit — FEWOG Website

Stand: Mai 2026  
Stack: Next.js 15, Sanity CMS, Vercel

---

## Was strukturell NICHT relevant ist

**SQL-Injection** — Es gibt keine SQL-Datenbank. Sanity verwendet GROQ als
Abfragesprache, und alle Queries sind fest im Code eingebaut. Kein User-Input
fließt in Datenbankabfragen ein.

**CSRF (Cross-Site Request Forgery)** — Es gibt keine Login-Formulare oder
mutierende API-Endpunkte auf dem Frontend. Nutzer können nichts schreiben.

**Brute Force / Rate Limiting** — Keine Login-Seite, keine API mit User-Input.

---

## Was umgesetzt wurde

### 1. Security Headers (`next.config.ts`)
HTTP-Header, die der Browser als Sicherheitsanweisung auswertet:

- **`X-Frame-Options: DENY`**  
  Verhindert, dass die Website in einem `<iframe>` eingebettet wird.  
  Schützt vor *Clickjacking*: Angriff, bei dem die echte Seite unsichtbar über
  eine gefälschte Seite gelegt wird, um Klicks abzufangen.

- **`X-Content-Type-Options: nosniff`**  
  Der Browser darf den Dateityp (MIME-Typ) nicht selbst erraten.  
  Verhindert, dass z.B. eine hochgeladene Textdatei vom Browser als JavaScript
  interpretiert und ausgeführt wird.

- **`Referrer-Policy: strict-origin-when-cross-origin`**  
  Wenn ein Nutzer auf einen externen Link klickt, wird nur die Domain
  (z.B. `fewog.de`), nicht die vollständige URL mitgeschickt.  
  Schützt interne URL-Strukturen vor Dritten.

- **`Permissions-Policy`**  
  Deaktiviert Browser-Features, die die Website nicht nutzt:
  Kamera, Mikrofon, Standort, Bezahlfunktionen.  
  Verhindert, dass eingebettete Skripte auf diese Hardware zugreifen.

- **`X-DNS-Prefetch-Control: on`**  
  Erlaubt dem Browser, DNS-Adressen vorab aufzulösen — leichte
  Performance-Verbesserung bei externen Links.

*Hinweis: `/studio` ist von `X-Frame-Options` ausgenommen, weil Sanity Studio
intern Frames für die visuelle Vorschau verwendet.*

### 2. robots.txt (`public/robots.txt`)
Datei, die Suchmaschinen (Google, Bing etc.) anweist, welche Seiten sie
indexieren dürfen.

`/studio` ist ausgeschlossen — das CMS-Backend soll nicht in Suchergebnissen
auftauchen.

### 3. Token-Überprüfung
Geprüft: Keine sensiblen API-Token im Client-Bundle.

- `NEXT_PUBLIC_SANITY_PROJECT_ID` und `NEXT_PUBLIC_SANITY_DATASET` sind bewusst
  öffentlich (werden für Sanity-Verbindung im Browser benötigt, enthalten keine
  Geheimnisse).
- `SANITY_API_READ_TOKEN` und `SANITY_API_WRITE_TOKEN` sind **nicht** mit
  `NEXT_PUBLIC_` präfixiert → laufen ausschließlich server-seitig, nie im
  Browser-Bundle.

---

## Was offen bleibt / manuell zu erledigen ist

### 4. CORS für Produktionsdomain (einmaliger Klick im Sanity-Dashboard)

Sanity erlaubt aktuell nur `localhost:3000` als Ursprung. Damit das Studio
auf `fewog.de` funktioniert, müssen folgende Domains eingetragen werden:

**Wo:** `sanity.io/manage` → Projekt FEWOG → **API** → **CORS Origins**

**Einzutragen:**
- `https://fewog.de` (mit „Allow credentials" ✓)
- `https://*.vercel.app` (für Vercel Preview-Deployments)

Ohne diesen Schritt lädt das Studio auf der Live-Domain nicht.

### 5. npm audit — Befund

`npm audit` zeigt 6 moderate Schwachstellen. **Beide sind nicht direkt
behebbar ohne Breaking Changes:**

**Befund 1: `js-yaml < 3.14.2` (Prototype Pollution)**
- Wo: `@sanity/cli` → `@vercel/frameworks` → `js-yaml`
- Was: Angreifer könnte JavaScript-Objekte manipulieren
- Einschätzung: `@sanity/cli` ist ein **Entwicklungs-Tool** (CLI),
  läuft nicht im Live-Betrieb. Kein echtes Produktionsrisiko.
- Fix: `npm audit fix --force` würde `sanity@5.14.1` installieren —
  prüfen ob möglich, wenn Sanity ein stabiles Update veröffentlicht.

**Befund 2: `postcss < 8.5.10` (XSS in CSS-Output)**
- Wo: Next.js internes `postcss` (nicht unser Code)
- Was: Theoretisch könnte `</style>` in CSS-Output unescaped erscheinen
- Einschätzung: Das ist Next.js' eigenes gebündeltes postcss. Fix würde
  Next.js auf Version 9.3.3 downgraden — absolut nicht sinnvoll.
  Next.js selbst muss dieses Update intern deployen.
- Fix: Abwarten bis Next.js ein Sicherheitsupdate veröffentlicht.

**Empfehlung:** `npm audit` regelmäßig ausführen (z.B. monatlich) und
prüfen ob Updates ohne Breaking Changes verfügbar sind.

---

## Weiterführende Ressourcen

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — Die 10 häufigsten
  Web-Sicherheitslücken (englisch, sehr lesenswert)
- [MDN Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
  — Erklärung aller HTTP-Sicherheitsheader
- [Sanity Security](https://www.sanity.io/docs/security) — Sicherheitskonzept
  von Sanity CMS
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
  — Next.js eigene Sicherheits-Empfehlungen
