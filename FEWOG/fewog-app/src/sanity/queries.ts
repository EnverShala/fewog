export const einstellungenQuery = `
  *[_type == "einstellungen"][0] {
    platzhalterbild
  }
`

export type Einstellungen = {
  platzhalterbild: { _type: 'image'; asset: { _ref: string; _type: 'reference' } } | null
}

export const kontaktQuery = `
  *[_type == "einstellungen"][0] {
    telefon,
    email,
    strasse,
    plzOrt,
    oeffnungszeiten[] { _key, tage, zeiten }
  }
`

export type KontaktData = {
  telefon: string | null
  email: string | null
  strasse: string | null
  plzOrt: string | null
  oeffnungszeiten: { _key: string; tage: string; zeiten: string }[] | null
}

export const organeQuery = `
  *[_type == "einstellungen"][0] {
    vorstandMitglieder[] { _key, name, rolle },
    aufsichtsratMitglieder[] { _key, name, rolle },
    satzungPdfUrl
  }
`

export type OrganeData = {
  vorstandMitglieder: { _key: string; name: string; rolle: string | null }[] | null
  aufsichtsratMitglieder: { _key: string; name: string; rolle: string | null }[] | null
  satzungPdfUrl: string | null
}

export const aktuellMietermagazinQuery = `
  *[_type == "dokument" && kategorie == "mietermagazin"] | order(jahr desc) [0] {
    _id, titel, jahr, dateiUrl, "dateiAssetUrl": datei.asset->url
  }
`

export const aktuellGeschaeftsberichtQuery = `
  *[_type == "dokument" && kategorie == "geschaeftsbericht"] | order(jahr desc) [0] {
    _id, titel, jahr, dateiUrl, "dateiAssetUrl": datei.asset->url
  }
`

export const dokumenteByKategorieQuery = `
  *[_type == "dokument" && kategorie == $kategorie] | order(jahr desc) {
    _id, titel, jahr, dateiUrl, "dateiAssetUrl": datei.asset->url
  }
`

export type Dokument = {
  _id: string
  titel: string
  jahr: number
  dateiUrl: string | null
  dateiAssetUrl: string | null
}

type SanityImage = { _type: 'image'; asset: { _ref: string; _type: 'reference' }; hotspot?: object }

export const neuigkeitenQuery = `
  *[_type == "neuigkeit" && veroeffentlicht == true] | order(datum desc) {
    _id,
    titel,
    slug,
    datum,
    zusammenfassung,
    titelbild
  }
`

export const neuigkeitBySlugQuery = `
  *[_type == "neuigkeit" && slug.current == $slug && veroeffentlicht == true][0] {
    _id,
    titel,
    datum,
    titelbild,
    inhalt
  }
`

export type Neuigkeit = {
  _id: string
  titel: string
  slug: { current: string }
  datum: string
  zusammenfassung: string | null
  titelbild: SanityImage | null
}

export type NeuigkeitDetail = {
  _id: string
  titel: string
  datum: string
  titelbild: SanityImage | null
  inhalt: unknown[] | null
}

export const liegenschaftenQuery = `
  *[_type == "liegenschaft"] | order(bezeichnung asc) {
    _id,
    bezeichnung,
    stadtteil,
    baujahr,
    anzahlWohnungen,
    zimmer,
    sanierungsjahr,
    verfuegbar,
    titelbild
  }
`

export type Liegenschaft = {
  _id: string
  bezeichnung: string
  stadtteil: 'kern' | 'schmiden' | 'oeffingen' | null
  baujahr: number | null
  anzahlWohnungen: number | null
  zimmer: string | null
  sanierungsjahr: number | null
  verfuegbar: boolean | null
  titelbild: { _type: 'image'; asset: { _ref: string; _type: 'reference' }; hotspot?: object } | null
}

// ── Startseite ──────────────────────────────────────────────────────────────

export const startseiteQuery = `
  *[_type == "einstellungen"][0] {
    heroTitel,
    heroUntertitel,
    heroLead,
    heroCtaText,
    statsWohneinheiten,
    statsMitglieder,
    serviceDockEyebrow,
    serviceDockTitel,
    serviceDockLead,
    serviceTiles[] { _key, titel, beschreibung, link }
  }
`

export type StartseiteData = {
  heroTitel: string | null
  heroUntertitel: string | null
  heroLead: string | null
  heroCtaText: string | null
  statsWohneinheiten: number | null
  statsMitglieder: number | null
  serviceDockEyebrow: string | null
  serviceDockTitel: string | null
  serviceDockLead: string | null
  serviceTiles: { _key: string; titel: string; beschreibung: string | null; link: string | null }[] | null
}

// ── Service-Seite ────────────────────────────────────────────────────────────

export const serviceseiteQuery = `
  *[_type == "einstellungen"][0] {
    mietertreffBeschreibung,
    mietertreffOrte[] { _key, adresse, details },
    ferienwohnungenInhalt,
    veranstaltungsraumInhalt
  }
`

export type ServiceseiteData = {
  mietertreffBeschreibung: string | null
  mietertreffOrte: { _key: string; adresse: string; details: string | null }[] | null
  ferienwohnungenInhalt: unknown[] | null
  veranstaltungsraumInhalt: unknown[] | null
}

// ── Über uns ─────────────────────────────────────────────────────────────────

export const ueberunsseiteQuery = `
  *[_type == "einstellungen"][0] {
    historieInhalt,
    entwicklungInhalt
  }
`

export type UeberunsseiteData = {
  historieInhalt: unknown[] | null
  entwicklungInhalt: unknown[] | null
}

// ── Aktuelles-Seite ──────────────────────────────────────────────────────────

export const aktuellesInfoQuery = `
  *[_type == "einstellungen"][0] {
    aktuellesInfoBloecke[] { _key, titel, inhalt }
  }
`

export type AktuellesInfoData = {
  aktuellesInfoBloecke: { _key: string; titel: string; inhalt: unknown[] | null }[] | null
}

// ── Datenschutz & Impressum ──────────────────────────────────────────────────

export const datenschutzQuery = `
  *[_type == "datenschutz" && _id == "datenschutzerklaerung"][0] {
    inhalt
  }
`

export const impressumQuery = `
  *[_type == "impressum" && _id == "impressum"][0] {
    inhalt
  }
`

export type RechtsseiteData = {
  inhalt: unknown[] | null
}
