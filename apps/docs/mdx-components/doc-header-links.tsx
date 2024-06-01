import { Button } from '@typeweave/react';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  component: string;
  styles?: boolean;
}

export const DocHeaderLinks = (props: Props) => {
  const { component, styles = true } = props;

  return (
    <div className="mt-3 flex items-center justify-end gap-2">
      {[
        {
          icon: <GithubIcon size={17} />,
          title: 'source',
          href: process.env.REPO_COMPONENTS + `${component}.tsx`,
          a11yLabel: 'github component source code',
        },
        styles && {
          icon: <GithubIcon size={17} />,
          title: 'styles',
          href: process.env.REPO_STYLES + `${component}.ts`,
          a11yLabel: 'github styles source code',
        },
      ]
        .filter(Boolean)
        // @ts-ignore
        .map(({ icon, title, href, a11yLabel }, i) => (
          <Button
            key={i}
            asChild
            variant="border"
            size="sm"
            startContent={icon}
          >
            <Link
              target="_blank"
              rel="noreferrer"
              aria-label={a11yLabel}
              href={href}
            >
              {title}
            </Link>
          </Button>
        ))}
    </div>
  );
};
