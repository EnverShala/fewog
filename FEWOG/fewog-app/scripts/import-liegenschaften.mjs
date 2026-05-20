// Einmalig-Script: importiert alle 50 Liegenschaften aus data.ts in Sanity
// Ausführen mit: node scripts/import-liegenschaften.mjs
//
// Benötigt: SANITY_API_WRITE_TOKEN in .env.local (Admin-Token aus Sanity Manage)

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// .env.local manuell einlesen
const envPath = resolve(__dirname, '../.env.local')
const env = {}
for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key?.trim()) env[key.trim()] = rest.join('=').trim()
}

const token = env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN fehlt in .env.local')
  console.error('   Erstelle einen Admin-Token in Sanity Manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'uat139ly',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Slug aus Bezeichnung generieren
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const liegenschaften = [
  { id: "p01", district: "kern", street: "Adalbert-Stifter-Weg 3", year: 1990, units: 12, rooms: "2–3 Zi.", sanierung: 2015, imageUrl: "https://www.fewog.de/fileadmin/_processed_/6/6/csm_Adalbert-Stifter-Weg_3_355d3b726b.jpg" },
  { id: "p02", district: "kern", street: "Adalbert-Stifter-Weg 5", year: 1992, units: 14, rooms: "2–3 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/2/3/csm_Adalbert-Stifter-Weg_5_fa3c469536.jpg" },
  { id: "p03", district: "kern", street: "Ahornweg 8/10/12", year: 1975, units: 28, rooms: "2–4 Zi.", sanierung: 2012, imageUrl: "https://www.fewog.de/fileadmin/_processed_/d/d/csm_ahornweg-8-19-12-fewog-wohnungsvermittlung_6327da0c4c.jpg" },
  { id: "p04", district: "kern", street: "Albrecht-Dürer-Weg 31/33", year: 1980, units: 24, rooms: "2–4 Zi.", sanierung: 2016, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p05", district: "kern", street: "Birkenweg 22/24/26", year: 1978, units: 30, rooms: "2–4 Zi.", sanierung: 2014, imageUrl: "https://www.fewog.de/fileadmin/_processed_/4/4/csm_birkenweg-22-24-26-fewog-wohnungsvermittlung_17fa7e72d5.jpg" },
  { id: "p06", district: "kern", street: "Daimlerstr. 19/21", year: 1965, units: 18, rooms: "1–3 Zi.", sanierung: 2010, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p07", district: "kern", street: "Eberhardtstr. 77/79/81", year: 1968, units: 36, rooms: "2–4 Zi.", sanierung: 2017, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p08", district: "kern", street: "Eberhardtstr. 83/85/87", year: 1970, units: 32, rooms: "2–4 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p09", district: "kern", street: "Friedrich-List-Str. 11/13/15", year: 1972, units: 28, rooms: "2–4 Zi.", sanierung: 2013, imageUrl: "https://www.fewog.de/fileadmin/_processed_/a/7/csm_friedrich-list-strasse-11-13-15-fewog-wohnungsvermittlung_5b414aa052.jpg" },
  { id: "p10", district: "kern", street: "Gartenstr. 77", year: 1955, units: 8, rooms: "1–2 Zi.", sanierung: 2008, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p11", district: "kern", street: "Gartenstr. 81", year: 1956, units: 10, rooms: "1–2 Zi.", sanierung: 2009, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p12", district: "kern", street: "Gartenstr. 84/86", year: 1958, units: 16, rooms: "1–3 Zi.", sanierung: 2011, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p13", district: "kern", street: "Gartenstr. 88/90", year: 1960, units: 18, rooms: "2–3 Zi.", sanierung: 2014, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p14", district: "kern", street: "Gartenstr. 92/94", year: 1962, units: 20, rooms: "2–3 Zi.", sanierung: 2016, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p15", district: "kern", street: "Gartenstr. 96", year: 1964, units: 12, rooms: "1–2 Zi.", sanierung: 2013, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p16", district: "kern", street: "Goldammerweg 12/14", year: 1985, units: 22, rooms: "2–3 Zi.", sanierung: 2020, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p17", district: "kern", street: "Goldammerweg 16/18", year: 1987, units: 24, rooms: "2–4 Zi.", sanierung: 2021, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p18", district: "kern", street: "Goldammerweg 28/30", year: 1989, units: 20, rooms: "2–3 Zi.", sanierung: 2022, imageUrl: "https://www.fewog.de/fileadmin/_processed_/0/d/csm_Kleinfeldstr_49_Goldammerweg_28_30_0a9aa1eabb.jpg" },
  { id: "p19", district: "kern", street: "Grünewaldweg 1", year: 1982, units: 16, rooms: "1–3 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p20", district: "kern", street: "Gutenbergstr. 6/8", year: 1951, units: 14, rooms: "1–2 Zi.", sanierung: 2007, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p21", district: "kern", street: "Hohenzollernstr. 1/3", year: 1953, units: 18, rooms: "1–3 Zi.", sanierung: 2008, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p22", district: "kern", street: "Im Hetzen 1/3", year: 1949, units: 12, rooms: "1–2 Zi.", sanierung: 2006, imageUrl: "https://www.fewog.de/fileadmin/_processed_/7/7/csm_Hetzen_1_3_73adba3b17.jpg" },
  { id: "p23", district: "kern", street: "Im Hetzen 2/4", year: 1950, units: 14, rooms: "1–2 Zi.", sanierung: 2007, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p24", district: "kern", street: "Im Hetzen 6", year: 1952, units: 10, rooms: "1–2 Zi.", sanierung: 2009, imageUrl: "https://www.fewog.de/fileadmin/_processed_/6/1/csm_Hetzen_6_72d6cbaa51.jpg" },
  { id: "p25", district: "kern", street: "Im Hetzen 8", year: 1954, units: 12, rooms: "1–2 Zi.", sanierung: 2010, imageUrl: "https://www.fewog.de/fileadmin/_processed_/7/0/csm_Hetzen_8_0ebe462f75.jpg" },
  { id: "p26", district: "kern", street: "Im Vogelsang 2/4", year: 1976, units: 24, rooms: "2–4 Zi.", sanierung: 2015, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/6/csm_voglesang_2_4_1e58e0714b.jpg" },
  { id: "p27", district: "kern", street: "Im Hetzen 12/14/16", year: 1957, units: 20, rooms: "1–3 Zi.", sanierung: 2011, imageUrl: "https://www.fewog.de/fileadmin/_processed_/d/f/csm_Hetzen_12_14_16_dd7da2e531.jpg" },
  { id: "p28", district: "kern", street: "Kleinfeldstr. 35", year: 1979, units: 16, rooms: "2–3 Zi.", sanierung: 2017, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p29", district: "kern", street: "Kleinfeldstr. 37", year: 1981, units: 18, rooms: "2–3 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p30", district: "kern", street: "Kleinfeldstr. 43", year: 1983, units: 20, rooms: "2–4 Zi.", sanierung: 2020, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p31", district: "kern", street: "Kleinfeldstr. 49", year: 1984, units: 22, rooms: "2–4 Zi.", sanierung: 2021, imageUrl: "https://www.fewog.de/fileadmin/_processed_/0/d/csm_Kleinfeldstr_49_Goldammerweg_28_30_0a9aa1eabb.jpg" },
  { id: "p32", district: "kern", street: "Kleinfeldstr. 55", year: 1986, units: 24, rooms: "2–4 Zi.", sanierung: 2022, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/a/csm_kleinfeldstr_55_goldammerweg_32_34_84dbf63245.jpg" },
  { id: "p33", district: "kern", street: "Lessingstr. 2", year: 1959, units: 16, rooms: "1–3 Zi.", sanierung: 2012, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p34", district: "kern", street: "Meißner Str. 49/51", year: 1966, units: 20, rooms: "2–3 Zi.", sanierung: 2014, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p35", district: "kern", street: "Pfarrstr. 84", year: 1961, units: 14, rooms: "1–2 Zi.", sanierung: 2009, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p36", district: "kern", street: "Pfarrstr. 88", year: 1963, units: 16, rooms: "1–3 Zi.", sanierung: 2010, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p37", district: "kern", street: "Rembrandtweg 1/3/5", year: 1973, units: 26, rooms: "2–4 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/a/2/csm_rembrandtweg-1-3-5-fewog-wohnungsvermittlung_d11e434805.jpg" },
  { id: "p38", district: "kern", street: "Rembrandtweg 7/9/11", year: 1974, units: 28, rooms: "2–4 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p39", district: "kern", street: "Rubensweg 2/4/6", year: 1977, units: 30, rooms: "2–4 Zi.", sanierung: 2016, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p40", district: "kern", street: "Stettener Str. 24", year: 1988, units: 18, rooms: "2–3 Zi.", sanierung: 2023, imageUrl: "https://www.fewog.de/fileadmin/_processed_/7/1/csm_Stettenerstr_24_c19f301c34.jpg" },
  { id: "p41", district: "kern", street: "Stettener Str. 26", year: 1990, units: 16, rooms: "2–3 Zi.", sanierung: 2024, imageUrl: "https://www.fewog.de/fileadmin/_processed_/b/d/csm_Stettenerstr_26_852c610710.jpg" },
  { id: "p42", district: "kern", street: "Stettener Str. 26/1", year: 1991, units: 12, rooms: "1–2 Zi.", sanierung: 2024, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p43", district: "kern", street: "Tizianweg 11", year: 1967, units: 18, rooms: "1–3 Zi.", sanierung: 2015, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p44", district: "kern", street: "Ulmenweg 15/17/19/21", year: 1969, units: 32, rooms: "2–4 Zi.", sanierung: 2017, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p45", district: "kern", street: "Ulmenweg 16/18", year: 1971, units: 24, rooms: "2–4 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p46", district: "kern", street: "Ulmenweg 20/22", year: 1975, units: 26, rooms: "2–4 Zi.", sanierung: 2020, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p47", district: "kern", street: "Ulmenweg 24/26", year: 1978, units: 28, rooms: "2–4 Zi.", sanierung: 2021, imageUrl: "https://www.fewog.de/fileadmin/_processed_/a/0/csm_ulmenweg-24-26-fewog-wohnungsvermittlung_8d81690ad6.jpg" },
  { id: "p48", district: "kern", street: "Urbanstr. 23", year: 1980, units: 20, rooms: "2–3 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg" },
  { id: "p49", district: "kern", street: "Waiblinger Str. 58-64", year: 1994, units: 36, rooms: "2–4 Zi.", sanierung: 2023, imageUrl: "https://www.fewog.de/fileadmin/_processed_/f/5/csm_Waiblingerstr_58_64_7ae569dd18.jpg" },
  { id: "p50", district: "kern", street: "Waiblinger Str. 66", year: 1996, units: 32, rooms: "2–4 Zi.", sanierung: 2024, imageUrl: "https://www.fewog.de/fileadmin/_processed_/0/b/csm_waiblinger-strasse-58-60-62-64-66-fewog-wohnungsvermittlung_7c1b3465ba.jpg" },
]

async function run() {
  console.log(`📦 Importiere ${liegenschaften.length} Liegenschaften nach Sanity...`)

  // Bereits vorhandene Slugs abfragen um Duplikate zu vermeiden
  const existing = await client.fetch('*[_type == "liegenschaft"].slug.current')
  const existingSlugs = new Set(existing)

  let created = 0
  let skipped = 0

  for (const p of liegenschaften) {
    const slug = toSlug(p.street)

    if (existingSlugs.has(slug)) {
      console.log(`  ⏭ Übersprungen (existiert): ${p.street}`)
      skipped++
      continue
    }

    const doc = {
      _type: 'liegenschaft',
      bezeichnung: p.street,
      adresse: p.street + ', Fellbach',
      slug: { _type: 'slug', current: slug },
      stadtteil: p.district,
      baujahr: p.year,
      anzahlWohnungen: p.units,
      zimmer: p.rooms,
      sanierungsjahr: p.sanierung,
      verfuegbar: false,
    }

    await client.create(doc)
    console.log(`  ✓ ${p.street}`)
    created++
  }

  console.log(`\n✅ Fertig: ${created} erstellt, ${skipped} übersprungen.`)
  console.log('   Bilder müssen manuell im Studio hochgeladen werden.')
}

run().catch((err) => {
  console.error('❌ Fehler:', err.message)
  process.exit(1)
})
