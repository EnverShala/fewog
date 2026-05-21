import type { NextConfig } from 'next'
import path from 'path'

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        // Alle Seiten außer /studio (Studio braucht Frames für die Vorschau)
        source: '/((?!studio).*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, { isServer, dir }) => {
    if (!isServer) {
      // Next.js 15.5.x ships React 19.2.0-canary which is missing useEffectEvent.
      // Sanity 5.x calls React.useEffectEvent in the structure tool.
      // Patch the compiled React dev + prod bundles to add a minimal polyfill.
      config.module.rules.unshift({
        test: /next[/\\]dist[/\\]compiled[/\\]react[/\\]cjs[/\\]react\.(development|production\.min)\.js$/,
        loader: path.resolve(dir, 'src/lib/use-effect-event-loader.cjs'),
      })
    }
    return config
  },
}

export default nextConfig
