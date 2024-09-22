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
    <html
      lang="en"
      className={`${GeistSans.variable} ${font_code.variable}`}
    >
      <body className="m-auto max-w-screen-2xl bg-background text-foreground">
        <ThemeProvider attribute="class">
          <AppBar>
            <AppBarContent />
          </AppBar>

          <div className="grid min-h-[var(--screen-height)] grid-cols-1 [--screen-height:calc(100vh-65px)] [--toc-width:240px] lg:grid-cols-[1fr_var(--toc-width)] xl:grid-cols-[300px_1fr_var(--toc-width)]">
            <SideBar />

            {children}
          </div>

          <RouteProgress />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
