import Image from 'next/image';
import darkLogo from '@/app/_assets/dark-logo.png';
import lightLogo from '@/app/_assets/light-logo.png';
import Link from 'next/link';
import { ThemeSwitcher } from '@webbo-ui/theme-switcher';

const links = [
  { title: 'docs', href: '/docs/installation' },
  { title: 'components', href: '/components' },
];

export const Navbar = () => {
  return (
    <header className="w-full h-16 border-b border-b-muted-6 dark:border-b-mutedDark-6 flex items-center px-12">
      <Link
        href="/"
        aria-label="home page"
        className="inline-block leading-none mr-10"
      >
        <Image
          src={lightLogo}
          alt="webbu-ui logo"
          width={120}
          height={120}
          className="dark:inline-block hidden"
        />
        <Image
          src={darkLogo}
          alt="webbu-ui logo"
          width={120}
          height={120}
          className="inline-block dark:hidden"
        />
      </Link>

      <nav aria-label="primary navigation links">
        {links.map(({ href, title }, i) => (
          <Link
            key={i}
            href={href}
            className="inline-block first-letter:uppercase text-muted-11/90 hover:text-muted-11 transition-colors dark:text-mutedDark-11/90 dark:hover:text-mutedDark-11 hover:bg-muted-3 dark:hover:bg-mutedDark-3 px-3 py-2 rounded"
          >
            {title}
          </Link>
        ))}
      </nav>

      <div className="grow"></div>

      {/* search docs placeholder input */}
      <div
        className="mr-5 w-52 h-9 ring-1 ring-muted-7 dark:ring-mutedDark-7 hover:ring-muted-8 dark:hover:ring-mutedDark-8 px-2 rounded flex items-center cursor-pointer transition-colors group select-none"
        tabIndex={0}
        aria-label="press to open command palette for docs search"
      >
        <span className="text-sm text-muted-11 dark:text-mutedDark-11 tracking-wide">
          Search docs
        </span>
        <div className="grow"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width={17}
          height={17}
          className="text-muted-11 dark:text-mutedDark-11"
        >
          <g>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g fill="currentColor" transform="translate(-256 -1139)">
                <path d="M269.46 1163.45c-6.29 0-11.389-5.01-11.389-11.2 0-6.19 5.099-11.21 11.389-11.21 6.29 0 11.39 5.02 11.39 11.21 0 6.19-5.1 11.2-11.39 11.2zm18.228 5.8l-8.259-8.13c2.162-2.35 3.491-5.45 3.491-8.87 0-7.32-6.026-13.25-13.46-13.25-7.434 0-13.46 5.93-13.46 13.25 0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 008.472-2.96l8.292 8.16c.405.4 1.06.4 1.464 0 .405-.39.405-1.04 0-1.44z"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>

      <ThemeSwitcher size="sm" className="mr-5" />

      {/* github link */}
      <Link
        href="https://github.com/7up-charsi/webbo-ui"
        target="_blank"
        rel="noreferrer"
        aria-label="github source code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width={20}
          height={20}
          className="text-muted-11/90 hover:text-muted-11 dark:text-mutedDark-11/90 dark:hover:text-mutedDark-11 transition-colors"
        >
          <g>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g fill="currentColor" transform="translate(-140 -7559)">
                <g transform="translate(56 160)">
                  <path d="M94 7399c5.523 0 10 4.59 10 10.253 0 4.529-2.862 8.371-6.833 9.728-.507.101-.687-.219-.687-.492 0-.338.012-1.442.012-2.814 0-.956-.32-1.58-.679-1.898 2.227-.254 4.567-1.121 4.567-5.059 0-1.12-.388-2.034-1.03-2.752.104-.259.447-1.302-.098-2.714 0 0-.838-.275-2.747 1.051a9.396 9.396 0 00-2.505-.345 9.375 9.375 0 00-2.503.345c-1.911-1.326-2.751-1.051-2.751-1.051-.543 1.412-.2 2.455-.097 2.714-.639.718-1.03 1.632-1.03 2.752 0 3.928 2.335 4.808 4.556 5.067-.286.256-.545.708-.635 1.371-.57.262-2.018.715-2.91-.852 0 0-.529-.985-1.533-1.057 0 0-.975-.013-.068.623 0 0 .655.315 1.11 1.5 0 0 .587 1.83 3.369 1.21.005.857.014 1.665.014 1.909 0 .271-.184.588-.683.493-3.974-1.355-6.839-5.199-6.839-9.729 0-5.663 4.478-10.253 10-10.253"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </Link>
    </header>
  );
};
