'use client';

import { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FEWOG_DATA } from '@/lib/data';
import type { Property } from '@/lib/data';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const DUR  = 0.32;

export default function WohnenPage() {
  const [page, setPage] = useState('wohnen');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const panelRef     = useRef<HTMLDivElement>(null);
  const touchStartX  = useRef(0);
  const touchStartY  = useRef(0);
  const dragDelta    = useRef(0);
  const isHorizontal = useRef<boolean | null>(null); // null = direction not yet decided
  const entryAnim    = useRef<ReturnType<typeof animate> | null>(null);
  const x            = useMotionValue(0);

  const offscreen = () =>
    panelRef.current?.offsetWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 500);

  // Slide in when panel mounts
  useLayoutEffect(() => {
    if (!selectedProperty) return;
    x.set(offscreen());
    const ctrl = animate(x, 0, { duration: DUR, ease: EASE });
    entryAnim.current = ctrl;
    return () => { ctrl.stop(); };
  }, [selectedProperty?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Non-passive touchmove so we can call preventDefault() for horizontal swipes.
  // React synthetic events are passive — they cannot prevent the browser's native scroll.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || !selectedProperty) return;

    const onMove = (e: TouchEvent) => {
      if (isHorizontal.current === null) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
        const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
        if (dx < 4 && dy < 4) return; // wait for clear intent
        isHorizontal.current = dx > dy;
      }
      if (!isHorizontal.current) return; // vertical — let browser scroll

      e.preventDefault(); // block scroll while swiping right
      const delta = e.touches[0].clientX - touchStartX.current;
      if (delta > 0) {
        dragDelta.current = delta;
        x.set(delta);
      }
    };

    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, [selectedProperty?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const closePanel = async () => {
    entryAnim.current?.stop();
    await animate(x, offscreen(), { duration: DUR, ease: EASE });
    setSelectedProperty(null);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current  = e.touches[0].clientX;
    touchStartY.current  = e.touches[0].clientY;
    dragDelta.current    = 0;
    isHorizontal.current = null;
    entryAnim.current?.stop();
  };

  const onTouchEnd = async () => {
    if (isHorizontal.current !== true) return; // was a scroll, not a swipe
    if (dragDelta.current > 80) {
      await animate(x, offscreen(), { duration: DUR, ease: EASE });
      setSelectedProperty(null);
    } else {
      animate(x, 0, { duration: 0.2 });
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

            {/* Detail Panel */}
            {selectedProperty && (
              <motion.div
                key={selectedProperty.id}
                ref={panelRef}
                className="bestand-detail-col"
                style={{ x }}
                onTouchStart={onTouchStart}
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
