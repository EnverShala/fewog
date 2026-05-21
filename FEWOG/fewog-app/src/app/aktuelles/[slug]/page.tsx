import { notFound } from 'next/navigation';
import { sanityFetch, SanityLive } from '@/sanity/live';
import { neuigkeitBySlugQuery } from '@/sanity/queries';
import ArticleClient from './article-client';

export default async function NeuigkeitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: neuigkeit } = await sanityFetch({
    query: neuigkeitBySlugQuery,
    params: { slug },
  });

  if (!neuigkeit) notFound();

  return (
    <>
      <ArticleClient neuigkeit={neuigkeit} />
      <SanityLive />
    </>
  );
}
