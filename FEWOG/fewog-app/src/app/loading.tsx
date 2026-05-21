export default function Loading() {
  return (
    <div className="min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--c-muted, #999)' }}>
        Wird geladen…
      </div>
    </div>
  );
}
