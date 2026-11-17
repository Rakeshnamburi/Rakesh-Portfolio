'use client';

import { useEffect, useState } from 'react';

type Line = { kind: 'cmd' | 'out'; text: string };

const script: Line[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'namburi-rakesh · support engineer · ai & software builder' },
  { kind: 'cmd', text: 'cat now.txt' },
  { kind: 'out', text: 'role      support engineer @ TechMeadow Solutions (since Jun 2026)' },
  { kind: 'out', text: 'founder   SPILTON AI & Technologies' },
  { kind: 'out', text: 'studied   B.Tech CSE @ KLU · CGPA 8.99 · class of 2026' },
  { kind: 'cmd', text: 'ls ~/shipped' },
  { kind: 'out', text: 'spilton-ai/  spilto-connections/  electroflow-ai/  retailmate/  findash/' },
  { kind: 'cmd', text: './status --open-to' },
  { kind: 'out', text: 'early-career roles → software dev · frontend · AI applications' },
];

/** Builds the typing timeline: one tick per typed character, short pauses between lines. */
function buildTicks() {
  const ticks: { line: number; chars: number }[] = [];
  script.forEach((line, i) => {
    if (line.kind === 'cmd') {
      for (let c = 1; c <= line.text.length; c++) ticks.push({ line: i, chars: c });
      for (let p = 0; p < 9; p++) ticks.push({ line: i, chars: line.text.length });
    } else {
      ticks.push({ line: i, chars: line.text.length });
      for (let p = 0; p < 4; p++) ticks.push({ line: i, chars: line.text.length });
    }
  });
  return ticks;
}

const ticks = buildTicks();
const last = ticks.length - 1;

export function Console() {
  const [t, setT] = useState(last);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let interval = 0;
    const start = window.setTimeout(() => {
      setT(0);
      setTyping(true);
      interval = window.setInterval(() => {
        setT((v) => {
          if (v >= last) {
            window.clearInterval(interval);
            setTyping(false);
            return last;
          }
          return v + 1;
        });
      }, 26);
    }, 450);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, []);

  const tick = ticks[t];

  return (
    <section className="console wrap" aria-label="Terminal summary of Namburi Rakesh">
      <div className="console-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>rakesh@portfolio — ~</span>
        <span className="console-hint">live summary</span>
      </div>
      <div className="console-body">
        {script.map((line, i) => {
          if (i > tick.line) return null;
          const text = i === tick.line ? line.text.slice(0, tick.chars) : line.text;
          return line.kind === 'cmd' ? (
            <p key={i} className="t-line">
              <span className="t-prompt">$</span> <span className="t-cmd">{text}</span>
              {typing && i === tick.line ? <span className="t-cursor" /> : null}
            </p>
          ) : (
            <p key={i} className="t-line t-out">
              {text}
            </p>
          );
        })}
        {!typing && (
          <p className="t-line">
            <span className="t-prompt">$</span> <span className="t-cursor" />
          </p>
        )}
      </div>
    </section>
  );
}
