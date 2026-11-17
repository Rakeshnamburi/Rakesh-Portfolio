'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Ext, SectionHead } from './ui';
import { projects, type Project } from '@/lib/data';

const filters = ['All work', 'AI applications', 'Web development', 'Cloud & systems'];

function Ticket({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const follow = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px');
  };

  return (
    <article
      id={p.id}
      className={p.featured ? 'ticket ticket-featured' : 'ticket'}
      style={{ '--tone': p.tone } as React.CSSProperties}
      onPointerMove={follow}
      data-reveal
    >
      <div className="ticket-stub">
        <div className="ticket-top">
          <span className="label">SHIP—{String(index + 1).padStart(2, '0')}</span>
          <span className="status">
            <i /> {p.status}
          </span>
        </div>
        <h3 className="ticket-name">{p.name}</h3>
        <p className="ticket-line">{p.line}</p>
      </div>
      <div className="ticket-main">
        <p className="label">{p.label}</p>
        <p className="ticket-desc">{p.description}</p>
        {p.featured && (
          <ul className="ticket-points">
            {p.features.slice(0, 3).map((f) => (
              <li key={f}>
                <Check size={14} aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        )}
        <div className="tags">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="ticket-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onOpen} aria-label={'Read the story of ' + p.name}>
            Project story <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          {p.live ? (
            <Ext className="btn btn-sm" href={p.live}>
              Live demo
            </Ext>
          ) : p.repo ? (
            <Ext className="btn btn-sm" href={p.repo}>
              Source code
            </Ext>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const project = selected === null ? null : projects[selected];
  const visible = projects.map((p, i) => ({ p, i })).filter(({ p }) => filter === 'All work' || p.category === filter);

  return (
    <section id="work" className="section wrap">
      <SectionHead n="01" label="Shipped work" title={<>Ideas, made <em>real.</em></>}>
        Independent projects, built from idea to deployment. Each card is a ticket that made it all the way to done.
      </SectionHead>

      <fieldset className="chips">
        <legend className="sr-only">Filter projects</legend>
        {filters.map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
        <span className="chip-count label" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'ticket' : 'tickets'}
        </span>
      </fieldset>

      <div className="tickets">
        {visible.map(({ p, i }) => (
          <Ticket key={p.id} p={p} index={i} onOpen={() => setSelected(i)} />
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="case-dialog" ref={popupRef} tabIndex={-1} initialFocus={popupRef}>
          {project && (
            <>
              <p className="label">{project.label}</p>
              <DialogTitle className="case-title">{project.name}</DialogTitle>
              <DialogDescription className="case-desc">{project.description}</DialogDescription>
              <div className="case-role">
                <span className="label">My role</span>
                <strong>{project.role}</strong>
              </div>
              <h4>The problem</h4>
              <p>{project.problem}</p>
              <h4>The approach</h4>
              <p>{project.approach}</p>
              <h4>Project highlights</h4>
              <ul>
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="tags">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <p className="case-note">{project.note}</p>
              <div className="ticket-actions">
                {project.live && (
                  <Ext className="btn btn-sm" href={project.live}>
                    Open live demo
                  </Ext>
                )}
                {project.repo && (
                  <Ext className="btn btn-ghost btn-sm" href={project.repo}>
                    View source
                  </Ext>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
