'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const ARCHIV = [
  { year: 2024, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/2024_12_19_FEWOG_Mietermagazin_2024_ANSICHT.pdf' },
  { year: 2023, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin_2023.pdf' },
  { year: 2022, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin_2022.pdf' },
  { year: 2021, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/Mietermagazin_FEWOG_2021.pdf' },
  { year: 2020, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/Mietermagazin_2020.pdf' },
  { year: 2019, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin_2019_Ansicht_web.pdf' },
  { year: 2018, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin-2018_web.pdf' },
  { year: 2017, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin2017_web.pdf' },
  { year: 2016, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG_Mietermagazin2016.pdf' },
  { year: 2015, url: 'https://www.fewog.de/fileadmin/PDF/mietermagazin/FEWOG-mietermagazin_2015.pdf' },
];

export default function MietermagazinArchivPage() {
  const [page, setPage] = useState('service');

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>MIETERMAGAZIN ARCHIV</h1>
          <p className="lead">Alle Ausgaben des FEWOG-Mietermagazins zum Download</p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="content-block">
            <p>
              Hier finden Sie alle bisherigen Ausgaben des FEWOG Mietermagazins als PDF zum Download.
            </p>
            <div className="archiv-list">
              {ARCHIV.map(({ year, url }) => (
                <div key={year} className="archiv-row">
                  <span className="archiv-year">{year}</span>
                  <span className="archiv-title">FEWOG Mietermagazin {year}</span>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    PDF herunterladen
                  </a>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 32 }}>
              <a href="/service" className="btn btn-ghost">← Zurück zu Service</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
