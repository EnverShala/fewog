'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FEWOG_DATA } from '@/lib/data';
import type { Property } from '@/lib/data';

const panelTransition = {
  type: 'tween' as const,
  duration: 0.32,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export default function WohnenPage() {
  const [page, setPage] = useState('wohnen');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const dragControls = useDragControls();

  const filtered = useMemo(() => {
    return [...FEWOG_DATA.properties].sort((a, b) => a.street.localeCompare(b.street, "de"));
  }, []);

  const grouped = useMemo(() => {
    const groups: { [key: string]: typeof filtered } = {};
    filtered.forEach(p => {
      const l = p.street.charAt(0).toUpperCase();
      if (!groups[l]) groups[l] = [];
      groups[l].push(p);
    });
    return Object.keys(groups).sort().map(letter => ({ letter, items: groups[letter] }));
  }, [filtered]);

  const districtById = Object.fromEntries(FEWOG_DATA.districts.map(d => [d.id, d]));

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>WOHNUNGSBESTAND A-Z</h1>
          <p className="lead">In unserer Genossenschaft gemeinsam LEBEN und WOHNEN.</p>
        </div>
      </section>

      <section className="bestand">
        <div className="wrap">
          <div className={`bestand-layout${selectedProperty ? ' detail-open' : ''}`}>

            {/* Property List */}
            <div className="bestand-list-col">
              <div className="bestand-list">
                {grouped.map(group => (
                  <div key={group.letter || 'all'}>
                    {group.letter && (
                      <div className="bestand-letter">{group.letter}</div>
                    )}
                    {group.items.map(prop => (
                      <div
                        key={prop.id}
                        className={"bestand-row" + (selectedProperty?.id === prop.id ? " selected" : "")}
                        onClick={() => setSelectedProperty(selectedProperty?.id === prop.id ? null : prop)}
                      >
                        <div className="col-main">
                          <div className="prop-street">{prop.street}</div>
                          <div className="prop-meta">
                            {prop.year} · {prop.units} Wohnungen · {prop.rooms} · {prop.sanierung !== prop.year ? `Saniert ${prop.sanierung}` : 'Ursprungsbau'}
                          </div>
                        </div>
                        <div className="col-num">{prop.units}</div>
                        <div className="col-idx">{prop.id.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel — slides in/out via Framer Motion, swipe right to dismiss */}
            <AnimatePresence>
              {selectedProperty && (
                <motion.div
                  key={selectedProperty.id}
                  className="bestand-detail-col"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={panelTransition}
                  drag="x"
                  dragControls={dragControls}
                  dragListener={false}
                  dragConstraints={{ left: 0 }}
                  dragElastic={{ left: 0, right: 0.3 }}
                  onPointerDown={(e) => {
                    if (e.pointerType === 'touch') dragControls.start(e);
                  }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) setSelectedProperty(null);
                  }}
                >
                  <div className="property-detail-panel">
                    <div className="detail-hero">
                      <img src={selectedProperty.imageUrl} alt={selectedProperty.street} />
                      <div className="detail-hero-overlay">
                        <div className="eyebrow">Hausdetails</div>
                        <h3>{selectedProperty.street}</h3>
                        <div className="detail-district">
                          {districtById[selectedProperty.district]?.name || 'Fellbach'}
                        </div>
                      </div>
                      <button
                        className="detail-close"
                        onClick={() => setSelectedProperty(null)}
                        aria-label="Schließen"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M6 6l12 12M18 6 6 18"/>
                        </svg>
                      </button>
                    </div>
                    <div className="detail-body">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <dt>Baujahr</dt>
                          <dd>{selectedProperty.year}</dd>
                        </div>
                        <div className="detail-item">
                          <dt>Wohneinheiten</dt>
                          <dd>{selectedProperty.units}</dd>
                        </div>
                        <div className="detail-item">
                          <dt>Zimmer</dt>
                          <dd>{selectedProperty.rooms}</dd>
                        </div>
                        <div className="detail-item">
                          <dt>Sanierung</dt>
                          <dd>{selectedProperty.sanierung !== selectedProperty.year ? selectedProperty.sanierung : '—'}</dd>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
