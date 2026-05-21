// Lädt Bilder von fewog.de in Sanity hoch und verknüpft sie mit den Liegenschaften.
// Dummy-Bilder (csm_dummy_*) werden übersprungen.
// Ausführen mit: node scripts/upload-images.mjs

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Readable } from 'stream'

const __dirname = dirname(fileURLToPath(import.meta.url))

const envPath = resolve(__dirname, '../.env.local')
const env = {}
for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key?.trim()) env[key.trim()] = rest.join('=').trim()
}

const client = createClient({
  projectId: 'uat139ly',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Nur Liegenschaften mit echten Bildern (kein csm_dummy)
const bildUrls = {
  "Adalbert-Stifter-Weg 3": "https://www.fewog.de/fileadmin/_processed_/6/6/csm_Adalbert-Stifter-Weg_3_355d3b726b.jpg",
  "Adalbert-Stifter-Weg 5": "https://www.fewog.de/fileadmin/_processed_/2/3/csm_Adalbert-Stifter-Weg_5_fa3c469536.jpg",
  "Ahornweg 8/10/12": "https://www.fewog.de/fileadmin/_processed_/d/d/csm_ahornweg-8-19-12-fewog-wohnungsvermittlung_6327da0c4c.jpg",
  "Birkenweg 22/24/26": "https://www.fewog.de/fileadmin/_processed_/4/4/csm_birkenweg-22-24-26-fewog-wohnungsvermittlung_17fa7e72d5.jpg",
  "Friedrich-List-Str. 11/13/15": "https://www.fewog.de/fileadmin/_processed_/a/7/csm_friedrich-list-strasse-11-13-15-fewog-wohnungsvermittlung_5b414aa052.jpg",
  "Goldammerweg 28/30": "https://www.fewog.de/fileadmin/_processed_/0/d/csm_Kleinfeldstr_49_Goldammerweg_28_30_0a9aa1eabb.jpg",
  "Im Hetzen 1/3": "https://www.fewog.de/fileadmin/_processed_/7/7/csm_Hetzen_1_3_73adba3b17.jpg",
  "Im Hetzen 6": "https://www.fewog.de/fileadmin/_processed_/6/1/csm_Hetzen_6_72d6cbaa51.jpg",
  "Im Hetzen 8": "https://www.fewog.de/fileadmin/_processed_/7/0/csm_Hetzen_8_0ebe462f75.jpg",
  "Im Vogelsang 2/4": "https://www.fewog.de/fileadmin/_processed_/e/6/csm_voglesang_2_4_1e58e0714b.jpg",
  "Im Hetzen 12/14/16": "https://www.fewog.de/fileadmin/_processed_/d/f/csm_Hetzen_12_14_16_dd7da2e531.jpg",
  "Kleinfeldstr. 49": "https://www.fewog.de/fileadmin/_processed_/0/d/csm_Kleinfeldstr_49_Goldammerweg_28_30_0a9aa1eabb.jpg",
  "Kleinfeldstr. 55": "https://www.fewog.de/fileadmin/_processed_/e/a/csm_kleinfeldstr_55_goldammerweg_32_34_84dbf63245.jpg",
  "Rembrandtweg 1/3/5": "https://www.fewog.de/fileadmin/_processed_/a/2/csm_rembrandtweg-1-3-5-fewog-wohnungsvermittlung_d11e434805.jpg",
  "Stettener Str. 24": "https://www.fewog.de/fileadmin/_processed_/7/1/csm_Stettenerstr_24_c19f301c34.jpg",
  "Stettener Str. 26": "https://www.fewog.de/fileadmin/_processed_/b/d/csm_Stettenerstr_26_852c610710.jpg",
  "Ulmenweg 24/26": "https://www.fewog.de/fileadmin/_processed_/a/0/csm_ulmenweg-24-26-fewog-wohnungsvermittlung_8d81690ad6.jpg",
  "Waiblinger Str. 58-64": "https://www.fewog.de/fileadmin/_processed_/f/5/csm_Waiblingerstr_58_64_7ae569dd18.jpg",
  "Waiblinger Str. 66": "https://www.fewog.de/fileadmin/_processed_/0/b/csm_waiblinger-strasse-58-60-62-64-66-fewog-wohnungsvermittlung_7c1b3465ba.jpg",
}

async function run() {
  const docs = await client.fetch('*[_type == "liegenschaft" && !defined(titelbild)]{_id, bezeichnung, slug}')
  console.log(`🖼  ${Object.keys(bildUrls).length} Bilder verfügbar, ${docs.length} Dokumente ohne Titelbild\n`)

  let uploaded = 0
  let skipped = 0

  for (const doc of docs) {
    const imageUrl = bildUrls[doc.bezeichnung]
    if (!imageUrl) {
      skipped++
      continue
    }

    try {
      process.stdout.write(`  ↑ ${doc.bezeichnung} ... `)
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          'Referer': 'https://www.fewog.de/',
          'Accept': 'image/webp,image/apng,image/*,*/*',
        },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      const stream = Readable.from(buffer)
      const asset = await client.assets.upload('image', stream, {
        filename: toSlug(doc.bezeichnung) + '.jpg',
        contentType: 'image/jpeg',
      })
      await client.patch(doc._id).set({
        titelbild: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
      }).commit()
      console.log('✓')
      uploaded++
    } catch (err) {
      console.log(`❌ ${err.message}`)
    }
  }

  console.log(`\n✅ ${uploaded} Bilder hochgeladen, ${skipped} ohne Bild (kein Foto vorhanden).`)
}

run().catch((err) => {
  console.error('❌ Fehler:', err.message)
  process.exit(1)
})
