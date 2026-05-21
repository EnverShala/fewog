'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import type { RechtsseiteData } from '@/sanity/queries';

const DEFAULT_INHALT: unknown[] = [
  { _type: 'block', _key: 'ds1', style: 'h2', children: [{ _type: 'span', _key: 's', text: '1. Datenschutz auf einen Blick', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds2', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Allgemeine Hinweise', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds3', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds4', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Datenerfassung auf unserer Website', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds5', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Die Daten auf dieser Website werden zum einen durch Sie selbst erhoben — etwa durch Angaben in Kontaktformularen — und zum anderen automatisch durch unsere IT-Systeme erfasst (z. B. Browsertyp, Betriebssystem, Uhrzeit des Seitenaufrufs).', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds6', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds7', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Ihre Rechte', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds8', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds9', style: 'h2', children: [{ _type: 'span', _key: 's', text: '2. Allgemeine Hinweise und Pflichtinformationen', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds10', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Datenschutz', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds11', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds12', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Verantwortliche Stelle', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds13', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'FEWOG – Fellbacher Wohnungsbaugenossenschaft eG · Lessingstraße 2, 70734 Fellbach · Telefon: 0711 578815-0 · E-Mail: info@fewog.de', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds14', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Widerruf Ihrer Einwilligung zur Datenverarbeitung', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds15', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds16', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Beschwerderecht bei der zuständigen Aufsichtsbehörde', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds17', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu (Art. 77 DSGVO): Landesbeauftragter für Datenschutz und Informationsfreiheit · Königstr. 10a, 70173 Stuttgart · Telefon: 0711 / 6155410 · E-Mail: poststelle@lfdi.bwl.de', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds18', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'SSL- bzw. TLS-Verschlüsselung', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds19', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds20', style: 'h2', children: [{ _type: 'span', _key: 's', text: '3. Datenschutzbeauftragter', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds21', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Wir haben einen externen Datenschutzbeauftragten bestellt: WTS Wohnungswirtschaftliche Treuhand Stuttgart GmbH · Hohe Str. 16, 70174 Stuttgart · Telefon: 0711 / 16345410 · E-Mail: dsb-wts@wts-vbw.de', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds22', style: 'h2', children: [{ _type: 'span', _key: 's', text: '4. Datenerfassung auf unserer Website', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds23', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Cookies', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds24', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Unsere Internetseiten verwenden sogenannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds25', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Server-Log-Dateien', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds26', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien (Browsertyp, Betriebssystem, Referrer URL, Hostname, Uhrzeit, IP-Adresse). Eine Zusammenführung mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds27', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Mängelmeldeformular', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds28', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Wenn Sie uns per Formular Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds29', style: 'h2', children: [{ _type: 'span', _key: 's', text: '5. Analyse-Tools und Werbung', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds30', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Google Analytics', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds31', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics (Google Inc., Mountain View, CA, USA). Die IP-Anonymisierung ist aktiviert. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds32', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Google reCAPTCHA', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds33', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Wir nutzen „Google reCAPTCHA" zur Überprüfung, ob Dateneingaben durch Menschen oder automatisierte Programme erfolgen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds34', style: 'h2', children: [{ _type: 'span', _key: 's', text: '6. Plugins und Tools', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds35', style: 'h3', children: [{ _type: 'span', _key: 's', text: 'Google Web Fonts', marks: [] }], markDefs: [] },
  { _type: 'block', _key: 'ds36', style: 'normal', children: [{ _type: 'span', _key: 's', text: 'Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web Fonts von Google. Beim Aufruf nimmt Ihr Browser Verbindung zu Google-Servern auf. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.', marks: [] }], markDefs: [] },
];

export default function DatenschutzClient({ data }: { data: RechtsseiteData | null }) {
  const [page, setPage] = useState('');
  const inhalt = data?.inhalt?.length ? data.inhalt : DEFAULT_INHALT;

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>DATENSCHUTZ</h1>
          <p className="lead">Datenschutzerklärung gemäß DSGVO</p>
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
