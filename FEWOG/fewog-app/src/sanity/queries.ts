export const einstellungenQuery = `
  *[_type == "einstellungen"][0] {
    platzhalterbild
  }
`

export type Einstellungen = {
  platzhalterbild: { _type: 'image'; asset: { _ref: string; _type: 'reference' } } | null
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
