'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Ext, SectionHead } from './ui';
import { projects } from '@/lib/data';

type ArtKind = 'rings' | 'wave' | 'dots' | 'rows' | 'bars';

/** Each project gets its own animated "poster" so the reel is original artwork, not screenshots. */
const artFor: Record<string, ArtKind> = {
  'spilton-ai': 'rings',
  spilto: 'wave',
  electroflow: 'dots',
  retailmate: 'rows',
  findash: 'bars',
};

const WAVE = [34, 58, 92, 124, 80, 52, 104, 146, 118, 70, 46, 88, 132, 96, 60, 40, 76, 112, 138, 100, 64, 90, 126, 84, 50, 72, 108, 82, 44, 68, 36, 54];
const ROWS = [
  { w: 250, x: 40, d: 0 },
  { w: 190, x: 40, d: 0.25 },
  { w: 290, x: 40, d: 0.5 },
  { w: 150, x: 40, d: 0.75 },
  { w: 230, x: 40, d: 1 },
];
const BARS = [70, 104, 86, 138, 118, 170, 150, 206];

function Art({ kind }: { kind: ArtKind }) {
  if (kind === 'rings') {
    return (
      <svg className="art" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="34" className="fill" />
        <circle cx="200" cy="200" r="76" className="line" />
        <circle cx="200" cy="200" r="122" className="line faint" />
        <g className="spin" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="168" className="line dash" />
          <circle cx="368" cy="200" r="9" className="fill" />
        </g>
        <g className="spin rev" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="124" r="6" className="fill" />
        </g>
      </svg>
    );
  }
  if (kind === 'wave') {
    return (
      <svg className="art" viewBox="0 0 400 400" aria-hidden="true">
        {WAVE.map((h, i) => (
          <rect
            key={i}
            className="bar fill"
            x={14 + i * 11.6}
            y={200 - h / 2}
            width="6"
            height={h}
            rx="3"
            style={{ animationDelay: i * 70 + 'ms' }}
          />
        ))}
        <line x1="14" y1="200" x2="386" y2="200" className="line faint" />
      </svg>
    );
  }
  if (kind === 'dots') {
    const cells = [];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 9; c++) {
        cells.push(
          <circle
            key={r * 9 + c}
            className="dotp fill"
            cx={40 + c * 40}
            cy={64 + r * 45}
            r="7"
            style={{ animationDelay: (r + c) * 110 + 'ms' }}
          />,
        );
      }
    }
    return (
      <svg className="art" viewBox="0 0 400 400" aria-hidden="true">
        {cells}
      </svg>
    );
  }
  if (kind === 'rows') {
    return (
      <svg className="art" viewBox="0 0 400 400" aria-hidden="true">
        {ROWS.map((row, i) => (
          <g key={i} className="slide" style={{ animationDelay: row.d + 's' }}>
            <rect x={row.x} y={54 + i * 62} width={row.w} height="40" rx="10" className="line" />
            <rect x={row.x + 12} y={66 + i * 62} width={row.w * 0.42} height="16" rx="6" className="fill faint" />
            <circle cx={row.x + row.w - 22} cy={74 + i * 62} r="8" className="fill" />
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg className="art" viewBox="0 0 400 400" aria-hidden="true">
      {BARS.map((h, i) => (
        <rect
          key={i}
          className="grow fill"
          x={34 + i * 44}
          y={360 - h}
          width="28"
          height={h}
          rx="6"
          style={{ animationDelay: i * 120 + 'ms' }}
        />
      ))}
      <polyline className="line trend" points="48,258 92,212 136,236 180,170 224,190 268,120 312,138 356,70" />
    </svg>
  );
}

const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Reel() {
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [userPlay, setUserPlay] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduce = useSyncExternalStore(subscribeMotion, getMotion, () => true);

  const playing = userPlay ?? !reduce;
  const running = playing && visible;
  const p = projects[index];
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    // Left / right arrows change chapter while focus is anywhere inside the reel.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
      else if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
    };
    el.addEventListener('keydown', onKey);
    return () => {
      io.disconnect();
      el.removeEventListener('keydown', onKey);
    };
  }, [count]);

  return (
    <section
      id="reel"
      ref={ref}
      className={running ? 'section wrap reel is-running' : 'section wrap reel'}
      aria-roledescription="carousel"
      aria-label="Project showreel"
    >
      <SectionHead n="▶" label="Showreel" title={<>Press <em>play.</em></>}>
        Five builds in thirty seconds. Pause any time, or jump straight to a chapter.
      </SectionHead>

      <div className="reel-stage" style={{ '--tone': p.tone } as React.CSSProperties} aria-live={running ? 'off' : 'polite'}>
        <div className="reel-info" key={p.id}>
          <p className="label">
            Chapter {pad(index)} / {pad(count - 1)} · {p.category}
          </p>
          <h3 className="reel-name">{p.name}</h3>
          <p className="reel-line">{p.line}</p>
          <p className="reel-desc">{p.description}</p>
          <div className="tags">
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="ticket-actions">
            <a className="btn btn-sm" href={'#' + p.id}>
              See the project ticket
            </a>
            {p.live && (
              <Ext className="btn btn-ghost btn-sm" href={p.live}>
                Live demo
              </Ext>
            )}
          </div>
        </div>
        <div className="reel-visual" key={p.id + '-art'} aria-hidden="true">
          <span className="reel-num">{pad(index)}</span>
          <Art kind={artFor[p.id] ?? 'rings'} />
        </div>
      </div>

      <div className="reel-controls">
        <div className="reel-btns">
          <button
            type="button"
            className="icon-btn"
            aria-label={playing ? 'Pause showreel' : 'Play showreel'}
            onClick={() => setUserPlay(!playing)}
          >
            {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
          </button>
          <button type="button" className="icon-btn" aria-label="Previous chapter" onClick={prev}>
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <button type="button" className="icon-btn" aria-label="Next chapter" onClick={next}>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
        <ol className="reel-chapters">
          {projects.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                className="reel-ch"
                aria-label={`Chapter ${i + 1}: ${c.name}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
              >
                <span className="label">
                  <span>{pad(i)}</span>
                  <span className="reel-ch-name"> {c.name}</span>
                </span>
                <span className="reel-bar" aria-hidden="true">
                  <i
                    className={i < index ? 'done' : i === index ? 'live' : ''}
                    onAnimationEnd={
                      i === index
                        ? (e) => {
                            if (e.animationName === 'reelFill') next();
                          }
                        : undefined
                    }
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
