import { defineLive } from 'next-sanity/live'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  // browserToken omitted intentionally — exposing the read token in the client
  // bundle would allow anyone to read unpublished draft content via the API.
})
