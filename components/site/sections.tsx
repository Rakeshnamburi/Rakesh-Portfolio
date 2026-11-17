import Image from 'next/image';
import {
  ArrowUpRight,
  Award,
  Building2,
  BriefcaseBusiness,
  Cloud,
  FileText,
  GraduationCap,
  Heart,
  School,
  Sparkles,
  TicketCheck,
  Users,
} from 'lucide-react';
import { CountUp } from './hooks';
import { Ext, SectionHead } from './ui';
import {
  academics,
  badgeLinks,
  coding,
  community,
  credentials,
  featuredBadge,
  internships,
  links,
  projects,
  resumes,
  skillGroups,
} from '@/lib/data';

export function Stats() {
  const lc = coding.leetcode;
  const liveBuilds = projects.filter((p) => p.featured && p.live).length;
  return (
    <section id="stats" className="section wrap">
      <SectionHead n="02" label="By the numbers" title={<>Practice. Solve. <em>Repeat.</em></>}>
        A habit of breaking down problems and working toward a solution.
      </SectionHead>
      <div className="bento">
        <article className="cell span2" data-reveal>
          <div className="cell-top">
            <span className="label">LeetCode</span>
            <Ext href={links.leetcode}>View profile</Ext>
          </div>
          <p className="big">
            <CountUp to={lc.solved} />
            <small>problems solved</small>
          </p>
          <div className="diff-bar" aria-hidden="true">
            <i style={{ flex: lc.easy, background: '#8fd14f' }} />
            <i style={{ flex: lc.medium, background: '#f0b429' }} />
            <i style={{ flex: lc.hard, background: '#ff6a2b' }} />
          </div>
          <div className="diff-legend">
            <span>
              <b style={{ background: '#8fd14f' }} /> {lc.easy} Easy
            </span>
            <span>
              <b style={{ background: '#f0b429' }} /> {lc.medium} Medium
            </span>
            <span>
              <b style={{ background: '#ff6a2b' }} /> {lc.hard} Hard
            </span>
          </div>
          <p className="cell-note">Java is my most-used language on LeetCode.</p>
        </article>

        <article className="cell" data-reveal>
          <div className="cell-top">
            <span className="label">CodeChef</span>
            <Ext href={links.codechef}>Profile</Ext>
          </div>
          <p className="big">
            <CountUp to={coding.codechef.solved} />
            <small>problems solved</small>
          </p>
          <p className="cell-note">
            <b>{coding.codechef.contests}</b> contests · <b>100-day</b> streak badge
          </p>
        </article>

        <article className="cell lime" data-reveal>
          <span className="label">BTech CGPA</span>
          <p className="big">
            <CountUp to={8.99} decimals={2} />
            <small>Computer Science &amp; Engineering · KLU</small>
          </p>
        </article>

        <article className="cell" data-reveal>
          <span className="label">Live featured builds</span>
          <p className="big">
            <CountUp to={liveBuilds} />
            <small>from idea to deployment</small>
          </p>
        </article>

        <article className="cell" data-reveal>
          <span className="label">Certificates</span>
          <p className="big">
            <CountUp to={credentials.length} />
            <small>with verifiable PDFs</small>
          </p>
        </article>

        <article className="cell" data-reveal>
          <span className="label">Virtual internships</span>
          <p className="big">
            <CountUp to={internships.length} />
            <small>AICTE · EduSkills</small>
          </p>
        </article>

        <article className="cell" data-reveal>
          <span className="label">Professional role</span>
          <p className="big">
            <CountUp to={1} />
            <small>Support Engineer</small>
          </p>
        </article>
      </div>
      <p className="data-note">Profile statistics checked on {coding.checked}. Visit the profiles for the latest activity.</p>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section wrap">
      <SectionHead n="03" label="The person behind the projects" title={<>Built on learning. <em>Driven by curiosity.</em></>} />
      <div className="about-grid">
        <div data-reveal>
          <p className="prose">
            I’m a Computer Science graduate and Support Engineer who enjoys understanding how systems work, resolving
            issues, and building useful products.
          </p>
          <p className="prose">
            My experience spans IT support, frontend development, independent AI applications, and cloud technologies. I’m
            also exploring LLMs, retrieval-augmented generation (RAG), and new tools that can improve real workflows.
          </p>
          <div className="edu">
            <GraduationCap size={26} aria-hidden="true" />
            <div>
              <h3>Koneru Lakshmiah University</h3>
              <p>BTech · Computer Science &amp; Engineering</p>
              <span>
                2022–2026 <b>CGPA 8.99</b>
              </span>
            </div>
          </div>
        </div>

        <div className="codecard" data-reveal>
          <div className="code-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            stack.json
          </div>
          <div className="code-body">
            <div className="c-p">{'{'}</div>
            {skillGroups.map((group, gi) => (
              <div className="c-line" key={group.key}>
                <span className="c-k">&quot;{group.key}&quot;</span>
                <span className="c-p">: [ </span>
                {group.items.map((item, i) => (
                  <span key={item}>
                    <span className="c-s">&quot;{item}&quot;</span>
                    {i < group.items.length - 1 && <span className="c-p">, </span>}
                  </span>
                ))}
                <span className="c-p"> ]{gi < skillGroups.length - 1 ? ',' : ''}</span>
              </div>
            ))}
            <div className="c-p">{'}'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section wrap">
      <SectionHead n="04" label="Professional experience" title={<>Support that keeps <em>work moving.</em></>}>
        Combining structured issue resolution with cloud tools and AI-assisted workflows.
      </SectionHead>
      <article className="xp" data-reveal>
        <div className="xp-rail">
          <span className="status">
            <i /> Current role
          </span>
          <BriefcaseBusiness size={34} aria-hidden="true" />
          <p className="xp-date">
            Jun 2026
            <br />→ Present
          </p>
        </div>
        <div className="xp-body">
          <p className="label">Full-time · Hyderabad</p>
          <h3 className="xp-title">Support Engineer</h3>
          <p className="xp-company">
            <Building2 size={17} aria-hidden="true" /> TechMeadow Solutions <span>Part of Indus Group</span>
          </p>
          <div className="flow" aria-label="Workflow: email requests, Jira tracking, resolution">
            <span className="flow-node">Email requests</span>
            <span className="flow-line" aria-hidden="true" />
            <span className="flow-node">Jira tracking</span>
            <span className="flow-line" aria-hidden="true" />
            <span className="flow-node last">Resolution</span>
          </div>
          <ul className="xp-points">
            <li>
              <TicketCheck size={20} aria-hidden="true" />
              <span>Resolve IT support requests received through email and track Jira tickets through closure.</span>
            </li>
            <li>
              <Cloud size={20} aria-hidden="true" />
              <span>Use AWS tools, AI-assisted workflows, and prompt engineering while investigating support issues.</span>
            </li>
            <li>
              <Users size={20} aria-hidden="true" />
              <span>Participate in Scrum meetings, communicate ticket status, and coordinate issue follow-up.</span>
            </li>
          </ul>
          <div className="tags">
            {['IT Support', 'Jira', 'AWS', 'AI-assisted workflows', 'Scrum'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

export function Documents() {
  const icons = [FileText, Sparkles, Cloud];
  return (
    <section id="documents" className="section wrap">
      <SectionHead n="05" label="Education & documents" title={<>Three paths. <em>One builder.</em></>}>
        Choose the résumé that best matches the role: general, AI &amp; software, or DevOps &amp; AWS.
      </SectionHead>

      <div className="academics" aria-label="Academic results">
        {academics.map((a, i) => (
          <article key={a.label} className="academic" data-reveal>
            {i === 2 ? <GraduationCap size={22} aria-hidden="true" /> : <School size={22} aria-hidden="true" />}
            <span className="label">{a.label}</span>
            <strong>{a.value}</strong>
            <p>{a.text}</p>
          </article>
        ))}
      </div>

      <div className="resumes">
        {resumes.map((r, i) => {
          const Icon = icons[i];
          return (
            <article key={r.href} className="resume" style={{ '--tone': r.tone } as React.CSSProperties} data-reveal>
              <Icon size={28} aria-hidden="true" />
              <p className="label">{r.tag}</p>
              <h3>{r.title}</h3>
              <p className="resume-text">{r.text}</p>
              <Ext className="btn btn-sm" href={r.href}>
                Open résumé
              </Ext>
            </article>
          );
        })}
      </div>
      <p className="data-note note-bar">Original academic documents are available to verified recruiters upon request.</p>
    </section>
  );
}

export function Credentials() {
  return (
    <section id="credentials" className="section wrap">
      <SectionHead n="06" label="Continuous learning" title={<>Knowledge, with <em>evidence.</em></>}>
        Certifications and hands-on learning completed alongside my degree and beyond.
      </SectionHead>

      <div className="cred-grid">
        {credentials.map((c) => (
          <a
            key={c.file}
            className="cred"
            href={'/certificates/' + c.file}
            target="_blank"
            rel="noreferrer"
            aria-label={'View ' + c.title + ' certificate'}
            data-reveal
          >
            <span className="cred-thumb">
              <Image
                src={'/certificate-thumbnails/' + c.file.replace('.pdf', '.jpg')}
                alt={c.title + ' certificate preview'}
                width={100}
                height={74}
                loading="lazy"
              />
            </span>
            <div>
              <p className="label">{c.issuer}</p>
              <h3>{c.title}</h3>
              <span className="cred-detail">{c.detail}</span>
              <b className="cred-cta">
                View certificate <ArrowUpRight size={13} aria-hidden="true" />
              </b>
            </div>
          </a>
        ))}
      </div>

      <div className="badges">
        <div className="badges-head">
          <div>
            <p className="label">Digital credentials</p>
            <h3>Explore my badges</h3>
          </div>
          <Ext href={links.credly}>View Credly profile</Ext>
        </div>
        <a className="badge-feature" href={featuredBadge.href} target="_blank" rel="noreferrer" data-reveal>
          <Image src="/badges/aws-generative-ai.png" alt={featuredBadge.alt} width={280} height={280} loading="lazy" />
          <div>
            <p className="label">AWS Educate / training badge</p>
            <h4>{featuredBadge.title}</h4>
            <p>Continuing my learning in generative AI and its possibilities.</p>
            <span className="link">
              View badge on Credly <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </a>
        <div className="badge-links">
          {badgeLinks.map((b) => (
            <a
              key={b.id}
              href={'https://www.credly.com/badges/' + b.id + '/public_url'}
              target="_blank"
              rel="noreferrer"
              className="badge-link"
            >
              <Award size={19} aria-hidden="true" />
              <div>
                <span className="label">{b.type}</span>
                <h4>{b.title}</h4>
              </div>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="interns">
        <h3>
          Virtual internships <span className="label">AICTE · EduSkills</span>
        </h3>
        <div className="intern-grid">
          {internships.map((n) => (
            <article key={n.title} data-reveal>
              <span className="label">10-week program</span>
              <h4>{n.title}</h4>
              <p>
                {n.date}
                <br />
                {n.provider}
              </p>
              <Ext href={'/certificates/' + n.file}>View certificate</Ext>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Community() {
  const icons = [Users, Heart];
  return (
    <section id="community" className="section wrap">
      <SectionHead n="07" label="Beyond the screen" title={<>Building with <em>people.</em></>}>
        Student Activity Centre · KLU
      </SectionHead>
      <div className="community">
        {community.map((c, i) => {
          const Icon = icons[i];
          return (
            <article key={c.kind} data-reveal>
              <Icon size={28} aria-hidden="true" />
              <div>
                <p className="label">{c.kind}</p>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="community-tag">{c.tags}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
