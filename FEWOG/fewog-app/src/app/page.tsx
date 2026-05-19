'use client';

import { useState, useEffect } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ServiceTile } from '@/components/service-tile';
import { ContactStrip } from '@/components/contact-strip';
import { Icon } from '@/components/icons';
import { FEWOG_DATA } from '@/lib/data';

export default function Home() {
  const [page, setPage] = useState('start');

  // Navigate to different pages
  useEffect(() => {
    if (page === 'wohnen') {
      window.location.href = '/wohnen';
    } else if (page === 'service') {
      // Handle other pages later
      setPage('start');
    } else if (page === 'ueberuns') {
      setPage('start');
    } else if (page === 'aktuelles') {
      setPage('start');
    }
  }, [page]);

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      {/* Hero Section */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span className="eyebrow">Wohnraum für Fellbach · seit 1949</span>
              </div>
              <h1 className="hero-title">
                Genossenschaftliches Wohnen.
              </h1>
              <p className="hero-lead">
                {FEWOG_DATA.meta.units} Wohnungen in {FEWOG_DATA.meta.properties} Häusern.
                {" "}{FEWOG_DATA.meta.members.toLocaleString("de-DE")} Mitglieder.
                Eine Genossenschaft, die seit drei Generationen
                bezahlbaren, soliden Wohnraum in Fellbach schafft.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-primary btn-arrow" onClick={() => setPage("wohnen")}>
                  Wohnungsbestand ansehen
                </button>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="stat-num">{FEWOG_DATA.meta.units}</div>
                  <div className="stat-lbl">Wohneinheiten</div>
                </div>
                <div>
                  <div className="stat-num">{FEWOG_DATA.meta.members.toLocaleString("de-DE")}</div>
                  <div className="stat-lbl">Mitglieder</div>
                </div>
                <div>
                  <div className="stat-num">{2026 - FEWOG_DATA.meta.founded}</div>
                  <div className="stat-lbl">Jahre Fellbach</div>
                </div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div className="hero-image">
                <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop" alt="Modernisierte FEWOG-Wohnanlage in Fellbach" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Dock */}
      <section className="service-dock">
        <div className="wrap">
          <div>
            <div className="eyebrow" style={{ color: "rgba(253,248,247,0.6)" }}>Digitales Mieterbüro</div>
            <h2 style={{ marginTop: 14 }}>Service<br/>mit einem Klick.</h2>
            <p className="service-dock-lead">
              Die wichtigsten Anliegen ohne Umwege.
              Tagsüber telefonisch, jederzeit digital.
            </p>
          </div>
          <div className="service-grid">
            <ServiceTile
              icon={<Icon.wrench />}
              title="Schaden melden"
              desc="Foto, Adresse, fertig — Bearbeitung innerhalb von 24 h."
              onClick={() => window.location.href = 'mailto:info@fewog.de?subject=Schadensmeldung'}
            />
            <ServiceTile
              icon={<Icon.doc />}
              title="Downloads"
              desc="Mieter-Magazin, Geschäftsbericht etc. als PDF."
              href="/service#mietermagazin"
            />
            <ServiceTile
              icon={<Icon.community />}
              title="Mietertreff"
              desc="Termine, Anmeldung, Nachbarschaftsbörse."
              href="/service#mietertreff"
            />
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <div className="wrap">
        <ContactStrip />
      </div>

      <Footer />
    </div>
  );
}
