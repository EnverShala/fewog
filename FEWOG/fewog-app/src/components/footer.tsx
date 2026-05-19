'use client';


export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="brand-mark" style={{ background: "var(--c-primary)", color: "var(--c-bg)", flexShrink: 0 }}>F</div>
          <p style={{ color: "rgba(253,248,247,0.7)", fontSize: 14, margin: 0 }}>
            Fellbacher Wohnungsbau-Genossenschaft eG · seit 1949 · Wohnraum aus Fellbach, für Fellbach.
          </p>
        </div>
        <div className="footer-bottom" style={{ marginTop: 24 }}>
          <span>© 1949–2026 FEWOG eG · Fellbach</span>
          <span><a href="/impressum" style={{ display: "inline" }}>Impressum</a> · <a href="/datenschutz" style={{ display: "inline" }}>Datenschutz</a></span>
        </div>
      </div>
    </footer>
  );
}