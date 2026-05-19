'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function UeberUnsPage() {
  const [page, setPage] = useState('ueberuns');

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      {/* Page Header */}
      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>WIR ÜBER UNS</h1>
          <p className="lead">Die Fellbacher Wohnungsbaugenossenschaft eG seit 1949</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="content-section">
        <div className="wrap">
          {/* Historie */}
          <div className="content-block">
            <h2>Historie</h2>
            <h3>Über 75 Jahre FEWOG in Fellbach</h3>
            <p>
              Die FEWOG wurde am 9. September 1948 gegründet. Gründungsmitglieder waren der Bürgermeister und Initiator Dr. Max Graser und weitere zwölf Genossen.
            </p>
            <p>
              Der genossenschaftliche Geist und die Fürsorge um das Wohl der Menschen bestimmte nicht nur in den Anfangsjahren das Handeln der Wohnungsbaugenossenschaft. In den ersten sieben Jahren seit der Entstehung konnten 600 Wohnungen erstellt und der damals dringende Wunsch nach einer eigenen Wohnung befriedigt werden.
            </p>
            <p>
              Der genossenschaftliche Ansatz erwies sich hierbei sehr schnell als tragfähig. Im Jahr 2023 konnte die FEWOG auf eine 75-jährige Entwicklung zurückblicken. Es galt immer Brücken über kulturelle und soziale Unterschiede zu überwinden, um eine Vielzahl von Bürgern mit Wohnraum zu versorgen.
            </p>
            <p>
              Die FEWOG ist eine Vermietungsgenossenschaft und derzeit der größte unabhängige Wohnungsanbieter in der Stadt Fellbach.
            </p>
            <p>
              Unser Dienstleistungsschwerpunkt liegt in der Bewirtschaftung unseres eigenen Bestandes an Mietwohnungen in Fellbach und in der Verwaltung von Mietwohnungen für Eigentümer.
            </p>
            <p>
              Die FEWOG besteht aus rund 1.200 Mitgliedern. Da wir über ein begrenztes Wohnungsangebot verfügen, können wir zur Zeit nicht allen Nachfragewünschen nach einer geeigneten Wohnung nachkommen.
            </p>
          </div>

          {/* Entwicklung */}
          <div className="content-block">
            <h2>Entwicklung</h2>
            <p>
              Kernaufgabe der Genossenschaft ist die Wohnungsversorgung unserer Mitglieder mit bezahlbarem Wohnraum sowie die Erhaltung sozial stabiler Bewohnerstrukturen.
            </p>
            <p>
              Für die zukünftige Strategie ist es wichtig, nicht nur die aktuelle Struktur der Haushalte im Hinblick auf Ihre Wohnkonzepte zu kennen, sondern auch deren zukünftige Entwicklung zu berücksichtigen.
            </p>

            <h3>Strategie FEWOG 2025</h3>
            <p>
              Grundsätzliches Ziel ist es, den Wohnungsbestand, die Gebäude, technischen Anlagen, Außenanlagen sowie Grundstücksflächen in ihrem Wert und ihrer Substanz zu erhalten.
            </p>
            <p>
              Als genossenschaftlicher Wohnungsanbieter sehen wir den demografischen Wandel der Gesellschaft als Chance und Herausforderung, bei einer überproportional wachsenden älteren Bevölkerung den steigenden Bedarf an seniorengerechtem und bezahlbarem Wohnraum bereitzustellen.
            </p>
            <p>
              Ziel für die FEWOG hierbei ist, unsere Mieter möglichst bis ins hohe Alter in ihren eigenen vier Wänden und somit in einem vertrauten Wohnumfeld zu belassen.
            </p>
            <p>
              Wir wollen Wohnungen jedem Alter gerecht für neue Mitglieder und Bestandsmieter in unseren Quartieren anbieten.
            </p>
            <p>
              Die seit Jahren anhaltende hohe Nachfrage stellt ein Potential für Neubau oder Zukauf von Wohnungen und Grundstücken dar, um zukünftig gesund und nachhaltig zu wachsen.
            </p>
          </div>

          {/* Organe */}
          <div className="content-block">
            <h2>Organe</h2>

            <h3>Vorstand</h3>
            <p><strong>Geschäftsführende Vorständin:</strong></p>
            <p>Nina Weigl</p>

            <p><strong>Nebenamtliche Vorstände:</strong></p>
            <p>Ingolf Epple<br />Julius Frick</p>

            <h3>Aufsichtsrat</h3>
            <p><strong>Vorsitzender:</strong></p>
            <p>Wolfgang Röder</p>

            <p><strong>stv. Vorsitzender:</strong></p>
            <p>Heiko Rihm</p>

            <p><strong>Schriftführerin:</strong></p>
            <p>Birgit Bäuerle</p>

            <p><strong>stv. Schriftführer:</strong></p>
            <p>Peter Hocker</p>

            <p><strong>Aufsichtsratsmitglied:</strong></p>
            <p>Daniela Pachner</p>
          </div>

          {/* Satzung */}
          <div className="content-block">
            <h2>Satzung</h2>
            <p>
              Hier können Sie die Satzung der Fellbacher Wohnungsbaugenossenschaft eG herunterladen.
            </p>
            <p>
              <a href="https://www.fewog.de/fileadmin/PDF/satzung/FEWOG_Satzung_2024.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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