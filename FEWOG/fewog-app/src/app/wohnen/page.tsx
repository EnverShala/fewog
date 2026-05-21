import { sanityFetch, SanityLive } from '@/sanity/live';
import { liegenschaftenQuery } from '@/sanity/queries';
import WohnenClient from './wohnen-client';

export default async function WohnenPage() {
  const { data: liegenschaften } = await sanityFetch({ query: liegenschaftenQuery });

  return (
    <>
      <WohnenClient liegenschaften={liegenschaften ?? []} />
      <SanityLive />
    </>
  );
}
