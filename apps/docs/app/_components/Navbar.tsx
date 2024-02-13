import Image from 'next/image';
import logo from '@/app/_assets/logo.png';
import Link from 'next/link';

const links = [
  { title: 'docs', href: '/get-started' },
  { title: 'components', href: '/components' },
];

export const Navbar = () => {
  return (
    <div className="w-full h-16 border-b flex items-center px-12">
      <Link href="/" className="inline-block leading-none">
        <Image
          src={logo}
          alt="webbu/ui logo"
          width={120}
          height={120}
          className="inline-block mr-10"
        />
      </Link>

      <nav>
        <ul className="flex gap-10">
          {links.map(({ href, title }, i) => (
            <li key={i} className="first-letter:uppercase">
              <Link
                href={href}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grow"></div>

      {/* search docs placeholder input */}
      <div
        className="mr-5 w-52 h-9 border px-2 rounded flex items-center text-neutral-400"
        tabIndex={0}
        aria-label="press to open command palette and search docs"
      >
        <span className="text-sm tracking-wide">Search docs</span>
        <div className="grow"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width={17}
          height={17}
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

      {/* theme mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={25}
        height={25}
        className="mr-5 text-neutral-500 hover:text-neutral-700 transition-colors"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m-8-9H3m3.314-5.686L5.5 5.5m12.186.814L18.5 5.5M6.314 17.69l-.814.81m12.186-.81l.814.81M21 12h-1m-4 0a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>

      {/* github link */}
      <Link
        href="https://github.com/7up-charsi/gist-ui"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width={20}
          height={20}
          className="text-neutral-500 hover:text-neutral-700 transition-colors"
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
    </div>
  );
};
