'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Code2, Copy, Mail, Phone, Users } from 'lucide-react';
import { copyEmail } from './hooks';
import { EMAIL, links, PHONE, PHONE_HREF } from '@/lib/data';

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (await copyEmail()) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <section id="contact" className="contact wrap" data-reveal>
      <div>
        <p className="label contact-label">
          <span className="status-dot" /> Open to work, collaborate &amp; learn
        </p>
        <h2>
          Have something in mind? <em>Open a ticket.</em>
        </h2>
        <p className="contact-copy">
          I’m open to early-career opportunities in software development, frontend engineering, and AI
          applications—and ready to grow into new challenges.
        </p>
        <div className="hero-actions">
          <a className="btn" href={'mailto:' + EMAIL}>
            Say hello <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <button type="button" className="btn btn-ghost" onClick={onCopy}>
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Email copied' : 'Copy email'}
          </button>
        </div>
      </div>
      <div className="contact-list">
        <a href={'mailto:' + EMAIL}>
          <Mail size={18} aria-hidden="true" /> {EMAIL}
        </a>
        <a href={PHONE_HREF}>
          <Phone size={18} aria-hidden="true" /> {PHONE}
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          <Users size={18} aria-hidden="true" /> LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={links.github} target="_blank" rel="noreferrer">
          <Code2 size={18} aria-hidden="true" /> GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
