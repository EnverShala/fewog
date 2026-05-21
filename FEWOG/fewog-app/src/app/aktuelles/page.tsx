import { sanityFetch, SanityLive } from '@/sanity/live';
import { neuigkeitenQuery } from '@/sanity/queries';
import AktuellesClient from './aktuelles-client';

export default async function AktuellesPage() {
  const { data: neuigkeiten } = await sanityFetch({ query: neuigkeitenQuery });

  return (
    <>
      <AktuellesClient neuigkeiten={neuigkeiten ?? []} />
      <SanityLive />
    </>
  );
}
