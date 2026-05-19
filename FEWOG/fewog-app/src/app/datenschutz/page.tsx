'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function DatenschutzPage() {
  const [page, setPage] = useState('');

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
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <h3>Datenerfassung auf unserer Website</h3>
            <p>
              Die Daten auf dieser Website werden zum einen durch Sie selbst erhoben — etwa durch
              Angaben in Kontaktformularen — und zum anderen automatisch durch unsere IT-Systeme
              erfasst (z. B. Browsertyp, Betriebssystem, Uhrzeit des Seitenaufrufs).
            </p>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            <h3>Ihre Rechte</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
              Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
              die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu
              weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </div>

          <div className="content-block">
            <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <h3>Verantwortliche Stelle</h3>
            <p>
              FEWOG – Fellbacher Wohnungsbaugenossenschaft eG<br />
              Lessingstraße 2, 70734 Fellbach<br />
              Telefon: 0711 578815-0<br />
              E-Mail: <a href="mailto:info@fewog.de">info@fewog.de</a>
            </p>
            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
              Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine
              formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
              Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
            <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p>
              Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei
              der zuständigen Aufsichtsbehörde zu (Art. 77 DSGVO):
            </p>
            <p>
              Landesbeauftragter für Datenschutz und Informationsfreiheit<br />
              Königstr. 10a, 70173 Stuttgart<br />
              Telefon: 0711 / 6155410<br />
              E-Mail: <a href="mailto:poststelle@lfdi.bwl.de">poststelle@lfdi.bwl.de</a>
            </p>
            <h3>SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
              Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und
              an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </div>

          <div className="content-block">
            <h2>3. Datenschutzbeauftragter</h2>
            <p>
              Wir haben einen externen Datenschutzbeauftragten bestellt:
            </p>
            <p>
              WTS Wohnungswirtschaftliche Treuhand Stuttgart GmbH<br />
              Hohe Str. 16, 70174 Stuttgart<br />
              Telefon: 0711 / 16345410<br />
              E-Mail: <a href="mailto:dsb-wts@wts-vbw.de">dsb-wts@wts-vbw.de</a>
            </p>
          </div>

          <div className="content-block">
            <h2>4. Datenerfassung auf unserer Website</h2>
            <h3>Cookies</h3>
            <p>
              Unsere Internetseiten verwenden sogenannte „Cookies". Cookies sind kleine Textdateien
              und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für
              die Dauer einer Sitzung (Session-Cookies) oder dauerhaft auf Ihrem Endgerät gespeichert
              (permanente Cookies). Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht.
              Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen.
            </p>
            <p>
              Rechtsgrundlage für den Einsatz technisch notwendiger Cookies ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <h3>Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
              Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
            </p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <h3>Mängelmeldeformular</h3>
            <p>
              Wenn Sie uns per Formular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. Die Daten verbleiben bei uns, bis Sie
              uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
              der Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen bleiben unberührt.
            </p>
          </div>

          <div className="content-block">
            <h2>5. Analyse-Tools und Werbung</h2>
            <h3>Google Analytics</h3>
            <p>
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist
              die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
            </p>
            <p>
              Google Analytics verwendet sogenannte „Cookies". Die durch den Cookie erzeugten
              Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server
              von Google in den USA übertragen und dort gespeichert. Rechtsgrundlage: Art. 6 Abs. 1
              lit. f DSGVO.
            </p>
            <p>
              Die IP-Anonymisierung ist auf dieser Website aktiviert, sodass Ihre IP-Adresse von
              Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen
              Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.
            </p>
            <p>
              Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer
              Browser-Software verhindern oder das Browser-Add-on zur Deaktivierung von Google
              Analytics unter{' '}
              <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">
                tools.google.com/dlpage/gaoptout
              </a>{' '}
              herunterladen und installieren.
            </p>
            <h3>Google reCAPTCHA</h3>
            <p>
              Wir nutzen „Google reCAPTCHA" auf unseren Websites. Anbieter ist Google Inc.,
              1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Mit reCAPTCHA soll überprüft
              werden, ob die Dateneingabe auf unseren Websites durch einen Menschen oder durch ein
              automatisiertes Programm erfolgt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div className="content-block">
            <h2>6. Plugins und Tools</h2>
            <h3>Google Web Fonts</h3>
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Web Fonts,
              die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die
              benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
              Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von
              Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse
              unsere Website aufgerufen wurde. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              Weitere Informationen zu Google Web Fonts finden Sie unter{' '}
              <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer">
                developers.google.com/fonts/faq
              </a>{' '}
              und in der Datenschutzerklärung von Google:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
