import type { Metadata } from 'next';
import './globals.css';
const title = 'Namburi Rakesh — Software, AI & Cloud';
const description = 'Computer Science graduate building web interfaces and AI applications. Explore projects, coding achievements, certifications, and community leadership.';
export const metadata: Metadata = {metadataBase:new URL(process.env.SITE_ORIGIN || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000')),title,description,icons:{icon:'/favicon.svg'},openGraph:{title,description,type:'website',images:[{url:'/og.png',width:1730,height:909,alt:'Namburi Rakesh — Software, AI & Cloud'}]},twitter:{card:'summary_large_image',title,description,images:['/og.png']}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className="dark"><body>{children}</body></html>}

