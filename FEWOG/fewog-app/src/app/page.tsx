import { sanityFetch, SanityLive } from '@/sanity/live';
import { kontaktQuery, startseiteQuery } from '@/sanity/queries';
import HomeClient from './home-client';

export default async function Home() {
  const [{ data: kontakt }, { data: startseite }] = await Promise.all([
    sanityFetch({ query: kontaktQuery }),
    sanityFetch({ query: startseiteQuery }),
  ]);

  return (
    <>
      <HomeClient kontakt={kontakt ?? null} startseite={startseite ?? null} />
      <SanityLive />
    </>
  );
}
