'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function AktuellesPage() {
  const [page, setPage] = useState('aktuelles');

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      {/* Page Header */}
      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>AKTUELLES</h1>
          <p className="lead">Aktuelles von der FEWOG</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="content-section">
        <div className="wrap">
          {/* Mängelmeldung */}
          <div className="content-block">
            <h2>Mängelmeldung</h2>
            <p>
              <em>Wir bemühen uns Ihre Schadensmeldung schnellstens zu bearbeiten!</em>
            </p>
            <p>
              <em>Bitte kontaktieren Sie uns entweder per Mail über </em>
              <a href="mailto:info@fewog.de">info@fewog.de</a>
              <em> oder telefonisch unter <a href="tel:+4971157881500">0711/578815-0</a>. Je genauer Sie den Schaden beschreiben, umso besser können wir reagieren. Vielen Dank.</em>
            </p>
          </div>

          {/* Wohnungssuchende */}
          <div className="content-block">
            <h2>Wohnungssuchende</h2>
            <p>
              Da wir sehr viele Mitglieder unserer Genossenschaft für freie Wohnungen vorgemerkt haben, können wir derzeit leider keine Wohnungssuchenden aufnehmen, die nicht bereits Mitglieder unserer Genossenschaft sind. Sofern wir Wohnungen auf dem freien Markt anbieten können, finden Sie diese auf <a href="http://immoscout.de/" target="_blank" rel="noopener noreferrer">Immoscout.de</a>.
            </p>
          </div>

          {/* Nutzerportal METRONA */}
          <div className="content-block">
            <h2>Nutzerportal METRONA - Verbrauchsinformation</h2>
            <p>
              Ab 01.12.2021 ist die neue Heizkostenverordnung in Kraft getreten. Diese sieht u. a. vor, dass Nutzer – sofern funkauslesbare Zähler verbaut sind – über Ihre Verbrauchsdaten informiert werden. Die Firma Metrona hat hierzu ein <a href="https://nutzerportal.brunata-muenchen.de" target="_blank" rel="noopener noreferrer">Nutzerportal</a> entwickelt. Nach einmaliger Registrierung erhalten Sie dort umfassende Informationen.
            </p>
          </div>

          {/* Mietertreff */}
          <div className="content-block">
            <h2>Mietertreff</h2>
            <p>
              Der Mietertreff in der Lessingstraße 2 findet jeden ersten Dienstag im Monat von 15:00 bis 17:00 Uhr statt. Im Juli und August finden dort keine Mietertreffen statt.
            </p>
            <p>
              Im Gemeinschaftsraum der Gartenstraße 84 gibt es an jedem dritten Dienstag im Monat ab 15:30 Uhr einen {`„Offenen Treff"`}.
            </p>
            <p>
              Weitere Infos finden Sie unter dem Menüpunkt SERVICE beziehungsweise ggf. in den entsprechenden Aushängen an den Häusern.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}