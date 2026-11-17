'use client';

import { useEffect, useRef, useState } from 'react';
import { EMAIL } from '@/lib/data';

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>('site-toast', { detail: message }));
}

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast('Email copied to clipboard');
    return true;
  } catch {
    toast('Copy failed — please select the email manually');
    return false;
  }
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  root.classList.toggle('dark', next === 'dark');
  try {
    localStorage.setItem('theme', next);
  } catch {}
}

export function goTo(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function openPalette() {
  window.dispatchEvent(new Event('open-palette'));
}

/** Scroll progress, cursor spotlight, active nav link and scroll-reveal. */
export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      if (window.scrollY > 800) root.setAttribute('data-show-top', '');
      else root.removeAttribute('data-show-top');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const onMove = (e: PointerEvent) => {
      root.style.setProperty('--sx', e.clientX + 'px');
      root.style.setProperty('--sy', e.clientY + 'px');
    };
    if (!reduce && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-nav]'));
    const navIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const link of links) {
            if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    links.forEach((link) => {
      const target = document.querySelector(link.getAttribute('href') || '');
      if (target) navIO.observe(target);
    });

    let revealIO: IntersectionObserver | undefined;
    if (!reduce) {
      const io = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.classList.add('rv-in');
            observer.unobserve(el);
            window.setTimeout(() => el.classList.remove('rv', 'rv-in'), 1000);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
      );
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('rv');
        io.observe(el);
      });
      revealIO = io;
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
      navIO.disconnect();
      revealIO?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

/** Number that counts up when it scrolls into view (static for reduced motion). */
export function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

export function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      );
    format();
    const id = window.setInterval(format, 30000);
    return () => window.clearInterval(id);
  }, []);
  return <span>{time ? `Hyderabad · ${time} IST` : 'Hyderabad · IST'}</span>;
}
