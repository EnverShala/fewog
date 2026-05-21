'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ServiceTile } from '@/components/service-tile';
import { ContactStrip } from '@/components/contact-strip';
import { Icon } from '@/components/icons';
import { FEWOG_DATA } from '@/lib/data';
import { urlFor } from '@/sanity/image';
import type { KontaktData, StartseiteData } from '@/sanity/queries';

const ICON_MAP: Record<string, React.ReactNode> = {
  wrench: <Icon.wrench />,
  doc: <Icon.doc />,
  community: <Icon.community />,
};

const DEFAULT_TILES = [
  {
    _key: 'schaden',
    icon: 'wrench',
    titel: 'Schaden melden',
    beschreibung: 'Foto, Adresse, fertig — Bearbeitung innerhalb von 24 h.',
    link: 'mailto:info@fewog.de?subject=Schadensmeldung',
  },
  {
    _key: 'downloads',
    icon: 'doc',
    titel: 'Downloads',
    beschreibung: 'Mieter-Magazin, Geschäftsbericht etc. als PDF.',
    link: '/service#mietermagazin',
  },
  {
    _key: 'mietertreff',
    icon: 'community',
    titel: 'Mietertreff',
    beschreibung: 'Termine, Anmeldung, Nachbarschaftsbörse.',
    link: '/service#mietertreff',
  },
];

export default function HomeClient({
  kontakt,
  startseite,
}: {
  kontakt: KontaktData | null
  startseite: StartseiteData | null
}) {
  const router = useRouter();
  const heroTitel = startseite?.heroTitel ?? 'Genossenschaftliches Wohnen.';
  const heroUntertitel = startseite?.heroUntertitel ?? 'Wohnraum für Fellbach · seit 1948';
  const heroCtaText = startseite?.heroCtaText ?? 'Wohnungsbestand ansehen';
  const statsWohneinheiten = startseite?.statsWohneinheiten ?? FEWOG_DATA.meta.units;
  const statsMitglieder = startseite?.statsMitglieder ?? FEWOG_DATA.meta.members;
  const serviceDockEyebrow = startseite?.serviceDockEyebrow ?? 'Digitales Mieterbüro';
  const serviceDockTitel = startseite?.serviceDockTitel ?? 'Service mit einem Klick.';
  const serviceDockLead = startseite?.serviceDockLead ?? 'Die wichtigsten Anliegen ohne Umwege. Tagsüber telefonisch, jederzeit digital.';
  const tiles = startseite?.serviceTiles?.length ? startseite.serviceTiles : DEFAULT_TILES;

  const heroLead = startseite?.heroLead ?? (
    `${statsWohneinheiten} Wohnungen in ${FEWOG_DATA.meta.properties} Häusern. ` +
    `${statsMitglieder.toLocaleString('de-DE')} Mitglieder. ` +
    `Eine Genossenschaft, die seit drei Generationen bezahlbaren, soliden Wohnraum in Fellbach schafft.`
  );

  const jahreInFellbach = new Date() >= new Date(new Date().getFullYear(), 8, 9)
    ? new Date().getFullYear() - 1948
    : new Date().getFullYear() - 1948 - 1;

  return (
    <div className="min-h-screen">
      <Nav />

      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span className="eyebrow">{heroUntertitel}</span>
              </div>
              <h1 className="hero-title">
                {heroTitel}
              </h1>
              <p className="hero-lead">{heroLead}</p>
              <div className="hero-ctas">
                <button className="btn btn-primary btn-arrow" onClick={() => router.push('/wohnen')}>
                  {heroCtaText}
                </button>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="stat-num">{statsWohneinheiten}</div>
                  <div className="stat-lbl">Wohneinheiten</div>
                </div>
                <div>
                  <div className="stat-num">{statsMitglieder.toLocaleString('de-DE')}</div>
                  <div className="stat-lbl">Mitglieder</div>
                </div>
                <div>
                  <div className="stat-num">{jahreInFellbach}</div>
                  <div className="stat-lbl">Jahre Fellbach</div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="hero-image">
                {startseite?.heroBild && (
                  <Image
                    src={urlFor(startseite.heroBild).width(1200).height(800).fit('crop').url()}
                    alt="FEWOG-Wohnanlage in Fellbach"
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-dock">
        <div className="wrap">
          <div>
            <div className="eyebrow" style={{ color: 'rgba(253,248,247,0.6)' }}>{serviceDockEyebrow}</div>
            <h2 style={{ marginTop: 14 }}>{serviceDockTitel}</h2>
            <p className="service-dock-lead">{serviceDockLead}</p>
          </div>
          <div className="service-grid">
            {tiles.map((tile, i) => {
              const iconKey = (tile as typeof DEFAULT_TILES[0]).icon ?? Object.keys(ICON_MAP)[i] ?? 'wrench';
              const icon = ICON_MAP[iconKey] ?? <Icon.wrench />;
              const isExternal = tile.link?.startsWith('http') || tile.link?.startsWith('mailto:');
              return (
                <ServiceTile
                  key={tile._key}
                  icon={icon}
                  title={tile.titel}
                  desc={tile.beschreibung ?? ''}
                  {...(isExternal
                    ? { onClick: () => { if (tile.link) window.location.href = tile.link; } }
                    : { href: tile.link ?? '#' }
                  )}
                />
              );
            })}
          </div>
        </div>
      </section>

      <div className="wrap">
        <ContactStrip data={kontakt} />
      </div>

      <Footer />
    </div>
  );
}
