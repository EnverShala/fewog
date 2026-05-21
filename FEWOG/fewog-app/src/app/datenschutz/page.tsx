import { sanityFetch, SanityLive } from '@/sanity/live';
import { datenschutzQuery } from '@/sanity/queries';
import DatenschutzClient from './datenschutz-client';

export default async function DatenschutzPage() {
  const { data } = await sanityFetch({ query: datenschutzQuery });

  return (
    <>
      <DatenschutzClient data={data ?? null} />
      <SanityLive />
    </>
  );
}
