import { defineType, defineField } from 'sanity'

export const einstellungenSchema = defineType({
  name: 'einstellungen',
  title: 'Seiteneinstellungen',
  type: 'document',
  groups: [
    { name: 'kontakt', title: 'Kontakt & Adresse', default: true },
    { name: 'oeffnungszeiten', title: 'Öffnungszeiten' },
    { name: 'organe', title: 'Vorstand & Aufsichtsrat' },
    { name: 'bilder', title: 'Bilder' },
    { name: 'startseite', title: 'Startseite' },
    { name: 'serviceseite', title: 'Service-Seite' },
    { name: 'ueberunsseite', title: 'Über uns' },
    { name: 'aktuellesseite', title: 'Aktuelles-Seite' },
  ],
  fields: [
    // ── Kontakt ──────────────────────────────────────────────────────────────
    defineField({
      name: 'strasse',
      title: 'Straße & Hausnummer',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'plzOrt',
      title: 'PLZ und Ort',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefonnummer',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'bankverbindung',
      title: 'Bankverbindung (IBAN)',
      type: 'string',
      group: 'kontakt',
    }),

    // ── Öffnungszeiten ───────────────────────────────────────────────────────
    defineField({
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      type: 'array',
      group: 'oeffnungszeiten',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tage', title: 'Tage (z.B. Mo–Fr)', type: 'string' }),
            defineField({ name: 'zeiten', title: 'Zeiten (z.B. 8:00–12:00)', type: 'string' }),
          ],
          preview: {
            select: { title: 'tage', subtitle: 'zeiten' },
          },
        },
      ],
    }),

    // ── Organe ───────────────────────────────────────────────────────────────
    defineField({
      name: 'vorstandMitglieder',
      title: 'Vorstandsmitglieder',
      type: 'array',
      group: 'organe',
      of: [{
        type: 'object',
        name: 'person',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'rolle', title: 'Funktion', type: 'string', description: 'z.B. „Geschäftsführende Vorständin"' }),
        ],
        preview: { select: { title: 'name', subtitle: 'rolle' } },
      }],
    }),
    defineField({
      name: 'aufsichtsratMitglieder',
      title: 'Aufsichtsratsmitglieder',
      type: 'array',
      group: 'organe',
      of: [{
        type: 'object',
        name: 'person',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'rolle', title: 'Funktion', type: 'string', description: 'z.B. „Vorsitzender"' }),
        ],
        preview: { select: { title: 'name', subtitle: 'rolle' } },
      }],
    }),
    defineField({
      name: 'satzungPdfUrl',
      title: 'Satzung PDF (URL)',
      type: 'url',
      group: 'organe',
      description: 'Link zur aktuellen Satzung als PDF',
    }),

    // ── Bilder ───────────────────────────────────────────────────────────────
    defineField({
      name: 'platzhalterbild',
      title: 'Platzhalterbild für Liegenschaften',
      description: 'Wird automatisch angezeigt, wenn für eine Liegenschaft kein eigenes Bild hochgeladen wurde.',
      type: 'image',
      group: 'bilder',
      options: { hotspot: true },
    }),

    // ── Startseite ───────────────────────────────────────────────────────────
    defineField({
      name: 'heroBild',
      title: 'Hero-Bild (Startseite)',
      description: 'Großes Foto im Hero-Bereich der Startseite',
      type: 'image',
      group: 'startseite',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroTitel',
      title: 'Hero-Überschrift',
      type: 'string',
      group: 'startseite',
      description: 'Große Überschrift im Hero-Bereich der Startseite',
      initialValue: 'Genossenschaftliches Wohnen.',
    }),
    defineField({
      name: 'heroUntertitel',
      title: 'Hero-Untertitel (Eyebrow)',
      type: 'string',
      group: 'startseite',
      description: 'Kleiner Text über der Überschrift',
      initialValue: 'Wohnraum für Fellbach · seit 1948',
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero-Einleitungstext',
      type: 'text',
      rows: 3,
      group: 'startseite',
      description: 'Kurzer Absatz unter der Hero-Überschrift',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero-Button Text',
      type: 'string',
      group: 'startseite',
      initialValue: 'Wohnungsbestand ansehen',
    }),
    defineField({
      name: 'statsWohneinheiten',
      title: 'Statistik: Wohneinheiten',
      type: 'number',
      group: 'startseite',
      initialValue: 612,
    }),
    defineField({
      name: 'statsMitglieder',
      title: 'Statistik: Mitglieder',
      type: 'number',
      group: 'startseite',
      initialValue: 1480,
    }),
    defineField({
      name: 'serviceDockEyebrow',
      title: 'Service-Bereich: Eyebrow-Text',
      type: 'string',
      group: 'startseite',
      initialValue: 'Digitales Mieterbüro',
    }),
    defineField({
      name: 'serviceDockTitel',
      title: 'Service-Bereich: Überschrift',
      type: 'string',
      group: 'startseite',
      initialValue: 'Service mit einem Klick.',
    }),
    defineField({
      name: 'serviceDockLead',
      title: 'Service-Bereich: Beschreibungstext',
      type: 'text',
      rows: 2,
      group: 'startseite',
      initialValue: 'Die wichtigsten Anliegen ohne Umwege. Tagsüber telefonisch, jederzeit digital.',
    }),
    defineField({
      name: 'serviceTiles',
      title: 'Service-Kacheln',
      description: 'Die drei Service-Kacheln auf der Startseite (Reihenfolge: Schaden, Downloads, Mietertreff)',
      type: 'array',
      group: 'startseite',
      of: [{
        type: 'object',
        name: 'serviceTile',
        fields: [
          defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'beschreibung', title: 'Beschreibungstext', type: 'text', rows: 2 }),
          defineField({ name: 'link', title: 'Link (URL oder mailto:)', type: 'string' }),
        ],
        preview: { select: { title: 'titel', subtitle: 'beschreibung' } },
      }],
      validation: (r) => r.max(3),
    }),

    // ── Service-Seite ────────────────────────────────────────────────────────
    defineField({
      name: 'mietertreffBeschreibung',
      title: 'Mietertreff: Beschreibungstext',
      type: 'text',
      rows: 4,
      group: 'serviceseite',
    }),
    defineField({
      name: 'mietertreffOrte',
      title: 'Mietertreff: Veranstaltungsorte',
      type: 'array',
      group: 'serviceseite',
      of: [{
        type: 'object',
        name: 'mietertreffOrt',
        fields: [
          defineField({ name: 'adresse', title: 'Adresse', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'details', title: 'Details (Raum, Zeit, Rhythmus)', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'adresse', subtitle: 'details' } },
      }],
    }),
    defineField({
      name: 'ferienwohnungenInhalt',
      title: 'Ferienwohnungen: Inhalt',
      type: 'array',
      group: 'serviceseite',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'veranstaltungsraumInhalt',
      title: 'Veranstaltungsraum: Inhalt',
      type: 'array',
      group: 'serviceseite',
      of: [
        { type: 'block' },
      ],
    }),

    // ── Über uns ─────────────────────────────────────────────────────────────
    defineField({
      name: 'historieInhalt',
      title: 'Historie: Textinhalt',
      type: 'array',
      group: 'ueberunsseite',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'entwicklungInhalt',
      title: 'Entwicklung & Strategie: Textinhalt',
      type: 'array',
      group: 'ueberunsseite',
      of: [
        { type: 'block' },
      ],
    }),

    // ── Aktuelles-Seite ──────────────────────────────────────────────────────
    defineField({
      name: 'aktuellesInfoBloecke',
      title: 'Informations-Blöcke auf der Aktuelles-Seite',
      description: 'Statische Informationsblöcke unter den Neuigkeiten (z.B. Mängelmeldung, Wohnungssuchende, METRONA)',
      type: 'array',
      group: 'aktuellesseite',
      of: [{
        type: 'object',
        name: 'infoBlock',
        fields: [
          defineField({ name: 'titel', title: 'Überschrift', type: 'string', validation: (r) => r.required() }),
          defineField({
            name: 'inhalt',
            title: 'Inhalt',
            type: 'array',
            of: [{ type: 'block' }],
          }),
        ],
        preview: { select: { title: 'titel' } },
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Seiteneinstellungen' }
    },
  },
})
