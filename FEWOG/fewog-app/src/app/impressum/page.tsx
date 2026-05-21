import { sanityFetch, SanityLive } from '@/sanity/live';
import { impressumQuery } from '@/sanity/queries';
import ImpressumClient from './impressum-client';

export default async function ImpressumPage() {
  const { data } = await sanityFetch({ query: impressumQuery });

  return (
    <>
      <ImpressumClient data={data ?? null} />
      <SanityLive />
    </>
  );
}
