// Einmalig-Script: befüllt Seiteneinstellungen (Kontakt & Öffnungszeiten) in Sanity
// Ausführen mit: node scripts/seed-einstellungen.mjs

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

// Bestehendes einstellungen-Dokument suchen
const existing = await client.fetch('*[_type == "einstellungen"][0]{ _id }')

const data = {
  _type: 'einstellungen',
  telefon: '0711 578815-0',
  email: 'info@fewog.de',
  strasse: 'Lessingstraße 2',
  plzOrt: '70734 Fellbach',
  oeffnungszeiten: [
    { _key: 'oz1', tage: 'Mo–Do', zeiten: '09:00 – 12:00' },
    { _key: 'oz2', tage: 'Di + Do', zeiten: '14:00 – 17:00' },
  ],
  satzungPdfUrl: 'https://www.fewog.de/fileadmin/PDF/satzung/FEWOG_Satzung_2024.pdf',
}

if (existing?._id) {
  await client.patch(existing._id).set(data).commit()
  console.log(`✅ Einstellungen aktualisiert (${existing._id})`)
} else {
  const doc = await client.create(data)
  console.log(`✅ Einstellungen erstellt (${doc._id})`)
}

console.log('Kontakt & Adresse, Öffnungszeiten und Satzung-URL sind jetzt in Sanity.')
