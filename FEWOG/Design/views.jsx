// FEWOG — Views: Startseite, Wohnen (Karte + Bestand)

// ============================================================================
// Startseite
// ============================================================================
function ViewStart({ setPage }) {
  const D = window.FEWOG_DATA;

  return (
    <>
      {/* Hero */}
      <section className="hero" data-screen-label="01 Start — Hero">
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
                {D.meta.units} Wohnungen in {D.meta.properties} Häusern.
                {" "}{D.meta.members.toLocaleString("de-DE")} Mitglieder.
                Eine Genossenschaft, die seit drei Generationen
                bezahlbaren, soliden Wohnraum in Fellbach schafft.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-primary btn-arrow" onClick={() => setPage("wohnen")}>
                  Wohnungsbestand ansehen
                </button>
                <button className="btn btn-ghost btn-arrow">
                  Mitglied werden
                </button>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="stat-num">{D.meta.units}</div>
                  <div className="stat-lbl">Wohneinheiten</div>
                </div>
                <div>
                  <div className="stat-num">{D.meta.members.toLocaleString("de-DE")}</div>
                  <div className="stat-lbl">Mitglieder</div>
                </div>
                <div>
                  <div className="stat-num">{2026 - D.meta.founded}</div>
                  <div className="stat-lbl">Jahre Fellbach</div>
                </div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div className="hero-image">
                <img src={IMG.hero} alt="Modernisierte FEWOG-Wohnanlage in Fellbach" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Dock */}
      <section className="service-dock" data-screen-label="01 Start — Service-Dock">
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
            />
            <ServiceTile
              icon={<Icon.doc />}
              title="Downloads"
              desc="Mietvertrag, Hausordnung, Formulare als PDF."
            />
            <ServiceTile
              icon={<Icon.community />}
              title="Mietertreff"
              desc="Termine, Anmeldung, Nachbarschaftsbörse."
            />
          </div>
        </div>
      </section>

      {/* Story / Editorial */}
      <section className="story" data-screen-label="01 Start — Geschichte">
        <div className="wrap">
          <div className="story-grid">
            <div className="story-img">
              <img src={IMG.story} alt="Fellbach am Kappelberg" />
            </div>
            <div className="story-body">
              <div className="eyebrow">Genossenschaftsprinzip</div>
              <h2 style={{ marginTop: 14 }}>Eine Wohnung. Eine Stimme. Eine Heimat.</h2>
              <p>
                Wir sind keine Investoren. Wir sind eine Genossenschaft —
                und das heißt: unsere Mieter sind unsere Mitglieder.
                Jedes Mitglied hat eine Stimme in der Generalversammlung,
                unabhängig davon, wie groß die Wohnung ist.
              </p>
              <p>
                Wir verwalten nicht nur Wohnungen — wir verwalten Nachbarschaften.
                Seit 1949, am Fuße des Kappelbergs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stadtteile / Featured Properties */}
      <section className="section" data-screen-label="01 Start — Stadtteile">
        <div className="wrap">
          <div className="section-head">
            <div className="lhs">
              <div className="eyebrow">Drei Stadtteile, ein Auftrag</div>
              <h2>Wo wir bauen.</h2>
              <p className="lead">
                Fellbach-Kern, Schmiden und Oeffingen. {D.meta.properties} Häuser
                zwischen Kappelberg und Streuobstwiesen — viele davon
                in den letzten Jahren energetisch saniert.
              </p>
            </div>
            <button className="btn btn-ghost btn-arrow" onClick={() => setPage("wohnen")}>
              Alle ansehen
            </button>
          </div>
          <div className="three-col">
            {[
              { key: "kern",      img: IMG.district_kern,      sub: "Fellbach-Kern",  title: "Stadtmitte mit Kappelberg-Blick", desc: "Bahnhofstraße, Cannstatter Straße, Theodor-Heuss — das Herz der Genossenschaft seit 1949." },
              { key: "schmiden",  img: IMG.district_schmiden,  sub: "Schmiden",       title: "Historischer Ortskern",            desc: "Sechs Liegenschaften zwischen Hauptstraße und Tannenberg, viele mit Garten und Streuobstbestand." },
              { key: "oeffingen", img: IMG.district_oeffingen, sub: "Oeffingen",      title: "Ländlich, ruhig, gut angebunden",  desc: "Neuere Bestände der 70er Jahre. 2024 als erstes Quartier komplett auf Fernwärme umgestellt." },
            ].map((c) => (
              <div className="card" key={c.key} onClick={() => setPage("wohnen")}>
                <div className="card-img"><img src={c.img} alt={c.title} /></div>
                <div className="card-body">
                  <div className="card-meta">{c.sub}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="card-footer">
                    <span style={{ color: "var(--c-primary)" }}>Auf der Karte ansehen →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt-Streifen */}
      <section className="section-tight" style={{ background: "var(--c-bg-2)", borderTop: "1px solid var(--c-line)" }} data-screen-label="01 Start — Kontakt">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 28 }}>
            <div className="lhs">
              <div className="eyebrow">Geschäftsstelle</div>
              <h2 style={{ fontSize: 32 }}>So erreichen Sie uns.</h2>
            </div>
          </div>
          <ContactStrip />
        </div>
      </section>
    </>
  );
}

