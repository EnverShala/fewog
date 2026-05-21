import { sanityFetch, SanityLive } from '@/sanity/live';
import { organeQuery, ueberunsseiteQuery } from '@/sanity/queries';
import UeberUnsClient from './ueberuns-client';

export default async function UeberUnsPage() {
  const [{ data: organe }, { data: ueberunsseite }] = await Promise.all([
    sanityFetch({ query: organeQuery }),
    sanityFetch({ query: ueberunsseiteQuery }),
  ]);

  return (
    <>
      <UeberUnsClient organe={organe ?? null} ueberunsseite={ueberunsseite ?? null} />
      <SanityLive />
    </>
  );
}
