import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Keep Sanity and related packages out of the RSC webpack bundle.
  // Without this, Next.js resolves react with the 'react-server' export
  // condition when analyzing the studio route's dependency tree, which
  // strips useEffectEvent (sanity 5.x) and Controller/useForm (sanity-plugin-media).
  serverExternalPackages: [
    'sanity',
    'next-sanity',
    'sanity-plugin-media',
    'react-hook-form',
    '@sanity/vision',
    '@sanity/locale-de-de',
    '@sanity/ui',
    '@sanity/icons',
  ],
}

export default nextConfig
