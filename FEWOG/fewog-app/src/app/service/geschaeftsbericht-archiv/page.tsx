import { sanityFetch, SanityLive } from '@/sanity/live';
import { dokumenteByKategorieQuery } from '@/sanity/queries';
import ArchivClient from '../archiv-client';

export default async function GeschaeftsberichtArchivPage() {
  const { data: dokumente } = await sanityFetch({
    query: dokumenteByKategorieQuery,
    params: { kategorie: 'geschaeftsbericht' },
  });

  return (
    <>
      <ArchivClient
        titel="GESCHÄFTSBERICHT ARCHIV"
        lead="Alle Geschäftsberichte der FEWOG zum Download"
        rubriktitel="Geschäftsbericht"
        navPage="service"
        dokumente={dokumente ?? []}
      />
      <SanityLive />
    </>
  );
}
