'use client';

import { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { urlFor } from '@/sanity/image';
import type { Liegenschaft } from '@/sanity/queries';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const DUR  = 0.32;

const STADTTEIL_LABEL: Record<string, string> = {
  kern: 'Fellbach-Kern',
  schmiden: 'Fellbach-Schmiden',
  oeffingen: 'Fellbach-Oeffingen',
};

export default function WohnenClient({
  liegenschaften,
  fallbackImageUrl,
}: {
  liegenschaften: Liegenschaft[]
  fallbackImageUrl: string | null
}) {
  const [selected, setSelected] = useState<Liegenschaft | null>(null);

  const panelRef     = useRef<HTMLDivElement>(null);
  const touchStartX  = useRef(0);
  const touchStartY  = useRef(0);
  const dragDelta    = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);
  const entryAnim    = useRef<ReturnType<typeof animate> | null>(null);
  const x            = useMotionValue(0);
  const wrapperW     = useMotionValue(0);

  const offscreen = () =>
    panelRef.current?.offsetWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 500);

  useLayoutEffect(() => {
    if (!selected) return;
    wrapperW.set(400); // instant — no transition, so first-open matches switch-between-properties
    x.set(offscreen());
    const ctrl = animate(x, 0, { duration: DUR, ease: EASE });
    entryAnim.current = ctrl;
    return () => { ctrl.stop(); };
  }, [selected?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = panelRef.current;
    if (!el || !selected) return;

    const onMove = (e: TouchEvent) => {
      if (isHorizontal.current === null) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
        const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
        if (dx < 4 && dy < 4) return;
        isHorizontal.current = dx > dy;
      }
      if (!isHorizontal.current) return;
      e.preventDefault();
      const delta = e.touches[0].clientX - touchStartX.current;
      if (delta > 0) {
        dragDelta.current = delta;
        x.set(delta);
      }
    };

    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, [selected?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const closePanel = async () => {
    entryAnim.current?.stop();
    await Promise.all([
      animate(x, offscreen(), { duration: DUR, ease: EASE }),
      animate(wrapperW, 0, { duration: DUR, ease: EASE }),
    ]);
    setSelected(null);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current  = e.touches[0].clientX;
    touchStartY.current  = e.touches[0].clientY;
    dragDelta.current    = 0;
    isHorizontal.current = null;
    entryAnim.current?.stop();
  };

  const onTouchEnd = async () => {
    if (isHorizontal.current !== true) return;
    if (dragDelta.current > 80) {
      await Promise.all([
        animate(x, offscreen(), { duration: DUR, ease: EASE }),
        animate(wrapperW, 0, { duration: DUR, ease: EASE }),
      ]);
      setSelected(null);
    } else {
      animate(x, 0, { duration: 0.2 });
    }
  };

  const grouped = useMemo(() => {
    const groups: Record<string, Liegenschaft[]> = {};
    liegenschaften.forEach(p => {
      const l = p.bezeichnung.charAt(0).toUpperCase();
      if (!groups[l]) groups[l] = [];
      groups[l].push(p);
    });
    return Object.keys(groups).sort().map(letter => ({ letter, items: groups[letter] }));
  }, [liegenschaften]);

  const imageUrl = (p: Liegenschaft) =>
    p.titelbild
      ? urlFor(p.titelbild).width(600).height(400).fit('crop').url()
      : fallbackImageUrl;

  const sanierungLabel = (p: Liegenschaft) => {
    const s = p.sanierungsjahr;
    const b = p.baujahr;
    if (!s || s === b) return '—';
    return String(s);
  };

  return (
    <div className="min-h-screen">
      <Nav />

      <section className="page-head page-head-simple">
        <div className="wrap">
          <h1>WOHNUNGSBESTAND A-Z</h1>
          <p className="lead">In unserer Genossenschaft gemeinsam LEBEN und WOHNEN.</p>
        </div>
      </section>

      <section className="bestand">
        <div className="wrap">
          <div className={`bestand-layout${selected ? ' detail-open' : ''}`}>

            {/* Property List */}
            <div className="bestand-list-col">
              <div className="bestand-list">
                {grouped.map(group => (
                  <div key={group.letter}>
                    <div className="bestand-letter">{group.letter}</div>
                    {group.items.map(prop => (
                      <div
                        key={prop._id}
                        className={'bestand-row' + (selected?._id === prop._id ? ' selected' : '')}
                        onClick={() => setSelected(selected?._id === prop._id ? null : prop)}
                      >
                        <div className="col-main">
                          <div className="prop-street">{prop.bezeichnung}</div>
                          <div className="prop-meta">
                            {prop.baujahr ?? '—'} · {prop.anzahlWohnungen ?? '—'} Wohnungen · {prop.zimmer ?? '—'} · {sanierungLabel(prop) !== '—' ? `Saniert ${sanierungLabel(prop)}` : 'Ursprungsbau'}
                          </div>
                        </div>
                        <div className="col-district">
                          {STADTTEIL_LABEL[prop.stadtteil ?? ''] ?? 'Fellbach'}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel — wrapper always mounted, animates width so list shrinks without scale distortion */}
            <motion.div
              className="bestand-detail-wrapper"
              style={{ width: wrapperW }}
            >
            {selected && (
              <motion.div
                key={selected._id}
                ref={panelRef}
                className="bestand-detail-col"
                style={{ x }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div className="property-detail-panel">
                  <div className="detail-hero">
                    {imageUrl(selected)
                      ? <Image src={imageUrl(selected)!} alt={selected.bezeichnung} width={600} height={400} style={{ width: '100%', height: 'auto' }} />
                      : <div className="detail-hero-placeholder" />
                    }
                    <div className="detail-hero-overlay">
                      <div className="eyebrow">Hausdetails</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <h3 style={{ margin: 0 }}>{selected.bezeichnung}</h3>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.bezeichnung + ', Fellbach')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="In Google Maps öffnen"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, width: 28, height: 28,
                            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
                            borderRadius: '50%', color: '#fff',
                            transition: 'background .15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.32)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </a>
                      </div>
                      <div className="detail-district">
                        {STADTTEIL_LABEL[selected.stadtteil ?? ''] ?? 'Fellbach'}
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
                        <dd>{selected.baujahr ?? '—'}</dd>
                      </div>
                      <div className="detail-item">
                        <dt>Wohneinheiten</dt>
                        <dd>{selected.anzahlWohnungen ?? '—'}</dd>
                      </div>
                      <div className="detail-item">
                        <dt>Zimmer</dt>
                        <dd>{selected.zimmer ?? '—'}</dd>
                      </div>
                      <div className="detail-item">
                        <dt>Sanierung</dt>
                        <dd>{sanierungLabel(selected)}</dd>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
