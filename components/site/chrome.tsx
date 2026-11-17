'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowUp, ArrowUpRight, Braces, Code2, Copy, FileText, Moon, Search, Sun, Users } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { copyEmail, goTo, openPalette, toggleTheme } from './hooks';
import { links, navItems, projects, resumes, sectionList } from '@/lib/data';

/** Fixed decorative layers: grid, cursor spotlight and scroll progress. */
export function Ambient() {
  return (
    <>
      <div className="gridbg" aria-hidden="true" />
      <div className="spot" aria-hidden="true" />
      <div className="progress" aria-hidden="true" />
    </>
  );
}

export function Header() {
  const mac = useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => false,
  );

  return (
    <header className="bar">
      <div className="wrap bar-in">
        <a className="logo" href="#top" aria-label="Namburi Rakesh, back to top">
          nr<b>/</b>
        </a>
        <span className="avail">
          <i /> Open to work
        </span>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.id} href={'#' + item.id} data-nav>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="bar-actions">
          <button type="button" className="kbd-btn" onClick={openPalette} aria-label="Open command menu">
            <Search size={15} aria-hidden="true" />
            <span className="kbd-label">Menu</span>
            <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Switch between light and dark theme">
            <Sun className="i-sun" size={17} aria-hidden="true" />
            <Moon className="i-moon" size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  const run = (fn: () => void) => () => {
    setOpen(false);
    window.setTimeout(fn, 90);
  };
  const external = (url: string) => run(() => window.open(url, '_blank', 'noopener,noreferrer'));
  const liveProjects = projects.filter((p) => p.live);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command menu"
      description="Jump to a section, open a résumé or link, or change the theme."
      className="sm:max-w-xl"
    >
      <Command>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>Nothing matches that. Try “work”, “résumé” or “github”.</CommandEmpty>
          <CommandGroup heading="Jump to">
            {sectionList.map((s) => (
              <CommandItem key={s.id} value={'go ' + s.label} onSelect={run(() => goTo(s.id))}>
                <Braces aria-hidden="true" /> {s.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Live projects">
            {liveProjects.map((p) => (
              <CommandItem key={p.id} value={'open project ' + p.name} onSelect={external(p.live as string)}>
                <ArrowUpRight aria-hidden="true" /> {p.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Résumés">
            {resumes.map((r) => (
              <CommandItem key={r.href} value={'resume ' + r.title} onSelect={external(r.href)}>
                <FileText aria-hidden="true" /> {r.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Profiles">
            <CommandItem value="github" onSelect={external(links.github)}>
              <Code2 aria-hidden="true" /> GitHub
            </CommandItem>
            <CommandItem value="linkedin" onSelect={external(links.linkedin)}>
              <Users aria-hidden="true" /> LinkedIn
            </CommandItem>
            <CommandItem value="leetcode" onSelect={external(links.leetcode)}>
              <Braces aria-hidden="true" /> LeetCode
            </CommandItem>
            <CommandItem value="codechef" onSelect={external(links.codechef)}>
              <Braces aria-hidden="true" /> CodeChef
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem value="copy email address" onSelect={run(() => void copyEmail())}>
              <Copy aria-hidden="true" /> Copy email address
            </CommandItem>
            <CommandItem value="toggle theme dark light" onSelect={run(toggleTheme)}>
              <Sun aria-hidden="true" /> Toggle light / dark theme
            </CommandItem>
            <CommandItem value="back to top" onSelect={run(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}>
              <ArrowUp aria-hidden="true" /> Back to top
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export function Toaster() {
  const [message, setMessage] = useState('');
  const [on, setOn] = useState(false);

  useEffect(() => {
    let timer = 0;
    const handler = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setOn(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setOn(false), 2200);
    };
    window.addEventListener('site-toast', handler);
    return () => {
      window.removeEventListener('site-toast', handler);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <output className={on ? 'toast on' : 'toast'} aria-live="polite">
      {message}
    </output>
  );
}

export function ToTop() {
  return (
    <button
      type="button"
      className="to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
