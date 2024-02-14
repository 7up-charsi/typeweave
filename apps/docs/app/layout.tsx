import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from './_components/Navbar';

export const metadata: Metadata = {
  title: { default: 'gist-ui/ui docs', template: '%s | gist-ui/ui' },
  description:
    'The documentation of react components ui library developed by gist-ui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="max-w-screen-2xl m-auto">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

