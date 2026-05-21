import { sanityFetch, SanityLive } from '@/sanity/live';
import { aktuellMietermagazinQuery, aktuellGeschaeftsberichtQuery } from '@/sanity/queries';
import ServiceClient from './service-client';

export default async function ServicePage() {
  const [{ data: mietermagazin }, { data: geschaeftsbericht }] = await Promise.all([
    sanityFetch({ query: aktuellMietermagazinQuery }),
    sanityFetch({ query: aktuellGeschaeftsberichtQuery }),
  ]);

  return (
    <>
      <ServiceClient
        mietermagazin={mietermagazin ?? null}
        geschaeftsbericht={geschaeftsbericht ?? null}
      />
      <SanityLive />
    </>
  );
}
