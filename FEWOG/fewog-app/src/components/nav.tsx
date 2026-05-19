'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from './icons';

interface NavProps {
  page: string;
  setPage: (page: string) => void;
}

export function Nav({ page, setPage }: NavProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const go = (p: string) => {
    setOpen(false);
    if (p === 'start') {
      router.push('/');
    } else if (p === 'wohnen') {
      router.push('/wohnen');
    } else if (p === 'ueberuns') {
      router.push('/ueberuns');
    } else if (p === 'aktuelles') {
      router.push('/aktuelles');
    } else if (p === 'service') {
      router.push('/service');
    } else {
      // For other pages that don't exist yet, stay on current page
      setPage(p);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <nav className={"nav " + (open ? "nav-mobile-open" : "")}>
      <div className="nav-inner">
        <div className="brand" onClick={() => go("start")}>
          <img
            src="https://www.fewog.de/fileadmin/pics/logo_fewog.png"
            alt="FEWOG Fellbach"
            style={{ height: 48, width: "auto", display: "block" }}
          />
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
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <Icon.burger />
        </button>
      </div>
    </nav>
  );
}