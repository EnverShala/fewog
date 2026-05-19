'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from './icons';

interface NavProps {
  page: string;
  setPage: (page: string) => void;
}

const NAV_LINKS: [string, string][] = [
  ['start', 'Startseite'],
  ['wohnen', 'Wohnen'],
  ['service', 'Service'],
  ['ueberuns', 'Über uns'],
  ['aktuelles', 'Aktuelles'],
];

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
      setPage(p);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand" onClick={() => go('start')}>
          <img
            src="https://www.fewog.de/fileadmin/pics/logo_fewog.png"
            alt="FEWOG Fellbach"
            style={{ height: 48, width: 'auto', display: 'block' }}
          />
        </div>
        <div className="nav-links">
          {NAV_LINKS.map(([k, l]) => (
            <a key={k}
               className={'nav-link' + (page === k ? ' active' : '')}
               onClick={(e) => { e.preventDefault(); go(k); }}>
              {l}
            </a>
          ))}
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <Icon.burger />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="nav-mobile-links">
              {NAV_LINKS.map(([k, l]) => (
                <a key={k}
                   className={'nav-link' + (page === k ? ' active' : '')}
                   onClick={(e) => { e.preventDefault(); go(k); }}>
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}