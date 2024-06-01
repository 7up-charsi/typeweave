import { DocsNavbar } from '@/components/docs-navbar';
import { SidebarContent } from '@/components/sidebar-content';
import { GeistSans } from 'geist/font/sans';
import '@/styles/globals.css';
import '@/styles/syntax-highlight-theme.css';
import { Toc } from '@/components/toc';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="m-auto max-w-screen-2xl bg-background text-foreground">
        <DocsNavbar />

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

          <div className="lg:grid lg:grid-cols-[1fr_200px]">
            <main className="overflow-auto px-5 py-4 lg:px-10">
              {children}
            </main>

            <Toc />
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
