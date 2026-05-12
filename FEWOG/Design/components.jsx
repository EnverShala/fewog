// FEWOG Fellbach — Components

// --- Tiny icons (line, monoline, no slop) -----------------------------------
const Icon = {
  arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  close: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18"/></svg>,
  burger: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  phone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>,
  mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>,
  clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  wrench: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6.9 6.9a2 2 0 1 0 2.8 2.8l6.9-6.9a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4 2.2-2.2Z"/></svg>,
  community: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19a6 6 0 0 1 12 0M15 19a4 4 0 0 1 7-2.5"/></svg>,
  doc: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>,
  leaf: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 4 13c0-7 9-11 16-11 0 7-4 16-11 16-2 0-3-1-3-1"/><path d="M2 22s4-7 12-8"/></svg>,
  home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11 12 3l9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>,
  pin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>,
};

// --- Image URLs (Unsplash architecture/Fellbach-adjacent) -------------------
const IMG = {
  hero: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop",
  story: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=900&q=80&auto=format&fit=crop",
  card1: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&auto=format&fit=crop",
  card2: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop",
  card3: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&q=80&auto=format&fit=crop",
  district_kern: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop",
  district_schmiden: "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=900&q=80&auto=format&fit=crop",
  district_oeffingen: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&q=80&auto=format&fit=crop",
  prop_default: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
};

// --- Nav --------------------------------------------------------------------
function Nav({ page, setPage }) {
  const [open, setOpen] = React.useState(false);
  const go = (p) => { setPage(p); setOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); };
  return (
    <nav className={"nav " + (open ? "nav-mobile-open" : "")}>
      <div className="nav-inner">
        <div className="brand" onClick={() => go("start")}>
          <div className="brand-mark">F</div>
          <div className="brand-name">
            FEWOG
            <small>Fellbach · seit 1949</small>
          </div>
        </div>
        <div className="nav-links">
          {[
            ["start", "Startseite"],
            ["wohnen", "Wohnen"],
            ["service", "Service"],
            ["ueberuns", "Über uns"],
            ["aktuelles", "Aktuelles"],
          ].map(([k, l]) => (
            <a key={k}
               className={"nav-link" + (page === k ? " active" : "")}
               onClick={(e) => { e.preventDefault(); go(k); }}>
              {l}
            </a>
          ))}
        </div>
        <button className="nav-cta" onClick={() => go("service")}>Mitglied werden</button>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <Icon.burger />
        </button>
      </div>
    </nav>
  );
}

// --- Footer -----------------------------------------------------------------
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand-mark" style={{ background: "var(--c-bg)", color: "var(--c-ink)", marginBottom: 16 }}>F</div>
            <p style={{ color: "rgba(253,248,247,0.7)", fontSize: 14, lineHeight: 1.5, maxWidth: 280 }}>
              Fellbacher Wohnungsbau-Genossenschaft eG. Gegründet 1949.
              Wohnraum aus Fellbach, für Fellbach.
            </p>
          </div>
          <div>
            <h4>Wohnen</h4>
            <a onClick={() => setPage("wohnen")}>Wohnungsbestand</a>
            <a>Mitgliedschaft</a>
            <a>Genossenschaftsprinzip</a>
            <a>Neubauprojekte</a>
          </div>
          <div>
            <h4>Service</h4>
            <a>Schaden melden</a>
            <a>Mieter-Magazin</a>
            <a>Downloads</a>
            <a>Mietertreff</a>
          </div>
          <div>
            <h4>Kontakt</h4>
            <a>Bahnhofstraße 12<br/>70734 Fellbach</a>
            <a>+49 711 — 58 12 34</a>
            <a>kontakt@fewog-fellbach.de</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 1949–2026 FEWOG eG · Fellbach</span>
          <span><a style={{ display: "inline" }}>Impressum</a> · <a style={{ display: "inline" }}>Datenschutz</a> · <a style={{ display: "inline" }}>AGB</a></span>
        </div>
      </div>
    </footer>
  );
}

// --- Service Tile -----------------------------------------------------------
function ServiceTile({ icon, title, desc, onClick }) {
  return (
    <div className="service-tile" onClick={onClick}>
      <div className="icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

// --- Contact strip ----------------------------------------------------------
function ContactStrip() {
  return (
    <div className="contact-strip">
      <div className="contact-cell">
        <div className="lbl"><Icon.clock /> Sprechzeiten</div>
        <div className="val">
          Mo–Do · 09:00 – 12:00
          <small>Di + Do · 14:00 – 17:00</small>
        </div>
      </div>
      <div className="contact-cell">
        <div className="lbl"><Icon.phone /> Telefon</div>
        <div className="val">
          +49 711 — 58 12 34
          <small>Notdienst nach 17 Uhr: 0172 / 411 22 33</small>
        </div>
      </div>
      <div className="contact-cell">
        <div className="lbl"><Icon.mail /> Geschäftsstelle</div>
        <div className="val">
          Bahnhofstraße 12
          <small>70734 Fellbach</small>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Footer, ServiceTile, ContactStrip, Icon, IMG });
