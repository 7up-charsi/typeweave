import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import { LandingNavbar } from '@/components/landing-navbar';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['typeweave', 'typescript', 'react', 'ui components'],
  applicationName: siteConfig.name,
  authors: { name: siteConfig.author, url: siteConfig.siteUrl },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    description: siteConfig.description,
    title: siteConfig.name,
    siteName: siteConfig.name,
    emails: siteConfig.email,
    images: [
      {
        width: 1200,
        height: 630,
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="m-auto max-w-screen-2xl bg-background text-foreground">
        <LandingNavbar />

        {children}
      </body>
    </html>
  );
};

export default Layout;
