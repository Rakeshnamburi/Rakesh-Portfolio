import { Ambient, CommandMenu, Header, Toaster, ToTop } from '@/components/site/chrome';
import { Console } from '@/components/site/console';
import { Contact } from '@/components/site/contact';
import { Footer } from '@/components/site/footer';
import { Boot, Fx, HeroCanvas } from '@/components/site/fx';
import { Hero, Marquee } from '@/components/site/hero';
import { SiteEffects } from '@/components/site/hooks';
import { Reel } from '@/components/site/reel';
import { About, Community, Credentials, Documents, Experience, Stats } from '@/components/site/sections';
import { Work } from '@/components/site/work';

export default function Home() {
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Boot />
      <Ambient />
      <Header />
      <main id="main">
        <div className="hero-stage">
          <HeroCanvas />
          <Hero />
        </div>
        <Console />
        <Marquee />
        <Reel />
        <Work />
        <Stats />
        <About />
        <Experience />
        <Documents />
        <Credentials />
        <Community />
        <Contact />
      </main>
      <Footer />
      <CommandMenu />
      <Toaster />
      <ToTop />
      <Fx />
      <SiteEffects />
    </div>
  );
}