// ============================================================================
// Wohnen: interaktive Karte + Bestand
// ============================================================================
function ViewWohnen({ palette }) {
  const D = window.FEWOG_DATA;
  const [activeDistrict, setActiveDistrict] = React.useState(null);
  const [hoverPin, setHoverPin] = React.useState(null);
  const [selectedProp, setSelectedProp] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("az");

  // Filtered list
  const filtered = React.useMemo(() => {
    let list = D.properties;
    if (activeDistrict) list = list.filter(p => p.district === activeDistrict);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(p => p.street.toLowerCase().includes(q));
    }
    if (sort === "az") list = [...list].sort((a, b) => a.street.localeCompare(b.street, "de"));
    else if (sort === "units") list = [...list].sort((a, b) => b.units - a.units);
    else if (sort === "sanierung") list = [...list].sort((a, b) => b.sanierung - a.sanierung);
    return list;
  }, [activeDistrict, query, sort]);

  // Group by letter (only when az)
  const grouped = React.useMemo(() => {
    if (sort !== "az") return [{ letter: null, items: filtered }];
    const groups = {};
    filtered.forEach(p => {
      const l = p.street.charAt(0).toUpperCase();
      if (!groups[l]) groups[l] = [];
      groups[l].push(p);
    });
    return Object.keys(groups).sort().map(letter => ({ letter, items: groups[letter] }));
  }, [filtered, sort]);

  const districtById = Object.fromEntries(D.districts.map(d => [d.id, d]));
  const districtCounts = Object.fromEntries(
    D.districts.map(d => [d.id, D.properties.filter(p => p.district === d.id).length])
  );

  return (
    <>
      <section className="page-head" data-screen-label="02 Wohnen — Header">
        <div className="wrap">
          <div className="crumb">Wohnen · Wohnungsbestand</div>
          <h1>{D.meta.properties} Häuser. {D.meta.units} Zuhause.</h1>
          <p className="lead">
            Unser gesamter Bestand auf einen Blick — sortiert nach Stadtteil,
            durchsuchbar nach Straße. Klicken Sie eine Liegenschaft an
            für Baujahr, Wohnungsmix und Sanierungsstand.
          </p>
        </div>
      </section>

      {/* Stadtteil-Übersicht (sachlich, ohne Karte) */}
      <section className="overview-section" data-screen-label="02 Wohnen — Übersicht">
        <div className="wrap">
          <div className="overview-head">
            <div className="eyebrow">Übersicht nach Stadtteil</div>
          </div>
          <div className="overview-grid">
            {D.districts.map(d => {
              const count = districtCounts[d.id];
              const units = districtUnits(d.id, D.properties);
              const avgYear = districtAvgYear(d.id, D.properties);
              const isActive = activeDistrict === d.id;
              return (
                <div
                  key={d.id}
                  className={"overview-tile" + (isActive ? " active" : "")}
                  onClick={() => setActiveDistrict(isActive ? null : d.id)}
                >
                  <div className="overview-name">{d.name}</div>
                  <div className="overview-tag">{d.tagline}</div>
                  <dl className="overview-dl">
                    <div><dt>Häuser</dt><dd>{count}</dd></div>
                    <div><dt>Wohneinheiten</dt><dd>{units}</dd></div>
                    <div><dt>Ø Baujahr</dt><dd>{avgYear}</dd></div>
                  </dl>
                  <div className="overview-action">
                    {isActive ? "Filter aktiv ·  Zurücksetzen" : "Liste filtern  →"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestand-Liste */}
      <section className="bestand" data-screen-label="02 Wohnen — Bestand">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 28 }}>
            <div className="lhs">
              <div className="eyebrow">Wohnungsbestand</div>
              <h2 style={{ fontSize: 36 }}>Liegenschaften A–Z</h2>
            </div>
          </div>
          <div className="bestand-toolbar">
            <div className="search-input">
              <Icon.search />
              <input
                placeholder="Straße suchen…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && <a style={{ cursor: "pointer", fontSize: 13 }} onClick={() => setQuery("")}>×</a>}
            </div>
            <div className="filter-chips">
              <button className={"chip" + (!activeDistrict ? " active" : "")} onClick={() => setActiveDistrict(null)}>
                Alle <span className="count">{D.properties.length}</span>
              </button>
              {D.districts.map(d => (
                <button key={d.id}
                        className={"chip" + (activeDistrict === d.id ? " active" : "")}
                        onClick={() => setActiveDistrict(activeDistrict === d.id ? null : d.id)}>
                  {d.name} <span className="count">{districtCounts[d.id]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bestand-meta">
            <span>{filtered.length} {filtered.length === 1 ? "Liegenschaft" : "Liegenschaften"}{activeDistrict ? ` in ${districtById[activeDistrict].name}` : ""}</span>
            <div className="sort-toggle">
              <button className={sort === "az" ? "active" : ""} onClick={() => setSort("az")}>A–Z</button>
              <button className={sort === "units" ? "active" : ""} onClick={() => setSort("units")}>Größe</button>
              <button className={sort === "sanierung" ? "active" : ""} onClick={() => setSort("sanierung")}>Sanierung</button>
            </div>
          </div>

          <div className="bestand-list">
            {filtered.length === 0 && (
              <div className="empty">
                Keine Liegenschaft gefunden. <a onClick={() => { setQuery(""); setActiveDistrict(null); }}>Filter zurücksetzen</a>
              </div>
            )}
            {grouped.map((g, gi) => (
              <React.Fragment key={gi}>
                {g.letter && <div className="bestand-letter">{g.letter}</div>}
                {g.items.map((p, i) => {
                  const d = districtById[p.district];
                  const isNew = p.sanierung >= 2022;
                  return (
                    <div
                      key={p.id}
                      className={"bestand-row" + (selectedProp?.id === p.id ? " selected" : "")}
                      onClick={() => setSelectedProp(p)}
                      onMouseEnter={() => setHoverPin(p.id)}
                      onMouseLeave={() => setHoverPin(null)}
                    >
                      <div className="idx">№ {p.id.replace("p", "").padStart(3, "0")}</div>
                      <div className="street">
                        {p.street}
                        <small>
                          <span className="district-color" style={{ background: districtSwatch(d.color) }}></span>
                          {d.name}
                        </small>
                      </div>
                      <div className="col-num">{p.units}<small>Wohnungen</small></div>
                      <div className="col-num">{p.rooms}<small>Mix</small></div>
                      <div className="col-num">
                        <span className={"badge" + (isNew ? "" : " old")}>
                          {isNew ? "● saniert " : ""}{p.sanierung}
                        </span>
                        <small>Baujahr {p.year}</small>
                      </div>
                      <div className="arrow">→</div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Drawer */}
      <PropertyDrawer
        prop={selectedProp}
        district={selectedProp ? districtById[selectedProp.district] : null}
        onClose={() => setSelectedProp(null)}
      />
    </>
  );
}

function districtSwatch(color) {
  if (color === "kappelberg") return "var(--c-primary)";
  if (color === "salbei") return "var(--c-secondary)";
  return "#B5A89C";
}
function districtUnits(id, props) {
  return props.filter(p => p.district === id).reduce((a, b) => a + b.units, 0);
}
function districtAvgYear(id, props) {
  const list = props.filter(p => p.district === id);
  if (!list.length) return "—";
  return Math.round(list.reduce((a, b) => a + b.year, 0) / list.length);
}

// --- Map --------------------------------------------------------------------
function FellbachMap({ districts, properties, activeDistrict, setActiveDistrict, hoverPin, setHoverPin, setSelectedProp }) {
  const mapRef = React.useRef(null);
  const [popover, setPopover] = React.useState(null);

  // Update popover position when hover
  React.useEffect(() => {
    if (!hoverPin) { setPopover(null); return; }
    const p = properties.find(x => x.id === hoverPin);
    if (!p || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = (p.pos[0] / 820) * rect.width;
    const y = (p.pos[1] / 540) * rect.height;
    setPopover({ x, y, text: p.street });
  }, [hoverPin]);

  return (
    <div className="map-container" ref={mapRef}>
      <svg viewBox="0 0 820 540" preserveAspectRatio="xMidYMid meet">
        {/* Districts */}
        {districts.map(d => (
          <g key={d.id}>
            <path
              className={"map-district" + (!activeDistrict || activeDistrict === d.id ? " active" : "")}
              data-color={d.color}
              d={d.path}
              strokeWidth="1"
              fillOpacity="0.5"
              onClick={() => setActiveDistrict(activeDistrict === d.id ? null : d.id)}
            />
            <text x={d.label.x} y={d.label.y} className="map-label">{d.name}</text>
          </g>
        ))}

        {/* Pins */}
        {properties.map(p => {
          const dim = activeDistrict && activeDistrict !== p.district;
          const sel = hoverPin === p.id;
          return (
            <g key={p.id}
               className={"map-pin" + (dim ? " dim" : "") + (sel ? " selected" : "")}
               onMouseEnter={() => setHoverPin(p.id)}
               onMouseLeave={() => setHoverPin(null)}
               onClick={(e) => { e.stopPropagation(); setSelectedProp(p); }}
            >
              <circle cx={p.pos[0]} cy={p.pos[1]} r="5" className="pin-shape"/>
            </g>
          );
        })}
      </svg>

      {popover && (
        <div className="map-popover" style={{ left: popover.x, top: popover.y }}>
          {popover.text}
        </div>
      )}
    </div>
  );
}

// --- Property Drawer --------------------------------------------------------
function PropertyDrawer({ prop, district, onClose }) {
  const open = !!prop;
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);
  if (!prop) {
    return (
      <>
        <div className="drawer-scrim" onClick={onClose}></div>
        <div className="drawer"></div>
      </>
    );
  }
  return (
    <>
      <div className={"drawer-scrim" + (open ? " open" : "")} onClick={onClose}></div>
      <div className={"drawer" + (open ? " open" : "")}>
        <button className="drawer-close" onClick={onClose}><Icon.close /></button>
        <div className="drawer-img">
          <img src={IMG.prop_default} alt={prop.street} />
        </div>
        <div className="drawer-body">
          <div className="eyebrow" style={{ color: districtSwatch(district.color) }}>
            ● {district.name}
          </div>
          <h2>{prop.street}</h2>
          <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>
            {prop.units} Wohnungen · {prop.rooms} · Baujahr {prop.year}
          </p>

          <div className="drawer-stats">
            <div className="drawer-stat">
              <div className="lbl">Wohneinheiten</div>
              <div className="val">{prop.units}</div>
            </div>
            <div className="drawer-stat">
              <div className="lbl">Wohnungsmix</div>
              <div className="val">{prop.rooms}</div>
            </div>
            <div className="drawer-stat">
              <div className="lbl">Baujahr</div>
              <div className="val">{prop.year}</div>
            </div>
            <div className="drawer-stat">
              <div className="lbl">Zuletzt saniert</div>
              <div className="val">{prop.sanierung}</div>
            </div>
          </div>

          <h4 style={{ marginTop: 28, fontSize: 14, fontFamily: "var(--f-head)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-ink-soft)" }}>
            Sanierungsstand
          </h4>
          <p style={{ marginTop: 10, fontSize: 15, color: "var(--c-ink-soft)" }}>
            {prop.sanierung >= 2022
              ? `Energetisch saniert ${prop.sanierung} (Dämmung, Fenster, Heizung). KfW-Effizienzhaus 70.`
              : `Letzte Modernisierung ${prop.sanierung}. Nächste Maßnahme in Planung.`}
          </p>

          <div className="drawer-actions">
            <button className="btn btn-primary btn-arrow">Auf Karte zeigen</button>
            <button className="btn btn-ghost">Kontakt aufnehmen</button>
          </div>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--c-line)", fontSize: 13, color: "var(--c-ink-soft)" }}>
            Hausverwaltung · <b style={{ color: "var(--c-ink)" }}>Karin Holzwarth</b> · +49 711 — 58 12 34 / -20
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { ViewStart, ViewWohnen });
