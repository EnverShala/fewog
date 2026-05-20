import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // stega deaktiviert für statische Metadaten (verhindert unsichtbare Zeichen in meta tags)
  stega: false,
})
