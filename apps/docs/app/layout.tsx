import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Navbar } from '@/components/navbar';
import '@/styles/globals.css';

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
    <html lang="en" className={GeistSans.variable}>
      <body className="m-auto max-w-screen-2xl bg-muted-1 text-muted-11">
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default Layout;
