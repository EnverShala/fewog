'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Etwas ist schiefgelaufen.</h1>
        <p className="lead" style={{ marginBottom: '2rem' }}>Ein unerwarteter Fehler ist aufgetreten.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={reset}>
            Erneut versuchen
          </button>
          <Link href="/" className="btn btn-ghost">
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
