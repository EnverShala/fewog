import { sanityFetch, SanityLive } from '@/sanity/live';
import { kontaktQuery } from '@/sanity/queries';
import HomeClient from './home-client';

export default async function Home() {
  const { data: kontakt } = await sanityFetch({ query: kontaktQuery });

  return (
    <>
      <HomeClient kontakt={kontakt ?? null} />
      <SanityLive />
    </>
  );
}
