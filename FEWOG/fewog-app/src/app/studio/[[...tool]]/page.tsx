import { NextStudio } from 'next-sanity/studio'

export { metadata, viewport } from 'next-sanity/studio'

export const dynamic = 'force-dynamic'

export default async function StudioPage() {
  const { default: config } = await import('../../../../sanity.config')
  return <NextStudio config={config} />
}
