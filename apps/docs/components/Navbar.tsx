import Image from 'next/image';
import darkLogo from '@/assets/dark-logo.png';
import lightLogo from '@/assets/light-logo.png';
import Link from 'next/link';
import { ThemeSwitcher } from '@webbo-ui/theme-switcher';
import { navbarLinks } from '@/config/navbar-links';

export const Navbar = () => {
  return (
    <header className="fixed top-0 m-auto max-w-screen-2xl w-full z-[999] h-16 flex items-center px-12 bg-muted-1/50 backdrop-blur-sm  border-b border-b-muted-6">
      <Link
        href="/"
        aria-label="home page"
        className="inline-block leading-none mr-10"
      >
        <Image
          src={lightLogo}
          alt="webbu-ui dark logo"
          width={120}
          height={120}
          className="dark:inline-block hidden"
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
            className="inline-block first-letter:uppercase text-muted-11/90 hover:text-muted-11 transition-colors hover:bg-muted-3 px-3 py-2 rounded"
          >
            {title}
          </Link>
        ))}
      </nav>

      <div className="grow"></div>

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
          className="text-muted-11/90 hover:text-muted-11 transition-colors"
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
