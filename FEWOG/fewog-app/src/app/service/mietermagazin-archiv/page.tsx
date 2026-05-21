import { sanityFetch, SanityLive } from '@/sanity/live';
import { dokumenteByKategorieQuery } from '@/sanity/queries';
import ArchivClient from '../archiv-client';

export default async function MietermagazinArchivPage() {
  const { data: dokumente } = await sanityFetch({
    query: dokumenteByKategorieQuery,
    params: { kategorie: 'mietermagazin' },
  });

  return (
    <>
      <ArchivClient
        titel="MIETERMAGAZIN ARCHIV"
        lead="Alle Ausgaben des FEWOG-Mietermagazins zum Download"
        rubriktitel="FEWOG Mietermagazin"
        dokumente={dokumente ?? []}
      />
      <SanityLive />
    </>
  );
}
