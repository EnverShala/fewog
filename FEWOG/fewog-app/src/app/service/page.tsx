import { sanityFetch, SanityLive } from '@/sanity/live';
import { aktuellMietermagazinQuery, aktuellGeschaeftsberichtQuery, serviceseiteQuery } from '@/sanity/queries';
import ServiceClient from './service-client';

export default async function ServicePage() {
  const [{ data: mietermagazin }, { data: geschaeftsbericht }, { data: serviceseite }] = await Promise.all([
    sanityFetch({ query: aktuellMietermagazinQuery }),
    sanityFetch({ query: aktuellGeschaeftsberichtQuery }),
    sanityFetch({ query: serviceseiteQuery }),
  ]);

  return (
    <>
      <ServiceClient
        mietermagazin={mietermagazin ?? null}
        geschaeftsbericht={geschaeftsbericht ?? null}
        serviceseite={serviceseite ?? null}
      />
      <SanityLive />
    </>
  );
}
