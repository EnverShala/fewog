import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/live';

const sitemapNeuigkeitenQuery = `
  *[_type == "neuigkeit" && veroeffentlicht == true] {
    "slug": slug.current,
    _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: neuigkeiten } = await sanityFetch({
    query: sitemapNeuigkeitenQuery,
  });

  const base = 'https://fewog.de';
  const staticRoutes = ['', '/wohnen', '/aktuelles', '/service', '/ueberuns', '/datenschutz', '/impressum'];

  return [
    ...staticRoutes.map(path => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...((neuigkeiten ?? []) as { slug: string; _updatedAt: string }[]).map(n => ({
      url: `${base}/aktuelles/${n.slug}`,
      lastModified: n._updatedAt ? new Date(n._updatedAt) : new Date(),
    })),
  ];
}
