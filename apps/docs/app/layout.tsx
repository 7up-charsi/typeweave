import { LoadPackageManager } from '@/components/load-package-manager';
import { AppBarContent } from './_scoped/app-bar-content';
import { RouteProgress } from './_scoped/route-progress';
import '@/styles/syntax-highlight-theme.css';
import { SideBar } from './_scoped/side-bar';
import { Fira_Code } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import { AppBar } from './_scoped/app-bar';
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
    <html lang="en" dir="ltr">
      <body
        className={`${GeistSans.variable} ${font_code.variable} m-auto max-w-screen-2xl bg-background font-sans text-foreground`}
      >
        <p className="text-balance bg-info-3 px-5 py-3 text-center text-info-11">
          Documentation is under development.
        </p>

        <ThemeProvider attribute="class">
          <AppBar>
            <AppBarContent />
          </AppBar>

          <div className="grid min-h-[var(--screen-height)] grid-cols-1 [--screen-height:calc(100vh-65px)] md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_240px]">
            <SideBar />

            {children}
          </div>

          <RouteProgress />
          <LoadPackageManager />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
