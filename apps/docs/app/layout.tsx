import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/app/_components/Navbar';

export const metadata: Metadata = {
  title: { default: 'webbo-ui docs', template: '%s | webbo-ui' },
  description:
    'The documentation of react components ui library developed by webbo-ui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="max-w-screen-2xl min-h-screen m-auto flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

