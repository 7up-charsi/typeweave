import { DocsNavbar } from '@/components/docs-navbar';
import { SidebarContent } from '@/components/sidebar-content';
import { GeistSans } from 'geist/font/sans';
import '@/styles/globals.css';
import '@/styles/syntax-highlight-theme.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="m-auto max-w-screen-2xl bg-background text-foreground">
        <DocsNavbar />

        <div className="lg:grid lg:grid-cols-[300px_1fr]">
          <aside className="fixed top-16 flex h-[calc(100vh-theme(spacing.16))] w-[300px] flex-col gap-3 overflow-auto border-r border-r-muted-6 py-5 pl-10 pr-5 max-lg:hidden">
            <SidebarContent />
          </aside>

          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
