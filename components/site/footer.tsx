import { Clock } from './hooks';
import { EMAIL, links, navItems } from '@/lib/data';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="label">Spilton AI &amp; Technologies</p>
            <p className="foot-text">
              Founder-led experiments in practical AI, thoughtful interfaces, and useful digital products.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="foot-col">
            <p className="label">Explore</p>
            {navItems.map((n) => (
              <a key={n.id} href={'#' + n.id}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="foot-col">
            <p className="label">Elsewhere</p>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={links.leetcode} target="_blank" rel="noreferrer">
              LeetCode
            </a>
            <a href={'mailto:' + EMAIL}>Email</a>
          </div>
        </div>
        <p className="foot-mark" aria-hidden="true">
          Namburi Rakesh
        </p>
        <div className="foot-bottom">
          <span>© 2026 Namburi Rakesh</span>
          <span>Support. Build. Keep learning.</span>
          <Clock />
        </div>
      </div>
    </footer>
  );
}
