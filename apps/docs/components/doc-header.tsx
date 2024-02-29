import Link from 'next/link';

const npm_svg = (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M0 10V20H9V22H16V20H32V10H0Z" fill="#CB3837"></path>
      <path
        d="M5.46205 12H2V18H5.46205V13.6111H7.22344V18H8.98482V12H5.46205ZM10.7462 12V20H14.269V18H17.731V12H10.7462ZM15.9696 16.3889H14.269V13.6111H15.9696V16.3889ZM22.9545 12H19.4924V18H22.9545V13.6111H24.7158V18H26.4772V13.6111H28.2386V18H30V12H22.9545Z"
        fill="white"
      ></path>
    </g>
  </svg>
);

const github_svg = (
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
);

interface Props {
  title: string;
  description: string;
  source: string;
  styles: string;
  npm: string;
}

export const DocHeader = ({
  title,
  description,
  source,
  styles,
  npm,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1
        className="text-3xl first-letter:uppercase font-medium"
        aria-description={description}
      >
        {title}
      </h1>
      {description && <p className="first-letter:uppercase">{description}</p>}

      <div className="flex gap-4 items-center justify-end mt-3">
        {[
          {
            icon: npm_svg,
            title: 'package',
            href: npm,
            a11yLabel: 'npm package',
          },
          {
            icon: github_svg,
            title: 'source',
            href: source,
            a11yLabel: 'github source code',
          },
          {
            icon: github_svg,
            title: 'styles',
            href: styles,
            a11yLabel: 'github styles source',
          },
        ].map(({ icon, title, href, a11yLabel }, i) => (
          <Link
            target="_blank"
            rel="noreferrer"
            aria-label={a11yLabel}
            href={href}
            key={i}
            className="flex gap-4 items-center px-2 h-8 rounded bg-muted-3 dark:bg-mutedDark-3"
          >
            <span>{icon}</span>
            <span className="first-letter:uppercase">{title}</span>
          </Link>
        ))}
      </div>

      <div className="h-px bg-muted-4 mt-4 dark:bg-mutedDark-4"></div>
    </div>
  );
};
