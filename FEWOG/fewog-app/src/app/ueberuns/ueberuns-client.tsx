'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import type { OrganeData, UeberunsseiteData } from '@/sanity/queries';

const SATZUNG_FALLBACK = 'https://www.fewog.de/fileadmin/PDF/satzung/FEWOG_Satzung_2024.pdf';

const DEFAULT_HISTORIE: unknown[] = [
  { _type: 'block', _key: 'h1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Die FEWOG wurde am 9. September 1948 gegründet. Gründungsmitglieder waren der Bürgermeister und Initiator Dr. Max Graser und weitere zwölf Genossen.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'h2', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Der genossenschaftliche Geist und die Fürsorge um das Wohl der Menschen bestimmte nicht nur in den Anfangsjahren das Handeln der Wohnungsbaugenossenschaft. In den ersten sieben Jahren seit der Entstehung konnten 600 Wohnungen erstellt und der damals dringende Wunsch nach einer eigenen Wohnung befriedigt werden.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'h3', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Der genossenschaftliche Ansatz erwies sich hierbei sehr schnell als tragfähig. Im Jahr 2023 konnte die FEWOG auf eine 75-jährige Entwicklung zurückblicken.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'h4', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Die FEWOG ist eine Vermietungsgenossenschaft und derzeit der größte unabhängige Wohnungsanbieter in der Stadt Fellbach.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'h5', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Unser Dienstleistungsschwerpunkt liegt in der Bewirtschaftung unseres eigenen Bestandes an Mietwohnungen in Fellbach und in der Verwaltung von Mietwohnungen für Eigentümer.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'h6', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Die FEWOG besteht aus rund 1.480 Mitgliedern.', marks: [] }], markDefs: [] },
];

const DEFAULT_ENTWICKLUNG: unknown[] = [
  { _type: 'block', _key: 'e1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Kernaufgabe der Genossenschaft ist die Wohnungsversorgung unserer Mitglieder mit bezahlbarem Wohnraum sowie die Erhaltung sozial stabiler Bewohnerstrukturen.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'e2', style: 'h3', children: [{ _type: 'span', _key: 's1', text: 'Strategie FEWOG 2025', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'e3', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Grundsätzliches Ziel ist es, den Wohnungsbestand, die Gebäude, technischen Anlagen, Außenanlagen sowie Grundstücksflächen in ihrem Wert und ihrer Substanz zu erhalten.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'e4', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Als genossenschaftlicher Wohnungsanbieter sehen wir den demografischen Wandel der Gesellschaft als Chance und Herausforderung, bei einer überproportional wachsenden älteren Bevölkerung den steigenden Bedarf an seniorengerechtem und bezahlbarem Wohnraum bereitzustellen.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'e5', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Wir wollen Wohnungen jedem Alter gerecht für neue Mitglieder und Bestandsmieter in unseren Quartieren anbieten.', marks: [] }], markDefs: [] },
];

export default function UeberUnsClient({
  organe,
  ueberunsseite,
}: {
  organe: OrganeData | null
  ueberunsseite: UeberunsseiteData | null
}) {
  const [page, setPage] = useState('ueberuns');

  const vorstand = organe?.vorstandMitglieder ?? [];
  const aufsichtsrat = organe?.aufsichtsratMitglieder ?? [];
  const satzungUrl = organe?.satzungPdfUrl ?? SATZUNG_FALLBACK;

  const historieInhalt = ueberunsseite?.historieInhalt?.length
    ? ueberunsseite.historieInhalt
    : DEFAULT_HISTORIE;
  const entwicklungInhalt = ueberunsseite?.entwicklungInhalt?.length
    ? ueberunsseite.entwicklungInhalt
    : DEFAULT_ENTWICKLUNG;

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>WIR ÜBER UNS</h1>
          <p className="lead">Die Fellbacher Wohnungsbaugenossenschaft eG seit 1948</p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="content-block">
            <h2>Historie</h2>
            <h3>Über 75 Jahre FEWOG in Fellbach</h3>
            <PortableText value={historieInhalt as Parameters<typeof PortableText>[0]['value']} />
          </div>

          <div className="content-block">
            <h2>Entwicklung</h2>
            <PortableText value={entwicklungInhalt as Parameters<typeof PortableText>[0]['value']} />
          </div>

          {/* Organe — aus Sanity */}
          <div className="content-block">
            <h2>Organe</h2>

            {vorstand.length > 0 ? (
              <>
                <h3>Vorstand</h3>
                {vorstand.map((p) => (
                  <p key={p._key}>
                    {p.rolle && <><strong>{p.rolle}:</strong><br /></>}
                    {p.name}
                  </p>
                ))}
              </>
            ) : (
              <>
                <h3>Vorstand</h3>
                <p><strong>Geschäftsführende Vorständin:</strong></p>
                <p>Nina Weigl</p>
                <p><strong>Nebenamtliche Vorstände:</strong></p>
                <p>Ingolf Epple<br />Julius Frick</p>
              </>
            )}

            {aufsichtsrat.length > 0 ? (
              <>
                <h3>Aufsichtsrat</h3>
                {aufsichtsrat.map((p) => (
                  <p key={p._key}>
                    {p.rolle && <><strong>{p.rolle}:</strong><br /></>}
                    {p.name}
                  </p>
                ))}
              </>
            ) : (
              <>
                <h3>Aufsichtsrat</h3>
                <p><strong>Vorsitzender:</strong></p><p>Wolfgang Röder</p>
                <p><strong>stv. Vorsitzender:</strong></p><p>Heiko Rihm</p>
                <p><strong>Schriftführerin:</strong></p><p>Birgit Bäuerle</p>
                <p><strong>stv. Schriftführer:</strong></p><p>Peter Hocker</p>
                <p><strong>Aufsichtsratsmitglied:</strong></p><p>Daniela Pachner</p>
              </>
            )}
          </div>

          <div className="content-block">
            <h2>Satzung</h2>
            <p>Hier können Sie die Satzung der Fellbacher Wohnungsbaugenossenschaft eG herunterladen.</p>
            <p>
              <a href={satzungUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Satzung als PDF herunterladen
              </a>
            </p>
            <p>
              Damit Sie PDF Dateien auf Ihrem Computer anschauen können, benötigen Sie den kostenlosen Adobe Reader. Sollte dieser nicht auf Ihrem Computer installiert sein, können Sie ihn <a href="http://get.adobe.com/de/reader/" target="_blank" rel="noopener noreferrer">hier herunterladen</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
