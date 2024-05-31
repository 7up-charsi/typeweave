import Image from 'next/image';
import darkLogo from '@/assets/dark-logo.png';
import lightLogo from '@/assets/light-logo.png';
import Link from 'next/link';
import { navbarLinks } from '@/config/navbar-links';
import { GithubIcon } from 'lucide-react';
import { ThemeSwitcherMenu } from './theme-switcher-menu';

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-[999] m-auto flex h-16 w-full max-w-screen-2xl items-center border-b border-b-muted-6 bg-muted-1/50  px-12 backdrop-blur-sm">
      <Link
        href="/"
        aria-label="home page"
        className="mr-10 inline-block leading-none"
      >
        <Image
          src={lightLogo}
          alt="webbu-ui dark logo"
          width={120}
          height={120}
          className="hidden dark:inline-block"
        />
        <Image
          src={darkLogo}
          alt="webbu-ui light logo"
          width={120}
          height={120}
          className="inline-block dark:hidden"
        />
      </Link>

      <nav aria-label="primary navigation links">
        {navbarLinks.map(({ href, title }, i) => (
          <Link
            key={i}
            href={href}
            className="inline-block rounded px-3 py-2 text-muted-11/90 transition-colors first-letter:uppercase hover:bg-muted-3 hover:text-muted-11"
          >
            {title}
          </Link>
        ))}
      </nav>

      <div className="grow"></div>

      <ThemeSwitcherMenu />

      {/* github link */}
      <Link
        href="https://github.com/7up-charsi/webbo-ui"
        target="_blank"
        rel="noreferrer"
        aria-label="github source code"
      >
        <GithubIcon />
      </Link>
    </header>
  );
};
