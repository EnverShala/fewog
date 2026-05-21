export const einstellungenQuery = `
  *[_type == "einstellungen"][0] {
    platzhalterbild
  }
`

export type Einstellungen = {
  platzhalterbild: { _type: 'image'; asset: { _ref: string; _type: 'reference' } } | null
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
