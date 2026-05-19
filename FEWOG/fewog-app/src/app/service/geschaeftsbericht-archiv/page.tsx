'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const ARCHIV = [
  { year: 2023, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2023.pdf' },
  { year: 2022, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_FEWOG_2022_Ansicht.pdf' },
  { year: 2021, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2021.pdf' },
  { year: 2020, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_FEWOG_2020.pdf' },
  { year: 2019, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Homepage_Geschaeftsbericht_FEWOG_2019.pdf' },
  { year: 2018, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_NEU_FEWOG_web.pdf' },
  { year: 2017, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2018_RZ.pdf' },
  { year: 2016, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/FEWOG_Geschaeftsbericht_2016.pdf' },
  { year: 2015, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/Geschaeftsbericht_2016_klein-2.pdf' },
  { year: 2014, url: 'https://www.fewog.de/fileadmin/PDF/geschaeftsberichte/geschaeftsbericht_fewog_2014.pdf' },
];

export default function GeschaeftsberichtArchivPage() {
  const [page, setPage] = useState('service');

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>GESCHÄFTSBERICHT ARCHIV</h1>
          <p className="lead">Alle Geschäftsberichte der FEWOG zum Download</p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="content-block">
            <p>
              Hier finden Sie alle bisherigen Geschäftsberichte der FEWOG Fellbach als PDF zum Download.
            </p>
            <div className="archiv-list">
              {ARCHIV.map(({ year, url }) => (
                <div key={year} className="archiv-row">
                  <span className="archiv-year">{year}</span>
                  <span className="archiv-title">Geschäftsbericht {year}</span>
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
