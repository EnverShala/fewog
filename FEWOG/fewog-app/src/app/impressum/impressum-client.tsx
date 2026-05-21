'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import type { RechtsseiteData } from '@/sanity/queries';

const DEFAULT_INHALT: unknown[] = [
  { _type: 'block', _key: 'im1', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Anschrift', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im2', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'FEWOG Fellbacher Wohnungsbaugenossenschaft eG · Lessingstraße 2 · 70734 Fellbach', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im3', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Telefon: 0711 578815-0 · Telefax: 0711 578815-90 · E-Mail: info@fewog.de · Web: www.fewog.de', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im4', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Vertretungsberechtigter Vorstand', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im5', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Ingolf Epple · Nina Weigl · Julius Frick', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im6', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Aufsichtsratsvorsitzender', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im7', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Wolfgang Röder', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im8', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Verantwortlich für den Inhalt', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im9', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Nina Weigl', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im10', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Registereintrag', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im11', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Eingetragen im Genossenschaftsregister beim Amtsgericht Stuttgart · Registernummer: GenR 260108', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im12', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Umsatzsteuer-ID', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im13', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: 90491/80534', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im14', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Zuständige Aufsichtsbehörde', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im15', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'IHK Region Stuttgart', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im16', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Prüfungsverband', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im17', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'vbw – Verband baden-württembergischer Wohnungs- und Immobilienunternehmen e.V.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im18', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Öffnungszeiten', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im19', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Montag – Donnerstag: 9:00 – 12:30 Uhr · Freitag: 9:00 – 12:00 Uhr · Termine außerhalb der Sprechzeiten nach Vereinbarung.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im20', style: 'h2', children: [{ _type: 'span', _key: 's', text: 'Haftungshinweis', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im21', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'im22', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.', marks: [] }], markDefs: [] },
];

export default function ImpressumClient({ data }: { data: RechtsseiteData | null }) {
  const [page, setPage] = useState('');
  const inhalt = data?.inhalt?.length ? data.inhalt : DEFAULT_INHALT;

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>IMPRESSUM</h1>
          <p className="lead">Angaben gemäß § 5 TMG</p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="content-block">
            <PortableText value={inhalt as Parameters<typeof PortableText>[0]['value']} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
