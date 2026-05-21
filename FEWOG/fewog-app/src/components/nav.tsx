'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './icons';

const NAV_LINKS: [string, string, string][] = [
  ['/', 'start', 'Startseite'],
  ['/wohnen', 'wohnen', 'Wohnen'],
  ['/service', 'service', 'Service'],
  ['/ueberuns', 'ueberuns', 'Über uns'],
  ['/aktuelles', 'aktuelles', 'Aktuelles'],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // '/' only matches exactly; all others match as prefix (covers sub-routes like /aktuelles/[slug])
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <Image
            src="/logo-fewog.png"
            alt="FEWOG Fellbach"
            width={160}
            height={48}
            style={{ height: 48, width: 'auto', display: 'block' }}
            priority
          />
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map(([href, key, label]) => (
            <Link
              key={key}
              href={href}
              className={'nav-link' + (isActive(href) ? ' active' : '')}
            >
              {label}
            </Link>
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
              {NAV_LINKS.map(([href, key, label]) => (
                <Link
                  key={key}
                  href={href}
                  className={'nav-link' + (isActive(href) ? ' active' : '')}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
