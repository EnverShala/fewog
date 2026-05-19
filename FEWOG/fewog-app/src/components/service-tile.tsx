'use client';

import { ReactNode } from 'react';

interface ServiceTileProps {
  icon: ReactNode;
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
}

export function ServiceTile({ icon, title, desc, href, onClick }: ServiceTileProps) {
  const inner = (
    <>
      <div className="icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </>
  );

  if (href) {
    return <a className="service-tile" href={href}>{inner}</a>;
  }

  return (
    <div className="service-tile" onClick={onClick}>
      {inner}
    </div>
  );
}