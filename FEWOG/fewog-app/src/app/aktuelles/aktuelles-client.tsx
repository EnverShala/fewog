'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { urlFor } from '@/sanity/image';
import { formatDate } from '@/lib/format';
import type { Neuigkeit, AktuellesInfoData } from '@/sanity/queries';

const DEFAULT_INFO_BLOECKE = [
  {
    _key: 'maengel',
    titel: 'Mängelmeldung',
    inhalt: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Wir bemühen uns Ihre Schadensmeldung schnellstens zu bearbeiten!', marks: ['em'] }], markDefs: [] },
      {
        _type: 'block', _key: 'b2', style: 'normal',
        children: [
          { _type: 'span', _key: 's1', text: 'Bitte kontaktieren Sie uns entweder per Mail über ', marks: ['em'] },
          { _type: 'span', _key: 's2', text: 'info@fewog.de', marks: ['em', 'link1'], },
          { _type: 'span', _key: 's3', text: ' oder telefonisch unter ', marks: ['em'] },
          { _type: 'span', _key: 's4', text: '0711/578815-0', marks: ['em', 'link2'] },
          { _type: 'span', _key: 's5', text: '. Je genauer Sie den Schaden beschreiben, umso besser können wir reagieren. Vielen Dank.', marks: ['em'] },
        ],
        markDefs: [
          { _key: 'link1', _type: 'link', href: 'mailto:info@fewog.de' },
          { _key: 'link2', _type: 'link', href: 'tel:+4971157881500' },
        ],
      },
    ] as unknown[],
  },
  {
    _key: 'wohnungssuchende',
    titel: 'Wohnungssuchende',
    inhalt: [
      {
        _type: 'block', _key: 'b1', style: 'normal',
        children: [
          { _type: 'span', _key: 's1', text: 'Da wir sehr viele Mitglieder unserer Genossenschaft für freie Wohnungen vorgemerkt haben, können wir derzeit leider keine Wohnungssuchenden aufnehmen, die nicht bereits Mitglieder unserer Genossenschaft sind. Sofern wir Wohnungen auf dem freien Markt anbieten können, finden Sie diese auf ', marks: [] },
          { _type: 'span', _key: 's2', text: 'Immoscout.de', marks: ['link1'] },
          { _type: 'span', _key: 's3', text: '.', marks: [] },
        ],
        markDefs: [{ _key: 'link1', _type: 'link', href: 'http://immoscout.de/' }],
      },
    ] as unknown[],
  },
  {
    _key: 'metrona',
    titel: 'Nutzerportal METRONA – Verbrauchsinformation',
    inhalt: [
      {
        _type: 'block', _key: 'b1', style: 'normal',
        children: [
          { _type: 'span', _key: 's1', text: 'Ab 01.12.2021 ist die neue Heizkostenverordnung in Kraft getreten. Diese sieht u. a. vor, dass Nutzer – sofern funkauslesbare Zähler verbaut sind – über Ihre Verbrauchsdaten informiert werden. Die Firma Metrona hat hierzu ein ', marks: [] },
          { _type: 'span', _key: 's2', text: 'Nutzerportal', marks: ['link1'] },
          { _type: 'span', _key: 's3', text: ' entwickelt. Nach einmaliger Registrierung erhalten Sie dort umfassende Informationen.', marks: [] },
        ],
        markDefs: [{ _key: 'link1', _type: 'link', href: 'https://nutzerportal.brunata-muenchen.de' }],
      },
    ] as unknown[],
  },
  {
    _key: 'mietertreff',
    titel: 'Mietertreff',
    inhalt: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Der Mietertreff in der Lessingstraße 2 findet jeden ersten Dienstag im Monat von 15:00 bis 17:00 Uhr statt. Im Juli und August finden dort keine Mietertreffen statt.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Im Gemeinschaftsraum der Gartenstraße 84 gibt es an jedem dritten Dienstag im Monat ab 15:30 Uhr einen „Offenen Treff".', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Weitere Infos finden Sie unter dem Menüpunkt SERVICE beziehungsweise ggf. in den entsprechenden Aushängen an den Häusern.', marks: [] }], markDefs: [] },
    ] as unknown[],
  },
];

export default function AktuellesClient({
  neuigkeiten,
  aktuellesInfo,
}: {
  neuigkeiten: Neuigkeit[]
  aktuellesInfo: AktuellesInfoData | null
}) {
  const [page, setPage] = useState('aktuelles');

  const infoBloecke = aktuellesInfo?.aktuellesInfoBloecke?.length
    ? aktuellesInfo.aktuellesInfoBloecke
    : DEFAULT_INFO_BLOECKE;

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>AKTUELLES</h1>
          <p className="lead">Neuigkeiten und Informationen von der FEWOG</p>
        </div>
      </section>

      {/* News-Karten */}
      <section className="news-section">
        <div className="wrap">
          {neuigkeiten.length === 0 ? (
            <p className="news-empty">Zurzeit keine aktuellen Meldungen.</p>
          ) : (
            <div className="news-grid">
              {neuigkeiten.map(n => (
                <Link key={n._id} href={`/aktuelles/${n.slug.current}`} className="news-card">
                  <div className="news-card-img">
                    {n.titelbild && (
                      <img
                        src={urlFor(n.titelbild).width(640).height(360).fit('crop').url()}
                        alt={n.titel}
                      />
                    )}
                  </div>
                  <div className="news-card-body">
                    <div className="news-card-date">{formatDate(n.datum)}</div>
                    <div className="news-card-title">{n.titel}</div>
                    {n.zusammenfassung && (
                      <p className="news-card-summary">{n.zusammenfassung}</p>
                    )}
                    <span className="news-card-link">Weiterlesen →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Informationsblöcke */}
      <section className="content-section">
        <div className="wrap">
          {infoBloecke.map((block) => (
            <div key={block._key} className="content-block">
              <h2>{block.titel}</h2>
              {block.inhalt && (
                <PortableText value={block.inhalt as Parameters<typeof PortableText>[0]['value']} />
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
