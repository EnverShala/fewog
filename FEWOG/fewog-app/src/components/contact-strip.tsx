'use client';

import { Icon } from './icons';

export function ContactStrip() {
  return (
    <div className="contact-strip">
      <div className="contact-cell">
        <div className="lbl"><Icon.clock /> Sprechzeiten</div>
        <div className="val">
          Mo–Do · 09:00 – 12:00
          <small>Di + Do · 14:00 – 17:00</small>
        </div>
      </div>
      <div className="contact-cell">
        <div className="lbl"><Icon.contact /> Kontakt</div>
        <div className="val">
          <a href="tel:+4971157881500">0711 578815-0</a>
          <small>Fax: 0711 578815-90</small>
          <small><a href="mailto:info@fewog.de">info@fewog.de</a></small>
        </div>
      </div>
      <div className="contact-cell">
        <div className="lbl"><Icon.mail /> Geschäftsstelle</div>
        <div className="val">
          FEWOG – Fellbacher Wohnungsbaugenossenschaft eG
          <small>Lessingstraße 2 · 70734 Fellbach</small>
        </div>
      </div>
    </div>
  );
}