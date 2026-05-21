'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { urlFor } from '@/sanity/image';
import { formatDate } from '@/lib/format';
import type { NeuigkeitDetail } from '@/sanity/queries';

const ptComponents = {
  types: {
    image: ({ value }: { value: { asset?: object; alt?: string } }) =>
      value.asset ? (
        <img
          src={urlFor(value as Parameters<typeof urlFor>[0]).width(800).url()}
          alt={value.alt ?? ''}
          className="article-pt-img"
        />
      ) : null,
  },
};

export default function ArticleClient({ neuigkeit }: { neuigkeit: NeuigkeitDetail }) {
  const [page, setPage] = useState('aktuelles');

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <div className="wrap">
        <Link href="/aktuelles" className="article-back">
          ← Zurück zu Aktuelles
        </Link>
      </div>

      <section className="page-head page-head-simple">
        <div className="wrap">
          <div className="article-date">{formatDate(neuigkeit.datum)}</div>
          <h1 className="article-title">{neuigkeit.titel}</h1>
        </div>
      </section>

      <section className="article-section">
        <div className="wrap">
          {neuigkeit.titelbild && (
            <div className="article-hero">
              <img
                src={urlFor(neuigkeit.titelbild).width(1200).height(500).fit('crop').url()}
                alt={neuigkeit.titel}
              />
            </div>
          )}

          {neuigkeit.inhalt && (
            <div className="article-body">
              <PortableText value={neuigkeit.inhalt as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
