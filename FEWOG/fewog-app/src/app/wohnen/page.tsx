import { sanityFetch, SanityLive } from '@/sanity/live';
import { liegenschaftenQuery, einstellungenQuery } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import WohnenClient from './wohnen-client';

export default async function WohnenPage() {
  const [{ data: liegenschaften }, { data: einstellungen }] = await Promise.all([
    sanityFetch({ query: liegenschaftenQuery }),
    sanityFetch({ query: einstellungenQuery }),
  ]);

  const fallbackImageUrl = einstellungen?.platzhalterbild
    ? urlFor(einstellungen.platzhalterbild).width(600).height(400).fit('crop').url()
    : null;

  return (
    <>
      <WohnenClient
        liegenschaften={liegenschaften ?? []}
        fallbackImageUrl={fallbackImageUrl}
      />
      <SanityLive />
    </>
  );
}
