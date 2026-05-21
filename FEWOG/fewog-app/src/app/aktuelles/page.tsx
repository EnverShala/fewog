import { sanityFetch, SanityLive } from '@/sanity/live';
import { neuigkeitenQuery, aktuellesInfoQuery } from '@/sanity/queries';
import AktuellesClient from './aktuelles-client';

export default async function AktuellesPage() {
  const [{ data: neuigkeiten }, { data: aktuellesInfo }] = await Promise.all([
    sanityFetch({ query: neuigkeitenQuery }),
    sanityFetch({ query: aktuellesInfoQuery }),
  ]);

  return (
    <>
      <AktuellesClient neuigkeiten={neuigkeiten ?? []} aktuellesInfo={aktuellesInfo ?? null} />
      <SanityLive />
    </>
  );
}
