import { Button } from '@typeweave/react/button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  component: string;
  styles?: boolean;
}

export const HeaderLinks = (props: Props) => {
  const { component, styles = true } = props;

  return (
    <div className="flex items-center justify-end gap-2">
      {[
        {
          icon: <GithubIcon size={17} />,
          title: 'source',
          href: `${process.env.REPO}/blob/main/packages/react/src/${component}/${component}.tsx`,
          a11yLabel: 'github component source code',
        },
        styles && {
          icon: <GithubIcon size={17} />,
          title: 'styles',
          href: `${process.env.REPO}/blob/main/packages/react/src/${component}/${component}-styles.ts`,
          a11yLabel: 'github styles source code',
        },
      ].map((ele, i) =>
        !ele ? null : (
          <Button
            key={i}
            asChild
            variant="border"
            size="sm"
            startContent={ele.icon}
          >
            <Link
              target="_blank"
              rel="noreferrer"
              aria-label={ele.a11yLabel}
              href={ele.href}
              className="not-prose"
            >
              {ele.title}
            </Link>
          </Button>
        ),
      )}
    </div>
  );
};
