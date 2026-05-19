'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function ImpressumPage() {
  const [page, setPage] = useState('');

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
            <h2>Anschrift</h2>
            <p>
              FEWOG Fellbacher Wohnungsbaugenossenschaft eG<br />
              Lessingstraße 2<br />
              70734 Fellbach
            </p>
            <p>
              Telefon: 0711 578815-0<br />
              Telefax: 0711 578815-90<br />
              E-Mail: <a href="mailto:info@fewog.de">info@fewog.de</a><br />
              Web: <a href="https://www.fewog.de" target="_blank" rel="noopener noreferrer">www.fewog.de</a>
            </p>
          </div>

          <div className="content-block">
            <h2>Vertretungsberechtigter Vorstand</h2>
            <p>Ingolf Epple · Nina Weigl · Julius Frick</p>

            <h2>Aufsichtsratsvorsitzender</h2>
            <p>Wolfgang Röder</p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>Nina Weigl</p>
          </div>

          <div className="content-block">
            <h2>Registereintrag</h2>
            <p>
              Eingetragen im Genossenschaftsregister beim Amtsgericht Stuttgart<br />
              Registernummer: GenR 260108
            </p>
          </div>

          <div className="content-block">
            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: 90491/80534</p>

            <h2>Zuständige Aufsichtsbehörde</h2>
            <p>IHK Region Stuttgart</p>

            <h2>Prüfungsverband</h2>
            <p>vbw – Verband baden-württembergischer Wohnungs- und Immobilienunternehmen e.V.</p>
          </div>

          <div className="content-block">
            <h2>Öffnungszeiten</h2>
            <p>
              Montag – Donnerstag: 9:00 – 12:30 Uhr<br />
              Freitag: 9:00 – 12:00 Uhr<br />
              Termine außerhalb der Sprechzeiten nach Vereinbarung.
            </p>
          </div>

          <div className="content-block">
            <h2>Haftungshinweis</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
              externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
