import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

const title = 'Namburi Rakesh — Software, AI & Cloud';
const description =
  'Computer Science graduate building web interfaces and AI applications. Explore projects, coding achievements, certifications, and community leadership.';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_ORIGIN ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
        : process.env.VERCEL_URL
          ? 'https://' + process.env.VERCEL_URL
          : 'http://localhost:3000'),
  ),
  title,
  description,
  applicationName: 'Namburi Rakesh Portfolio',
  authors: [{ name: 'Namburi Rakesh', url: 'https://github.com/Rakeshnamburi' }],
  creator: 'Namburi Rakesh',
  keywords: ['Namburi Rakesh', 'Support Engineer', 'Software Developer', 'AI applications', 'React', 'Next.js', 'AWS', 'Portfolio'],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName: 'Namburi Rakesh',
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'Namburi Rakesh — Software, AI & Cloud' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0c0d0a' },
    { media: '(prefers-color-scheme: light)', color: '#eeebe0' },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Namburi Rakesh',
  jobTitle: 'Support Engineer',
  description,
  url: '/',
  sameAs: [
    'https://github.com/Rakeshnamburi',
    'https://www.linkedin.com/in/rakesh-namburi-a82a4b262/',
    'https://leetcode.com/u/rakeshnamburi/',
  ],
};

/** Applies the saved (or system) theme before first paint to avoid a flash. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var r=document.documentElement;r.dataset.theme=t;r.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.classList.add('dark')}try{if(!sessionStorage.getItem('boot')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-boot','');sessionStorage.setItem('boot','1')}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
