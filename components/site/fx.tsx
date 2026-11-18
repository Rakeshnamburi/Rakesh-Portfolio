'use client';

import { useEffect, useRef } from 'react';

/* ───────────────────────── Boot intro ─────────────────────────
 * The overlay is shown by CSS when <html data-boot> is set by the inline script
 * in layout.tsx (first visit of the session, motion allowed). CSS also hides it
 * on its own timer, so a JS failure can never leave it stuck on screen. */
export function Boot() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute('data-boot')) return;
    const done = () => root.removeAttribute('data-boot');
    const timer = window.setTimeout(done, 3600);
    window.addEventListener('keydown', done, { once: true });
    window.addEventListener('pointerdown', done, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', done);
      window.removeEventListener('pointerdown', done);
    };
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-box">
        <p className="boot-l" style={{ '--d': '0.15s' } as React.CSSProperties}>
          <span className="boot-p">$</span> boot rakesh.dev
        </p>
        <p className="boot-l" style={{ '--d': '0.6s' } as React.CSSProperties}>
          <span className="boot-p">▸</span> loading projects <i /> <b>ok</b>
        </p>
        <p className="boot-l" style={{ '--d': '1s' } as React.CSSProperties}>
          <span className="boot-p">▸</span> loading certificates <i /> <b>ok</b>
        </p>
        <p className="boot-l" style={{ '--d': '1.4s' } as React.CSSProperties}>
          <span className="boot-p">▸</span> warming up the terminal <i /> <b>ok</b>
        </p>
        <p className="boot-name" style={{ '--d': '1.85s' } as React.CSSProperties}>
          Namburi Rakesh
        </p>
        <div className="boot-bar">
          <i />
        </div>
        <p className="boot-skip">click or press any key to skip</p>
      </div>
    </div>
  );
}

/* ───────────────────── Interactive hero background ─────────────────────
 * A light particle network. Points drift, push away from the pointer and link
 * to it. Pauses off-screen / in a background tab. Draws one still frame when
 * the visitor prefers reduced motion. */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const LINK = 128;
    const REACH = 170;
    type Point = { x: number; y: number; vx: number; vy: number };

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let color = '#c5f82a';
    let points: Point[] = [];
    const pointer = { x: -9999, y: -9999 };

    const readColor = () => {
      color = getComputedStyle(root).getPropertyValue('--accent').trim() || color;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      for (const p of points) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < REACH) {
            const push = (1 - d / REACH) * 0.8;
            p.x += (dx / d) * push;
            p.y += (dy / d) * push;
          }
        }
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < REACH) {
          ctx.globalAlpha = (1 - pd / REACH) * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reduce || running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(26, Math.round((w * h) / 15000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.36,
        vy: (Math.random() - 0.5) * 0.36,
      }));
      if (reduce) draw();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => start();

    readColor();
    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersection.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readColor();
      if (reduce) draw();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

/* ───────────────── Custom cursor + magnetic buttons ─────────────────
 * Fine pointers only (mouse / trackpad) and never with reduced motion. The
 * native cursor stays visible; a ring follows it and grows over links. */
export function Fx() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (reduce || !fine || !wrap || !dot || !ring || !label) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let shown = false;
    let magnet: HTMLElement | null = null;
    let currentLabel = '';

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const setMagnet = (el: HTMLElement | null, e?: PointerEvent) => {
      if (magnet && magnet !== el) magnet.style.translate = '';
      magnet = el;
      if (el && e) {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
        el.style.translate = `${clamp(dx, 10)}px ${clamp(dy, 8)}px`;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        wrap.classList.add('on');
      }
      if (!raf) raf = requestAnimationFrame(loop);

      const target = e.target instanceof Element ? e.target : null;
      const hit = target?.closest<HTMLElement>('a, button, [role="button"], summary, [data-cursor]') ?? null;
      wrap.classList.toggle('is-link', !!hit);

      let text = '';
      if (hit) {
        const anchor = hit.closest('a');
        if (hit.dataset.cursor) text = hit.dataset.cursor;
        else if (anchor?.getAttribute('target') === '_blank') text = 'Open';
        else if (anchor?.getAttribute('href')?.startsWith('mailto:')) text = 'Hello';
      }
      if (text !== currentLabel) {
        currentLabel = text;
        label.textContent = text;
        wrap.classList.toggle('has-label', !!text);
      }

      const btn = target?.closest<HTMLElement>('.btn') ?? null;
      setMagnet(btn, btn ? e : undefined);
    };

    const onLeave = () => {
      shown = false;
      wrap.classList.remove('on', 'is-link', 'has-label');
      setMagnet(null);
    };
    const onDown = () => wrap.classList.add('down');
    const onUp = () => wrap.classList.remove('down');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      setMagnet(null);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
