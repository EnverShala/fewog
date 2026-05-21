'use client';

import { PortableText } from '@portabletext/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import type { Dokument, ServiceseiteData } from '@/sanity/queries';

const DEFAULT_MIETERTREFF_BESCHREIBUNG =
  'Für alle Mieter und Mitglieder bieten wir einmal im Monat die Möglichkeit, sich bei unseren Mietertreffs auszutauschen. Hier können Sie über aktuelle Themen rund ums Haus sowie über das Leben und Wohnen bei und mit der FEWOG sprechen. Kommen Sie gerne vorbei, erzählen Sie, was Sie beschäftigt, erfahren Sie Neues und genießen Sie die Zeit mit netten Menschen.';

const DEFAULT_MIETERTREFF_ORTE = [
  {
    _key: 'lessing',
    adresse: 'Lessingstraße 2, 70734 Fellbach',
    details: 'im 1. OG der FEWOG-Geschäftsstelle\njedem ersten Dienstag im Monat\nvon 15:00 bis 17:00 Uhr',
  },
  {
    _key: 'garten',
    adresse: 'Gartenstraße 84, 70734 Fellbach',
    details: 'im Gemeinschaftsraum (1. OG)\njedem dritten Dienstag im Monat\nab 15:30 Uhr',
  },
];

