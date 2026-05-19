'use client';

import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FEWOG_DATA } from '@/lib/data';
import type { Property } from '@/lib/data';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const DUR  = 0.32;

export default function WohnenPage() {
  const [page, setPage] = useState('wohnen');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const panelRef    = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const dragDelta   = useRef(0);
  const entryAnim   = useRef<ReturnType<typeof animate> | null>(null);

  // Slide in when a new panel mounts
  useLayoutEffect(() => {
    if (!panelRef.current || !selectedProperty) return;
    const ctrl = animate(panelRef.current, { x: 0 }, { duration: DUR, ease: EASE });
    entryAnim.current = ctrl;
    return () => ctrl.stop();
  }, [selectedProperty?.id]);

  const closePanel = async () => {
    entryAnim.current?.stop();
    if (panelRef.current) {
      await animate(panelRef.current, { x: '100%' }, { duration: DUR, ease: EASE });
    }
    setSelectedProperty(null);
  };

  // Touch-only swipe handlers — no mouse interaction possible
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    dragDelta.current   = 0;
    entryAnim.current?.stop();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (delta > 0 && panelRef.current) {
      dragDelta.current = delta;
      panelRef.current.style.transform = `translateX(${delta}px)`;
    }
  };

  const onTouchEnd = async () => {
    if (!panelRef.current) return;
    if (dragDelta.current > 80) {
      await animate(panelRef.current, { x: '100%' }, { duration: DUR, ease: EASE });
      setSelectedProperty(null);
    } else {
      animate(panelRef.current, { x: 0 }, { duration: 0.2 });
    }
  };

  const filtered = useMemo(() => {
    return [...FEWOG_DATA.properties].sort((a, b) => a.street.localeCompare(b.street, 'de'));
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
                        className={'bestand-row' + (selectedProperty?.id === prop.id ? ' selected' : '')}
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

            {/* Detail Panel — enters via FM animate(), exits via swipe or close button */}
            {selectedProperty && (
              <motion.div
                key={selectedProperty.id}
                ref={panelRef}
                className="bestand-detail-col"
                initial={{ x: '100%' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
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
                      onClick={closePanel}
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

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
