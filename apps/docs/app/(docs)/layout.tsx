import { SidebarContent } from '@/(docs)/_components/sidebar-content';
import { Navbar } from '@/(docs)/_components/navbar';
import '@/styles/syntax-highlight-theme.css';
import { Fira_Code } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import '@/styles/admonitions.css';
import '@/styles/globals.css';

const font_code = Fira_Code({
  variable: '--font-code',
  subsets: ['latin'],
});

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${font_code.variable}`}
    >
      <body className="m-auto max-w-screen-2xl bg-background text-foreground">
        <Navbar />

        <div className="xl:grid xl:grid-cols-[300px_1fr]">
          {/*
          why aside in div 
          Since the aside element is positioned absolutely, it needs to be replaced with some other content so that the grid columns remain as intended.
          */}
          <div className="max-xl:hidden">
            <aside className="fixed top-16 flex h-[calc(100vh-theme(spacing.16))] w-[300px] flex-col gap-3 overflow-auto border-r border-r-muted-6 py-5 pl-10 pr-5">
              <SidebarContent />
            </aside>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
