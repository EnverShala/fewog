import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Seite nicht gefunden</h1>
        <p className="lead" style={{ marginBottom: '2rem' }}>Die gesuchte Seite existiert nicht.</p>
        <Link href="/" className="btn btn-primary">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
