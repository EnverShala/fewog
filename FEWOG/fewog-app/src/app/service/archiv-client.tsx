'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import type { Dokument } from '@/sanity/queries';

export default function ArchivClient({
  titel,
  lead,
  rubriktitel,
  navPage,
  dokumente,
}: {
  titel: string
  lead: string
  rubriktitel: string
  navPage: string
  dokumente: Dokument[]
}) {
  const [page, setPage] = useState(navPage);

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>{titel}</h1>
          <p className="lead">{lead}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="content-block">
            {dokumente.length === 0 ? (
              <p>Noch keine Einträge vorhanden.</p>
            ) : (
              <div className="archiv-list">
                {dokumente.map((dok) => {
                  const url = dok.dateiUrl ?? dok.dateiAssetUrl;
                  return (
                    <div key={dok._id} className="archiv-row">
                      <span className="archiv-year">{dok.jahr}</span>
                      <span className="archiv-title">{dok.titel || `${rubriktitel} ${dok.jahr}`}</span>
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                          PDF herunterladen
                        </a>
                      ) : (
                        <span className="muted" style={{ fontSize: 13 }}>Kein PDF</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
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
