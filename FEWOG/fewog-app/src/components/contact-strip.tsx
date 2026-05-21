'use client';

import { Icon } from './icons';
import type { KontaktData } from '@/sanity/queries';

const FALLBACK: KontaktData = {
  telefon: '0711 578815-0',
  email: 'info@fewog.de',
  strasse: 'Lessingstraße 2',
  plzOrt: '70734 Fellbach',
  oeffnungszeiten: [
    { _key: 'a', tage: 'Mo–Do', zeiten: '09:00 – 12:00' },
    { _key: 'b', tage: 'Di + Do', zeiten: '14:00 – 17:00' },
  ],
};

export function ContactStrip({ data }: { data?: KontaktData | null }) {
  const d = data ?? FALLBACK;
  const telefon = d.telefon ?? FALLBACK.telefon!;
  const email = d.email ?? FALLBACK.email!;
  const adresse = d.strasse && d.plzOrt
    ? `${d.strasse} · ${d.plzOrt}`
    : `${FALLBACK.strasse} · ${FALLBACK.plzOrt}`;
  const zeiten = d.oeffnungszeiten?.length ? d.oeffnungszeiten : FALLBACK.oeffnungszeiten!;

  return (
    <div className="contact-strip">
      <div className="contact-cell">
        <div className="lbl"><Icon.clock /> Sprechzeiten</div>
        <div className="val">
          {zeiten[0]?.tage} · {zeiten[0]?.zeiten}
          {zeiten.slice(1).map(z => (
            <small key={z._key}>{z.tage} · {z.zeiten}</small>
          ))}
        </div>
      </div>
      <div className="contact-cell">
        <div className="lbl"><Icon.contact /> Kontakt</div>
        <div className="val">
          <a href={`tel:${telefon.replace(/\s/g, '')}`}>{telefon}</a>
          <small><a href={`mailto:${email}`}>{email}</a></small>
        </div>
      </div>
      <div className="contact-cell">
        <div className="lbl"><Icon.mail /> Geschäftsstelle</div>
        <div className="val">
          FEWOG – Fellbacher Wohnungsbaugenossenschaft eG
          <small>{adresse}</small>
        </div>
      </div>
    </div>
  );
}
