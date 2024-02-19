import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Navbar } from '@/components/Navbar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'webbo-ui docs', template: '%s | webbo-ui' },
  description:
    'The documentation of react components ui library developed by webbo-ui',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="max-w-screen-2xl min-h-screen m-auto flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