const DEFAULT_FERIENWOHNUNGEN: unknown[] = [
  {
    _type: 'block', _key: 'fw1', style: 'normal',
    children: [{ _type: 'span', _key: 's1', text: 'Die FEWOG vermietet zwei Ferienwohnungen in ihrem Geschäftsgebäude an Mieter, Mitglieder und Besucher von Fellbach.', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'fw2', style: 'normal',
    children: [
      { _type: 'span', _key: 's1', text: 'Bei Fragen oder Interesse kontaktieren Sie uns bitte telefonisch unter ', marks: ['strong'] },
      { _type: 'span', _key: 's2', text: '0711 578815-0', marks: ['strong'] },
      { _type: 'span', _key: 's3', text: ' oder senden eine E-Mail an ', marks: ['strong'] },
      { _type: 'span', _key: 's4', text: 'info@fewog.de', marks: ['strong'] },
      { _type: 'span', _key: 's5', text: '.', marks: ['strong'] },
    ],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'fw3', style: 'h4',
    children: [{ _type: 'span', _key: 's1', text: '2-Zimmer Ferienwohnung', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'fw4', style: 'normal',
    children: [{ _type: 'span', _key: 's1', text: '2-Zimmerwohnung mit 43 m² im 1. OG der Lessingstraße 2 in 70734 Fellbach, bestehend aus Wohnzimmer mit Schlafcouch, Schlafzimmer mit zwei Einzelbetten, Küche, Dusche/WC, Balkon und TV.', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'fw5', style: 'normal',
    children: [{ _type: 'span', _key: 's1', text: 'Nutzungsgebühren: 60,00 € für 1 bis 3 Personen pro Nacht · 55,00 € Endreinigung (einmalig)', marks: [] }],
    markDefs: [],
  },
];

const DEFAULT_VERANSTALTUNGSRAUM: unknown[] = [
  {
    _type: 'block', _key: 'vr1', style: 'h4',
    children: [{ _type: 'span', _key: 's1', text: 'Sie suchen eine passende Räumlichkeit für:', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'vr2', style: 'normal',
    children: [{ _type: 'span', _key: 's1', text: 'Seminare · Workshops · Tagungen · Schulungen · WEG-Versammlungen', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'vr3', style: 'normal',
    children: [
      { _type: 'span', _key: 's1', text: 'Der ', marks: [] },
      { _type: 'span', _key: 's2', text: 'Gemeinschaftsraum in der Gartenstraße 84', marks: ['strong'] },
      { _type: 'span', _key: 's3', text: ' (1. OG) eignet sich für Veranstaltungen bis ca. 24 Personen. ', marks: [] },
      { _type: 'span', _key: 's4', text: 'Bestuhlung, Tische und Küche zur Eigennutzung sind vorhanden.', marks: ['strong'] },
    ],
    markDefs: [],
  },
  {
    _type: 'block', _key: 'vr4', style: 'normal',
    children: [
      { _type: 'span', _key: 's1', text: 'Unser ', marks: [] },
      { _type: 'span', _key: 's2', text: 'Veranstaltungsraum in der Lessingstraße 2', marks: ['strong'] },
      { _type: 'span', _key: 's3', text: ' (1. OG) bietet Platz für bis zu 35 Personen. ', marks: [] },
      { _type: 'span', _key: 's4', text: 'Bestuhlung, Tische und Küche zur Eigennutzung sind vorhanden.', marks: ['strong'] },
    ],
    markDefs: [],
  },
];

export default function ServiceClient({
  mietermagazin,
  geschaeftsbericht,
  serviceseite,
}: {
  mietermagazin: Dokument | null
  geschaeftsbericht: Dokument | null
  serviceseite: ServiceseiteData | null
}) {
  const mmUrl = mietermagazin?.dateiUrl ?? mietermagazin?.dateiAssetUrl;
  const gbUrl = geschaeftsbericht?.dateiUrl ?? geschaeftsbericht?.dateiAssetUrl;

  const mietertreffBeschreibung = serviceseite?.mietertreffBeschreibung ?? DEFAULT_MIETERTREFF_BESCHREIBUNG;
  const mietertreffOrte = serviceseite?.mietertreffOrte?.length
    ? serviceseite.mietertreffOrte
    : DEFAULT_MIETERTREFF_ORTE;
  const ferienwohnungenInhalt = serviceseite?.ferienwohnungenInhalt?.length
    ? serviceseite.ferienwohnungenInhalt
    : DEFAULT_FERIENWOHNUNGEN;
  const veranstaltungsraumInhalt = serviceseite?.veranstaltungsraumInhalt?.length
    ? serviceseite.veranstaltungsraumInhalt
    : DEFAULT_VERANSTALTUNGSRAUM;

  return (
    <div className="min-h-screen">
      <Nav />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>SERVICE</h1>
          <p className="lead">Zusätzliche Dienstleistungen der FEWOG</p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          {/* Mietertreff */}
          <div id="mietertreff" className="content-block" style={{ scrollMarginTop: 80 }}>
            <h2>Mietertreff</h2>
            <h3>Raum für Gespräche und Miteinander</h3>
            <p>{mietertreffBeschreibung}</p>
            {mietertreffOrte.length > 0 && (
              <div className="info-box">
                <h4>Die nächsten Mietertreffen:</h4>
                <div className="info-grid">
                  {mietertreffOrte.map((ort) => (
                    <div key={ort._key}>
                      <strong>{ort.adresse}</strong>
                      {ort.details && ort.details.split('\n').map((line, i) => (
                        <span key={i}><br />{line}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mietermagazin */}
          <div id="mietermagazin" className="content-block" style={{ scrollMarginTop: 80 }}>
            <h2>Mietermagazin</h2>
            <h3>Aktuelles Mietermagazin der FEWOG</h3>
            <p>
              Einmal im Jahr informieren wir alle mit unserem FEWOG-Mietermagazin über Projekte, Aktuelles und Allgemeines zum Thema Wohnen.
            </p>
            {mmUrl ? (
              <p>
                <a href={mmUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {mietermagazin!.titel} als PDF herunterladen
                </a>
              </p>
            ) : (
              <p className="muted">Aktuelles Mietermagazin wird in Kürze bereitgestellt.</p>
            )}
            <p>
              <a href="/service/mietermagazin-archiv">zum Archiv {'>>'}</a>
            </p>
            <p>
              Damit Sie PDF Dateien auf Ihrem Computer anschauen können, benötigen Sie den kostenlosen Adobe Reader. Sollte dieser nicht auf Ihrem Computer installiert sein, können Sie ihn <a href="http://get.adobe.com/de/reader/" target="_blank" rel="noopener noreferrer">hier herunterladen</a>.
            </p>
          </div>

          {/* Geschäftsbericht */}
          <div className="content-block">
            <h2>Geschäftsbericht</h2>
            <h3>Aktueller Geschäftsbericht der FEWOG</h3>
            {gbUrl ? (
              <p>
                <a href={gbUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {geschaeftsbericht!.titel} als PDF ansehen
                </a>
              </p>
            ) : (
              <p className="muted">Aktueller Geschäftsbericht wird in Kürze bereitgestellt.</p>
            )}
            <p>
              <a href="/service/geschaeftsbericht-archiv">zum Archiv {'>>'}</a>
            </p>
            <p>
              Damit Sie PDF Dateien auf Ihrem Computer anschauen können, benötigen Sie den kostenlosen Adobe Reader. Sollte dieser nicht auf Ihrem Computer installiert sein, können Sie ihn <a href="http://get.adobe.com/de/reader/" target="_blank" rel="noopener noreferrer">hier herunterladen</a>.
            </p>
          </div>

          {/* Ferienwohnungen */}
          <div className="content-block">
            <h2>Ferienwohnungen</h2>
            <h3>Wohnen auf Zeit bei der FEWOG</h3>
            <PortableText value={ferienwohnungenInhalt as Parameters<typeof PortableText>[0]['value']} />
          </div>

          {/* Veranstaltungsraum */}
          <div className="content-block">
            <h2>Veranstaltungsraum</h2>
            <h3>Anmietung von Räumlichkeiten</h3>
            <PortableText value={veranstaltungsraumInhalt as Parameters<typeof PortableText>[0]['value']} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
