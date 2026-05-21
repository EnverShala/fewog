import { sanityFetch, SanityLive } from '@/sanity/live';
import { organeQuery } from '@/sanity/queries';
import UeberUnsClient from './ueberuns-client';

export default async function UeberUnsPage() {
  const { data: organe } = await sanityFetch({ query: organeQuery });

  return (
    <>
      <UeberUnsClient organe={organe ?? null} />
      <SanityLive />
    </>
  );
}
