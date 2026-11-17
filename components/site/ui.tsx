import { ArrowUpRight } from 'lucide-react';

export function Ext({
  href,
  children,
  className = 'link',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

export function SectionHead({
  n,
  label,
  title,
  children,
}: {
  n: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="sec-head" data-reveal>
      <div>
        <p className="label">
          <span className="idx">{n}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="sec-desc">{children}</p>}
    </header>
  );
}
