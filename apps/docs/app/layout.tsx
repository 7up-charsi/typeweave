import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import local from 'next/font/local';
import { Navbar } from '@/components/navbar';
import '@/styles/globals.css';

const Font_Code = local({
  src: '../assets/fonts/Menlo-Regular.ttf',
  display: 'swap',
  preload: true,
  variable: '--font-code',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  title: { default: 'webbo-ui docs', template: '%s | webbo-ui' },
  description:
    'The documentation of react components ui library developed by webbo-ui',
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <html lang="en" className={`${GeistSans.variable} ${Font_Code.variable}`}>
      <body className="m-auto max-w-screen-2xl bg-muted-1 text-muted-11">
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default Layout;
