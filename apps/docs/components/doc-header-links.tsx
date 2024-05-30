import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  component: string;
  styles?: boolean;
}

export const DocHeaderLinks = (props: Props) => {
  const { component, styles = true } = props;

  return (
    <div className="mt-3 flex items-center justify-end gap-4">
      {[
        {
          icon: <GithubIcon />,
          title: 'source',
          href: process.env.REPO_COMPONENTS + `${component}.tsx`,
          a11yLabel: 'github component source code',
        },
        styles && {
          icon: <GithubIcon />,
          title: 'styles',
          href: process.env.REPO_STYLES + `${component}.ts`,
          a11yLabel: 'github styles source',
        },
      ]
        .filter(Boolean)
        // @ts-ignore
        .map(({ icon, title, href, a11yLabel }, i) => (
          <Link
            target="_blank"
            rel="noreferrer"
            aria-label={a11yLabel}
            href={href}
            key={i}
            className="flex h-8 items-center gap-4 rounded bg-muted-3 px-2"
          >
            <span>{icon}</span>
            <span className="first-letter:uppercase">{title}</span>
          </Link>
        ))}
    </div>
  );
};
