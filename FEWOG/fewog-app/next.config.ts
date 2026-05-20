import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
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
