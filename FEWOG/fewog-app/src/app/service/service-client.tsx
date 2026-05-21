'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import type { Dokument } from '@/sanity/queries';

export default function ServiceClient({
  mietermagazin,
  geschaeftsbericht,
}: {
  mietermagazin: Dokument | null
  geschaeftsbericht: Dokument | null
}) {
  const [page, setPage] = useState('service');

  const mmUrl = mietermagazin?.dateiUrl ?? mietermagazin?.dateiAssetUrl;
  const gbUrl = geschaeftsbericht?.dateiUrl ?? geschaeftsbericht?.dateiAssetUrl;

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

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
            <p>
              Für alle Mieter und Mitglieder bieten wir einmal im Monat die Möglichkeit, sich bei unseren Mietertreffs auszutauschen. Hier können Sie über aktuelle Themen rund ums Haus sowie über das Leben und Wohnen bei und mit der FEWOG sprechen. Kommen Sie gerne vorbei, erzählen Sie, was Sie beschäftigt, erfahren Sie Neues und genießen Sie die Zeit mit netten Menschen.
            </p>
            <div className="info-box">
              <h4>Die nächsten Mietertreffen:</h4>
              <div className="info-grid">
                <div>
                  <strong>Lessingstraße 2, 70734 Fellbach</strong><br />
                  im 1. OG der FEWOG-Geschäftsstelle<br />
                  jeden ersten Dienstag im Monat<br />
                  von 15:00 bis 17:00 Uhr
                </div>
                <div>
                  <strong>Gartenstraße 84, 70734 Fellbach</strong><br />
                  im Gemeinschaftsraum (1. OG)<br />
                  jeden dritten Dienstag im Monat<br />
                  ab 15:30 Uhr
                </div>
              </div>
            </div>
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
            <p>
              Die FEWOG vermietet zwei Ferienwohnungen in ihrem Geschäftsgebäude an Mieter, Mitglieder und Besucher von Fellbach.
            </p>
            <p>
              <strong>Bei Fragen oder Interesse kontaktieren Sie uns bitte telefonisch unter der Nummer <a href="tel:+4971157881500">0711 578815-0</a> oder senden eine E-Mail an <a href="mailto:info@fewog.de">info@fewog.de</a>.</strong>
            </p>
            <p>
              Die Nutzungsbedingungen zu unseren Ferienwohnungen finden Sie <a href="https://www.fewog.de/fileadmin/PDF/_Nutzungsbedingungen_Ferienwohnung.pdf" target="_blank" rel="noopener noreferrer">hier</a>.
            </p>
            <h4>2-Zimmer Ferienwohnung</h4>
            <p>
              2-Zimmerwohnung mit 43 m² im 1. OG der Lessingstraße 2 in 70734 Fellbach, bestehend aus Wohnzimmer mit Schlafcouch, Schlafzimmer mit zwei Einzelbetten, Küche, Dusche/WC, Balkon und TV.
            </p>
            <p>Bettwäsche, Hand- und Geschirrtücher werden nicht gestellt.</p>
            <p><strong>Nutzungsgebühren:</strong></p>
            <p>
              <strong>60,00 €</strong> für 1 bis 3 Person pro Nacht<br />
              <strong>55,00 €</strong> für Endreinigung (einmalig)
            </p>
          </div>

          {/* Veranstaltungsraum */}
          <div className="content-block">
            <h2>Veranstaltungsraum</h2>
            <h3>Anmietung von Räumlichkeiten</h3>
            <h4>Sie suchen eine passende Räumlichkeit für:</h4>
            <ul>
              <li>Seminare</li>
              <li>Workshops</li>
              <li>Tagungen</li>
              <li>Schulungen</li>
              <li>WEG-Versammlungen</li>
            </ul>
            <p>
              Der <strong>Gemeinschaftsraum in der Gartenstraße 84</strong> (1. OG) in 70734 Fellbach eignet sich für Veranstaltungen bis ca. 24 Personen. <strong>Bestuhlung, Tische und Küche zur Eigennutzung sind vorhanden.</strong>
            </p>
            <p>
              Unser <strong>Veranstaltungsraum in der Lessingstraße 2</strong> (im 1. OG unserer Geschäftsstelle) in 70734 Fellbach bietet in ansprechendem Ambiente Platz für bis zu 35 Personen. <strong>Bestuhlung, Tische und Küche zur Eigennutzung sind vorhanden.</strong>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
