import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Ext } from './ui';
import { links, marquee } from '@/lib/data';

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy-col">
          <div className="eyebrow-row">
            <span className="label">
              <span className="idx">●</span> Support engineer · AI &amp; software builder
            </span>
            <span className="label hero-loc">Andhra Pradesh, India</span>
          </div>
          <p className="intro">Hello, I’m Namburi Rakesh.</p>
          <h1 id="hero-title" className="display">
            Curious mind.
            <br />
            Practical <mark>builder.</mark>
          </h1>
          <p className="lede">
            I solve support issues and build useful digital products across software, AI, and the cloud. My work combines
            structured problem-solving, thoughtful interfaces, and a drive to keep learning.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#work">
              Explore my work <ArrowDown size={17} aria-hidden="true" />
            </a>
            <Ext className="btn btn-ghost" href="/documents/namburi-rakesh-general-resume.pdf">
              View résumé
            </Ext>
            <Ext className="btn btn-ghost" href={links.github}>
              GitHub
            </Ext>
          </div>
          <div className="featured-links" aria-label="Featured projects">
            <span className="label">Featured</span>
            <a href="#spilton-ai">
              Spilton AI <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href="#spilto">
              SPILTO Connections <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href="#electroflow">
              ElectroFlow AI <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="idcard" aria-label="Identity card">
          <div className="idcard-hole" aria-hidden="true" />
          <div className="idcard-top">
            <span>Spilton AI &amp; Technologies</span>
            <span className="idcard-chip">Founder</span>
          </div>
          <Image
            className="idcard-photo"
            src="/rakesh-portrait.jpg"
            alt="Portrait of Namburi Rakesh"
            width={402}
            height={531}
            priority
          />
          <p className="idcard-name">
            Namburi
            <br />
            Rakesh
          </p>
          <p className="idcard-role">Building intelligent, practical products</p>
          <div className="idcard-meta">
            <span>KLU · Computer Science</span>
            <span>Class of ’26</span>
          </div>
          <div className="barcode" aria-hidden="true" />
        </aside>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-track">
          {items.map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
