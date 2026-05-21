// Einmalig-Script: importiert alle Archiv-Dokumente in Sanity
// Ausführen mit: node scripts/import-dokumente.mjs

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const env = {}
for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key?.trim()) env[key.trim()] = rest.join('=').trim()
}

const token = env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN fehlt in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: 'uat139ly',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const MIETERMAGAZIN = [
  { jahr: 2025, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/2025_12_09_FEWOG_Mietermagazin_2025_WEB.pdf' },
  { jahr: 2024, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/2024_12_19_FEWOG_Mietermagazin_2024_ANSICHT.pdf' },
  { jahr: 2023, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin_2023.pdf' },
  { jahr: 2022, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin_2022.pdf' },
  { jahr: 2021, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/Mietermagazin_FEWOG_2021.pdf' },
  { jahr: 2020, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/Mietermagazin_2020.pdf' },
  { jahr: 2019, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin_2019_Ansicht_web.pdf' },
  { jahr: 2018, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin-2018_web.pdf' },
  { jahr: 2017, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin2017_web.pdf' },
  { jahr: 2016, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin2016.pdf' },
  { jahr: 2015, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG-mietermagazin_2015.pdf' },
]

const GESCHAEFTSBERICHT = [
  { jahr: 2024, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_geschaeftsbericht_2024.pdf' },
  { jahr: 2023, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2023.pdf' },
  { jahr: 2022, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_FEWOG_2022_Ansicht.pdf' },
  { jahr: 2021, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2021.pdf' },
  { jahr: 2020, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_FEWOG_2020.pdf' },
  { jahr: 2019, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Homepage_Geschaeftsbericht_FEWOG_2019.pdf' },
  { jahr: 2018, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_NEU_FEWOG_web.pdf' },
  { jahr: 2017, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2018_RZ.pdf' },
  { jahr: 2016, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2016.pdf' },
  { jahr: 2015, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_2016_klein-2.pdf' },
  { jahr: 2014, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/geschaeftsbericht_fewog_2014.pdf' },
]

const docs = [
  ...MIETERMAGAZIN.map(({ jahr, url }) => ({
    _type: 'dokument',
    titel: `FEWOG Mietermagazin ${jahr}`,
    kategorie: 'mietermagazin',
    jahr,
    dateiUrl: url,
  })),
  ...GESCHAEFTSBERICHT.map(({ jahr, url }) => ({
    _type: 'dokument',
    titel: `Geschäftsbericht ${jahr}`,
    kategorie: 'geschaeftsbericht',
    jahr,
    dateiUrl: url,
  })),
]

console.log(`📄 Importiere ${docs.length} Dokumente…`)
let ok = 0
for (const doc of docs) {
  try {
    await client.create(doc)
    console.log(`  ✓ ${doc.titel}`)
    ok++
  } catch (e) {
    console.error(`  ✗ ${doc.titel}: ${e.message}`)
  }
}
console.log(`\n✅ ${ok}/${docs.length} Dokumente importiert.`)
console.log('Nächster Schritt: Vorstand & Aufsichtsrat im Studio unter Seiteneinstellungen → Vorstand & Aufsichtsrat eintragen.')
